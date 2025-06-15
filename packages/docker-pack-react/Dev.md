# docker 构建前端项目

## 前端资源打包

```sh
npm run build
```

## 前端资源验证

```sh
npx http-server ./build -c-1 -cors
```

## docker 镜像构建

```sh
# 根目录执行docker
docker build -t [镜像名]:[镜像版本] .
```

> 若无法拉去官方镜像，需要配置 orbstack 镜像源
> https://github.com/dongyubin/DockerHub

## 镜像验证

```sh
docker run -d -p 8000:80 \
  --name react-app \
  react-app:0.1.0
```

说明：
-d 后台持续运行运行。
--name 自定义的容器名称。
-p 映射主机端口号到 docker 容器的端口号。
这里端口 8008 即为外部 web 访问的端口号，而 80 则为 nginx 容器对外暴露的端口号。

> 浏览器访问：http://127.0.0.1:8000

## 进入镜像

```sh
docker container list
docker exec -it [容器ID] /bin/bash
```

## nginx 配置定制

默认的 NGINX 配置：`/etc/nginx/nginx.conf`

```text
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```
