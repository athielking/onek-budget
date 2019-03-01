import { Moment } from 'moment';

export class User {
    public username: string;
    public fullname: string;
    public email: string;
    public password: string;
    public createdAt: Moment;
    public roles: string[];

    constructor(init?: Partial<User>) {
        if ( init ) {
           Object.assign(this, init);
        }
    }
}
