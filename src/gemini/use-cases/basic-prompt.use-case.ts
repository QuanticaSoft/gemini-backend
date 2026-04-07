import { GoogleGenAI } from "@google/genai";
import { BasicPromptDto } from "../dtos/basic-prompt.dto";

interface Options {
    model?: string;
    systemInstruction?: string;
}

export const basicPromptUseCase = async (
    ai: GoogleGenAI, 
    basicPromptDto: BasicPromptDto,
    options?: Options,
) => {

    const { 
        model = 'gemini-2.0-flash', 
        systemInstruction = `
            Responde unicamente en espanol
            En formato markdown
            Usa negritas de esta forma __
            Usa el sistema metrico decimal
        `,
     } = options ?? {};

    const response = await ai.models.generateContent({
       model: model,
       contents: basicPromptDto.prompt,
       config:{
        systemInstruction: systemInstruction,
       }
    });
    console.log(response.text);

    // Implementation for basic prompt functionality
    return response.text;
}