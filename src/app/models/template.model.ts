import { TransactionType } from '../shared/constants';

export class Template {

    public _id: string;
    public day: number;
    public payee: string;
    public amount: number;
    public type: TransactionType;
    public category: string;
    public subcategory: string;

    constructor(init?: Partial<Template>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
