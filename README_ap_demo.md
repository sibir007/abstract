# README

## Запуск проекта в Prod режиме

### Базовые настройки

для запуска контейнера с проектом требуется создать директорию со следующей структурой и содержанием:

```bash
/home/dima/.adminproject/
├── config_logging.py
├── config.py
├── db_data 
│   ├── activity_db.db
│   ├── admin_db.db
│   ├── analytics.db
│   ├── shop.db
│   └── social_gamification_db.db
├── docker-compose.ap.prod.yml
├── .env
└── logs
    └── app.log
```

#### назначение файлов и директорий

`/home/dima/.adminproject/`  наименование директории, "dima" имя текущего пользователя, в каждом случае будет своё

`config_logging.py` файл с конфигурацией логинга, нужно взять из репозитория проекта. По умолчанию настроены два лог хандлера: один пишет в stdout, второй в файл(ы) количество и размер файлов определяется путём задания параметров 'maxBytes' и 'backupCount'. Требуемы уровень логов для каждого хандлера определяются заданием параметра 'level'. Так же уровень логов для всех хандлеров можно задать в настройках 'root' логера этим же параметром.

`config.py` файл конфигураций приложения, взять нужно из репозитория проекта, выбор конкретной конфигурации осуществляется на основании значения ENV переменной 'APP_SETTINGS', которая определена в .env, для продакшен режима значение всегда должно быть 'PRODUCTION'

`db_data` директория с базами данных проекта, все базы должны быть и быть под данными именами

`docker-compose.ap.prod.yml` - docker compose файл, используется для запуска проекта через docker compose

`.env` - файл содержащий переменную 'APP_SETTINGS', в которой содержится наименование конфигурации приложения, значения переменной документированы в самом файле, для продакшен конфигурации значение всегда 'PRODUCTION'.

`logs` директория для лог файлов, сам `app.log` файл создавать не нужно - будет создан автоматически. 

### Процедура запуска

#### Обновляем image

обновить image с dockerhub если локально нет свежей версии

```bash
sudo docker image push sibir007/adminproject:latest
```

либо сбилдить в репозитории

```bash
sudo docker build -f Dockerfile.adminproject -t sibir007/adminproject:latest .
```

#### запуск контейнера через docker run

для запуска в продакшен режиме нужно в `.env` установить `APP_SETTINGS=PRODUCTION`

```bash
sudo docker run --rm -it -p 8080:8080  -v /home/$USER/.adminproject/db_data:/app/db_data  -v /home/$USER/.adminproject/.env:/app/.env -v /home/$USER/.adminproject/config.py:/app/config.py -v /home/$USER/.adminproject/config_logging.py:/app/config_logging.py -v /home/$USER/.adminproject/logs:/app/logs sibir007/adminproject
```

в инструкции рекомендуется использовать `$USER`, в это случае bash автоматически подставит имя пользователя в path и тем самым возникнит 
маппинг с директорией где расположены файлы данных и конфигурации проекта, в данном случае это `/home/dima/.adminproject/`

Возможно с точки зрения продакшен режима для директории проекта лучше использовать расположение типа `/etc/adminproject/`, в этом случае директория не привязывается к имени конкретного пользователя (на одном и том же хосте проектом могут управлять несколько пользователей), соответственно в данном случае волюмы (-v) должны быть прописаны относительно данной директории

#### запуск контейнера через docker compose

для запуска в продакшен режиме нужно в `.env` установить `APP_SETTINGS=PRODUCTION` или в compose файле установить `environment: - APP_SETTINGS=PRODUCTION`, значение установленное compose файле будет иметь приоритет.

```bash
sudo docker compose -f docker-compose.ap.prod.yml up
```

в отличии от варианта с `docker run` где волюмы нужно указывать явно, в данном варианте волюмы указаны в  `docker-compose.ap.prod.yml`, т.к. волюмы указаны относительно текущей директории то запуск в этом случае должен осуществляться из директории где расположены данные и конфигурация проекта, в данном случае `/home/dima/.adminproject/`.

## Запуск в DEV режиме

```bash
sudo docker compose -f docker-compose.ap.dev.yml up
```

```bash
sudo docker run --rm -it -p 8080:8080  -v ./db_data:/app/db_data  -v ./.env:/app/.env -v ./config.py:/app/config.py -v ./config_logging.py:/app/config_logging.py -v ./logs:/app/logs sibir007/adminproject:latest
```

## Запуск в DEMO режиме

```bash
/etc/adminproject/
├── db_data
├── db_data_cach
│   ├── activity_db.db
│   ├── admin_db.db
│   ├── analytics.db
│   ├── shop.db
│   └── social_gamification_db.db
├── scripts
│   ├── chesk_and_reload_data.sh
│   └── up_admp_servese_and_write_time.sh
├── config_logging.py
├── config.py
├── .env
├── docker-compose.ap.prod.demo.yml
└── logs
```

```bash
# Как отправить файл по SSH с локального компьютера на сервер

scp /home/test.doc username@servername:/directory
scp .env config.py config_logging.py docker-compose.ap.prod.demo.yml root@45.156.23.171:/etc/adminproject/
scp db_data_cach/* root@45.156.23.171:/etc/adminproject/db_data_cach/
scp scripts/chesk_and_reload_data.sh scripts/up_admp_servese_and_write_time.sh  root@45.156.23.171:/etc/adminproject/scripts

# послу копирования на ремот сервер chesk_and_reload_data.sh нужно заменить work_dir=/home/dima/python/projects/adminproject на work_dir=/еtc/adminproject

```

```bash
# Как скачать файлы с удаленного сервера на компьютер

scp username@servername:/directory/test.doc /home

```

```bash
sudo docker build -t sibir007/adminproject_demo:latest -f Dockerfile.adminproject .
```

```bash
sudo docker image push sibir007/adminproject_demo:latest
```

```bash
sudo docker image pull sibir007/adminproject_demo:latest
```

```bash
# если необходим мониторинг и перезапуск сервиса в случае модификации
#  файлов баз данных то этим не пользоваться - запускать через скрипт
#  up_admp_servese_and_write_time.sh
sudo docker compose -f docker-compose.ap.prod.demo.yml up
sudo docker compose -f docker-compose.ap.prod.demo.yml up &
docker compose -f docker-compose.ap.prod.demo.yml up --remove-orphans
docker compose -f docker-compose.ap.prod.demo.yml stop adminproject
docker compose -f docker-compose.ap.prod.demo.yml start adminproject
```

```bash
# запуск если необходимо перезапускать сервис при модификации бд
# запуска скрипта запуска

root@dima-Nitro-AN515-52:~#  /etc/adminproject/scripts/up_admp_servese_and_write_time.sh
---------------copy data start--------------
---------------copy data end--------------
---------------up servise start--------------
[+] Running 1/0
 ✔ Container adminproject_demo_container  Created              0.0s 
Attaching to adminproject_demo_container

# скрипт копирует содержимое db_data_cach в db_data и создаёт файл 
# modificaton_data.txt в который записывает дату и время копирования, 
# и запускает сервис adminproject, в дальнейшем modificaton_data.txt
# используется для отслеживания модификации дб и перзапуска сервиса

```

```bash
# настройка мониторинга и перезагрузки сервиса в случае модификации db проекта
# edit crontable
crontab -e
# add records in crontable
*/10 * * * * /etc/adminproject/scripts/chesk_and_reload_data.sh # удалённый сервер
*/2 * * * * /home/dima/python/projects/adminproject/scripts/chesk_and_reload_data.sh # репозиторий
# скрипт chesk_and_reload_data.sh в заданные промежутки времени проверяет соответствие
# даты и времени указанного в db_data/modificaton_data.txt и времени модификации файлов
# баз данных в db_data/* если находит несоответствие (что свидетельствует о том что дб
# была модифицирована) то останавливает контейнер, производит замену баз данных в db_data из db_data_cach и снова запускает контейнер
```


<http://45.156.23.171:8080>
<http://213.232.204.164:8080>

