import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('[Prisma] Conectado ao banco de dados');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('[Prisma] Conexão com banco de dados encerrada');
  }
}
