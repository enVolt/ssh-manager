# Disclaimer

Original package is `https://github.com/alemures/ssh-manager/`, this is modification on top of it.

**Why it's not a fork**

I was looking for a good ssh gui, which will help me manage ssh server access. (Not being a Devops guy, I'm handling too many servers; even multiple organizations). It was painful when ssh to a server was giving me error of `Too many authentication failures`, just because I've 10+ pem files. Not finding a *light-weight* and good GUI, I decided to write my own library. I was like, why don't I just search on Github (`site:github.com ssh manager` on Google). I find this one to be simple and good.

## Ok, what is changed -

1. I've never used the flags listed under `Usage` section. Not sure if they are broken.
2. Each SSH connection is a new ssh-agent shell. (check `lib/Connection.js`#L15)
3. CSV Reader is removed. (Editing a CSV from vi is a cumbersome take; using JSON I decided to get completely rid of that)
4. Ping check removed - I find it to be slow, plus I actually don't need that. (It's a opinionated change)
5. Table output is changed AFAIK (I don't recall the changes; becaused I added `git` to npm installation directory at very later point)
6. **(Important) Multiple SSH keys support when forwarding.**

===
ssh-manager
===

A powerful ssh connections manager.

### Install
npm install ssh-manager -g

### Configuration
Start the script with `ssh-manager` and you will see it running with few sample servers, to add yours,
you have to create a configuration file with **json** or **csv** extension with the format bellow:

JSON file:
```
[
  {
    "name": "Test Server1",
    "user": "alejandro",
    "host": "8.8.8.8"
  },
  {
    "name": "Test Server2",
    "user": "paul",
    "host": "7.8.8.8",
    "port": 23,
    "pem": "./file2.pem"
    }
]
```

CSV file:
```
name,user,host,port,pem
Test Server1,alejandro,8.8.8.8
Test Server2,paul,7.8.8.8,23,./file2.pem
```
> *port* and *pem* are optional fields.

Once you have your file ready you can provide it with the option `-f` or `--file`.

### Usage
```
Usage: ssh-manager [options]

Options:
  -f, --file     Provide a json or csv file with servers                [string]
  -o, --order    Order the table by the given column
      [string] [choices: "name", "id", "status", "user", "host", "port", "auth"]
  -s, --server   Specify the server name or id to connect               [string]
  -n, --nocheck  Disable the server connection checkings               [boolean]
  -t, --timeout  Timeout for server checkings in milliseconds     [default: 500]
  -h, --help     Show help                                             [boolean]

https://github.com/alemures
```