module.exports = {
	get(url,success){
		$.ajax({
			url:url,
			dataType:"json",
			success
		})
	},
	post(){

	}
}
