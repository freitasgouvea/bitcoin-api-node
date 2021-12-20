Object.defineProperty(global, '_bitcore', { get() { return undefined }, set() { } })
const express = require("express");
const router = express.Router();
const bitcore = require('bitcore-lib');
var Insight = require("bitcore-explorers").Insight;
var insight = new Insight("https://test.bitpay.com");
var request = require("request");
const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const PORT = process.env.RPC_PORT;
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
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblock","params":["${req.params.hash
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
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockhash","params":[${req.params.index
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
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getrawtransaction","params":["${req.params.id
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
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"decoderawtransaction","params":["${req.params.hex
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
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"sendrawtransaction","params":["${req.params.hex
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

/*
{
    "tx": {
        "inputs": [
            {
                "txId": "769d47d71c3a94247dd38a37c74e057d3a419b6a7aaffe35568bdf025d08827f",
                "vout": 0,
                "sequence": 4294967295
            }
        ],
        "outputs": [
            {
                "76a914a34857258a49a1c9fd74090185905ca17d39378188ac": 0.00001,
            }
        ],
        "locktime": 0,
        "replaceable": false
    }

}
*/

router.post("/tx/create", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"createrawtransaction","params":
    [${req.body.tx.inputs}], 
    [${req.body.tx.outputs}],
    0,
    false
  }`;
  console.log(req.body.tx.inputs, req.body.tx.outputs, dataString)
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
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"testmempoolaccept","params":["${req.params.hex
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
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getreceivedbyaddress","params":["${req.params.address
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

router.get("/wallet/unspent/:address", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"listunspent","params":[ 1, 9999999, ["${req.params.address
    }"], true]}`;
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
  res.send({
    wallet: {
      privateKey: privateKey.bn,
      address: address,
    }
  });
});

router.get("/tx/unspent-test/:address", (req, res) => {
  const address = req.params.address;
  insight.getUnspentUtxos(address, function (error, utxos) {
    console.log(utxos)
    if (error) {
      res.send(error);
    } else {
      res.send(utxos);
    }
  });
});

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
  const from = req.body.from;
  const to = req.body.to;
  const value = req.body.value;
  const utxo = req.body.utxo;
  const transaction = new bitcore.Transaction()
    .from(utxo)
    .to(to, value)
    .change(from)
    .sign(new bitcore.PrivateKey(pvKey))
    .serialize(true);
  insight.broadcast(transaction, function (error, transactionId) {
    console.log(error)
    if (error) {
      res.send(error.message);
    } else {
      res.send({ tx: transaction, txId: transactionId });
    }
  });
});

module.exports = router;
