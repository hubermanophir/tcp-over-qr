import { MessageType, Size } from "./types";

export abstract class Message {
  type: MessageType;
  chunkIndex: number;
  totalChunks: number;
  payload: Uint8Array;

  constructor(type: MessageType, chunkIndex: number = 0, totalChunks: number = 0, payload: Uint8Array = new Uint8Array()) {
    this.type = type;
    this.chunkIndex = chunkIndex;
    this.totalChunks = totalChunks;
    this.payload = payload;
  }

  serialize(): Uint8Array {
    const buffer = new ArrayBuffer(Size.TYPE_SIZE + Size.CHUNK_INDEX_SIZE + Size.TOTAL_CHUNKS_SIZE + Size.FILE_SIZE + this.payload.length);
    const view = new DataView(buffer);
    let offset = 0;

    view.setUint8(offset, this.type);
    offset += Size.TYPE_SIZE;

    view.setUint32(offset, this.chunkIndex, true); // little-endian
    offset += Size.CHUNK_INDEX_SIZE;

    view.setUint32(offset, this.totalChunks, true);
    offset += Size.TOTAL_CHUNKS_SIZE;

    view.setUint32(offset, this.payload.length, true);
    offset += Size.FILE_SIZE;

    for (let i = 0; i < this.payload.length; i++) {
      view.setUint8(offset + i, this.payload[i]);
    }

    return new Uint8Array(buffer);
  }

  static deserialize(data: Uint8Array): Message {
    const view = new DataView(data.buffer);
    let offset = 0;

    const type = view.getUint8(offset) as MessageType;
    offset += Size.TYPE_SIZE;

    const chunkIndex = view.getUint32(offset, true);
    offset += Size.CHUNK_INDEX_SIZE;

    const totalChunks = view.getUint32(offset, true);
    offset += Size.TOTAL_CHUNKS_SIZE;

    const payloadLength = view.getUint32(offset, true);
    offset += Size.FILE_SIZE;

    const payload = data.slice(offset, offset + payloadLength);

    switch (type) {
      case MessageType.INITIATE:
        return InitiateMessage.deserializeFromPayload(payload, totalChunks);
      case MessageType.DATA_CHUNK:
        return new DataChunkMessage(chunkIndex, totalChunks, payload);
      case MessageType.ACK:
        return new AckMessage(chunkIndex);
      case MessageType.NACK:
        return new NackMessage(chunkIndex);
      case MessageType.FINISH:
        return new FinishMessage();
      case MessageType.ERROR:
        return ErrorMessage.deserializeFromPayload(payload);
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  }
}

export class InitiateMessage extends Message {
  fileName: string;
  fileSize: number;

  constructor(fileName: string, fileSize: number, totalChunks: number) {
    const payload = new Uint8Array(Size.FILE_NAME_SIZE + Size.FILE_SIZE);
    const view = new DataView(payload.buffer);

    // Encode file name (truncate if too long)
    const nameBytes = new TextEncoder().encode(fileName.slice(0, Size.FILE_NAME_SIZE - 1));
    for (let i = 0; i < nameBytes.length; i++) {
      view.setUint8(i, nameBytes[i]);
    }
    // Null terminate
    view.setUint8(nameBytes.length, 0);

    view.setUint32(Size.FILE_NAME_SIZE, fileSize, true);

    super(MessageType.INITIATE, 0, totalChunks, payload);
    this.fileName = fileName;
    this.fileSize = fileSize;
  }

  static deserializeFromPayload(payload: Uint8Array, totalChunks: number): InitiateMessage {
    const view = new DataView(payload.buffer);
    const nameBytes = [];
    for (let i = 0; i < Size.FILE_NAME_SIZE; i++) {
      const byte = view.getUint8(i);
      if (byte === 0) break;
      nameBytes.push(byte);
    }
    const fileName = new TextDecoder().decode(new Uint8Array(nameBytes));
    const fileSize = view.getUint32(Size.FILE_NAME_SIZE, true);
    return new InitiateMessage(fileName, fileSize, totalChunks);
  }
}

export class DataChunkMessage extends Message {
  constructor(chunkIndex: number, totalChunks: number, data: Uint8Array) {
    super(MessageType.DATA_CHUNK, chunkIndex, totalChunks, data);
  }
}

export class AckMessage extends Message {
  constructor(chunkIndex: number) {
    super(MessageType.ACK, chunkIndex);
  }
}

export class NackMessage extends Message {
  constructor(chunkIndex: number) {
    super(MessageType.NACK, chunkIndex);
  }
}

export class FinishMessage extends Message {
  constructor() {
    super(MessageType.FINISH);
  }
}

export class ErrorMessage extends Message {
  errorMessage: string;

  constructor(errorMessage: string) {
    const payload = new TextEncoder().encode(errorMessage);
    super(MessageType.ERROR, 0, 0, payload);
    this.errorMessage = errorMessage;
  }

  static deserializeFromPayload(payload: Uint8Array): ErrorMessage {
    const errorMessage = new TextDecoder().decode(payload);
    return new ErrorMessage(errorMessage);
  }
}
