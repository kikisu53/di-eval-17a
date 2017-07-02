FROM node:6

# TO set the nodejs environment variable as a one-off
# 環境變量會因操作系統設定或者客戶裝置設定不同而改變
# 可以進行以下設定，避免因環境改變設定
# linux & mac: export NODE_ENV=production
# windows: set NODE_ENV=production
ENV NODE_ENV=production

# -g: global, -r:
RUN groupadd -r app && useradd -r -g app app

COPY . /opt/app
WORKDIR /
RUN npm i --silent

EXPOSE 10010
USER app

CMD ["node", "/opt/app/app.js"]
