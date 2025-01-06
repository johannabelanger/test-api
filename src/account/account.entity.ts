import { Entity, type Opt, PrimaryKey, Property, wrap } from '@mikro-orm/core';
import { Base } from '../common/base.entity.js';
import { AccountDto } from './account.dto.js';

@Entity({ tableName: 'accounts' })
export class Account extends Base {
  @PrimaryKey({ type: 'integer', generated: 'identity' })
  id!: number & Opt;

  @Property({ length: 250, nullable: true })
  accountName?: string;
  
  toJSON(){
    const c = wrap<Account>(this).toObject() as AccountDto;
    return c;
  }
}