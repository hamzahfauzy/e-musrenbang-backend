<template>
	<div :class="{'d-none': !(active == 'desa')}">
		<div style="display: inline-block;float: left;">
			<h3>Desa / Kelurahan</h3>
		</div>
		<div style="display: inline-block;float: right;">
			<div class="form-group form-inline">
				<label>Cari : &nbsp;</label>
				<input type="text" name="keyword" v-model="keyword" class="form-control">
			</div>
		</div>
		<div class="clearfix"></div>
		<div style="text-align: left;background-color: #FFF;">
			<table class="table table-bordered table-striped" id="table-desa">
				<thead style="background-color: #eee138;">
					<tr class="sort-table">
						<th>#</th>
						<th @click="sortTable(1)">Nama Desa / Kelurahan</th>
						<th @click="sortTable(2)">Kecamatan</th>
						<th @click="sortTable(3)">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(list,index) in filteredLists">
						<td>{{++index}}</td>
						<td>{{list.desa.Nm_Kel}}</td>
						<td>{{list.kecamatan.Nm_Kec}}</td>
						<td><span class="badge badge-success" v-if="list.acara && list.acara.Waktu_Mulai && list.acara.Waktu_Selesai">Musrenbang Selesai</span>
							<span class="badge badge-warning" v-else-if="list.acara && list.acara.Waktu_Mulai && list.acara.Waktu_Selesai == 0">Sedang Musrenbang</span>
							<span class="badge badge-secondary" v-else>Belum Musrenbang</span>
						</td>
					</tr>
				</tbody>
			</table>
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
			keyword: '',
			usulan:{
				usulanKelurahan : 0,
				usulanKecamatan : 0,
				usulanPokir 	: 0,
				usulanForum 	: 0,
				total 			: 0
			},
			lists: [],
			_lists: {},
		}
	},

	created(){
		this.apiUrl = window.config.getApiUrl()
		this.loadData()
	},

	methods: {
		async loadData(){
			var param = '&Kd_Prov=12&Kd_Kab=09'
			let response = await fetch(this.apiUrl + 'api/get-all-desa'+param)
			let data = await response.json()
			this.lists = data
			return data
		},
		sortTable(index) {
		  var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("table-desa");
		  switching = true;
		  /*Make a loop that will continue until
		  no switching has been done:*/
		  while (switching) {
		    //start by saying: no switching is done:
		    switching = false;
		    rows = table.rows;
		    /*Loop through all table rows (except the
		    first, which contains table headers):*/
		    for (i = 1; i < (rows.length - 1); i++) {
		      //start by saying there should be no switching:
		      shouldSwitch = false;
		      /*Get the two elements you want to compare,
		      one from current row and one from the next:*/
		      x = rows[i].getElementsByTagName("TD")[index];
		      y = rows[i + 1].getElementsByTagName("TD")[index];
		      //check if the two rows should switch place:
		      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
		        //if so, mark as a switch and break the loop:
		        shouldSwitch = true;
		        break;
		      }
		    }
		    if (shouldSwitch) {
		      /*If a switch has been marked, make the switch
		      and mark that a switch has been done:*/
		      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      switching = true;
		    }
		  }
		}
	},
	computed: {
		filteredLists(){
			var searchVal = this.keyword.toLowerCase()
			return this.lists.filter(list => {
		        return list.desa.Nm_Kel.toLowerCase().indexOf(searchVal) != -1 || list.kecamatan.Nm_Kec.toLowerCase().indexOf(searchVal) != -1
		    })
		}
	},
	watch: { 
      	active: function(newVal, oldVal) { // watch it
      		if(newVal == 'desa')
      			this.loadData()
        }
    }
}
</script>