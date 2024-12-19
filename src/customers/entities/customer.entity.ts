import {Entity, PrimaryKey, Property, wrap} from '@mikro-orm/core';
import { CustomerDto } from '../dto/customer.dto';

@Entity()
export class Customer {
    @PrimaryKey()
    id!: number;
    
    @Property()
    fullName!: string;
    
    @Property()
    email!: string;

    @Property()
    phone!: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(fullName: string, email: string, phone: string){
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
    }

    toJSON(){
        const c = wrap<Customer>(this).toObject() as CustomerDto;
        return c;
    }
}
