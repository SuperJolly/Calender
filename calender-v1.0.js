/*
* Calender
* author : Jolly
* description : 万年历
* date : 2016/4/13
* version : 1.0
 */
(function(window,undefined){
	var isToday,
		i,
	  curYM,
	  yearOpen = 0,
	  monthOpen = 0,
	  holOpen = 0,
	  focusEl;
	//一周
	var weeks = ['一','二','三','四','五','六','日'];
	//16进制表示1900-2100年份的每月农历天数
	var lunarData = 
		[0x8096D,  0x4AE,  0xA57,0x50A4D,  0xD26,  0xD95,0x40D55,  0x56A,  0x9AD,0x2095D,
		   0x4AE,0x6149B,  0xA4D,  0xD25,0x51AA5,  0xB54,  0xD6A,0x212DA,  0x95B,0x70937,
		   0x497,  0xA4B,0x5164B,  0x6A5,  0x6D4,0x415B5,  0x2B6,  0x957,0x2092F,  0x497,
		 0x60C96,  0xD4A,  0xEA5,0x50DA9,  0x5AD,  0x2B6,0x3126E,  0x92E,0x7192D,  0xC95,
		   0xD4A,0x61B4A,  0xB55,  0x56A,0x4155B,  0x25D,  0x92D,0x2192B,  0xA95,0x71695,
		   0x6CA,  0xB55,0x50AB5,  0x4DA,  0xA5B,0x30A57,  0x52B,0x8152A,  0xE95,  0x6AA,
		 0x615AA,  0xAB5,  0x4B6,0x414AE,  0xA57,  0x526,0x31D26,  0xD59,0x70B55,  0x56A,
		   0x96D,0x5095D,  0x4AD,  0xA4D,0x41A4D,  0xD25,0x81AA5,  0xB54,  0xBA6,0x612DA,
		   0x95B,  0x49B,0x41497,  0xA4B,0xA164B,  0x6A5,  0x6D4,0x615B4,  0xAB6,  0x957,
		 0x5092F,  0x497,  0x64B,0x30D4A,  0xEA5,0x80D56,  0x5AC,  0xAB6,0x5126D,  0x92E,
		   0xC96,0x41A95,  0xD4A,  0xDA5,0x20B55,  0x56A,0x7155B,  0x25D,  0x92D,0x5192B,
		   0xA95,  0xB4A,0x416AA,  0xAD5,0x90AB5,  0x4BA,  0xA5B,0x60A57,  0x52B,  0xA93,
		 0x40E95,  0x6AA,  0xAD5,0x2095B,  0x46B,0x614AE,  0xA4E,  0xD26,0x51D26,  0xD53,
		   0x5AA,0x30D6A,  0x96D,0xB095D,  0x4AD,  0xA4D,0x61A4B,  0xD25,  0xD52,0x51B54,
		   0xB5A,  0x56D,0x2059B,  0x49B,0x71497,  0xA4B,  0xAA5,0x516A5,  0x6D2,  0xADA,
		 0x30AB6,  0x937,0x8092F,  0x497,  0x64B,0x60D4A,  0xEA5,  0x6AA,0x4156C,  0xAAE,
		   0x92E,0x3192E,  0xC96,0x71A95,  0xD4A,  0xDA5,0x50B55,  0x56A,  0xA6D,0x40A5D,
		   0x52D,0x8152B,  0xD4A,  0xB4A,0x616AA,  0xAD5,  0x55A,0x414BA,  0xA5B,  0x52B,
		 0x31527,  0x693,0x70E53,  0x6AA,  0xAD5,0x509B5,  0x4B6,  0xA57,0x40A4E,  0xD16,
		 0x81D26,  0xD52,  0xDAA,0x60D6A,  0x56D,  0x4AE,0x6149D,  0xA2D,  0xD16,0x21B25,
		   0xD52];
	//甲子表
	var tbLeftYear = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
	var tbRightYear = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
	//假日表
	var tbHoliday = ['元旦','春节','清明','劳动节','端午节','中秋节','国庆节'];
	//节日表
	var tbFestival = ['世界湿地日','情人节','元宵节','国际妇女节','龙头节','植树节',
		'国际消费者权益日','世界地球日','五四青年节','母亲节','国际护士节','国际博物馆日',
		'儿童节','世界环境日','国际奥林匹克日','世界骨质疏松日','建党节','建军节','七夕节',
		'中元节','抗战胜利纪念日','教师节','重阳节','感恩节(加拿大)','寒衣节','世界学生日','下元节','感恩节(美国)',
		'世界艾滋病日','平安夜','圣诞节'];
	//农历字表
  var lunarDay = ['一','二','三','四','五','六','七','八','九','十'];
  //月份
  var months = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
  //生肖
  var ani = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
	//农历节气
	var feasts = ['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满',
	'芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至'];
	//二十四节气一年为单位，在1900-2100年，共有69中分布种类
	var feastNumber = [
		0x95A59A599AA5, 0xA5A6AA9AAAA9, 0xA9AAAEAAAAAA, 0xAAFAEEAEEAAA, 0xEAA59A599AA5, 0xA9AAAAAAAAAA, 0xEAA59A599A95, 0x95A6AA9A9AA9,
    0xA5A6AAAAAAAA, 0xAABAAEAAEAAA, 0xAAA59A599695, 0x95A69A9A9AA9, 0xA5A6AAAAAAA9, 0x95A59A9A9AA5, 0xA9AAAEAAEAAA, 0xAAA59A599555,
    0xAAA599599555, 0xAAA559599555, 0x95A59A599695, 0xAA6559559555, 0x55A59A599695, 0x95A59A9A9AA9, 0xAA5559559555, 0xA95559555555,
    0x55A599599555, 0xA95555555555, 0x55A559599555, 0xA5A6AA9A9AA9, 0xA95155555555, 0x55A559559555, 0x95A59A5996A5, 0xA55155455555,
    0x556559559555, 0x95A59A5A9AA5, 0xA55155455554, 0x555559555555, 0x55A599599695, 0x545559555555, 0x545555595555, 0x545555555555,
    0xA55155454554, 0x545155555555, 0xA55145454554, 0x545155455555, 0x955045454554, 0x505155455555, 0x955045044554, 0x505155455554,
    0x955045044550, 0x505145454554, 0x955045044150, 0x505045454554, 0x955044044140, 0x405045044554, 0x555044044140, 0x555555555555,
    0x405045044550, 0x555044044000, 0x555004004000, 0x405045044150, 0x505045054554, 0x405044044140, 0x505045044554, 0x550004000000,
    0x5044044140,   0x550000000000, 0x5044044000,   0x540000000000, 0x5044004000];
  //1900-2100年对应节气种类的序号,对应上表中的序号，一个长整型保存4年序号，每8bit一个序号（序号=0-68) 
  var yearToNum = [
  	0x10203,    0x4010503,  0x4010503,  0x6070809,  0xA0B0C09,  0xA0D0C0E,  0xA0D010E,  0xF000102,  0x10000105, 0x10000105,
    0x10000105, 0x11120708, 0x13141508, 0x13140D01, 0x16140001, 0x17180001, 0x17180001, 0x19180001, 0x191A001B, 0x1C1D1E0B,
    0x1C1D1215, 0x1F201421, 0x22232400, 0x22251800, 0x22261800, 0x22271800, 0x22271D00, 0x28291D1E, 0x2A2B1D12, 0x2C2D2024,
    0x2E2F2324, 0x302F2718, 0x302F2718, 0x302F271D, 0x302F271D, 0x3031291D, 0x32332B1D, 0x34352D23, 0x36352D37, 0x36382F37,
    0x39382F27, 0x39382F27, 0x3A383127, 0x3A3B312B, 0x3A3B3C2B, 0x3A3D3E2D, 0x3F40352D, 0x4140382F, 0x4142382F, 0x4344382F,
    0x27000000];
  //二十四节气在各月的基准日期
  var basicDate = [4, 19, 3, 18, 4, 19, 4, 19, 4, 20, 4, 20, 6, 22, 6, 22, 6, 22, 7, 22, 6, 21, 6, 21];
	var Calendar = function(target){
		return new Calendar.fn.init(target);
	};
  Calendar.fn = Calendar.prototype = {
  	init : function(target) {
  		// isToday = true;
  		return this.createView(target);
  	},
  	con : {},
  	module : {},
  	//创建日历面板
  	createView : function(settings) {
  		var sets = settings || {},
  			self = this;
  		dateConId = sets.containId || 'datePs';
  		dateCon = this.getEmt(dateConId);
  		if(!self.con.datesPicks) {
  			var datesPicks = self.con.datesPicks = self.creatEmt('div');
  			self.con.datesPicks.id = 'prt_div';
  			self.con.datesPicks.className = 'prt_div';
  			self.con.datesPicks.style.display = 'block';
  			self.con.datesPicks.style.zIndex = 9999;
  			dateCon.appendChild(self.con.datesPicks);
  			//日历html内容
  			self.con.datesPicks.innerHTML =
  			"<div id='c-header' class='tp-div-bar clearfix'>"+
  				"<div class='tp-control-bar'>"+
	  				"<div class='tp-control-module year-bar'>"+
	  					"<span id='prev-y-bar' class='prev-bar'>"+"</span>"+
	  					"<div id='select-year-bar' class='select-bar'>"+
	  						"<i class='sel-icon'></i>"+
	  						"<div id='year_field' class='year-field'>"+ new Date().getFullYear()+"年</div>"+
	  					"</div>"+
	  					"<span id='next-y-bar' class='next-bar'>"+"</span>"+
	  					"<ul id='year_list' class='year-list list-control' style='display:none;'>"+
			  				function(){
			  					var str = '';
			  					for(var i = 1900;i <= 2100;i++){
			  						str += "<li class='list-item'>" + i + "年" +"</li>";
			  					}
			  					return str;
			  				}() +
			  			"</ul>"+
			  		"</div>"+
			  		"<div class='tp-control-module month-bar'>"+
			  			"<span id='prev-m-bar' class='prev-bar'>"+"</span>"+ 
			  			"<div id='select-month-bar' class='select-bar'>"+
			  				"<i class='sel-icon'></i>"+
			  				"<div id='month_field' class='month-field'>"+ (new Date().getMonth()+1).toString() + "月</div>"+
			  			"</div>"+
			  			"<span id='next-m-bar' class='next-bar'>"+"</span>"+
			  			"<ul id='month_list' class='month-list list-control' style='display:none;'>"+
			  				function(){
			  					var str ='';
			  					for(var i = 1;i <= 12;i++){
			  						str += "<li class='list-item'>" + i + "月" +"</li>";
			  					}
			  					return str;
			  				}()+
			  			"</ul>"+
			  		"</div>"+
			  		"<div class='tp-control-module holiday-bar' id='hol-bar'>"+
			  			"<i class='sel-icon'></i>"+
			  			"<div id='hol_field' class='hol-field select-bar'>" + new Date().getFullYear()+"年假日安排" +"</div>"+
			  			"<ul id='hol_list' class='hol-list list-control' style='display:none;'>"+
			  				function(){
			  					var str = '';
			  					for(var i = 0;i < tbHoliday.length;i++)
			  					{
			  						str += "<li class='list-item'>" + tbHoliday[i] +"</li>";
			  					}
			  					return str;
			  				}()+
			  			"</ul>"+
			  		"</div>"+
			  		"<div id='backToday' class='back-day'>"+"回到今天"+"</div>"+
			  	"</div>"+
		  		"<div class='ctime-bar'>"+
		  			"<dl class='clearfix'>"+
		  				"北京时间:&nbsp;"+
			  			"<span id='cur_time' class='cur-time'>"+
			  				function(){
			  					var sT = new Date();
									sTh = sT.getHours().toString().length==1 ? '0'+sT.getHours() : sT.getHours();
			  					sTm = sT.getMinutes().toString().length==1 ? '0'+sT.getMinutes() : sT.getMinutes();
			  					sTs = sT.getSeconds().toString().length==1 ? '0'+sT.getSeconds() : sT.getSeconds();
			  					return sTh + ':' + sTm + ':' + sTs;
			  				}()+
			  			"</span>"+
			  		"</dl>"+
		  		"</div>"+
		  	"</div>"+
		  	"<div class='body-div-bar'>"+
					"<div class='cal-col-1'>"+
						"<ul class='dates-hd clearfix'>"+
							function(){
								var str = '';
								for(var i = 0;i < 7;i++)
								{
									str += "<li class='days-title'>" + weeks[i] +"</li>";
								}
								return str;
							}()+
							"</ul>"+
						"<ol id='dates_bd' class='dates-bd'>"+
							function(){
								var str = '';
								var tmp = [];
								for(var i = 0;i < weeks.length * 6;i++){
										tmp[i] = "<li><span class='hol-border'></span><div class='day-solar'></div><span class='day-lunar'></span></li>";
								}
								return tmp.join('');
							}()+
						"</ol>"+
					"</div>"+
					"<div class='cal-col-2'>"+
						"<div id='lunar-panel' class='lunar-panel'>"+
							"<div class='lunar-dates-bar'>"+
								"<span id='ln_date' class='ln-date'>"+
									function(){
										var sT = new Date();
										lum = sT.getMonth() < 9 ? '0'+(sT.getMonth()+1).toString() : (sT.getMonth()+1).toString();
										lud = sT.getDate() < 10 ? '0'+ sT.getDate() : sT.getDate();
										return new Date().getFullYear()+'-'+lum +'-'+lud;
									}()+
								"</span>"+
								"<span id='ln_weekday' class='ln-weekday'>"+
									function(){
										var tt = new Date().getDay();
										return tt==0 ? '星期日' : '星期'+weeks[tt-1];
									}()+
								"</span>"+
							"</div>"+
							"<div id='date_sp' class='date-sp'>"+ new Date().getDate() +
							"</div>"+
							"<div id='date_ln' class='date-ln'>"+
							  "<div id='g_lunar' class='g-lunar'>"+
							  "</div>"+
							  "<div id='g_ln_info' class='g-ln-info'>"+
							  "</div>"+
							  "<div class='g-ln-term'>"+
							  	"<span class='g-anim-year'>"+"["+
							  		"<em id='g_animal'>"+
							  		"</em>"+"]"+
							  	"</span>"+
							  	"<span id='g_astro' class='g-astro'>"+
							  	"</span>"+
							  "</div>"+
							"</div>"+
						"</div>"+
					"</div>"+
  			"</div>";
  			this.createModule();
  		}
  	},
  	//回到当天
  	backCurrentDay : function(e) {
  		var _this = this;
  		var date = new Date(),
  		year = date.getFullYear(),
  		month = date.getMonth(),
  		list = _this.module.calBody.getElementsByTagName('li');
  		yearField = _this.module.yearField,
  		monthField = _this.module.monthField,
  		day = date.getDate();
  		yearField.innerText = year+'年';
  		monthField.innerText = ''.concat(month+1)+'月';
  		for(var i = 0;i < list.length;i++)
  		{
  			list[i].className = '';
  		}
  		_this.showCurrentCal(year,month);
  		_this.showLunarBlock(year,month,day);
  	},
  	//前往上一月份
  	toPrevMonth : function(e){
  		var _this = this;
  		curYM = curYM || undefined;
  		var monthField = this.module.monthField,
  			yearField = this.module.yearField,
  			calBody = this.module.calBody,
  			list = calBody.getElementsByTagName('li');
  		if(curYM && ((curYM[0] == 1900 && curYM[1] > 0) || curYM[0] > 1900)){
  			curYM[1]--;
				for(var i = 0;i < list.length;i++){
					list[i].className = '';
					var ludy = list[i].getElementsByClassName('day-lunar')[0];
					ludy.setAttribute('title','');
					ludy.className = 'day-lunar';
				}
				_this.showCurrentCal(curYM[0],curYM[1]);
				monthField.innerText = ''.concat(curYM[1]+1)+'月';
				yearField.innerText = curYM[0]+'年';
			}else if(curYM[0]==1900 && curYM[1]==0){
				var self = e.target  || e.srcElement;
  			if(self.removeEventListener){
  				self.removeEventListener('click',function(){_this.toPrevMonth()});
  			}else if(self.detachEvent){
  				self.detachEvent('onclick',function(){_this.toPrevMonth();});
  			}
			}
  	},
  	//前往下一月份
  	toNextMonth : function(e) {
  		var _this = this;
  		curYM = curYM || undefined;
  		var monthField = this.module.monthField,
  			yearField = this.module.yearField,
  			calBody = this.module.calBody,
  			list = calBody.getElementsByTagName('li');
  		if(curYM && ((curYM[0] == 2100 && curYM[1]<11) || (curYM[0] <2100))){
  			curYM[1]++;
				for(var i = 0;i < list.length;i++){
					list[i].className = '';
					var ludy = list[i].getElementsByClassName('day-lunar')[0];
					ludy.setAttribute('title','');
					ludy.className = 'day-lunar';
				}
				_this.showCurrentCal(curYM[0],curYM[1]);
				monthField.innerText = ''.concat(curYM[1]+1)+'月';
				yearField.innerText = curYM[0]+'年';
			}
			else if(curYM[0] == 2100 && curYM[1] == 11 ){
  			var self = e.target || e.srcElement;
  			if(self.removeEventListener){
  				self.removeEventListener('click',function(){_this.toNextMonth()});
  			}else if(self.detachEvent){
  				self.detachEvent('onclick',function(){_this.toNextMonth();});
  			}
  		}
  	},
  	//前往上一年份
  	toPrevYear : function(e) {
  		var _this = this;
  		curYM = curYM || undefined;
  		var yearField = this.module.yearField,
  			calBody = this.module.calBody,
  			list = calBody.getElementsByTagName('li');
  		if(curYM && curYM[0]>=1901 && curYM[0]<=2100){
  			curYM[0]--;
				for(var i = 0;i < list.length;i++){
					list[i].className = '';
					var ludy = list[i].getElementsByClassName('day-lunar')[0];
					ludy.setAttribute('title','');
				}
				_this.showCurrentCal(curYM[0],curYM[1]);
				yearField.innerText = curYM[0]+'年';
  		}
  		if(curYM[0]==1900){
  			var self = e.target || e.srcElement;
  			if(self.removeEventListener){
  				self.removeEventListener('click',function(){_this.toPrevYear()});
  			}else if(self.detachEvent){
  				self.detachEvent('onclick',function(){_this.toPrevYear();});
  			}
  		}
  	},
  	//前往下一年份
  	toNextYear : function() {
  		var _this = this;
  		curYM = curYM || undefined;
  		var yearField = this.module.yearField,
  			calBody = this.module.calBody,
  			list = calBody.getElementsByTagName('li');
  		if(curYM && curYM[0]>=1900 && curYM[0]<=2099){
  			curYM[0]++;
  			for(var i = 0;i < list.length;i++){
  				list[i].className = '';
  				var ludy = list[i].getElementsByClassName('day-lunar')[0];
					ludy.setAttribute('title','');
  			}
  			_this.showCurrentCal(curYM[0],curYM[1]);
  			yearField.innerText = curYM[0]+'年';
  		}
  		if(curYM[0]==1900){
  			var self = e.target || e.srcElement;
  			if(self.removeEventListener){
  				self.removeEventListener('click',function(){_this.toNextYear();});
  			}else if(self.detachEvent){
  				self.detachEvent('onclick',function(){_this.toNextYear();});
  			}
  		}
  	},
  	//年份下拉列表
  	showYearList : function(e) {
  		var _this = this,year;
  		var yearList = this.module.yearList,
  			yearField = this.module.yearField,
  			list = this.module.calBody.getElementsByTagName('li');
  		var listItem = yearList.getElementsByTagName('li');
  		if(yearOpen==0){
  			yearList.style.display = 'block';
  			for(var i = 0;i < listItem.length;i++)
  			{
  				var self = listItem[i];
  				if(self.addEventListener)
		  			self.addEventListener('click',function(e){
		  				year = e.target.innerText.substr(0,4) || e.srcElement.innerText.substr(0,4);
		  				for(var i = 0;i < list.length;i++){
								list[i].className = '';
								var ludy = list[i].getElementsByClassName('day-lunar')[0];
								ludy.setAttribute('title','');
								ludy.className = 'day-lunar';
							}
		  				_this.showCurrentCal(year,curYM[1]);
		  				yearField.innerText = year+'年';
		  				curYM[0] = year;
		  				yearList.style.display = 'none';
		  				yearOpen=0;
		  			},false);
		  		else if(self.attachEvent)
		  			self.attchEvent('onclick',function(e){
		  				year = e.target.innerText.substr(0,4) || e.srcElement.innerText.substr(0,4);
		  				for(var i = 0;i < list.length;i++){
								list[i].className = '';
								var ludy = list[i].getElementsByClassName('day-lunar')[0];
								ludy.setAttribute('title','');
								ludy.className = 'day-lunar';
							}
		  				_this.showCurrentCal(year,curYM[1]);
		  				yearField.innerText = year+'年';
		  				curYM[0] = year;
		  				yearList.style.display = 'none';
		  				yearOpen=0});
	  		}
  		}
  		else if(yearOpen==1){
  			yearList.style.display = 'none';
  		}
  		yearOpen = (yearOpen+1)&1;
  	},
  	//月份下拉列表
  	showMonthList : function(e) {
  		var _this = this,mh;
		  var monthList = this.module.monthList,
		  	monthField = this.module.monthField,
		  	list = this.module.calBody.getElementsByTagName('li');
  		var listItem = monthList.getElementsByTagName('li');
  		if(monthOpen==0){
  			monthList.style.display = 'block';
  			for(var i = 0;i < listItem.length;i++)
  			{
  				var self = listItem[i];
  				if(self.addEventListener)
		  			self.addEventListener('click',function(e){
		  				var target = e.target || e.srcElement;
		  				mh = target.innerText.length == 2 ? target.innerText.substr(0,1)-'0' : target.innerText.substr(0,2)-'0';
		  				for(var i = 0;i < list.length;i++){
								list[i].className = '';
								var ludy = list[i].getElementsByClassName('day-lunar')[0];
								ludy.setAttribute('title','');
								ludy.className = 'day-lunar';
							}
		  				_this.showCurrentCal(curYM[0],mh-1);
		  				monthList.style.display = 'none';
		  				monthField.innerText = mh+'月';
		  				curYM[1] = mh-1;
		  				monthOpen=0;
		  			},false);
		  		else if(self.attachEvent)
		  			self.attchEvent('onclick',function(e){
		  				var target = e.target || e.srcElement;
		  				mh = target.innerText.length == 2 ? target.innerText.substr(0,1)-'0' : target.innerText.substr(0,2)-'0';
		  				_this.showCurrentCal(curYM[0],mh-1);
		  				monthList.style.display = 'none';
		  				monthField.innerText = mh+'月';
		  				curYM[1] = mh-1;
		  				monthOpen=0});
	  		}
  		}
  		else if(monthOpen==1){
  			monthList.style.display = 'none';
  		}
  		monthOpen = (monthOpen+1)&1;
  	},
  	//2016年节假日下拉列表
  	showHolList : function(e) {
  		var _this = this;
		  var holList = this.module.holList,
		  	yearField = this.module.yearField,
		  	monthField = this.module.monthField,
		  	list = this.module.calBody.getElementsByTagName('li');
  		var listItem = holList.getElementsByTagName('li');
  		if(holOpen==0){
  			holList.style.display = 'block';
  			for(var i = 0;i < listItem.length;i++)
  			{
  				var self = listItem[i];
  				if(self.addEventListener)
		  			self.addEventListener('click',function(e){
		  				for(var i = 0;i < list.length;i++){
								list[i].className = '';
								var ludy = list[i].getElementsByClassName('day-lunar')[0];
								ludy.setAttribute('title','');
								ludy.className = 'day-lunar';
							}
		  				switch(e.target.innerText || e.srcElement.innerText){
		  					case tbHoliday[0] :
		  						_this.showCurrentCal(2016,0);monthField.innerText='1'+'月';break;
		  					case tbHoliday[1] :
		  						_this.showCurrentCal(2016,1);monthField.innerText='2'+'月';break;
		  					case tbHoliday[2] :
		  						_this.showCurrentCal(2016,3);monthField.innerText='4'+'月';break;
		  					case tbHoliday[3] :
		  						_this.showCurrentCal(2016,4);monthField.innerText='5'+'月';break;
		  					case tbHoliday[4] :
		  						_this.showCurrentCal(2016,5);monthField.innerText='6'+'月';break;
		  					case tbHoliday[5] :
		  						_this.showCurrentCal(2016,8);monthField.innerText='9'+'月';break;
		  					case tbHoliday[6] :
		  						_this.showCurrentCal(2016,9);monthField.innerText='10'+'月';break;
		  				}
		  				yearField.innerText = '2016';
		  				holList.style.display = 'none';
		  				holOpen=0;
		  			},false);
		  		else if(self.attachEvent)
		  			self.attchEvent('onclick',function(e){
		  				switch(e.target.innerText || e.srcElement.innerText){
		  					case tbHoliday[0] :
		  						_this.showCurrentCal(2016,0);break;
		  					case tbHoliday[1] :
		  						_this.showCurrentCal(2016,1);break;
		  					case tbHoliday[2] :
		  						_this.showCurrentCal(2016,3);break;
		  					case tbHoliday[3] :
		  						_this.showCurrentCal(2016,4);break;
		  					case tbHoliday[4] :
		  						_this.showCurrentCal(2016,5);break;
		  					case tbHoliday[5] :
		  						_this.showCurrentCal(2016,8);break;
		  					case tbHoliday[6] :
		  						_this.showCurrentCal(2016,9);break;
		  				}
		  				holList.style.display = 'none';
		  				holOpen=0});
	  		}
  		}
  		else if(holOpen==1){
  			holList.style.display = 'none';
  		}
  		holOpen = (holOpen+1)&1;
  	},
  	//显示当前时间
  	showTimeBlock : function() {
  		var time = this.module.timeBar || undefined;
  		if(time && time.innerText!='')
  		{
  			var a = setInterval(function(){
  				var sT = new Date();
					sTh = sT.getHours().toString().length==1 ? '0'+sT.getHours() : sT.getHours();
					sTm = sT.getMinutes().toString().length==1 ? '0'+sT.getMinutes() : sT.getMinutes();
					sTs = sT.getSeconds().toString().length==1 ? '0'+sT.getSeconds() : sT.getSeconds();
  				time.innerText = sTh + ':' + sTm + ':' + sTs;
  			},1000);
  		}
  	},
  	//显示当月日历
  	showCurrentCal : function(y,m) {
  		if(m < 0){
  			y--;
  			m = 11;
  			curYM[0]--;
  			curYM[1] = 11;
  		}else if(m > 11){
  			y++;
  			m = 0;
  			curYM[0]++;
  			curYM[1] = 0;
  		}
  		var calBody = this.module.calBody,
  			onlyMonth = new Date().getMonth(),
  			onlyYear = new Date().getFullYear(),
  			date = new Date().getDate();
  		var dts = new Date();
  			dts.setFullYear(y,m);
  			dts.setDate(1);
  		var curYear = dts.getFullYear(),
  			curMonth = dts.getMonth();
  		var dayOfWeek = dts.getDay();
  		var curMonthDays = this.getSolarDays(curYear,curMonth);

  		var cali = calBody.getElementsByTagName('div');   //公历
  		var luli = calBody.getElementsByClassName('day-lunar');   //农历

  		var dy = dayOfWeek == 0 ? 6 : dayOfWeek - 1;
  		var lndy,i;
  		//本月
  		for(i = 0;i < curMonthDays;i++){
	  		lndy = this.getLunarDay(y,m,i+1);
				cali[dy+i].innerText = i + 1;
				cali[dy+i].setAttribute('date-time',curYear+'-'+''.concat(curMonth+1)+'-'+''.concat(i+1));
				if(lndy[3]==1)
					cali[dy+i].setAttribute('date-ltime','+'+lndy[1]+'-'+lndy[2]);
				else
					cali[dy+i].setAttribute('date-ltime',lndy[1]+'-'+lndy[2]);
				luli[dy+i].innerText = this.switchFont(lndy[2]);
				if(i + 1 === date && onlyMonth==curMonth && onlyYear==curYear)
  				this.addClass(cali[dy+i].parentNode,'cur-day');
  			if((dy+i-5)%7==0 || (dy+i-6)%7==0)
  				this.addClass(cali[dy+i].parentNode,'weekend');
	  	}
	  	//上月
	  	for(i = 0;i < dy;i++){
	  		var tmp = this.getSolarDays(curYear,curMonth-1) - i;

				lndy = this.getLunarDay(y,m-1,tmp);
				this.addClass(cali[dy-i-1].parentNode,'other-day');
	  		cali[dy-i-1].innerText = tmp;
				if(m < 1)
					cali[dy-i-1].setAttribute('date-time',curYear-1 + '-' + 12 + '-' + tmp);
				else
					cali[dy-i-1].setAttribute('date-time',curYear + '-' + curMonth + '-' + tmp);
				if(lndy[3]==1)
					cali[dy-i-1].setAttribute('date-ltime','+'+lndy[1]+'-'+lndy[2]);
				else
					cali[dy-i-1].setAttribute('date-ltime',lndy[1]+'-'+lndy[2]);
	  		luli[dy-i-1].innerText = this.switchFont(lndy[2]);
				if((dy-i-1)==6)
  				this.addClass(cali[dy-i-1].parentNode,'weekend');
	  	}
	  	//下月
	  	for(var i = dy+curMonthDays,j = 1;i < cali.length;i++,j++){
	  		lndy = this.getLunarDay(y,m+1,j);
	  		cali[i].innerText = j;
	  		if(m > 10)
	  			cali[i].setAttribute('date-time',''.concat(curYear+1) + '-' + 1 + '-' + j);
	  		else
	  			cali[i].setAttribute('date-time',curYear + '-' + ''.concat(curMonth+1+1) + '-' + j);
	  		if(lndy[3]==1)
	  			cali[i].setAttribute('date-ltime','+'+lndy[1]+'-'+lndy[2]);
	  		else
	  			cali[i].setAttribute('date-ltime',lndy[1]+'-'+lndy[2]);
	  		if((i-5)%7==0 || (i-6)%7==0)
  				this.addClass(cali[i].parentNode,'weekend');
	  		luli[i].innerText = this.switchFont(lndy[2]);
	  		this.addClass(cali[i].parentNode,'other-day');
	  	}
	  	this.refreshPanel(curYear,curMonth,dy);
  	},
  	//计算当年阳历并返回某一个月的天数
  	getSolarDays : function(y,m) {
  		var fbDays;
  		if(m < 0){
  			m = 11;
  			y--;
  		}else if(m > 11){
  			m = 0;
  			y++;
  		}
  		if(m === 1){
  			if((y % 4 == 0 && y % 100 !== 0) || y % 400 == 0 )
  				fbDays = 29;
  			else
  				fbDays = 28;
  		}
  		else
  			fbDays = 28;
  		var arMon = [31,fbDays,31,30,31,30,31,31,30,31,30,31];
  		return arMon[m];
  	},
  	//计算当天农历
  	getLunarDay : function(y,m,d) {
  		//针对1900年农历正月1日前即1900年阳历1月31日前的情况
  		if(y==1900 && m <= 0 && d < 31)
  			return [1899,12+m,d,0];
  		//以1900年农历正月1日为基准
  		var standard = new Date(1900,0,31);
  		//日期格式化
  		if(m < 0){
  			m = 11;
  			y--;
  		}else if(m > 11){
  			m = 0;
  			y++;
  		}
  		var curr = new Date(y,m,d);
  		//1900年距该日期的总天数
  		var allDays = (curr.getTime() - standard.getTime())/1000/3600/24 + 1;
  		//这年的农历总天数,闰月数,总农历月数
  		var lunarDays,leapMonth,totalMonths;
  		for(var i = 1900;i <= 2100;i++)
  		{
  			var lunarDays = this.getYearDays(i);
  			if(allDays <= lunarDays) {
			  	leapMonth = this.getLeapMonth(i);
					totalMonths = leapMonth ? 13 : 12;
      		// 遍历月份
		      for (var j = 0; j < totalMonths; j++) {
		      	var tmp = totalMonths - j - 1;
		        var days = lunarData[i - 1900] & (1 << tmp) ? 30 : 29;
		        // 不是 j 月
		        if (allDays > days) {
		          allDays -= days;
		        } else {
		          if (leapMonth) {  // 如果当年有闰月，还需判断
		            if (j < leapMonth)
		              return [i, j + 1, allDays, 0];
		            else if (j === leapMonth)
		              return [i, j, allDays, 1];
		            else 
		              return [i, j, allDays, 0];
		          } else {
		            return [i, j + 1, allDays, 0];  // i 年 j+1 月 allDays 日，0 表示非闰月
		          }
		        }
		      }
		    } else {
		      allDays -= lunarDays;
		    }
  		}
  	},
  	//获取指定年份的农历总天数
  	getYearDays : function(y) {
  		var leapMonth = this.getLeapMonth(y),
  			totalMonths = leapMonth ? 13 : 12;
  		var totalDays = 0;
  		for(var i = 0;i < totalMonths;i++){
  			var tmp = totalMonths - i - 1;
  			totalDays += lunarData[y - 1900] & (1 << tmp) ? 30 : 29;
  		}
  		return totalDays;
  	},
  	//获取指定年份闰月月份
  	getLeapMonth : function(y) {
  		y -= 1900;
  		var month = 0;
  		for(var i = 16;i < 20;i++)
  			month += lunarData[y] & (1 << i);
  		return month >> 16;
  	},
  	//获得当月节气日期
  	getMfDate : function(y,m) {
  		if(m < 0){
  			y--;
  			m = 11;
  		}else if(m > 11){
  			y++;
  			m = 0;
  		}
  		var yIndex = Math.floor((y-1900)/4),yInyNum = (y-1900)%4;
  		var strYear = yearToNum[yIndex].toString(2);
  		var strTmp,arr,tyFet;
  		if(strYear.length < 32 && yIndex <= 50) {
  			strTmp = '';
  			for(i = 0;i < 32 - strYear.length;i++)
  				strTmp += '0';
  			strYear = strTmp.concat(strYear);
  		}
  		strYear = parseInt(strYear.substr(yInyNum * 8,8),2);
  		tyFet = feastNumber[strYear].toString(2);
  		if(tyFet.length < 48){
  			strTmp = '';
  			for(i = 0;i < 48 - tyFet.length;i++)
      		strTmp += '0';
      	tyFet = strTmp.concat(tyFet);
  		}
  		arr = tyFet.match(/(\d{2})/g);
  		for(i = 0;i < arr.length;i++)
  			arr[i] = parseInt(arr[i],2) + basicDate[i];
  		if(y==2101 && m==0)
  			return [5,20];
  		return [arr[2*m],arr[2*m+1]];
  	},
  	//计算天干地支 返回年/月/日
  	getDizhi : function(s,t,vy,val) {
  		var p = s,q = t,v;
  		val = val || undefined;
			for(v = 1;v <= vy;v++)
  		{
  			p = (p+1)%10;
  			q = (q+1)%12;
  		}
  		if(val === undefined || val === null){
  			return tbLeftYear[p]+tbRightYear[q];
  		}
  		else{
  			if(val.length == 3){
  				//如果日期小于一月当中第一个节气,那么回退一个月
	  			if(val[2] < this.getMfDate(val[0],val[1])[0])
	  				return tbLeftYear[(p-1+10)%10]+tbRightYear[(q-1+12)%12];
	  			else
	  				return tbLeftYear[p]+tbRightYear[q];
	  		}
	  		else{
	  			if(val[1] < 31 && val[0] == 0)
	  				return tbLeftYear[(p-1+10)%10]+tbRightYear[(q-1+12)%12];
	  			else
	  				return tbLeftYear[p]+tbRightYear[q];
	  		}
  		}
  	},
  	//星座
  	getAstro : function(m,d) {
  		var astro = ['水瓶座','双鱼座','白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','山羊座'];
  		var m = m + 1;
  		switch(m){
  			case 1 :
  				return d < 20 ? astro[11] : astro[0];break;
  			case 2 :
  				return d < 19 ? astro[0] : astro[1];break;
  			case 3 :
  				return d < 21 ? astro[1] : astro[2];break;
  			case 4 :
  				return d < 20 ? astro[2] : astro[3];break;
  			case 5 :
  				return d < 21 ? astro[3] : astro[4];break;
  			case 6 :
  				return d < 21 ? astro[4] : astro[5];break;
  			case 7 :
  			  return d < 21 ? astro[5] : astro[6];break;
  			case 8 : 
  			  return d < 21 ? astro[6] : astro[7];break;
  			case 9 : 
  			  return d < 21 ? astro[7] : astro[8];break;
  			case 10 :
  				return d < 23 ? astro[8] : astro[9];break;
  			case 11 :
  				return d < 22 ? astro[9] : astro[10];break;
  			case 12 :
  				return d < 22 ? astro[10] : astro[11];break;
  		}
  	},
  	//显示指定日期
  	showSpecDate : function(e) {
  		var _this = this;
  		var dt, el = e.target || e.srcElement,
  			calBody = _this.module.calBody,
  			list = calBody.getElementsByTagName('li'),
  			dtItem = calBody.getElementsByTagName('div'),
  			monthField = _this.module.monthField;

  		var cmh = monthField.innerText.length ==2 ? monthField.innerText.substr(0,1) - '0' : monthField.innerText.substr(0,2)-'0';
  		if(focusEl != undefined || focusEl != null){
  			for(var i = 0;i < list.length;i++)
  			{
  				if(list[i].getElementsByTagName('div')[0].getAttribute('date-time') == focusEl){
						var index = list[i].className.indexOf('focus-day');
		  			if(index + 1 != 0){
		  				list[i].className = list[i].className.substring(0,index)+list[i].className.substr(index+9);
		  			}
		  		}
  			}
  		}
  		var mm = el.parentNode.getElementsByTagName('div')[0].getAttribute('date-time').split('-');
  		if(mm[1] == monthField.innerText.substr(0,1) || mm[1]==12)
  			_this.addClass(el.parentNode,'focus-day');
  		focusEl = el.parentNode.getElementsByTagName('div')[0].getAttribute('date-time');
  		if(el.className=='day-solar'){
  			dt = el.getAttribute('date-time').split('-');
  			_this.showLunarBlock(dt[0]-'0',dt[1]-'1',dt[2]-'0');
  			if(el.parentNode.className.indexOf('other-day')>=0 && (((dt[1]-cmh<0)&&(dt[1]!=12))||(dt[1]==12&&cmh==1))){
  				if(dt[1]==1 && cmh ==12){
  					_this.toNextMonth();
	  				if(focusEl != undefined || focusEl != null){
	  					for(var i = 0;i < list.length;i++){
	  						var tEm = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
	  						if(tEm == focusEl){
	  							_this.addClass(list[i],'focus-day');
	  							focusEl = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
	  						}
	  					}
	  				}
  				}
  				else{
	  				_this.toPrevMonth();
	  				if(focusEl != undefined || focusEl != null)
	  				{
	  					for(var i = 0;i < list.length;i++){
	  						var tEm = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
	  						if(tEm == focusEl)
	  						{
	  							_this.addClass(list[i],'focus-day');
	  							focusEl = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
	  						}
	  					}
	  				}
	  			}
  			}else if(el.parentNode.className.indexOf('other-day')>=0 && (((dt[1]-cmh>0)&&(dt[1]!=1))||(dt[1]==1&&cmh==12))){
  				_this.toNextMonth();
  				if(focusEl != undefined || focusEl != null){
  					for(var i = 0;i < list.length;i++){
  						var tEm = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
  						if(tEm == focusEl){
  							_this.addClass(list[i],'focus-day');
  							focusEl = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
  						}
  					}
  				}
  			}
  		}else if(el.className=='day-lunar'){
  			lsBrother = el.parentNode.getElementsByTagName('div')[0];
  			dt = lsBrother.getAttribute('date-time').split('-');
  			_this.showLunarBlock(dt[0]-'0',dt[1]-'1',dt[2]-'0');
  			if(el.parentNode.className.indexOf('other-day')>=0 && (((dt[1]-cmh<0)&&(dt[1]!=12))||(dt[1]==12&&cmh==1))){
  				if(dt[1]==1 && cmh ==12){
  					_this.toNextMonth();
	  				if(focusEl != undefined || focusEl != null){
	  					for(var i = 0;i < list.length;i++){
	  						var tEm = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
	  						if(tEm == focusEl){
	  							_this.addClass(list[i],'focus-day');
	  							focusEl = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
	  						}
	  					}
	  				}
  				}
  				else{
	  				_this.toPrevMonth();
	  				if(focusEl != undefined || focusEl != null)
	  				{
	  					for(var i = 0;i < list.length;i++){
	  						var tEm = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
	  						if(tEm == focusEl)
	  						{
	  							_this.addClass(list[i],'focus-day');
	  							focusEl = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
	  						}
	  					}
	  				}
	  			}
  			}else if(el.parentNode.className.indexOf('other-day')>=0 && (((dt[1]-cmh>0)&&(dt[1]!=1))||(dt[1]==1&&cmh==12))){
  				_this.toNextMonth();
  				if(focusEl != undefined || focusEl != null){
  					for(var i = 0;i < list.length;i++){
  						var tEm = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
  						if(tEm == focusEl){
  							_this.addClass(list[i],'focus-day');
  							focusEl = list[i].getElementsByTagName('div')[0].getAttribute('date-time');
  						}
  					}
  				}
  			}
  		}
  	},
  	//显示农历详细信息
  	showLunarBlock : function(y,m,d) {
  		var curDate = this.module.curDate,
  			curWeekDay = this.module.curWeekDay,
  			curDateNum = this.module.curDateNum,
  			lunarSpecial = this.module.lunarSpecial,
  			lunarInfo = this.module.lunarInfo,
  			lunarAnimal = this.module.lunarAnimal,
  			lunarAstro = this.module.lunarAstro;
  		var lum,lud,lndy;
			lum = m < 9 ? '0'.concat(m+1) : ''.concat(m+1);
			lud = d < 10 ? '0'+ d : d;
			lndy = this.getLunarDay(y,m,d);
			var wd =  new Date(y,m,1).getDay()==0 ? 6 : new Date(y,m,1).getDay()-1;
			var weeksDay = (d+wd)%7==0 ? '星期日' : '星期'+ weeks[(d+wd)%7-1];
			curDate.innerText = y +'-'+lum +'-'+lud;
			curWeekDay.innerText = weeksDay;
			curDateNum.innerText = d;
			if(lndy[3] == 0)
				lunarSpecial.innerText = '农历'+ months[lndy[1]-1]+'月'+this.switchFont(lndy[2]);
			else if(lndy[3] == 1)
				lunarSpecial.innerText = '农历'+ '闰' + months[lndy[1]-1]+'月'+this.switchFont(lndy[2]);

			var dates = new Date(y,m,d);
			var dzMonth = [];
  		var vy = (y-1900) % 60,vm = (y-1900) % 5 * 12 + m,vd = Math.floor((dates.getTime()-new Date(1900,0,1).getTime())/1000/3600/24%60);
			dzMonth.push(this.getDizhi(6,0,vy,[m,d]),this.getDizhi(3,1,vm,[y,m,d]),this.getDizhi(0,10,vd));
			lunarInfo.innerText = dzMonth[0]+'年'+dzMonth[1]+'月'+dzMonth[2]+'日';
			//以农历天之年最后一个字为基准，进行映射【生肖】
			var inx = tbRightYear.indexOf(dzMonth[0].substr(1));
			lunarAnimal.innerText = ani[inx]+'年';
			//找出【星座】
			lunarAstro.innerText = this.getAstro(m,d);
  	},
  	//创建组件
  	createModule : function() {
  		var	_this = this,
  			date = new Date(),
  			tYear = date.getFullYear(),
  			tMonth = date.getMonth(),
  			tDay = date.getDate();
  		_this.module = {
  			'calRoot' : _this.getEmt('prt_div'),
  			'calHead' : _this.getEmt('c-header'),
  			'ltYear' : _this.getEmt('prev-y-bar'),
  			'ntYear' : _this.getEmt('next-y-bar'),
  			'selectYear' : _this.getEmt('select-year-bar'),
  			'yearField' : _this.getEmt('year_field'),
  			'yearList' : _this.getEmt('year_list'),
  			'ltMonth' : _this.getEmt('prev-m-bar'),
  			'ntMonth' : _this.getEmt('next-m-bar'),
  			'selectMonth' : _this.getEmt('select-month-bar'),
  			'monthField' : _this.getEmt('month_field'),
  			'monthList' : _this.getEmt('month_list'),
  			'selectHol' : _this.getEmt('hol-bar'),
  			'holField' : _this.getEmt('hol_field'),
  			'holList' : _this.getEmt('hol_list'),
  			'goBack' : _this.getEmt('backToday'),
  			'timeBar' : _this.getEmt('cur_time'),
  			'calBody' : _this.getEmt('dates_bd'),
  			'lunarPanel' : _this.getEmt('lunar_panel'),
  			'curDate' : _this.getEmt('ln_date'),
  			'curWeekDay' : _this.getEmt('ln_weekday'),
  			'curDateNum' : _this.getEmt('date_sp'),
  			'curLunar' : _this.getEmt('date_ln'),
  			'lunarSpecial' : _this.getEmt('g_lunar'),
  			'lunarInfo' : _this.getEmt('g_ln_info'),
  			'lunarAnimal' : _this.getEmt('g_animal'),
  			'lunarAstro' : _this.getEmt('g_astro')
  		};
  		_this.showTimeBlock();
  		_this.showLunarBlock(tYear,tMonth,tDay);
  		_this.showCurrentCal(tYear,tMonth);
  		curYM = [tYear,tMonth];
  		_this.addEventAll();
  	},
  	//显示节气及国际节假日
  	refreshPanel : function(y,m,indexDay) {
  	  var _this = this,tmp,attr,date,dateCom,tip,dayOfWeek;
  		var calBody = _this.module.calBody,
  			solarDays = _this.getSolarDays(y,m),
  			feastDays = _this.getMfDate(y,m);
  			curMonthDays = _this.getSolarDays(y,m),
  			soli = calBody.getElementsByTagName('div'),
  			luli = calBody.getElementsByClassName('day-lunar');
  		var holdays = _this.getHolidays(y);
  		//节气
  		for(var i = 0;i < calBody.children.length;i++){
  			attr = soli[i].getAttribute('date-time');
  			date = attr.match(/\d+$/g);
  			if(i < indexDay){
  				dateCom = _this.getMfDate(y,m-1);
  				tmp = m-1;
  			}
  			else if(i >= indexDay+solarDays){
  				dateCom = _this.getMfDate(y,m+1);
  				tmp = m+1;
  			}
  			else{
  				dateCom = _this.getMfDate(y,m);
  				tmp = m;
  			}
  			if(date != null && date!= undefined){
  				if(date == dateCom[0])
  				{
  					_this.addClass(luli[i],'feast-day');
  					if(tmp==12)
  						luli[i].innerText = feasts[0];
  					else
  						luli[i].innerText = feasts[tmp*2];
  				}
  				else if(date == dateCom[1])
  				{
  					_this.addClass(luli[i],'feast-day');
  					luli[i].innerText = feasts[tmp*2+1];
  				}
  			}
  		}
  		for(var i = 0;i < calBody.children.length;i++){
  			attr = soli[i].getAttribute('date-time');
  			attrl = soli[i].getAttribute('date-ltime');
  			date = attr.substr(5);
  			// 节日
  			for(var j = 0;j < holdays.length-7;j++){
  				if(holdays[j][1]==0 && date==holdays[j][0]){                 //阳历
  					var name = holdays[j][2]==0 ? 'fest' : 'isolar';
  					luli[i].innerText = tbFestival[j];
  					luli[i].setAttribute('title',tbFestival[j]);
  					_this.addClass(luli[i].parentNode,name);
  				}
  				else if(holdays[j][1]==1 && attrl==holdays[j][0]){           //农历
  					var name = holdays[j][2]==0 ? 'fest' : 'isolar';
  					luli[i].innerText = tbFestival[j];
  					luli[i].setAttribute('title',tbFestival[j]);
  					_this.addClass(luli[i].parentNode,name);
  				}
  			}
  			//假日
  			for(var j = holdays.length-7;j < holdays.length;j++){
  				if(holdays[j][1]==0 && date==holdays[j][0]){                //阳历
  					luli[i].innerText = tbHoliday[j-31];
  					_this.addClass(luli[i].parentNode,'fest');
  					if(y==2016){
	  					if(j-31==0){                                              //元旦
	  						_this.addClass(luli[i+1].parentNode,'fest');
	  						_this.addClass(luli[i+2].parentNode,'fest');
	  						_this.addClass(luli[i].parentNode,'rest');
								_this.addClass(luli[i+1].parentNode,'rest');
								_this.addClass(luli[i+2].parentNode,'rest');
	  					}
	  					else if(j-31==2 && m==3){                                //清明
	  						_this.addClass(luli[i-2].parentNode,'fest');
	  						_this.addClass(luli[i-1].parentNode,'fest');
	  						_this.addClass(luli[i-2].parentNode,'rest');
								_this.addClass(luli[i-1].parentNode,'rest');
								_this.addClass(luli[i].parentNode,'rest');
	  					}
	  					else if(j-31==3){                                        //劳动节
	  						_this.addClass(luli[i-1].parentNode,'fest');
	  						_this.addClass(luli[i+1].parentNode,'fest');
	  						_this.addClass(luli[i-1].parentNode,'rest');
								_this.addClass(luli[i].parentNode,'rest');
								_this.addClass(luli[i+1].parentNode,'rest');
	  					}
	  					else if(j-31==5){                                        //国庆节
	  						for(var k = 1;k <= 6;k++)
	  						{
	  							_this.addClass(luli[i+k].parentNode,'fest');
	  							_this.addClass(luli[i+k].parentNode,'rest');
	  						}
	  						_this.addClass(luli[i].parentNode,'rest');
	  					}
	  				}
  				}
  				else if(holdays[j][1]==1 && attrl==holdays[j][0]){
  					luli[i].innerText = tbHoliday[j-31];
  					_this.addClass(luli[i].parentNode,'fest');
  					if(y==2016){
	  					if(j-31==1){                                             //春节
	  						for(var k = 0;k <6;k++){
	  							_this.addClass(luli[i+k].parentNode,'fest');
	  							_this.addClass(luli[i+k].parentNode,'rest');
	  						}
	  						_this.addClass(luli[i].parentNode,'rest');
	  						_this.addClass(luli[i-1].parentNode,'rest');
	  						_this.addClass(luli[i-1].parentNode,'fest');
	  					}
	  					else if(j-31==4){                                        //端午节
	  						_this.addClass(luli[i+1].parentNode,'fest');
	  						_this.addClass(luli[i+2].parentNode,'fest');
	  						_this.addClass(luli[i].parentNode,'rest');
								_this.addClass(luli[i+1].parentNode,'rest');
								_this.addClass(luli[i+2].parentNode,'rest');
	  					}
	  					else if(j-31==5){                                        //中秋节
	  						_this.addClass(luli[i+1].parentNode,'fest');
	  						_this.addClass(luli[i+2].parentNode,'fest');
	  						_this.addClass(luli[i].parentNode,'rest');
								_this.addClass(luli[i+1].parentNode,'rest');
								_this.addClass(luli[i+2].parentNode,'rest');
	  					}
  					}
  				}
  			}
  		}

  	},
  	//算出一年中的所有节假日，假日在31-37
  	getHolidays : function(y) {
  		var _this = this;
  		var holda = {};
  		for(var i = 0;i < tbFestival.length+tbHoliday.length;i++){
				holda[i] = [];
  		}
  		i = 0;
  		//holda[0]代表日期,holda[1]代表是农历日期还是公历日期,0位公历日期,1位农历日期,holda[2]表示重要性
  		while(i < tbFestival.length+tbHoliday.length){
  			switch(i){
  				case 0 :
  					holda[0] = ['2-2',0,1];break;
  				case 1 :
  					holda[1] = ['2-14',0,1];break;
  				case 2 :
  					holda[2] = ['1-15',1,0];break;
  				case 3 :
  					holda[3] = ['3-8',0,1];break;
					case 4 :
  					holda[4] = ['2-2',1,0];break;
					case 5 :
  					holda[5] = ['3-12',0,1];break;
					case 6 :
  					holda[6] = ['3-15',0,1];break;
					case 7 :
  					holda[7] = ['4-22',0,1];break;
					case 8 :
  					holda[8] = ['5-4',0,1];break;
					case 9 :
						var date = new Date();
						date.setFullYear(y);date.setMonth(4);date.setDate(1);
						var weekday = date.getDay()==0 ? 6 : date.getDay() - 1;
						var day = 14 - weekday;
  					holda[9] = ['5-'+day,0,0];break;               //母亲节(公历五月的第二个星期天)
					case 10 :
  					holda[10] = ['5-12',0,1];break;
					case 11 :
  					holda[11] = ['5-18',0,1];break;
					case 12 :
  					holda[12] = ['6-1',0,0];break;
					case 13 :
  					holda[13] = ['6-5',0,1];break;
					case 14 :
  					holda[14] = ['6-23',0,1];break;
					case 15 :
  					holda[15] = ['6-24',0,1];break;
					case 16 :
  					holda[16] = ['7-1',0,0];break;
					case 17 :
  					holda[17] = ['8-1',0,0];break;
					case 18 :
  					holda[18] = ['7-7',1,0];break;
					case 19 :
  					holda[19] = ['7-15',1,0];break;
					case 20 :
  					holda[20] = ['9-3',0,0];break;
					case 21 :
  					holda[21] = ['9-10',0,0];break;
					case 22 :
  					holda[22] = ['9-9',1,0];break;
					case 23 :
						var date = new Date();
						date.setFullYear(y);date.setMonth(9);date.setDate(1);
						var weekday = date.getDay()==0 ? 6 : date.getDay() - 1;
						var day = weekday==0 ? 8 : 15 - weekday;
  					holda[23] = ['10-'+day,0,1];break;                            //加拿大感恩节(公历十月的度过的第二个周一)
					case 24 :
  					holda[24] = ['10-1',1,1];break;
					case 25 :
  					holda[25] = ['11-17',0,1];break;
					case 26 :
  					holda[26] = ['10-15',1,1];break;
					case 27 :
						var date = new Date();
						date.setFullYear(y);date.setMonth(10);date.setDate(1);
						var weekday = date.getDay()==0 ? 6 : date.getDay() - 1;
						var day = weekday < 4 ? 25-weekday : 32-weekday;
  					holda[27] = ['11-'+day,0,1];break;                            //美国感恩节(公历十一月度过的第四个周四)
					case 28 :
  					holda[28] = ['12-1',0,1];break;
					case 29 :
  					holda[29] = ['12-24',0,0];break;
					case 30 :
  					holda[30] = ['12-25',0,0];break;
  				case 31 :
  					holda[31] = ['1-1',0];break;
  				case 32 :
  					holda[32] = ['1-1',1];break;
					case 33 :
						var qingm = _this.getMfDate(y,3)[0];
  					holda[33] = ['4-'+qingm,0];break;
					case 34 :
  					holda[34] = ['5-1',0];break;
					case 35 :
  					holda[35] = ['5-5',1];break;
					case 36 :
  					holda[36] = ['8-25',1];break;
					case 37 :
  					holda[37] = ['10-1',0];break;
  			}
  			i++;
  		}
  		holda.length = i;
  		return holda;
  	},
  	getEmt : function(id,parent) {
  		var parent = parent || document;
  		return parent.getElementById(id);
  	},
  	creatEmt : function(target,parent) {
  		var parent = parent || document;
  		return parent.createElement(target);
  	},
  	//农历数字转换为汉字
  	switchFont : function(number) {
  		if(number != undefined || number != null){
	  		if(number < 11 && number > 0){
	  			return '初' + lunarDay[number - 1];
	  		}
	  		else if(number < 21){
	  			if(number == 20)
	  				return '二十';
	  			else
	  				return '十' + lunarDay[number%10 - 1];
	  		}
	  		else{
	  			if(number == 30)
	  				return '三十';
	  			else
	  				return '廿' + lunarDay[number%10 - 1];
	  		}
	  	}
  	},
  	addClass : function(el,name) {
  		if(el.nodeType==1 && el.className === '')
  			el.className += name;
  		else
  			el.className += ' '+name;
  	},
  	addEventAll : function() {
  		var _this = this,
  			calBody = this.module.calBody,
  			ltYear = this.module.ltYear,
  			ntYear = this.module.ntYear,
  			selectYear = this.module.selectYear,
  			yearField = this.module.yearField,
  			ltMonth = this.module.ltMonth,
  			ntMonth = this.module.ntMonth,
  			selectMonth = this.module.selectMonth,
  			monthList = this.module.monthList,
  			selectHol = this.module.selecHol,
  			holField = this.module.holField,
  			goBack = this.module.goBack;

  		if(ltYear.addEventListener)
  			ltYear.addEventListener('click',function(e){_this.toPrevYear(e)},false);
  		else if(ltYear.attachEvent)
  			ltYear.attchEvent('onclick',function(e){_this.toPrevYear(e)});

  		if(ntYear.addEventListener)
  			ntYear.addEventListener('click',function(e){_this.toNextYear(e)},false);
  		else if(ntYear.attachEvent)
  			ntYear.attchEvent('onclick',function(e){_this.toNextYear(e)});

  		if(ltMonth.addEventListener)
  			ltMonth.addEventListener('click',function(e){_this.toPrevMonth(e)},false);
  		else if(ltMonth.attachEvent)
  			ltMonth.attchEvent('onclick',function(e){_this.toPrevMonth(e)});

  		if(ntMonth.addEventListener)
  			ntMonth.addEventListener('click',function(e){_this.toNextMonth(e)},false);
  		else if(ntMonth.attachEvent)
  			ntMonth.attchEvent('onclick',function(e){_this.toNextMonth(e)});

  		if(selectYear.addEventListener)
  			selectYear.addEventListener('click',function(e){_this.showYearList(e)},false);
  		else if(selectYear.attachEvent)
  			selectYear.attchEvent('onclick',function(e){_this.showYearList(e)});

  		if(selectMonth.addEventListener)
  			selectMonth.addEventListener('click',function(e){_this.showMonthList(e)},false);
  		else if(selectMonth.attachEvent)
  			selectMonth.attchEvent('onclick',function(e){_this.showMonthList(e)});

  		if(holField.addEventListener)
  			holField.addEventListener('click',function(e){_this.showHolList(e)},false);
  		else if(holField.attachEvent)
  			holField.attchEvent('onclick',function(e){_this.showHolList(e)});

  		if(goBack.addEventListener)
  			goBack.addEventListener('click',function(e){_this.backCurrentDay(e)},false);
  		else if(goBack.attachEvent)
  			goBack.attchEvent('onclick',function(e){_this.backCurrentDay(e)});

  		var item = calBody.getElementsByTagName('li');
  		for(var i = 0;i < item.length;i++){
  			var self = item[i];
  			if(self.addEventListener)
  			self.addEventListener('click',function(e){_this.showSpecDate(e)},false);
	  		else if(self.attachEvent)
	  			self.attchEvent('onclick',function(e){_this.showSpecDate(e)});
  		}
  	}
  };
  Calendar.fn.init.prototype = Calendar.fn;

	//node模块加载
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		module.exports = Calendar;
	} else {
		//作为异步模块加载
		if ( typeof define === "function" && define.amd ) {
			define( "Calendar", [], function () { return Calendar; } );
		}
	}

	//如果是window对象，而且有window.document
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Calendar = Calendar;
	}
})(window);