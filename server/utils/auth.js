const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const decodedToken = jwt.verify(token, secret);
      req.user = decodedToken.authenticatedPerson;
    } catch (error) {
      console.error('Invalid token', error.message);
      req.user = null; // Ensure `req.user` is explicitly set to null if the token is invalid
    }

    return req;
  },
  signToken: function ({ email, username, id }) {
    const payload = { email, username, id };
    console.log(id)
    return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
  },
};
