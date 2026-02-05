import { get401, get403 } from "../controllers/error/error.controller.js";

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    
    if (!req.session || !req.session.userRole) {
      return get401(req, res);
    }

    if (!roles.includes(req.session.userRole)) {
      return get403(req, res);
    }

    next();
  };
};