const admin = require("firebase-admin");

const { config } = require("../../config");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.certConfig),
});

const auth = admin.auth();

function verifyIdToken(token) {
  return auth.verifyIdToken(token);
}

module.exports = {
  admin: admin,
  auth: auth,
  verifyIdToken: verifyIdToken,
};
