const Router = require('@koa/router');

const router = new Router();
const userService = require('../../services/user');
const {authenticateUser } = require('../../services/auth')

router.get('/user/uid/:uid', async(ctx) => {
    let user;
    let uid = ctx.params.uid;
    try {
        user = await userService.getByUid(uid);
    } catch (error) {
        ctx.throw(400, error);
    }
    if (user) {
        ctx.body = {
            user
        }
    } else {
        ctx.throw(404, 'User not found');
    }
});

router.get('/user/userName/:userName', async(ctx) => {
    let user;
    let userName = ctx.params.userName;
    try {
        user = await userService.getByUserName(userName);
    } catch (error) {
        ctx.throw(400, error);
    }
    if (user) {
        ctx.body = {
            user
        }
    } else {
        ctx.throw(404, 'User not found');
    }
});

router.post('/user', authenticateUser, async(ctx) => {
    console.log(ctx.firebaseAuthDetails);
    const {uid, email} = ctx.firebaseAuthDetails;
    const { newUser } = ctx.request.body;
    console.log('newUser', ctx.request.body);
    newUser.uid = uid;
    newUser.email = email;
    var user;
    try{
        user = await userService.createProfile(newUser);
        console.log('user:',user);
    } catch (error) {
        console.log(error);
        ctx.throw(400, error);
    }

    ctx.body = {
        user
    }
});

router.patch('/test', async(ctx) => {
    // await userService.update(ctx.request.body.uuid, ctx.request.body.updates)
    // const t = await createUserToken('YksZSocblIZpXeUOnwoZmQpkuV92');
});


module.exports = router;