import { KinesisRequestData } from "@shared/types/request";
import { KINESIS_DATA_KEY } from "@shared/constants/config";
import { BADGE_COLOR } from "@shared/constants/colors";

async function handleKinesisRequest(
  details: chrome.webRequest.WebRequestBodyDetails
) {
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
    console.error("Error handling Kinesis request:", error);
  }
}

function decodeRecords(data: any[]) {
  return data.map((item) => decodeBase64(item.Data));
}

function parseRequestBody(bytes: ArrayBuffer): any {
  const decoder = new TextDecoder("utf-8");
  const bodyString = decoder.decode(bytes);
  return JSON.parse(bodyString);
}

async function saveKinesisData(data: KinesisRequestData): Promise<void> {
  const result = await chrome.storage.local.get(KINESIS_DATA_KEY);
  await chrome.storage.local.set({
    [KINESIS_DATA_KEY]: [...(result[KINESIS_DATA_KEY] ?? []), data],
  });

  updateBadge(
    result[KINESIS_DATA_KEY]?.length ? result[KINESIS_DATA_KEY].length + 1 : 0
  );
}

function updateBadge(count: number) {
  chrome.action.setBadgeBackgroundColor({ color: BADGE_COLOR });
  chrome.action.setBadgeText({ text: count.toString() });
}

function decodeBase64(base64String: string) {
  try {
    const decodedString = atob(base64String);
    return JSON.parse(decodedString);
  } catch (error) {
    console.error("Decoding failed:", error);
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
