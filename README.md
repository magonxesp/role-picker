# role-picker-bot
Discord bot that allow pick role on member guild join event.

Add to discord server [here](https://discord.com/oauth2/authorize?client_id=730786078499405826&permissions=268957760&scope=bot) (Spanish version)

Use t!help for view the list of commands (in spanish too)

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
| role | string | <ul><li>events_responses.onSetRole</li><li>command_responses.SelectRoleCommand.success</li><li>command_responses.RemoveRoleCommand.success</li><li>command_responses.ExcludeRoleCommand.success</li><li>command_responses.IncludeRoleCommand.success</li></ul> | ``%(role)s`` |
| roles | string | <ul><li>events_responses.onGuildMemberAdd</li><li>command_responses.RoleListCommand.success</li></ul> | ``%(roles)s`` |
| user | string | <ul><li>command_responses.SelectRoleCommand.success</li><li>command_responses.RemoveRoleCommand.success</li></ul> | ``%(user)s`` |

## Run
Build and run using ``docker-compose``
```shell script
$ sudo docker-compose up -d --build    
```