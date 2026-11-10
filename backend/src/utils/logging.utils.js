export const routeLogger  = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}