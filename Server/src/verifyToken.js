const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

/**
 * This utility file is solely for checking if a user's given authentication token is valid
 * according to Auth0's servers.
 */

const verifyToken = async (bearerToken) => {
    const client = jwksClient({
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    });

    console.log(`Looking for bearer token ${bearerToken} from addr ${process.env.AUTH0_DOMAIN} and audience ${process.env.AUDIENCE}`);
    function getJwksClientKey(header, callback) {
        client.getSigningKey(header.kid, function (error, key) {
            if (error)
                console.error(error);
            const signingKey = key.publicKey || key.rsaPublicKey;
            callback(null, signingKey);
        });
    }

    return new Promise((resolve, reject) => {
        jwt.verify(
            bearerToken,
            getJwksClientKey,
            {
                audience: process.env.AUDIENCE,
                issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                algorithms: ["RS256"],
            },
            function (err, decoded) {
                if (err) reject(err);
                resolve(decoded);
            }
        );
    });
};

module.exports = { verifyToken };
