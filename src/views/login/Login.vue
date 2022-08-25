<template>
	<transition 
  appear
  name="animate__animated animate__bounce"
  enter-active-class="animate__fadeIn"
  leave-active-class="animate__zoomOut"
  >
    <div class="login-outer">
      <div class="login-box">
          	<el-form  class="login" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  status-icon >

			<el-form-item label="账户" prop="name" class="item" >
				<el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
			</el-form-item>
      
			
      
			<el-form-item label="密码" prop="password" class="item"  @keydown.enter.native="submitForm('ruleForm')">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off" ></el-input>
			</el-form-item>
		

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>

      <div class="tips">
        Tips:随意输入 3-10位数字/字母
      </div>
		</el-form>
      </div>
	
	</div>
  </transition>
</template>

<script>
import "animate.css";
export default {
	name: "Login",
	data() {
  
		return {
       loading:false,
		   ruleForm: {
          name: '',
          password: '',
        
        },
         rules: {
          name: [
             { required: true, message: '请输入账户'},
               { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
           
          ],
          password: [
         { required: true, message: '请输入密码'},
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
        }
		}
   
	},
  methods:{
     submitForm(formName) {
      
        this.$refs[formName].validate((valid) => {
            this.loading=true
           
          if (valid) {
            //1.验证成功 模拟发送请求用户信息头像
		        this.$store.dispatch('user/getUserInfo',this.ruleForm)
            this.loading=false
            this.$router.replace("/home")
          } else {
            console.log('error submit!!');
            this.loading=false
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style scoped>

.login-outer {
 
  position : absolute;
	width : 100%;
	height : 100%;

	background-image: url(@/assets/img/logo.jpg);
	background-size: 100% 100%;
}
.login-box{
  width: 520px;
	max-width: 100%;
 
  padding: 30px ;
  margin: 140px auto;
  
}

.tips{
  padding:0  20%;
 
}

/deep/ .item .el-form-item__label{
    color:red;
  }


</style>
