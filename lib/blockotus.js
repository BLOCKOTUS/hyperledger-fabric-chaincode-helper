'use-strict';

const { Contract } = require('fabric-contract-api');

class BlockotusContract extends Contract {

    constructor(...args){
        super(...args);
        
        this.contractType = 'blockotus';

        this.organName = null;

        this.DIDControllerOrgan = null;

        this.actionsPerMethod = {
            GET: async (ctx, parsedSubject, parsedData) => await this.didGet(ctx, parsedSubject.organSpecificId),
            POST: async (ctx, parsedSubject, parsedData) => await this.didPost(ctx, parsedData),
            PUT: async (ctx, parsedSubject, parsedData) => await this.didPut(ctx, parsedSubject.organSpecificId, parsedData),
            DELETE: async (ctx, parsedSubject, parsedData) => await this.didDelete(ctx, parsedSubject.organSpecificId),
        }
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

        const object = rawDidGetReponse.toString();
        const parsedObject = JSON.parse(object);
        const fullObject = { ...parsedObject, id };
        return JSON.stringify(fullObject);
    }

    /**
     * Create a DID document.
     * 
     * @param {Context} ctx context
     * @param {object} data data
     */
    async didPost(ctx, data){
        throw new Error('POST Blockotus Method has not been implemented.');
    }

    /**
     * Edit a DID document by blockotus id.
     * 
     * @param {Context} ctx context
     * @param {string} id userId
     * @param {object} data data
     */
    async didPut(ctx, id, data){
        if (!this.authDIDRequest(ctx, this.organName, id)) {
            throw new Error('Request not authorized.');
        }

        throw new Error('PUT Blockotus Method has not been implemented.');

    }

    /**
     * Delete a DID document by blockotus id.
     * 
     * @param {Context} ctx context
     * @param {string} id userId
     */
    async didDelete(ctx, id){
        if (!this.authDIDRequest(ctx, this.organName, id)) {
            throw new Error('Request not authorized.');
        }

        throw new Error('DELETE Blockotus Method has not been implemented.');
    }

    /**
     * Executes a did request.
     * 
     * @param {Context} ctx context
     * @param {string} subject subject
     * @param {string} method method
     * @param {string} data data
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

    /**
     * Check if a blockotus id exists.
     * 
     * @param {Context} ctx context
     * @param {string} id blockotusId
     */
    async exists(ctx, id) {
        const existing = await ctx.stub.getState(id);
        return !existing.toString() ? false : true;
    }

    /**
     * Retrieve results from an interator.
     * Construct an array, and can respect a length limit.
     * 
     * @param {Iterators.StateQueryIterator} iterator iterator
     * @param {boolean} isHistory context
     * @param {number} limit context
     */
    async getAllResultsFromIterator(iterator, isHistory, limit = 0) {
        const allResults = [];
        let res = await iterator.next();
        while (!res.done || (allResults.length < limit && limit > 0)) {
            if (res.value && res.value.value.toString()) {
                const jsonRes = {
                    Key: null,
                    TxId: null,
                    Timestamp: null,
                    Value: null,
                    Record: null,
                };
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.tx_id;
                    jsonRes.Timestamp = Number(res.value.timestamp);
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                if (allResults.length < limit) { allResults.push(jsonRes); }
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }

    /**
     * Construct a standard unique id for each users of each organization of the network.
     * 
     * @param {Context} ctx context
     */
    getUniqueClientId(ctx) {
        const clientId = ctx.clientIdentity.getID();
        const mspId = ctx.clientIdentity.getMSPID();
        return `${mspId}::${clientId}`;
    }

    /**
     * Retrieve the timestamp of a transaction.
     * 
     * @param {Context} ctx context
     */
    getTimestamp(ctx) {
        const timestamp = ctx.stub.getTxTimestamp();
        return Number(`${timestamp.seconds}${timestamp.nanos}`);
    }

    /**
     * Validate and return Context params.
     * 
     * @param {Context} ctx context
     * @param {object} rules rules
     */
    getParams(ctx, rules = {}) {
        const args = ctx.stub.getFunctionAndParameters();
        const params = args.params;

        if (rules.length && params.length !== rules.length) { throw new Error(`Incorrect number of arguments. Expecting ${rules.length}. Args: ${JSON.stringify(params)}`); }
    
        return params;
    }

    /**
     * Set DID Controller Organ.
     * 
     * @param {string} co controller name
     */
     setDIDControllerOrgan(co) {
        this.DIDControllerOrgan = co;
    }

    /**
     * Set Organ name.
     * 
     * @param {string} name organ name
     */
     setOrganName(name) {
        this.organName = name;
    }

    /**
     * Authorize or not a DID request.
     * 
     */
     async authDIDRequest(ctx, origin, id) {
        // do not authorize if controller organ is not set
        if (this.DIDControllerOrgan === null) {
            return false;
        }

        // if controller organ is 'self', then the blockotus id must match the client id (user being top level controller)
        if (this.DIDControllerOrgan === 'self' && origin === this.organName) {
            return this.getUniqueClientId(ctx) == id;
        }

        if (this.DIDControllerOrgan === 'self' && origin !== this.organName) {
            // verify ownership on this entity
        }

        // else, return the question to the controller organ
        const rawAuthRequest = await ctx.stub.invokeChaincode(
            this.DIDControllerOrgan,
            [
              'didAuthDIDRequest',
              origin,
              id,
            ],
            'mychannel',
          );
          if (rawAuthRequest.status !== 200) { throw new Error(rawAuthRequest.message); }
          return Boolean(rawDidRequest.payload.toString());
    }
}

module.exports = BlockotusContract;
