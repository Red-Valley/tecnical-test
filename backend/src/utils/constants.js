const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
}

// hashing
const SALT_ROUNDS = 10;

module.exports = {
    STATUS_CODE,
    SALT_ROUNDS
}