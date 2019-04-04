<template>
    <div>
        <div class="oss_file ">
            <div class="demo-upload-list" v-for="(item,i) in imgArr" :key="i">
                <template v-if="imgArr[0]">
                    <el-progress v-if="item.showProgress" :percentage="item.percentage" hide-info></el-progress>
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                        <i class="el-icon-lx-full" @click="handleView(item.url)"></i>
                        <i class="el-icon-lx-delete" @click="handleRemove(i)"></i>
                    </div>
                </template>
            </div>
            <div class="demo-upload-list imageUp_box cenFlex" v-if="(limit==1 && imgArr.length==0) || (limit>1 && limit>imgArr.length)">
                <div class="icon">
                    <i class="el-icon-lx-camera" style="font-size:24px;"></i>
                </div>
                <input type="file" :id="id" :multiple="multiple" @change="doUpload" accept="image/*" />
            </div>
        </div>
        <el-dialog :visible.sync="visible" class-name="image-modal">
            <img :src="imgUrl" v-if="visible" style="width: 100%"/>
        </el-dialog>
    </div>
</template>
<script>
    import { getOSSToken } from '@/service/serviceLcm';
export default{
  props:{
   multiple:{
    type: Boolean,
    default: () => {
        return false;
    }
   },
   imgArr:{
    type:Array,
    default: () => {
        return [];
    }
   },
   limit:{
    type:Number,
    default: () => {
        return 1;
    }
   },
   filePath:{
    type: String,
    default: () => {
        return 'whatBottle/';
    }
   },
  },
  data(){
   return{
    region:'oss-cn-hangzhou',
    bucket:'ydplatform',
    id: 'upload',
    visible:false,
    imgUrl:''
   };
  },
  methods:{
   doUpload () {
      let _this = this
      var OSS = require('ali-oss')
      getOSSToken().then(res=>{
        let result = res.data;

          const files = document.getElementById(_this.id)
          if (files.files) {
            const fileLen = document.getElementById(_this.id).files;
            let imgArr = this.imgArr || [];
            
            if(this.limit <= this.imgArr.length && this.limit !=1){
              this.$Notice.warning({
                  title: '图片超出上传限制！',
                  desc: '最多上传'+this.limit+'张，请删除替换图片后上传',
              });
              return
            }
            for (let i = 0; i < fileLen.length; i++) {
              if(this.limit <= this.imgArr.length && this.limit !=1){
                this.$Notice.warning({
                    title: '上传图片过多！',
                    desc: '最多上传'+this.limit+'张，请删除替换图片后上传',
                });
                return
              }
              let index = this.limit == 1?0:Number(this.imgArr.length);
              this.imgArr[index] = {percentage:0,url:'',showProgress:true};
              this.imgArr[index].setFlag = setInterval(()=>{
                  if(this.imgArr[index].percentage>=98){
                    clearTimeout(this.imgArr[index].setFlag)
                    return
                  }
                  this.imgArr[index].percentage+=2;
              },50)
              this.$set(this.imgArr,0,this.imgArr[0]);

              const file = fileLen[i]
              // 随机命名
              let randomName = this.filePath + _this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
              // 上传
              const client = new OSS({
                region: this.region,
                accessKeyId: result.accessKeyId,
                accessKeySecret: result.accessKeySecret,
                stsToken: result.securityToken,
                bucket: this.bucket,
              })
              new Promise((resolve, reject) => {
                client.multipartUpload(randomName, file, {
                  progress: (percentage, cpt) => {
                    // 上传进度
                    if(percentage == 1){
                      this.imgArr[index].showProgress = false;
                      this.imgArr[index].percentage = percentage*100
                      clearTimeout(this.imgArr[index].setFlag)
                    }
                  }
                }).then((results) => {
                  const url = 'http://ydplatform.oss-cn-hangzhou.aliyuncs.com/' + results.name;
                  this.imgArr[index].url = url;
                  this.$set(this.imgArr,0,this.imgArr[0])
                }).catch((err) => { console.log(err) })
              });
            }
          }
      })
      // this.$axios.get('/api/cms/article/getUploadMsg')
      //   .then((res) => {
            
      //   })
    },
    // 随机生成文件名
    random_string (len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length
      var pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    // 删除更多
    handleRemove (index) {
        console.log(index)
        this.imgArr.splice(index,1)
    },
    // 查看大图
    handleView (url) {
      console.log(url)
        this.imgUrl = url;
        this.visible = true;
    },
    
  },
  watch: {
        imgArr(list) {
            this.$emit('updata', this.imgArr);
        }
    }
 };
</script>
<style type="text/css">
.oss_file{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.oss_file input {
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    display: flex;
    flex-wrap: wrap;
}

.imageUp_box {
    width: 60px;
    height: 60px;
    min-width: 60px;
    position: relative;
    border: 1px #999 dashed;
    border-radius: 5px;
}

.demo-upload-list {
    display: inline-block;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
    margin-bottom: 10px;
}

.demo-upload-list .icon {
    width: 100%;
    height: 100%;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    margin: 0 2px;
    display: inline-block;
    font-family: Ionicons;
    position: relative;
    z-index: 999;

}

.cenFlex {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
