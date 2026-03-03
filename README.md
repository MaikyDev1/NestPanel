<h1 align="center" id="title">NestPanel</h1>

<p id="description">A mobile Progresive Web Application used to control smart IoT devices. NestPanel is the frontend of NestServer.</p>

<h2>🖼️ Images </h2>

https://github.com/user-attachments/assets/b0a6840f-620b-4b17-a2e6-e939221e5a5d

https://github.com/user-attachments/assets/e78b479d-474a-4a24-9abc-5ab5ea316477

<h2>🗞 How to start</h2>

<h4>1. Install and configure <b>NestServer</b></h4>
You Must install NestServer Backend for the Front-End to work. 

<a href="https://github.com/MaikyDev1/NestServer">Read more here</a>

<h4>2. Download the last stable or development build NestPanel</h4>

We start by getting all the files from github and unzipping them into `/var/www/nest_panel`
```bash
mkdir /var/www/nest_panel
cd /var/www/nest_panel
curl -Lo nest_panel.tar.gz https://github.com/MaikyDev1/NestPanel/releases/latest/download/nest_panel.tar.gz
tar -xzvf nest_panel.tar.gz
```
Create a `.env` configuration file and use this example to start
```env
NEST_SERVER=http://[server-ip]
```
Build the NextJs application
```bash
npm build
```
<h4>3. Create the Service Worker and start the application</h4>

Create a file called `nestpanel.service` in `/etc/systemd/system` with the contents below.

```service
[Unit]
Description=NestPanel
After=network.target

[Service]
User=root
WorkingDirectory=/home/ubuntu/nest_panel
ExecStart=/home/ubuntu/nest_panel/start.sh
Restart=always
RestartSec=5
Environment=NODE_ENV=production
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```
After you added that service we will have to enable and start the service.
```bash
# enable
sudo systemctl enable --now nestpanel
# start
sudo systemctl start --now nestpanel
# see logs
sudo journalctl -u nestpanel -f
```
