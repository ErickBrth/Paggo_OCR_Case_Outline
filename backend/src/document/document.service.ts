import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { LlmService } from '../llm/llm.service';

@Injectable()
export class DocumentService {
  constructor(
    private prisma: PrismaService,
    private llmService: LlmService,
  ) {}

  async create(userId: string, dto: CreateDocumentDto, filepath: string) {
    const ocrText = dto.text || 'Texto extraído do documento (simulado)';
    const llmSummary = await this.llmService.summarizeText(ocrText);
  
    return this.prisma.document.create({
      data: {
        filename: dto.filename,
        text: ocrText,
        llmSummary,
        filepath,
        user: {
          connectOrCreate: {
            where: { sub: userId },
            create: {
              sub: userId,
              email: dto.email,
            },
          },
        },
      },
    });
  }
  

  async findAllByUser(userId: string) {
    return this.prisma.document.findMany({
      where: {
        user: {
          sub: userId,
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.document.findUnique({ where: { id } });
  }
}
