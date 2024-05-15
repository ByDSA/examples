import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class StringValidationPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    if (typeof value !== "string")
      throw new BadRequestException("El parámetro debe ser un string");

    return value.toString();
  }
}
