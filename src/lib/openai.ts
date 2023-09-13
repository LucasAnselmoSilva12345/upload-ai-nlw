import 'dotenv/config';
import { OpenAI } from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.ACCOUNT_OPENAI_KEY,
});
