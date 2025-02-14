export interface KinesisRecord {
  [key: string]: string;
}

export interface KinesisRequestData {
  timestamp: number;
  streamName: string;
  partitionKey?: string;
  records: KinesisRecord[];
}
