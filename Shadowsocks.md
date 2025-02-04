# Shadowsocks

## shadowsocks-rust

### Run the container

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
[Unit]
Description=Shadowsocks-rust Custom Server Service
Documentation=https://github.com/shadowsocks/shadowsocks-rust
After=network.target
 
[Service]
Type=simple
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
ExecStart=/usr/bin/ssservice server --log-without-time -c /etc/shadowsocks-rust/config_s.json
 
[Install]
WantedBy=multi-user.target
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

