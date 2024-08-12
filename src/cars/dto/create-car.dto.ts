import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateCarDto {
    @IsString()
    readonly brand : string;

    @IsString()
    readonly model : string;
}