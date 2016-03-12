var Benchmark     = require('benchmark');
var jsondiffpatch = require('jsondiffpatch').create({});

var CBOR          = require('cbor-js');
var msgpack       = require("msgpack-lite");
var pako          = require('pako');
var bson          = require('bson');
var BSON          = new bson.BSONNative.BSON([
  bson.Long,
  bson.ObjectID,
  bson.Binary,
  bson.Code,
  bson.DBRef,
  bson.Symbol,
  bson.Double,
  bson.Timestamp,
  bson.MaxKey,
  bson.MinKey
]);

var jsonData      = require('./test.json');
var pakedData     = pako.deflate(JSON.stringify(jsonData), { to: 'string'});
var stringData    = JSON.stringify(jsonData)
var msgpackData   = msgpack.encode(jsonData);
var cborData      = CBOR.encode(jsonData);
var bsonData      = BSON.serialize(stringData, null, true);

var suite         = new Benchmark.Suite

// add tests
suite
.add('Json#test__________________encode', function() {
  var buf = JSON.stringify(jsonData);

  this["_size"] = buf.length;
})
.add('Json#test__________________decode', function() {
  JSON.parse(stringData);
})
.add('Json#test__________________roundtrip', function() {
  this['_data'] = JSON.parse(JSON.stringify(jsonData));
})
// Json + compression
.add('Json compressed#test_______encode', function() {
  var buffer = pako.deflate(JSON.stringify(jsonData), { to: 'string'});

  this["_size"] = buffer.length;
})
.add('Json compressed#test_______decode', function() {
  JSON.parse(pako.inflate(pakedData, { to: 'string' }));
})
.add('Json compressed#test_______roundtrip', function() {
  var buffer = pako.deflate(JSON.stringify(jsonData), { to: 'string'})

  this['_data'] = JSON.parse(pako.inflate(buffer, {to: 'string'}));
})
// MsgPack
.add('MsgPack#test_______________encode', function() {
  var buffer = msgpack.encode(jsonData);

  this["_size"] = buffer.length;
})
.add('MsgPack#test_______________decode', function() {
  msgpack.decode(msgpackData);
})
.add('MsgPack#test_______________roundtrip', function() {
  this['_data'] = msgpack.decode(msgpack.encode(jsonData));
})
// Cbor
.add('Cbor#test__________________encode', function() {
  var buffer = CBOR.encode(jsonData);

  this["_size"] = buffer.byteLength;
})
.add('Cbor#test__________________decode', function() {
  CBOR.decode(cborData);
})
.add('Cbor#test__________________roundtrip', function() {
  this['_data'] = CBOR.decode(CBOR.encode(jsonData));
})
// Bson
.add('Bson#test__________________encode', function() {
  var buffer = BSON.serialize(stringData, false, true, false);

  this["_size"] = buffer.length;
})
.add('Bson#test__________________decode', function() {
  BSON.deserialize(bsonData);
})
.add('Bson#test__________________roundtrip', function() {
  this['_data'] = BSON.deserialize(BSON.serialize(stringData, null, true));
})
// add listeners
.on('start', function(event) {
  console.log("=================================== Started ====================================");
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function(event) {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  console.log("==================================== Sizes =====================================");

  for (i = 0; i < event.currentTarget.length; i++) {
    if ( event.currentTarget[i].name.indexOf('encode') != -1 ){
     console.log(event.currentTarget[i].name + ' - ' + event.currentTarget[i]._size + ' bytes');
    }
  }

  if (process.env.VALIDATE) {
    console.log("============================== Validate results ================================");
    for (i = 0; i < event.currentTarget.length; i++) {

      if ( event.currentTarget[i].name.indexOf('roundtrip') != -1 ){
        if (diff = jsondiffpatch.diff(jsonData, event.currentTarget[i]._data)) {
          console.log(event.currentTarget[i].name + " - unmarshaled object differed: ");
          console.log(event.currentTarget[i]._data);
        } else {
          console.log(event.currentTarget[i].name + " - unmarshaled object identical.");
        }
      }

    }
  }

  console.log("================================================================================");
})
.run({ 'async': true });
