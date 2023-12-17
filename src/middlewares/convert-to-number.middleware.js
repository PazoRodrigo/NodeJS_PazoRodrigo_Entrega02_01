//Custom Middleware
function convertToNumber(req, res, next) {
  req.params.id = Number(req.params.id);
  next(); // Para que lo deje seguir
}

module.exports = { convertToNumber };
