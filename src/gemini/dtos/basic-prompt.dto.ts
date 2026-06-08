import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";


export class BasicPromptDto {
    @IsString()
    @IsNotEmpty()
    prompt!: string;// | undefined;

    @IsArray()
    @IsOptional()
    files?: Express.Multer.File[]; // Optional array of files
}