import { IsEmail, IsOptional } from 'class-validator';

export class UploadGradesDto {
    @IsEmail()
    @IsOptional()
    email: string;
}