const app = require("./server");
const { config } = require("./config");
const connect = require("./db/connect.js");

connect().then(async function onServerInit() {
  console.log(`DB connected`);
  app.listen(config.app.port, (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
    } else {
      console.log(`Server running at http://localhost:${config.app.port}`);
    }
  });
});
