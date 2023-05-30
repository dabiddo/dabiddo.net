---
##layout: ../layouts/Blogpost.astro
title: 'Laravel & NestJs share Authentication'
description: "Making Larave & Nestjs play nice with Jwt"
image:
    url: 'https://media.publit.io/file/laravel_nestjs.png' 
    alt: 'Laravel & NestJs'
pubDate: 2023-05-29
jpn: 'https://qiita.com/dabiddo/items/d74418383b468a32a57e'
author: 'Dabiddo'
tags: ["larave","nestjs"]
---

# Laravel-NestJs share Authentication

The example repo can be found: [GitHub - dabiddo/laravel-nestjs-auth: Laravel](https://github.com/dabiddo/laravel-nestjs-auth)

## Why?
At work, we are migrating a big laravel monolith app to microservices, our PM chose NestJs since most of the team has a bit of experience using it, and one of the big questions was, how do we migrate the current users to the new architecture, since the `users` table does not change much, we decided to leave it, and make NestJs accept the Laravel JWT for Microservice authentication.
And so, a week of research and development led to this post, where I summarize what we did at the Backend team to make it work.

## Laravel + Passport

Since this will focus on the Auth part, I'll summarize the laravel-passport tutorial, for that, you can follow the [Laravel Passport Official Docs](https://laravel.com/docs/10.x/passport) or follow this [Laravel 10 Passport API Authentication Tutorial](https://www.laravelia.com/post/laravel-10-passport-api-authentication-tutorial), from which I copy-pasted the Laravel code.

### Basic Summary.

make a basic Larave Project and Install laravel-passport, for generating JWT Token

`composer create-project laravel/laravel example-app`

Install Passport

`composer require laravel/passport`

Run Migrations

`php artisan migrate`

Install Passport

`php artisan passport:install`

This will generate 2 Keys inside the `storage/` folder.

```bash
oauth-private.key
oauth-public.key
```

## NestJs + Passport

For the next part, you will also need to create a NestJs project and install the passport library for jwt generation and authentication.

### Basic NestJs Project

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

### Passport

Before you continue, please read the official [NestJs Authentication](https://docs.nestjs.com/security/authentication) tutorial, and follow up with the [NestJs-Passport](https://docs.nestjs.com/recipes/passport) tutorial to have an idea of all the packages needed for the tutorial.

```bash
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
$ npm install --save @nestjs/jwt passport-jwt
$ npm install --save-dev @types/passport-jwt
```

If you followed the Tutorial, you will have a `jwt.strategy.ts` inside the `auth` folder of your NestJs, this is the file we will need to modify to accept the RS256 encryption.

### Database

Since Laravel and NestJs will share the same DB for extracting the user data, I used TypeOrm since its the one the NestJs tutorials use, but feel free to change it if you want.

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

#### Other Packages

```bash
$ npm i --save @nestjs/config
$ npm i jwks-rsa
$ npm i bcrypt
$ npm i -D @types/bcrypt
```

## Laravel JWT Algorithm

If you generate a JWT token from laravel, and copy-paste it to jwt.io, you will the the algorithm detected is the `RS256`, which uses the private & public keys to encrypt and decrypt the JWT to get the payload information.

Knowing that information, we need to make NestJs Passport, accept the same algorithm and share the keys in order to encrypt / decrypt the same payload.

### NestJs Modified JWT

There are 2 important files that need to be changed in order for NestJs to accept Laravel's JWT Token `jwt-auth.guard.ts` & `jwt.strategy.ts`

**JWT Guard**

This is the file incharge of decrypting the JWT token using the Public Key, once it can be decrypted, it will inject the result payload to the request.

```js
import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as fs from 'fs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
    super({
      jwtOptions: {
        algorithms: ['RS256'],
      },
    });
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.split(' ')[1];
      const publicKey = fs.readFileSync('/app/laravel-auth/storage/oauth-public.key');
      const payload = this.jwtService.verify(token, { 
        secret: publicKey,
        algorithms: ['RS256']
      });
      request.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
  
}
```

**JWT Strategy**

```js
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import jwt, { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKeyProvider: (
        request: any,
        rawJwtToken: string,
        done: (err: any, secretOrPublicKey?: string | object) => void,
      ) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
          return done('Invalid token');
        }

        const { header } = decodedToken;
        const { alg, kid } = header;
        const jwksClient = jwksRsa({
          jwksUri: 'http://localhost/',
        });
        jwksClient.getSigningKey(kid, (err, key) => {
          if (err) {
            return done(err);
          }
          const signingKey = key.getPublicKey();
          done(null, signingKey);
        });
      },
    });
  }
}
```

Once you have this files modified, you should be able to generate a token from Laravel and access the NestJs protected routes.

### Generate tokens from NestJs?

It should be posible to generate tokens from NestJs that laravel can accept, but I have't been able to do it, this is what I have so Far

**AuthController**

```js
@Post('login')
  async login(@Body() req)
  {
    const response = await this.usersService.findOneByEmail(req.email);
    const hash = response.password.replace(/^\$2y(.+)$/i, '$2a$1');
    const match = await bcrypt.compare(req.password, hash);

    if(match === true) {
      const payload = { username: response.name, email: response.email, sub: response.id };
      const privateKey = fs.readFileSync('/app/laravel-auth/storage/oauth-private.key');
      return {
        access_token: jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
      };
    }
    else {
      throw new UnauthorizedException();
    }
  }
```

I need to do the replace, because both Laravel and NestJs hash the passwords a bit different, so I keep getting the Incorrect password when comparing.

So far it generates a Jwt token, and it does work on NestJs routes, but not on Laravel.
