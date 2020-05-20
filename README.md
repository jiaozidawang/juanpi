:beginner:
:beginner:
:beginner:




# web前端架框安装与使用

	基于vue开发的项目，使用vue官方脚手架vue cli

	ui层面统一使用vux



## 环境篇

1. Windows系统需64位，Mac OS X目前没有发现限制
2. Nodejs v7.0.0以上
3. 版本控制工具采用较新版的git
4. 较新版的Google Chrome



## 开发运行
1. 运行`npm run dll`，在`/static/`下生成库文件 (首次运行)
2. 运行`npm run common dev`，在`/static/`下生成对应环境的公共包信息  (首次运行)
3. 运行`npm run dev 包名 [包名]`，在内存中生成调试包信息

## 打全局包
1. 运行`npm run dll`，在`/static/`下生成库文件
2. 运行`npm run common sit`，在`/static/`下生成对应环境的公共包信息
3. 运行`npm run public sit`，在`/dist/`下生成对应环境的全局包资源

## 全量打业务包
1. 运行`npm run common sit`，在`/static/`下生成对应环境的公共包信息
2. 运行`npm run build sit`，在`/dist/`下生成可打包的离线资源

## 单独打业务包
1. 运行`npm run common sit`，在`/static/`下生成对应环境的公共包信息
2. 运行`npm run build sit 包名`，在`/dist/`下生成可打包的离线资源


## 打包ENGINEUI

1.运行`npm run engineui sit`，在`/dist/_zips/`下生成对应的压缩包

## 工具篇
 我们提供有适合本项目的Chrome、Nodejs、git的安装包，无需下载

* 较新版的Google Chrome；
* v7.0.0以上的Nodejs；
* 较新版的git；
* 编辑器统一使用vs code，版本控制在1.x版本即可；

### chrome 安装
按安装包向导完成安装。完成后，能访问网站，即成功

### nodejs 安装
按安装包向导完成安装。

运行以下node指令(windows在cmd.exe命令行中；OS X在terminal终端中)，查看到有版本号，即成功

```
node --version
```

### git 安装
按安装包向导完成安装。

运行以下git指令(windows在cmd.exe命令行中；OS X在terminal终端中)，查看到有版本号，即成功

```
git --version
```

### Visual Studio Code 安装
上官网下载安装包（1.x版本），按向导完成安装。能新建并编辑文件，即成功。


## 操作篇

在GitLab网站[https://git.flameapp.cn/users/sign_in](https://git.flameapp.cn/users/sign_in)(在搭建好局域网的GitLab，局域网网站地址替换外网地址)，用自己的姓名全拼作用户名和公司邮箱注册账号，成功后将用户名告知所在项目的git管理员。将你拉进项目组后，确认你能看见项目组的代码，即代表你已经可以修改提交代码。
操作指令，以外网https://git.flameapp.cn/users/sign_in网站上面的项目为例。

### 配置git

运行以下git指令，完成配置

```
git config --global user.name "你的注册账号"

git config --global user.email "你的注册邮箱"
```
运行以下git指令，查看是否与你的注册网站的账号保持一致

```
git config user.name

git config user.email
```

### 生成ssh密钥对

运行以下指令生成密钥对

```
ssh-keygen -t rsa -C "你的注册邮箱" -b 4096
```

windows下，会在【C:\Users\用户名\.ssh】下产生两个文件id_rsa和id_rsa.pub文件；

mac OS X下，会在【/Users/用户名/.ssh】下产生两个文件id_rsa和id_rsa.pub文件；

在id_rsa.pub文件中，发现有你注册用到的邮箱，即生成成功。


### 将公钥添加到gitlab上

将上一步生成的公钥内容复制到你的gitlab右上角的“Settings -》SSH Keys“的Key内容输入框，点击“Add key”，页面下方即会出现一个你的邮箱为名称的已添加的公钥。

### 测试，检查你是否配置git成功


运行以下指令

```
ssh -T git@git.flameapp.cn
```
这里的git@git.flameapp.cn，局域网的GitLab网站建好，换成局域网GitLab服务器IP。
如果，你看到了“Welcome to GitLab, ‘你的注册用户名’“这样的文字输出，说明配置git成功。

### 将远处代码仓库克隆到本地

在你需要放置代码的目录下运行

```
git clone -b dev git@git.flameapp.cn:dgbank/DGBank.git
```
这里的git@git.flameapp.cn:dgbank/DGBank.git，，局域网的GitLab网站建好，换成局域网项目的SSH目录。
见到了有代码从远程服务器克隆到了本地，即克隆代码仓库的dev分支成功。

### 安装项目依赖的资源包

直接使用npm下载依赖包速度很慢，而且经常安装失败。还好，我们可以使用淘宝 NPM 镜像。
我们可以用以下指令，npm指向的npm源换成国内的淘宝npm的映射源:

```
npm config set registry=https://registry.npm.taobao.org

npm config get registry
```
没有报错，并输出了网址https://registry.npm.taobao.org，即npm换源成功


```
cd DGBank

npm install
```
进入项目所在目录，再运行依赖包安装指令

输出的日志中没有报错，即安装依赖包成功。

### 本地运行项目
本项目分成了若干业务离线包，比如提供基础功能的base，详情请查看package.json中的apps部分。
直接运行npm run dev，会编译所有的离线包，导致编译时间长，收到改动反馈时间长，开发效率低下。为了解决效率问题，我们的编译脚本支持单个离线包，比如：可以运行以下指令，编译demo，demo并不是项目中的业务，只是我们公共组件演示的地方，并不在build的范围内。
```
npm run dev demo
```
指令运行后，会启动dev server，在命令行窗口看到以下类似输出的结果，说明编译成功。
```
DONE  Compiled successfully in 12320ms
```
浏览器中访问[http://localhost:8082/demo/cdbank_demo/index.html](http://localhost:8082/demo/cdbank_demo/index.html)，可以看到demo页面，说明项目项目部署到dev server成功。

### 开发环境搭建成功

# Git 常用操作指令练习

	Git是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
	Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。
	1. 适合分布式开发，强调个体。
	2. 公共服务器压力和数据量都不会太大。
	3. 速度快、灵活。
	4. 任意两个开发者之间可以很容易的解决冲突。
	5. 离线工作。

| Author        | Email         |
| ------------- |:-------------:|
| yanzhengsheng | zs_yan21@126.com |

> 这里新建了一个git练习git_practices工程，git源[git@192.168.3.17:root/git_practices.git](git@192.168.3.17:root/git_practices.git)，给小伙伴们练习git指令，本文旨在熟悉git常用指令。

## Git 安装和配置、关联远程仓库
这些操作已经在上文中提及，这里就不再复述了，这里假设你已经掌握了上述配置指令。

## Git 常用指令练习
我们的练习工程项目地址是 git@192.168.3.17:root/git_practices.git(项目git地址，可以替换)

### step 1
克隆远程代码仓库到本地

``` git
git clone https://192.168.3.17:root/git_practices.git
or
git clone git@192.168.3.17:root/git_practices.git
```
### step 2
进入git_practices项目目录

```
cd git_practices
```
执行git status查看所在分支，是否clean状态。目前分支在master

```
git status
```
如果不在master分支，请切换到master并拉取最新代码，master是被保护的不能执行push

```
git checkout master
git pull
```
创建个人分支并切换，执行

```
git checkout -b feature/{你的名字拼音}
or
git branch feature／{你的名字拼音}
git checkout feature／{你的名字拼音}
```
上传本地分支到远程，执行

```
git push -u origin feature/{你的名字拼音}
```
此时在coding.net查看你的分支是否已经上传了
查看本地分支及远程分支状态，执行

```
git branch -a
```
创建一个个人目录文件夹，以个人姓名拼音作为文件夹，并放入一个文本文件 如yanzhengsheng/test.txt，把改文件添加到git，执行

```
git add .
or
git add yanzhengsheng/test.txt
```
提交commit到git，执行

```
git commit -m "creat test file"
```
查看commit状态，执行

```
git status
```
上传到远程仓库，执行

```
git push
```
### step 3
签到留名修改Sign.md，留下你的大名，代表你在此留下过足迹。使用markdown语法表格，可自行查询markdown语法，修改完成后，执行

```
git add .
git commit
git push
```
### step 4
在coding.net创建Merge Request合并请求，发起你的个人分支合并到but/trunk分支
> feat:练习作业
>
> review:@yanzhengsheng
按以上格式录入信息，并邀请yanzhengsheng进行code review
如发生合并冲突，请修改冲突后再执行commit和push，合并按钮为绿色才完成任务

```
git checkout bus/trunk
git pull
git checkout feature/{你的名字拼音}
git merge bus/trunk
修冲突
git commit
git push
```
请大家完成作业，检验一下自己对于merge、修冲突、commit和push等命令的理解与否，谢谢，如有疑问请联系yanzhengsheng。

如果想进一步了解，可以去看[《Pro Git》](https://git-scm.com/book/en/v2)


# 目录结构

```
|-- build                            // 项目构建(webpack)相关脚本目录
|   |-- helper                       // 自定义构建脚本(非vue-cli)
|   |   |-- conf                     // 构建时产生的一些配置文件目录
|   |   |   |-- build_h5_conf.json   // 构建时产生的H5配置文件
|   |   |   |-- vendor-manifest.json // webpack dllplugin 构建相关依赖
|   |   |-- build_all.js             // 构建全量包代码
|   |   |-- build_conf.js            // 构建时产生H5配置文件脚本
|   |   |-- dist.js                  // 构建amr客户端内置包脚本
|   |   |-- getMultiEntries.js       // 自定义构建脚本主入口脚本
|   |   |-- mklog.js                 // 构建全量包时的错误日志脚本
|   |   |-- zips.js                  // 构建可发布的离线包脚本
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // .vue文件的加载器
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- address.js                   // 获取本地IP地址脚本，开发模式中使用
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|-- local                            // 开发环境下引用代码目录
|   |-- api.js                       // mock数据存放目录
|   |-- test.js                      // 开发环境重写原生方法脚本
|-- src                              // 源码目录
|   |-- common                       // 公共的文件
|   |   |-- scss                     // 公共的css样式文件
|   |   |   |-- mixins.scss          // 继承类和宏定义公共样式
|   |   |   |-- function.scss        // 继承类和宏定义公共样式
|   |   |   |-- vars.scss            // 变量类公共样式
|   |   |   |-- puclic.scss          // 基础公共样式
|   |   |   |-- reset.css            // 默认样式重置
|   |   |   |-- index.scss           // 引用文件
|   |   |-- fonts                    // 字体图标文件
|   |   |-- js                       // 公共的js文件
|   |   |   |-- App.js               // App H5的公共方法
|   |   |   |-- helper.js            // 目录内辅助函数
|   |   |   |-- index.js             // 入口文件
|   |   |   |-- init.js              // 监听mpaas生命周期
|   |   |   |-- mixins.js            // 为每个页面的vue实例混入方法
|   |   |   |-- Native.js            // 所有H5和原生交到的api方法
|   |   |   |-- prototype.js         // Object扩展原型
|   |   |   |-- rpc.js               // rpc封装
|   |   |   |-- utils.js             // 供全局使用的工具函数，非公共
|   |-- components                   // 公共组件
|   |   |-- base                     //基础公共组件，全局注册
|   |   |-- extend                   //拓展的组件
|   |-- modules                      // 业务代码目录
|   |-- store                        // vuex的状态管理, 注入到每个页面中
|   |-- main.js                      // 页面入口文件基础文件
|-- static                           // 静态文件
|   |-- vendor.dll.js                // 共公库
|   |-- initialize.js                // 挂载vue实例到页面上
|-- .babelrc                         // ES6语法编译配置
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcssrc.js                    // postcss工具的配置文件
|-- template.html                    // 生成html文件的模版
|-- package.json                     // 项目基本信息
|-- README.md                        // 项目说明及新手文档
```


# mpaas域名和工作目录配置及公私钥
 
:warning: 重要！！！！



> ######域名及工作目录

>>	config/index.js 文件中的commonPackage字段

>>>该字段中可配置各种环境下的mpaas域名和工作目录，
构建脚本会获取打包传入的环境参数到此来取变量组成打包的路径，需要正确的配置，否则无法打开！



:loudspeaker:  公有云的域名和工作目录，是在mpaas后台上创建应用时生成的，私有云则由mpaas提供。 

:loudspeaker:  公有云的公私钥需要到公有云上面配置，私有云则由mpaas提供，公钥需要替换项目中的 `build/mpaas/h5_public_key.pem` 的文件内容


# 运行指令

:bowtie:
:bowtie:
:bowtie: