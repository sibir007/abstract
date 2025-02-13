# XRay

<https://xtls.github.io/en/document/>

<https://github.com/XTLS>



## Bleeding-edge обход блокировок с полной маскировкой: настраиваем сервер и клиент XRay с XTLS-Reality быстро и просто

<https://habr.com/ru/articles/731608/>


### Установка сервера XRay

#### руками:

```sh
wget https://github.com/XTLS/Xray-core/releases/download/v25.1.30/Xray-linux-64.zip # поменять v1.8.1 на актуальную версию
mkdir /opt/xray
unzip ./Xray-linux-64.zip -d /opt/xray
chmod +x /opt/xray/xray
nano /usr/lib/systemd/system/xray.service
systemctl enable xray
```

```conf
; xray.service

[Unit]
Description=Xray Service
Documentation=https://github.com/xtls
After=network.target nss-lookup.target

[Service]
User=nobody
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
NoNewPrivileges=true
ExecStart=/opt/xray/xray run -config /opt/xray/config.json
Restart=on-failure
RestartPreventExitStatus=23
LimitNPROC=10000
LimitNOFILE=1000000

[Install]
WantedBy=multi-user.target
```

#### установить скриптом

```sh
bash -c "$(curl -L https://raw.githubusercontent.com/XTLS/Xray-install/046d9aa2432b3a6241d73c3684ef4e512974b594/install-release.sh)" @ install --version 1.8.1 
```

Скрипт установит XRay и создаст для него systemd-юнит.

### Настройка сервера XRay

Для настройки нам понадобится ряд параметров. Часть из них нам может сгенерировать сам XRay:

```sh
# идентификатор пользователя для протокола аутентификации VLESS
/usr/local/bin/xray uuid # /opt/xray/xray если устанавливали вручную
fcb6a216-f723-45a7-907f-852112a3f8e9
# приватный и публичный ключи - запишите их, они вам понадобятся
/usr/local/bin/xray x25519 # /opt/xray/xray если устанавливали вручную
Private key: -MTVUQB77RcNqkWbzh3COwIAVTn4-jQm7i33ecg_gCE
Public key: br2HjFSVnOBHyP2R2vBrv5aK6TK4mHKFqI4Zli1fcCA
```

Еще один параметр, который нужен - short ID, он представляет собой просто шестнадцатиричное число (символы 0-9, a-g) длиной до 8 байт (16 символов) - можно набрать любую абракадабру типа "aabbccdd" или запустить 

`openssl rand -hex 8`

Нам нужно найти сайт, под который мы будем маскироваться.

Требования довольно простые:

это должен быть иностранный сервер (вне РФ), не забаненный по домену Роскомнадзором, поддерживающий подключения по TLSv1.3 и HTTP/2, имеющий заглавную страницу, которая не переадресовывает на какой-нибудь другой домен. Если совсем упарываться, то неплохо было бы если бы IP-адрес был из диапазона того же облачного хостера, что и у вас, и чтобы сервер поддерживал Online Certificate Status Protocol (OCSP). Если вы не знаете, что вся эта фигня значит - не заморачивайтесь, выбирайте что-нибудь простое, например

www.samsung.com:443

www.googletagmanager.com:443

www.asus.com:443

www.amd.com:443

www.cisco.com:443


Лучше всего выбирать что-нибудь из сети того же хостера, каким пользуетесь вы.
Для этого есть специальный инструмент: https://github.com/XTLS/RealiTLScanner

Скачиваете его под Windows/Linux со страницы [Releases] (https://github.com/XTLS/RealiTLScanner/releases/), или собираете сами (go build).

Далее, запускаете как-то так:

и ждете.

Сканер будет перебирать IP-адреса из той же подсети, что и ваш сервер, и пытаться к ним подключиться по TLS. Если он что-то найдет - вы это увидите. Пример (я сканирую рандомный IPшник):

```sh
./RealiTLScanner -addr IP_вашего_VPS -showFail

89.116.243.206:443 	TLS handshake failed: EOF
89.116.243.207:443 	TLS handshake failed: EOF
89.116.243.208:443 	----- Found TLS v1.3	ALPN   	CN=caprover.com,O=CapRover.com,L=Vancouver,ST=British Columbia,C=CA,1.2.840.113549.1.9.1=#0c11696e666f40636170726f7665722e636f6d
89.116.243.209:443 	TLS handshake failed: EOF
89.116.243.210:443 	----- Found TLS v1.3	ALPN   	CN=patentpath.io
89.116.243.211:443 	----- Found TLS v1.3	ALPN   	CN=vps3.gecon.pl
89.116.243.212:443 	TLS handshake failed: EOF
89.116.243.213:443 	TLS handshake failed: EOF
89.116.243.214:443 	TLS handshake failed: EOF
89.116.243.215:443 	TLS handshake failed: read tcp 192.168.136.132:55142->89.116.243.215:443: i/o timeout
89.116.243.216:443 	----- Found TLS v1.3	ALPN   	CN=localhost,OU=none,O=none,L=Sometown,ST=Someprovince,C=US,1.2.840.113549.1.9.1=#0c137765626d6173746572406c6f63616c686f7374
89.116.243.217:443 	TLS handshake failed: EOF
89.116.243.218:443 	TLS handshake failed: EOF
89.116.243.219:443 	TLS handshake failed: EOF
89.116.243.220:443 	TLS handshake failed: EOF
89.116.243.221:443 	TLS handshake failed: EOF
89.116.243.222:443 	----- Found TLS v1.3	ALPN   	
89.116.243.223:443 	----- Found TLS v1.3	ALPN   	CN=milapanel.milahosting.com
89.116.243.224:443 	----- Found TLS v1.3	ALPN   	CN=vps-us.workx.dev
89.116.243.225:443 	----- Found TLS v1.3	ALPN   	CN=www.google.com
89.116.243.226:443 	----- Found TLS v1.3	ALPN   	CN=www.bookifynow.com
89.116.243.227:443 	----- Found TLS v1.3	ALPN   	CN=next.tasosvl.cc
89.116.243.228:443 	TLS handshake failed: EOF
89.116.243.229:443 	----- Found TLS v1.3	ALPN   	CN=alpaca-dreams.com
89.116.243.230:443 	TLS handshake failed: EOF
```

Если сканер нашел какие-то домены - попробуйте сходить на них браузером - должен открыться соответствующий сайт без каких-либо ошибок сертификатов. Если не открывается, или лезут ошибки - такой домен нам не подходит, а если открывается и ошибок нет - можно попробовать маскироваться под него.

Сервер выбрали, настало время редактировать конфиг. Если вы ставили XRay вручную то он будет лежать в /opt/xray/config.json, если скриптом - то в /usr/local/etc/xray/config.json.

Приводим его к следующему виду:

```json
{
  "log": {
    "loglevel": "info"
  },
  "routing": {
    "rules": [],
    "domainStrategy": "AsIs"
  },
  "inbounds": [
    {
      "port": 23,
      "tag": "ss",
      "protocol": "shadowsocks",
      "settings": {
        "method": "2022-blake3-aes-128-gcm",
        "password": "aaaaaaaaaaaaaaaabbbbbbbbbbbbbbbb",
        "network": "tcp,udp"
      }
    },
    {
      "port": 443,
      "protocol": "vless",
      "tag": "vless_tls",
      "settings": {
        "clients": [
          {
            "id": "4c3fe585-ac09-41df-b284-70d3fbe18884",
            "email": "user1@myserver",
            "flow": "xtls-rprx-vision"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
		"realitySettings": {
			"show": false,
			"dest": "www.microsoft.com:443",
			"xver": 0,
			"serverNames": [
				"www.microsoft.com"
			],
			"privateKey": "GOTPj_klK7_j_IvjxiCtyBL80RYotYSOdBBBSfFOMH4",
			"minClientVer": "",
			"maxClientVer": "",
			"maxTimeDiff": 0,
			"shortIds": [
				"aabbccdd"
			]
		}
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

На что обратить внимание: в "serverNames" указан домен, под сервер которого вы маскируетесь (в данном случае www.microsoft.com), "id" в секции "clients" - это тот самый UUID, что мы сгенерировали выше. "privateKey" и первый элемент в массиве "shortIds" - это приватный ключ и short ID, что мы тоже сгенерировали выше. Публичный ключ не теряйте, он будет нужен на клиенте.

В этом конфиге так же на 23 порту настроен Shadowsocks-2022, на всякий случай, вдруг пригодится. Если не надо, или хочется полной маскировки - можно удалить этот элемент из "inbounds". 

Перезапускаем еще раз xray:

`$ systemctl restart xray`

Проверяем что все нормально запустилось:

`$ journalctl -u xray`

Например, XRay может ругнуться что не удается распарсить JSON-файл, обычно это связано с лишними запятыми в конце {} блока, в этом случае он укажет, на какой строке ошибка. Исправляем ошибки, перезапускаем еще раз, и переходим к настройке клиентов.

### Настройка клиентов

#### Decktop

<https://github.com/MatsuriDayo/nekoray>
<https://github.com/MatsuriDayo/nekoray/releases>


```sh
wget https://github.com/MatsuriDayo/nekoray/releases/download/4.0.1/nekoray-4.0.1-2024-12-12-debian-x64.deb

sudo dpkg -i nekoray-4.0.1-2024-12-12-debian-x64.deb 

sudo /opt/nekoray/nekobox
```

Идем в Server -> New profile и заполняем все вот так:
- Common:
  - Address - IP-адрес вашего сервера,
  - Port - порт сервера
- VLESS:
  - UUID - соответственно, UUID, 
  - Flow - xtls-rprx-vision
- Settings:
  - Network - tcp,
  - Security - tls,
  - Packet ENcoding - xudp
  - Multiplex - Keep Default
- TLS Security Settings
  - SNI должен соответствовать домену, под который вы маскируетесь (один из списка "serverNames" из конфига сервера),
  - ALPN - h2
- TLS Camouflage Settings:
  - Fingerprint (uTLS) - chrome 
  - Reality Pbk - публичный ключ (не приватный, а второй, публичный), 
  - Reality Sid - shortId из конфига выше.

#### Nekobox Android

<https://play.google.com/store/apps/details?id=moe.nb4a>
<https://github.com/MatsuriDayo/NekoBoxForAndroid/releases>

#### Android V2RayNG

https://play.google.com/store/apps/details?id=com.v2ray.ang&hl=en_US
https://github.com/2dust/v2rayNG