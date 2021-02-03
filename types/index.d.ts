declare module 'hyperledger-fabric-chaincode-helper' {

    import type { Context, Contract } from 'fabric-contract-api';

    export class BlockotusContract extends Contract {

        getTimestamp(ctx: Context): Number;
        getUniqueClientId(ctx: Context): string;
        
    }

}
