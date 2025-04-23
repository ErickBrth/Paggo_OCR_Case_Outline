import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    dto: CreateDocumentDto,
    filepath: string,
  ): Promise<Document> {
    return await this.prisma.document.create({
      data: {
        filename: dto.filename,
        text: dto.text ?? '',
        filepath,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAllByUser(userId: string): Promise<Document[]> {
    return await this.prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Document | null> {
    return await this.prisma.document.findUnique({
      where: { id },
    });
  }
}
