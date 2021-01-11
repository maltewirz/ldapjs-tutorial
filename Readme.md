
# LDAP NodeJS

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

# LDAP Docker

```shell
#Run client:
nodemon app-client.js

#Run server in docker:
docker run \
    -p 389:389 \
    -p 636:636 \
    --name ldap-service \
    --hostname ldap-service \
    --env LDAP_ADMIN_PASSWORD="password" \
    --env LDAP_BASE_DN="dc=example,dc=org" \
    --env LDAP_TLS_VERIFY_CLIENT=try \
    --detach  \
    osixia/openldap:1.4.0

#Run Frontend in docker:
docker run --name phpldapadmin-service -p 6443:443 --hostname phpldapadmin-service --link ldap-service:ldap-host --env PHPLDAPADMIN_LDAP_HOSTS=ldap-service --detach docker-remote.artifactory.ham.hella.com/osixia/phpldapadmin:0.9.0

# Adding user "developer" and group "Maintainers" of which the former is a member
sudo docker cp complete-setup.ldif ldap-service:/
docker exec -it ldap-service ldapadd -x -W -D "cn=admin,dc=example,dc=org"  -f complete-setup.ldif

# Info: ldapsearch Flags:
usage: ldapsearch [options] [filter [attributes...]]
-LLL Trim down output
-x Simple authentication
-D binddn  bind DN (distinguished name)
-w bind password (for simple authentication)
-b basedn  base dn for search
-d1 verbose output for debugging

#Shows all entries in docker:
docker exec ldap-service ldapsearch -LLL -x -D "cn=admin,dc=example,dc=org" -w "password" -b "dc=example,dc=org" "(objectclass=*)"

#Show specific entry in docker for developer
docker exec ldap-service ldapsearch -LLL -x -D "cn=admin,dc=example,dc=org" -w "password" -b "cn=developer,dc=example,dc=org" "(objectclass=*)"

#Show specific entry in docker for developer via exposed port 389
ldapsearch -LLL -x  -h localhost -p 389  -D "cn=admin,dc=example,dc=org" -w "password" -b "cn=developer,dc=example,dc=org" "(objectclass=*)"

#ldapsearch using starttls - working
ldapsearch -x -ZZ -h localhost -D "cn=admin,dc=example,dc=org" -w "password" -b "cn=developer,dc=example,dc=org" "(objectclass=*)"

#ldapsearch using ldap tls - working
ldapsearch -x -H ldaps://localhost -D "cn=admin,dc=example,dc=org" -w "password" -b "cn=developer,dc=example,dc=org" "(objectclass=*)"

#shows ciphers
openssl s_client -connect localhost:636 -showcerts

#show user and test connectivity - working 
ldapwhoami -H ldap://localhost -x

#show user and test starttls connectivity - working
ldapwhoami -H ldap://localhost -x -ZZ   

#show user and test tls connectivity - working
ldapwhoami -H ldaps://localhost -x
