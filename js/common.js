/**
 * ajax�첽���󷵻����ݲ����ûص����� 
 * ע�⣬������õĽӿ�һ���Ƿ���json��ʽ�����ݣ�������ҳ�棬���򱨴�
 * @param typed �������ͣ�POST,GET,PUT,DELETE
 * @param url ����Ľӿ�·��
 * @param async �Ƿ��첽 ��:true,��:false
 * @param data �������
 * @param callbacktype �ص�����
 * @param checkfalg   �Ƿ���Ҫ�߹���У�� Boolean ֵ
 * @param needShowMessage  �߹���У������������쳣  �Ƿ���Ҫ�����쳣��ʾ...������Ҫ��������ajax��ʾ����Ľ���Ӱ�첻��.Ĭ��Ϊ��ʾ
 */
function getAjaxData(typed, url, async, data, callbacktype ,checkfalg,contentType,needShowMessage) {
	if(!contentType){//�����֪���������� ,Ĭ��ʹ�� 'application/x-www-form-urlencoded'
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
				  if(12029 == XMLHttpRequest.status){//��������
					  if(needShowMessage){
						  bootbox.alert("�������������������...");
					  }
					  
					}else{
						if(needShowMessage){
						  bootbox.alert("ϵͳ��æ���Ժ�...");
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
				}else{//�Զ���
					callbacktype(resultData);
				}
			 }
		});
}

/**
 * ����������ʽ��Ϊyyyy-MM-dd HH:mm:ss 
 * @returns
 */
function formatMillisecondToDate(tObj){
	if(tObj==null||tObj==""){
		return "";
	}else{
		var tim =  new Date(tObj);
		var year = tim.getFullYear(); //��
		var month = tim.getMonth() + 1; //��
		month = month < 10 ? '0' + month : month;
		var day = tim.getDate();//��
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
 * ʱ���ʽ��yyyy-MM-dd
 * @param   ʱ���ַ���
 * @returns ʱ���ַ���
 */
function format_date(tObj) {
	if(tObj==null||tObj==""){
		return "";
	}else{
        if (typeof(tObj) == 'string'){
            tObj = tObj.replace(/\-/g, "/");
        }
		var tim =  new Date(tObj);
		var year = tim.getFullYear(); //��
		var month = tim.getMonth() + 1; //��
		month = month < 10 ? '0' + month : month;
		var day = tim.getDate();//��
		day = day < 10 ? '0' + day : day;
		return year + '-' + month + '-' + day;
	}
}

/**
 * ʱ���ʽ��yyyy-MM-dd HH:mm
 * @param   ʱ���ַ���
 * @returns ʱ���ַ���
 */
function format_date_to_mm(tObj) {
	if(tObj==null||tObj==""){
		return "";
	}else{
        if (typeof(tObj) == 'string'){
            tObj = tObj.replace(/\-/g, "/");
        }
		var tim =  new Date(tObj);
		var year = tim.getFullYear(); //��
		var month = tim.getMonth() + 1; //��
		month = month < 10 ? '0' + month : month;
		var day = tim.getDate();//��
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
 * �ַ��������Ƿ�Ϊ��
 * @param str
 * @returns
 */
function strIsBlank(str){
	if(str==null||$.trim(str)=="")
		return true;
	return false;
}

/**
 * ʱ��Ƚ�
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
 * �Ƿ����ֻ������ǵ绰����
 * @returns
 */
function isPhoneOrTel(number){
   if((/^1[34578]\d{9}$/.test(number))||(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(number))) 
        return true; 
	return false;
}