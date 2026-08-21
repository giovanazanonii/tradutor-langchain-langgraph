import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

export function validationPipe<T extends object>(dto: new () => T) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const payload = plainToInstance(dto, req.body ?? {}, {
      enableImplicitConversion: true,
    });
    const errors = await validate(payload as object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const firstError = errors[0];
      const message = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Dados inválidos.";

      res.status(400).json({ erro: message });
      return;
    }

    req.body = payload;
    next();
  };
}
