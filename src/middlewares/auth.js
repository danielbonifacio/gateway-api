const Token = require('../services/token')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res
      .status(401)
      .send({ message: 'Providencie um token.' });

  // Separa a string do header
  const parts = authHeader.split(' ');
  const [scheme, token] = parts;

  // Caso o Header não seja formatado da maneira correta
  if (!parts.length === 2 || !/^Bearer$/i.test(scheme))
    return res
      .status(401)
      .send({ message: 'Token inválido.' });


  Token.decode(token)
    .then(response => {
      req.user = response;
      next();
    })
    .catch(err => {
      res
        .status(401)
        .send({ message: 'Token ' });
    });
}
