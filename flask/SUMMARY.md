# Flask

## How to run a Flask App Over HTTPS, using Waitress and NGINX

lask app to let it know we are using Waitress.

```python
from flask import Flask
#we import waitress here. 
from waitress import serve


app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1 style='color:blue'> A very simple flask server !</h1>"

if __name__ == "__main__":
    #app.run(host='0.0.0.0')
    #We now use this syntax to server our app. 
    serve(app, host='0.0.0.0', port=5000)
```

we still need our SSL. use [Certbot](https://certbot.eff.org/).  Run these commands to get SSL 

```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-nginx


sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

letsencrypt certonly -a webroot --webroot-path=/var/www/yourdomain.com/html/ -d yourdomain.com -d www.yourdomain.com

```

