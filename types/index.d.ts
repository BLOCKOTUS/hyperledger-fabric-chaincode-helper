declare module 'hyperledger-fabric-chaincode-helper' {

    import type { Context, Contract } from 'fabric-contract-api';

    export class BlockotusContract extends Contract {
        didGet(ctx: Context, id: string): Promise<string>;
        didPost(ctx: Context, data: any): Promise<string>;
        didPut(ctx: Context, id: string, data: any): Promise<string>;
        didDelete(ctx: Context, id: string): Promise<string>;
        didRequest(ctx: Context, subject: string, method: string, data: string): Promise<string>;
        getTimestamp(ctx: Context): Number;
        getUniqueClientId(ctx: Context): string;
        getParams(ctx: Context, rules: { length?: number }): Array<string>;
    }
}
