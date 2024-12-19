import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  