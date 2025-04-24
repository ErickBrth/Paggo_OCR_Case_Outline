import { Injectable, Logger } from '@nestjs/common';
import Tesseract from 'tesseract.js';
import { fromPath as convertPdfToImage } from 'pdf2pic';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Jimp } from 'jimp';

@Injectable()
export class OcrService {
  private readonly logger = new Logger(OcrService.name);

  async extractText(imagePath: string): Promise<string> {
    this.logger.log(`Iniciando OCR para imagem: ${imagePath}`);

    try {
      const processedImagePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '_processed.png') as `${string}.${string}`;

      const image = await Jimp.read(imagePath);
      await image.greyscale().contrast(1).normalize();

      await new Promise<void>((resolve, reject) => {
        (image.write as unknown as (path: string, cb: (err: Error | null) => void) => void)(
          processedImagePath,
          (err) => (err ? reject(err) : resolve())
        );
      });

      const result = await Tesseract.recognize(processedImagePath, 'por+eng', {
        logger: (m) => this.logger.debug(JSON.stringify(m)),
      });

      this.logger.log('OCR de imagem concluído.');
      this.logger.debug('Texto extraído:\n' + result.data.text);
      await fs.unlink(processedImagePath);

      return result.data.text.trim();
    } catch (error: any) {
      this.logger.error('Erro durante OCR de imagem:', error.message);
      return 'Erro durante OCR da imagem.';
    }
  }

  async extractTextFromPdf(pdfPath: string): Promise<string> {
    this.logger.log(`Iniciando OCR para PDF: ${pdfPath}`);

    if (!pdfPath) {
      throw new Error('Caminho para PDF não foi fornecido');
    }

    const outputDir = path.dirname(pdfPath);
    const converter = convertPdfToImage(pdfPath, {
      density: 120,
      savePath: outputDir,
      format: 'png',
      width: 900,
      height: 1300,
    });

    const maxPages = 3;
    const allTexts: string[] = [];

    for (let i = 1; i <= maxPages; i++) {
      try {
        const { path: imgPath } = await converter(i);
        if (!imgPath) throw new Error(`Falha ao gerar imagem da página ${i}`);

        const text = await this.extractText(imgPath);
        allTexts.push(`--- Página ${i} ---\n${text}`);
        await fs.unlink(imgPath);
      } catch (err: any) {
        this.logger.warn(`Falha ao converter página ${i}: ${err.message}`);
        break;
      }
    }

    const finalText = allTexts.join('\n\n');
    this.logger.log('OCR de PDF concluído.');

    return finalText.trim() || 'Nenhum texto extraído.';
  }
}
