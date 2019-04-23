const express = require("express");
const nunjucks = require("nunjucks");

// Configura Express
const app = express();
app.use(express.urlencoded({ extended: false }));

// Configura NunJucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});
app.set("view engine", "njk");

// Middleware
const verificaIdade = (req, res, next) => {
  const { idade } = req.query;

  if (!idade) {
    return res.redirect("/");
  }

  return next();
};

// Valida idade via POST
app.post("/check", (req, res) => {
  const { idade } = req.body;

  if (idade >= 18) {
    return res.redirect(`/major?idade=${idade}`);
  } else {
    return res.redirect(`/minor?idade=${idade}`);
  }
});

// Chamadas App
app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/major", verificaIdade, (req, res) => {
  const { idade } = req.query;

  return res.render("major", { idade });
});

app.get("/minor", verificaIdade, (req, res) => {
  const { idade } = req.query;

  return res.render("minor", { idade });
});

// Config Listen
app.listen(3000);
