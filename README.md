<a href="https://twitter.com/BLOCKOTUS">
    <img
         src="https://img.shields.io/twitter/follow/BLOCKOTUS?style=for-the-badge&logo=twitter"
     />
</a>
<a href="https://github.com/danielfebrero">
    <img
         src="https://img.shields.io/github/followers/danielfebrero?label=danielfebrero&style=for-the-badge&logo=github"
     />
</a>
<a href="https://github.com/BLOCKOTUS/admins">
    <img
         src="https://img.shields.io/github/stars/BLOCKOTUS/hyperledger-fabric-chaincode-helper?logo=github&style=for-the-badge"
     />
</a>
<a href="https://github.com/BLOCKOTUS/admins">
    <img
         src="https://img.shields.io/github/license/BLOCKOTUS/hyperledger-fabric-chaincode-helper?style=for-the-badge"
     />
</a>

<br />

# || BLOCKOTUS || Chaincode Helper
## for Hyperledger Fabric

<br />
<br />
<br />

<p align="center">
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
  <img 
      style="margin-right: 50px" 
      height="60px" 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png" 
  />
</a>
<a href="https://www.hyperledger.org/use/fabric">
  <img 
      style="margin-right: 0px" 
      height="60px" 
      src="https://www.hyperledger.org/wp-content/uploads/2018/03/Hyperledger_Fabric_Logo_Color-1-300x84.png" 
  />
</a>
</p>
<br />
<br />
<br />


## Documentation

Built-in DID requests.

### Methods

#### getTimestamp(ctx): number
#### getUniqueClientId(ctx): string
#### getParams(ctx, rules): Array<string>
#### exists(ctx, id): Promise<boolean>
#### getAllResultsFromIterator(iterator, isHistory, limit): Promise<Array<QueryResult>>


### Example

```javascript
import { BlockotusContract } from 'hyperledger-fabric-chaincode-helper';


class MyContract extends BlockotusContract {

  public async anyfunction(ctx) {
    const timestamp = this.getTimestamp(ctx);
    const uniqueClientId = this.getUniqueClientId(ctx);
    const params = this.getParams(ctx, { length: 2 });
    const exists = await this.exists(ctx, id);
    const results = await this.getAllResultsFromIterator(iterator, false, 5); // in a Write transaction, Fabric does not support Limit Queries. This helper does the job.
  }

  /**
   * Cross-contract invokeChaincode() does not support Parent Contract method as far as I know.
   * This is why we duplicate the method here.
   * Because the method is called from Did contract https://github.com/BLOCKOTUS/did
   */
  public async did(ctx: Context, subject: string, method: string, data: string): Promise<string> {
      return this.didRequest(ctx, subject, method, data);
  }

  /**
   * Cross-contract invokeChaincode() does not support Parent Contract method as far as I know.
   * This is why we duplicate the method here.
   */
  public async authDIDRequest(ctx: Context, origin: string, id: string): Promise<boolean> {
      return this.didAuthDIDRequest(ctx, origin, id);
  }

}
```

## _Tool compatible with || BLOCKOTUS || Organism_

Build complete decentralized applications with __Blockotus Open and Decentralized Standard__ and __Hyperledger Fabric__. 

The kit includes a Frontend (Svelte / React), a Backend (Nodejs / Express), a Network and Chaincode Contracts (Hyperledger Fabric) as specified by Blockotus Open and Decentralized Standard.

[BLOCKOTUS Organism](https://github.com/BLOCKOTUS/organism).

<br />
<br />
<br />

<a href="https://github.com/hyperledger/fabric-sdk-node/tree/master/fabric-network">
  <img src="https://img.shields.io/badge/fabric--network-%402.3.0-green?style=for-the-badge" />
</a>

<br />
<br />
