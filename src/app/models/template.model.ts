import { TransactionType } from '../shared/constants';
import { Moment } from 'moment';
import * as moment from 'moment';

export class Template {

    public _id: string;
    public day: number;
    public recur: number;
    public recurrencePeriod: moment.unitOfTime.DurationConstructor;
    public recurrenceStart: Moment;
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
