export class Summary {

    public _id: string;
    public type: string;
    public category: string;
    public subcategory: string;
    public total: number;

    public children: Summary[] = [];

    constructor(init?: Partial<Summary>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}
