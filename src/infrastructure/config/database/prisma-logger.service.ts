import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PrismaLoggerService extends Logger {
  logQuery(title: string, query: string) {
    const blue = '\x1b[34m';
    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';
    const green = '\x1b[32m';

    this.log(
      `${yellow}${new Date().toISOString()} ${green}${title} ${reset}${blue}${query}${reset}`,
      'Prisma',
    );
  }
}