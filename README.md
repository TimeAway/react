# react-music-player

### 一款基于react开发的简单的网页音乐播放器

此项目通过 [Create React App] 脚手架工具搭建，拷贝项目到本地，然后 npm install 进行JS模块的安装

### 使用 `npm start` 本地启动

默认 [http://localhost:3000](http://localhost:3000)

### 使用 `npm run build` 打包

---

## 主要功能
1. 切换歌曲同步展示该歌曲的相关信息
2. 支持点击列表播放歌曲
3. 支持点击上一曲下一曲的播放
4. 支持随机播放、顺序播放、单曲播放模式
5. 支持点击、拖动选择播放时间
6. 支持声音的开启与关闭
7. 其他功能后续完善

---

## 项目结构
```
react-music-player
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public   公共文件
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src      项目源码
    ├── component     组件
    │   ├── App           包含所有组件
    │   ├── Header        顶部
    │   │   │── Contribute    投稿
    │   │   │── Login         登录
    │   │   │── Logo          Logo
    │   │   │── Nav           导航
    │   │   └── Search        搜索
    │   ├── Content       内容
    │   │   ├── List          音乐列表
    │   │   └── Player        播放器
    │   └── Footer        底部
    └── static        静态文件
```
