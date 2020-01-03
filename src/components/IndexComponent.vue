<template>
	<div>
		<div class="loading-overlay" :class="{'d-none':loader}">
			<div class="loader"></div>
		</div>
		<div class="bg-dashboard" style="background-color: #eaeaea;">
			<div class="dark-overlay d-none"></div>
			<div class="logo-dashboard">
				<div class="panel-container">
					<div class="top-bar">
						<div class="container">
							<div class="col-sm-6">
								<a href="" class="brand">
								<img src="assets/logo.png" width="30px">
								&nbsp;
								<span>E-Musrenbang Kabupaten Asahan</span>
								</a>
							</div>
							<div class="col-sm-6"></div>
						</div>
					</div>
					<div class="content">
						<div class="left-sidebar"></div>
						<div class="content-section"></div>
					</div>
					<br><br>
					<center>
					<span class="footer">Copyright &copy; BAPPEDA Kabupaten Asahan 2019</span>
					</center>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			auth:{},
			user:{},
			token 			:'',
			env 			:'',
			role_name 		:'',
			loader 			:true,
			loginSuccessStatus 	:0,
			loginFailStatus		:0,
			usulanSuccessStatus	:0,
			usulanFailStatus	:0,
		}
	},
	async created(){
		this.loader = false
		this.env = window.config.getEnv()
		this.token = window.localStorage.getItem('administrator_emusrenbang')
		this.role_name = window.config.getRoleName()
		await this.authChecker()
		this.loader = true
	},
	methods: {
		async authChecker(){
			let response = await fetch(window.config.getApiUrl()+'api/auth-checker',{
				method: 'POST',
				body:JSON.stringify({token:this.token,level:this.role_name})
			})

			let data = await response.json()
			if(data.status == 'error')
			{
				window.localStorage.removeItem('administrator_emusrenbang')
				location='login.html'
			}
			else
			{
				this.user = await data.data
			}
			return data
		},
	    async doLogout(){
	    	window.localStorage.removeItem('administrator_emusrenbang')
	    	let response = await fetch(window.config.getApiUrl()+'api/logout',{
	    		method:'POST',
	    		body:JSON.stringify({token:this.token})
	    	})
	    	let data = await response.json()
	    	if(data.status == 'success')
	    		location='login.html'
	    	return
	    },
	},
}
</script>

<style type="text/css">
.upload-btn-wrapper {
  	/*position: relative;*/
  	overflow: hidden;
  	height: 0px;
  	/*display: inline-block;*/
}

.upload-btn-wrapper input[type=file] {
  	/*font-size: 100px;*/
  	/*position: absolute;*/
  	left: 0;
  	top: 0;
  	opacity: 0;
}
.image-float-action-button {
	position: absolute;
}
.image-border {
	border:1px solid #eaeaea;
}
.top-bar {
	padding: 8px;
	background-color: #28a745;
}
span.footer {
	color: #000;
}
a.brand {
	text-decoration: none;
	color: #000;
}

a.brand:hover {
	color: #333;
}
</style>