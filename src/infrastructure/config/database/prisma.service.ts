import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaLoggerService } from './prisma-logger.service';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private prismaLogger: PrismaLoggerService) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'pretty',
    });

    if (process.env.NODE_ENV !== 'production') {
      this.$on? (async (event: any) => {
        if (event?.event === 'query') {
          this.prismaLogger.logQuery(
            'Query: ',
            this.replaceQueryParam(event.query, event.params),
          );
          this.prismaLogger.logQuery('Duration: ', event.duration + 'ms');
        }
      }) : undefined || null;

    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    await app.close();
  }

  private replaceQueryParam(query: string, params: string): string {
    let updatedQuery = query;

    const listParsed = JSON.parse(params);

    for (let i = 0; i < listParsed.length; i++) {
      const parametro = `$${i + 1}`;
      const valor =
        typeof listParsed[i] === 'string'
          ? `'${listParsed[i]}'`
          : listParsed[i];
      updatedQuery = updatedQuery.replace(parametro, valor);
    }

    return updatedQuery;
  }
}