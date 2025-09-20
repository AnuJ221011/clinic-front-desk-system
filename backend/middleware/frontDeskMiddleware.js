function frontDeskMiddleware(req, res, next) {
  const allowedRoles = ["front_desk", "admin"];

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Front desk or Admin only." });
  }

  next();
}

module.exports = frontDeskMiddleware;