export enum MessageType {
  INITIATE = 0x01,
  DATA_CHUNK = 0x02,
  ACK_DATA_CHUNK = 0x03,
  FILE_DATA = 0x04,
  ACK_FILE_DATA = 0x05,
  FINISH = 0x06,
  ERROR = 0x07,
}

export enum Size {
  TYPE = 1,
  PAYLOAD_LENGTH = 1,
  FILE_NAME = 100,
  FILE_SIZE = 4,
  OFFSET = 4,
  PAYLOAD_SIZE = 128,
}
