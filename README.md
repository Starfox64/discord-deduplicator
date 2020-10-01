# discord-deduplicator

Setup
-----

`npm i`

Set en ENV variables with a comma separated list of paths that will be watched for cursed filenames  
  
Example
`DISCORD_WATCHED_PATHS="E:\Downloads"`

By default files are only checked at creation, if you want file to be also checked at startup add this variable:
`DISCORD_CHECK_STARTUP=1`

Installing as a service (Windows)
---------------------------------


`node service.js install`
`node service.js uninstall`
