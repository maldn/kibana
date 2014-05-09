/*! kibana - v3.0.0 - 2014-05-09
 * Copyright (c) 2014 Rashid Khan; Licensed Apache License */

define("panels/histogram/interval",["kbn"],function(a){function b(b){this.string=b;var c=a.describe_interval(b);this.type=c.type,this.ms=Math.ceil(1e3*c.sec*c.count),"y"===this.type||"M"===this.type?(this.get=this.get_complex,this.date=new Date(0)):this.get=this.get_simple}return b.prototype={toString:function(){return this.string},after:function(a){return this.get(a,1)},before:function(a){return this.get(a,-1)},get_complex:function(a,b){switch(this.date.setTime(a),this.type){case"M":this.date.setUTCMonth(this.date.getUTCMonth()+b);break;case"y":this.date.setUTCFullYear(this.date.getUTCFullYear()+b)}return this.date.getTime()},get_simple:function(a,b){return a+b*this.ms}},b}),define("panels/histogram/timeSeries",["./interval","lodash"],function(a,b){function c(a){return parseInt(a,10)}function d(a){return 1e3*Math.floor(a.getTime()/1e3)}var e={};return e.ZeroFilled=function(c){c=b.defaults(c,{interval:"10m",start_date:null,end_date:null,fill_style:"minimal"}),this.interval=new a(c.interval),this._data={},this._counters={},this.start_time=c.start_date&&d(c.start_date),this.end_time=c.end_date&&d(c.end_date),this.opts=c},e.ZeroFilled.prototype.addValue=function(a,e){this._counters[a]=(this._counters[a]||0)+1,a=a instanceof Date?d(a):c(a),isNaN(a)||(this._data[a]=b.isUndefined(e)?0:e),this._cached_times=null},e.ZeroFilled.prototype.getOrderedTimes=function(a){var d=b.map(b.keys(this._data),c);return b.isArray(a)&&(d=d.concat(a)),b.uniq(d.sort(function(a,b){return a-b}),!0)},e.ZeroFilled.prototype.getFlotPairs=function(a){var c,d,e=this.getOrderedTimes(a);return c="all"===this.opts.fill_style?this._getAllFlotPairs:"null"===this.opts.fill_style?this._getNullFlotPairs:"no"===this.opts.fill_style?this._getNoZeroFlotPairs:this._getMinFlotPairs,d=b.reduce(e,c,[],this)},e.ZeroFilled.prototype._getMinFlotPairs=function(a,b,c,d){var e,f,g,h;return c>0&&(g=d[c-1],h=this.interval.before(b),h>g&&a.push([h,0])),a.push([b,this._data[b]||0]),d.length>c&&(e=d[c+1],f=this.interval.after(b),e>f&&a.push([f,0])),a},e.ZeroFilled.prototype._getAllFlotPairs=function(a,b,c,d){var e,f;for(a.push([d[c],this._data[d[c]]||0]),e=d[c+1],f=this.interval.after(b);d.length>c&&e>f;f=this.interval.after(f))a.push([f,0]);return a},e.ZeroFilled.prototype._getNullFlotPairs=function(a,b,c,d){var e,f,g,h;return c>0&&(g=d[c-1],h=this.interval.before(b),h>g&&a.push([h,null])),a.push([b,this._data[b]||null]),d.length>c&&(e=d[c+1],f=this.interval.after(b),e>f&&a.push([f,null])),a},e.ZeroFilled.prototype._getNoZeroFlotPairs=function(a,b){return this._data[b]&&a.push([b,this._data[b]]),a},e}),function(){function a(a){this._value=a}function b(a,b,c,d){var e,f,g=Math.pow(10,b);return f=(c(a*g)/g).toFixed(b),d&&(e=new RegExp("0{1,"+d+"}$"),f=f.replace(e,"")),f}function c(a,b,c){var d;return d=b.indexOf("$")>-1?e(a,b,c):b.indexOf("%")>-1?f(a,b,c):b.indexOf(":")>-1?g(a,b):i(a._value,b,c)}function d(a,b){var c,d,e,f,g,i=b,j=["KB","MB","GB","TB","PB","EB","ZB","YB"],k=!1;if(b.indexOf(":")>-1)a._value=h(b);else if(b===o)a._value=0;else{for("."!==m[n].delimiters.decimal&&(b=b.replace(/\./g,"").replace(m[n].delimiters.decimal,".")),c=new RegExp("[^a-zA-Z]"+m[n].abbreviations.thousand+"(?:\\)|(\\"+m[n].currency.symbol+")?(?:\\))?)?$"),d=new RegExp("[^a-zA-Z]"+m[n].abbreviations.million+"(?:\\)|(\\"+m[n].currency.symbol+")?(?:\\))?)?$"),e=new RegExp("[^a-zA-Z]"+m[n].abbreviations.billion+"(?:\\)|(\\"+m[n].currency.symbol+")?(?:\\))?)?$"),f=new RegExp("[^a-zA-Z]"+m[n].abbreviations.trillion+"(?:\\)|(\\"+m[n].currency.symbol+")?(?:\\))?)?$"),g=0;g<=j.length&&!(k=b.indexOf(j[g])>-1?Math.pow(1024,g+1):!1);g++);a._value=(k?k:1)*(i.match(c)?Math.pow(10,3):1)*(i.match(d)?Math.pow(10,6):1)*(i.match(e)?Math.pow(10,9):1)*(i.match(f)?Math.pow(10,12):1)*(b.indexOf("%")>-1?.01:1)*((b.split("-").length+Math.min(b.split("(").length-1,b.split(")").length-1))%2?1:-1)*Number(b.replace(/[^0-9\.]+/g,"")),a._value=k?Math.ceil(a._value):a._value}return a._value}function e(a,b,c){var d,e=b.indexOf("$")<=1?!0:!1,f="";return b.indexOf(" $")>-1?(f=" ",b=b.replace(" $","")):b.indexOf("$ ")>-1?(f=" ",b=b.replace("$ ","")):b=b.replace("$",""),d=i(a._value,b,c),e?d.indexOf("(")>-1||d.indexOf("-")>-1?(d=d.split(""),d.splice(1,0,m[n].currency.symbol+f),d=d.join("")):d=m[n].currency.symbol+f+d:d.indexOf(")")>-1?(d=d.split(""),d.splice(-1,0,f+m[n].currency.symbol),d=d.join("")):d=d+f+m[n].currency.symbol,d}function f(a,b,c){var d,e="",f=100*a._value;return b.indexOf(" %")>-1?(e=" ",b=b.replace(" %","")):b=b.replace("%",""),d=i(f,b,c),d.indexOf(")")>-1?(d=d.split(""),d.splice(-1,0,e+"%"),d=d.join("")):d=d+e+"%",d}function g(a){var b=Math.floor(a._value/60/60),c=Math.floor((a._value-60*b*60)/60),d=Math.round(a._value-60*b*60-60*c);return b+":"+(10>c?"0"+c:c)+":"+(10>d?"0"+d:d)}function h(a){var b=a.split(":"),c=0;return 3===b.length?(c+=60*Number(b[0])*60,c+=60*Number(b[1]),c+=Number(b[2])):2===b.length&&(c+=60*Number(b[0]),c+=Number(b[1])),Number(c)}function i(a,c,d){var e,f,g,h,i,j,k=!1,l=!1,p=!1,q="",r="",s="",t=Math.abs(a),u=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],v="",w=!1;if(0===a&&null!==o)return o;if(c.indexOf("(")>-1?(k=!0,c=c.slice(1,-1)):c.indexOf("+")>-1&&(l=!0,c=c.replace(/\+/g,"")),c.indexOf("a")>-1&&(c.indexOf(" a")>-1?(q=" ",c=c.replace(" a","")):c=c.replace("a",""),t>=Math.pow(10,12)?(q+=m[n].abbreviations.trillion,a/=Math.pow(10,12)):t<Math.pow(10,12)&&t>=Math.pow(10,9)?(q+=m[n].abbreviations.billion,a/=Math.pow(10,9)):t<Math.pow(10,9)&&t>=Math.pow(10,6)?(q+=m[n].abbreviations.million,a/=Math.pow(10,6)):t<Math.pow(10,6)&&t>=Math.pow(10,3)&&(q+=m[n].abbreviations.thousand,a/=Math.pow(10,3))),c.indexOf("b")>-1)for(c.indexOf(" b")>-1?(r=" ",c=c.replace(" b","")):c=c.replace("b",""),g=0;g<=u.length;g++)if(e=Math.pow(1024,g),f=Math.pow(1024,g+1),a>=e&&f>a){r+=u[g],e>0&&(a/=e);break}return c.indexOf("o")>-1&&(c.indexOf(" o")>-1?(s=" ",c=c.replace(" o","")):c=c.replace("o",""),s+=m[n].ordinal(a)),c.indexOf("[.]")>-1&&(p=!0,c=c.replace("[.]",".")),h=a.toString().split(".")[0],i=c.split(".")[1],j=c.indexOf(","),i?(i.indexOf("[")>-1?(i=i.replace("]",""),i=i.split("["),v=b(a,i[0].length+i[1].length,d,i[1].length)):v=b(a,i.length,d),h=v.split(".")[0],v=v.split(".")[1].length?m[n].delimiters.decimal+v.split(".")[1]:"",p&&0===Number(v.slice(1))&&(v="")):h=b(a,null,d),h.indexOf("-")>-1&&(h=h.slice(1),w=!0),j>-1&&(h=h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+m[n].delimiters.thousands)),0===c.indexOf(".")&&(h=""),(k&&w?"(":"")+(!k&&w?"-":"")+(!w&&l?"+":"")+h+v+(s?s:"")+(q?q:"")+(r?r:"")+(k&&w?")":"")}function j(a,b){m[a]=b}var k,l="1.5.2",m={},n="en",o=null,p="0,0",q="undefined"!=typeof module&&module.exports;k=function(b){return k.isNumeral(b)?b=b.value():0===b||"undefined"==typeof b?b=0:Number(b)||(b=k.fn.unformat(b)),new a(Number(b))},k.version=l,k.isNumeral=function(b){return b instanceof a},k.language=function(a,b){if(!a)return n;if(a&&!b){if(!m[a])throw new Error("Unknown language : "+a);n=a}return(b||!m[a])&&j(a,b),k},k.languageData=function(a){if(!a)return m[n];if(!m[a])throw new Error("Unknown language : "+a);return m[a]},k.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"},currency:{symbol:"$"}}),k.zeroFormat=function(a){o="string"==typeof a?a:null},k.defaultFormat=function(a){p="string"==typeof a?a:"0.0"},k.fn=a.prototype={clone:function(){return k(this)},format:function(a,b){return c(this,a?a:p,void 0!==b?b:Math.round)},unformat:function(a){return"[object Number]"===Object.prototype.toString.call(a)?a:d(this,a?a:p)},value:function(){return this._value},valueOf:function(){return this._value},set:function(a){return this._value=Number(a),this},add:function(a){return this._value=this._value+Number(a),this},subtract:function(a){return this._value=this._value-Number(a),this},multiply:function(a){return this._value=this._value*Number(a),this},divide:function(a){return this._value=this._value/Number(a),this},difference:function(a){var b=this._value-Number(a);return 0>b&&(b=-b),b}},q&&(module.exports=k),"undefined"==typeof ender&&(this.numeral=k),"function"==typeof define&&define.amd&&define("numeral",[],function(){return k})}.call(this),function(a){function b(b){var g,h={icon:"icon-caret-up",size:20,width:19,height:10},i=[],j=!1;b.getEvents=function(){return i},b.hideEvents=function(b){a.each(i,function(a,c){l(c.level(),b)&&c.visual().getObject().hide()})},b.showEvents=function(c){b.hideEvents(),a.each(i,function(a,b){l(b.level(),c)||b.hide()}),k()},b.hooks.processOptions.push(function(a,b){null!=b.events.data&&(j=!0)}),b.hooks.draw.push(function(a){var b=a.getOptions(),c=a.getXAxes()[b.events.xaxis-1];if(j)if(i.length<1)if(_lastRange=c.max-c.min,b.events.clustering){var d=u(b.events.types,b.events.data,c.max-c.min);g=d.types,p(d.data)}else g=b.events.types,p(b.events.data);else{if(b.events.clustering){m();var d=u(b.events.types,b.events.data,c.max-c.min);g=d.types,p(d.data)}n()}k()});var k=function(){{var c=b.getPlotOffset();c.left,b.width()-c.right}a.each(i,function(a,b){t(b.getOptions().min)&&!b.isHidden()?b.visual().draw():b.visual().getObject().hide()}),q(),r()},l=function(a,b){var c={};return b?(c.start=void 0==b.min?0:b.min,c.end=void 0==b.max?i.length-1:b.max):(c.start=0,c.end=i.length-1),a>=c.start&&a<=c.end?!0:!1},m=function(){a.each(i,function(a,b){b.visual().clear()}),i=[]},n=function(){var c,d,e=b.getPlotOffset(),f=b.getXAxes()[b.getOptions().events.xaxis-1];a.each(i,function(a,g){d=e.top+b.height()-g.visual().height(),c=f.p2c(g.getOptions().min)+e.left-g.visual().width()/2,g.visual().moveTo({top:d,left:c})})},o=function(b,c,d){a("#tooltip").remove();var e=a('<div id="tooltip">');d?e.html(d.description).place_tt(b,c,{offset:10}):e.remove()},p=function(c){a.each(c,function(a,c){var e=null!=b.getOptions().events.levels&&g&&g[c.eventType]?g[c.eventType].level:0;if(e>b.getOptions().events.levels)throw"A type's level has exceeded the maximum. Level="+e+", Max levels:"+b.getOptions().events.levels;i.push(new d(c,s(c),e))}),i.sort(e)},q=function(){var b,c=[],d={},e=0;a.each(i,function(a,e){b&&(e.getOptions().min==b.getOptions().min?(d.min||(d.min=a),d.max=a):d.min&&(c.push(d),d={})),b=e}),d.min&&c.push(d),a.each(c,function(b,c){var d=i.splice(c.min-e,c.max-c.min+1);a.each(d,function(a,b){b.visual().clear()}),e+=c.max-c.min+1})},r=function(){var a,c,d=b.getXAxes()[b.getOptions().events.xaxis-1],e=0,f=-1;pright=b.width()-b.getPlotOffset().right;if(d.min&&d.max){a=d.max-d.min;for(var g=1;g<i.length;g++)c=i[g].getOptions().min-i[g-1].getOptions().min,c/a>.007?(f=-1,e=g):(f=g,g==i.length-1)}},s=function(d){var e,f,i,j,k,l,m,n,p=b.getPlaceholder(),q=b.getPlotOffset(),r=b.getXAxes()[b.getOptions().events.xaxis-1],s=b.getAxes();s.yaxis&&s.yaxis.used&&(e=s.yaxis),s.yaxis2&&s.yaxis2.used&&(e=s.yaxis2),n="cluster"===d.eventType.split(",")[1]?d.eventType.split(",")[0]:d.eventType,null!=g&&g[n]&&g[n].icon?(k=g[n].icon,l=g[n].level):(k=h,l=0),j=a('<i style="position:absolute" class="'+k.icon+'"></i>').appendTo(p);var t=k.size||k.width,u=k.size||k.height;f=q.top+b.height()-u+1,i=r.p2c(d.min)+q.left-t/2;var v={left:i+"px",top:f};return k.outline&&(v["text-shadow"]="1px 1px "+k.outline+", -1px -1px "+k.outline+", -1px 1px "+k.outline+", 1px -1px "+k.outline),k.size&&(v["font-size"]=k.size+"px"),k.color&&(v.color=k.color),j.css(v),j.hide(),j.data({event:d}),j.hover(function(){var b=a(this).offset();o(b.left+a(this).width()/2,b.top,a(this).data("event"))},function(){a("#tooltip").remove(),b.clearSelection()}),m=new c(j,function(a){a.show()},function(a){a.remove()},function(a,b){a.css({top:b.top,left:b.left})},i,f,j.width(),j.height())},t=function(a){var c=b.getXAxes()[b.getOptions().events.xaxis-1],d=c.p2c(a);return d>0&&d<c.p2c(c.max)},u=function(b,c,d){var e,f=[],g=[];return e=v(c),a.each(e.eventTypes,function(a,b){f.push(w(e.groupedEvents[b],1,d))}),a.each(f,function(b,c){a.each(c,function(b,c){var d="<strong>"+(c.length>5?"Top 5 of ":"")+c.length+" events</strong>";a.each(c,function(a,b){a>5||(d+='<div style="'+(a%2?"background-color:#444;":"")+'" style="padding-bottom:0px">'+b.description+"</div>")});var e={min:c[0].min,max:c[c.length-1].min,eventType:c[0].eventType+",cluster",title:"Cluster of: "+c[0].title,description:d};g.push(e)})}),{types:b,data:g}},v=function(b){var c=[],d={};return a.each(b,function(a,b){d[b.eventType]||(d[b.eventType]=[],c.push(b.eventType)),d[b.eventType].push(b)}),{eventTypes:c,groupedEvents:d}},w=function(a,b,c){var d,e,g,h=[],i=0;a.sort(f);for(var j=1;j<a.length-1;j++)i+=a[j].min-a[j-1].min;e=i/(a.length-2),d=[a[0]];for(var j=1;j<a.length;j++){var k=a[j-1].min-a[j].min;g=k/c;var l=e*b;k>l&&g>.05?(h.push(d),d=[a[j]]):d.push(a[j])}return h.push(d),h}}function c(a,b,c,d,e,f,g,h){var i=a,j=b,k=c,l=d,m={left:e,top:f},n=g,o=h;this.width=function(){return n},this.height=function(){return o},this.position=function(){return m},this.draw=function(){j(i)},this.clear=function(){k(i)},this.getObject=function(){return i},this.moveTo=function(a){m=a,l(i,m)}}function d(a,b,c){var d,e=a,f=b,g=c,h=!1;this.visual=function(){return f},this.level=function(){return g},this.getOptions=function(){return e},this.getParent=function(){return d},this.isHidden=function(){return h},this.hide=function(){h=!0},this.unhide=function(){h=!1}}function e(a,b){var c=a.getOptions(),d=b.getOptions();return c.min>d.min?1:c.min<d.min?-1:0}function f(a,b){return a.min<b.min?1:a.min>b.min?-1:0}var g={events:{levels:null,data:null,types:null,xaxis:1,clustering:!1}};a.plot.plugins.push({init:b,options:g,name:"events",version:"0.20"})}(jQuery),define("jquery.flot.events",function(){}),function(a){function b(b){function c(a){o.active&&(j(a),b.getPlaceholder().trigger("plotselecting",[f()]))}function d(b){1==b.which&&(document.body.focus(),void 0!==document.onselectstart&&null==p.onselectstart&&(p.onselectstart=document.onselectstart,document.onselectstart=function(){return!1}),void 0!==document.ondrag&&null==p.ondrag&&(p.ondrag=document.ondrag,document.ondrag=function(){return!1}),i(o.first,b),o.active=!0,q=function(a){e(a)},a(document).one("mouseup",q))}function e(a){return q=null,void 0!==document.onselectstart&&(document.onselectstart=p.onselectstart),void 0!==document.ondrag&&(document.ondrag=p.ondrag),o.active=!1,j(a),n()?g():(b.getPlaceholder().trigger("plotunselected",[]),b.getPlaceholder().trigger("plotselecting",[null])),!1}function f(){if(!n())return null;if(!o.show)return null;var c={},d=o.first,e=o.second;return a.each(b.getAxes(),function(a,b){if(b.used){var f=b.c2p(d[b.direction]),g=b.c2p(e[b.direction]);c[a]={from:Math.min(f,g),to:Math.max(f,g)}}}),c}function g(){var a=f();b.getPlaceholder().trigger("plotselected",[a]),a.xaxis&&a.yaxis&&b.getPlaceholder().trigger("selected",[{x1:a.xaxis.from,y1:a.yaxis.from,x2:a.xaxis.to,y2:a.yaxis.to}])}function h(a,b,c){return a>b?a:b>c?c:b}function i(a,c){var d=b.getOptions(),e=b.getPlaceholder().offset(),f=b.getPlotOffset();a.x=h(0,c.pageX-e.left-f.left,b.width()),a.y=h(0,c.pageY-e.top-f.top,b.height()),"y"==d.selection.mode&&(a.x=a==o.first?0:b.width()),"x"==d.selection.mode&&(a.y=a==o.first?0:b.height())}function j(a){null!=a.pageX&&(i(o.second,a),n()?(o.show=!0,b.triggerRedrawOverlay()):k(!0))}function k(a){o.show&&(o.show=!1,b.triggerRedrawOverlay(),a||b.getPlaceholder().trigger("plotunselected",[]))}function l(a,c){var d,e,f,g,h=b.getAxes();for(var i in h)if(d=h[i],d.direction==c&&(g=c+d.n+"axis",a[g]||1!=d.n||(g=c+"axis"),a[g])){e=a[g].from,f=a[g].to;break}if(a[g]||(d="x"==c?b.getXAxes()[0]:b.getYAxes()[0],e=a[c+"1"],f=a[c+"2"]),null!=e&&null!=f&&e>f){var j=e;e=f,f=j}return{from:e,to:f,axis:d}}function m(a,c){var d,e=b.getOptions();"y"==e.selection.mode?(o.first.x=0,o.second.x=b.width()):(d=l(a,"x"),o.first.x=d.axis.p2c(d.from),o.second.x=d.axis.p2c(d.to)),"x"==e.selection.mode?(o.first.y=0,o.second.y=b.height()):(d=l(a,"y"),o.first.y=d.axis.p2c(d.from),o.second.y=d.axis.p2c(d.to)),o.show=!0,b.triggerRedrawOverlay(),!c&&n()&&g()}function n(){var a=b.getOptions().selection.minSize;return Math.abs(o.second.x-o.first.x)>=a&&Math.abs(o.second.y-o.first.y)>=a}var o={first:{x:-1,y:-1},second:{x:-1,y:-1},show:!1,active:!1},p={},q=null;b.clearSelection=k,b.setSelection=m,b.getSelection=f,b.hooks.bindEvents.push(function(a,b){var e=a.getOptions();null!=e.selection.mode&&(b.mousemove(c),b.mousedown(d))}),b.hooks.drawOverlay.push(function(b,c){if(o.show&&n()){var d=b.getPlotOffset(),e=b.getOptions();c.save(),c.translate(d.left,d.top);var f=a.color.parse(e.selection.color);c.strokeStyle=f.scale("a",.8).toString(),c.lineWidth=1,c.lineJoin=e.selection.shape,c.fillStyle=f.scale("a",.4).toString();var g=Math.min(o.first.x,o.second.x)+.5,h=Math.min(o.first.y,o.second.y)+.5,i=Math.abs(o.second.x-o.first.x)-1,j=Math.abs(o.second.y-o.first.y)-1;c.fillRect(g,h,i,j),c.strokeRect(g,h,i,j),c.restore()}}),b.hooks.shutdown.push(function(b,e){e.unbind("mousemove",c),e.unbind("mousedown",d),q&&a(document).unbind("mouseup",q)})}a.plot.plugins.push({init:b,options:{selection:{mode:null,color:"#e8cfac",shape:"round",minSize:5}},name:"selection",version:"1.1"})}(jQuery),define("jquery.flot.selection",function(){}),function(a){function b(a,b){return b*Math.floor(a/b)}function c(a,b,c,d){if("function"==typeof a.strftime)return a.strftime(b);var e=function(a,b){return a=""+a,b=""+(null==b?"0":b),1==a.length?b+a:a},f=[],g=!1,h=a.getHours(),i=12>h;null==c&&(c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),null==d&&(d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]);var j;j=h>12?h-12:0==h?12:h;for(var k=0;k<b.length;++k){var l=b.charAt(k);if(g){switch(l){case"a":l=""+d[a.getDay()];break;case"b":l=""+c[a.getMonth()];break;case"d":l=e(a.getDate());break;case"e":l=e(a.getDate()," ");break;case"h":case"H":l=e(h);break;case"I":l=e(j);break;case"l":l=e(j," ");break;case"m":l=e(a.getMonth()+1);break;case"M":l=e(a.getMinutes());break;case"q":l=""+(Math.floor(a.getMonth()/3)+1);break;case"S":l=e(a.getSeconds());break;case"y":l=e(a.getFullYear()%100);break;case"Y":l=""+a.getFullYear();break;case"p":l=i?"am":"pm";break;case"P":l=i?"AM":"PM";break;case"w":l=""+a.getDay()}f.push(l),g=!1}else"%"==l?g=!0:f.push(l)}return f.join("")}function d(a){function b(a,b,c,d){a[b]=function(){return c[d].apply(c,arguments)}}var c={date:a};void 0!=a.strftime&&b(c,"strftime",a,"strftime"),b(c,"getTime",a,"getTime"),b(c,"setTime",a,"setTime");for(var d=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"],e=0;e<d.length;e++)b(c,"get"+d[e],a,"getUTC"+d[e]),b(c,"set"+d[e],a,"setUTC"+d[e]);return c}function e(a,b){if("browser"==b.timezone)return new Date(a);if(b.timezone&&"utc"!=b.timezone){if("undefined"!=typeof timezoneJS&&"undefined"!=typeof timezoneJS.Date){var c=new timezoneJS.Date;return c.setTimezone(b.timezone),c.setTime(a),c}return d(new Date(a))}return d(new Date(a))}function f(d){d.hooks.processOptions.push(function(d){a.each(d.getAxes(),function(a,d){var f=d.options;"time"==f.mode&&(d.tickGenerator=function(a){var c=[],d=e(a.min,f),g=0,i=f.tickSize&&"quarter"===f.tickSize[1]||f.minTickSize&&"quarter"===f.minTickSize[1]?k:j;null!=f.minTickSize&&(g="number"==typeof f.tickSize?f.tickSize:f.minTickSize[0]*h[f.minTickSize[1]]);for(var l=0;l<i.length-1&&!(a.delta<(i[l][0]*h[i[l][1]]+i[l+1][0]*h[i[l+1][1]])/2&&i[l][0]*h[i[l][1]]>=g);++l);var m=i[l][0],n=i[l][1];if("year"==n){if(null!=f.minTickSize&&"year"==f.minTickSize[1])m=Math.floor(f.minTickSize[0]);else{var o=Math.pow(10,Math.floor(Math.log(a.delta/h.year)/Math.LN10)),p=a.delta/h.year/o;m=1.5>p?1:3>p?2:7.5>p?5:10,m*=o}1>m&&(m=1)}a.tickSize=f.tickSize||[m,n];var q=a.tickSize[0];n=a.tickSize[1];var r=q*h[n];"second"==n?d.setSeconds(b(d.getSeconds(),q)):"minute"==n?d.setMinutes(b(d.getMinutes(),q)):"hour"==n?d.setHours(b(d.getHours(),q)):"month"==n?d.setMonth(b(d.getMonth(),q)):"quarter"==n?d.setMonth(3*b(d.getMonth()/3,q)):"year"==n&&d.setFullYear(b(d.getFullYear(),q)),d.setMilliseconds(0),r>=h.minute&&d.setSeconds(0),r>=h.hour&&d.setMinutes(0),r>=h.day&&d.setHours(0),r>=4*h.day&&d.setDate(1),r>=2*h.month&&d.setMonth(b(d.getMonth(),3)),r>=2*h.quarter&&d.setMonth(b(d.getMonth(),6)),r>=h.year&&d.setMonth(0);var s,t=0,u=Number.NaN;do if(s=u,u=d.getTime(),c.push(u),"month"==n||"quarter"==n)if(1>q){d.setDate(1);var v=d.getTime();d.setMonth(d.getMonth()+("quarter"==n?3:1));var w=d.getTime();d.setTime(u+t*h.hour+(w-v)*q),t=d.getHours(),d.setHours(0)}else d.setMonth(d.getMonth()+q*("quarter"==n?3:1));else"year"==n?d.setFullYear(d.getFullYear()+q):d.setTime(u+r);while(u<a.max&&u!=s);return c},d.tickFormatter=function(a,b){var d=e(a,b.options);if(null!=f.timeformat)return c(d,f.timeformat,f.monthNames,f.dayNames);var g,i=b.options.tickSize&&"quarter"==b.options.tickSize[1]||b.options.minTickSize&&"quarter"==b.options.minTickSize[1],j=b.tickSize[0]*h[b.tickSize[1]],k=b.max-b.min,l=f.twelveHourClock?" %p":"",m=f.twelveHourClock?"%I":"%H";g=j<h.minute?m+":%M:%S"+l:j<h.day?k<2*h.day?m+":%M"+l:"%b %d "+m+":%M"+l:j<h.month?"%b %d":i&&j<h.quarter||!i&&j<h.year?k<h.year?"%b":"%b %Y":i&&j<h.year?k<h.year?"Q%q":"Q%q %Y":"%Y";var n=c(d,g,f.monthNames,f.dayNames);return n})})})}var g={xaxis:{timezone:null,timeformat:null,twelveHourClock:!1,monthNames:null}},h={second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,quarter:7776e6,year:525949.2*60*1e3},i=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"]],j=i.concat([[3,"month"],[6,"month"],[1,"year"]]),k=i.concat([[1,"quarter"],[2,"quarter"],[1,"year"]]);a.plot.plugins.push({init:f,options:g,name:"time",version:"1.0"}),a.plot.formatDate=c}(jQuery),define("jquery.flot.time",function(){}),function(a){function b(a,b){return b*Math.floor(a/b)}function c(c){c.hooks.processDatapoints.push(function(c){a.each(c.getAxes(),function(a,c){var d=c.options;("byte"===d.mode||"byteRate"===d.mode)&&(c.tickGenerator=function(a){var c,e=[],f=2,g=a.delta,h=0,i=0,j=0;for("byteRate"===d.mode&&(a.rate=!0),a.tickDecimals="number"==typeof d.tickDecimals?d.tickDecimals:2;Math.abs(g)>=1024;)h++,g/=1024;for(;1024>=f&&!(f>=g);)f*=2;a.tickSize="undefined"!=typeof d.minTickSize&&f<d.minTickSize?d.minTickSize:f*Math.pow(1024,h),i=b(a.min,a.tickSize);do c=i+j++*a.tickSize,e.push(c);while(c<a.max);return e},c.tickFormatter=function(a,b){for(var c,d=0;Math.abs(a)>=1024;)d++,a/=1024;switch(d){case 0:c=" B";break;case 1:c=" KB";break;case 2:c=" MB";break;case 3:c=" GB";break;case 4:c=" TB";break;case 5:c=" PB";break;case 6:c=" EB";break;case 7:c=" ZB";break;case 8:c=" YB"}return"undefined"!=typeof b.rate&&(c+="/s"),a.toFixed(b.tickDecimals)+c})})})}var d={};a.plot.plugins.push({init:c,options:d,name:"byte",version:"0.1"})}(jQuery),define("jquery.flot.byte",function(){}),function(a){function b(a){function b(a,b){for(var c=null,d=0;d<b.length&&a!=b[d];++d)b[d].stack==a.stack&&(c=b[d]);return c}function c(a,c,d){if(null!=c.stack&&c.stack!==!1){var e=b(c,a.getData());if(e){for(var f,g,h,i,j,k,l,m,n=d.pointsize,o=d.points,p=e.datapoints.pointsize,q=e.datapoints.points,r=[],s=c.lines.show,t=c.bars.horizontal,u=n>2&&(t?d.format[2].x:d.format[2].y),v=s&&c.lines.steps,w=!0,x=t?1:0,y=t?0:1,z=0,A=0;;){if(z>=o.length)break;if(l=r.length,null==o[z]){for(m=0;n>m;++m)r.push(o[z+m]);z+=n}else if(A>=q.length){if(!s)for(m=0;n>m;++m)r.push(o[z+m]);z+=n}else if(null==q[A]){for(m=0;n>m;++m)r.push(null);w=!0,A+=p}else{if(f=o[z+x],g=o[z+y],i=q[A+x],j=q[A+y],k=0,f==i){for(m=0;n>m;++m)r.push(o[z+m]);r[l+y]+=j,k=j,z+=n,A+=p}else if(f>i){if(s&&z>0&&null!=o[z-n]){for(h=g+(o[z-n+y]-g)*(i-f)/(o[z-n+x]-f),r.push(i),r.push(h+j),m=2;n>m;++m)r.push(o[z+m]);k=j}A+=p}else{if(w&&s){z+=n;continue}for(m=0;n>m;++m)r.push(o[z+m]);s&&A>0&&null!=q[A-p]&&(k=j+(q[A-p+y]-j)*(f-i)/(q[A-p+x]-i)),r[l+y]+=k,z+=n}w=!1,l!=r.length&&u&&(r[l+2]+=k)}if(v&&l!=r.length&&l>0&&null!=r[l]&&r[l]!=r[l-n]&&r[l+1]!=r[l-n+1]){for(m=0;n>m;++m)r[l+n+m]=r[l+m];r[l+1]=r[l-n+1]}}d.points=r}}}a.hooks.processDatapoints.push(c)}var c={series:{stack:null}};a.plot.plugins.push({init:b,options:c,name:"stack",version:"1.2"})}(jQuery),define("jquery.flot.stack",function(){}),function(a){function b(a){function b(a,b,d){if(f||(f=!0,g=c(a.getData())),1==b.stackpercent){var e=d.length;b.percents=[];var h=0,i=1;b.bars&&b.bars.horizontal&&b.bars.horizontal===!0&&(h=1,i=0);for(var j=0;e>j;j++){var k=g[d[j][h]+""];k>0?b.percents.push(100*d[j][i]/k):b.percents.push(0)}}}function c(a){var b=a.length,c={};if(b>0)for(var d=0;b>d;d++)if(a[d].stackpercent){var e=0,f=1;a[d].bars&&a[d].bars.horizontal&&a[d].bars.horizontal===!0&&(e=1,f=0);for(var g=a[d].data.length,h=0;g>h;h++){var i=0;null!=a[d].data[h][1]&&(i=a[d].data[h][f]),c[a[d].data[h][e]+""]?c[a[d].data[h][e]+""]+=i:c[a[d].data[h][e]+""]=i}}return c}function d(a,b,d){if(b.stackpercent){f||(g=c(a.getData()));var h=[],i=0,j=1;b.bars&&b.bars.horizontal&&b.bars.horizontal===!0&&(i=1,j=0);for(var k=0;k<d.points.length;k+=3)e[d.points[k+i]]||(e[d.points[k+i]]=0),h[k+i]=d.points[k+i],h[k+j]=d.points[k+j]+e[d.points[k+i]],h[k+2]=e[d.points[k+i]],e[d.points[k+i]]+=d.points[k+j],g[h[k+i]+""]>0?(h[k+j]=100*h[k+j]/g[h[k+i]+""],h[k+2]=100*h[k+2]/g[h[k+i]+""]):(h[k+j]=0,h[k+2]=0);d.points=h}}var e={},f=!1,g={};a.hooks.processRawData.push(b),a.hooks.processDatapoints.push(d)}var c={series:{stackpercent:null}};a.plot.plugins.push({init:b,options:c,name:"stackpercent",version:"0.1"})}(jQuery),define("jquery.flot.stackpercent",function(){}),define("panels/histogram/module",["angular","app","jquery","lodash","kbn","moment","./timeSeries","numeral","jquery.flot","jquery.flot.events","jquery.flot.selection","jquery.flot.time","jquery.flot.byte","jquery.flot.stack","jquery.flot.stackpercent"],function(a,b,c,d,e,f,g,h){var i=a.module("kibana.panels.histogram",[]);b.useModule(i),i.controller("histogram",["$scope","querySrv","dashboard","filterSrv",function(b,c,h,i){b.panelMeta={modals:[{description:"Inspect",icon:"icon-info-sign",partial:"app/partials/inspector.html",show:b.panel.spyable},{description:"Csv",icon:"icon-table",partial:"app/partials/csv.html",show:!0,click:function(){b.csv_data=b.to_csv()}}],editorTabs:[{title:"Style",src:"app/panels/histogram/styleEditor.html"},{title:"Queries",src:"app/panels/histogram/queriesEditor.html"}],status:"Stable",description:"A bucketed time series chart of the current query or queries. Uses the Elasticsearch date_histogram facet. If using time stamped indices this panel will query them sequentially to attempt to apply the lighest possible load to your Elasticsearch cluster"};var j={mode:"count",time_field:"@timestamp",value_field:null,"x-axis":!0,"y-axis":!0,scale:1,y_format:"none",grid:{max:null,min:0},queries:{mode:"all",ids:[]},annotate:{enable:!1,query:"*",size:20,field:"_type",sort:["_score","desc"]},auto_int:!0,resolution:100,interval:"5m",intervals:["auto","1s","1m","5m","10m","30m","1h","3h","12h","1d","1w","1y"],lines:!1,fill:0,linewidth:3,points:!1,pointradius:5,bars:!0,stack:!0,spyable:!0,zoomlinks:!0,options:!0,legend:!0,show_query:!0,interactive:!0,legend_counts:!0,timezone:"browser",percentage:!1,zerofill:!0,derivative:!1,tooltip:{value_type:"cumulative",query_as_alias:!0}};d.defaults(b.panel,j),d.defaults(b.panel.tooltip,j.tooltip),d.defaults(b.panel.annotate,j.annotate),d.defaults(b.panel.grid,j.grid),b.init=function(){b.options=!1,b.panel.tooltip.query_as_alias=!0,b.get_data()},b.set_interval=function(a){"auto"!==a?(b.panel.auto_int=!1,b.panel.interval=a):b.panel.auto_int=!0},b.interval_label=function(a){return b.panel.auto_int&&a===b.panel.interval?a+" (auto)":a},b.get_time_range=function(){var a=b.range=i.timeRange("last");return a},b.get_interval=function(){var a,c=b.panel.interval;return b.panel.auto_int&&(a=b.get_time_range(),a&&(c=e.secondsToHms(e.calculate_interval(a.from,a.to,b.panel.resolution,0)/1e3))),b.panel.interval=c||"10m",b.panel.interval},b.get_data=function(a,j,k){var l,m,n,o,p;if(d.isUndefined(j)&&(j=0),delete b.panel.error,0!==h.indices.length){if(l=b.get_time_range(),m=b.get_interval(l),b.panel.auto_int&&(b.panel.interval=e.secondsToHms(e.calculate_interval(l.from,l.to,b.panel.resolution,0)/1e3)),b.panelMeta.loading=!0,n=b.ejs.Request().indices(h.indices[j]),b.panel.annotate.enable||n.searchType("count"),b.panel.queries.ids=c.idsByMode(b.panel.queries),o=c.getQueryObjs(b.panel.queries.ids),d.each(o,function(a){var e=b.ejs.FilteredQuery(c.toEjsObj(a),i.getBoolFilter(i.ids())),f=b.ejs.DateHistogramFacet(a.id);if("count"===b.panel.mode)f=f.field(b.panel.time_field).global(!0);else{if(d.isNull(b.panel.value_field))return b.panel.error="In "+b.panel.mode+" mode a field must be specified",void 0;f=f.keyField(b.panel.time_field).valueField(b.panel.value_field).global(!0)}f=f.interval(m).facetFilter(b.ejs.QueryFilter(e)),n=n.facet(f).size(b.panel.annotate.enable?b.panel.annotate.size:0)}),b.panel.annotate.enable){var q=b.ejs.FilteredQuery(b.ejs.QueryStringQuery(b.panel.annotate.query||"*"),i.getBoolFilter(i.idsByType("time")));n=n.query(q),n=n.sort([b.ejs.Sort(b.panel.annotate.sort[0]).order(b.panel.annotate.sort[1]),b.ejs.Sort(b.panel.time_field).desc()])}return b.populate_modal(n),p=n.doSearch(),p.then(function(c){if(b.panelMeta.loading=!1,0===j&&(b.legend=[],b.hits=0,a=[],b.annotations=[],k=b.query_id=(new Date).getTime()),d.isUndefined(c.error)){if(b.query_id===k){var i,n,p,q=0;d.each(o,function(e){var f=c.facets[e.id];if(d.isUndefined(a[q])||0===j){var h={interval:m,start_date:l&&l.from,end_date:l&&l.to,fill_style:b.panel.derivative?"null":"minimal"};i=new g.ZeroFilled(h),n=0,p={}}else i=a[q].time_series,n=a[q].hits,p=a[q].counters;d.each(f.entries,function(a){var c;n+=a.count,b.hits+=a.count,p[a.time]=(p[a.time]||0)+a.count,"count"===b.panel.mode?c=(i._data[a.time]||0)+a.count:"mean"===b.panel.mode?c=((i._data[a.time]||0)*(p[a.time]-a.count)+a.mean*a.count)/p[a.time]:"min"===b.panel.mode?c=d.isUndefined(i._data[a.time])?a.min:i._data[a.time]<a.min?i._data[a.time]:a.min:"max"===b.panel.mode?c=d.isUndefined(i._data[a.time])?a.max:i._data[a.time]>a.max?i._data[a.time]:a.max:"total"===b.panel.mode&&(c=(i._data[a.time]||0)+a.total),i.addValue(a.time,c)}),b.legend[q]={query:e,hits:n},a[q]={info:e,time_series:i,hits:n,counters:p},q++}),b.panel.annotate.enable&&(b.annotations=b.annotations.concat(d.map(c.hits.hits,function(a){var c=d.omit(a,"_source","sort","_score"),g=d.extend(e.flatten_json(a._source),c);return{min:a.sort[1],max:a.sort[1],eventType:"annotation",title:null,description:"<small><i class='icon-tag icon-flip-vertical'></i> "+g[b.panel.annotate.field]+"</small><br>"+f(a.sort[1]).format("YYYY-MM-DD HH:mm:ss"),score:a.sort[0]}})),b.annotations=d.sortBy(b.annotations,function(a){return a.score*("desc"===b.panel.annotate.sort[1]?-1:1)}),b.annotations=b.annotations.slice(0,b.panel.annotate.size))}}else b.panel.error=b.parse_error(c.error);b.$emit("render",a),j<h.indices.length-1&&b.get_data(a,j+1,k)})}},b.download_csv=function(){var a=new Blob([b.csv_data],{type:"text/csv"});return window.saveAs(a,b.panel.title+".csv"),!0},b.zoom=function(a){var c=i.timeRange("last"),d=c.to.valueOf()-c.from.valueOf(),e=c.to.valueOf()-d/2,g=e+d*a/2,h=e-d*a/2;if(g>Date.now()&&c.to<Date.now()){var j=g-Date.now();h-=j,g=Date.now()}a>1&&i.removeByType("time"),i.set({type:"time",from:f.utc(h).toDate(),to:f.utc(g).toDate(),field:b.panel.time_field})},b.populate_modal=function(c){b.inspector=a.toJson(JSON.parse(c.toString()),!0)},b.set_refresh=function(a){b.refresh=a},b.close_edit=function(){b.refresh&&b.get_data(),b.refresh=!1,b.$emit("render")},b.render=function(){b.$emit("render")}}]),i.directive("histogramChart",["dashboard","filterSrv",function(b,g){return{restrict:"A",template:"<div></div>",link:function(b,i){function j(a){return Math.log(0>a?0:a)/Math.log(b.panel.base)}function k(a){return Math.pow(b.panel.base,a)
}function l(a){try{i.css({height:b.row.height})}catch(f){return}try{d.each(a,function(a){a.label=a.info.alias,a.color=a.info.color})}catch(f){return}var g=e.interval_to_ms(b.panel.interval),h=b.panel.stack?!0:null;try{var l={legend:{show:!1},series:{stackpercent:b.panel.stack?b.panel.percentage:!1,stack:b.panel.percentage?null:h,lines:{show:b.panel.lines,fill:0===b.panel.fill?.001:b.panel.fill/10,lineWidth:b.panel.linewidth,steps:!1},bars:{show:b.panel.bars,fill:1,barWidth:g/1.5,zero:!1,lineWidth:0},points:{show:b.panel.points,fill:1,fillColor:!1,radius:b.panel.pointradius},shadowSize:1},yaxis:{show:b.panel["y-axis"],min:b.panel.grid.min,max:b.panel.percentage&&b.panel.stack?100:b.panel.grid.max},xaxis:{timezone:b.panel.timezone,show:b.panel["x-axis"],mode:"time",min:d.isUndefined(b.range.from)?null:b.range.from.getTime(),max:d.isUndefined(b.range.to)?null:b.range.to.getTime(),timeformat:m(b.panel.interval),monthNames:["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],dayNames:["So","Mo","Di","Mi","Do","Fr","Sa"],label:"Datetime",ticks:i.width()/100},grid:{backgroundColor:null,borderWidth:0,hoverable:!0,color:"#c8c8c8"}};"bytes"===b.panel.y_format&&(l.yaxis.mode="byte",l.yaxis.tickFormatter=function(a,b){return e.byteFormat(a,0,b.tickSize)}),"short"===b.panel.y_format&&(l.yaxis.tickFormatter=function(a,b){return e.shortFormat(a,0,b.tickSize)}),b.panel.annotate.enable&&(l.events={clustering:!0,levels:1,data:b.annotations,types:{annotation:{level:1,icon:{width:20,height:21,icon:"histogram-marker"}}}}),b.panel.interactive&&(l.selection={mode:"x",color:"#666"});var n=[];a.length>1&&(n=Array.prototype.concat.apply([],d.map(a,function(a){return a.time_series.getOrderedTimes()})),n=d.uniq(n.sort(function(a,b){return a-b}),!0));for(var t=0;t<a.length;t++){var u=a[t].time_series.getFlotPairs(n);b.panel.derivative&&(u=s(u)),1!==b.panel.scale&&(u=q(u,b.panel.scale)),b.panel.scaleSeconds&&(u=r(u,b.panel.interval)),a[t].data=u}b.panel.logarithmic&&(l.yaxis.transform=function(a){return 0===a?0:j(a)+1},l.yaxis.inverseTransform=function(a){return 0===a?0:k(a-1)},l.yaxis.ticks=p),o=c.plot(i,a,l)}catch(f){}}function m(a){var b=e.interval_to_seconds(a);return b>=2628e3?"%b %Y":b>=86400?"%a<br>%d.%m.%y":b>=60?"%H:%M<br>%a %d.%m":"%H:%M:%S"}var n,o;b.$on("refresh",function(){b.get_data()}),b.$on("render",function(a,b){n=b||n,l(n)}),b.to_csv=function(){var a,b,c;return a=[],b={},c=[],a.push('"time"'),d.each(n,function(c){a.push('"'+(c.info.alias||c.info.query)+'"'),d.each(c.data,function(a,c){b[c]||(b[c]={time:a[0],values:[]}),b[c].values.push(a[1]||0)}),b=d.filter(b,function(a){return a.values.length>0})}),c.push(a),d.each(b,function(a){var b=[];b.push(f(a.time).format('"YYYY-MM-DDTHH:mm:ss"')),d.each(a.values,function(a){b.push(a)}),c.push(b.join(","))}),c.join("\n")+"\n"},b.$watch("panel.span",function(){l(n)}),a.element(window).bind("resize",function(){l(n)});var p=function(a){var c=[],d=a.min,e=a.max,f=0===d?0:Math.floor(j(d)),g=Math.ceil(j(e)),h=b.panel.base%1?2:b.panel.base;if(isFinite(g-f)){for(;g>f;f++){0===f&&c.push(0);for(var i=1;h>i;i++)c.push(k(f)*i)}for(c.push(k(f)),f=0;c[f]<d;f++);for(g=c.length;c[g-1]>e;g--);c=c.slice(f,g)}return c},q=function(a,b){return d.map(a,function(a){return[a[0],a[1]*b]})},r=function(a,b){return d.map(a,function(a){return[a[0],a[1]/e.interval_to_seconds(b)]})},s=function(a){return d.map(a,function(b,c){var d;return d=0===c||null===b[1]?[b[0],null]:null===a[c-1][1]?[b[0],null]:[b[0],b[1]-a[c-1][1]]})},t=c("<div>");i.bind("plothover",function(a,c,d){var g,i,j,k;k=b.panel.legend?"":" per "+(b.panel.scaleSeconds?"1s":b.panel.interval),d?(g=d.series.info.alias||b.panel.tooltip.query_as_alias?'<small style="font-size:0.9em;"><i class="icon-circle" style="color:'+d.series.color+';"></i> '+(d.series.info.alias||d.series.info.query)+"</small><br>":e.query_color_dot(d.series.color,15)+" ",i=b.panel.stack&&"individual"===b.panel.tooltip.value_type?d.datapoint[1]-d.datapoint[2]:d.datapoint[1],"bytes"===b.panel.y_format&&(i=e.byteFormat(i,2)),i="short"===b.panel.y_format?e.shortFormat(i,2):h(i).format("0,0[.]000"),j="browser"===b.panel.timezone?f(d.datapoint[0]).format("YYYY-MM-DD HH:mm:ss"):f.utc(d.datapoint[0]).format("YYYY-MM-DD HH:mm:ss"),t.html(g+i+k+" @ "+j).place_tt(c.pageX,c.pageY)):t.detach()}),i.bind("plotselected",function(a,c){g.set({type:"time",from:f.utc(c.xaxis.from).toDate(),to:f.utc(c.xaxis.to).toDate(),field:b.panel.time_field})})}}}])});