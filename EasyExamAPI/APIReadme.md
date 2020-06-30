# API documentation

Sequence flow diagram for the

## Login

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBQT1NUIC9hcGkvdXNlcnMvbG9naW4vXG4gIGJrbmQgLT4-IGJrbmQ6IGF1dGhlbnRpY2F0ZVxuICBhbHQgQXV0aGVudGljYXRpb24gU3VjY2Vzc2Z1bCBcbiAgYmtuZCAtPj4gYmtuZDogZ2V0X29yX2NyZWF0ZV90b2tlblxuICBia25kIC0-PiBjbDogMjAwXG5cdGVsc2UgTWlzc2luZyBDcmVkZW50aWFsXG4gIGJrbmQgLT4-IGNsOiA0MDBcbiAgZWxzZSBJbmNvcnJlY3QgQ3JlZGVudGlhbFxuICBia25kIC0-Pi0gY2w6IDQwNFxuICBlbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBQT1NUIC9hcGkvdXNlcnMvbG9naW4vXG4gIGJrbmQgLT4-IGJrbmQ6IGF1dGhlbnRpY2F0ZVxuICBhbHQgQXV0aGVudGljYXRpb24gU3VjY2Vzc2Z1bCBcbiAgYmtuZCAtPj4gYmtuZDogZ2V0X29yX2NyZWF0ZV90b2tlblxuICBia25kIC0-PiBjbDogMjAwXG5cdGVsc2UgTWlzc2luZyBDcmVkZW50aWFsXG4gIGJrbmQgLT4-IGNsOiA0MDBcbiAgZWxzZSBJbmNvcnJlY3QgQ3JlZGVudGlhbFxuICBia25kIC0-Pi0gY2w6IDQwNFxuICBlbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

```js
sequenceDiagram
  participant cl as Client
  participant bknd as Backend
  cl ->>+ bknd: POST /api/users/login/
  bknd ->> bknd: authenticate
  alt Authentication Successful
  bknd ->> bknd: get_or_create_token
  bknd ->> cl: 200
	else Missing Credential
  bknd ->> cl: 400
  else Incorrect Credential
  bknd ->>- cl: 404
  end
```

1. Client submit user data to the backend, the data is valid

   ```js
   Request:
       Headers: {
           "Content-Type": "application/json",
       }
       Body:{
           "email": "cosme@fulanito.com",
           "password": "1234"
       }
   Response: 200
       Headers: {
           "Content-Type": "application/json",
       }
       Body:{
           "token": "",
       }
   ```

2. **Alt 1** Request miss a parameter:

   ```js
   Request:
       Headers: {
           "Content-Type": "application/json",
       }
       Body:{
           "email": "cosme@fulanito.com",
       }
   Response: 400
       Headers: {
           "Content-Type": "application/json",
       }
       Body: {}
   ```

3. **Alt 2** Password doesn't match with the user:
   ```js
   Request:
       Headers: {
           "Content-Type": "application/json",
       }
       Body:{
           "email": "cosme@fulanito.com",
           "password": "4321",
       }
   Response: 404
       Headers: {
           "Content-Type": "application/json",
       }
       Body: {}
   ```

## Logout

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBERUxFVEUgL2FwaS91c2Vycy9sb2dvdXQvXG4gIGJrbmQgLT4-IGJrbmQ6IGdldF9yZXF1ZXN0X3VzZXJcbiAgYmtuZCAtPj4gYmtuZDogcmV2b2tlX2FjY2Vzc190b2tlblxuICBia25kIC0-Pi0gY2w6IDIwMCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBERUxFVEUgL2FwaS91c2Vycy9sb2dvdXQvXG4gIGJrbmQgLT4-IGJrbmQ6IGdldF9yZXF1ZXN0X3VzZXJcbiAgYmtuZCAtPj4gYmtuZDogcmV2b2tlX2FjY2Vzc190b2tlblxuICBia25kIC0-Pi0gY2w6IDIwMCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)
