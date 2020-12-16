var ldap = require("ldapjs");
var assert = require("assert");

var client = ldap.createClient({
  url: "ldap://localhost:389",
});

client.bind("cn=admin,dc=example,dc=org", "password", function (err, res) {
  assert.ifError(err);

  var options = {
    filter: "(objectclass=*)",
    scope: "sub",
    attributes: ['cn']
  };
  client.search(
    "dc=example,dc=org",
    options,
    function (error, res) {
      res.on("searchEntry", function (entry) {
        console.log("Searchentry:", JSON.stringify(entry.object));
      });

      res.on("error", function (error) {
        console.error("error: " + error.message);
      });

      client.unbind(function (error) {
        if (error) {
          console.log(error.message);
        } else {
          console.log("client disconnected");
        }
      });
    }
  );
});

client.on('error', function (err) {
  if (err.syscall == "connect") {
    console.log(err);
  }
});