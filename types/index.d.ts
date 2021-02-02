declare module 'hyperledger-fabric-chaincode-helper' {

    import type { Context } from 'fabric-contract-api';

    export function getTimestamp(ctx: Context): string;
    export function getUniqueClientId(ctx: Context): string;

}
