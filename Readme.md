

ldapsearch -H ldap://localhost:1389 -x -b "o=myhost" objectclass=*

#find user root and display him:
ldapsearch -H ldap://localhost:1389 -x -D cn=root -w secret -LLL -b "o=myhost" cn=root