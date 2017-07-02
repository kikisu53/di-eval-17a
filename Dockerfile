FROM node:6

# TO set the nodejs environment variable as a one-off
# 環境變量會因操作系統設定或者客戶裝置設定不同而改變
# 可以進行以下設定，避免因環境改變設定
# linux & mac: export NODE_ENV=production
# windows: set NODE_ENV=production
ENV NODE_ENV=production

# 新增 group name = app （groupadd app)
# 新增 user name = app （useradd app), 歸屬在 group name = app (-g app)
# 設定為系統用群組/帳號 (-r)
RUN groupadd -r app && useradd -r -g app app

COPY . /opt/app
WORKDIR /
RUN npm i --silent

# 設定 container 對外的 port
EXPOSE 10010

# 指定 username = app 的帳號執行RUN
USER app

CMD ["node", "/opt/app/app.js"]
