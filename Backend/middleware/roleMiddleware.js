/**
 * Role-based access middleware
 * Use after `protect` middleware to restrict access to specific user roles
 */

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      // Check if the user is attached by `protect` middleware
      if (!req.user || !req.user.role) {
        res.status(403);
        return next(new Error('Access denied: User role not found.'));
      }
  
      // Check if the user's role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        res.status(403);
        return next(new Error('Access denied: Insufficient permissions.'));
      }
  
      // Role is valid — continue
      next();
    };
  };
  