var config = {
	getApiUrl: () => {
		return 'http://eplanning.asahankab.go.id/app-2020/eperencanaan/web/index.php?r=';
	},
	getMediaUrl: () => {
		return 'http://eplanning.asahankab.go.id/app-2020/eperencanaan/web/uploads';
	},
	getRoleName: () => {
		return 'Admin_Sistem'
	},
	getEnv: () => {
		// return 'simulasi'
		return 'production'
	},
	getAppName: () => {
		return 'E-Musrenbang Backend'
	}
}
