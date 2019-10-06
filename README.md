# websocket-server-docker

可以直接修改`server/index.js`逻辑，构建新的程序使用。

## 使用

```sh
git clone https://github.com/EdogGame/websocket-server-docker.git && cd websocket-server-docker

docker-compose up
# or
docker-compose up -d
```

## wss需求

需要ssl请自行生成证书，放入`web/ssl`文件夹中，修改`site.template`中ssl选项

> ssl文件夹中编写有基于`acme.sh`的脚本，使用`dns模式`验证签发证书，托管商为`cloudflare`

将已有的ssl相关文件放入`web/ssl`中，其中域名证书命名为`ca.cer`，私钥命名为`ca.key`，取消`web/site.template`文件的注释内容


## 工具
[websocket的在线测试程序](https://github.com/EdogGame/websocket-web)