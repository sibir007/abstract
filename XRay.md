# XRay

<https://xtls.github.io/en/document/>

<https://github.com/XTLS>



## Bleeding-edge обход блокировок с полной маскировкой: настраиваем сервер и клиент XRay с XTLS-Reality быстро и просто

<https://habr.com/ru/articles/731608/>


## Маршрутизация

(RUSSIAN GUIDE)
v2rayNG (Андроид) — Пресет для России
Шаги по настройке:

1. Загрузите приложение: Скачайте последнюю версию v2rayNG из раздела Releases на GitHub (на момент написания — версия пре-релиз 1.9.9): https://github.com/2dust/v2rayNG
2. Скачайте файлы geoip.dat и geosite.dat: https://github.com/runetfreedom/russia-v2ray-rules-dat/releases
Эти файлы необходимы для маршрутизации. Загружайте их из этого репозитория, регулярно проверяя обновления:
GeoIP и Geosite файлы на GitHub
3. Запустите приложение и перейдите в раздел "Маршрутизация":
   1. Откройте v2rayNG, нажмите на иконку меню в верхнем левом углу, и выберите "Маршрутизация".
   2. Добавьте загруженные файлы георесурсов:
      1. Нажмите на значок с тремя точками в верхнем правом углу, затем выберите "Файлы георесурсов".
      2. Нажмите на кнопку "+" и выберите "Добавить файлы".
      3. Загрузите ранее скачанные файлы geoip и geosite. Добавляйте их поочередно, порядок не важен.
      4. Вернитесь в раздел "Маршрутизация":
   3. После добавления файлов откройте этот раздел для настройки конфигурации.
      1. Скопируйте и вставьте конфигурацию: Скопируйте предложенный ниже конфиг:
        [{"domain":["geosite:category-ads-all"],"enabled":false,"looked":false,"outboundTag":"block","remarks":"RU-1 [Блокировка рекламы]"},{"enabled":false,"ip":["geoip:private"],"looked":false,"outboundTag":"direct","remarks":"RU-1 [Приватные сети напрямую]"},{"domain":["geosite:private"],"enabled":false,"looked":false,"outboundTag":"direct","remarks":"RU-1 [Приватные домены напрямую]"},{"enabled":false,"looked":false,"outboundTag":"proxy","port":"0-65535","remarks":"RU-1 [Остальное в прокси]"},{"enabled":false,"looked":false,"outboundTag":"direct","protocol":["bittorrent"],"remarks":"RU-2 [Торрент напрямую]"},{"domain":["geosite:category-ads-all"],"enabled":false,"looked":false,"outboundTag":"block","remarks":"RU-2 [Блокировка рекламы]"},{"enabled":false,"ip":["geoip:private"],"looked":false,"outboundTag":"direct","remarks":"RU-2 [Приватные сети напрямую]"},{"domain":["geosite:private"],"enabled":false,"looked":false,"outboundTag":"direct","remarks":"RU-2 [Приватные домены напрямую]"},{"enabled":false,"ip":["geoip:ru"],"looked":false,"outboundTag":"direct","remarks":"RU-2 [Доступные только в России напрямую]"},{"enabled":false,"looked":false,"outboundTag":"proxy","port":"0-65535","remarks":"RU-2 [Остальное в прокси]"},{"enabled":false,"looked":false,"outboundTag":"direct","protocol":["bittorrent"],"remarks":"RU-3 [Торрент напрямую]"},{"domain":["geosite:category-ads-all"],"enabled":false,"looked":false,"outboundTag":"block","remarks":"RU-3 [Блокировка рекламы]"},{"enabled":false,"ip":["geoip:private"],"looked":false,"outboundTag":"direct","remarks":"RU-3 [Приватные сети напрямую]"},{"domain":["geosite:private"],"enabled":false,"looked":false,"outboundTag":"direct","remarks":"RU-3 [Приватные домены напрямую]"},{"enabled":false,"ip":["1.0.0.1","1.1.1.1","8.8.8.8","8.8.4.4"],"looked":false,"outboundTag":"proxy","remarks":"RU-3 [DNS в прокси]"},{"enabled":false,"looked":false,"network":"udp","outboundTag":"proxy","port":"50000-65535","remarks":"RU-3 [Дискорд (Голосовой) в прокси]"},{"enabled":false,"ip":["geoip:ru-blocked"],"looked":false,"outboundTag":"proxy","remarks":"RU-3 [Заблокированные сети в прокси]"},{"domain":["geosite:ru-blocked"],"enabled":false,"looked":false,"outboundTag":"proxy","remarks":"RU-3 [Заблокированные домены в прокси]"},{"enabled":false,"looked":false,"outboundTag":"direct","port":"0-65535","remarks":"RU-3 [Остальное напрямую]"}]
      2. Импортируйте конфигурацию:
         1. Нажмите на значок с тремя точками в верхнем правом углу и выберите "Импорт правил из буфера обмена".
         2. Подтвердите удаление существующих правил.
      3. Измените доменную стратегию: Измените "Доменная стратегия" с "AsIs" на "IPOnDemand".
      4. Выбор режима работы: Выберите один из трех режимов работы (Важно: выбирайте только один из пресетов — RU-1, RU-2 или RU-3. Не включайте их одновременно или в комбинации друг с другом; активен должен быть только один пресет на выбор.):
         1. RU-1: Проксировать весь трафик.
         2. RU-2: Проксировать все, кроме трафика из РФ.
         3. RU-3: Проксировать только заблокированные ресурсы.


## Диагностика

### ping

The ping command in Linux is a primary network diagnostic tool used to check the reachability of a host and measure packet transit times

`ping -c 2 127.0.0.1`

| Command Syntax           | Description                                                     |
| ------------------------ | --------------------------------------------------------------- |
| ping -c [count] [host]   | Stops after sending the specified number of packets.            |
| ping -i [seconds] [host] | Changes the interval between packets (e.g., ping -i 5 host).    |
| ping -s [bytes] [host]   | Changes the default network packet size from 56 bytes.          |
| ping -w [seconds] [host] | Sets a strict timeout deadline to exit the application.         |
| ping -q [host]           | Quiet mode; hides individual lines and prints only the summary. |

### Netcat (nc)

Netcat attempts to establish a raw TCP connection or send a UDP packet to a specific port. It immediately closes the connection if successful.

- TCP Port Ping: `nc -zv google.com 443`
- UDP Port Ping: `nc -zvu google.com 53`
- How it works: It initiates a standard TCP three-way handshake (SYN) to see if the port responds with a SYN-AC

### mtr (My Traceroute) 

Мощный консольный инструмент для диагностики сети, который объединяет возможности команд ping и traceroute

Как работает mtr
1. Посылает пакеты с разным TTL: Как и traceroute, утилита увеличивает поле Time-To-Live (TTL) каждого пакета, заставляя каждый маршрутизатор на пути возвращать ответ об ошибке.
2. Постоянно мониторит сеть: Инструмент непрерывно шлет новые пакеты, собирая данные о проценте потерь и задержке.
3. Выявляет локацию проблемы: Если на 5-м шаге резко возрастают потери пакетов, значит, проблема именно на этом конкретном сервере или провайдере.

Основные команды
Перед использованием утилиту обычно нужно установить (sudo apt install mtr или sudo yum install mtr).
-  `mtr google.com` Запуск в интерактивном режиме: Динамическое окно, обновляющееся каждую секунду. Прерывается нажатием q.
-  `mtr -r google.com`. Режим отчета (Report mode): Отправляет 10 пакетов на каждый узел, выводит финальную статическую таблицу и завершает работу. Идеально для отправки логов техподдержке.
-  `mtr -g google.com`. Показывать IP-адреса вместо имен: Отключает DNS-резолв для ускорения работы.
-  

## Linux users and groups

```bash
# выводит полные данные обо всех аккаунтах.
vpsadmin@hel:~$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
vpsadmin:x:1000:1000:,,,:/home/vpsadmin:/bin/bash

# Проверка прав администратора (sudo), 
# Все пользователи, перечисленные в самом конце через запятую, имеют права администратора.
sibir007@sibir007:~$ getent group sudo
sudo:x:27:sibir007

# от чьего имени прямо сейчас работает процесс в вашей системе
vpsadmin@hel:~$ ps aux | grep xray
nobody    255626  0.3  3.1 1324344 63616 ?       Ssl  Jul29   5:11 /opt/xray/xray run -config /opt/xray/config.json
vpsadmin  268991  0.0  0.1   7076  2048 pts/0    S+   06:54   0:00 grep --color=auto xray

#Выдать права на чтение файла:
sudo chmod 644 /путь/к/файлу.crt

# Открыть доступ к родительским папкам
sudo chmod +x /etc/letsencrypt/
sudo chmod +x /etc/letsencrypt/live/

```



| Число   | Права текстом | Что это значит?                                                                          |
| :------ | :------------ | :--------------------------------------------------------------------------------------- |
| **755** | `rwxr-xr-x`   | Стандарт для папок и скриптов (Владелец делает всё, остальные только смотрят и заходят). |
| **644** | `rw-r--r--`   | Стандарт для файлов текста/конфигов (Владелец правит, остальные читают).                 |
| **600** | `rw-------`   | Секретный файл (Владелец читает и пишет, остальные не имеют доступа).                    |
| **400** | `r--------`   | Максимально защищенный приватный ключ или пароль.                                        |


## [Chapter 2] Prerequisite and preparations

### 2.1 Acquiring a VPS

https://hostvds.com/
login sibiriakoff2006@yandex.ru
pass hosSofia1302

server:
HostName 213.232.204.117
Port 10274

User vpsadmin
Passowrd helSofia1302



### 2.2 Obtaining a Desired Domain Name

https://freedomain.one/

login: sibir
password: freSofia1302

Host / A Record: `sibiryakov.linkpc.net`
IP Address (IPv4 / IPv6): 213.232.204.117

### 2.3 Software you need to install on your local computer

## [Chapter 3] Remote Login

### 3.3 Updating software on Linux for the first time!

```sh
apt update
apt upgrade
```

## [Chapter 4] Security and Protection

### 4.4 Change the SSH Remote Login Port to a Non-22 Port

```sh
nano /etc/ssh/sshd_config
```

- Use `ctrl+w` to enter search mode, then type `Port 22` and press `Enter`
- Delete `22` and replace it with `9753`
- Save  `ctrl+o + enter`
- Exit `ctrl+x`

Add a firewall rule to set the new SSH port (Ubuntu):

```sh
sudo ufw allow 9753/tcp
```

Restart the SSH service:

```sh
systemctl restart ssh
```

### 4.5 Creating a New User Without Root Access

- add a new user and set a login password

```sh
adduser vpsadmin
```
- install the `sudo` function

```sh
apt update && apt install sudo
```

- `vpsadmin` user to the `sudo` list

```sh
visudo
```

add the following line under `User Privilege Specification: vpsadmin ALL=(ALL) NOPASSWD: ALL`

### 4.6 Disabling SSH Remote Login for Root User

- open the `SSH remote login program settings`

```sh
nano /etc/ssh/sshd_config
```
- Find the line `PermitRootLogin Yes`, and change the value after it to `no`
- Save the file and exit
- Restart the ssh service

```sh
systemctl restart ssh
```

### 4.7 Login with RSA Key and Disable Password Login

## Chapter 5: Website Building

### 5.2 Log in to VPS, install and run Nginx

`sudo apt update && sudo apt install nginx`

After completion, Nginx will automatically run. Open the browser on Windows and enter <http://213.232.204.117:80>

### 5.3 Create the simplest web page

- Create a dedicated folder `/home/vpsadmin/www/webpage/` for the website and create the web page file `index.html`
```sh
mkdir -p ~/www/webpage/ && nano ~/www/webpage/index.html
```
- Copy the entire content below, save `(ctrl+o)` and exit `(ctrl+x)`.

```html
<html lang="">
  <!-- Text between angle brackets is an HTML tag and is not displayed.
        Most tags, such as the HTML and /HTML tags that surround the contents of
        a page, come in pairs; some tags, like HR, for a horizontal rule, stand
        alone. Comments, such as the text you're reading, are not displayed when
        the Web page is shown. The information between the HEAD and /HEAD tags is
        not displayed. The information between the BODY and /BODY tags is displayed.-->
  <head>
    <title>Enter a title, displayed at the top of the window.</title>
  </head>
  <!-- The information between the BODY and /BODY tags is displayed.-->
  <body>
    <h1>Enter the main heading, usually the same as the title.</h1>
    <p>Be <b>bold</b> in stating your key points. Put them in a list:</p>
    <ul>
      <li>The first item in your list</li>
      <li>The second item; <i>italicize</i> key words</li>
    </ul>
    <p>Improve your image by including an image.</p>
    <p>
      <img src="https://i.imgur.com/SEBww.jpg" alt="A Great HTML Resource" />
    </p>
    <p>
      Add a link to your favorite
      <a href="https://www.dummies.com/">Web site</a>. Break up your page
      with a horizontal rule or two.
    </p>
    <hr />
    <p>
      Finally, link to <a href="page2.html">another page</a> in your own Web
      site.
    </p>
    <!-- And add a copyright notice.-->
    <p>© Wiley Publishing, 2011</p>
  </body>
</html>
```

- Configuring nginx
    - Modify nginx.conf
    ```sh
    sudo nano /etc/nginx/nginx.conf
    ```
    - Add the following content inside `http{}`, then save (`ctrl+o`) and exit (`ctrl+x`). (Remember to replace the domain name with the real domain name you prepared earlier, including the subdomain)
    ```text
            server {
                listen 80;
                server_name sibiryakov.linkpc.net;
                root /home/vpsadmin/www/webpage;
                index index.html;

        }
    
    ```
    - assign permission to nginx
        -     1. Дайте Nginx доступ к родительским папкам
        ```sh
        sudo chmod +x /home/vpsadmin
        sudo chmod +x /home/vpsadmin/www
        sudo chmod +x /home/vpsadmin/www/webpage
        ```
        - 2. Установите правильного владельца и права на файлы сайта
        ```sh
        # Даем права 755 на папки (чтобы Nginx мог в них заходить)
        sudo find /home/vpsadmin/www/webpage -type d -exec chmod 755 {} \;

        # Даем права 644 на файлы (чтобы Nginx мог их читать)
        sudo find /home/vpsadmin/www/webpage -type f -exec chmod 644 {} \;
        ```
        3. Добавьте Nginx в группу вашего пользователя (Рекомендуется)
        ```s
        sudo usermod -aG vpsadmin www-data
        ```
    - Make nginx reload the configuration to take effect.
           
    ```sh
    sudo nginx -t
    sudo systemctl reload nginx
    ```
    - Альтернативный (более безопасный) вариант
    Если вы не хотите открывать доступ к домашней директории пользователя `/home/vpsadmin` из соображений безопасности, перенесите сайт в стандартное для Ubuntu место:
        1. Перенесите файлы: `sudo cp -r /home/vpsadmin/www/webpage /var/www/`
        2. Смените владельца: `sudo chown -R www-data:www-data /var/www/webpage`
        3. Измените директиву root в конфигурационном файле Nginx на `/var/www/webpage` и перезапустите его.
    
## [Chapter 6] Certificate Management

### 6.2 Install acme.sh

- Run the installation script.
```sh
wget -O - https://get.acme.sh | sh
```
- Make the acme.sh command effective.
```sh
. .bashrc
```
- Enable acme.sh automatic upgrade.
```sh
acme.sh --upgrade --auto-upgrade
```

### 6.3 Testing Certificate Application

```sh
# 1. Верните владельца папки вашему пользователю
sudo chown -R vpsadmin:vpsadmin /home/vpsadmin/www/webpage

# 2. Создайте структуру папок проверки вручную
mkdir -p /home/vpsadmin/www/webpage/.well-known/acme-challenge

# 3. Настройте права для совместной работы Nginx и acme.sh
# Даем права на чтение и выполнение для всех в папке сайта
sudo find /home/vpsadmin/www/webpage -type d -exec chmod 755 {} \;
sudo find /home/vpsadmin/www/webpage -type f -exec chmod 644 {} \;

# 4/ The command to apply for a test certificate is as follows

acme.sh --issue --server letsencrypt_test -d sibiryakov.linkpc.net -w /home/vpsadmin/www/webpage --keylength ec-256

# If this step goes wrong, you can run the following command to check the detailed application process and specific errors. 
acme.sh --issue --server letsencrypt_test -d sibiryakov.linkpc.net -w /home/vpsadmin/www/webpage --keylength ec-256 --debug
```
### 6.4 Application for Official Certification

```sh
# The command for applying for an official certificate is as follows (i.e., replace letsencrypt_test with letsencrypt and add the --force parameter at the end):

acme.sh --set-default-ca --server letsencrypt

# This is a command in the shell language. It sets the default Certificate Authority (CA) to Let's Encrypt by using the acme.sh script.

acme.sh --issue -d sibiryakov.linkpc.net -w /home/vpsadmin/www/webpage --keylength ec-256 --force

# The meaning of the --force parameter is to manually (forcefully) update the certificate before the existing certificate expires
```

### 6.5 Certificate Installation

After completing the certificate application, it needs to be installed to a specified location and referenced in the configuration file to take effect

```sh
acme.sh --installcert -d sibiryakov.linkpc.net --cert-file /opt/xray/cert/sibiryakov.linkpc.net.cer --key-file /opt/xray/cert/sibiryakov.linkpc.net.key --fullchain-file /opt/xray/cert/fullchain.cer
```

## [Chapter 7]Xray Server

### 7.2 Install Xray


* **Суть Xray:** Один бинарный файл (`xray-core`, MPL 2.0) служит и сервером, и клиентом. Разница — только в **конфигурации**.
* **Особенность:** Установка через скрипт в режиме **non-root** (без прав суперпользователя).


```bash
# 1. Скачать скрипт
wget https://github.com/XTLS/Xray-install/raw/main/install-release.sh

# 2. Запустить установку
sudo bash install-release.sh

# 3. Удалить скрипт (команда rm)
rm ~/install-release.sh
```

### Конспект: 7.3 Настройка TLS-сертификата для Xray

* **Правило acme.sh:** Нельзя использовать сертификат напрямую из папки генерации. Его нужно установить через команду `--install-cert`.
* **Права доступа:** Сертификаты сохраняются в домашнюю папку пользователя `vpsadmin`, чтобы избежать проблем с правами `non-root` аккаунта.

#### 1. Ручная установка сертификата

```bash
# Создать директорию для сертификатов
mkdir ~/xray_cert

# Скопировать сертификат средствами acme.sh (замените domain.com на свой)
acme.sh --installcert -d sibiryakov.linkpc.net \
--fullchain-file ~/xray_cert/xray.crt \
--key-file ~/xray_cert/xray.key

# Выдать права на чтение приватного ключа
chmod +r ~/xray_cert/xray.key
```

#### 2. Автоматическое обновление (Скрипт + Crontab)

Так как `acme.sh` обновляет сертификат каждые 60 дней, но не переустанавливает его в Xray автоматически, настраивается ежемесячный таск.

**Создание скрипта `~/xray_cert/xray-cert-renew.sh`:**
```bash
#!/bin/bash
# Замените ://domain.com на ваш домен
/home/vpsadmin/.acme.sh/acme.sh --install-cert -d ://domain.com --ecc \
 --fullchain-file /home/vpsadmin/xray_cert/xray.crt \
 --key-file /home/vpsadmin/xray_cert/xray.key
echo "Xray Certificates Renewed"

chmod +r /home/vpsadmin/xray_cert/xray.key
echo "Read Permission Granted for Private Key"

# Перезапуск Xray (в будущем заменится на Hot Update без перезапуска)
sudo systemctl restart xray
echo "Xray Restarted"
```

**Активация и планировщик:**
```bash
# Сделать скрипт исполняемым
chmod +x ~/xray_cert/xray-cert-renew.sh

# Открыть планировщик задач текущего пользователя (без sudo)
crontab -e

# Добавить в конец файла строку (запуск 1-го числа каждого месяца в 01:00):
0 1 1 * * bash /home/vpsadmin/xray_cert/xray-cert-renew.sh
```

> **Примечание:** Альтернативный официальный метод автоматизации в `acme.sh` — использование флага `--reloadcmd`.

### Конспект: 7.4 Настройка Xray

* **Конфигурация:** Используется простая и надежная схема: **Один входящий протокол VLESS + fallback на 80 порт**.
* **UUID:** Уникальный идентификатор пользователя (генерируется командой `xray uuid`).

#### 1. Подготовка логов (команда touch)

Логи сохраняются в домашнюю папку пользователя `vpsadmin` для обхода ограничений прав пользователя `nobody` (по умолчанию используемого Xray).

```bash
# Сгенерировать новый UUID
xray uuid

# Создать директорию для логов и пустые файлы логов
mkdir ~/xray_log
touch ~/xray_log/access.log && touch ~/xray_log/error.log

# Разрешить запись в логи всем пользователям (включая nobody)
chmod a+w ~/xray_log/*.log
```
_Примечание: После освоения системы рекомендуется вернуть логи в дефолтные пути `/var/log/xray/`._

#### 2. Создание конфигурационного файла

Файл конфигурации состоит из 5 основных частей: `log`, `dns`, `routing`, `inbounds` и `outbounds`.

```bash
# Открыть редактор nano для изменения конфига
sudo nano /usr/local/etc/xray/config.json
```

**Шаблон `config.json`:**
```json
{
     "log": {
         "loglevel": "debug" // Content from least to most: "none", "error", "warning>
         // ,"access": "/home/xray_log/access.log", // Access record
         // "error": "/home/xray_log/access.log" // Error record
     },
     // 2_DNS settings
     "dns": {
         "servers": [
             "https+local://1.1.1.1/dns-query", // Prefer 1.1.1.1 DoH query, sacrific>
             "localhost"
         ]
     },
     // 3*Diversion settings
     "routing": {
         "domainStrategy": "AsIs", // "IPIfNonMatch",
         "rules": [
             // 3.1 Prevent local server flow problems: such as intranet attacks or a>
             {
                 "type": "field",
                 "ip": [
                     "geoip:private" // Diversion condition: In the geoip file, the r>
                 ],
                 "outboundTag": "block" // Diversion strategy: Hand over to the outbo>
             },
             {
                 // 3.2 Prevent the server from connecting directly to Russia
                 "type": "field",
                 "ip": [
                     "geoip:ru"
                 ],
                 "outboundTag": "block"
             },
             // 3.3 Block ads
             {
                 "type": "field",
                 "domain": [
                     "geosite:category-ads-all" // Diversion conditions: In the geosi>
                 ],
                 "outboundTag": "block" // Diversion strategy: Hand it over to the ou>
             },
             // 3.4 All other out
             {
                 "type": "field",
                 "port": "0-65535",
                 "outboundTag": "direct" 
             }

         ]
     },
    "inbounds": [
         {
             "port":1923,
             "tag": "ss",
             "protocol": "shadowsocks",
             "settings": {
                 "method": "2022-blake3-aes-128-gcm",
                 "password": "aaaaaaaaaaaaaaaabbbbbbbbbbbbbbbb",
                 "network": "tcp,udp",
                 "decryption": "none"
             },
             "streamSettings": {
                 "network": "tcp"
             }
         },
         {
             "port": 443,
             "protocol": "vless",
             "tag": "vless_tls",
             "settings": {
                 "clients": [
                     {
                         "id": "6cce90c0-f96c-4d19-af2d-5cf2c656abc3",
                         "email": "sibiriakoff2006@yandex.ru",
                         "flow": "xtls-rprx-vision"
                     }
                 ],
                 "decryption": "none",
                  "fallbacks": [
                          {
                          "dest": 80 // Fall back to anti-detection proxy by default
                           }
                  ]
             },
             "streamSettings": {
                 "network": "tcp",
                 "security": "tls",
                 "tlsSettings": {
                         "alpn": "http/1.1",
                         "certificates": [
                                 {
                                 "certificateFile": "/home/vpsadmin/xray_cert/xray.cr>
                                 "keyFile": "/home/vpsadmin/xray_cert/xray.key"
                                  }
                         ]
                 }
                // "realitySettings": {
                //     "dest": "www.twitch.tv:443",
                //     "serverNames": [
                //         "www.twitch.tv"
                //     ],
                //     "privateKey": "GJIVnZvdAnLVC0ae4bTwQo595aFZpOhsPKRxX5orA0Q",
                //     "shortIds": [
                //         "5f8fe80e1e6034db"
                //     ]
                // }
             },
             "sniffing": {
                 "enabled": true,
                 "destOverride": [
                     "http",
                     "tls"
                 ]
             }
         }
     ],
     "outbounds": [
         {
             "protocol": "freedom",
             "tag": "direct"
         },
         {
             "protocol": "blackhole",
             "tag": "block"
         }
     ]
}
```
### Конспект: 7.5–7.6 Запуск и управление службой Xray

* **Успешный старт:** Благодаря корректной настройке прав для логов и сертификатов на прошлых шагах, Xray готов к запуску без конфликтов.
* **Управление:** Выполняется через системный менеджер `systemd` с помощью утилиты `systemctl`.

#### 1. Запуск и проверка статуса

```bash
# Запустить службу Xray
sudo systemctl start xray

# Проверить статус службы
sudo systemctl status xray
```
_Индикатор успеха:_ Наличие зеленой строки **`active (running)`** в выводе статуса.

#### 2. Шпаргалка по командам управления (systemctl)

| Действие                                    | Команда Linux                 |
| :------------------------------------------ | :---------------------------- |
| **Остановка службы**                        | `sudo systemctl stop xray`    |
| **Перезапуск службы**                       | `sudo systemctl restart xray` |
| **Включение автозагрузки** (при старте VPS) | `sudo systemctl enable xray`  |
| **Отключение автозагрузки**                 | `sudo systemctl disable xray` |

### Конспект: 7.8 Оптимизация сервера: Настройка HTTP-to-HTTPS редиректа

* **Проблема:** По умолчанию порты 80 (HTTP) и 443 (HTTPS) работают изолированно. Сайты не перенаправляют пользователя на безопасное соединение автоматически.
* **Решение:** Изменение логики Nginx (перенаправление с 80 на 443 порт) и перевод локального веб-сайта на альтернативный порт (8080) для работы через `fallback` от Xray.

#### 1. Изменение конфигурации Nginx

```bash
# Открыть конфигурационный файл Nginx
sudo nano /etc/nginx/nginx.conf
```

**Редактирование секций `server`:**
1. В существующем блоке `server` (который слушает 80 порт) **удалите** строки `root` и `index`, затем **добавьте**:
   ```nginx
   return 301 https://\(http_host\)request_uri;
   ```
2. Рядом создайте новый блок `server` для обработки локального трафика от Xray:
   ```nginx
   server {
       listen 127.0.0.1:8080;
       root /home/vpsadmin/www/webpage;
       index index.html;
       add_header Strict-Transport-Security "max-age=63072000" always; # Включение HSTS
   }
   ```

```bash
# Перезапустить Nginx для применения изменений
sudo systemctl restart nginx
```

#### 2. Перенастройка маскировки (Fallback) в Xray

Необходимо перенаправить защитный трафик Xray на новый локальный порт Nginx.

```bash
# Открыть конфигурационный файл Xray
sudo nano /usr/local/etc/xray/config.json
```
* **Правка:** Найдите строку `"dest": 80` и измените её на `"dest": 8080`.

```bash
# Перезапустить службу Xray
sudo systemctl restart xray
```

_Результат:_ При попытке зайти на `http://domain.com` браузер автоматически переключится на безопасный протокол `https://`.
