import { IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsUUID()
  referringEmployeeId: string;
}
