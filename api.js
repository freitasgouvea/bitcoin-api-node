Object.defineProperty(global, '_bitcore', { get(){ return undefined }, set(){} })
const express = require("express");
const router = express.Router();
const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers');
var request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const PORT =  process.env.RPC_PORT;
const URL = `http://${USER}:${PASS}@127.0.0.1:${PORT}/`

const headers = {
  "content-type": "text/plain;"
};

router.get("/", (req, res) => res.json({ status: 200, message: "api works" }));

router.get("/info", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockchaininfo","params":[]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/block/count", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/block/last-hash", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getbestblockhash","params":[]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/block/hash/:hash", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblock","params":["${
    req.params.hash
  }"]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/block/index/:index", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${
    req.params.index
  }]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/tx/raw/:id", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawtransaction","params":["${
    req.params.id
  }"]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/tx/decode/:hex", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"decoderawtransaction","params":["${
    req.params.hex
  }"]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/tx/send/:hex", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"sendrawtransaction","params":["${
    req.params.hex
  }"]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/tx/test/:hex", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"testmempoolaccept","params":[["${
    req.params.hex
  }"]]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/wallet/history", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"listtransactions","params":[]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/wallet/balance", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getbalance","params":[]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

router.get("/wallet/recieved/:address", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getreceivedbyaddress","params":["${
    req.params.address
  }", 1]}`;
  var options = {
    url: URL,
    method: "POST",
    headers: headers,
    body: dataString
  };
  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      data.status = 200;
      res.send(data);
    }
  };
  request(options, callback);
});

//bitcore-methods

router.get("/wallet/generate", (req, res) => {
  const privateKey = new bitcore.PrivateKey(); 
  const address = privateKey.toAddress();
  res.send({wallet:{
    privateKey: privateKey.bn,
    address: address,
  }});
});

//TODO method to get utxos or use insight

/*
var utxo = {
  "txId" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
  "outputIndex" : 0,
  "address" : "17XBj6iFEsf8kzDMGQk5ghZipxX49VXuaV",
  "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
  "satoshis" : 50000
};
*/

router.post("/tx/generate", (req, res) => {
  const pvKey = req.body.privateKey;
  const to = req.body.to;
  const value = req.body.value;
  const utxo = req.body.utxo;
  const transaction = new bitcore.Transaction()
    .from(utxo)
    .to(to, value)
    .sign(new bitcore.PrivateKey(pvKey));
  res.send({tx: transaction});
});

module.exports = router;
