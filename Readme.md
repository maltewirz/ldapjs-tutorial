
# LDAP Server

```shell
#Run server with admin rights:
sudo nodemon app-server.js

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

# LDAP Client

```shell
#Run server in docker:
docker run -p 389:389 -p 636:636 --name my-openldap-container -d docker-remote.artifactory.ham.hella.com/osixia/openldap:1.4.0

#Shows all entries in docker:
docker exec my-openldap-container ldapsearch -x -H ldap://localhost:389 -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin

#Run client:
nodemon app-client.js

```


docker exec my-openldap-container ldapsearch -x -H ldap://localhost:389 -b dc=example,dc=org -D "cn=userId7,dc=example,dc=org" -w password


# userId7, example.org
dn: cn=userId7,dc=example,dc=org
cn: userId7
userPassword:: cGFzc3dvcmQ=
objectClass: person
sn: efub


docker run -p 389:389 --name ldap-service --hostname ldap-service --env LDAP_ORGANISATION="Example Inc." --env LDAP_DOMAIN="example.org" \
--env LDAP_ADMIN_PASSWORD="adminPassword" --env LDAP_BASE_DN="dc=example,dc=org"  --detach  docker-remote.artifactory.ham.hella.com/osixia/openldap:1.3.0


docker run --name phpldapadmin-service -p 6443:443 --hostname phpldapadmin-service --link ldap-service:ldap-host --env PHPLDAPADMIN_LDAP_HOSTS=ldap-service --detach docker-remote.artifactory.ham.hella.com/osixia/phpldapadmin:0.9.0


docker exec ldap-service ldapsearch -H ldap://localhost:389 -x -b "dc=example,dc=org" objectClass=*

docker exec ldap-service ldapsearch -x -D "cn=admin,dc=example,dc=org" -w adminPassword -H ldap://localhost:389 objectClass=*

# working query_
usage: ldapsearch [options] [filter [attributes...]]
-LLL Trim down output
-x Simple authentication
-D binddn  bind DN
-w bind password (for simple authentication)
-b basedn  base dn for search

docker exec ldap-service ldapsearch -LLL -x -D "cn=admin,dc=example,dc=org" -w "adminPassword" -b "cn=admin,dc=example,dc=org" "(objectclass=*)"

docker exec ldap-service ldapsearch -LLL -x -D "cn=admin,dc=example,dc=org" -w "adminPassword" -b "cn=userId7,dc=example,dc=org" "(objectclass=*)"