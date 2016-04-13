====	Calender 个人万年历 (插件皮肤以及内容布局来自于360搜索)
<br>
一个自己制作的日历小插件,只需给index.html里加入一个<div class='cal-gl'>块,自定义id,并写入一段
<br>
```javascript
<script>Calender({'containId':'自定义id名'});</script>
```javascript
<br>
,便可以使用。
<br>
###`源代码说明`###
<br>
----全局变量----
<br>
>>#### curYM : 当前日历所显示的年月,类型为Array。
>>#### yearOpen : 当前年份下拉列表是否打开,类型为Number。
>>#### monthOpen : 当前月份下拉列表是否打开,类型为Number。
>>#### holOpen : 当前假日下拉列表是否打开,类型为Number。
>>#### focusEl : 当前显示的焦点日期的date-time属性值.类型为String。
>>#### weeks : 一周天数,类型为Array。
>>#### lunarData : 1900-2100年份的农历数据,一年一个单位,每4bit为一个月份,若这一年有闰月,则用高四位表示闰月月份。类型为Array。
>>#### tbLeftYear,tbRightYear : 中国六十甲子表,类型为Array。
>>#### tbHoliday : 中国法定节假日,类型为Array。
>>#### tbFestival : 国际节日,类型为Array。
>>#### lunarDay : 汉字数字,用来表示农历日期。类型为Array。
>>#### months : 一年中的所有月份,类型为Array。
>>#### ani : 十二生肖,类型为Array。
>>#### feasts : 农历二十四节气,类型为Array。
>>#### feastNumber : 1900-2100年,所有节气的分布种类,共69种,类型为Array。
>>#### yearToNum : 1900-2100年,每一年对应节气种类的序号，每个单位保存四年序号,每8bit为一个序号,类型为Array。
>>#### basicDate : 二十四节气在各月的基准日期,类型为Array。
<br>
# 主要方法的实现#
>>#### init : 作为入口方法调用。
>>#### createView : 接收id参数值,动态渲染并初始化html内容。
>>#### createModule : 创建一个对象,并将各个模块添加为对象的属性,调用四个模块,分别为显示当前北京时间、显示当前农历块、显示当前月份日历面板、注册可操作事件,更新当前全局变量curYM。
>>#### showTimeBlock : 显示当前北京时间。
>>#### showLunarBlock : 显示农历详细时间及生肖年,并获取这一天的星座。
>>#### showCurrentCal : 显示当前年月的日历面板。()
>>#### addEventAll : 注册所有可操作事件,包括调整年份、调整月份、显示2016年节假日安排、回到当天、切换至某一天等操作。
>>#### showSpecDate : 显示特定日期(解决了点击本月中存在的上、下月日期跳转至该月的问题,根据date-time属性值来判断)
<br>
## 接口方法说明 ##
>>##### addClass : 一个为某个类添加类的接口方法。
>>##### switchFont : 将阿拉伯数字日期转换为汉字日期的接口方法。
>>##### creatEm : 为某个元素创建元素的接口方法。
>>##### getEmt : 获得某个元素的id的接口方法。
>>##### getHolidays : 获取某一年中所有节假日的接口方法。(定义了一个数组,向数组添加了这一年中所有节假日的数据)
>>##### refreshPanel : 向日历面板渲染属于节气、节假日的日期,优先级从低至高。(这里解决了可同时显示上月下月节气日期的问题,根据date-time和date-ltime属性值来判断)
>>##### getAstro : 获取某一天的星座的接口方法。
>>##### getDizhi : 计算某年某月某日的天干地支月。(涉及到访问某个节气日期的方法)
>>##### getMfDate : 获取某年某月的节气日期。
>>##### getLeapMonth : 获取某年的闰月月份,若无,返回0
>>##### getYearDays : 获取某一年的农历总天数。
>>##### getLunarDay : 获得某天的农历日期(阿拉伯数字形式)
>>##### getSolarDays : 获取某年某月的公历天数
<br>
### 事件回调方法 ###
>###### `所有回调事件要注意在调用显示日历模块时重置以前的className以及更新年份域值和月份域值`
>>##### backCurrentDay : 回到当天。
>>##### toPrevMonth : 前往上一个月。(注意边界值,取消事件监听)
>>##### toNextMonth : 前往下一个月。(注意边界值,取消事件监听)
>>##### toPrevYear : 前往上一年份。(注意边界值,取消事件监听)
>>##### toNextYear : 前往下一年份。(注意边界值,取消事件监听)
>>##### showYearList : 选择某一年份。
>>##### showMonthList : 选择某一月份。
>>##### showHolList : 选择某一个节假日。