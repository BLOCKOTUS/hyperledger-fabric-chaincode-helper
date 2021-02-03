'use-strict';

const { Contract } = require('fabric-contract-api');

class BlockotusContract extends Contract {
    /**
     * Construct a standard unique id for each users of each organization of the network.
     */
    getUniqueClientId(ctx) {
        const clientId = ctx.clientIdentity.getID();
        const mspId = ctx.clientIdentity.getMSPID();
        return `${mspId}::${clientId}`;
    }

    /**
     * Retrieve the timestamp of a transaction.
     */
    getTimestamp(ctx) {
        const timestamp = ctx.stub.getTxTimestamp();
        return Number(`${timestamp.seconds}${timestamp.nanos}`);
    }
}

module.exports = BlockotusContract;
