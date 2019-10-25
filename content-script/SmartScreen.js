	var Related_information = []; // 总分类
	var informationFB = [];
	var informationFL = [];
	var $p;
   	document.onmouseup = function(){
		let selObj = window.getSelection();
		let textstr = selObj.toString().trim(); //划词内容
		let getUrlParam = window.location.href;
			if( textstr && textstr != "" ){ // 如划词有内容
				chrome.runtime.sendMessage({textstr,getUrlParam}, function(response) {
					//与background通讯
					if(response){
						for(var i = 0; i < response.length; i++){
							if (response[i].term_list) {
                                Related_information = response[i].term_list; //Related_information = term_list;
							}
						}
					}
					if( $('.displayInformation').length != 0){//主题有内容删除内容
						$('._Contain').children().remove();
					}
					//锁定目标
					if( $('.displayInformation').length == 0 ){ //如果没有这个元素时 -负责内容框是否展示
						console.log("我创建元素")
						$p = $( `<div class='displayInformation'>  </div>`);
						$p.append(" <div class='maintitle_lenovo'>   <div class='title_smartlenovo'>智慧识屏</div>" +
						"<div class='Close_smartlenovo'></div></div><div class='_Contain'></div>");
						$("body").append($p);

						$('.Close_smartlenovo').click(function(){
							$p.remove();
							informationFB.length = 0;
							informationFL.length = 0;
						}) //关闭按钮
					}
					Related_information.forEach((item, index) => { //检测分类
						if(item.book_list || item.film_list || item.meituan_list || item.custom_info_list || item.music_list ||item.person_list ||item.ware_list ||item.travel_poi_list ||item.custom_player_list||item.baidu_poi_list ||item.custom_team_list ||item.feiyou_flight_list||item.train_list){
							
						
						if(item.book_list){ //书籍
							console.log(item.book_list);
							var $BookRelated = $("<div class='BookRelated_lenovo' data-open-url='"+item.book_list[0].url+"'><div class='package_image'><img class='BookRelated_imgage' src='" + item.book_list[0].image 
								+ "'/></div><span class='Movie_name'> 《"+item.book_list[0].name +"》</span> <span class='Film_author'> 作者："+
								item.book_list[0].author +"</span><span class='Film_introduction'> 简介： "+item.book_list[0].summary+"</span></div>");
								$('._Contain').append($BookRelated);
								
						}
						if(item.film_list){//电影
							console.log(item.film_list);
							var $film_list = $("<div class='film_list_lenovo BookRelated_lenovo' data-open-url='"+item.film_list[0].url+"'><img class='film_list_imgage' src='" + item.film_list[0].posturl 
								+ "'/><span class='film_list_name'> "+ item.film_list[0].name +"</span> <span class='film_list_score'> 评分："
								 + item.film_list[0].point +"</span> <span class='film_list_category'> 剧情类别："+ item.film_list[0].type + 
								 "</span><span class='film_list_performer'>主演: "+  (item.film_list[0].actor||item.film_list[0].direcotr)  + "</span><span class='Film_introduction film_list_in'> 简介： "+ item.film_list[0].summary +"</span></div>");
								 $('._Contain').append($film_list);
						}
						if(item.meituan_list){//美团外卖
							console.log(item.meituan_list);
							var $meituan_list = $("<div class='BookRelated_lenovo meituan_list' data-open-url='"+item.meituan_list[0].url+"'><div class='package_image'><img class='BookRelated_imgage' src='" + item.meituan_list[0].frontimg 
								+ "'/></div><span class='Movie_name'> "+item.meituan_list[0].name +"</span> <span class='meituan_listauthor'> 评分："+          
								item.meituan_list[0].point +"</span><span class='Average_consumption'>人均消费："+ item.meituan_list[0].price +"</span><span class='meituan_introduction'> 地点： "+item.meituan_list[0].address+"</span></div>");
								$('._Contain').append($meituan_list);
						}
						if(item.music_list){ //音乐 
							console.log(item.music_list);
							var $music_list = $("<div class='BookRelated_lenovo' data-open-url='"+item.music_list[0].url+"'><div class='package_image'><img class='BookRelated_imgage' src='" + item.music_list[0].pic 
								+ "'/></div><span class='Movie_name'> "+item.music_list[0].name +"</span> <span class='Film_author'> 演唱者："+
								item.music_list[0].artist +"</span><span class='Film_introduction PlayMusic_btn'> 播放</span></div>");
								$('._Contain').append($music_list);
						}
						if(item.person_list){ //人物 
							console.log(item.person_list);
							var $person_list = $("<div class='BookRelated_lenovo' data-open-url='"+item.person_list[0].url+"'><div class='package_image'><img class='BookRelated_imgage_news' src='" + item.person_list[0].pic_url 
								+ "'/></div><span class='Movie_name'> "+item.person_list[0].name +"</span> <span class='character_job'>"+ (item.person_list[0].job||"")+"</span><span class='Film_author'>" + (item.person_list[0].birthday?"出生日期："+
								item.person_list[0].birthday :"") +"</span><span class='Film_introduction'> 简介： "+item.person_list[0].summary+"</span></div>");
								$('._Contain').append($person_list);
						}
						if(item.ware_list){ //商品
							console.log(item.ware_list);
							var $ware_list = $("<div class='BookRelated_lenovo' data-open-url='"+item.ware_list[0].url+"'><div class='package_image'><img class='BookRelated_imgage_news' src='" + item.ware_list[0].imageUrl 
								+ "'/></div><span class='Movie_name'> "+item.ware_list[0].name +"</span> <span class='character_job'> "+( item.ware_list[0].price? "价格："+item.ware_list[0].price:'')+"</span><span class='Film_author Commodity_source'> 来自："+
								item.ware_list[0].source +"</span></div>");
								$('._Contain').append($ware_list);
						}
						if(item.travel_poi_list){ //景点
							console.log(item.travel_poi_list);
							var $travel_poi_list = $("<div class='BookRelated_lenovo' data-open-url='"+item.travel_poi_list[0].url+"'><div class='package_image'><img class='BookRelated_imgage' src='" + item.travel_poi_list[0].image 
								+ "'/></div><span class='Movie_name'> "+item.travel_poi_list[0].zh_name +"</span><span class='Film_introduction Scenic_Spot'> 简介： "+item.travel_poi_list[0].description+"</span></div>");
								$('._Contain').append($travel_poi_list);
						}
						if(item.custom_player_list){//球员
							console.log(item.custom_player_list);
							var $custom_player_list = $("<div class='BookRelated_lenovo meituan_list' data-open-url='"+item.custom_player_list[0].url+"'><div class='package_image'><img class='BookRelated_imgage' src='" + item.custom_player_list[0].pic_url 
								+ "'/></div><span class='Movie_name'> "+item.custom_player_list[0].cn_name +"</span> <span class='meituan_listauthor'> 概况："+          
								item.custom_player_list[0].birthday +"</span><span class='Average_consumption'>位置："+ item.custom_player_list[0].custom_info[0].postion +"</span><span class='meituan_introduction Players_Club_Ball'> 俱乐部： "+
								item.custom_player_list[0].custom_info[0].club+"</span> <span class='Players_Record_Ball'>战绩："+ item.custom_player_list[0].custom_info[0].formatStat+"</span></div>");
								$('._Contain').append($custom_player_list);
						}
						if(item.baidu_poi_list){//百度地图
							console.log(item.baidu_poi_list);
							var $baidu_poi_list = $("<div class='BookRelated_lenovo BaiduMapCard' data-open-url='"+item.baidu_poi_list[0].url
								+"'><img class='BaiduMapimages' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543492866180&di=80eb0b5ffb0728545804c945f46f9314&imgtype=0&src=http%3A%2F%2Fi2.hexun.com%2F2017-10-28%2F191413320.jpg'/><span class='LocationName'>"+
								item.baidu_poi_list[0].name +"</span> <img class='Addressico' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543493102895&di=ae6e1204b4ab71fbf3dee04e8e91e250&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dcfb554468e10000019ae9f57803.jpg'/><span class='LocationAddressDetailed'>"+
								item.baidu_poi_list[0].address +"</span></div>")
							$('._Contain').append($baidu_poi_list);
						}
						if(item.custom_team_list){ //球队 - 皇家马德里
							console.log(item.custom_team_list);
							var $custom_team_list = $("<div class='BookRelated_lenovo meituan_list' data-open-url='"+item.custom_team_list[0].url+"'><div class='package_image'><img class='BookRelated_imgage' src='" + item.custom_team_list[0].pic_url 
								+ "'/></div><span class='Movie_name'> "+item.custom_team_list[0].name +"</span> <span class='meituan_listauthor'>"+          
								item.custom_team_list[0].custom_info[0].formatStat +"</span><span class='Average_consumption'>"+ item.custom_team_list[0].custom_info[0].formatRank +"</span><span class='Players_Record_Ball'>来源："+ item.custom_team_list[0].source+"</span></div>");
								$('._Contain').append($custom_team_list);
						}
						if(item.train_list){ //火车票
							console.log(item.train_list);
							var $train_list = $("<div class='BookRelated_lenovo BaiduMapCard' data-open-url='"+item.train_list[0].url
								+"'><span class='Airline_company'>"+item.train_list[0].id +
								"</span><span class='Aviation_model train_list_model' > "+item.train_list[0].train_type +
								"</span><span class='ViewMore_flight'>可抢票</span> <span class='flightDeptimePlanDate'> "+ item.train_list[0].start_time +"</span><span class='flightArrtimePlanDate'> "+
								item.train_list[0].end_time +"</span><img class='Addressico train_list_Addressico' src='http://img.027cgb.com/611832/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181203182934.png'/>"+
								"<img class='Addressico5' src='http://img.027cgb.com/611832/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181203183003.png'/><img class='Addressico6' src='http://img.027cgb.com/611832/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20181203183007.png'/><span class='flightDepAirport_feiyou train_list_from'>"+
								item.train_list[0].from +"</span><span class='flightArrAirport_feiyou  train_list_destination'>"+
								item.train_list[0].destination +"</span></div>")
							$('._Contain').append($train_list);
						}
						if(item.feiyou_flight_list){ //飞机票
							console.log(item.feiyou_flight_list); 
							// this.plantList.material.substring(this.plantList.material.indexOf(' ') + 1)
							var flightDeptimePlanDate = item.feiyou_flight_list[0].flightDeptimePlanDate.substring(item.feiyou_flight_list[0].flightDeptimePlanDate.indexOf(' ') + 1)
							var flightArrtimePlanDate = item.feiyou_flight_list[0].flightArrtimePlanDate.substring(item.feiyou_flight_list[0].flightArrtimePlanDate.indexOf(' ') + 1)
							var starttime = flightDeptimePlanDate.substring(0,5);
							var endsttime = flightArrtimePlanDate.substring(0,5);
							var $feiyou_flight_list = $("<div class='BookRelated_lenovo BaiduMapCard' data-open-url='"+item.feiyou_flight_list[0].url
								+"'><span class='Airline_company'>"+item.feiyou_flight_list[0].flightCompany +
								"</span><span class='Aviation_model' > "+item.feiyou_flight_list[0].flightNo +
								"</span><span class='ViewMore_flight'>查看更多</span> <span class='flightDeptimePlanDate'> "+ starttime +"</span><span class='flightArrtimePlanDate'> "+
								endsttime +"</span><img class='Addressico' src='http://img.027cgb.com/611832/Shape@1x.png'/><img class='Addressico1' src='http://img.027cgb.com/611832/Path%209%20Copy@1x.png'/><img class='Addressico2' src='http://img.027cgb.com/611832/Path%209%20Copy@1x.png'/><span class='flightDepAirport_feiyou'>"+
								item.feiyou_flight_list[0].flightDepAirport +"</span><span class='flightArrAirport_feiyou'>"+
								item.feiyou_flight_list[0].flightArrAirport +"</span></div>")
							$('._Contain').append($feiyou_flight_list);
						}
						if (index === Related_information.length-1) { //点击跳转
							console.log("我要跳转")
						}
					}
					});
					if($('._Contain').children().length == 0){//二次划词如没有相关内容
						Related_information.forEach((item, index) => {
							var str = item.token.replace(/[\ |\~|\`|\||\、|\s|\“|\”|\，|\。|\：|\`；|\！|\《|\》|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\】|\【|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\｛|\｝|\＼|\/|\?]/g,""); 
							if(str == ""){
								}else{
									var splitJumpBaidu = "https://www.baidu.com/s?wd="+item.token;
									var $aaa = $( "<div class='vocabulary_split _splitJumpBaidu' data-open-url='"+splitJumpBaidu+"'> <div class='splitMainContent'> "+ str + "</div></div>");
									$('._Contain').append($aaa);
									if (index === Related_information.length-1) { //点击跳转
										$('._splitJumpBaidu').click(function(){ //跳转百度关键字搜索
											
											window.open(splitJumpBaidu);
											
										})
									}
								}
						})
						
					}

                    $('.BookRelated_lenovo').click(function(){
                        if ($(this).data('openUrl')) {
                            window.open($(this).data('openUrl'));
                        }
                    })
					
				});
				
				 

				

			}
	   }
		 
		 
		 	document.onmousedown = function(ev){
		 		e = window.event || e;
		 		var obj1 = e.srcElement || e.target;
		 		while (obj1) {
		         if (obj1.className && obj1.className == 'displayInformation') {
		             return;
		         }
		         obj1 = obj1.parentNode;
		     }
		     $('.displayInformation').remove();
		 		
		 	}
	   

	   