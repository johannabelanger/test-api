import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';
import { AccountService } from './account/account.service';
import { MikroORM } from '@mikro-orm/postgresql';

@Module({
  imports: [MikroOrmModule.forRoot(), AccountModule],
  controllers: [AppController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM){}
  
  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(MikroOrmMiddleware)
    .forRoutes('*');
  }

}
  