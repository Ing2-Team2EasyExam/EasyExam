# API documentation

Sequence flow diagram for the API. For all the flow charts except the login and password reset, assume a alternate flowchart where the response is `401` or `403` of unauthorized access.

## Authentication endpoints

### Login

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

   `POST /api/users/login/`

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
           "token": "6b7215e48545c761500a04b5dfbed8dba400076f",
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

### Logout

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBERUxFVEUgL2FwaS91c2Vycy9sb2dvdXQvXG4gIGJrbmQgLT4-IGJrbmQ6IGdldF9yZXF1ZXN0X3VzZXJcbiAgYmtuZCAtPj4gYmtuZDogcmV2b2tlX2FjY2Vzc190b2tlblxuICBia25kIC0-Pi0gY2w6IDIwMCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBERUxFVEUgL2FwaS91c2Vycy9sb2dvdXQvXG4gIGJrbmQgLT4-IGJrbmQ6IGdldF9yZXF1ZXN0X3VzZXJcbiAgYmtuZCAtPj4gYmtuZDogcmV2b2tlX2FjY2Vzc190b2tlblxuICBia25kIC0-Pi0gY2w6IDIwMCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

```js
sequenceDiagram
  participant cl as Client
  participant bknd as Backend
  cl ->>+ bknd: DELETE /api/users/logout/
  bknd ->> bknd: get_request_user
  bknd ->> bknd: revoke_access_token
  bknd ->>- cl: 200
```

1. Cliente make a delete request to the backend, for revoking current access token

   `DELETE /api/users/logout/`

   ```js
   Request:
       Headers: {
           "Content-Type": "application/json",
           "Authorization": "Token 6b7215e48545c761500a04b5dfbed8dba400076f",
       }
       Body: {}
   Response: 200
       Headers: {
           "Content-Type": "application/json",
       }
   ```

## Problems Endpoints

### All platform problems list endpoint

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-IGJrbmQ6IEdFVCAvYXBpL3Byb2JsZW1zL2xpc3QvXG4gIGJrbmQgLT4-IGJrbmQ6IGdldF9hbGxfcHJvYmxlbXNcbiAgYmtuZCAtPj4gYmtuZDogb3JkZXJfcHJvYmxlbXNfYnlfY3JlYXRpb25fZGVzY2VudFxuICBia25kIC0-PiBjbDogMjAwIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-IGJrbmQ6IEdFVCAvYXBpL3Byb2JsZW1zL2xpc3QvXG4gIGJrbmQgLT4-IGJrbmQ6IGdldF9hbGxfcHJvYmxlbXNcbiAgYmtuZCAtPj4gYmtuZDogb3JkZXJfcHJvYmxlbXNfYnlfY3JlYXRpb25fZGVzY2VudFxuICBia25kIC0-PiBjbDogMjAwIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

```js
sequenceDiagram
  participant cl as Client
  participant bknd as Backend
  cl ->> bknd: GET /api/problems/list/
  bknd ->> bknd: get_all_problems
  bknd ->> bknd: order_problems_by_creation_descent
  bknd ->> cl: 200
```

### User problems list endpoint

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-IGJrbmQ6IEdFVCAvYXBpL3Byb2JsZW1zL3VwbG9hZGVkL2xpc3QvXG4gIGJrbmQgLT4-IGJrbmQ6IGdldF9yZXF1ZXN0X3VzZXJcbiAgYmtuZCAtPj4gYmtuZDogZ2V0X3VzZXJfcHJvYmxlbXNcbiAgYmtuZCAtPj4gY2w6IDIwMCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-IGJrbmQ6IEdFVCAvYXBpL3Byb2JsZW1zL3VwbG9hZGVkL2xpc3QvXG4gIGJrbmQgLT4-IGJrbmQ6IGdldF9yZXF1ZXN0X3VzZXJcbiAgYmtuZCAtPj4gYmtuZDogZ2V0X3VzZXJfcHJvYmxlbXNcbiAgYmtuZCAtPj4gY2w6IDIwMCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

```js
sequenceDiagram
  participant cl as Client
  participant bknd as Backend
  cl ->> bknd: GET /api/problems/uploaded/list/
  bknd ->> bknd: get_request_user
  bknd ->> bknd: get_user_problems
  bknd ->> cl: 200
```

### Problem Creation endpoint

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBQT1NUIC9hcGkvcHJvYmxlbXMvY3JlYXRlL1xuICBia25kIC0-PiBia25kOiBnZXRfcmVxdWVzdF91c2VyXG4gIGJrbmQgLT4-IGJrbmQ6IHZhbGlkYXRlX2RhdGFcbiAgYWx0IFZhbGlkIERhdGFcbiAgYmtuZCAtPj4gYmtuZDogY3JlYXRlX3Byb2JsZW1cbiAgYmtuZCAtPj4gYmtuZDogY3JlYXRlX3BkZlxuICBhbHQgQ29tcGlsYXRpb24gRXJyb3JcbiAgYmtuZCAtPj4gYmtuZDogZGVsZXRlX2NyZWF0ZWRfcHJvYmxlbVxuICBia25kIC0-PiBjbDogNTAwXG4gIGVsc2UgQ29tcGlsYXRpb24gU3VjY2Vzc2Z1bFxuICBia25kIC0-PiBjbDogMjAwXG4gIGVuZFxuICBlbHNlIEludmFsaWQgRGF0YVxuICBia25kIC0-Pi0gY2w6IDQwMFxuICBlbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBQT1NUIC9hcGkvcHJvYmxlbXMvY3JlYXRlL1xuICBia25kIC0-PiBia25kOiBnZXRfcmVxdWVzdF91c2VyXG4gIGJrbmQgLT4-IGJrbmQ6IHZhbGlkYXRlX2RhdGFcbiAgYWx0IFZhbGlkIERhdGFcbiAgYmtuZCAtPj4gYmtuZDogY3JlYXRlX3Byb2JsZW1cbiAgYmtuZCAtPj4gYmtuZDogY3JlYXRlX3BkZlxuICBhbHQgQ29tcGlsYXRpb24gRXJyb3JcbiAgYmtuZCAtPj4gYmtuZDogZGVsZXRlX2NyZWF0ZWRfcHJvYmxlbVxuICBia25kIC0-PiBjbDogNTAwXG4gIGVsc2UgQ29tcGlsYXRpb24gU3VjY2Vzc2Z1bFxuICBia25kIC0-PiBjbDogMjAwXG4gIGVuZFxuICBlbHNlIEludmFsaWQgRGF0YVxuICBia25kIC0-Pi0gY2w6IDQwMFxuICBlbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

```js
sequenceDiagram
  participant cl as Client
  participant bknd as Backend
  cl ->>+ bknd: POST /api/problems/create/
  bknd ->> bknd: get_request_user
  bknd ->> bknd: validate_data
  alt Valid Data
  bknd ->> bknd: create_problem
  bknd ->> bknd: create_pdf
  alt Compilation Error
  bknd ->> bknd: delete_created_problem
  bknd ->> cl: 500
  else Compilation Successful
  bknd ->> cl: 200
  end
  else Invalid Data
  bknd ->>- cl: 400
  end
```

### Problem edition endpoint

#### Get the problem current data to be editted

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBHRVQgL2FwaS9wcm9ibGVtcy88dXVpZD4vZWRpdC9cbiAgYmtuZCAtPj4gYmtuZDogZ2V0X3JlcXVlc3RfdXNlclxuICBia25kIC0-PiBia25kOiBnZXRfcHJvYmxlbVxuICBhbHQgUHJvYmxlbSBFeGlzdHNcbiAgYmtuZCAtPj4gYmtuZDogY2hlY2tfcHJvYmxlbV9pc19lZGl0YWJsZVxuICBhbHQgUHJvYmxlbSBFZGl0YWJsZVxuICBia25kIC0-PiBia25kOiBjaGVja19wcm9ibGVtX3VwbG9hZGVyX2lzX3JlcXVlc3RfdXNlclxuICBhbHQgVXNlciBpcyBQcm9ibGVtIFVwbG9hZGVyXG4gIGJrbmQgLT4-IGNsOiAyMDBcbiAgZWxzZSBVc2VyIGlzIG5vdCBwcm9ibGVtIHVwbG9hZGVyXG4gIGJrbmQgLT4-IGNsOiA0MDRcbiAgZW5kXG4gIGVsc2UgUHJvYmxlbSBEb2VzIE5vdCBFeGlzdHNcbiAgYmtuZCAtPj4gY2w6IDQwNFxuICBlbmRcbiAgZWxzZSBQcm9ibGVtIENhbid0IGJlIGVkaXR0ZWRcbiAgYmtuZCAtPj4tIGNsOiA0MDNcbiAgZW5kIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBHRVQgL2FwaS9wcm9ibGVtcy88dXVpZD4vZWRpdC9cbiAgYmtuZCAtPj4gYmtuZDogZ2V0X3JlcXVlc3RfdXNlclxuICBia25kIC0-PiBia25kOiBnZXRfcHJvYmxlbVxuICBhbHQgUHJvYmxlbSBFeGlzdHNcbiAgYmtuZCAtPj4gYmtuZDogY2hlY2tfcHJvYmxlbV9pc19lZGl0YWJsZVxuICBhbHQgUHJvYmxlbSBFZGl0YWJsZVxuICBia25kIC0-PiBia25kOiBjaGVja19wcm9ibGVtX3VwbG9hZGVyX2lzX3JlcXVlc3RfdXNlclxuICBhbHQgVXNlciBpcyBQcm9ibGVtIFVwbG9hZGVyXG4gIGJrbmQgLT4-IGNsOiAyMDBcbiAgZWxzZSBVc2VyIGlzIG5vdCBwcm9ibGVtIHVwbG9hZGVyXG4gIGJrbmQgLT4-IGNsOiA0MDRcbiAgZW5kXG4gIGVsc2UgUHJvYmxlbSBEb2VzIE5vdCBFeGlzdHNcbiAgYmtuZCAtPj4gY2w6IDQwNFxuICBlbmRcbiAgZWxzZSBQcm9ibGVtIENhbid0IGJlIGVkaXR0ZWRcbiAgYmtuZCAtPj4tIGNsOiA0MDNcbiAgZW5kIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

```js
sequenceDiagram
  participant cl as Client
  participant bknd as Backend
  cl ->>+ bknd: GET /api/problems/<uuid>/edit/
  bknd ->> bknd: get_request_user
  bknd ->> bknd: get_problem
  alt Problem Exists
  bknd ->> bknd: check_problem_is_editable
  alt Problem Editable
  bknd ->> bknd: check_problem_uploader_is_request_user
  alt User is Problem Uploader
  bknd ->> cl: 200
  else User is not problem uploader
  bknd ->> cl: 404
  end
  else Problem Does Not Exists
  bknd ->> cl: 404
  end
  else Problem Can't be editted
  bknd ->>- cl: 403
  end
```

#### Perform the update action on the problem

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBQVVQgL2FwaS9wcm9ibGVtcy88dXVpZD4vZWRpdC9cbiAgYmtuZCAtPj4gYmtuZDogZ2V0X3JlcXVlc3RfdXNlclxuICBia25kIC0-PiBia25kOiBnZXRfcHJvYmxlbVxuICBia25kIC0-PiBia25kOiB2YWxpZGF0ZV9wcm9ibGVtX2RhdGFcbiAgYWx0IFZhbGlkIERhdGFcbiAgYmtuZCAtPj4gYmtuZDogY2hlY2tfcHJvYmxlbV9pc19lZGl0YWJsZVxuICBhbHQgUHJvYmxlbSBpcyBFZGl0YWJsZVxuICBia25kIC0-PiBia25kOiBjaGVja19wcm9ibGVtX3VwbG9hZGVyX2lzX3JlcXVlc3RfdXNlclxuICBhbHQgVXNlciBpcyBVcGxvYWRlclxuICBia25kIC0-PiBia25kOiB1cGRhdGVfcHJvYmxlbVxuICBia25kIC0-PiBia25kOiB1cGRhdGVfcGRmXG4gIGFsdCBDb21waWxhdGlvbiBFcnJvclxuICBia25kIC0-PiBia25kOiBkZWxldGVfY3JlYXRlZF9wcm9ibGVtXG4gIGJrbmQgLT4-IGNsOiA1MDBcbiAgZWxzZSBDb21waWxhdGlvbiBTdWNjZXNzZnVsXG4gIGJrbmQgLT4-IGNsOiAyMDBcbiAgZW5kXG4gIGVsc2UgVXNlciBpcyBub3QgVXBsb2FkZXJcbiAgYmtuZCAtPj4gY2w6IDQwMFxuICBlbmRcbiAgZWxzZSBQcm9ibGVtIGNhbnQgYmUgZWRpdHRlZFxuICBia25kIC0-PiBjbDogNDAwXG4gIGVuZFxuICBlbHNlIEludmFsaWQgRGF0YVxuICBia25kIC0-Pi0gY2w6IDQwMFxuICBlbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBQVVQgL2FwaS9wcm9ibGVtcy88dXVpZD4vZWRpdC9cbiAgYmtuZCAtPj4gYmtuZDogZ2V0X3JlcXVlc3RfdXNlclxuICBia25kIC0-PiBia25kOiBnZXRfcHJvYmxlbVxuICBia25kIC0-PiBia25kOiB2YWxpZGF0ZV9wcm9ibGVtX2RhdGFcbiAgYWx0IFZhbGlkIERhdGFcbiAgYmtuZCAtPj4gYmtuZDogY2hlY2tfcHJvYmxlbV9pc19lZGl0YWJsZVxuICBhbHQgUHJvYmxlbSBpcyBFZGl0YWJsZVxuICBia25kIC0-PiBia25kOiBjaGVja19wcm9ibGVtX3VwbG9hZGVyX2lzX3JlcXVlc3RfdXNlclxuICBhbHQgVXNlciBpcyBVcGxvYWRlclxuICBia25kIC0-PiBia25kOiB1cGRhdGVfcHJvYmxlbVxuICBia25kIC0-PiBia25kOiB1cGRhdGVfcGRmXG4gIGFsdCBDb21waWxhdGlvbiBFcnJvclxuICBia25kIC0-PiBia25kOiBkZWxldGVfY3JlYXRlZF9wcm9ibGVtXG4gIGJrbmQgLT4-IGNsOiA1MDBcbiAgZWxzZSBDb21waWxhdGlvbiBTdWNjZXNzZnVsXG4gIGJrbmQgLT4-IGNsOiAyMDBcbiAgZW5kXG4gIGVsc2UgVXNlciBpcyBub3QgVXBsb2FkZXJcbiAgYmtuZCAtPj4gY2w6IDQwMFxuICBlbmRcbiAgZWxzZSBQcm9ibGVtIGNhbnQgYmUgZWRpdHRlZFxuICBia25kIC0-PiBjbDogNDAwXG4gIGVuZFxuICBlbHNlIEludmFsaWQgRGF0YVxuICBia25kIC0-Pi0gY2w6IDQwMFxuICBlbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

```js
sequenceDiagram
  participant cl as Client
  participant bknd as Backend
  cl ->>+ bknd: PUT /api/problems/<uuid>/edit/
  bknd ->> bknd: get_request_user
  bknd ->> bknd: get_problem
  bknd ->> bknd: validate_problem_data
  alt Valid Data
  bknd ->> bknd: check_problem_is_editable
  alt Problem is Editable
  bknd ->> bknd: check_problem_uploader_is_request_user
  alt User is Uploader
  bknd ->> bknd: update_problem
  bknd ->> bknd: update_pdf
  alt Compilation Error
  bknd ->> bknd: delete_created_problem
  bknd ->> cl: 500
  else Compilation Successful
  bknd ->> cl: 200
  end
  else User is not Uploader
  bknd ->> cl: 400
  end
  else Problem cant be editted
  bknd ->> cl: 400
  end
  else Invalid Data
  bknd ->>- cl: 400
  end
```

### Problem pdf endpoint

[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBHRVQgL2FwaS9wcm9ibGVtcy88dXVpZD4vcGRmL1xuICBia25kIC0-PiBia25kOiBnZXRfcHJvYmxlbVxuICBhbHQgUHJvYmxlbSBFeGlzdHNcbiAgYmtuZCAtPj4gYmtuZDogZ2V0X3Byb2JsZW1fcGRmX2ZpbGVcbiAgYmtuZCAtPj4gY2w6IDIwMFxuICBlbHNlIFByb2JsZW0gRG9lcyBub3QgZXhpc3RzXG4gIGJrbmQgLT4-LSBjbDogNDA0XG4gIGVuZCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gIHBhcnRpY2lwYW50IGNsIGFzIENsaWVudFxuICBwYXJ0aWNpcGFudCBia25kIGFzIEJhY2tlbmRcbiAgY2wgLT4-KyBia25kOiBHRVQgL2FwaS9wcm9ibGVtcy88dXVpZD4vcGRmL1xuICBia25kIC0-PiBia25kOiBnZXRfcHJvYmxlbVxuICBhbHQgUHJvYmxlbSBFeGlzdHNcbiAgYmtuZCAtPj4gYmtuZDogZ2V0X3Byb2JsZW1fcGRmX2ZpbGVcbiAgYmtuZCAtPj4gY2w6IDIwMFxuICBlbHNlIFByb2JsZW0gRG9lcyBub3QgZXhpc3RzXG4gIGJrbmQgLT4-LSBjbDogNDA0XG4gIGVuZCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

```js
sequenceDiagram
  participant cl as Client
  participant bknd as Backend
  cl ->>+ bknd: GET /api/problems/<uuid>/pdf/
  bknd ->> bknd: get_problem
  alt Problem Exists
  bknd ->> bknd: get_problem_pdf_file
  bknd ->> cl: 200
  else Problem Does not exists
  bknd ->>- cl: 404
  end
```

## Exam Endpoints

### User exams endpoint

### User create exam endpoint

### User delete exam endpoint

### User download exam endpoint
