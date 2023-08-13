const ejs = require("ejs");
const axios = require("axios");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

require("dotenv").config();

app.set("view engine", ejs);
app.use("/public", express.static("public"));

app.get("/", async (req, res) => {
  let data = {
    approximate_member_count: 1400, // Default value
  };
  // Get the member count from the Discord API
  try {
    const response = await axios.get(
      "https://discord.com/api/v9/invites/faithchatt?with_counts=true"
    );
    data = response.data;
  } catch (error) {
    console.error(error);
  }

  res.render("index.ejs", {
    member_count: (
      data.approximate_member_count -
      (data.approximate_member_count % 100)
    ).toLocaleString("en-US"),
  });
});

app.get("/what-we-believe", (req, res) => {
  res.render("what_we_believe.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
