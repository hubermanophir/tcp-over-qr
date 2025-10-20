export enum MessageType {
  INITIATE = 0x01,
  ACK = 0x02,
  NACK = 0x03,
  FINISH = 0x04,
  ERROR = 0x05,
  DATA_CHUNK = 0x06,
}

export interface BaseHeader {
  messageType: MessageType;
  chunkIndex: number;
  totalChunks: number;
  payloadLength: number;
  checksum: number;
}

export interface InitiateMessage extends BaseHeader {
  fileSize: bigint;
  fileNameLength: number;
  fileName: string;
}

export interface FileMessage extends BaseHeader {
  data: Uint8Array;
}
