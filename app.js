const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello there my boy")
})

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening in port ${port}`))