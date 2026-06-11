import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import FormData from 'form-data';

type MulterFile = {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
};

type OcrResponse = {
  mensaje?: string;
  cantidad_textos?: number;
  texto_bruto?: unknown[];
  zonas?: unknown;
  casillas?: unknown;
  datos_sugeridos?: unknown;
  advertencia?: string;
};

@Injectable()
export class OcrService {
  constructor(private readonly httpService: HttpService) {}

  async procesar(file: MulterFile) {
    if (!file) {
      throw new BadRequestException('Debe enviar una imagen');
    }

    if (!file.mimetype?.startsWith('image/')) {
      throw new BadRequestException('El archivo debe ser una imagen');
    }

    const ocrUrl = process.env.OCR_URL;

    if (!ocrUrl) {
      throw new ServiceUnavailableException(
        'Servicio OCR no configurado en backend/.env',
      );
    }

    try {
      const formData = new FormData();

      formData.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      const respuesta = await this.httpService.axiosRef.post<OcrResponse>(
        ocrUrl,
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 120000,
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        },
      );

      return {
        mensaje: 'OCR procesado correctamente',
        resultado: respuesta.data,
      };
    } catch (error) {
      console.error('ERROR CONECTANDO AL OCR:');

      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }

      throw new ServiceUnavailableException(
        'No se puede conectar con el servicio OCR',
      );
    }
  }
}
