# tool-belt-proxy

## Install

```bash
yarn install
```

## Start

```bash
yarn start
```

## Proxy Requests

This node service proxies requests to other online APIs

### AXFR

A sample CURL command to call the AXFR Online Check.

```bash
curl -i -X GET \
   -H "Accept:application/vnd.tool-belt+json; version=1.0" \
 'http://localhost:3000/axfr/check/openssl.org'
 ```

#### Response From Node Proxy

Nice and neat

```json
{
    "affected_dns":[
        "primary.lp.se"
    ]
}
```

#### Response From Original API

A little bit bloated

```json
{
    "data":[
        {
            "affected_dns":[
                "primary.lp.se"
            ]
        }
    ],
    "status": "ok"
}
```
