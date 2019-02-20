import { TransactionType, TransactionStatus } from '../shared/constants';
import { Moment } from 'moment';

export class Transaction {

    public _id: string;
    public date: Moment;
    public payee: string;
    public description: string;
    public amount: number;
    public type: TransactionType;
    public account: string;
    public category: string;
    public subcategory: string;

    // private _status: string = TransactionStatus.Pending;
    get status(): string {

        if (!this._id) {
            return TransactionStatus.Pending;
        }

        if (+this._id < 0 ) {
            return TransactionStatus.Error;
        }

        return TransactionStatus.Success;
    }

    constructor(init?: Partial<Transaction>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
