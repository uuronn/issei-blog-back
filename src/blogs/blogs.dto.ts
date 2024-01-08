import { IsNotEmpty, IsString } from 'class-validator';

export class BlogDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
