# Disclaimer

Original package is `https://github.com/alemures/ssh-manager/`, this is modification on top of that.

**Why it's not a fork**

I was looking for a good SSH GUI, which can help me manage multiple server access via SSH (Not being a DevOps guy, I am/was handling too many servers; even multiple organizations). It was painful when ssh to a server was giving me error of `Too many authentication failures`, just because I've 10+ pem files. Not being able to find a *light-weight* and good GUI, I decided to write my own tool (CLI). I just searched on Github (`site:github.com ssh manager` on Google), and found this one to be simple and good.

## How it works

1. Modify `servers/servers.json` (easy to do; if you've basic understanding of SSH terminology)
2. Put the SSH Keys (`.pem` files) in `servers` folder
3. Better create alias (`alias sshm=<CLONE_DIR>/lib/node_modules/ssh-manager/lib/cli.js`)
4. Good to go. Just `sshm` from shell and choose from the list


### Okay, so what is changed (with respect to original repo) -

1. I've never used the flags listed under `Usage` section. Not sure if they are broken.
2. Each SSH connection is a new ssh-agent shell. (check `lib/Connection.js`#L15)
3. CSV Reader is removed. (Editing a CSV from vi is a cumbersome task)
4. Ping check removed - I find it slow and unnecessary. (It's an opinionated change)
5. Table output is changed AFAIK (I don't recall the original table format; because I added `git` to npm installation directory at very later stage)
6. **(Important) Multiple SSH keys supported when forwarding.**


## Configuration
Start the script with `sshm` (or your chosen alias) and you will be prompted to select a server from few sample servers. To add yours,
you have to create a configuration file with (`servers/servers.json`) with the following format:

(please remove comments)

```json
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
    "pems": ["file2.pem", "id_rsa.pem"] // You can specify multiple pem files, all will be forwarded
  },
// If you need to ssh via a jumphost. Specify the jumphost's address under host field, and next server under `secondhost` field.
  {
    "name": "Test Server2",
    "user": "paul",
    "host": "7.8.8.8",
    "port": 23,
    "pem": "file2.pem", // you can also use `pems` option
    "secondhost": "root@172.12.12.12"
  }
]
```

### Usage
```
Usage: sshm [options]

Options:
  -o, --order    Order the table by the given column
      [string] [choices: "name", "id", "user", "host", "port"]
  -s, --server   Specify the server name or id to connect               [string]
  -h, --help     Show help                                             [boolean]

```
https://github.com/alemures  (<-- Original Author)
