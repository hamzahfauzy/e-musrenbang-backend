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
						<div class="container-fluid">
							<div class="row">
								<div class="col-4">
									<a href="" class="brand">
									<img src="assets/logo.png" width="40px">
									&nbsp;
									<span>E-Musrenbang Kabupaten Asahan</span>
									</a>
								</div>
								<div class="col-8">
									<ul class="navbar" style="float: right;">
										<li><a href="javascript:void(0)" :class="{'active':activeForm=='dashboard'}" @click="changeActiveForm('dashboard')"><i class="fa fa-fw fa-home"></i> Dashboard</a></li>
										<li><a href="javascript:void(0)" :class="{'active':activeForm=='desa'}" @click="changeActiveForm('desa')"><i class="fa fa-fw fa-list"></i> Desa</a></li>
										<li><a href="javascript:void(0)" :class="{'active':activeForm=='kecamatan'}" @click="changeActiveForm('kecamatan')"><i class="fa fa-fw fa-list"></i> Kecamatan</a></li>
										<li><a href="javascript:void(0)" :class="{'active':activeForm=='a'}" @click=""><i class="fa fa-fw fa-list"></i> OPD</a></li>
										<li><a href="javascript:void(0)" :class="{'active':activeForm=='a'}" @click=""><i class="fa fa-fw fa-users"></i> Users</a></li>
										<li><a href="javascript:void(0)" @click="doLogout()"><i class="fa fa-fw fa-sign-out"></i> Log Out</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div style="padding-top: 70px;"></div>
					<div class="content container">
						<dashboard :active='activeForm' />
						<desa :active='activeForm' />
						<kecamatan :active='activeForm' />
					</div>
					<br><br>
					<center>
					<span class="footer">Copyright &copy; BAPPEDA Kabupaten Asahan 2019</span>
					</center>
					<br><br>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DashboardComponent from './DashboardComponent'
import DesaComponent from './DesaComponent'
import KecamatanComponent from './KecamatanComponent'
export default {
	components: {
		'dashboard':DashboardComponent,
		'desa':DesaComponent,
		'kecamatan':KecamatanComponent,
	},
	data(){
		return {
			auth:{},
			user:{},
			activeForm 		:'dashboard',
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
		this.activeForm = window.localStorage.getItem('administrator_emusrenbang_active_form') ? window.localStorage.getItem('administrator_emusrenbang_active_form') : 'dashboard'
		this.role_name = window.config.getRoleName()
		this.loader = false
		await this.authChecker()
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
				this.loader = true
			}
			return data
		},
	    async doLogout(){
	    	Swal.fire({
			  title: 'Log Out Confirmation',
			  text: "Apakah anda yakin untuk keluar dari aplikasi ?",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yakin!'
			}).then(async (result) => {
			  if (result.value) {
			    window.localStorage.removeItem('administrator_emusrenbang')
		    	let response = await fetch(window.config.getApiUrl()+'api/logout',{
		    		method:'POST',
		    		body:JSON.stringify({token:this.token})
		    	})
		    	let data = await response.json()
		    	if(data.status == 'success')
		    		location='login.html'
		    	return
			  }
			})
	    	
	    },
	    changeActiveForm(form){
	    	this.activeForm = form
	    	window.localStorage.setItem('administrator_emusrenbang_active_form',form)
	    }
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
	background-color: #28a745;
	position: fixed;
	width: 100%;
	top: 0;
}
span.footer {
	color: #000;
}
a.brand {

}
a.brand, ul.navbar li a {
	text-decoration: none;
	color: #FFF;
	font-weight: bold;
	padding: 8px;
	display: inline-block;
}
a.brand:hover, ul.navbar li a:hover {
	color: #efefef;
}
ul.navbar, ul.akun {
	padding: 0;
	margin: 0;
	list-style-type: none;
}
ul.navbar li a {
	padding: 16px 12px;
}
ul.navbar li a.active {
	background-color:red;
}
.content {
	margin-top: 15px;
	padding: 15px;
	color: #333;
}
tr.sort-table th {
	cursor: pointer;
}
</style>