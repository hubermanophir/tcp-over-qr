export enum MessageType {
  INITIATE = 0x01,
  ACK = 0x02,
  NACK = 0x03,
  FINISH = 0x04,
  ERROR = 0x05,
  DATA_CHUNK = 0x06,
}

export enum Size {
  TYPE_SIZE = 1,
  CHUNK_INDEX_SIZE = 4,
  TOTAL_CHUNKS_SIZE = 4,
  DATA_SIZE = 8, //256 max data size per QR code
  PAYLOAD_SIZE = TYPE_SIZE + CHUNK_INDEX_SIZE + TOTAL_CHUNKS_SIZE + 256,
  FILE_NAME_SIZE = 100,
  FILE_SIZE = 4,
}
