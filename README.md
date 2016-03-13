# Benchmark tests popular json serializers for JS

Usage:

node benchmark.js

or

VALIDATE=1 node benchmark.js


#### Tested serializers

* Native JSON (like etalon)
* JSON + zlib compression
* MsgPack
* Cbor
* Bson

#### Results

```
=================================== Started ====================================
Json#test__________________encode x 21,507 ops/sec ±1.01% (86 runs sampled)
Json#test__________________decode x 9,039 ops/sec ±0.90% (89 runs sampled)
Json#test__________________roundtrip x 6,090 ops/sec ±0.62% (93 runs sampled)
Json compressed#test_______encode x 1,168 ops/sec ±1.20% (84 runs sampled)
Json compressed#test_______decode x 2,980 ops/sec ±0.43% (93 runs sampled)
Json compressed#test_______roundtrip x 874 ops/sec ±0.91% (86 runs sampled)
MsgPack#test_______________encode x 4,758 ops/sec ±1.13% (79 runs sampled)
MsgPack#test_______________decode x 2,632 ops/sec ±0.90% (91 runs sampled)
MsgPack#test_______________roundtrip x 1,692 ops/sec ±0.83% (91 runs sampled)
Cbor#test__________________encode x 1,529 ops/sec ±4.13% (89 runs sampled)
Cbor#test__________________decode x 1,198 ops/sec ±0.97% (88 runs sampled)
Cbor#test__________________roundtrip x 351 ops/sec ±3.28% (77 runs sampled)
Bson#test__________________encode x 93.21 ops/sec ±0.64% (76 runs sampled)
Bson#test__________________decode x 242 ops/sec ±0.63% (84 runs sampled)
Bson#test__________________roundtrip x 65.24 ops/sec ±1.27% (65 runs sampled)
Fastest is Json#test__________________roundtrip
==================================== Sizes =====================================
Json - 9482 bytes
Json compressed - 1872 bytes
MsgPack - 7628 bytes
Cbor - 7617 bytes
Bson - 112710 bytes
================================================================================
```