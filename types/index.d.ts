declare module 'hyperledger-fabric-chaincode-helper' {

    import type { Context, Contract } from 'fabric-contract-api';
    import type { Iterators } from 'fabric-shim-api';

    type QueryResult = {
        Key: string | null,
        TxId: string | null,
        Timestamp: number | null,
        Value: string | any | null,
        Record: string | any | null,
    };

    export class BlockotusContract extends Contract {
        didAuthDIDRequest(ctx: Context, origin: string, id: string): Promise<boolean>;
        didGet(ctx: Context, id: string): Promise<string>;
        didPost(ctx: Context, data: any): Promise<string>;
        didPut(ctx: Context, id: string, data: any): Promise<string>;
        didDelete(ctx: Context, id: string): Promise<string>;
        didRequest(ctx: Context, subject: string, method: string, data: string): Promise<string>;
        exists(ctx: Context, id: string): Promise<boolean>;
        getAllResultsFromIterator(iterator: Iterators.StateQueryIterator, isHistory?: boolean, limit?: number): Promise<Array<QueryResult>>;
        getParams(ctx: Context, rules?: { length?: number }): Array<string>;
        getTimestamp(ctx: Context): Number;
        getUniqueClientId(ctx: Context): string;
        #setDIDControllerOrgan(co: string): void;
        #setGetControllerId(fn: function): void;
        #setName(name: string): void;
    }
}
