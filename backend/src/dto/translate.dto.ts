import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class TranslateDto {
  @Transform(({ value }) => {
    if (typeof value === "string") {
      return value.trim();
    }

    return value;
  })
  @IsString({ message: "O campo 'texto' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'texto' é obrigatório!" })
  @MaxLength(5000, {
    message: "O campo 'texto' deve ter no máximo 5000 caracteres.",
  })
  texto!: string;

  @Transform(({ value }) => {
    if (typeof value === "string") {
      return value.trim();
    }

    return value;
  })
  @IsString({ message: "O campo 'idioma' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'idioma' é obrigatório!" })
  @MaxLength(50, {
    message: "O campo 'idioma' deve ter no máximo 50 caracteres.",
  })
  idioma!: string;
}
