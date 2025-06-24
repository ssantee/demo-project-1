#!/bin/bash
# This script sends a POST request to the FizzBuzz API with a custom configuration.
curl --location 'https://rldemo.santee.cloud/api/fbz/handler' \
--header 'Content-Type: application/json' \
--data '{
    "number":15,
    "fizzDivisor":3,
    "buzzDivisor":5,
    "existingCollection":[
        -3,
        1,
        1,
        2,
        3,
        5,
        8,
        13,
        21,
        34,
        55,
        89,
        144,
        233,
        377,
        610,
        987
    ],
    "alternatePairings":{"3":"Foo", "5":"Bar", "15":"FooBar"}
}'