var fs 			   = require('fs');
var CBOR       = require('cbor-js');
var msgpack 	 = require("msgpack-lite");
var Benchmark  = require('benchmark');
var bson 		   = require('bson');
var BSON 		   = new bson.BSONPure.BSON();
var util 		   = require('util');
var _ 			   = require('lodash')

var jsonData    = require('./test.json');
var stringData  = JSON.stringify(jsonData)
var msgpackData = msgpack.encode(jsonData);
var cborData    = CBOR.encode(jsonData);
var bsonData    = BSON.serialize(stringData, false, true, false);

var suite = new Benchmark.Suite

// add tests
suite.add('Json#test__encode', function() {
  JSON.stringify(jsonData);
})
.add('Json#test__decode', function() {
  JSON.parse(stringData);
})
.add('Json#test_roundtrip', function() {
  var buffer = new Buffer(JSON.stringify(jsonData));
  JSON.parse(buffer);

  this["_size"] = buffer.length;
})
.add('MsgPack#test__encode', function() {
  var buffer = msgpack.encode(jsonData);
})
.add('MsgPack#test__decode', function() {
  msgpack.decode(msgpackData);
})
.add('MsgPack#test__roundtrip', function() {
  var buffer = msgpack.encode(jsonData);

  msgpack.decode(buffer);
  this["_size"] = buffer.length;
})
.add('Cbor#test__encode', function() {
  var buffer = CBOR.encode(jsonData);
})
.add('Cbor#test__decode', function() {
  CBOR.decode(cborData);
})
.add('Cbor#test__roundtrip', function() {
  var buffer = CBOR.encode(jsonData);

  CBOR.decode(buffer);
  this["_size"] = buffer.byteLength;
})
.add('Bson#test__encode', function() {
  var buffer = BSON.serialize(stringData, false, true, false);

  BSON.deserialize(buffer);
})
.add('Bson#test__decode', function() {
  BSON.deserialize(bsonData);
})
.add('Bson#test__roundtrip', function() {
  var buffer = BSON.serialize(stringData, false, true, false);

  BSON.deserialize(buffer);
  this["_size"] = buffer.length;
})
// add listeners
.on('start', function(event) {
	console.log("==================== Started =====================");
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function(event) {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  console.log("==================== Sizes =====================");

  for (i = 0; i < event.currentTarget.length; i++) {
    if ( event.currentTarget[i].name.indexOf('roundtrip') != -1 ){
  	 console.log(event.currentTarget[i].name + ' - ' + event.currentTarget[i]._size + ' bytes');
    }
  }
  console.log("================================================");
})
// run async
.run({ 'async': true });
