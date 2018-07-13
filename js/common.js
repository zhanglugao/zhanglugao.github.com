/**
 * ajax异步请求返回数据并调用回调方法 
 * 注意，这里调用的接口一定是返回json格式的数据，不能是页面，否则报错
 * @param typed 请求类型，POST,GET,PUT,DELETE
 * @param url 请求的接口路径
 * @param async 是否异步 是:true,否:false
 * @param data 请求参数
 * @param callbacktype 回调方法
 * @param checkfalg   是否需要走公共校验 Boolean 值
 * @param needShowMessage  走公用校验是如果出现异常  是否需要进行异常提示...这里主要用于批量ajax提示问题的交互影响不好.默认为提示
 */
function getAjaxData(typed, url, async, data, callbacktype ,checkfalg,contentType,needShowMessage) {
	if(!contentType){//如果不知道请求类型 ,默认使用 'application/x-www-form-urlencoded'
		contentType='application/x-www-form-urlencoded';
	}
	if(typeof needShowMessage === 'undefined'){
		needShowMessage =true;
	}
	 $.ajax({
			type : typed,
			url : url,
			data : data,
			dataType:"json",
			async:async,
			cache:false,
			contentType: contentType,
			scriptCharset:'utf-8',
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				  if(12029 == XMLHttpRequest.status){//网络问题
					  if(needShowMessage){
						  bootbox.alert("您的网络出现问题请检查...");
					  }
					  
					}else{
						if(needShowMessage){
						  bootbox.alert("系统繁忙请稍后...");
						}
				    }
			},
			success : function(resultData) {
				console.log(resultData);
                console.log(checkfalg);
				if(checkfalg && resultData ){
				    console.log(needShowMessage);
					if(resultData.code=='SUCCESS'){
						callbacktype(resultData.data); 
					}else if (resultData.code=='ILLEGAL_SESSION') {
						if(timeoutCount==0){
							timeoutCount ++;
							window.top.location="/";
							return ;
						}
					}else{
						if(needShowMessage){
							 bootbox.alert(resultData.message);
						}
				    }
				}else{//自定义
					callbacktype(resultData);
				}
			 }
		});
}

/**
 * 将毫秒数格式化为yyyy-MM-dd HH:mm:ss 
 * @returns
 */
function formatMillisecondToDate(tObj){
	if(tObj==null||tObj==""){
		return "";
	}else{
		var tim =  new Date(tObj);
		var year = tim.getFullYear(); //年
		var month = tim.getMonth() + 1; //月
		month = month < 10 ? '0' + month : month;
		var day = tim.getDate();//日
		day = day < 10 ? '0' + day : day;
		var hour = tim.getHours();
	 	var minute = tim.getMinutes();
	 	var second = tim.getSeconds();
	 	hour = hour <10 ? '0' + hour : hour;
	 	minute = minute <10 ? '0' + minute : minute;
		second = second <10 ? '0' + second : second;
		return year + '-' + month + '-' + day+" "+hour+":"+minute+":"+second;
	}
}


/**
 * 时间格式化yyyy-MM-dd
 * @param   时间字符串
 * @returns 时间字符串
 */
function format_date(tObj) {
	if(tObj==null||tObj==""){
		return "";
	}else{
        if (typeof(tObj) == 'string'){
            tObj = tObj.replace(/\-/g, "/");
        }
		var tim =  new Date(tObj);
		var year = tim.getFullYear(); //年
		var month = tim.getMonth() + 1; //月
		month = month < 10 ? '0' + month : month;
		var day = tim.getDate();//日
		day = day < 10 ? '0' + day : day;
		return year + '-' + month + '-' + day;
	}
}

/**
 * 时间格式化yyyy-MM-dd HH:mm
 * @param   时间字符串
 * @returns 时间字符串
 */
function format_date_to_mm(tObj) {
	if(tObj==null||tObj==""){
		return "";
	}else{
        if (typeof(tObj) == 'string'){
            tObj = tObj.replace(/\-/g, "/");
        }
		var tim =  new Date(tObj);
		var year = tim.getFullYear(); //年
		var month = tim.getMonth() + 1; //月
		month = month < 10 ? '0' + month : month;
		var day = tim.getDate();//日
		day = day < 10 ? '0' + day : day;
		var hour = tim.getHours();
	 	var minute = tim.getMinutes();
	 	var second = tim.getSeconds();
	 	hour = hour <10 ? '0' + hour : hour;
	 	minute = minute <10 ? '0' + minute : minute;
	 	second=second<10?'0'+second:second;
		return year + '-' + month + '-' + day+" "+hour+":"+minute+":"+second;
	}
}

/**
 * 字符串对象是否为空
 * @param str
 * @returns
 */
function strIsBlank(str){
	if(str==null||$.trim(str)=="")
		return true;
	return false;
}

/**
 * 时间比较
 * @param startTime
 * @param endTime
 * @returns
 */
function compareTime(startTime, endTime){
 	var start = new Date(startTime.replace("-","/").replace("-","/")),
 	    end = new Date(endTime.replace("-","/").replace("-","/"));
 	if (end < start) {
 		return false;
 	}
 	return true;
}

/**
 * 是否是手机或者是电话号码
 * @returns
 */
function isPhoneOrTel(number){
   if((/^1[34578]\d{9}$/.test(number))||(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(number))) 
        return true; 
	return false;
}