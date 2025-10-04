const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(token);
      console.log(decoded);

      req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

      if (!req.user) return res.status(401).json({ message: "User not found" });

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = protect;
