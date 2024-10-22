<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">YF 后台管理系统</h1>
<p align="center">
	<a href="https://gitee.com/fateyifei/yf/stargazers"><img src="https://gitee.com/fateyifei/yf/badge/star.svg?theme=dark"></a>
	<a href="https://gitee.com/fateyifei/yf"><img src="https://img.shields.io/badge/YF-v1.0.0-brightgreen.svg"></a>
	<a href="https://gitee.com/fateyifei/yf/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
</p>
<p align="center" >
<a href="http://110.41.173.220/yf-vue-admin" target="_blank">👀 在线预览</a>
 | <a href="#" target="_blank">📖 项目文档</a>
</p>

## 项目简介

- 项目采用多种流行技术 , 其中技术栈包含但不限于
    - SpringBoot3 、SpringSecurity6 、SpringAi、SpringEmail 、SpringCache 、MybatisPlus...
    - Vue3、TypeScript、ElementPlus、VueRouter、Pinia...
    - Mysql、Redis、Minio、Caffeine...
    - TensorFlow、JustAuth、ffmpeg、test4j、sensitive-word、vosk...
    - Alipay、OSS、COS、OBS....

- 项目为学习性后台管理系统 , 有诸多流行技术 , 持续更新 , 免费远程答疑 ,
  可根据基础版 [yf-vue3-admin-base](https://gitee.com/fateyifei/yf-vue3-admin-base) 修改为任意系统。

## 项目特色

- 简单易学 : 在项目关注度高时会在 **bilibili 录制项目讲解视频**
- 授权登录 : 采用JWT颁发授权信息，支持刷新Token，二次封装JustAuth并且通过简单工厂模式+模版方法模式结合SpringSecurity进行多种登录方式。
- 安全可用 : Redis多规则限流、Redis分布式防重复提交、AOP日志处理、数据脱敏、脏词过滤...
- 基础设施完善 : 用户、第三方授权、角色、菜单、字典、部门、日志等完善的权限系统功能。
- 文件模块 : 支持多种平台文件上传MinIo、OSS、COS、OBS....
- AI助手 : 使用SpringAi对接ChatGPT、ollama...
- 聊天室 : 支持集群环境下websocket通讯
- 丰富工具库 : TreeUtil(一行代码构建树形结构) 、TensorFlow 模型访问 、ip解析具体地址...
- 丰富有趣功能 : OCR、ffmpeg、脏词过滤、字幕识别...

## 项目展示

| 地址      | 链接                                                                            |
|---------|-------------------------------------------------------------------------------|
| 网站      | <a href="http://110.41.173.220/yf-vue-admin" target="_blank">yf-vue-admin</a> |
| Gitee源码 | <a href="https://gitee.com/fateyifei/yf" target="_blank">YF</a>               |

### PC端

![PC端项目截图](https://foruda.gitee.com/images/1722956633903082210/719fc801_9026884.png)

### 移动端

![移动端项目截图](https://foruda.gitee.com/images/1722956662136702771/e725e761_9026884.png)

## 项目运行

### 项目环境

| 环境    | 版本  |
|-------|-----|
| Java  | 17+ |
| Maven | 3+  |
| Node  | 18+ |
| Redis | 5+  |
| Mysql | 5+  |

### 运行命令

```shell
## 将项目下载到本地
git clone https://gitee.com/fateyifei/yf.git
```

### yf-vue-admin ( 前端服务 )

- 前提 : 需要有node环境,系统中安装过yarn

```shell
## 已经安装 yarn 则可不执行
npm install yarn -g
## 切换目录
cd yf/yf-vue-admin
## 安装依赖
yarn install
## 启动项目
yarn run dev

## 接下来会自动打开项目到网页 , 如果未部署后端服务请设置 .env.production 中 VITE_APP_API_URL = http://110.41.173.220/api
```

### yf-boot-admin ( 后端服务 )

- 前提 : 已经配置好 java17、 maven 、redis 、mysql，并且mysql数据库已经导入
- 注意 : 导入数据库后默认管理员账户 => 用户名 : admin 密码 : 12345678

```shell
## 切换目录
cd yf/yf-boot-admin

## 打包
mvn clean package -DskipTests

## 在yf/yf-boot-admin/yf-admin 下找到 jar 包并运行
java -jar target/yf-admin-<version>.jar > xx.log 2>&1 &

```

## 项目部署

```shell
## 前端项目 ( .env.production 可修改部署配置 )
yarn run build
## 后端项目 ( application-prod 可修改部署配置信息  )
mvn clean package -DskipTests
## nginx 配置
### 项目存储在 ( nginx/html/{.env.production中VITE_APP_PUBLIC_PATH}下 , 可以直接修改 dist 文件夹名 )
server {
    # 监听端口80
    listen 80;
    server_name localhost;
    
    # SPA项目 -> yf-vue-admin
    location /yf-vue-admin/ {
        root /www/server/nginx/html;
        index index.html;
        try_files $uri $uri/ /yf-vue-admin/index.html;
    }
    
    # 后台服务 -> yf-boot-admin
    location /api {
          # 后端服务器地址(您的后端地址)
          proxy_pass ????;  
          
          # 设置转发给后端的请求头
          # 使用客户端请求的主机名作为后端请求的Host头
          proxy_set_header Host $host;  
          # 将客户端真实IP地址传递给后端
          proxy_set_header X-Real-IP $remote_addr;  
          # 将客户端和代理服务器链的IP地址传递给后端
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          # 传递使用的协议（HTTP或HTTPS）
          proxy_set_header X-Forwarded-Proto $scheme;  
          # 传递请求的主机名
          proxy_set_header X-Forwarded-Host $host;  
          # 传递请求的服务器端口
          proxy_set_header X-Forwarded-Port $server_port;  
          
          # WebSocket 连接
          # 使用HTTP/1.1协议以支持WebSocket
          proxy_http_version 1.1;  
          # 处理WebSocket协议升级请求
          proxy_set_header Upgrade $http_upgrade;  
          # 处理WebSocket协议升级请求
          proxy_set_header Connection "Upgrade";  
          
          # SSE 连接
          # 禁用代理缓冲以支持Server-Sent Events (SSE)
          proxy_buffering off;  
          # 请求速率限制
          # 设置请求速率限制
          #limit_req zone=one burst=20 nodelay;  
    }
}
### 后端项目任意位置运行 , 请记住端口以及地址 ( 需要服务器开发地址访问权限 ， 后续通过 nginx 进行代理 )
java -jar target/yf-admin-<version>.jar > ??.log 2>&1 &

```

## 项目注意事项

### 提交规范

| 前缀           | 描述                        |
|--------------|---------------------------|
| feat: ✨      | 新功能                       |
| fix: 🐛      | bug修复                     |
| docs: 📚     | 仅文档更改                     |
| style: 🌈    | 不影响代码含义的更改（空白、格式设置、缺失分号等） |
| refactor: ♻️ | 既不修复bug也不添加特性的代码更改        |
| perf: 🚀     | 改进性能的代码更改                 |
| test: 🧪     | 添加缺少的测试或更正现有测试            |
| chore: 🔨    | 对构建过程或辅助工具和库（如文档）的更改      |
| revert: ↩️   | 回滚 commit                 |

### 登录/注册功能

- 后台管理系统一般不会有注册，但是项目为一人一号不方便在线演示，所以您可以通过邮箱、第三方平台进行登录体验

### 部分功能只有后端接口

- 由于家中突发情况，项目先行开源，部分功能仅有后端实现，前端页面并未编写

## 交流群 🚀

欢迎 start , 欢迎交流技术 , 如果有任何不懂的地方可以联系我 , 可以无偿帮您解决 , 相当于大家互相交流学习

QQ群 ： 957226269

微信 （加好友后邀请进群）：

<img src="https://foruda.gitee.com/images/1714351435556602409/7b1d097c_9026884.jpeg" width="235" height="220" alt="微信号"> 
