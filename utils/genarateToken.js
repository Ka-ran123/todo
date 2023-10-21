const jwt = require('jsonwebtoken');

function genarateToken(data)
{
    const token = jwt.sign({_id:data} , process.env.SCRET_KEY)
    return token;
}

module.exports.genarateToken = genarateToken;