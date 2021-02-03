'use-strict';

const { raw } = require('core-js/fn/string');
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

    async didGet(ctx, id){
        
    }

    async didPost(ctx, data){
        
    }

    async didPut(ctx, id, data){
        
    }

    async didDelete(ctx, id){
        
    }

    /**
     * Executes a did request.
     */
    async didRequest(ctx, subject, method, data) {
        const parsedSubject = JSON.parse(subject);
        const parsedData =  data.length > 0 ? JSON.parse(data) : null;

        let rawDidResponse;
        let parsedDidResponse;

        switch(method){
            case 'GET':
                rawDidResponse = await this.didGet(ctx, parsedSubject.organSpecificId);
                parsedDidResponse = JSON.parse(rawDidResponse);
                break;

            case 'POST':
                rawDidResponse = await this.didPost(ctx, parsedData);
                parsedDidResponse = JSON.parse(rawDidResponse);
                break;

            case 'PUT':
                rawDidResponse = await this.didPut(ctx, parsedSubject.organSpecificId, parsedData);
                parsedDidResponse = JSON.parse(rawDidResponse);
                break;

            case 'DELETE':
                rawDidResponse = await this.didDelete(ctx, parsedSubject.organSpecificId);
                parsedDidResponse = JSON.parse(rawDidResponse);
                break;
        }

        return JSON.stringify({
            subject: parsedSubject,
            blockotus: parsedDidResponse,
        });

    }
}

module.exports = BlockotusContract;
