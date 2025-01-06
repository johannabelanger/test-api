import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { Account } from "./account.entity";
import { AccountService } from "./account.service";

@Module({
    imports: [MikroOrmModule.forFeature({entities: [Account]}), AccountModule],
    providers: [AccountService],
    controllers: [AccountController],
})

export class AccountModule {}