const dotenv = require("dotenv");

dotenv.config();

const {
  NODE_ENV = "development",
  PORT,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_PRODUCTION,
  FB_CERT_TYPE,
  FB_CERT_PROJECT_ID,
  FB_CERT_PRIVATE_KEY_ID,
  FB_CERT_PRIVATE_KEY,
  FB_CERT_CLIENT_EMAIL,
  FB_CERT_CLIENT_ID,
  FB_CERT_AUTH_URI,
  FB_CERT_TOKEN_URI,
  FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
  FB_CERT_CLIENT_X_509_CERT_URL,
  YOUTUBE_API_KEY,
  YOUTUBE_SEARCH_URI,
} = process.env;

config = {
  development: {
    app: {
      port: PORT,
    },
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    firebase: {
      certConfig: {
        type: FB_CERT_TYPE,
        project_id: FB_CERT_PROJECT_ID,
        private_key_id: FB_CERT_PRIVATE_KEY_ID,
        private_key: FB_CERT_PRIVATE_KEY,
        client_email: FB_CERT_CLIENT_EMAIL,
        client_id: FB_CERT_CLIENT_ID,
        auth_uri: FB_CERT_AUTH_URI,
        token_uri: FB_CERT_TOKEN_URI,
        auth_provider_x509_cert_url: FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
        client_x509_cert_url: FB_CERT_CLIENT_X_509_CERT_URL,
      },
    },
    client: {
      URL: process.env.CLIENT_URL || "http://localhost:3000",
    },
    youtube: {
      apiKey: YOUTUBE_API_KEY,
      searchUri: YOUTUBE_SEARCH_URI,
    },
  },
  production: {
    app: {
      port: PORT || "80",
    },
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
    firebase: {
      certConfig: {
        type: FB_CERT_TYPE,
        project_id: FB_CERT_PROJECT_ID,
        private_key_id: FB_CERT_PRIVATE_KEY_ID,
        private_key: FB_CERT_PRIVATE_KEY,
        client_email: FB_CERT_CLIENT_EMAIL,
        client_id: FB_CERT_CLIENT_ID,
        auth_uri: FB_CERT_AUTH_URI,
        token_uri: FB_CERT_TOKEN_URI,
        auth_provider_x509_cert_url: FB_CERT_AUTH_PROVIDER_X_509_CERT_URL,
        client_x509_cert_url: FB_CERT_CLIENT_X_509_CERT_URL,
      },
    },
    client: {
      URL: process.env.CLIENT_URL || "http://localhost:3000",
    },
    youtube: {
      apiKey: YOUTUBE_API_KEY,
      searchUri: YOUTUBE_SEARCH_URI,
    },
  },
};

module.exports = { config: config[NODE_ENV] };
