const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

const client = new BedrockRuntimeClient({ region: "us-east-1" });

async function test() {
  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-haiku-20240307-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Say hello in one sentence",
        },
      ],
    }),
  });

  const response = await client.send(command);
  const body = JSON.parse(Buffer.from(response.body).toString("utf-8"));
  console.log(body.content[0].text);
}

test().catch(console.error);
