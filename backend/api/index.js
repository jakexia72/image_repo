const combineRouters = require('koa-combine-routers');

const userRoutes = require('./routes/user');

const router = combineRouters(
    userRoutes,
)

module.exports = router;