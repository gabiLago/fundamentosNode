# Nodepop

## GETTING STARTED (DevOps Practice)

For the **DevOps Node Module** practice purposes, this app has a demo online version.

**NODEPOP URL https://nodepop.lagoblasco.es**

Further instructions are provided on its homepage.

----


## SYNOPSIS
**Nodepop** is an API for a 2nd hand articles App developed in NodeJS + Express4 + Mongoose

This is a Practice Exercise for **KeepCoding Mobile Bootcamp 8** - Node Fundamentals Module

----

## VERSIONS

This the 2nd version of the app (you can acess v1 on its branch in github)
It includes some refactoring thanks to the advices given by Javier Miguel when he reviewed the practice.

* The mongo connection chain is now an env variable you can define on your .env configuration file
* Some middlewares that didn´t catch errors has been refactored with try/cathc
* The sample instalation script has been refactored as a function that returns a promise.
----

## REQUIREMENTS AND DEPENDENCIES
The API has been built using NodeJS Express framework and MongoDB through Mongoose ODM.

It needs NodeJS ^10.0.0 and MongoDB ^4.0.0 properly installed and running.
 
Fork the project and the following dependencies will be installed after running: 
```shell
npm install
```

* **express**: ~4.16.0
* **mongoose**: ^5.3.16
* **bcrypt**: ^3.0.2
* **cookie-parser**: ~1.4.3
* **cross-env**: ^5.2.0
* **debug**: ~2.6.9
* **dotenv**: ^6.2.0
* **ejs**: ~2.5.7
* **http-errors**: ~1.6.2
* **i18n**: ^0.8.3
* **jsonwebtoken**: ^8.4.0
* **morgan**: "~1.9.0"

----
## INSTALLING
There are two steps needed before running the app:

* ### Database intializing script
```shell
npm run installDB
``` 
It adds some sample data to the Ads database collection and a test user to the User collection.


* ### Configuration file
A file containing environment variables is needed.
A .env.example file is provided. 
Just duplicated it and renamed as .env 
```shell
cp .env.example .env
``` 

Change the values for the Authentication Token Module: 

**JWT_SECRET**: A String of characters that allows jsonwebtoken to generate the Token

**JWT_EXPIRATION**: 2d

And for the test user that will be created in the installation process

**TEST_NAME** = name

**TEST_EMAIL** = email

**TEST_PASSWD** =  password


## Starting the API

There are three starting modes:

**Production:**
```shell
npm run start
``` 

**Dev** DEBUG mode
```shell
npm run dev
``` 

**Cluster** For better performance in multiple connections. It starts the app using as many workers as threads the CPU allows.
```shell
npm run cluster
``` 
----

## API USE

  The API will send a response with a JSON object for prorperly formatted requests.

### USERS
Only authenticated users requests will be responded by the API.

A valid token, needed for any `GET` request, will be provided as a response after a successful login.  
_Token expiring time is set by default as 2 days, you can change it in `.env` file_
#### Register

The API provides a register method 

**URL**

  `http://[server_domain]/apiv1/usuarios/registro`

**Method**

| `POST` | application/x-www-form-urlencoded

Values must be provided for the following keys:

```
nombre
email
password
```
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{    "success": true,    "result": "nameProvided"}`
 
* **Error Response:**
  * **Code:** 422 Unprocessable Entity
  * **Error Messages**:  
	
    "Path `nombre` is required.": "Name field is required",
	"Path `password` is required.": "Password field is required.",
	"Path `email` is required.": "Email field is required.",
    

#### Login

** Security **
Passwords are hashed before being stored into the database using bcrypt module. Security may be increased changing the BCRYPT_SALT_ROUNDS value on .env file, by default is 10.

**URL**

  `http://[server_domain]/apiv1/usuarios/login`

**Method**

| `POST` | application/x-www-form-urlencoded

Values must be provided for the following keys:

```
email
password
```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{"success": true, "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWMxYmQ4NzM1ZjVhMzYwOTlmYmIwMWY5IiwiaWF0IjoxNTQ1MzI5MDUwLCJleHAiOjE1NDU1MDE4NTB9.zwjwo3e1MLkX4y6q04N3KaBFXG9m9sbBYJZ-gFuobT8"}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
  * **Error Messages**

    * No password provided
  
    * No email provided
    

### ADS
A list of ads will provided

* **URL**

  `http://[server_domain]/apiv1/anuncios`

* **Method:**
  
  | `GET` | 
  
*  **URL Params**
    
    **Query filters**

    * **tag**: Actual valid tags are: _mobile_, _lifestyle_, _work_ and _motor_ 
   
        ```
        http://[server_address]/apiv1/anuncios?tag=mobile... 
        ```
    * **venta**: = A boolean value, _true_ means for sale _false_ means offer

        ```
        http://[server_address]/apiv1/anuncios?venta=true... 
        ```
    * **precio**: = Numeric value. Price can be expressed as _lower than_, a _range_, or _higher than_. 
    
        * Menor que 50:
        ```
        http://[server_address]/apiv1/anuncios?precio=-50... 
        ```    
    
        * Rango:
        ```
        http://[server_address]/apiv1/anuncios?precio=10-50... 
        ```
        * Mayor que 50:
        ```
        http://[server_address]/apiv1/anuncios?precio=50-... 
        ```    

    * **nombre**: = The starting letters of the name of the article;
    
        Name starts with: _Bicl_
        ```
        http://[server_address]/apiv1/anuncios?nombre=Bicl... 
        ```    
    
    **Query modifies**

    * **sort**: Sorts the query
    * **limit**: Limts the number of results
    * **skip**: Offsets the query results

 
   **Token Required:**
 
   A valid `jwttoken` param is mandatory to get a successful response.
    ```
    http://[server_address]/apiv1/anuncios?jwttoken=KV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1... 
    ```    
    
   **Complete example**
    ```
    http://[server_address]/apiv1/anuncios?tag=mobile&venta=false&nombre=Bicl&precio=50­-&skip=0&limit=2&sort=precio&token =eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9[...]eGSHeQfg
    ```    
   
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ {
    "success": true,
    "result": [
        {
            "tags": [
                "lifestyle",
                "motor"
            ],
            "_id": "5c1bd769ce767b0978495a8a",
            "nombre": "Patinete eléctrico",
            "venta": false,
            "precio": 235,
            "foto": "images/anuncios/patinete.jpg",
            "__v": 0
        }
    ]
    } `
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED <br />
  * **Error Messages**:

    * No token provided
	* Invalid Token

  * **Code:** 422 Unprocessable Entity
  * **Error Messages**:  
	* "Please fill a valid email address": "Please fill a valid email address",
	* "Incorrect format for parameter precio": "Incorrect format for parameter: precio"


### TAGS
A list of distinct tags on database

**URL**

  `http://[server_domain]/apiv1/anuncios/tags`

**Method**

| `TAGS` |
```
{
    "success": true,
    "result": [
        "lifestyle",
        "mobile",
        "motor",
        "work"
    ]
}
````


### TRANSLATIONS

The API has an i18n module for internationalization.
It has translated error messages to english an spanish

The language is detected by the header _Accept-Language_ key 
```
en: english
es: spanish
```

