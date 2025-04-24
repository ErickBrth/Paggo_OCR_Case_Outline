import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { LlmService } from '../llm/llm.service';
import { OcrModule } from '../ocr/ocr.module';

@Module({
  imports: [PrismaModule, OcrModule],
  controllers: [DocumentController],
  providers: [DocumentService, LlmService, OcrModule],
})
export class DocumentModule {}
