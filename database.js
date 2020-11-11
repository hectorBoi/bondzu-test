const Parse = require("parse/node");

// Initialize connection with Parse Database
Parse.initialize(
  "7aGqZRDKBITfaIRAXq2oKoBkuWkhNqJZJWmf318I",
  "",
  "fF5zsMkXpw3eIcmg4ggwh6HlynYnNpYmZeJyl5Cw"
);
Parse.serverURL =
  "http://ec2-52-42-248-230.us-west-2.compute.amazonaws.com/parse";
Parse.appName = "Bondzu";

module.exports = {
  Parse
}