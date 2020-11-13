# secret

A minimalist command to encrypt or decrypt your secrets.

Uses AES-256-gmc under the hood and outputs the result base64-encoded.

```
# encrypt
docker run vidiben/secret --key '<my secret key>' 'my secret to encryt'

# decrypt
docker run vidiben/secret -d --key '<my secret key>' '<my encrypted secret>'
```
