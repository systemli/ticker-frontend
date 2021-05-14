# Installation
This is tested under Ubuntu 20.04 LTS
## Requirements:
- `nodejs`
- `yarn`
- `nginx`
- certificate (`certbot` & `python3-certbot-nginx` to use free Let's Encrypt Certs)
- `git`
- [___ticker_ API__](https://github.com/systemli/ticker/)
- [___ticker_-admin__](https://github.com/systemli/ticker-admin)
- Public IPv4
- Public IPv6 (Please!)

### Getting NodeJS:
_Don't use the shipped version of your system, if you're working on a Debian based OS (Ubuntu, etc)_ 

Instead use:
 [nodesource/distributions](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)

## Installation

1. `cd /var/www/`
The directory where we gonna install all the things
2. `git clone https://github.com/systemli/ticker-frontend`
Clone the repository onto your disk
2. `cd ticker-frontend`
Go into the just cloned repository
3. `git checkout d03982f3059d6335a9e9ec0abcb71813ccbafef7`
Checkout this branch. _Hopefully, this won't be necessary in the future, but right now, this seems to be the the last working commit (for me)_
4. `yarn`
Install the dependencies
5. `vim .env`
Fill your .env file with the following content:
```.env
REACT_APP_API_URL=https://api.domain.tld/v1
```
_Change `api.domain.tld` to the URL you chose at ticker API server creation_

7. `yarn build`
Build the application
6. `chown www-data:www-data dist/ -R`
Sets the owner for the freshly created dist repository to your nginx user

## Exposing
`vim /etc/nginx/sites-available/ticker-frontend`

_The following config is for a single domain only! For wildcard configs, just replace the `sub.domain.tld` with a `*.domain.tld`. You need to validate your domain via DNS challenge or use another provider then Let's Encrypt!_

```nginx.conf
server {
    listen 80;
    listen [::]:80;
    server_name sub.domain.tld
    root /var/www/ticker-frontend/dist;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}

```

Create a symlink to enable this config:
`ln -s /etc/nginx/sites-available/ticker-frontend /etc/nginx/sites-enabled/`

Now run `nginx -t` to check if the config is correct.

If your output looks like this:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```
then you can proceed. Otherwise: look for the error or ask someone to help.

Run `certbot --nginx -d sub.domain.tld` to get a free SSL certificate. _Please keep in mind, that you need to point the `A` & `AAAA` Records to your machine!_

It should generate a certificate after answering a few questions like a email address, etc.

done. This domain is now serving a ticker frontend. :)

**You need to create the ticker in ticker-admin in order to see something!**