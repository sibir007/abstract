# README

## dev run

`flask --app adminproject:create_app run  --debug`

## python package build

`$ pip install build`
`$ python -m build --wheel .`

## Configure the Secret Key

`$ python -c 'import secrets; print(secrets.token_hex())'`

## Run with a Production Server

`$ waitress-serve --call 'adminproject:create_app'`

## `flask  --app adminproject:create_app build-test-admin-db` — это комнда из сонсоли если root слетит (правда она сначала drop делает)

## docker

### `build`

`sudo docker build -t sibir007/adminproject:latest .` - -t или --tag: Этот параметр позволяет присвоить созданному образу тег для упрощения ссылок и управления версиями
`sudo docker build -t sibir007/adminproject:latest -f ProductionDockerfile .` --f или -file: Этот параметр можно использовать для указания другого имени файла Dockerfile или местоположения,
`docker build --build-arg VERSION=10.` - -build-arg позволяет передавать переменные времени сборки в Dockerfile, обеспечивая динамическую настройку в процессе сборки. Эта команда передает переменную времени сборки с именем «VERSION» и значением «10» в Dockerfil
`docker build --no-cache .` - -no-cache: Этот параметр можно использовать, чтобы заставить Docker игнорировать кэшированные слои и выполнить новую сборку.
`docker build --target mytarget .` - --target: Если ваш Dockerfile содержит несколько этапов сборки, определенных с помощью FROM инструкции, опция --target позволяет вам указать конкретный целевой этап для сборки.
`docker build --quiet .` - --quiet или -q: параметр --quiet подавляет вывод сборки, отображая только конечный идентификатор изображения после успешной сборки

### login

`sudo docker logout`
`sudo docker login`

### `image`

`docker images`
`sudo docker image ls`
`sudo docker image push sibir007/adminproject:latest`
`sudo docker image pull sibir007/adminproject:latest`
`docker rmi fd484f19954f`
`docker rmi test2:latest`
`docker rmi -f fd484f19954f` - untags and removes all images that match the specified ID.

### `run` `stop`

`sudo docker run --rm -it -p 8080:8080 -v /home/$USER/.adminproject/db_data:/app/db_data -v /home/$USER/.adminproject:/app sibir007/adminproject`
если используем sqlite положить db в /home/$USER/.adminproject/db_data, в Dockerfile создать VOLUME /app/db_data
положить .env config.py в /home/$USER/.adminproject, в Dockerfile создать VOLUME /app
в Dockerfile EXPOSE 8080 для waitress

`docker stop my_container`
`docker stop $(docker ps -a -q)`
Stop all the containers
`docker run -d nginx:alpine`
Create and run a new container from an image
`docker run --name test -d nginx:alpine`
The --name flag lets you specify a custom identifier for a container

### `rm`

`docker rm /redis`
This removes the container referenced under the link /redis.
`docker rm --link /webapp/redis`
Remove a link specified with --link on the default bridge network (--link)
`docker rm --force redis`
Force-remove a running container (--force)
`docker rm $(docker ps --filter status=exited -q)`
Remove all stopped containers
`docker ps --filter status=exited -q | xargs docker rm`
using the xargs Linux utility
`docker rm --volumes redis`
Remove a container and its volumes (-v, --volumes)

## docker compose

### Key commands

To start all the services defined in your compose.yaml file:

`docker compose up`
The docker-compose up command is a shorthand form of `docker-compose build` and `docker-compose run`

If you started Compose with docker compose up -d, stop your services once you've finished with them

`docker compose stop`

To stop and remove the running services:

`docker compose down`

If you want to monitor the output of your running containers and debug issues, you can view the logs with:

`docker compose logs`

To lists all the services along with their current status:

`docker compose ps`

For a full list of all the Compose CLI commands, see the [reference documentation](https://docs.docker.com/reference/cli/docker/compose/).

### `docker compose up [OPTIONS] [SERVICE...]`

<https://docs.docker.com/reference/cli/docker/compose/up/>

`sudo docker-compose -f docker-compose.ap.dev.yml up --watch --build` Build images before starting containers
`sudo docker compose -f docker-compose.ap.dev.yml up --remove-orphans` Remove containers for services not defined in the Compose file

`--build` Build images before starting containers
`-w`, `--watch` Watch source code and rebuild/refresh containers when files are updated.

### Use Compose Watch

`docker compose up --watch`

### run a dockercompose file

`docker-compose -f /path/to/other/docker-compose-file/docker-compose.yml up`

### Extend your Compose file

## кто занимает порт

`fuser 8080/tcp`
`fuser -k 8080/tcp` - сразу убить его
`lsof -i tcp:1723`

## ssh

`scp /home/test.doc username@servername:/directory`
Как отправить файл по SSH с локального компьютера на сервер

`scp username@servername:/directory/test.doc /home`
Как скачать файлы с удаленного сервера на компьютер

`scp /home/dima/.adminproject/.env root@45.156.23.171:/home/root/.adminproject`

`scp /home/dima/.adminproject/config.py root@45.156.23.171:/home/root/.adminproject`

`scp /home/dima/.adminproject/db_data/* root@45.156.23.171:/home/root/.adminproject/db_data`

## git

`$ git remote`
origin
`$ git remote add pb https://github.com/paulboone/ticgit`
`$ git remote -v`
Добавление удалённых репозиториев

`$ git fetch [remote-name]`
`git pull` - получить изменения из удалённой ветки и слить их со своей текущей
Получение изменений из удалённого репозитория — Fetch и Pull

`git push origin master`
Отправка изменений в удалённый репозиторий (Push)

`git remote show origin`
Просмотр удалённого репозитория

`$ git remote rename pb paul`
`$ git remote remove paul`

Удаление и переименование удалённых репозиториев

## pytest

`pytest -vv --capture=tee-sys    tests/adminproject`

## ссылки на док

<https://flask.palletsprojects.com/en/3.0.x/tutorial/blog/#update>

<https://flask-admin.readthedocs.io>

<https://flask-security-too.readthedocs.io/en/stable/>

<https://pythonhosted.org/Flask-Principal/>

<https://github.com/mapio/Flask-Admin-Inline-Models-And-Related-Fields>

<https://habr.com/ru/articles/761526/>

for test commin


## sh

скрипт будет запускать Django и Worker в фоновом режиме и выводить логи в log_server.log и log_worker.log, чтобы мы могли контролировать логи отладки, например в консоли с помощью команды tail -f log_server.log

/demo/start.sh

`run_cmd="cd django_project && python -u manage.py runserver 0.0.0.0:8000  > ../log_server.log 2>&1"
run_cmd+="& cd django_project && python -u manage.py worker > ../log_worker.log 2>&1"
nohup sh -c "$run_cmd" &`

Не забудем поставить разрешения:

`chmod 700 /demo/start.sh`

`./start.sh`

/demo/stop.sh

`pkill -f "python -u manag[e].py"`

Теперь мы готовы запустить наш проект целиком. Для этого нам нужно обновить наш скрипт /demo/start.sh и добавить в него команды запуска Webpack и Node.js

/demo/start.sh
`run_cmd="cd django_project && python -u manage.py runserver 0.0.0.0:8000 > ../log_server.log 2>&1"
run_cmd+="& cd django_project && python -u manage.py worker > ../log_worker.log 2>&1"
run_cmd+="& cd reactapp && node socket.js > ../log_socket.log 2>&1"
run_cmd+="& cd reactapp && npm run start > ../log_react.log 2>&1"
nohup sh -c "$run_cmd" &`

И сразу stop.sh для их остановки

`pkill -f "node.*react-scripts start"`
`pkill -f "node.*start.js"`
`pkill -f "node socket.js"`
`pkill -f "python -u manag[e].py"`


## Самоподписанный SSL-сертификат для Nginx

### создания самоподписанного сертификата и ключа

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
```

- `openssl`: базовая утилита командной строки для создания и управления сертификатами, ключами, другими файлами OpenSSL.
- `req`: эта подкоманда указывает, что на данном этапе нужно использовать запрос на подпись сертификата X.509 (CSR). X.509 – это стандарт инфраструктуры открытого ключа, которого придерживаются SSL и TLS при управлении ключами и сертификатами. То есть данная команда позволяет создать новый сертификат X.509
- `-x509`: дополнительно модифицирует предыдущую подкоманду, указывая утилите, что мы хотим создать самоподписанный сертификат вместо запроса на подписание сертификата, как это обычно происходит
- `-nodes`: пропускает опцию защиты сертификата парольной фразой. Нужно, чтобы при запуске сервер Nginx имел возможность читать файл без вмешательства пользователя. Установив пароль, вам придется вводить его после каждой перезагрузки.
- `-days 365`: эта опция устанавливает срок действия сертификата (как видите, в данном случае сертификат действителен в течение года).
- `-newkey` rsa:2048: позволяет одновременно создать новый сертификат и ключ. Поскольку ключ, необходимый для подписания сертификата, не был создан ранее, нужно создать его вместе с сертификатом. Данная опция создаст ключ RSA на 2048 бит.
- `–keyout`: сообщает OpenSSL, куда поместить сгенерированный файл ключа.
- `–out`: эта опция сообщает OpenSSL, куда поместить созданный сертификат.

При использовании OpenSSL также следует создать надежную группу Диффи-Хеллмана (DH), которая используется при согласовании Совершенной прямой секретности с клиентами.

Вы можете сделать это, выполнив следующую команду:

```bash
sudo openssl dhparam -out /etc/nginx/dhparam.pem 4096
```

Это займет некоторое время, но по окончанию процесса у вас будет группа DH в /etc/nginx/dhparam.pem, которая будет использоваться при конфигурации.

### 2: Настройка Nginx для поддержки SSL

### создадим сниппет конфигурации с информацией о местоположении файлов ключа и сертификата SSL.

```bash
sudo nano /etc/nginx/snippets/self-signed.conf
```

В этом файле нужно указать файл сертификата в директиве ssl_certificate, а в ssl_certificate_key — связанный с ним ключ. Это будет выглядеть следующим образом:

```s
ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
ssl_certificate_key/etc/ssl/private/nginx-selfsigned.key;
```

### Настройка шифрования

Далее мы создадим еще один сниппет, который определит некоторые настройки SSL. Это позволит защитить Nginx надежным набором шифров SSL и включить дополнительные функции, которые помогут обеспечить безопасность сервера.

Заданные вами параметры могут быть повторно использованы в будущих конфигурациях Nginx, поэтому вы можете дать файлу общее имя:

`sudo nano /etc/nginx/snippets/ssl-params.conf`

Для создания надежной настройки SSL в Nginx мы обратимся к рекомендациями [Cipherlist.eu](https://cipherlist.eu/) — это полезный и понятный ресурс настроек шифрования, широко используемых в программном обеспечении.

Примечание: рекомендуемые настройки от [Cipherlist](https://cipherlist.eu/).eu обеспечивают надежную защиту. Иногда это происходит за счет совместимости клиентов. Если вам нужна поддержка старых клиентов, вы можете перейти на альтернативный список рекомендаций, нажав ссылку “Yes, give me a ciphersuite that works with legacy / old software”. При желании вы можете заменить этот список содержимым следующего образца кода.

Выбор того, какой конфиг использовать, во многом зависит от того, что вам нужно поддерживать. Оба варианта обеспечат высокую безопасность.

Прежде чем копировать предоставленные настройки, мы должны внести несколько небольших изменений.

Во-первых, добавьте предпочтительный DNS-резолвер для исходящих запросов. В этом гайде мы будем использовать адреса Google (8.8.8.8 и 8.8.4.4).

Во-вторых, закомментируйте строку, которая устанавливает строгий заголовок транспортной безопасности. Перед раскомментированием этой строки вам следует ознакомиться с HTTP Strict Transport Security (HSTS), в частности с функцией “preload”: если функция “preload” будет включена неправильно или случайно, это может привести к серьезным негативным последствиям.

Добавьте следующий код в файл ssl-params.conf:

```s title=/etc/nginx/snippets/ssl-params.conf
ssl_protocols TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_dhparam /etc/nginx/dhparam.pem; 
ssl_ciphers EECDH+AESGCM:EDH+AESGCM;
ssl_ecdh_curve secp384r1;
ssl_session_timeout  10m;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
# Disable strict transport security for now. You can uncomment the following
# line if you understand the implications.
#add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
```

Поскольку мы используем самоподписанный сертификат, SSL stapling не будет использоваться. Nginx выдаст предупреждение и отключит проверку сертификата, но затем продолжит работать правильно.

### Настройка Nginx для поддержки SSL



### создадим блок с надежным настройками SSL, которые могут использоваться с любыми сертификатами в будущем.



### настроим server block Nginx с помощью двух созданных сниппетов для правильной обработки SSL-запросов.

