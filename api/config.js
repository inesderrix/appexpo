const MONGODB_ENDPOINT = process.env.MONGODB_ENDPOINT;
const SECRET = process.env.SECRET || 'dev-only-secret';

module.exports = {
    MONGODB_ENDPOINT,
    SECRET
};
