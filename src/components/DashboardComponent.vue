<template>
	<div :class="{'d-none': !(active == 'dashboard')}">
		<h3>Dashboard</h3>
		<div class="container" style="text-align: left;">
			<div class="row">
				<div class="col-md statistic-box">
					<div class="statistic-box-title">
						<h5>Usulan Desa / Kelurahan</h5>
					</div>
					<div class="statistic-box-content">
						<i class="fa fa-tasks fa-5x"></i>
						<h4 class="usulan-kelurahan">{{usulan.usulanKelurahan}}</h4>
					</div>
					<div class="statistic-box-footer">
						&nbsp;
					</div>
				</div>
				<div class="col-md statistic-box">
					<div class="statistic-box-title">
						<h5>Usulan Kecamatan</h5>
					</div>
					<div class="statistic-box-content">
						<i class="fa fa-comment fa-5x"></i>
						<h4 class="usulan-kecamatan">{{usulan.usulanKecamatan}}</h4>
					</div>
					<div class="statistic-box-footer">
						&nbsp;
					</div>
				</div>
				<div class="col-md statistic-box">
					<div class="statistic-box-title">
						<h5>Usulan Pokir</h5>
					</div>
					<div class="statistic-box-content">
						<i class="fa fa-comments fa-5x"></i>
						<h4 class="usulan-pokir">{{usulan.usulanPokir}}</h4>
					</div>
					<div class="statistic-box-footer">
						&nbsp;
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md statistic-box">
					<div class="statistic-box-title">
						<h5>Forum OPD</h5>
					</div>
					<div class="statistic-box-content">
						<i class="fa fa-support fa-5x"></i>
						<h4 class="usulan-forum">{{usulan.usulanForum}}</h4>
					</div>
					<div class="statistic-box-footer">
						&nbsp;
					</div>
				</div>
				<div class="col-md statistic-box">
					<div class="statistic-box-title">
						<h5>Total Data</h5>
					</div>
					<div class="statistic-box-content">
						<i class="fa fa-exchange fa-5x"></i>
						<h4 class="total-data">{{usulan.total}}</h4>
					</div>
					<div class="statistic-box-footer">
						&nbsp;
						<!-- <a href="#"><i class="fa fa-eye"></i> Lihat Rekapitulasi</a> -->
					</div>
				</div>
				<div class="col-md statistic-box">
					<div class="statistic-box-title">
						<h5>Total Data RKPD</h5>
					</div>
					<div class="statistic-box-content">
						<i class="fa fa-shopping-basket  fa-5x"></i>
						<h4>0</h4>
					</div>
					<div class="statistic-box-footer">
						&nbsp;
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	props: {
		active:'',
	},
	
	data(){
		return {
			apiUrl: '',
			usulan:{
				usulanKelurahan : 0,
				usulanKecamatan : 0,
				usulanPokir 	: 0,
				usulanForum 	: 0,
				total 			: 0
			}
		}
	},

	created(){
		this.apiUrl = window.config.getApiUrl()
		this.loadStatistic()
	},

	methods: {
		async loadStatistic(){
			let response = await fetch(this.apiUrl + 'api/statistic')
			let data = await response.json()
			this.usulan = data
			return data
		}
	},

	watch: { 
      	active: function(newVal, oldVal) { // watch it
      		if(newVal == 'dashboard')
      			this.loadStatistic()
          console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        }
    }
}
</script>
<style type="text/css">
.statistic-box {
    /*background-color: rgba(255,255,255,0.5);*/
    background-color: #489b4d;
    border:1px solid #eee138;
    padding-left: 0;
    padding-right: 0;
}

.statistic-box h5 {
    height: 30px;
    font-weight: bold;
    color: #FFF;
}

.statistic-box h4 {
    padding: 0;
    margin: 0;
    line-height: 1;
    color:#eee138;
    font-size: 4.5em;
    float: right;
}

.statistic-box i.fa {
    
}

.statistic-box-title, .statistic-box-content, .statistic-box-footer {
    padding: 10px;
}

.statistic-box-content {

}

.statistic-box-footer {
    text-align: right;
    background-color: #e6412a;
}

.statistic-box-footer a {
    color:#eee138;
    text-decoration: none;
    font-weight: bold;
}

.statistic-box-footer a:hover {
    color: #FFF;
}

.row.row-rekapitulasi {
    background-color: #FFF;
}

.rekapitulasi h2 {
    padding-top: 20px;
    color: #333;
}

.rekapitulasi {
    padding-top: 10px;
    padding-bottom: 10px;
}

table td,table th {
    white-space: nowrap;
}

@media only screen and (max-width: 991px) {
    .statistic-box h4 {
        font-size: 4.5em;
    }

    .statistic-box i.fa {
        margin-top: 0px;
    }
}
</style>