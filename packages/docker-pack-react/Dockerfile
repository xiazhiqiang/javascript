# 使用官方的 nginx 镜像
FROM nginx:latest

# 将 dist 目录下的所有文件复制到 nginx 的默认静态资源目录
COPY build /usr/share/nginx/html

# 如果需要，可以添加一些 nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/app.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
