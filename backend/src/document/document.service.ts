import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  private documents: Document[] = [];

  create(createDocumentDto: CreateDocumentDto): Document {
    const newDocument: Document = {
      id: (this.documents.length + 1).toString(),
      filename: createDocumentDto.filename,
      text: 'Texto extraído do documento (simulado)',
      createdAt: new Date().toISOString(),
    };
    this.documents.push(newDocument);
    return newDocument;
  }

  findAll(): Document[] {
    return this.documents;
  }

  findOne(id: string): Document | undefined {
    return this.documents.find((doc) => doc.id === id);
  }
}
