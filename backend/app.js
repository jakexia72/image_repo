"use strict";
const dotenv = require("dotenv")
dotenv.config()

const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
app.use(cors());
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}


const initDB = require('./config/database');
initDB();

const bodyParser = require('koa-bodyparser');
const RouteIndex = require('./api/index');
app.use(bodyParser());
app.use(RouteIndex());

app.listen(port, () => console.log(`Server started on port ${port}`));