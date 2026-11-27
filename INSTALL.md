# JustSupplies — install guide

The website and its control panel are one Node.js app. All content (products, categories,
blog posts, homepage text, uploaded images) is stored as files in a data folder on your
server. No external database is needed.

**Requirements:** a server or VPS that runs Node.js (Ubuntu recommended, 2 GB RAM or more).
Shared PHP or WordPress hosting cannot run this app.

## Option A: Docker (recommended, one command)

```bash
# 1. Put the project on the server (git clone or upload the zip) and enter the folder
cd justsupplies

# 2. Set the admin password
cp .env.example .env.production
nano .env.production          # set ADMIN_PASSWORD and ADMIN_SECRET

# 3. Build and start
docker compose up -d --build
```

The site runs on port **3000**. Content is saved in `./site-data`; back up this folder.
To update the code later: `git pull && docker compose up -d --build`. Your content in
`site-data` is kept.

## Option B: Without Docker

```bash
# Node.js 22: https://nodejs.org (or: curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash - && sudo apt install -y nodejs)
cd justsupplies
cp .env.example .env.production && nano .env.production
npm ci
npm run build
npm i -g pm2
pm2 start "npm start" --name justsupplies
pm2 save && pm2 startup
```

Here content is saved in `src/data` by default. To keep it somewhere else, set
`DATA_DIR=/var/justsupplies-data` in `.env.production` and copy `src/data` there first.

## Domain and SSL

Put a reverse proxy in front of port 3000, for example Nginx with Certbot or Caddy.
Caddy example (gives free SSL automatically):

```
justsupplies.co.uk, www.justsupplies.co.uk {
    reverse_proxy localhost:3000
}
```

Then point the domain's A record to the server's IP.

## Control panel

Open **https://your-domain/admin** and log in with `ADMIN_PASSWORD`. From there you can:

- **Products**: add, edit or delete products, prices, sale prices, stock, options (colours or
  sizes), images (upload or URL), description, tags and categories
- **Categories**: title, description, image and which products appear (and in what order)
- **Blog**: write, edit and delete posts
- **Homepage**: hero heading, intro, button text and the "Why JustSupplies" section

Changes appear on the website immediately.

## Payments

See `PAYMENT_INTEGRATION.md` for where your payment gateway connects to the checkout.
