import { TransactionType } from '../shared/constants';

export class Transaction {

    public date: Date;
    public payee: string;
    public description: string;
    public amount: number;
    public type: TransactionType;
    public account: string;
    public majorcategory: string;
    public subcategory: string;

    public static getGridView() {
        return [
            {headerName: 'Date', field: 'date', editable: true, width: 90},
            {headerName: 'Paid To', field: 'payee', editable: true, width: 200},
            // {headerName: 'Description', field: 'description', editable: true},
            {headerName: 'Amount', field: 'amount', editable: true, width: 200,
                cellClassRules: {
                    'rag-green' : 'x > 0',
                    'rag-red' : 'x < 0'
                },
                valueParser: (params) =>
                    (params.newValue === null || params.newValue === undefined || params.newValue === '') ?
                    null : parseFloat(params.newValue),
            },
            {headerName: 'Type', field: 'type', editable: true, width: 90},
            {headerName: 'Major Category', field: 'majorcategory', editable: true, width: 130},
            {headerName: 'Minor Category', field: 'subcategory', editable: true, width: 130},
            // {headerName: 'Account', field: 'account', editable: true}
        ];
    }

    // public static getFrameworkComponents() {
    //     return {
    //         incomeExpense : IncomeExpenseCellRenderer
    //     };
    // }

    constructor(init?: Partial<Transaction>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
