import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsSignInDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(18)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: 'password is too weak,try again with stronger one !',
  })
  password: string;
}
