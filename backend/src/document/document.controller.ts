import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/document.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (
          req: Express.Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ): void => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): Record<string, any> {
    return {
      message: 'Arquivo recebido com sucesso',
      filename: file.filename,
      originalname: file.originalname,
    };
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto): Document {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  findAll(): Document[] {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Document | undefined {
    return this.documentService.findOne(id);
  }
}
