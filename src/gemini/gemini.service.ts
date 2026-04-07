import { Injectable } from '@nestjs/common';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { GoogleGenAI } from "@google/genai";
import { basicPromptUseCase } from './use-cases/basic-prompt.use-case';

@Injectable()
export class GeminiService {

    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    async basicPrompt(basicPromptDto: BasicPromptDto) {
        return basicPromptUseCase(this.ai, basicPromptDto);
    }
}
