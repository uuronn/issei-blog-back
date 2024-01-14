import { IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
