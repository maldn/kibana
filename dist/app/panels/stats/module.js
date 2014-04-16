/*! kibana - v3.0.0 - 2014-04-16
 * Copyright (c) 2014 Rashid Khan; Licensed Apache License */

(function(){function a(a){this._value=a}function b(a,b,c,d){var e,f,g=Math.pow(10,b);return f=(c(a*g)/g).toFixed(b),d&&(e=new RegExp("0{1,"+d+"}$"),f=f.replace(e,"")),f}function c(a,b,c){var d;return d=b.indexOf("$")>-1?e(a,b,c):b.indexOf("%")>-1?f(a,b,c):b.indexOf(":")>-1?g(a,b):i(a._value,b,c)}function d(a,b){var c,d,e,f,g,i=b,j=["KB","MB","GB","TB","PB","EB","ZB","YB"],k=!1;if(b.indexOf(":")>-1)a._value=h(b);else if(b===o)a._value=0;else{for("."!==m[n].delimiters.decimal&&(b=b.replace(/\./g,"").replace(m[n].delimiters.decimal,".")),c=new RegExp("[^a-zA-Z]"+m[n].abbreviations.thousand+"(?:\\)|(\\"+m[n].currency.symbol+")?(?:\\))?)?$"),d=new RegExp("[^a-zA-Z]"+m[n].abbreviations.million+"(?:\\)|(\\"+m[n].currency.symbol+")?(?:\\))?)?$"),e=new RegExp("[^a-zA-Z]"+m[n].abbreviations.billion+"(?:\\)|(\\"+m[n].currency.symbol+")?(?:\\))?)?$"),f=new RegExp("[^a-zA-Z]"+m[n].abbreviations.trillion+"(?:\\)|(\\"+m[n].currency.symbol+")?(?:\\))?)?$"),g=0;g<=j.length&&!(k=b.indexOf(j[g])>-1?Math.pow(1024,g+1):!1);g++);a._value=(k?k:1)*(i.match(c)?Math.pow(10,3):1)*(i.match(d)?Math.pow(10,6):1)*(i.match(e)?Math.pow(10,9):1)*(i.match(f)?Math.pow(10,12):1)*(b.indexOf("%")>-1?.01:1)*((b.split("-").length+Math.min(b.split("(").length-1,b.split(")").length-1))%2?1:-1)*Number(b.replace(/[^0-9\.]+/g,"")),a._value=k?Math.ceil(a._value):a._value}return a._value}function e(a,b,c){var d,e=b.indexOf("$")<=1?!0:!1,f="";return b.indexOf(" $")>-1?(f=" ",b=b.replace(" $","")):b.indexOf("$ ")>-1?(f=" ",b=b.replace("$ ","")):b=b.replace("$",""),d=i(a._value,b,c),e?d.indexOf("(")>-1||d.indexOf("-")>-1?(d=d.split(""),d.splice(1,0,m[n].currency.symbol+f),d=d.join("")):d=m[n].currency.symbol+f+d:d.indexOf(")")>-1?(d=d.split(""),d.splice(-1,0,f+m[n].currency.symbol),d=d.join("")):d=d+f+m[n].currency.symbol,d}function f(a,b,c){var d,e="",f=100*a._value;return b.indexOf(" %")>-1?(e=" ",b=b.replace(" %","")):b=b.replace("%",""),d=i(f,b,c),d.indexOf(")")>-1?(d=d.split(""),d.splice(-1,0,e+"%"),d=d.join("")):d=d+e+"%",d}function g(a){var b=Math.floor(a._value/60/60),c=Math.floor((a._value-60*b*60)/60),d=Math.round(a._value-60*b*60-60*c);return b+":"+(10>c?"0"+c:c)+":"+(10>d?"0"+d:d)}function h(a){var b=a.split(":"),c=0;return 3===b.length?(c+=60*Number(b[0])*60,c+=60*Number(b[1]),c+=Number(b[2])):2===b.length&&(c+=60*Number(b[0]),c+=Number(b[1])),Number(c)}function i(a,c,d){var e,f,g,h,i,j,k=!1,l=!1,p=!1,q="",r="",s="",t=Math.abs(a),u=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],v="",w=!1;if(0===a&&null!==o)return o;if(c.indexOf("(")>-1?(k=!0,c=c.slice(1,-1)):c.indexOf("+")>-1&&(l=!0,c=c.replace(/\+/g,"")),c.indexOf("a")>-1&&(c.indexOf(" a")>-1?(q=" ",c=c.replace(" a","")):c=c.replace("a",""),t>=Math.pow(10,12)?(q+=m[n].abbreviations.trillion,a/=Math.pow(10,12)):t<Math.pow(10,12)&&t>=Math.pow(10,9)?(q+=m[n].abbreviations.billion,a/=Math.pow(10,9)):t<Math.pow(10,9)&&t>=Math.pow(10,6)?(q+=m[n].abbreviations.million,a/=Math.pow(10,6)):t<Math.pow(10,6)&&t>=Math.pow(10,3)&&(q+=m[n].abbreviations.thousand,a/=Math.pow(10,3))),c.indexOf("b")>-1)for(c.indexOf(" b")>-1?(r=" ",c=c.replace(" b","")):c=c.replace("b",""),g=0;g<=u.length;g++)if(e=Math.pow(1024,g),f=Math.pow(1024,g+1),a>=e&&f>a){r+=u[g],e>0&&(a/=e);break}return c.indexOf("o")>-1&&(c.indexOf(" o")>-1?(s=" ",c=c.replace(" o","")):c=c.replace("o",""),s+=m[n].ordinal(a)),c.indexOf("[.]")>-1&&(p=!0,c=c.replace("[.]",".")),h=a.toString().split(".")[0],i=c.split(".")[1],j=c.indexOf(","),i?(i.indexOf("[")>-1?(i=i.replace("]",""),i=i.split("["),v=b(a,i[0].length+i[1].length,d,i[1].length)):v=b(a,i.length,d),h=v.split(".")[0],v=v.split(".")[1].length?m[n].delimiters.decimal+v.split(".")[1]:"",p&&0===Number(v.slice(1))&&(v="")):h=b(a,null,d),h.indexOf("-")>-1&&(h=h.slice(1),w=!0),j>-1&&(h=h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+m[n].delimiters.thousands)),0===c.indexOf(".")&&(h=""),(k&&w?"(":"")+(!k&&w?"-":"")+(!w&&l?"+":"")+h+v+(s?s:"")+(q?q:"")+(r?r:"")+(k&&w?")":"")}function j(a,b){m[a]=b}var k,l="1.5.2",m={},n="en",o=null,p="0,0",q="undefined"!=typeof module&&module.exports;k=function(b){return k.isNumeral(b)?b=b.value():0===b||"undefined"==typeof b?b=0:Number(b)||(b=k.fn.unformat(b)),new a(Number(b))},k.version=l,k.isNumeral=function(b){return b instanceof a},k.language=function(a,b){if(!a)return n;if(a&&!b){if(!m[a])throw new Error("Unknown language : "+a);n=a}return(b||!m[a])&&j(a,b),k},k.languageData=function(a){if(!a)return m[n];if(!m[a])throw new Error("Unknown language : "+a);return m[a]},k.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"},currency:{symbol:"$"}}),k.zeroFormat=function(a){o="string"==typeof a?a:null},k.defaultFormat=function(a){p="string"==typeof a?a:"0.0"},k.fn=a.prototype={clone:function(){return k(this)},format:function(a,b){return c(this,a?a:p,void 0!==b?b:Math.round)},unformat:function(a){return"[object Number]"===Object.prototype.toString.call(a)?a:d(this,a?a:p)},value:function(){return this._value},valueOf:function(){return this._value},set:function(a){return this._value=Number(a),this},add:function(a){return this._value=this._value+Number(a),this},subtract:function(a){return this._value=this._value-Number(a),this},multiply:function(a){return this._value=this._value*Number(a),this},divide:function(a){return this._value=this._value/Number(a),this},difference:function(a){var b=this._value-Number(a);return 0>b&&(b=-b),b}},q&&(module.exports=k),"undefined"==typeof ender&&(this.numeral=k),"function"==typeof define&&define.amd&&define("numeral",[],function(){return k})}).call(this),define("panels/stats/module",["angular","app","lodash","jquery","kbn","numeral"],function(a,b,c,d,e,f){var g=a.module("kibana.panels.stats",[]);b.useModule(g),g.controller("stats",["$scope","querySrv","dashboard","filterSrv",function(b,d,e,f){b.panelMeta={modals:[{description:"Inspect",icon:"icon-info-sign",partial:"app/partials/inspector.html",show:b.panel.spyable}],editorTabs:[{title:"Queries",src:"app/partials/querySelect.html"}],status:"Beta",description:"A statistical panel for displaying aggregations using the Elastic Search statistical facet query."};var g={queries:{mode:"all",ids:[]},style:{"font-size":"24pt"},format:"number",mode:"count",display_breakdown:"yes",sort_field:"",sort_reverse:!1,label_name:"Query",value_name:"Value",spyable:!0};c.defaults(b.panel,g),b.init=function(){b.ready=!1,b.$on("refresh",function(){b.get_data()}),b.get_data()},b.set_sort=function(a){b.panel.sort_field===a&&b.panel.sort_reverse===!1?b.panel.sort_reverse=!0:b.panel.sort_field===a&&b.panel.sort_reverse===!0?(b.panel.sort_field="",b.panel.sort_reverse=!1):(b.panel.sort_field=a,b.panel.sort_reverse=!1)},b.get_data=function(){if(0!==e.indices.length){b.panelMeta.loading=!0;var g,h,i,j;g=b.ejs.Request().indices(e.indices),b.panel.queries.ids=d.idsByMode(b.panel.queries),j=d.getQueryObjs(b.panel.queries.ids),i=b.ejs.BoolQuery(),c.each(j,function(a){i=i.should(d.toEjsObj(a))}),g=g.facet(b.ejs.StatisticalFacet("stats").field(b.panel.field).facetFilter(b.ejs.QueryFilter(b.ejs.FilteredQuery(i,f.getBoolFilter(f.ids()))))).size(0),c.each(j,function(a){var c=a.alias||a.query,e=b.ejs.BoolQuery();e.should(d.toEjsObj(a)),g.facet(b.ejs.StatisticalFacet("stats_"+c).field(b.panel.field).facetFilter(b.ejs.QueryFilter(b.ejs.FilteredQuery(e,f.getBoolFilter(f.ids())))))}),b.inspector=a.toJson(JSON.parse(g.toString()),!0),h=g.doSearch(),h.then(function(a){b.panelMeta.loading=!1;var d=a.facets.stats[b.panel.mode],e=j.map(function(d){var e=d.alias||d.query,f=c.clone(d);return f.label=e,f.Label=e.toLowerCase(),f.value=a.facets["stats_"+e][b.panel.mode],f.Value=a.facets["stats_"+e][b.panel.mode],f});b.data={value:d,rows:e},b.$emit("render")})}},b.set_refresh=function(a){b.refresh=a},b.close_edit=function(){b.refresh&&b.get_data(),b.refresh=!1,b.$emit("render")}}]),g.filter("formatstats",function(){return function(a,b){switch(b){case"money":a=f(a).format("0,0.00");break;case"bytes":a=f(a).format("0.00b");break;case"float":a=f(a).format("0.000");break;default:a=f(a).format("0,0")}return a}})});