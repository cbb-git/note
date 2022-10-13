<template>
  <div class="alert-box-item">
		<div class="bigImg-div" >
            <div class="box" @click="toGetImg">点击预览多张图片</div>
			<img class="bigImg" v-for="(item,index) in valueUrl" :key="index" :src="item" >
		</div>
	</div>
</template>

<script>
let inputElement = null
export default {
data () {
    return {
        valueUrl: []
    }
},
methods: {
    toGetImg() {
        		
				if (inputElement === null) {
				// 生成文件上传的控件
					inputElement = document.createElement('input')
					inputElement.setAttribute('type', 'file')
					inputElement.setAttribute('multiple', 'multiple')
					inputElement.style.display = 'none'
                //    兼容处理
					if (window.addEventListener) {
						inputElement.addEventListener('change', this.uploadFile, false)
					} else {
						inputElement.attachEvent('onchange', this.uploadFile)
					}

					document.body.appendChild(inputElement)
				}
				inputElement.click()
			},
			uploadFile(el) {
   
				if (el && el.target && el.target.files && el.target.files.length > 0) {
                    let isLt2M = []
					const files = el.target.files
                     for(let i =0;i<files.length;i++){
                       isLt2M.push(files[i].size / 1024) 
                       if(isLt2M > 2048){
	                      this.$message.error('上传头像图片大小不能超过 2MB!')// 判断上传文件的大小
                       }else if(files[i].type.indexOf('image') === -1){
                           this.$message.error('请选择图片文件' );  //如果不是图片格式
                       }else{
                             const that = this;
                        const reader = new FileReader();
                       
                       reader.readAsDataURL(el.target.files[i]);
                       reader.onload = (event)=>{         
                           this.valueUrl.push(event.target.result)  
                       
                       }
                       }
                     }	
				}
			},
	

},
beforeDestroy() {
		    if (inputElement) {
		      if (window.addEventListener) {
		        inputElement.removeEventListener('change', this.onGetLocalFile, false)
		      } else {
		        inputElement.detachEvent('onchange', this.onGetLocalFile)
		      }
		      document.body.removeChild(inputElement)
		      inputElement = null
		    }
		  }
}
</script>

<style>
.alert-box-item {
		overflow: hidden;
	}

	.bigImg-div {
		width: 200px;
	}

	.bigImg {
		display: block;
		width: 200px;
		height: 200px;
		border-radius: 100%;
	}
    .box {
        cursor: pointer;
    }
</style>