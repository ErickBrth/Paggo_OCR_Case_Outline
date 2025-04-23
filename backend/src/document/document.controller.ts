import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GoogleAuthGuard } from '../auth/google.guard';
import { Document } from '@prisma/client';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    email: string;
  };
}

@Controller('documents')
@UseGuards(GoogleAuthGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string; document: Document }> {
    const userId = req.user?.sub;
    if (!userId) throw new UnauthorizedException('Usuário não autenticado');

    const dto: CreateDocumentDto = {
      filename: file.originalname,
      text: 'Texto extraído do documento (simulado)', // substituir com OCR real depois
    };

    const saved = await this.documentService.create(userId, dto, file.path);

    return {
      message: 'Arquivo salvo com sucesso!',
      document: saved,
    };
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest): Promise<Document[]> {
    const userId = req.user?.sub;
    if (!userId) throw new UnauthorizedException('Usuário não autenticado');

    return await this.documentService.findAllByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Document | null> {
    return await this.documentService.findOne(id);
  }
}
