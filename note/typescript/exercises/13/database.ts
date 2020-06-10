type FieldQuery<FT> = 
    | {$eq: FT}
    | {$gt: FT}
    | {$lt: FT}
    | {$in: FT[]}
type Query<T> = { [K in keyof T]?: FieldQuery<T[K]> } & {
    $text?: string;
    $and?: Query<T>[];
    $or?: Query<T>[];
}


export class Database<T> {
    protected filename: string;
    protected fullTextSearchFieldNames: unknown[];

    constructor(filename: string, fullTextSearchFieldNames) {
        this.filename = filename;
        this.fullTextSearchFieldNames = fullTextSearchFieldNames;
    }

    async find(query: Query<T>): Promise<T[]> {
        // todo implement feature
        return [];
    }
}
