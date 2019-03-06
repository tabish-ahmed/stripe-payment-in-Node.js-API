require('dotenv').config()

const publicKey = process.env.PUBLIC_KEY;
const secretKey = process.env.SECRET_KEY;

const app = require("express")();
const stripe = require("stripe")(secretKey);

app.set("view engine", "ejs");
app.use(require("body-parser").urlencoded({extended: false}));




app.get("/", (req, res) =>
  res.render("index", {publicKey}));

app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
    })
  .then(customer => stripe.charges.create({amount, description: "Sample Charge", currency: "usd", customer: customer.id
    }))
  .then(charge => res.render("charge"));
});

app.listen(3000);