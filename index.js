const express = require("express");
const mongoose = require("mongoose");
const shortUrl = require("./models/urls");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

app.set("view engine", "ejs");
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await shortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await shortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {

  const shorturl = await shortUrl.findOne({short : req.params.shortUrl})
  if (shortUrl == null) return res.sendStatus(404);
  shorturl.clicks++;
  shorturl.save();
  res.redirect(shorturl.full);
});
app.listen(PORT, () => console.log(`Port is starting at ${PORT}`));
