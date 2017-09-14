var Utils = {
	
	//数据模块
	datas : {
		successFlag : "success"
	},
	//AJAX
	ajax : function(url,async,data,successCallback,faildCallback){
		var formatData = {params : data};
		if (data == null) {
			var temp = { unused : "" };
			formatData = { params : temp };
		}
		$.ajax({
			type : "post",
			url : url,
			async: async,
			dataType:'json',
			contentType:'application/json',
			data : JSON.stringify(formatData),
			success : function(data){
				if (Utils.datas.successFlag == data.result) {
					if (successCallback != null) {
						successCallback(data);
					}
				} else {
					if (faildCallback != null) {
						faildCallback(data);
					} 
				}
			},
			error :function(data){
				//nope
			}
		});
	}
};