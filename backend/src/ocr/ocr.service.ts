import { Injectable, Logger } from '@nestjs/common';
import Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);

  async extractText(imagePath: string): Promise<string> {
    this.logger.log(`Iniciando OCR para: ${imagePath}`);

    try {
      const result = await Tesseract.recognize(imagePath, 'por', {
        logger: (m) => this.logger.debug(JSON.stringify(m)),
      });

      this.logger.log('OCR concluído com sucesso.');
      return result.data.text;
    } catch (error) {
      this.logger.error('Erro durante o OCR:', error);
      throw error;
    }
  }
}
