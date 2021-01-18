'use strict';
const admin = require('../config/firebase');
const userService = require('./user');

const getTokenFromHeaders = (ctx) => {
    const { authorization } = ctx.request.header;
    if( authorization && authorization.split(' ')[0] === 'Token'){
        return authorization.split(' ')[1];
    }
    return null;
}


//TODO: MAKE THIS GRAB THE USER FROM THE DATABASE
// This is a middleware
const authenticateUser = async (ctx, next) => {
    const token = getTokenFromHeaders(ctx);
    await admin.auth().verifyIdToken(token).then((decodedToken) => {
        ctx.firebaseAuthDetails = decodedToken;
        console.log('user authenticated');
    }).catch((err) => {
        ctx.throw(401, err.errorInfo);
    });
    // try {
    //     ctx.user = await userService.get(token);
    //     console.log(ctx.user);
    //     // ctx.user = await userService.get(decodedToken.uid);
    // } catch (err){
    //     ctx.throw(401, err);
    // }
    await next();
} 

// // just a test
// const getUser = async (uid) => {
//     admin
//         .auth()
//         .getUser(uid)
//         .then((userRecord) => {
//             // console.log(userRecord);
//         });
// }   



module.exports = {
    authenticateUser,
    // createUserToken,
}



/*
    1. A firebase auth token will be passed in the header 
    2. This is intercepted in a middleware that will decode it into a uuid
    3. From then on, the user will saved into the ctx.state 
    4. The rest of the app will now have access to the user
*/