# JustSupplies — website + control panel
FROM node:22-alpine
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production PORT=3000 DATA_DIR=/app/data
EXPOSE 3000
# First start: seed the data volume from the bundled content, then run the site.
CMD ["sh", "-c", "mkdir -p /app/data && [ -f /app/data/products.json ] || cp -r /app/src/data/. /app/data/; exec npx next start -p ${PORT}"]
