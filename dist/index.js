"use strict";

require("core-js/modules/es.array.concat.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimestamp = exports.getUniqueClientId = void 0;

/**
 * Construct a standard unique id for each users of each organization of the network.
 * It is shared with other organs.
 * It makes the id management more consistent across the organs/chaincode.
 */
var getUniqueClientId = function getUniqueClientId(ctx) {
  var clientId = ctx.clientIdentity.getID();
  var mspId = ctx.clientIdentity.getMSPID();
  return "".concat(mspId, "::").concat(clientId);
};
/**
 * Retrieve the timestamp of a transaction.
 * It is shared with other organs.
 * It makes the timestamp management more consistent across the organs/chaincode.
 */


exports.getUniqueClientId = getUniqueClientId;

var getTimestamp = function getTimestamp(ctx) {
  var timestamp = ctx.stub.getTxTimestamp();
  return "".concat(timestamp.seconds).concat(timestamp.nanos);
};

exports.getTimestamp = getTimestamp;