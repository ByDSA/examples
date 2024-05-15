import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class NumberValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata): number {
    const parsed = +value;

    if (!Number.isNaN(parsed))
      return parsed;

    throw new BadRequestException("El parametro debe ser un number");
  }
}
