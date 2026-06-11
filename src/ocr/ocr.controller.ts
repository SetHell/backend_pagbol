import {
  BadRequestException,
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OcrService } from './ocr.service';

type ArchivoOcr = {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
};

const validarArchivoImagen = (
  _req: unknown,
  file: ArchivoOcr,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.startsWith('image/')) {
    callback(null, false);
    return;
  }

  callback(null, true);
};

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @UseGuards(JwtAuthGuard)
  @Post('procesar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: validarArchivoImagen,
    }),
  )
  procesar(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        exceptionFactory: () =>
          new BadRequestException('Debe enviar una imagen válida'),
      }),
    )
    file: ArchivoOcr,
  ) {
    return this.ocrService.procesar(file);
  }
}
