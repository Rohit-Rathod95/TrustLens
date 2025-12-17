// backend/src/handler.js

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf");
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
});

// 🔹 PDF text extraction (Node.js 20 safe)
async function extractTextFromPDF(buffer) {
  const loadingTask = pdfjsLib.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    text += strings.join(" ") + "\n";
  }

  return text;
}

exports.handler = async (event) => {
  try {
  let body;

if (event.body) {
  body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
} else {
  body = event; // Lambda console test case
}

    const { documentType, fileName, fileBase64 } = body;

    if (!documentType || !fileName || !fileBase64) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // 1️⃣ Decode PDF
    const buffer = new Uint8Array(Buffer.from(fileBase64, "base64"));


    // 2️⃣ Extract text
    const extractedText = await extractTextFromPDF(buffer);
    const text = extractedText.slice(0, 12000); // token safety

    // 3️⃣ Prompt
    const prompt = `
You are a financial risk analyst.

Analyze the following agreement and return a JSON object with:
- riskScore (0–100)
- riskLevel (Low / Medium / High)
- pros (array)
- cons (array)
- summary (simple language)

Agreement Text:
${text}

Return ONLY valid JSON.
`;

    // 4️⃣ Bedrock call
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const response = await bedrock.send(command);
    const responseBody = JSON.parse(
      Buffer.from(response.body).toString("utf-8")
    );

    // 5️⃣ SAFE JSON extraction from Claude
    const aiText = responseBody.content[0].text;
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Claude response did not contain JSON");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentType,
        fileName,
        analysis,
      }),
    };
  } catch (error) {
    console.error("Analysis Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Document analysis failed",
      }),
    };
  }
};
