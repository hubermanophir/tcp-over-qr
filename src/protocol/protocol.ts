import { MessageType, Size } from "./types";

abstract class Message {
  type: MessageType;
  constructor(type: MessageType) {
    this.type = type;
  }

  abstract serialize(): Uint8Array;
  abstract deserialize(data: Uint8Array): Message;
}

export class DataInfoMessage extends Message {
  fileName: string;
  fileSize: number;

  constructor(fileName: string, fileSize: number) {
    super(MessageType.FILE_DATA);
    this.fileName = fileName;
    this.fileSize = fileSize;
  }

  serialize(): Uint8Array {
    const buffer = new Uint8Array(Size.TYPE + Size.FILE_NAME + Size.FILE_SIZE);
    const dataView = new DataView(buffer.buffer);
    let offset = 0;

    dataView.setUint8(offset, this.type);
    offset += Size.TYPE;
    const fileNameBytes = new TextEncoder().encode(this.fileName);
    const fileNameBuffer = new Uint8Array(Size.FILE_NAME);
    fileNameBuffer.set(fileNameBytes.slice(0, Size.FILE_NAME));
    buffer.set(fileNameBuffer, offset);
    offset += Size.FILE_NAME;

    const fileSizeBytes = new Uint8Array(Size.FILE_SIZE);
    let fileSize = this.fileSize;
    for (let i = 0; i < Size.FILE_SIZE; i++) {
      fileSizeBytes[i] = fileSize & 0xff;
      fileSize >>>= 8;
    }
    buffer.set(fileSizeBytes, offset);
    offset += Size.FILE_SIZE;

    return buffer;
  }
  deserialize(data: Uint8Array): DataInfoMessage {
    const dataView = new DataView(data.buffer);
    let offset = 0;

    // Type (1 byte)
    dataView.getUint8(offset); // Read and discard type
    offset += Size.TYPE;

    // File Name (100 bytes)
    const fileNameBytes = data.slice(offset, offset + Size.FILE_NAME);
    const fileName = new TextDecoder().decode(fileNameBytes).replace(/\0/g, ""); // Remove null bytes
    offset += Size.FILE_NAME;

    // File Size (5 bytes) - little endian
    let fileSize = 0;
    for (let i = 0; i < Size.FILE_SIZE; i++) {
      fileSize |= dataView.getUint8(offset + i) << (i * 8);
    }
    offset += Size.FILE_SIZE;
    return new DataInfoMessage(fileName, fileSize);
  }
}

export class DataInfoACKMessage extends Message {
  fileName: string;
  fileSize: number;

  constructor(fileName: string, fileSize: number) {
    super(MessageType.ACK_FILE_DATA);
    this.fileName = fileName;
    this.fileSize = fileSize;
  }

  serialize(): Uint8Array {
    const buffer = new Uint8Array(Size.TYPE + Size.FILE_NAME + Size.FILE_SIZE);
    const dataView = new DataView(buffer.buffer);
    let offset = 0;

    dataView.setUint8(offset, this.type);
    offset += Size.TYPE;
    const fileNameBytes = new TextEncoder().encode(this.fileName);
    const fileNameBuffer = new Uint8Array(Size.FILE_NAME);
    fileNameBuffer.set(fileNameBytes.slice(0, Size.FILE_NAME));
    buffer.set(fileNameBuffer, offset);
    offset += Size.FILE_NAME;

    const fileSizeBytes = new Uint8Array(Size.FILE_SIZE);
    let fileSize = this.fileSize;
    for (let i = 0; i < Size.FILE_SIZE; i++) {
      fileSizeBytes[i] = fileSize & 0xff;
      fileSize >>>= 8;
    }
    buffer.set(fileSizeBytes, offset);
    offset += Size.FILE_SIZE;

    return buffer;
  }
  deserialize(data: Uint8Array): DataInfoACKMessage {
    const dataView = new DataView(data.buffer);
    let offset = 0;

    // Type (1 byte)
    dataView.getUint8(offset); // Read and discard type
    offset += Size.TYPE;

    // File Name (100 bytes)
    const fileNameBytes = data.slice(offset, offset + Size.FILE_NAME);
    const fileName = new TextDecoder().decode(fileNameBytes).replace(/\0/g, ""); // Remove null bytes
    offset += Size.FILE_NAME;

    // File Size (5 bytes) - little endian
    let fileSize = 0;
    for (let i = 0; i < Size.FILE_SIZE; i++) {
      fileSize |= dataView.getUint8(offset + i) << (i * 8);
    }
    offset += Size.FILE_SIZE;
    return new DataInfoACKMessage(fileName, fileSize);
  }
}

export class DataChunkMessage extends Message {
  offset: number;
  payloadSize: number;
  data: Uint8Array;
  constructor(offset: number, data: Uint8Array) {
    super(MessageType.DATA_CHUNK);
    this.offset = offset;
    this.payloadSize = data.length;
    this.data = data;
  }

  serialize(): Uint8Array {
    const buffer = new Uint8Array(
      Size.TYPE + Size.OFFSET + Size.PAYLOAD_SIZE + this.payloadSize
    );
    const dataView = new DataView(buffer.buffer);
    let offset = 0;

    dataView.setUint8(offset, this.type);
    offset += Size.TYPE;

    dataView.setUint32(offset, this.offset, true); // little endian
    offset += Size.OFFSET;

    dataView.setUint32(offset, this.payloadSize, true); // little endian
    offset += Size.PAYLOAD_SIZE;

    buffer.set(this.data, offset);
    offset += this.payloadSize;

    return buffer;
  }

  deserialize(data: Uint8Array): DataChunkMessage {
    const dataView = new DataView(data.buffer);
    let offset = 0;

    // Type (1 byte)
    dataView.getUint8(offset); // Read and discard type
    offset += Size.TYPE;

    // Offset (4 bytes)
    const chunkOffset = dataView.getUint32(offset, true); // little endian
    offset += Size.OFFSET;

    // Payload Size (4 bytes)
    const payloadSize = dataView.getUint32(offset, true); // little endian
    offset += Size.PAYLOAD_SIZE;

    // Data (payloadSize bytes)
    const chunkData = data.slice(offset, offset + payloadSize);
    offset += payloadSize;

    return new DataChunkMessage(chunkOffset, chunkData);
  }
}

export class DataChunkACKMessage extends Message {
  offset: number;
  constructor(offset: number) {
    super(MessageType.ACK_DATA_CHUNK);
    this.offset = offset;
  }

  serialize(): Uint8Array {
    const buffer = new Uint8Array(Size.TYPE + Size.OFFSET);
    const dataView = new DataView(buffer.buffer);
    let offset = 0;

    dataView.setUint8(offset, this.type);
    offset += Size.TYPE;

    dataView.setUint32(offset, this.offset, true); // little endian
    offset += Size.OFFSET;

    return buffer;
  }

  deserialize(data: Uint8Array): DataChunkACKMessage {
    const dataView = new DataView(data.buffer);
    let offset = 0;

    // Type (1 byte)
    dataView.getUint8(offset); // Read and discard type
    offset += Size.TYPE;

    // Offset (4 bytes)
    const chunkOffset = dataView.getUint32(offset, true); // little endian
    offset += Size.OFFSET;

    return new DataChunkACKMessage(chunkOffset);
  }
}
