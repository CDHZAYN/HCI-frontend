<template>
  <div id="frame">
    <div id="flex-frame">
      <div class="padding"></div>
      <div class="part" id="part1">
        <h4>各平台账号</h4>
        <div v-for="(item, index) in zaynAccountLink" class="link-item"
             @mouseenter="splitImg(index)" @mouseleave="gatherImg(index)">
          <a :href="item.link">
            <img class="link-item-icon" :src="getImage(item.img)" alt="img" :ref="'linkItemIcon' + index"/>
            <img class="link-item-qr" :src="getImage(item.qr)" alt="qr" :ref="'linkItemQR' + index"/>
            <p>{{ item.name }}</p>
          </a>
        </div>
      </div>
      <div id="division-line"></div>
      <div class="part" id="part2">
        <h4>预约电话</h4>
        <p>17765160712</p>
        <h4>门店地址</h4>
        <p>静安寺店 | 上海市武定路327号1号楼1302</p>
        <p>陆家嘴店 | 上海市浦东南路1088号1011室</p>
      </div>
      <div class="padding"></div>
    </div>
    <div id="beian">
      <p style="display: inline-block; margin-left: 10px">版权所有 Copyright© 2023 上海泽恩心理咨询有限公司</p>
      <a target="_blank" href="https://beian.miit.gov.cn/">
        <img src="/beian.png" alt="beian" style="display: inline-block; margin-left: 10px">
        <p style="display: inline-block; margin-left: 10px;"> 桂ICP备2022008373号</p>
      </a>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "../assets/getAssetsFile.js";

export default {
  name: "Bottom",
  data() {
    return {
      zaynAccountLink: [
        {
          name: '小红书',
          img: '小红书.png',
          qr: '小红书QR.png',
          link: 'https://www.xiaohongshu.com/user/profile/5dd286130000000001001482',
        }, {
          name: '微信',
          img: '微信.png',
          qr: '微信QR.png',
          link: '###'
        }, {
          name: '豆瓣',
          img: '豆瓣.png',
          qr: '豆瓣QR.jpg',
          link: 'https://www.douban.com/people/184841006/?_i=1940996c_eXzlz'
        }, {
          name: '知乎',
          img: '知乎.png',
          qr: '知乎QR.jpg',
          link: 'https://www.zhihu.com/org/da-yu-xin-li-zi-xun-gong-zuo-shi-93'
        }, {
          name: '抖音',
          img: '抖音.png',
          qr: '抖音QR.jpg',
          link: 'https://www.douyin.com/user/MS4wLjABAAAA48I7Ro0n9MXhQY4mZZKe9gzO-0YOGyMtxMDfL_NGWaM'
        }, {
          name: '微博',
          img: '微博.png',
          qr: '微博QR.jpg',
          link: 'https://www.weibo.com/p/1006066462390220/home'
        }
      ]
    }
  },
  methods: {
    getImage(name) {
      return getAssetsFile(name)
    },
    splitImg(index) {
      let icon = this.$refs['linkItemIcon' + index][0]
      icon.style.transform = 'translateX(0)'
      let qr = this.$refs['linkItemQR' + index][0]
      qr.style.transform = 'translateX(0)'
      qr.style.opacity = '100'
    },
    gatherImg(index) {
      let frame = this.$refs['linkItemIcon' + index][0]
      frame.style.transform = 'translateX(50%)'
      let qr = this.$refs['linkItemQR' + index][0]
      qr.style.transform = 'translateX(-50%)'
      qr.style.opacity = '0'
    }
  }
}
</script>

<style scoped>

#frame {
  width: 100%;
  overflow: hidden;
  background: white;
  box-shadow: 0 1px 3px 3px rgb(0, 0, 0, .1);
  position: relative;
  bottom: 0;
  height: 400px;
}

#flex-frame {
  width: 100%;
  overflow: hidden;
  /*border-top: 2px solid rgb(115, 204, 255);*/
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.padding {
  width: 200px;
}

.part {
  width: 45vw;
  height: 350px;
  margin-top: 20px;
  /*background: #FFCA02;*/
}

#part1 {
  padding-right: 40px;
  /*display: flex;*/
  /*align-items: start;*/
}

#part1 h4 {
  margin-left: 30px;
}

#part1 .link-item {
  display: inline-block;
  /*margin: 0 10px 0 0;*/
}

#part1 .link-item a {
  color: black;
  text-decoration: none;
}

#part1 .link-item img {
  object-fit: cover;
  width: 70px;
  transition: all 0.3s ease-in-out;
}

#part1 .link-item .link-item-icon {
  transform: translateX(50%);
  position: relative;
  z-index: 1;
}

#part1 .link-item .link-item-qr {
  opacity: 0;
  transform: translateX(-50%);
}

#part1 .link-item p {
  text-align: center;
  margin: 3px 0 15px 0;
}

#part2 {
  padding-left: 40px;
}

#part2 p {
  line-height: 16px;
}

#division-line {
  background-image: linear-gradient(to bottom, rgb(225, 94, 145) 20%, rgb(115, 204, 255) 80%);
  width: 4px; /*设置宽高*/
  height: 300px;
}

#beian {
  text-align: center;
  width: 100%;
  /*padding-bottom: 10px;*/
}

#beian a {
  color: black;
}

#beian p {
  font-size: 13px;
  display: inline-block;
}

#beian img {
  display: inline-block;
  width: 13px;
  object-fit: cover;
}
</style>