'use-strict';

const { Contract } = require('fabric-contract-api');

class BlockotusContract extends Contract {

    constructor(...args){
        super(...args);
        
        this.contractType = 'blockotus';

        this.actionsPerMethod = {
            GET: async (ctx, parsedSubject, parsedData) => await this.didGet(ctx, parsedSubject.organSpecificId),
            POST: async (ctx, parsedSubject, parsedData) => await this.didPost(ctx, parsedData),
            PUT: async (ctx, parsedSubject, parsedData) => await this.didPut(ctx, parsedSubject.organSpecificId, parsedData),
            DELETE: async (ctx, parsedSubject, parsedData) => await this.didDelete(ctx, parsedSubject.organSpecificId),
        }
    }

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

    /**
     * Get a DID document by blockotus id.
     * 
     * @param {Context} ctx context
     * @param {string} id userId
     */
    async didGet(ctx, id){
        const rawDidGetReponse = await ctx.stub.getState(id);
        if (!rawDidGetReponse || rawDidGetReponse.length === 0) { throw new Error(`${id} does not exist`); }
        return rawDidGetReponse.toString();
    }

    async didPost(ctx, data){
        throw new Error('POST Blockotus Method has not been implemented.');
    }

    async didPut(ctx, id, data){
        throw new Error('PUT Blockotus Method has not been implemented.');
    }

    async didDelete(ctx, id){
        throw new Error('DELETE Blockotus Method has not been implemented.');
    }

    /**
     * Executes a did request.
     */
    async didRequest(ctx, subject, method, data) {
        const parsedSubject = JSON.parse(subject);
        const parsedData =  data.length > 0 ? JSON.parse(data) : null;

        if (!this.actionsPerMethod[method]) {
            throw new Error(`${method} Blockotus Method has not been implemented.`);
        }

        const rawDidResponse = await this.actionsPerMethod[method](ctx, parsedSubject, parsedData);
        const parsedDidResponse = JSON.parse(rawDidResponse);

        return JSON.stringify({
            subject: parsedSubject,
            blockotus: parsedDidResponse,
        });
    }
}

module.exports = BlockotusContract;
