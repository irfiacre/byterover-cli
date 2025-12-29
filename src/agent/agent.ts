"use server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, tool } from "langchain";
import * as z from "zod";
import * as dotenv from "dotenv";

import { contextBuildPrompt } from "./prompts";
import { getFileContent } from "../utils/helpers";

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: API_KEY,
});

const ModelResponse = z.object({
  readme: z.string(),
  contextTree: z.object({
    bugFixes: z.string(),
    codeStyle: z.string(),
    compliance: z.string(),
    design: z.string(),
    structure: z.string(),
    testing: z.string(),
  }),
});
// const ModelResponse = z.object({
//     response: z.string(),
// })
export const getFileContentTool = tool(
  async (filePath: string) => {
    if (!filePath || typeof filePath !== "string") {
      throw new Error("filePath must be a non-empty string");
    }
    return await getFileContent(filePath);
  },
  {
    name: "getFileContent",
    description:
      "Reads and returns the full text content of a file at the given absolute or relative path. Use this tool only for files that exist in the provided file structure.",
  }
);

export const handleGetAgentOutput = async (question: string) => {
  const agent = createAgent({
    model,
    tools: [getFileContentTool],
    responseFormat: ModelResponse,
    systemPrompt: contextBuildPrompt,
  });

  const result = await agent.invoke({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  return result.structuredResponse;
};
