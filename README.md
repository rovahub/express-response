[![](https://img.shields.io/npm/v/%40rovahub%2Fexpress-response/latest.svg?style=flat-square)](https://npmjs.com/package/%40rovahub%2Fexpress-response)
[![](https://img.shields.io/npm/dt/%40rovahub%2Fexpress-response.svg?style=flat-square)](https://npmjs.com/package/%40rovahub%2Fexpress-response)

# @rovahub/express-response

This Express plugin for API json response.

## Install

``` bash
# Npm
npm install @rovahub/express-response --save

# Yarn
yarn add @rovahub/express-response
```

## Quickstart

Import the @rovahub/express-response in your main JavaScript file.

### Express.js

```bash
# app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
...

var app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

### Response use
...
app.use(response());
...

app.use(require('./routes'));

var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
```

Use in controller

```bash
# controller.js
const router = require('express').Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

router.param('article', async function(req, res, next, slug) {
  try{
    const article = await Article.findOne({ slug: slug});
    return res.ok(article);
  }catch(error){
    return res.badRequest(error.message);
  }
});

module.exports = router; 
```

### NestJS

Import the @rovahub/express-response in your main TypeScript file in src/ folder.

```bash
# main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { response } from '@rovahub/express-response';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  ### Response use
  ...
  app.use(response()) 
  ...

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
```

Use in controller

```bash
# *.controller.ts
import { Body, Controller, Post, UseGuards, Response } from '@nestjs/common';
import { IResponseExpress } from '@rovahub/express-response';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  ...
  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto, @Response() res: IResponseExpress) {
    try{
      const cat = await this.catsService.create(createCatDto);
      res.ok(cat);
    }catch(error){
      return res.badRequest(error.message);
    }
  }
  ...
}

```

**Methods supports**

 Method                                   | Feature               | Type    | Status 
------------------------------------------|-----------------------|---------|--------
 res.ok(data, status)                     | Success response      | success | 200    
 res.created(data, status)                | Created response      | success | 201    
 res.noContent(status)                    | No content response   | success | 204    
 res.badRequest(message, status)          | Bad request response  | failure | 400    
 res.unauthorized(message, status)        | Unauthorized response | failure | 401    
 res.forbidden(message, status)           | Forbidden response    | failure | 403    
 res.notFound(message, status)            | Not found response    | failure | 404    
 res.internalServerError(message, status) | Internal server error | failure | 500    
