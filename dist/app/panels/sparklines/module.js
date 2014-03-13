/*! kibana - v3.0.0milestone5 - 2014-03-13
 * Copyright (c) 2014 Rashid Khan; Licensed Apache License */

define("panels/sparklines/interval",["kbn"],function(a){function b(b){this.string=b;var c=a.describe_interval(b);this.type=c.type,this.ms=Math.ceil(1e3*c.sec*c.count),"y"===this.type||"M"===this.type?(this.get=this.get_complex,this.date=new Date(0)):this.get=this.get_simple}return b.prototype={toString:function(){return this.string},after:function(a){return this.get(a,1)},before:function(a){return this.get(a,-1)},get_complex:function(a,b){switch(this.date.setTime(a),this.type){case"M":this.date.setUTCMonth(this.date.getUTCMonth()+b);break;case"y":this.date.setUTCFullYear(this.date.getUTCFullYear()+b)}return this.date.getTime()},get_simple:function(a,b){return a+b*this.ms}},b}),define("panels/sparklines/timeSeries",["./interval","lodash"],function(a,b){function c(a){return parseInt(a,10)}function d(a){return 1e3*Math.floor(a.getTime()/1e3)}var e={};return e.ZeroFilled=function(c){c=b.defaults(c,{interval:"10m",start_date:null,end_date:null,fill_style:"minimal"}),this.interval=new a(c.interval),this._data={},this.start_time=c.start_date&&d(c.start_date),this.end_time=c.end_date&&d(c.end_date),this.opts=c},e.ZeroFilled.prototype.addValue=function(a,e){a=a instanceof Date?d(a):c(a),isNaN(a)||(this._data[a]=b.isUndefined(e)?0:e),this._cached_times=null},e.ZeroFilled.prototype.getOrderedTimes=function(a){var d=b.map(b.keys(this._data),c);return b.isArray(a)&&(d=d.concat(a)),b.uniq(d.sort(function(a,b){return a-b}),!0)},e.ZeroFilled.prototype.getFlotPairs=function(a){var c,d,e=this.getOrderedTimes(a);return c="all"===this.opts.fill_style?this._getAllFlotPairs:"null"===this.opts.fill_style?this._getNullFlotPairs:this._getMinFlotPairs,d=b.reduce(e,c,[],this)},e.ZeroFilled.prototype._getMinFlotPairs=function(a,b,c,d){var e,f,g,h;return c>0&&(g=d[c-1],h=this.interval.before(b),h>g&&a.push([h,0])),a.push([b,this._data[b]||0]),d.length>c&&(e=d[c+1],f=this.interval.after(b),e>f&&a.push([f,0])),a},e.ZeroFilled.prototype._getAllFlotPairs=function(a,b,c,d){var e,f;for(a.push([d[c],this._data[d[c]]||0]),e=d[c+1],f=this.interval.after(b);d.length>c&&e>f;f=this.interval.after(f))a.push([f,0]);return a},e.ZeroFilled.prototype._getNullFlotPairs=function(a,b,c,d){var e,f,g,h;return c>0&&(g=d[c-1],h=this.interval.before(b),h>g&&a.push([h,null])),a.push([b,this._data[b]||null]),d.length>c&&(e=d[c+1],f=this.interval.after(b),e>f&&a.push([f,null])),a},e}),function(a){function b(a,b){return b*Math.floor(a/b)}function c(a,b,c,d){if("function"==typeof a.strftime)return a.strftime(b);var e=function(a,b){return a=""+a,b=""+(null==b?"0":b),1==a.length?b+a:a},f=[],g=!1,h=a.getHours(),i=12>h;null==c&&(c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),null==d&&(d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]);var j;j=h>12?h-12:0==h?12:h;for(var k=0;k<b.length;++k){var l=b.charAt(k);if(g){switch(l){case"a":l=""+d[a.getDay()];break;case"b":l=""+c[a.getMonth()];break;case"d":l=e(a.getDate());break;case"e":l=e(a.getDate()," ");break;case"h":case"H":l=e(h);break;case"I":l=e(j);break;case"l":l=e(j," ");break;case"m":l=e(a.getMonth()+1);break;case"M":l=e(a.getMinutes());break;case"q":l=""+(Math.floor(a.getMonth()/3)+1);break;case"S":l=e(a.getSeconds());break;case"y":l=e(a.getFullYear()%100);break;case"Y":l=""+a.getFullYear();break;case"p":l=i?"am":"pm";break;case"P":l=i?"AM":"PM";break;case"w":l=""+a.getDay()}f.push(l),g=!1}else"%"==l?g=!0:f.push(l)}return f.join("")}function d(a){function b(a,b,c,d){a[b]=function(){return c[d].apply(c,arguments)}}var c={date:a};void 0!=a.strftime&&b(c,"strftime",a,"strftime"),b(c,"getTime",a,"getTime"),b(c,"setTime",a,"setTime");for(var d=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"],e=0;e<d.length;e++)b(c,"get"+d[e],a,"getUTC"+d[e]),b(c,"set"+d[e],a,"setUTC"+d[e]);return c}function e(a,b){if("browser"==b.timezone)return new Date(a);if(b.timezone&&"utc"!=b.timezone){if("undefined"!=typeof timezoneJS&&"undefined"!=typeof timezoneJS.Date){var c=new timezoneJS.Date;return c.setTimezone(b.timezone),c.setTime(a),c}return d(new Date(a))}return d(new Date(a))}function f(d){d.hooks.processOptions.push(function(d){a.each(d.getAxes(),function(a,d){var f=d.options;"time"==f.mode&&(d.tickGenerator=function(a){var c=[],d=e(a.min,f),g=0,i=f.tickSize&&"quarter"===f.tickSize[1]||f.minTickSize&&"quarter"===f.minTickSize[1]?k:j;null!=f.minTickSize&&(g="number"==typeof f.tickSize?f.tickSize:f.minTickSize[0]*h[f.minTickSize[1]]);for(var l=0;l<i.length-1&&!(a.delta<(i[l][0]*h[i[l][1]]+i[l+1][0]*h[i[l+1][1]])/2&&i[l][0]*h[i[l][1]]>=g);++l);var m=i[l][0],n=i[l][1];if("year"==n){if(null!=f.minTickSize&&"year"==f.minTickSize[1])m=Math.floor(f.minTickSize[0]);else{var o=Math.pow(10,Math.floor(Math.log(a.delta/h.year)/Math.LN10)),p=a.delta/h.year/o;m=1.5>p?1:3>p?2:7.5>p?5:10,m*=o}1>m&&(m=1)}a.tickSize=f.tickSize||[m,n];var q=a.tickSize[0];n=a.tickSize[1];var r=q*h[n];"second"==n?d.setSeconds(b(d.getSeconds(),q)):"minute"==n?d.setMinutes(b(d.getMinutes(),q)):"hour"==n?d.setHours(b(d.getHours(),q)):"month"==n?d.setMonth(b(d.getMonth(),q)):"quarter"==n?d.setMonth(3*b(d.getMonth()/3,q)):"year"==n&&d.setFullYear(b(d.getFullYear(),q)),d.setMilliseconds(0),r>=h.minute&&d.setSeconds(0),r>=h.hour&&d.setMinutes(0),r>=h.day&&d.setHours(0),r>=4*h.day&&d.setDate(1),r>=2*h.month&&d.setMonth(b(d.getMonth(),3)),r>=2*h.quarter&&d.setMonth(b(d.getMonth(),6)),r>=h.year&&d.setMonth(0);var s,t=0,u=Number.NaN;do if(s=u,u=d.getTime(),c.push(u),"month"==n||"quarter"==n)if(1>q){d.setDate(1);var v=d.getTime();d.setMonth(d.getMonth()+("quarter"==n?3:1));var w=d.getTime();d.setTime(u+t*h.hour+(w-v)*q),t=d.getHours(),d.setHours(0)}else d.setMonth(d.getMonth()+q*("quarter"==n?3:1));else"year"==n?d.setFullYear(d.getFullYear()+q):d.setTime(u+r);while(u<a.max&&u!=s);return c},d.tickFormatter=function(a,b){var d=e(a,b.options);if(null!=f.timeformat)return c(d,f.timeformat,f.monthNames,f.dayNames);var g,i=b.options.tickSize&&"quarter"==b.options.tickSize[1]||b.options.minTickSize&&"quarter"==b.options.minTickSize[1],j=b.tickSize[0]*h[b.tickSize[1]],k=b.max-b.min,l=f.twelveHourClock?" %p":"",m=f.twelveHourClock?"%I":"%H";g=j<h.minute?m+":%M:%S"+l:j<h.day?k<2*h.day?m+":%M"+l:"%b %d "+m+":%M"+l:j<h.month?"%b %d":i&&j<h.quarter||!i&&j<h.year?k<h.year?"%b":"%b %Y":i&&j<h.year?k<h.year?"Q%q":"Q%q %Y":"%Y";var n=c(d,g,f.monthNames,f.dayNames);return n})})})}var g={xaxis:{timezone:null,timeformat:null,twelveHourClock:!1,monthNames:null}},h={second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,quarter:7776e6,year:525949.2*60*1e3},i=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"]],j=i.concat([[3,"month"],[6,"month"],[1,"year"]]),k=i.concat([[1,"quarter"],[2,"quarter"],[1,"year"]]);a.plot.plugins.push({init:f,options:g,name:"time",version:"1.0"}),a.plot.formatDate=c}(jQuery),define("jquery.flot.time",function(){}),define("panels/sparklines/module",["angular","app","jquery","lodash","kbn","moment","./timeSeries","jquery.flot","jquery.flot.time"],function(a,b,c,d,e,f,g){var h=a.module("kibana.panels.sparklines",[]);b.useModule(h),h.controller("sparklines",["$scope","querySrv","dashboard","filterSrv",function(b,c,f,h){b.panelMeta={modals:[{description:"Inspect",icon:"icon-info-sign",partial:"app/partials/inspector.html",show:b.panel.spyable}],editorTabs:[{title:"Queries",src:"app/partials/querySelect.html"}],status:"Experimental",description:"Sparklines are tiny, simple, time series charts, shown separately. Because sparklines are uncluttered by grids, axis markers and colors, they are perfect for spotting change in a series"};var i={mode:"count",time_field:"@timestamp",value_field:null,interval:"5m",spyable:!0,queries:{mode:"all",ids:[]}};d.defaults(b.panel,i),b.init=function(){b.$on("refresh",function(){b.get_data()}),b.get_data()},b.interval_label=function(a){return b.panel.auto_int&&a===b.panel.interval?a+" (auto)":a},b.get_time_range=function(){var a=b.range=h.timeRange("last");return a},b.get_interval=function(){var a,c=b.panel.interval;return a=b.get_time_range(),a&&(c=e.secondsToHms(e.calculate_interval(a.from,a.to,10,0)/1e3)),b.panel.interval=c||"10m",b.panel.interval},b.get_data=function(a,e){var i,j,k,l,m;d.isUndefined(a)&&(a=0),delete b.panel.error,0!==f.indices.length&&(i=b.get_time_range(),j=b.get_interval(i),b.panelMeta.loading=!0,k=b.ejs.Request().indices(f.indices[a]),b.panel.queries.ids=c.idsByMode(b.panel.queries),l=c.getQueryObjs(b.panel.queries.ids),d.each(l,function(a){var e=b.ejs.FilteredQuery(c.toEjsObj(a),h.getBoolFilter(h.ids)),f=b.ejs.DateHistogramFacet(a.id);if("count"===b.panel.mode)f=f.field(b.panel.time_field).global(!0);else{if(d.isNull(b.panel.value_field))return b.panel.error="In "+b.panel.mode+" mode a field must be specified",void 0;f=f.keyField(b.panel.time_field).valueField(b.panel.value_field)}f=f.interval(j).facetFilter(b.ejs.QueryFilter(e)),k=k.facet(f).size(0)}),b.populate_modal(k),m=k.doSearch(),m.then(function(c){if(b.panelMeta.loading=!1,0===a&&(b.hits=0,b.data=[],e=b.query_id=(new Date).getTime()),!d.isUndefined(c.error))return b.panel.error=b.parse_error(c.error),void 0;if(b.query_id===e){var h,k,m=0;d.each(l,function(e){var f=c.facets[e.id];if(d.isUndefined(b.data[m])||0===a){var l={interval:j,start_date:i&&i.from,end_date:i&&i.to,fill_style:"minimal"};h=new g.ZeroFilled(l),k=0}else h=b.data[m].time_series,k=b.data[m].hits;d.each(f.entries,function(a){h.addValue(a.time,a[b.panel.mode]),k+=a.count,b.hits+=a.count}),b.data[m]={info:e,range:b.range,time_series:h,hits:k},m++}),a<f.indices.length-1&&b.get_data(a+1,e)}}))},b.populate_modal=function(c){b.inspector=a.toJson(JSON.parse(c.toString()),!0)},b.set_refresh=function(a){b.refresh=a},b.close_edit=function(){b.refresh&&b.get_data(),b.refresh=!1}}]),h.directive("sparklinesChart",function(){return{restrict:"A",scope:{series:"=",panel:"="},template:"<div></div>",link:function(b,e){function g(){e.css({height:"30px",width:"100px"});var a={legend:{show:!1},series:{lines:{show:!0,fill:0,lineWidth:2,steps:!1},points:{radius:2},shadowSize:1},yaxis:{show:!1},xaxis:{show:!1,mode:"time",min:d.isUndefined(b.series.range.from)?null:b.series.range.from.getTime(),max:d.isUndefined(b.series.range.to)?null:b.series.range.to.getTime()},grid:{hoverable:!1,show:!1}},f=[];f=b.series.time_series.getOrderedTimes(),f=d.uniq(f.sort(function(a,b){return a-b}),!0);var g={data:b.panel.derivative?h(b.series.time_series.getFlotPairs(f)):b.series.time_series.getFlotPairs(f),label:b.series.info.alias,color:e.css("color")};c.plot(e,[g],a)}b.$watch("series",function(){g()}),a.element(window).bind("resize",function(){g()});var h=function(a){return d.map(a,function(b,c){var d;return d=0===c||null===b[1]?[b[0],null]:null===a[c-1][1]?[b[0],null]:[b[0],b[1]-a[c-1][1]]})},i=c("<div>");e.bind("plothover",function(a,b,c){c?i.html(c.datapoint[1]+" @ "+f(c.datapoint[0]).format("YYYY-MM-DD HH:mm:ss")).place_tt(b.pageX,b.pageY):i.detach()})}}})});