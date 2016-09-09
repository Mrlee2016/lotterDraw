 (function(){
 	$(document).ready(function(){
		var lotteryDraw = {
			init:function(){
				var _self = this;
			    _self.listScroll();
			    _self.stirPin(_self,{product:"VR799",round:5}); //传参数改变中奖产品
			    _self.checkPhonenum();
			    _self.checkCodeBtn();
				_self.shareToFriends();
			    _self.closePop();
			    _self.closeSharePop();
				_self.loadBg();
			    _self.countUser();
			},
			listScroll:function(){//		名单滚动
				
//				var url = "./json/list.json";
//				$.ajax({
//				url:url,
//				beforeSend:function(){
//					 
//				},
//				dataType:"json", 
//				success:function(data){
//					 var html = "";
//					 for(var i=0; i<data.length; i++){  
//					 	html += '<li class="tbl-type center"><p class="tbl-cell t_l name">姓名:'+data[i].name+'</p> <p class="tbl-cell t_r num">电话:'+data[i].phone+'</p><p class="tbl-cell t_r prize">获得:'+data[i].prize+'</li>'; };
//					 	$(".listcont").append(html); 
//				} 
//			});

			var margintop = 0;
			var html = $(".listcont li").clone(); //模拟用，加载数据后去掉	 
			$(".listcont").append(html); //模拟用，加载数据后去掉 
			setInterval(function(){
				margintop -= 1; 
				$(".listcont").css("marginTop",margintop+"px");
				if(margintop==-629){
					$(".listcont").css("marginTop",0);
					margintop = 0;
				}
			},50);  


			},
			isMember:function(){
				return true;
			},
			stirPin:function(_self,opts){  //拨动抽奖
				var $pin = $(".pinbox img");
				var didStired = false;//是否已经抽奖
				var _ismember = _self.isMember();
				var defaults = {
					product:"cwsHardWear", //中奖产品
					round:10,//圈数  
				};
				var options = $.extend({},defaults,opts);

				var degree = {  //对应产品的角度
					oilCard5:60,
					jyktcdiq10:120,
					cwsHardWear:180,
					jyktcdiq20:240,
					VR799:300,
					washingCard:360
				};
				var productMap = {
					oilCard5:"5元加油充值券",
					jyktcdiq10:"10元抵扣券",
					cwsHardWear:"车卫士智能硬件",
					jyktcdiq20:"20元抵扣券",
					VR799:"价值799元VR一台",
					washingCard:"10元洗车券" 
				};
				var _rotate = degree[options.product] + options.round*360;//指针真实滚动度数 

				$pin.on("click", function(){
					//强制重绘
					$(".panBOx").addClass("content-empty");
					var $this = $(this);
					if($this.hasClass("rotating"))return;
					var flag = _self.didSwidth(didStired);//判断是否已经转盘
					if(flag) {
					var procuctHtml = '<p class="f16 tit t_c">恭喜您！获得<span class="product">'+productMap[options.product]+'</span></p>';
					$this.addClass("durations").css("transform","rotate("+_rotate+"deg)").addClass("rotating");
						didStired = flag;
						setTimeout(function(){
						$this.removeClass("durations").removeClass("rotating");//转盘复原
						if(didStired){

								//$(".pop").show().find(".popcont").prepend(procuctHtml);

								_ismember?$(".pop").show().addClass("ismember").find(".popcont-member").prepend(procuctHtml):$(".pop").show().removeClass("ismember").find(".popcont").prepend(procuctHtml);

							}
						frezzeBody();
						},2500);
					} 
				}); 
			},
			checkPhonenum:function(){
				$(".phonenum").on("input",function(){
					 if($(this).val().length==11 ||$(this).val()==""){ 
//						var reg = /^1(3[4-9]|4[7]|5[0-27-9]|7[08]|8[478])\d{11}$/;
						var reg = /^1\d{10}$/;
						if(reg.test($(this).val())){
							$(".formbox .errorinput").hide();
							$(".comfirm").removeAttr("disabled");
							if(!$(".checkcodebtn").hasClass("counting"))$(".checkcodebtn").removeAttr("disabled"); 
						} else {
							$(".formbox .errorinput").show();
							$(".comfirm").attr("disabled","disabled");
							$(".checkcodebtn").attr("disabled","disabled");
							}
				
					}else return;
				});
				
			},
			checkCodeBtn:function(){
				$(".checkcodebtn").on("click",function(){
					var $this = $(".checkcodebtn"); 
					var counttime = 30;//倒计时30S
					$this.attr("disabled","disabled");
					var checkCodeTimer = setInterval(function(couttime){
						if(counttime==0){
							clearInterval(checkCodeTimer);
							$this.removeClass("counting");
							$this.removeAttr("disabled").val("获取验证码");
							} else {
								counttime--; 
								$this.addClass("counting");
								$this.val(+counttime+"S重新获取");  
							} 
					},1000);
					
				});
			},
			closePop:function(){
				$(".crossBtn").on("click",function(){
					$(".pop").hide();
					scrollBody();
				});
			}, 
			closeSharePop:function(){
				$(".knowit").on("click",function(){
					$(".sharePop").hide();
					scrollBody();
				});
			},

			didSwidth:function(didStired){
				if(!didStired) 
					return true;
				else {  
					$(".sharePop").show(); 
					frezzeBody();
					return false;
				} 
			},
			shareToFriends:function(){
				$(".shareToF").on("click",function(){
					$(".sharePop").show();
					frezzeBody();
				});
			},
			loadBg:function(){
				 var bgimg = new Image();
				 bgimg.src = "./images/cityview2.jpg";
				 bgimg.onload = function(){
					 $(".top").addClass("view");
				 };
			},
			countUser:function(){
				try{
					var _storage = window.localStorage;
					var randomCount = Math.floor(Math.random()*100);
					if(!_storage.getItem("usernum"))
					{
						_storage.removeItem("usernum");
						_storage.setItem("usernum",53186);
					}
					_storage.usernum = parseInt(_storage.getItem("usernum")) + randomCount;

					$(".participator .num").text(_storage.usernum);
				} catch(e){
					console.log("用户使用私密模式浏览");
				}

				
			}
		};

		function resetPin($obj){//转盘复原
			$obj.removeClass("durations").css("transform","rotate("+0+"deg)").removeClass("rotating"); 	
		}
		function frezzeBody(){
			$("html,body").addClass("freeze");  
		}
		function scrollBody(){
			$("html, body").removeClass("freeze");
		}


 		lotteryDraw.init(); 
		}); 
	})();

 