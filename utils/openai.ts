import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY as string;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);
