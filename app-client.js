var ldap = require("ldapjs");
var assert = require("assert");

var client = ldap.createClient({
  url: "ldap://localhost:389",
});

client.bind("cn=admin,dc=example,dc=org", "adminPassword", function (err, res) {
  assert.ifError(err);
  // console.log('res', res);
  let newUser = {
    cn: "userId7",

    userPassword: "password",
    objectClass: "person",
    sn: "efub",
  };
  // Here i successfully add this user "userId7"
  // client.add(
  //   "cn=userId7,dc=example,dc=org",
  //   newUser,
  //   (err, response) => {
  //     if (err) return console.log(err);
  //     return response;
  //   }
  // );

  var options = {
    filter: "objectClass=*",
    scope: "sub",
    attributes: ['cn']
  };
  // Now the search, it runs without error, but does never receive a searchEntry
  client.search(
    "cn=userId7,dc=example,dc=org",
    options,
    function (error, search) {
      console.log("Searching.....");

      client.on("searchEntry", function (entry) {
        console.log("I found a result in searchEntry");
      });

      client.on("error", function (error) {
        console.error("error: " + error.message);
      });

      client.unbind(function (error) {
        if (error) {
          console.log(error.message);
        } else {
          // console.log("client disconnected");
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