
LDAP Server

```shell
#Run server with admin rights:
sudo nodemon app.js

#search users
ldapsearch -H ldap://localhost:1389 -x -b "o=myhost" objectclass=*

#find user root and display him:
ldapsearch -H ldap://localhost:1389 -x -D cn=root -w secret -LLL -b "o=myhost" cn=root

#adding new user "ldapjs"
ldapadd -H ldap://localhost:1389 -x -D cn=root -w secret -f ./user.ldif

#searching new user "ldapjs"
ldapsearch -H ldap://localhost:1389 -LLL -x -D cn=root -w secret -b "ou=users, o=myhost" cn=ldapjs

#modifying
ldapmodify -H ldap://localhost:1389 -x -D cn=root -w secret -f ./passwd.ldif

#delete a user
ldapdelete -H ldap://localhost:1389 -x -D cn=root -w secret "cn=ldapjs, ou=users, o=myhost"
```

LDAP Client

Run server in docker:
`docker run -p 389:389 -p 636:636 --name my-openldap-container -d docker-remote.artifactory.ham.hella.com/osixia/openldap:1.4.0
`

#Shows all entries in docker:
docker exec my-openldap-container ldapsearch -x -H ldap://localhost:389 -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin