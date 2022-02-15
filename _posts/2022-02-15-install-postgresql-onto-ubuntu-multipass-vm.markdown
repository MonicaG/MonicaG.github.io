---
title: Install PostgreSQL onto Ubuntu multipass vm
layout: post
category: linux
desc: How to install PostgreSQL onto a virtual machine using Ubuntu multipass
excerpt_separator: <!--more-->
---

I recently installed PostgreSQL on a virtual machine on my dev computer. This post describes what I did to:

1. install a vm
1. install PostgreSQL
1. access PostgreSQL from the host machine via [pgAdmin](https://www.pgadmin.org/)
1. install a sample database into PostgreSQL

 <!--more-->

I decided to use [Ubuntu multipass](https://multipass.run/) to create the vm. I had not used it before, and this was a chance to experiment with it. Multipass lets you spin up vm instances from the command line. I found the [installation docs](https://multipass.run/docs) easy to follow and had an Ubuntu vm running in a few minutes. 

## Install Multipass

I have a Mac, so I had a couple of options to install Multipass: [brew](https://brew.sh/) or a direct install. I chose to install via brew:

```bash
$ brew install --cask multipass
```
Some notes on my install:

* I used the default hyperkit driver for the hypervisor. 
	* Multipass defaults to hyperkit; but, you can set [VirtualBox](https://www.virtualbox.org/) as the hypervisor. 
* I set the terminal application to iTerm following [these instructions](https://multipass.run/docs/changing-macos-terminal)

After the installation process, I checked that multipass was installed:

```bash
$ multipass version
multipass   1.8.1+mac
multipassd  1.8.1+mac
```


## Create a VM

The `launch` command is used to create a new vm. You can provide it a name or multipass can generate one for you. I chose to provide a name, *db-server*, using the `--name` parameter.

```bash
$ multipass launch --name db-server
```

There are two ways two access the vm:
* by opening a shell in the instance
* by using the `exec` command to execute commands directly. 

I chose to open a shell:

```bash
$ multipass shell db-server
```
The shell will display some stats, including the ipaddress of the vm. **Make note of the ipaddress, as it will be needed** when connecting to the database at a later step. 

## Install PostgreSQL

I installed the latest version using [the instructions on the PostgreSQL Ubuntu page](https://www.postgresql.org/download/linux/ubuntu/). The following commands are copied from that page. Please note, the following are all performed within the `db-server` shell. 

```bash
# Create the file repository configuration:
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import the repository signing key:
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update the package lists:
sudo apt-get update

# Install the latest version of PostgreSQL.
# If you want a specific version, use 'postgresql-12' or similar instead of 'postgresql':
sudo apt-get -y install postgresql
```

Installing PostgreSQL creates a `postgres` account on the Ubuntu vm. I logged into it to access psql:

```bash 
ubuntu@db-server:$ sudo su - postgres
```

```bash
postgres@db-server:~$ psql
```
The following was displayed:

```bash
psql (14.2 (Ubuntu 14.2-1.pgdg20.04+1))
Type "help" for help.

postgres=#
```

The postgres user does not have a password. It can be set using the `\password` command:
```bash
psql (14.2 (Ubuntu 14.2-1.pgdg20.04+1))
Type "help" for help.

postgres=# \password
Enter new password for user "postgres":
```

To exit postgres use the `\q` command

## Setup DB Access
PostgreSQL is installed on the vm, but it is not yet accessible from the Host machine (my macOS). The PostgreSQL config files will need to be modified. The files are located in `/etc/postgresql/{version}/main/` directory. In my case the files are in `/etc/postgresql/14/main/`. 

**Warning:** The following is not a secure way to setup PostgreSQL. See the [PostgreSQL documentation](https://www.postgresql.org/docs/14/admin.html) for information on setting up PostgreSQL securely.

Note: I was logged in as the `postgres` user while making modifications.

### postgresql.conf 
This file contains settings such as default storage location and memory allocation. It also configures the IPAddresses that PostgreSQL will listen on.

Find this line:
```bash
#listen_addresses = 'localhost'         # what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost'; use '*' for all
```
Remove the `#` to uncomment the line and change localhost to "*"
```bash
listen_addresses = '*'        		# what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost'; use '*' for all
```

### pg_hba.conf
This file manages security. It controls user authentication, database access and which ipaddresses are allowed to connect. Entries are in the form:

```bash
CONNECTION_TYPE	 	DATABASE 	USER 	ADDRESS 	METHOD
```

Add the following line to the file:
```bash
host    all             all             samenet                 md5
```

The above line will allow TCP/IP connections for all databases and users where the host is on the same subnet as the server. The connection method is "md5".


* host - This is the connection type. "host" means a TCP/IP socket (either encrypted or not).
* all - The first `all` is the database that is allowed to be connected to. In this case all databases can be connected to.
* all - The second `all` is the user that can connect. In this case all users can connect.
* samenet - This is the host address that is allowed to connect. Using `samenet` means that any address in the subnet the server is on is allowed to connect. 
* md5 - use [md5 authentication](https://www.postgresql.org/docs/14/auth-password.html).

PostgreSQL will need to be restarted in order for the changes to take effect. Exit the `postgres` user back to the `ubuntu` user and restart PostgreSQL:
```bash
sudo systemctl restart postgresql.service
# check that PostgreSQL is ready after the restart
sudo pg_isready
```

### pgAdmin
[pgAdmin](https://www.pgadmin.org/) is installed on my host machine (MacOS). I want to use it to connect to the PostgreSQL installed on the Ubuntu vm. I used the 'Add Server' wizard to connect to the database with the following information

* General -> Name: db-server (although this could be anything you want)
* Connection -> Host name/Address: 192.168.64.3 (The IPAddress of my Ubuntu vm)
* Connection -> Port: 5432 (the default PostgreSQL port)
* Connection -> Maintenance database: postgres
* Connection -> Username: postgres


## Install a sample database
Next, I installed a sample database because I wanted some tables and data to play with. Googling turned up many options. I chose the [northwind sample database for psql](https://github.com/pthom/northwind_psql). 

### Create Role
First, I created a role to use with the northwind db. I created a new role by right clicking on the "db-server" menu option and selecting "Create -> Login/Group Roles...". The [pgAdmin documentation](https://www.pgadmin.org/docs/pgadmin4/latest/role_dialog.html) has details on all the various fields. In short, I did the following:

* General -> Name: north
* Definition -> Password: *super secret password*
* Privileges -> Can login: Yes
* Privileges -> Superuser: No
* Privileges -> Create roles: No
* Privileges -> Create databases: Yes
* Privileges -> Inherit rights from the parent roles: Yes
* Privileges -> Can initiate streaming replication and backups: No

The sql displayed in the SQL tab was the following:
```sql
CREATE ROLE north WITH
	LOGIN
	NOSUPERUSER
	CREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';
COMMENT ON ROLE north IS 'The user for the northwind database';
```

After clicking the save button the 'north' role was created.


### Create the database

I created a database by right clicking on the "db-server" menu option and selecting "Create -> Database...". The [pgAdmin documentation](https://www.pgadmin.org/docs/pgadmin4/latest/database_dialog.html) details how to create a database. I did the following:
* General -> Database: northwind
* General -> Owner: north
* Definition -> Encoding: UTF8 (This is the encoding used by the sample database)
* Definition -> Template: template1
* Definition -> Tablespace: pg_default
* Definition -> Collation: C.UTF-8
* Definition -> Character Type: C.UTF-8
* Definition -> Connection limit: -1

The sql displayed in the SQL tab was:
```sql
CREATE DATABASE northwind
    WITH 
    OWNER = north
    TEMPLATE = template1
    ENCODING = 'UTF8'
    LC_COLLATE = 'C.UTF-8'
    LC_CTYPE = 'C.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE northwind
    IS 'Sample database';
```

### Load the database
I opened the [Query Tool](https://www.pgadmin.org/docs/pgadmin4/latest/query_tool.html) by drilling down to db-server -> Databases -> northwind, right clicking and choosing Query Tool. I am logged in as the postgres user, so any SQL I run will be under that account. I want to use the north account instead. The user can be changed by clicking on the connection drop down in the Query Tool editor.

<img src="/images/pgAdminQueryTool.png" class="img-fluid mx-auto d-block" alt="The connection menu dropdown">

After connecting as the `north` user the connection information should be: `northwind/north@db-server`.


 Next, I download the northwind sample database from GitHub to my host machine (MacOS):
```bash
$ curl https://raw.githubusercontent.com/pthom/northwind_psql/master/northwind.sql -o northwind.sql
```


I then loaded the tables using the Query Tool in pgAdmin. The steps I used were:

* Open File
	* Choose northwind.sql file that was just downloaded
	* This will display the contents of the file into the editor
* Click 'Execute/Run'
* Right click on `db-server` and choose refresh.

Now, drilling down through the menus: Databases -> northwind -> Schemas -> public -> Tables displays 14 tables.


The tables can also be viewed on the guest machine (Ubuntu). As the postgres user, log into the northwind database and use the `\dt` command to list the tables.


```bash
postgres@db-server:~$ psql northwind
psql (14.2 (Ubuntu 14.2-1.pgdg20.04+1))
Type "help" for help.

northwind=# \dt         
```

## Stop/Start the VM
To shutdown the Ubuntu vm use the command:
```bash
$ multipass stop db-server
```

To restart the server use the command:
```bash
$ multipass start db-server
```

## Conclusion

I now have a vm running PostgreSQL! 

