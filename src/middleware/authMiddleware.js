const jwt = require("jsonwebtoken");
const { HTTP_STATUS, USER_ROLE } = require("../config/constants");

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Verify JWT Token
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Token tidak ditemukan",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Token tidak valid atau expired",
    });
  }
};

// Verify Admin Role
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== USER_ROLE.ADMIN) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: "Akses ditolak. Hanya admin yang dapat mengakses",
    });
  }
  next();
};

// Verify User Role
const verifyUser = (req, res, next) => {
  if (!req.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: "User tidak terautentikasi",
    });
  }
  next();
};

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      namaDepan: user.namaDepan,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyUser,
  generateToken,
  JWT_SECRET,
};
