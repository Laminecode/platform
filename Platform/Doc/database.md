
# Python package
- pip install mysqlclient

# create user
- CREATE USER 'platform'@'localhost' IDENTIFIED BY 'platform';
- GRANT ALL PRIVILEGES ON platform.* TO 'platform'@'localhost';

# connection
- \connect platform@localhost
- \sql
- \use platform

# creating the database
- create database platform

# Hosting
- check Render for database hosting
