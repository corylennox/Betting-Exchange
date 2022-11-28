import { Jwt, JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import jwksClient, { RsaSigningKey, SigningKey } from "jwks-rsa";

/**
 * This utility file is solely for checking if a user's given authentication token is valid
 * according to Auth0's servers.
 */

export const verifyToken = async (bearerToken) => {
    const client = jwksClient({
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    });

    console.log(`Looking for bearer token ${bearerToken} from addr ${process.env.AUTH0_DOMAIN} and audience ${process.env.AUDIENCE}`);
    function getJwksClientKey(header, callback) {
        client.getSigningKey(header.kid, function (error, key: SigningKey | RsaSigningKey) {
            if (error)
                console.error(error);
            const signingKey = key.getPublicKey();
            callback(null, signingKey);
        });
    }

    return new Promise((resolve, reject) => {
        verify(
            bearerToken,
            getJwksClientKey,
            {
                audience: process.env.AUDIENCE,
                issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                algorithms: ["RS256"],
            },
            (err: VerifyErrors | null, decoded: Jwt | JwtPayload | string | undefined) => {
                if (err) reject(err);
                resolve(decoded);
            },
        );
    });
};
