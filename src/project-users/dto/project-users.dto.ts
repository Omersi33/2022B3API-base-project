import { IsNotEmpty, MinLength } from "class-validator";

export class CreateProjectUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  userId: string;
}
