import type { Context } from 'fabric-contract-api';

/**
 * Construct a standard unique id for each users of each organization of the network.
 * It is shared with other organs.
 * It makes the id management more consistent across the organs/chaincode.
 */
export const getUniqueClientId = (ctx: Context): string => {
    const clientId = ctx.clientIdentity.getID();
    const mspId = ctx.clientIdentity.getMSPID();
    return `${mspId}::${clientId}`;
}

/**
 * Retrieve the timestamp of a transaction.
 * It is shared with other organs.
 * It makes the timestamp management more consistent across the organs/chaincode.
 */
export const getTimestamp = (ctx: Context): string => {
    const timestamp = ctx.stub.getTxTimestamp();
    return `${timestamp.seconds}${timestamp.nanos}`;
}