const jwt = require("jsonwebtoken");
const { jwt: configAuth } = require("./../configs/auth")
const { timeZone: timeZoneConfig } = require("./../configs/app")
const bcrypt = require("bcrypt");
/**
 * 
 * @param { * } user 
 * @param { string } refreshToken
 */
exports.signUpAccessToken = async (user, refreshToken) => {
    const userPayload = {
        id: user.id,
        phone: user.phone,
        email: user.email,
        refresh_token: refreshToken
    }

    return await jwt.sign(userPayload, configAuth.secretKey, {
        algorithm: configAuth.algorithm,
        expiresIn: configAuth.expiresIn
    })
};

/**
 * 
 * @param {*} user
 * @returns 
 */
exports.signUpRefreshToken = async (user) => {
    const userPayload = {
        id: user.id,
        phone: user.phone,
        email: user.email
    }

    return await jwt.sign(userPayload, configAuth.sessionRefreshToken.secretKey, {
        algorithm: configAuth.algorithm,
        expiresIn: configAuth.sessionRefreshToken.expiresIn
    })
};

/**
 * 
 * @param {*} token 
 * @returns 
 */

exports.checkAccessToken = async (token) => {
    return await jwt.verify(token, configAuth.secretKey, async (err, decoded) => {
        if (err) {
            return {
                error: true,
                err
            }
        }
        return await decoded
    });
};

/**
 * 
 * @param {*} token 
 * @returns 
 */

exports.checkRefreshToken = async (token) => {
    return await jwt.verify(token, configAuth.sessionRefreshToken.secretKey, async (err, decoded) => {
        if (err) {
            return {
                error: true,
                err
            }
        }
        return await decoded
    });
};
/**
 * 
 * @param {String} token 
 * @returns 
 */
exports.checkSessionToken = async (token) => {
    let result = false
    const period = []
    const now = new Date()
    const pre = new Date(now.getTime() - (configAuth.sessionRefreshToken.scope * 1000));

    period.push(now.toLocaleString("en-US", { hour12: false, timeZone: timeZoneConfig }).replace(/\s/g, "").slice(0, -3))
    period.push(pre.toLocaleString("en-US", { hour12: false, timeZone: timeZoneConfig }).replace(/\s/g, "").slice(0, -3))
	
    // secret20232602,11:20
    for (const time of period) { 
        result = await bcrypt.compare(configAuth.sessionRefreshToken.secretSessionKey + time, token)
            .then(result => {
                return result;
            }).catch(err => {
                if (err) {
                    console.err(err);
                    error(err)
                }

                return false;
            });
		
        if (result) {return result}
    }

    return result;
}

exports.generateSessionToken = async () => {
    const now = new Date()
    const time = now.toLocaleString("en-US", { hour12: false, timeZone: timeZoneConfig }).replace(/\s/g, "").slice(0, -3)
    const salt = await bcrypt.genSaltSync(10, "a")
    return await bcrypt.hashSync(configAuth.sessionRefreshToken.secretSessionKey + time, salt);
}