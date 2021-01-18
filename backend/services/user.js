const User = require('../models/user');

async function getByUid(uid){
    console.log('RUN', uid);
    const user = await User.findOne({'uid' : uid}).exec();
    console.log(user);
    if (user) {
        return user;
    } else {
        throw new TypeError(
            `could not find user: ${uid}`,
        );
    }
}

async function getByUserName(userName){
    const user = await User.findOne({'userName' : userName}).exec();
    if (user) {
        return user;
    } else {
        throw new TypeError(
            `could not find user: @${userName}`,
        );
    }
}

async function createProfile(userObject){
    const user = new User(userObject);
    await user.save();
    console.log('created new user profile', user)
    return user;
}

module.exports = {
    getByUid,
    getByUserName,
    createProfile,
}