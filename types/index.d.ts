declare module 'hyperledger-fabric-chaincode-helper' {

    import type { Context, Contract } from 'fabric-contract-api';

    export class BlockotusContract extends Contract {

        getTimestamp(ctx: Context): Number;
        getUniqueClientId(ctx: Context): string;
        didGet(ctx: Context, id: string): string;
        didPost(ctx: Context, data: any): string;
        didPut(ctx: Context, id: string, data: any): string;
        didDelete(ctx: Context, id: string): string;
        didRequest(ctx: Context, subject: string, method: string, data: string): Promise<string>;
    }

}
