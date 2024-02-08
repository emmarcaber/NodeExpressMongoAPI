require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/route");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", () => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());
app.use("/api", routes);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "NodeExpressMongoAPI",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Emmar Caber",
        url: "https://github.com/emmarcaber",
        email: "caberemmar@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => {
  res.json({
    link: "Please visit the /api-docs route",
  });
});
