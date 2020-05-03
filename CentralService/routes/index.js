var express = require('express');
var router = express.Router();

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-9lskuac3.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://centralAuth.jhbutler.info',
  issuer: `https://dev-9lskuac3.auth0.com/`,
  algorithms: ['RS256']
});

router.use(checkJwt);

/* GET home page. */
router.get('/', checkJwt, function(req, res, next) {
  var userStat = req.isAuthenticated();
  
  res.json({

    message: 'Hello from a private endpoint! You need to be authenticated to see this. Status: ' + isAuthenticated ? "Authenticated" : "Not Authenticated"
  });
});

module.exports = router;
