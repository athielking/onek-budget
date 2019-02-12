import { TransactionType } from '../shared/constants';
import { Moment } from 'moment';

export class Transaction {

    public id: number;
    public date: Moment;
    public payee: string;
    public description: string;
    public amount: number;
    public type: TransactionType;
    public account: string;
    public majorcategory: string;
    public subcategory: string;

    constructor(init?: Partial<Transaction>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
