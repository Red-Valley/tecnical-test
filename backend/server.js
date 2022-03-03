const { app, server } = require("./src/app");

server.listen(
  app.get("port"),
  console.log("Server running on port", app.get("port"))
);
