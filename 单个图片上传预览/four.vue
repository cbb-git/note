<template>
  <div class="alert-box-item">
		<div class="bigImg-div" @click="toGetImg">
			<img class="bigImg" :src="valueUrl" v-if="valueUrl">
		</div>
	</div>
</template>

<script>
let inputElement = null
export default {
data () {
    return {
        valueUrl: ''
    }
},
methods: {
    toGetImg() {
        		
				if (inputElement === null) {
				// 生成文件上传的控件
					inputElement = document.createElement('input')
					inputElement.setAttribute('type', 'file')
					// inputElement.setAttribute('multiple', 'multiple')

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
                    // console.log(el.target.files);
					const files = el.target.files[0]
					const isLt2M = files.size / 1024 / 1024 < 2
					const size = files.size / 1024 / 1024
					// 判断上传文件的大小
					if (!isLt2M) {
						this.$message.error('上传头像图片大小不能超过 2MB!')
					} else if (files.type.indexOf('image') === -1) { //如果不是图片格式
						// this.$dialog.toast({ mes: '请选择图片文件' });
						this.$message.error('请选择图片文件');
					} else {
						const that = this;
						const reader = new FileReader(); // 创建读取文件对象
						reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件 读取完成后会触发onload事件

                        //                                                 构造函数 构造函数的this 永远指向他的实例对象
                         reader.onload = function(event){         
                           that.valueUrl = this.result
                         }
                        //                                                 箭头函数
						// reader.onload = (event)=>{ // 文件读取完成后
						// 	// 读取完成后，将结果赋值给img的src
                        //     // event.target.result == this.result
						// 	this.valueUrl = event.target.result;
						// 	// 数据传到后台
					let formData = new FormData()
					formData.append('file', files); // 可以传到后台的数据
						// };
                        // console.log(formData.get('file'));
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
		height: 200px;
		border-radius: 100%;
		overflow: hidden;
		border: 1px solid #ddd;
	}

	.bigImg {
		display: block;
		width: 200px;
		height: 200px;
		border-radius: 100%;
	}
</style>