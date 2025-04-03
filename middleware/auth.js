const jwt = require('jsonwebtoken');
const User = require('../models/user')


const userExtractor = async (request, response, next) => {
  try {
    const token = request.cookies?.accessToken;
    console.log(token);

    if (!token) {
      return response.sendStatus(401);
    }
    // vamos a intentar ingresar un token errado
    const badToken = jwt.sign('asfafasf', 'hola');

    // const decoded = jwt.verify(badToken, process.env.ACCESS_TOKEN_SECRET);
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);

    // buscamos el usuario por medio del metodo de mongo en la base de datos con el metodo de mongo del find by id y lo invocamos usando un argumento
    const user = await User.findById(decoded.id);
    request.user = user;
  } catch (error) {
    return response.sendStatus(403)

  }
  //el next garantiza que el proceso continue, realizamos en proceso que siga continuando aunque haya un error y asi se evita algun crasheo
  next();
};

module.exports = { userExtractor };