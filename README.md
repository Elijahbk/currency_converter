# # Currency Converter Application

This project is a currency converter application that allows users to convert currencies using real-time exchange rates. The application is built using Node.js, Express, and an external API for fetching exchange rates.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [API Information](#api-information)
- [Load Balancer Configuration](#load-balancer-configuration)
- [Demo Video](#demo-video)
- [Credits](#credits)
- [License](#license)

## Installation
1. Clone the repository:
   ```bash
   git clone <https://github.com/Elijahbk/currency_converter.git>
   cd <currency_converter>
## Usage
1. Start the application:
   ```bash
   node server.js
Open your browser and navigate to <http://localhost:3000>
## Deployment
1. Deploy the application on both Web01 and Web02 servers:
   SSH into each server using the following commands:
   ```bash
   ssh user@54.173.64.0
   ssh user@23.20.201.144

2. Follow the following installation steps on each server:
   ```bash
   git clone <https://github.com/Elijahbk/currency_converter.git>
   cd <currency_converter>
   npm install
   echo "EXCHANGE_RATES_API_KEY = my_api_key" > .env
   node server.js
   ```
3. Load balancer configuration (Lb01):
   SSH into the load balancer server:
   ```bash
   ssh user@23.22.130.97
   Install NGINX:
   ```
   
   ```bash
   sudo apt update
   sudo apt install nginx
4. NGINX configuration and file editing:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   Update the configuration file with the following content:

   nginx
   upstream myapp {
       server 54.173.64.0:3000;
       server 23.20.201.144:3000;
   }
   
   server {
       listen 80;
   
       location / {
           proxy_pass http://myapp;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   Restart NGINX to apply the changes:

   ```bash
      sudo systemctl restart nginx
   
## API Information
This application uses the <Exchange Rates API> to fetch real-time exchange rates. For more information, visit the <Exchange Rates API> documentation.

## Load Balancer Configuration
The load balancer is configured using NGINX to distribute traffic between two web servers. The configuration file is updated to include the IP addresses of Web01 and Web02, and the NGINX service is restarted to apply the changes.

## Demo Video
Watch the demo video here.

Credits:
[Exchange Rates API](https://exchangeratesapi.io)
[Node.js](https://nodejs.org/en)
[Express](https://expressjs.com)

## License
This project is licensed under the MIT License - see the LICENSE file for details.

