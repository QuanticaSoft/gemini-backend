import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
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

    const {prompt, files = []} = basicPromptDto;

    //console.log('Received files in use case:', {files});

    //console.log({desdeUseCase: files});

    // const firstImage = files[0]!;
    // const image = await ai.files.upload({
    //     file: new Blob([new Uint8Array(firstImage.buffer)], { type: firstImage.mimetype }),
    // });


    //Para todas la imagenes..
    const images = await Promise.all(
        files.map( (file) => {
            const uploadedImage = ai.files.upload({
                file: new Blob([new Uint8Array(file.buffer)], { 
                    type: file.mimetype.includes('image') ? file.mimetype : 'application/octet-stream' 
                }),
            });
            return uploadedImage;
        }
    ));


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
       //contents: basicPromptDto.prompt,
       contents: [
        createUserContent([
            prompt,
            // Imagenes o archivos adjuntos
            //createPartFromUri(image.uri ?? '', image.mimeType ?? ''),
            //Todas las imagenes subidas
            ...images.map(img => createPartFromUri(img.uri ?? '', img.mimeType ?? '')), 
        ])
       ], 
       config:{
        systemInstruction: systemInstruction,
       }
    });
    //console.log(response.text);

    // Implementation for basic prompt functionality
    return response;
}