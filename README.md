## Docker rebuild
    docker rmi -f swishclient && \
    docker build -t swishclient . && \
    docker run swishclient

## Enter Docker enviorments
    docker run -it --entrypoint /bin/bash swishclient

## HTTPS request in index.js (Not working, trying to solve)
    var options = {
        hostname: 'mss.swicpc.bankgirot.se',
        port: 443,
        path: '/swish-cpcapi/api/v1/paymentrequests',
        method: 'POST',
        // ca: caFile,
        cert: certFile,
        passphrase: 'swish',
        key: keyFile,
    };

## Curl script exempel (Working!)
(Here is a curl script similar to the HTTPS request)

```
cd ssl && \

payerAlias=4671234768

payeeAlias=1231181189

amount=1337

curl -i -v --request POST https://mss.swicpc.bankgirot.se/swish-cpcapi/api/v1/paymentrequests \
--cert clientcertTest.pem:swish \
--key keyTest.key \
--tlsv1.2 \
--header "Content-Type: application/json" \
--data @- <<!
{
"payeePaymentReference": "0123456789",
"callbackUrl": "https://example.com/api/swishcb/paymentrequests",
"payerAlias": "${payerAlias}",
"payeeAlias": "${payeeAlias}",
"amount": "${amount}", "currency": "SEK",
"message": "Kingston USB Flash Drive 8 GB"
}
!

```
