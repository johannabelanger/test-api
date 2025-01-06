import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Account } from "./account.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { log } from "console";

@Injectable()
export class AccountService {
    constructor(private readonly entityManager: EntityManager
    ) {}

    async findOne(id: number) {
        const account = id ? await this.entityManager.findOneOrFail(Account,id) : undefined;
        return account?.toJSON();
    }
} 