# websocket-server-docker

需要ssl请自行生成证书，放入`web/ssl`文件夹中，修改`site.template`中ssl选项
> ssl文件夹中编写有基于`acme.sh`的脚本，使用`dns模式`验证签发证书，托管商为`cloudflare`
