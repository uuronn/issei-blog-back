import { IsNotEmpty, IsString } from 'class-validator';

export class LikesCountDTO {
  @IsNotEmpty()
  @IsString()
  blogId: string;
}
