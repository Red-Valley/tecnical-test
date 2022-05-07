const jwt = require("jsonwebtoken");

const validateJwt = (req, res, next) => {
  try {
    const token = req.header("authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "The token is missing",
      });
    }
    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Invalid token",
      error,
    });
  }
};

module.exports = { validateJwt };
