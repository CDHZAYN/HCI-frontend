<template>
  <div id="banner-frame">
    <div id="shadow">
      <img :src="detail.profile"/>
      <div id="text-frame">
        <div id="title-frame">
          <h1>{{detail.name}}</h1>
          <div>
            <h2>{{ positionMap[detail.position] }}</h2>
            <h2>{{detail.location}}</h2>
          </div>
        </div>
        <div id="award-frame">
          <div v-for="item in detail.award" class="award-item-frame"
               :style="{'background-image': `URL(${getImg('麦穗.png')})`}">
            <p v-html="item"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="main-frame">
    <div v-if="detail.introduction">
      <h1>个人简介</h1>
      <p v-html="detail.introduction.replaceAll('\n', '<br/>')"></p>
    </div>
    <div v-if="detail.field">
      <h1>擅长领域</h1>
      <p v-html="detail.field.replaceAll('\n', '<br/>')"></p>
    </div>
    <div v-if="detail.method">
      <h1>咨询流派与方式</h1>
      <p v-html="detail.method.replaceAll('\n', '<br/>')"></p>
    </div>
    <div v-if="detail.price">
      <h1>费用说明</h1>
      <p v-html="detail.price.replaceAll('\n', '<br/>')"></p>
    </div>
    <div v-if="detail.poison">
      <h1>给来访者的话</h1>
      <p v-html="detail.poison.replaceAll('\n', '<br/>')"></p>
    </div>
    <div id="confirm-button-frame">
      <el-button @click="toSingle" class="button" v-if="hasSingleBook">预约单人咨询</el-button>
      <el-button @click="toMulti" class="button" v-if="hasMultiBook">预约多人咨询</el-button>
    </div>
  </div>
</template>

<script>
import getAssetsFile from "../../assets/getAssetsFile.js";

export default {
  name: "CounselorDetail",
  data() {
    return {
      award: ['华东师大<br>应用心理硕士', '国家二级<br>心理咨询师', '上海市<br>心理学会会员', '加州健康研究院<br>认证正念师资'],
      positionMap: ['专业咨询师', '专家级咨询师', '资深级咨询师', '督导级咨询师'],
      detail: {},

      hasSingleBook: false,
      hasMultiBook: false
    }
  },
  methods: {
    getImg(name) {
      return getAssetsFile(name)
    },
    toSingle(){
      localStorage.setItem('bookType', '0')
      localStorage.setItem('counselorName', this.detail.name)
      window.location.href="/book";
    },
    toMulti(){
      localStorage.setItem('bookType', '1')
      localStorage.setItem('counselorName', this.detail.name)
      window.location.href="/book";
    }
  },
  mounted() {
    this.$request.get('/counselor/detail', {
      params: {
        counselorId: this.$route.params.counselorId,
      }
    }).then(res => {
      this.detail = res.msg
      this.$request.post('/counselorBook/date', {
        counselorId: [this.detail.id],
        type: '单人咨询'
      }).then(res=>{
        console.log(res)
        if(res.msg){
          this.hasSingleBook = true
        }
      })
      this.$request.post('/counselorBook/date', {
        counselorId: [this.detail.id],
        type: '多人咨询'
      }).then(res=>{
        if(res.msg){
          this.hasMultiBook = true
        }
      })
    })

  }
}
</script>

<style scoped>

#banner-frame {
  width: 100%;
  height: 400px;
  margin: 40px 0;
  overflow: hidden;
}

#shadow {
  height: 400px;
  width: 106vw;
  transform: translate(-3vw);
  display: flex;
  justify-content: center;
  box-shadow: inset 0 0 10px grey;
}

#banner-item-frame img {
  width: 400px;
  height: 400px;
  object-fit: cover;
}

#text-frame {
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#title-frame {
  display: flex;
  align-items: center;
  margin: 0 auto
}

#title-frame h1 {
  font-size: 80px;
  margin: 0 20px 0 0;
}

#title-frame h2 {
  font-size: 26px;
  font-weight: normal;
  margin: 0;
}

#award-frame {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.award-item-frame {
  width: 250px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: contain;
  background-repeat: no-repeat;
}

#award-frame p {
  text-align: center;
  transform: translateY(-5px);
}

#main-frame {
  padding: 0 200px 50px 200px;
}


#confirm-button-frame {
  text-align: center;
}

#confirm-button-frame .button {
  margin-top: 10px;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border-color: unset;
  background-image: -webkit-linear-gradient(bottom left, var(--pink) 30%, var(--blue) 70%);
  font-weight: bold;
  color: white;
}

#confirm-button-frame .button:hover {
  background-image: -webkit-linear-gradient(bottom left, var(--light-pink) 30%, var(--light-blue) 70%);
  color: white;
}

#confirm-button-frame .button:active {
  background-image: -webkit-linear-gradient(bottom left, rgb(194, 80, 125) 30%, rgb(76, 135, 168) 70%);
  color: white;
}

</style>