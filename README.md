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
Json#test__________________encode x 55,390 ops/sec ±0.54% (87 runs sampled)
Json#test__________________decode x 23,865 ops/sec ±0.69% (85 runs sampled)
Json#test__________________roundtrip x 15,657 ops/sec ±0.72% (93 runs sampled)
Json compressed#test_______encode x 1,936 ops/sec ±1.77% (79 runs sampled)
Json compressed#test_______decode x 6,587 ops/sec ±0.54% (84 runs sampled)
Json compressed#test_______roundtrip x 1,351 ops/sec ±2.70% (80 runs sampled)
MsgPack#test_______________encode x 10,422 ops/sec ±1.04% (78 runs sampled)
MsgPack#test_______________decode x 7,809 ops/sec ±0.54% (85 runs sampled)
MsgPack#test_______________roundtrip x 4,411 ops/sec ±0.64% (91 runs sampled)
Cbor#test__________________encode x 3,845 ops/sec ±0.98% (88 runs sampled)
Cbor#test__________________decode x 3,163 ops/sec ±0.84% (93 runs sampled)
Cbor#test__________________roundtrip x 1,413 ops/sec ±5.63% (78 runs sampled)
Bson#test__________________encode x 268 ops/sec ±0.53% (86 runs sampled)
Bson#test__________________decode x 462 ops/sec ±1.29% (88 runs sampled)
Bson#test__________________roundtrip x 167 ops/sec ±0.71% (81 runs sampled)

Fastest is Json#test__________________roundtrip
==================================== Sizes =====================================
Json - 3433 bytes
Json compressed - 1267 bytes
MsgPack - 2853 bytes
Cbor - 2852 bytes
Bson - 40136 bytes
================================================================================
```