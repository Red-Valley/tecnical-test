const app = require("./src/app");

app.listen(
  app.get("port"),
  console.log("Server running on port", app.get("port"))
);
