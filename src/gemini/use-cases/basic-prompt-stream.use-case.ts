import { GoogleGenAI } from "@google/genai";
import { BasicPromptDto } from "../dtos/basic-prompt.dto";

interface Options {
    model?: string;
    systemInstruction?: string;
}

export const basicPromptStreamUseCase = async (
    ai: GoogleGenAI, 
    basicPromptDto: BasicPromptDto,
    options?: Options,
) => {

    const { 
        //model = 'gemini-2.0-flash', 
        model = 'gemini-3-flash-preview',
        //las instrucciones que va a gobernar la respuesta del modelo
        systemInstruction = `
            Responde unicamente en espanol
            En formato markdown
            Usa negritas de esta forma __
            Usa el sistema metrico decimal
        `,
     } = options ?? {};

    const response = await ai.models.generateContentStream({
       model: model,
       contents: basicPromptDto.prompt,
       config:{
        systemInstruction: systemInstruction,
       }
    });
    //console.log(response.text);

    // Implementation for basic prompt functionality
    return response;
}