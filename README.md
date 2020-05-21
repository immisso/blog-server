# 个人博客网站服务端
![](https://img.shields.io/badge/Egg-%5E2.15.1-brightgreen)
![](https://img.shields.io/badge/mysql2-%5E2.1.0-brightgreen)
![](https://img.shields.io/badge/egg--sequelize-%5E5.2.1-brightgreen)
![](https://img.shields.io/badge/sequelize--cli-%5E5.5.1-brightgreen)

该项目是[个人博客](https://github.com/immisso/blog-web)项目的服务端部分，采用Node开发。使用了[Egg](https://eggjs.org/zh-cn/)框架。因为是前后端分离，服务端只提供API供前端使用。接下来将对该项目进行大致的说明。后续也会写一份更为详细的免费的《Node全栈开发——带你从零开发前后端分离的个人网站》教程，再次带你从零开发到部署上线的全过程。敬请期待！

## 技术栈
该项目采用Node开发，为了方便大家学习交流，我想在正式启动和运行项目前，有必要对项目技术栈做一个大致说明：

- [x] 语言 `Node`
- [x] 框架 `Egg`
- [x] 数据库 `Mysql`


## 如何开始
前面我们看到了效果了，也做了简要的说明。那么我们应该怎么启动这个项目呢？

#### clone 项目到本地

```git
$ git clone https://github.com/immisso/blog-server
```

#### 安装所需依赖

```bash
$ npm install
```
或者
```bash
$ yarn install
```

#### 添加数据库配置文件
该项目用到了`Mysql`数据库，理所当然的就需要数据库的配置。在`/config/`路径下创建一个`secret.js`文件（我习惯把放重要配置的文件叫secret.js。你也可以根据你自己的喜好任意修改名字。）。这个文件里放了我们常用的配置。比如数据库相关配置、cookie过期时间、加密的Key等。
```javascript
'use strict';
module.exports = {
  DATABASE: '', // 数据库名
  HOST: '', // HOST
  PORT: '', // 端口
  USERNAME: '', // 用户名
  PASSWORD: '', // 密码
  SECRET: '', // 加密Key
  EXPIRES: 60 * 30 * 12, // cookie过期时间
};
```

#### 创建数据表
该项目使用[Sequelize](https://sequelize.org/v5/)来操作数据库。使用`sequelize-cli`做数据库的迁移，非常方便，只需要我们提前定义好运行文件，需要的时候就可以直接操作并映射到数据库。如果你对`sequelize-cli`还不太了解可以参考官方文档[migrations](https://sequelize.org/v5/manual/migrations.html)。由于我提前把一些常用的命令写到了`package.json`文件中的`scripts`中,操作起来就更加方便了，只要执行

```bash
yarn migrate
```
对应的数据表就创建好了。

#### 初始化数据（可选）
为了方便测试，再创建数据表后，可以运行如下命令后添加一些初始化的数据，其中会自动创建2个测试账户，2篇文章，和一些分类、标签。这一步是可选的，如果你不需要初始化数据，可以选择不运行它。

```bash
yarn seed
```

#### 启动项目
准备工作已经做完，我们就可以启动项目了。

```bash
$ npm run dev
```
或
```bash
$ yarn dev
```
再启动前端项目，整个项目就运行起来了。

## 运行效果

该项目需要和[个人博客](https://github.com/immisso/blog-web)项目配合起来使用。其整体运行效果如下：

首页详情页
![](https://github.com/immisso/blog-web/blob/feature/public/images/%E9%A6%96%E9%A1%B5%E8%AF%A6%E6%83%85%E9%A1%B5001.gif)

写文章
![](https://github.com/immisso/blog-web/blob/feature/public/images/%E7%BC%96%E8%BE%91%E5%99%A8%E9%A1%B5%E9%9D%A2002.gif)

管理页
![](https://github.com/immisso/blog-web/blob/feature/public/images/%E7%AE%A1%E7%90%86%E9%A1%B5003.gif)


## 特别说明
该项目会长期更新。会逐步完善其他许多功能。如写教程功能、邮件提醒、用户管理、主题风格、代码风格等。欢迎长期关注。

