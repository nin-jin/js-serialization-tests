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
Tree#test__________________encode x 8,991 ops/sec ±0.79% (90 runs sampled)
Tree#test__________________decode x 794 ops/sec ±2.03% (59 runs sampled)
Tree#test__________________roundtrip x 698 ops/sec ±2.37% (79 runs sampled)

Json#test__________________encode x 17,274 ops/sec ±1.00% (91 runs sampled)
Json#test__________________decode x 6,311 ops/sec ±0.89% (90 runs sampled)
Json#test__________________roundtrip x 4,324 ops/sec ±2.24% (88 runs sampled)

Json compressed#test_______encode x 1,080 ops/sec ±1.53% (79 runs sampled)
Json compressed#test_______decode x 1,399 ops/sec ±0.93% (89 runs sampled)
Json compressed#test_______roundtrip x 658 ops/sec ±1.31% (84 runs sampled)

MsgPack#test_______________encode x 5,996 ops/sec ±2.17% (80 runs sampled)
MsgPack#test_______________decode x 3,129 ops/sec ±0.70% (91 runs sampled)
MsgPack#test_______________roundtrip x 2,040 ops/sec ±1.25% (86 runs sampled)

Cbor#test__________________encode x 1,222 ops/sec ±1.11% (90 runs sampled)
Cbor#test__________________decode x 1,134 ops/sec ±0.93% (90 runs sampled)
Cbor#test__________________roundtrip x 583 ops/sec ±1.03% (86 runs sampled)

Bson#test__________________encode x 120 ops/sec ±1.38% (73 runs sampled)
Bson#test__________________decode x 227 ops/sec ±0.74% (84 runs sampled)
Bson#test__________________roundtrip x 79.62 ops/sec ±0.67% (67 runs sampled)

Fastest is Json#test__________________roundtrip
==================================== Sizes =====================================
Tree - 9356 bytes
Json - 9482 bytes
Json compressed - 1872 bytes
MsgPack - 7628 bytes
Cbor - 7617 bytes
Bson - 112710 bytes
================================================================================
```
