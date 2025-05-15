import { KinesisRequestData } from "@shared/types/request";
import { KINESIS_DATA_KEY } from "@src/shared/constants/storage";
import { BADGE_COLOR } from "@shared/constants/colors";
import { StorageQueue } from "@src/lib/StorageQueue";

const storageQueue = new StorageQueue();

async function handleKinesisRequest(
  details: chrome.webRequest.WebRequestBodyDetails
): Promise<void> {
  try {
    const requestBody = details.requestBody?.raw?.[0]?.bytes;
    if (!requestBody) return;

    const bodyData = parseRequestBody(requestBody);
    if (!bodyData || (!bodyData.Records && !bodyData.Data)) return;

    const data: KinesisRequestData = {
      timestamp: details.timeStamp,
      streamName: bodyData.StreamName,
      partitionKey: bodyData.PartitionKey,
      records: decodeRecords(bodyData.Records ?? [{ Data: bodyData.Data }]),
    };

    await saveKinesisData(data);
  } catch (error) {
    console.error("[handleKinesisRequest] error:", error);
  }
}

function decodeRecords(data: any[]): any[] {
  return data.map((item) => decodeBase64(item.Data));
}

function parseRequestBody(bytes: ArrayBuffer): any {
  try {
    const decoder = new TextDecoder("utf-8");
    const bodyString = decoder.decode(bytes);
    return JSON.parse(bodyString);
  } catch (error) {
    console.error("[parseRequestBody] error:", error);
    return null;
  }
}

async function saveKinesisData(data: KinesisRequestData): Promise<void> {
  await storageQueue.enqueue(async () => {
    const result = await chrome.storage.local.get(KINESIS_DATA_KEY);
    const existingData = result[KINESIS_DATA_KEY] || [];
    const updatedData = [...existingData, data];

    await chrome.storage.local.set({
      [KINESIS_DATA_KEY]: updatedData,
    });

    updateBadge(updatedData.length);
  });
}

function updateBadge(count: number): void {
  chrome.action.setBadgeBackgroundColor({ color: BADGE_COLOR });
  chrome.action.setBadgeText({ text: count.toString() });
}

function decodeBase64(base64String: string): any {
  try {
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const decoder = new TextDecoder("utf-8");
    const decodedString = decoder.decode(bytes);
    return JSON.parse(decodedString);
  } catch (error) {
    console.error("[decodeBase64] error:", error);
    return null;
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.method === "POST" && details.url.includes("kinesis")) {
      handleKinesisRequest(details);
    }
  },
  { urls: ["*://*.amazonaws.com/*"] },
  ["requestBody"]
);
