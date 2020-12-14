var ldap = require("ldapjs");
var assert = require("assert");

var client = ldap.createClient({
  url: "ldap://localhost:389",
});

client.bind("cn=admin,dc=example,dc=org", "admin", function (err) {
  assert.ifError(err);
  let newUser = {
    cn: "userId5",
    userPassword: "password",
    objectClass: "person",
    sn: "efub",
  };

  // client.add(
  //   "cn=userId5,dc=example,dc=org",
  //   newUser,
  //   (err, response) => {
  //     if (err) return console.log(err);
  //     return response;
  //   }
  // );

  var options = {
    filter: "(objectClass=*)",
    scope: "sub",
  };

  //   console.log("connected");
  client.search(
    "cn=admin,dc=example,dc=org",
    options,
    function (error, search) {
      console.log("Searching.....");

      client.on("searchEntry", function (entry) {
        console.log("hi searchEntry");
        //   if (entry.object) {
        //     console.log("entry: %j " + JSON.stringify(entry.object));
        //   }
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