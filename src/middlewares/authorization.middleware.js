export const authorization = (role) => {
  return async (req, res, next) => {
    console.log(req.user);
    if (!req.user) return res.status(401).json({ error: "no autorizado" });
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Rol invalido" });
    }
    next();
  };
};