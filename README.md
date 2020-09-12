# role-picker-bot
Discord bot that allow pick role on member guild join event

## Setup
* Set bot token and database connection settings on ``.env`` file
    ```shell script
    $ cp .env.example .env    
    ```
* Set bot command and event response messages
    ```shell script
    $ cp config/config.example.json config/config.json    
    ```

### Config.json available variables
Variables are parsed by sprintf, see more: https://github.com/alexei/sprintf.js

| Name | Type | config.json properties | Usage |
|:-----|:-----|:-----------------------|:------|
| role | string | <ul><li>events_responses.onSetRole</li></ul> | ``%(role)s`` |
| roles | string | <ul><li>events_responses.onGuildMemberAdd</li><li>command_responses.RoleListCommand.success</li></ul> | ``%(roles)s`` |

## Run
Build and run using ``docker-compose``
```shell script
$ sudo docker-compose up -d --build    
```