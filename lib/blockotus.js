'use-strict';

const { Contract } = require('fabric-contract-api');

class BlockotusContract extends Contract {
    /**
     * Construct a standard unique id for each users of each organization of the network.
     * It is shared with other organs.
     * It makes the id management more consistent across the organs/chaincode.
     */
    getUniqueClientId(ctx) {
        const clientId = ctx.clientIdentity.getID();
        const mspId = ctx.clientIdentity.getMSPID();
        return `${mspId}::${clientId}`;
    }

    /**
     * Retrieve the timestamp of a transaction.
     * It is shared with other organs.
     * It makes the timestamp management more consistent across the organs/chaincode.
     */
    getTimestamp(ctx) {
        const timestamp = ctx.stub.getTxTimestamp();
        return `${timestamp.seconds}${timestamp.nanos}`;
    }
}

module.exports = BlockotusContract;
