module.exports = {

    auth           : require('./util/auth'),
    googleAuth     : require('./util/googleAuth'),
    superAdminAuth : require('./util/superAdminAuth'),
    generateAccessToken : require('./util/generateAccessToken'),
    cookieConfig   : require('./util/cookieConfig'),
    upload         : require('./util/upload'),
    googleApi      : require('./util/googleAPI'),
    connectUser    : require('./util/connectRoom'),
    validAuth      : require('./util/validAuth')
}