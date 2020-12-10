

`ldapsearch -H ldap://localhost:1389 -x -b "o=myhost" objectclass=*`

#find user root and display him:
`ldapsearch -H ldap://localhost:1389 -x -D cn=root -w secret -LLL -b "o=myhost" cn=root`

#adding new user "ldapjs"
ldapadd -H ldap://localhost:1389 -x -D cn=root -w secret -f ./user.ldif

#searching new user "ldapjs"
ldapsearch -H ldap://localhost:1389 -LLL -x -D cn=root -w secret -b "ou=users, o=myhost" cn=ldapjs