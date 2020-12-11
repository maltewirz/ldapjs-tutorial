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
    sn: "efub"
  };

  // 3
  client.add(
    "cn=userId5,dc=example,dc=org",
    newUser,
    (err, response) => {
      if (err) return console.log(err);
      return response;
    }
  );
});

// username wirzma1
// pw pw

// authentifierung


// autorisierung: gruppe epp
