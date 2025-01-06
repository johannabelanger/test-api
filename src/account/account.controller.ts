import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { log } from 'console';
import { AccountDto } from './account.dto';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountsService: AccountService) {}

    @Get(':id')
    async findOne(@Param('id') id: number)  {
        log(`Getting account id ${id}`);
        const account = this.accountsService.findOne(id);
        log(account);
        return account;
    }
}
