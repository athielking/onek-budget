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

    public _status: string = TransactionStatus.Pending;
    get status() {
        return this._status;
    }

    constructor(init?: Partial<Transaction>) {
        if (init) {
            Object.assign(this, init);
        }

        if (this._id) {
            this._status = TransactionStatus.Success;
        }
    }
}
