function authMiddleware(req, res, next) {
    // Auth bypassed as requested
    next();
}

module.exports = authMiddleware;
