# Authentication Validator
This series of simple node.js applications is built to test Auth0 authentication with the goal of deploying this test through to my local k8s cluster to validate.

Services:
Authenticatior - a user facing service that will redirect to Auth0 to seek user authentication and provide a list of services to interact with once logged in.

CentralService - provides authentication feedback (identity, permissions)

RequesterService - connects to Centralservice as an API-to-API call and passes results back to client.