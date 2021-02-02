import type { Context } from 'fabric-contract-api';

export let getTimestamp: (ctx: Context) => string;
export let getUniqueClientId: (ctx: Context) => string;
