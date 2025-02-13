# Shadowsocks

## shadowsocks-libev

### Pull the image

`$ docker pull shadowsocks/shadowsocks-libev`

This pulls the latest release of shadowsocks-libev.

You can also choose to pull a previous release or to try the bleeding edge build:

`$ docker pull shadowsocks/shadowsocks-libev:<tag>`
`$ docker pull shadowsocks/shadowsocks-libev:edge`

A list of supported tags can be found at Docker Hub.

### Start a container

```sh
$ docker run -p 8388:8388 -p 8388:8388/udp -d --restart always shadowsocks/shadowsocks-libev:latest
```

This starts a container of the latest release with all the default settings, which is equivalent to

```sh
$ ss-server -s 0.0.0.0 -p 8388 -k "$(hostname)" -m aes-256-gcm -t 300 -d "8.8.8.8,8.8.4.4" -u
```

Note: It's the hostname in the container that is used as the password, not that of the host.

With custom port

In most cases you'll want to change a thing or two, for instance the port which the server listens on. This is done by changing the -p arguments.

Here's an example to start a container that listens on 28388 (both TCP and UDP):

```sh
$ docker run -p 28388:8388 -p 28388:8388/udp -d --restart always shadowsocks/shadowsocks-libev
```

With custom password

Another thing you may want to change is the password. To change that, you can pass your own password as an environment variable when starting the container.

Here's an example to start a container with 9MLSpPmNt as the password:

```sh
$ docker run -e PASSWORD=9MLSpPmNt -p 8388:8388 -p 8388:8388/udp -d --restart always shadowsocks/shadowsocks-libev
```
⚠️ Click here to generate a strong password to protect your server.

With password as a mounted file or a Docker secret (swarm only)
Instead of hardcoding a password to the docker-compose file or docker run command, you can mount in a file that contains the password. To do so, pass the path that you mounted to the container as the PASSWORD_FILE environment variable.

If you are running Docker Swarm, you can also utilize Docker secrets. To do so, pass the name of the secret as the PASSWORD_SECRET environment variable. If you specify both PASSWORD_FILE and PASSWORD_SECRET, the latter will take effect.

This is a sample docker-compose.yml file that uses the external Docker secret named shadowsocks as the password.

```yml
shadowsocks:
  image: shadowsocks/shadowsocks-libev
  ports:
    - "8388:8388"
  environment:
    - METHOD=aes-256-gcm
    - PASSWORD_SECRET=shadowsocks
  secrets:
    - shadowsocks
```

This is a sample docker service create command that uses the external Docker secret named shadowsocks as the password.

```sh
docker service create -e PASSWORD_SECRET=shadowsocks -p 8388:8388 -p 8388:8388/udp --secret shadowsocks shadowsocks/shadowsocks-libev
```

With other customizations

Besides PASSWORD, the image also defines the following environment variables that you can customize:

SERVER_ADDR: the IP/domain to bind to, defaults to 0.0.0.0
SERVER_ADDR_IPV6: the IPv6 address to bind to, defaults to ::0
METHOD: encryption method to use, defaults to aes-256-gcm
TIMEOUT: defaults to 300
DNS_ADDRS: DNS servers to redirect NS lookup requests to, defaults to 8.8.8.8,8.8.4.4
TZ: Timezone, defaults to UTC

Additional arguments supported by ss-server can be passed with the environment variable ARGS, for instance to start in verbose mode:

```sh
$ docker run -e ARGS=-v -p 8388:8388 -p 8388:8388/udp -d --restart always shadowsocks/shadowsocks-libev:latest
```

### Use docker-compose to manage (optional)

It is very handy to use docker-compose to manage docker containers. You can download the binary at https://github.com/docker/compose/releases.

This is a sample docker-compose.yml file.

```yml
shadowsocks:
  image: shadowsocks/shadowsocks-libev
  ports:
    - "8388:8388"
  environment:
    - METHOD=aes-256-gcm
    - PASSWORD=9MLSpPmNt
  restart: always
```

It is highly recommended that you setup a directory tree to make things easy to manage.

```sh
$ mkdir -p ~/fig/shadowsocks/
$ cd ~/fig/shadowsocks/
$ curl -sSLO https://github.com/shadowsocks/shadowsocks-libev/raw/master/docker/alpine/docker-compose.yml
$ docker-compose up -d
$ docker-compose ps
```

### Finish

At last, download shadowsocks client here. Don't forget to share internet with your friends.

```json
{
    "server": "your-vps-ip",
    "server_port": 8388,
    "local_address": "0.0.0.0",
    "local_port": 1080,
    "password": "9MLSpPmNt",
    "timeout": 600,
    "method": "aes-256-gcm"
}
```

## shadowsocks-rust

### Run the container

#### Use IPv6 for the default bridge network

Docker containers do not have access to IPv6 by default: Make sure to disable IPv6 Route in the client or [enable IPv6 access to docker containers](https://docs.docker.com/config/daemon/ipv6/#use-ipv6-for-the-default-bridge-network).

The following steps show you how to use IPv6 on the default bridge network.

1. Edit the Docker daemon configuration file, located at /etc/docker/daemon.json. Configure the following parameters:

```json
{
  "ipv6": true,
  "fixed-cidr-v6": "2001:db8:1::/64"
}
```

- ipv6 enables IPv6 networking on the default network.
- fixed-cidr-v6 assigns a subnet to the default bridge network, enabling dynamic IPv6 address allocation.
- ip6tables enables additional IPv6 packet filter rules, providing network isolation and port mapping. It is enabled by-default, but can be disabled.

2. Save the configuration file.

3. Restart the Docker daemon for your changes to take effect.

 `sudo systemctl restart docker`

### Docker

```sh
# client

docker run --name sslocal-rust \
  --restart always \
  -p 1080:1080/tcp \
  -v /path/to/config.json:/etc/shadowsocks-rust/config.json \
  -dit ghcr.io/shadowsocks/sslocal-rust:latest
```

```sh
# server

docker run --name ssserver-rust \
  --restart always \
  -p 8388:8388/tcp \
  -p 8388:8388/udp \
  -v /path/to/config.json:/etc/shadowsocks-rust/config.json \
  -dit ghcr.io/shadowsocks/ssserver-rust:latest
```

Generate a safe and secured password for a specific encryption method (aes-128-gcm in the example) with:

`ssservice genkey -m "aes-128-gcm"`

`sudo apt install pwgen`

```sh
pwgen # список паролей
pwgen -1 # один пароль
pwgen -1 -s # полностью случайного пароля
pwgen -1 -s -y # использовать в нем один специальный символ, например восклицательный знак, кавычка, точка, плюс, минус, равно и т д
pwgen -n 10 # генерация паролей linux длиной в десять символов

```

ShadowSocks' configuration file. Example

```json
{
    "server": "my_server_ip",
    "server_port": 8388,
    "password": "rwQc8qPXVsRpGx3uW+Y3Lj4Y42yF9Bs0xg1pmx8/+bo=",
    "method": "aes-256-gcm",
    // ONLY FOR `sslocal`
    // Delete these lines if you are running `ssserver` or `ssmanager`
    "local_address": "127.0.0.1",
    "local_port": 1080
}
```

## <https://howto.yggno.de/shadowsocks>

Shadowsocks — это быстрый туннельный прокси с шифрованием передаваемых данных, а так же обладающий встроенными механизмами защиты от средств анализа сетевых пакетов (DPI), и с помощью плагинов способный маскировать трафик под конкретные протоколы (например, HTTPS или SIP). C помощью shadowsocks возможно как проксирование TCP, так и туннелирование UDP.

Здесь будет описана простая настройка актуальной версии shadowsocks, написанной на rust (на момент публикации статьи версия 1.16.1).

Настроенный shadowsocks можно использовать для проксирования через него других протоколов, включая OpenVPN, Wireguard, Yggdrasil и других.

### Сборка / Установка

Установить shadowsocks можно несколькими различными способами, включая загрузку docker-образа, snap-пакета, установку с помощью cargo (меенджер пакетов rust), используя kubectl для Kubernetes, просто загрузку бинарных файлов или сборку их из исходников.

Все эти способы описаны в файле [README.md](https://github.com/shadowsocks/shadowsocks-rust/blob/master/README.md).

Готовые бинарные файлы под различные архитектуры можно скачать со страницы: <https://github.com/shadowsocks/shadowsocks-rust/releases>

### Сборка из исходников

Предполагается наличие установленных git и rust.

```sh
git clone https://github.com/shadowsocks/shadowsocks-rust
cd shadowsocks-rust
cargo build --release
```

После выполнения этих команд и завершения сборки проекта, в каталоге `./target/release/` можно будет найти бинарные файлы: `sslocal`, `ssserver`, `ssmanager`, `ssservice` и `ssurl`.

Примечание: если вы планируете использовать бинарные файлы на машине, архитектура/ОС которой отличаются от ваших текущих, вам необходимо использовать кросс-компиляцию. Подробнее об этом можно прочесть здесь: https://rust-lang.github.io/rustup/cross-compilation.html

### Install using snap

```sh
# Install from snapstore
snap install shadowsocks-rust

# List services
snap services shadowsocks-rust

# Enable and start shadowsocks-rust.sslocal-daemon snap service
snap start --enable shadowsocks-rust.sslocal-daemon

# Show generated systemd service status
systemctl status snap.shadowsocks-rust.sslocal-daemon.service

# Override generated systemd service (configure startup options)
systemctl edit snap.shadowsocks-rust.sslocal-daemon.service

## NOTE: you can pass args to sslocal:
##  [Service]
##  ExecStart=
##  ExecStart=/usr/bin/snap run shadowsocks-rust.sslocal-daemon -b "127.0.0.1:1080" --server-url "ss://...."

# Restart generated systemd service to apply changes
systemctl restart snap.shadowsocks-rust.sslocal-daemon.service

# ... and show service status
systemctl status snap.shadowsocks-rust.sslocal-daemon.service
```

### install from crates.io

Install from crates.io:

```sh
# Install from crates.io
cargo install shadowsocks-rust
```

then you can find sslocal and ssserver in $CARGO_HOME/bin.

#### Описание бинарных файлов

- `sslocal` - клиент shadowsocks
- `ssserver` - сервер shadowsocks
- `ssmanager` - утилита управления конфигурацией shadowsocks
- `ssservice` - утилита управления сервисами shadowsocks, генератор ключа шифрования
- `ssurl` - утилита, предназначенная для кодирования и декодирования адресов для использования с shadowsocks (пример: ss://YWVzLTI1Ni1jZmI6cGFzc3dvcmQ@127.0.0.1:8388/?plugin=obfs-local%3Bobfs%3Dhttp%3Bobfs-host%3Dwww.baidu.com)

### Настройка

Генерируем ключ, спомощью которого будут шифроваться передаваемые данные:

`ssservice genkey -m "aes-128-gcm"`

Рекомендуемые значения алгоритмов шифрования перечислены на этой странице: <https://shadowsocks.org/doc/aead.html>

В результате получим примерно такую строку:

`1/AiFEsK70+gObAwU8qQTA==`

Этот ключ будет использован в конфигурационных файлах и клиента, и сервера.

Далее создаем файлы `config_l.json` и `config_s.json` для клиента и сервера соответственно.

Эти файлы будут одинаковыми за исключением того, что в файле для клиента будут два параметра, которых нет в файле для сервера.

```json
config_s.json
{
    "server": "my_server_ip",
    "server_port": 8388,
    "password": "1/AiFEsK70+gObAwU8qQTA==",
    "method": "aes-128-gcm"
 }
 ```

- `server` - адрес, на котором будет ожидать подключений ваш сервер
- `server_port` - порт сервера
- `password` - ключ шифрования (сгенерирован выше)
- `method` - метод шифрования

Обратите внимание: метод шифрования, который указывается здесь и в конфигурационном файле для клиента, должен соответствовать тому, что указывался при создании ключа шифрования (см. выше).

```json
config_l.json
{
    "server": "my_server_ip",
    "server_port": 8388,
    "password": "1/AiFEsK70+gObAwU8qQTA==",
    "method": "aes-128-gcm",
    "local_address": "127.0.0.1",
    "local_port": 1080
}
```

Большинство параметров здесь точно такие же, как для серверной конфигурации.

- `local_address` - адрес, на котором будет ожидать подключений клиент shadowsocks (адрес локального socks-прокси)
- `local_port` - локальный порт

### Использование

Если вы устанавливаете и настраиваете всё вручную, необходимо скопировать бинарные файлы в каталог `/usr/bin/`, а конфигурационный файл в каталог `/etc/shadowsocks-rust/` на клиенте и на сервере.

Для настройки автозапуска можно использовать шаблоны скриптов и (или) systemd-юнитов из каталога: <https://github.com/shadowsocks/shadowsocks-rust/tree/master/debian>

Например, это могут быть такие файлы:

```conf
; shadowsocks-rust-server.service

[Unit]
Description=Shadowsocks-rust Custom Server Service
Documentation=https://github.com/shadowsocks/shadowsocks-rust
After=network.target
 
[Service]
Type=simple
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
ExecStart=/usr/bin/ssservice server --log-without-time -c /etc/shadowsocks-rust/config_s.json
User=root
 
[Install]
WantedBy=multi-user.target
```

```conf
; shadowsocks-rust-local.service

[Unit]
Description=Shadowsocks-rust Custom Client Service
Documentation=https://github.com/shadowsocks/shadowsocks-rust
After=network.target
 
[Service]
Type=simple
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
ExecStart=/usr/bin/ssservice local --log-without-time -c /etc/shadowsocks-rust/config_l.json
 
[Install]
WantedBy=multi-user.target
```

Юниты копируем в `/lib/systemd/system/`.

Запускаем так (на клиенте):

`sudo systemctl enable --now shadowsocks-rust-local`

На сервере:

`sudo systemctl enable --now shadowsocks-rust-server`

#### Автозапуск под Windows

Управление работой shadowsocks под Windows, как вариант, можно осуществлять с помощью планировщика Windows из командной строки.

Создание задания:

`schtasks /create /tn "Shadowsocks" /tr "c:\ssservice.exe local -c c:\config_l.json" /sc onstart`

Задание будет выполняться при загрузке системы. С помощью ключей /U /P (или /RU /RP) можно указать под каким пользователем будет выполняться задание.

Остановка задания:

`schtasks /Run /I /TN "Shadowsocks"`

Запуск задания вручную:

`schtasks /End /TN "Shadowsocks"`

Подробнее: <https://ab57.ru/cmdlist/schtasks.html>

Важно: если в системах работает firewall, не забудьте разрешить соответствующие входящие/исходящие соединения! Пример для сервера: `iptables -A INPUT -p tcp -i eth0 --dport 8388 -j ACCEPT`

### После запуска

После запуска сервисов на сервере и локальной машине можно переходить к непосредственному использованию shadowsocks в целях, для которых это ПО предназначено :)

### Браузер

Для серфинга Интернета в браузере с использования shadowsocks, заходим в настройки браузера и указываем в них наш свеженастроенный локальный прокси-сервер: SOCKS5 127.0.0.1:1080.

Браузер будет устанавливать соединение с удаленным web-сервером через локальный прокси-сервер, который, в свою очередь, будет пускать трафик через удаленный сервер, шифруя (и при необходимости маскируя) его.

### Yggdrasil

Для подключения к пирам Yggdrasil через shadowsocks в секцию Peers конфигурационного файла добавляются строки такого вида:

`socks://127.0.0.1:1080/public_node_ip:port`

Здесь public_node_ip - IP-адрес публичного пира, port - порт публичного пира, 127.0.0.1:1080 - адрес и порт на которых ожидает подключения клиент shadowsocks.

### Wireguard

Пример подключения Wireguard (работает по UDP) через shadowsocks…

Приводим конфигурационный файл сервера shadowsocks к такому виду:

```json
{
    "server": "my_server_ip",
    "server_port": 8388,
    "password": "1/AiFEsK70+gObAwU8qQTA==",
    "method": "aes-128-gcm",
    "mode": "tcp_and_udp"
}
```

Приводим конфигурационный файл клиента shadowsocks к такому виду:

```json
{
    "server":"my_server_ip",
    "server_port":8388,
    "password":"1/AiFEsK70+gObAwU8qQTA==",
    "method":"aes-128-gcm",
    "mode":"tcp_and_udp",
    "locals": [
        {
            "mode":"udp_only",
            "protocol":"tunnel",
            "forward_address":"my_server_ip",
            "forward_port":51821,
            "local_address":"127.0.0.1",
            "local_port":51821
        },
        {
            "mode":"tcp_only",
            "protocol":"socks",
            "local_address": "127.0.0.1",
            "local_port": 1080
        }
    ]
}
```

Новые параметры здесь:

- `mode` - какие протоколы будут обрабатываться shadowsocks
- `locals` - в этом массиве можно перечислить несколько конфигураций клиента
- `protocol` - протокол работы shadowsocks
- `local_address` - адрес, на который будет перенаправлено соединение в туннельном режиме (адрес сервера wireguard)
- `forward_port` - port, на который будет перенаправлено соединение в туннельном режиме (порт сервера wireguard)

Далее, в настройках wireguard на клиенте (/etc/wireguard/wg0.conf) нужно поменять адрес пира (Endpoint) на 127.0.0.1:51821. Так же, в секцию [Interface] можно добавить параметр MTU = 1384.

Перезапускаем службы shadowsocks и поднимаем туннель wg:

`sudo wg-quick up wg0`

Вроде бы, всё поднялось, но сайты не открываются, пинги не идут.

Дело в том, что после поднятия туннеля весь трафик у нас заворачивается в туннель wireguard, включая трафик, который идет к серверу shadowsocks. Образуется петля.

Решается эта проблема довольно просто:

`sudo ip route add my_server_ip via my_router_ip`

Здесь `my_server_ip` - это адрес нашего удаленного сервера; `my_router_ip` - это адрес домашнего роутера.

Таким образом трафик до нашего удаленного сервера мы пускаем в обход туннеля WG, напрямую.

Эту команду можно прописать в конфигурационный файл wg0.conf, в секцию `[Interface]`, чтобы не вбивать кадый раз вручную:

```conf
PostUp = ip route add my_server_ip via my_router_ip
PostDown = ip route del my_server_ip
```

Перезапускаем и теперь всё работает отлично!

### Мобильные устройства

#### Android

##### v2rayNG

На устройствах с ОС Android можно использовать приложение v2rayNG.

Open-source, репозиторий: <https://github.com/2dust/v2rayNG>

[Пример настроек v2rayNG на планшете](https://howto.yggno.de/_media/shadowsocks:andr_v2rayng_ss.png?w=600&tok=b20a09)

#### iOS

##### Potatso

Одно из приложений, которое позволяет пустить трафик смартфона через сервер shadowsocks - [Potatso](https://apps.apple.com/ru/app/potatso/id1239860606).

Приложение бесплатно, имеет удобный интерфейс и понятные настройки. Поддерживается плагин Simple Obfs ([простая обфускация](https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%84%D1%83%D1%81%D0%BA%D0%B0%D1%86%D0%B8%D1%8F_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B5_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B5))).

Добавляет в систему профиль VPN.

Подключение можно активировать как из самого приложения, так и из системных настроек в разделе VPN.

Пример настроек Potatso на iPhone
Дополнительно
Заинтересовавшимся темой рекомендую ознакомиться с некоторыми статьями за авторством MiraclePtr с портала habr.com, сохраненными в этом архиве: miracleptr_articles.zip.

Так же можно ознакомиться с видеоинструкциями на эту тему.
Ссылки
Сайт shadowsocks (EN): https://shadowsocks.org/
Подробная документация shadowsocks (EN): https://github.com/shadowsocks/shadowsocks/wiki
GitHub-репозиторий проекта shadowsocks-rust (EN): https://github.com/shadowsocks/shadowsocks-rust
О настройке shadowsocks c плагином V2Ray (RU): https://krasovs.ky/2022/03/19/shadowsocks-and-v2ray-and-cloudflare.html

