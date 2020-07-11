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

## Run
Build and run using ``docker-compose``
```shell script
$ sudo docker-compose up -d --build    
```