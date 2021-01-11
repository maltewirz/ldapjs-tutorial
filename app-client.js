var ldap = require("ldapjs");
var assert = require("assert");
var fs = require("fs");

var opts = {
  ca: [fs.readFileSync("ca.pem")], // 'ca': certificate authority from the openldap server
  host: 'example.org',
  reconnect: true,
  rejectUnauthorized: false, // for self-signed
};

var client = ldap.createClient({
  url: "ldap://localhost",
  tlsOptions: opts,
});

var controls = client.controls;

client.starttls(opts, controls, function (start_err, start_res) {
  if (start_err) {
    console.log(start_err);
  }
  client.bind("cn=admin,dc=example,dc=org", "password", function (err, res) {
    assert.ifError(err);

    var options = {
      filter: "(objectclass=*)",
      scope: "sub",
      attributes: ['cn']
    };
    client.search(
      "cn=Maintainers,ou=Groups,dc=example,dc=org",
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
          }
        });
      }
    );
  });
});

client.on("error", function (err) {
  if (err.syscall == "connect") {
    console.log(err);
  }
});
