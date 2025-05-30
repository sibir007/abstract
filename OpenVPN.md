# OpenVPN

## How To Set up OpenVPN Server In 5 Minutes on Ubuntu Linux

### Find your public IP address

If your internface name is eth0 or eth1, enter:

```sh
ip addr show eth0

# OR
ip addr show eth1

# Or use the host command or dig command as follows:
host myip.opendns.com resolver1.opendns.com

# get IPv4
host -4 myip.opendns.com resolver1.opendns.com

# OR
dig TXT +short o-o.myaddr.l.google.com @ns1.google.com

# see IPv4 instead of default IPv6 ##
dig -4 TXT +short o-o.myaddr.l.google.com @ns1.google.com
```

### Download openvpn-install.sh script to set up OpenVPN server in 5 minutes on Ubuntu

```sh
wget https://git.io/vpn -O openvpn-install.sh

# We can verify script using a text editor such as nano command or vim command:

nano openvpn-install.sh
```

### Running openvpn-install.sh to install OpenVPN server

Type the following command:

```sh
sudo chmod +x openvpn-install.sh
sudo bash openvpn-install.sh

# Make sure you provide needed information:

Welcome to this OpenVPN road warrior installer!

Which protocol should OpenVPN use?
   1) UDP (recommended)
   2) TCP
Protocol [1]: 1

What port should OpenVPN listen to?
Port [1194]: 

Select a DNS server for the clients:
   1) Current system resolvers
   2) Google
   3) 1.1.1.1
   4) OpenDNS
   5) Quad9
   6) AdGuard
DNS server [1]: 2

Enter a name for the first client:
Name [client]: iphone

OpenVPN installation is ready to begin.
Press any key to continue...
```

### Viewing and Seting up OpenVPN Server In 5 Minutes on Ubuntu Firewall Rules

That is all. Your OpenVPN server has been configured and ready to use. You can see added firewall rules /etc/systemd/system/openvpn-iptables.service file:

```sh
sudo systemctl cat openvpn-iptables.service
```

Sample rules. Please do not edit them:
```txt
[Unit]
Before=network.target
[Service]
Type=oneshot
ExecStart=/usr/sbin/iptables -t nat -A POSTROUTING -s 10.8.0.0/24 ! -d 10.8.0.0/24 -j SNAT --to 172.105.102.90
ExecStart=/usr/sbin/iptables -I INPUT -p udp --dport 1194 -j ACCEPT
ExecStart=/usr/sbin/iptables -I FORWARD -s 10.8.0.0/24 -j ACCEPT
ExecStart=/usr/sbin/iptables -I FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT
ExecStop=/usr/sbin/iptables -t nat -D POSTROUTING -s 10.8.0.0/24 ! -d 10.8.0.0/24 -j SNAT --to 172.105.102.90
ExecStop=/usr/sbin/iptables -D INPUT -p udp --dport 1194 -j ACCEPT
ExecStop=/usr/sbin/iptables -D FORWARD -s 10.8.0.0/24 -j ACCEPT
ExecStop=/usr/sbin/iptables -D FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT
ExecStart=/usr/sbin/ip6tables -t nat -A POSTROUTING -s fddd:1194:1194:1194::/64 ! -d fddd:1194:1194:1194::/64 -j SNAT --to 2600:3c04::f03c:92ff:fe42:3d72
ExecStart=/usr/sbin/ip6tables -I FORWARD -s fddd:1194:1194:1194::/64 -j ACCEPT
ExecStart=/usr/sbin/ip6tables -I FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT
ExecStop=/usr/sbin/ip6tables -t nat -D POSTROUTING -s fddd:1194:1194:1194::/64 ! -d fddd:1194:1194:1194::/64 -j SNAT --to 2600:3c04::f03c:92ff:fe42:3d72
ExecStop=/usr/sbin/ip6tables -D FORWARD -s fddd:1194:1194:1194::/64 -j ACCEPT
ExecStop=/usr/sbin/ip6tables -D FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT
RemainAfterExit=yes
[Install]
WantedBy=multi-user.target
```

You can view your openvpn server config file generated by the script as follows (agin do not edit this file by hand as it will break things for you):

```sh
sudo more /etc/openvpn/server/server.conf
```

```txt
local 213.232.204.164
port 1194
proto udp
dev tun
ca ca.crt
cert server.crt
key server.key
dh dh.pem
auth SHA512
tls-crypt tc.key
topology subnet
server 10.8.0.0 255.255.255.0
push "redirect-gateway def1 bypass-dhcp"
ifconfig-pool-persist ipp.txt
push "dhcp-option DNS 8.8.8.8"
push "dhcp-option DNS 8.8.4.4"
push "block-outside-dns"
keepalive 10 120
user nobody
group nogroup
persist-key
persist-tun
verb 3
crl-verify crl.pem
explicit-exit-notify
```

### How do I start/stop/restart OpenVPN server on Ubuntu Linux 18.04/20.04 LTS and 20.10?

```sh
# указать расположение конфиг для сервера

sudo openvpn --config /etc/openvpn/server/server.conf

# Run the following systemctl command to stop the OpenVPN service:
sudo systemctl stop openvpn-server@server.service

# Want to start it again? Try:
sudo systemctl start openvpn-server@server.service

# The command to restart the OpenVPN service:
sudo systemctl restart openvpn-server@server.service

# View status of your OpenVPN systemd based service:
sudo systemctl status openvpn-server@server.service
```

### OpenVPN client configuration

On server your will find a client configuration file called ~/iphone.ovpn (or whatever name given during installation). Use the find command to locate OpenVPN config file:

```sh
sudo find / -type f -name "iphone.ovpn"
sudo find / -type f -name "*.ovpn" -ls
```

Now, all you have to do is copy this file to your local desktop using the scp and provide this file to your OpenVPN client to connect (replace iphone.ovpn and root username as per your set up):

```sh
scp root@172.105.102.90:~/iphone.ovpn .
```

If you cannnot run the scp command as root then log in as a normal user on your server. For example:

```sh
ssh {user}@172.105.102.90
ssh vivek@172.105.102.90
```

Find the location of opvn file on the server:

```sh
sudo find / -type f -name "*.ovpn" -ls

34605854      4 -rw-r--r--   1 root     root         2774 May  6 01:04 /root/desktopclient.ovpn
```

Next, you need to download OpenVPN client as per your operating system or mobile device:

- Client for [Apple iOS](https://itunes.apple.com/us/app/openvpn-connect/id590379981?mt=8) version 6.x or above
- [Android](https://play.google.com/store/apps/details?id=net.openvpn.openvpn&hl=en) client
- [Apple MacOS (OS X)](https://tunnelblick.net/)
- [Windows 8/10 OpenVPN](https://openvpn.net/community-downloads-2/) client

### Linux OpenVPN client configuration

```sh
# First, install the openvpn client, enter:
sudo yum install openvpn

# OR
sudo apt install openvpn

# Next, copy iphone.ovpn as follows:
sudo cp iphone.ovpn /etc/openvpn/client.conf

# Test connectivity from the CLI:
sudo openvpn --client --config /etc/openvpn/client.conf
# sudo openvpn --client --config /etc/openvpn/client.conf

# Your Linux system will automatically connect when computer restart using /etc/init.d/openvpn script:
sudo /etc/init.d/openvpn start

# For systemd based system, use the following command:
sudo systemctl start openvpn@client

# Test the OpenVPN connectivity on Linux desktop:
ping 10.8.0.1 #Ping to OpenVPN server gateway using the ping command
ip route #Make sure routing setup using the ip command ip route get 10.8.0.1
#Make sure your public IP set to OpenVPN server
dig TXT +short o-o.myaddr.l.google.com @ns1.google.com
```
### Viewing log file

```sh
# Try the journalctl command:
journalctl -u openvpn
grep VPN /var/log/syslog
```

###  Socket bind failed on local address address already in use

`lsof -i | grep openvpn`

and got result like:
Code: Select all
`openvpn    2817 nobody    6u  IPv4 166261      0t0  UDP *:openvpn`

`kill 2817`