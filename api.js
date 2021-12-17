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
    } else {
      console.log(error);
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
    } else {
      console.log(error);
    }
  };
  request(options, callback);
});

router.get("/wallet/generate", (req, res) => {
  const privateKey = new bitcore.PrivateKey(); 
  const address = privateKey.toAddress();
  res.send({wallet:{
    privateKey: privateKey.bn,
    address: address,
  }});
});


router.get("/wallet/balance/:address", async (req, res) => {
  try{
  const address = req.params.address;
  const insight = new explorers.Insight();
  console.log(insight)
  let balance = 0;
  await insight.getUnspentUtxos([address], function(error, utxos) {
    if(utxos) {
      for (var i = 0; i < utxos.length; i++) {
        balance +=utxos[i]['satoshis'];
      }
    }
    console.log('balance:'+ balance);
  });
  res.send({balance: balance});
  } catch (error) {
    console.log(error)
  }
});

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