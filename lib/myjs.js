$(function(){
	var code = 101230206;
	var t = 1531835284342;
	var c = 1531936514548;
	$("#town").on("change",function(index,val){
		code = $(this).val();
		if (code == 101230206) {
			t = 1531835284342;
			c = 1531936514548;
		}else if(code == 101230203){
			t = 1531835628309;
			c = 1531936858512;
		}		
	})
	$(".citybtn").on("click",function(){
		$(".wether").css('display','block');
		$(".morewether").css('display','block');
		console.log(code)
		$.ajax({
			url: "http://tq.360.cn/api/weatherquery/querys",
			type: "GET",
			data: {
				app:"tq360",
				code:code,
				t:t,
				c:c
			},
			dataType: "jsonp",
			jsonp: "_jsonp",
			jsonpCallback: "showData",
			success: function (data) {
				// 实时天气
				// 时间
				$(".wethertime").text(data.realtime.time + "发布");
				console.log(data);
				// 天气
				$("#weathertype").text(data.realtime.weather.info);
				// 温度
				$("#temperature").text(data.realtime.weather.temperature);

				// 更多天气
				// 日期
				$(".colora").each(function(index,val){
					$(this).text(data.weather[index+1].date);				
				});
				// 天气
				$(".icon-tu span").each(function(index,vel) {
					$(this).text(data.weather[index+1].info.day[1]);
				});
				// 温度
				$(".otherinfo span").each(function(index,vel) {
					$(this).text(data.weather[index].info.night[2]+"~"+data.weather[index].info.day[2]+"°");
					
				});
				// 风
				$(".otherinfo u").each(function(index,vel) {
					$(this).text(data.weather[index].info.day[3]);
				})	
				// 图片
				$(".icon-tu i").each(function(index,val){
					$(this).attr("class","");
					if(data.weather[index+1].info.day[1] == "多云"){
						$(this).attr("class","duoyun");
					}else if(data.weather[index+1].info.day[1] == "小雨"){
						$(this).addClass('xiaoyu');
					}else if(data.weather[index+1].info.day[1] == "阴"){
						$(this).addClass('yintian');
					}else if(data.weather[index+1].info.day[1] == "中雨"){
						$(this).addClass('zhongyu');
					}else if(data.weather[index+1].info.day[1] == "雷阵雨"){
						$(this).addClass('leizy');
					};
				});
				


			}
		});
	});

})