(function(t){function e(e){for(var r,l,c=e[0],s=e[1],a=e[2],u=0,h=[];u<c.length;u++)l=c[u],Object.prototype.hasOwnProperty.call(i,l)&&i[l]&&h.push(i[l][0]),i[l]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);d&&d(e);while(h.length)h.shift()();return n.push.apply(n,a||[]),o()}function o(){for(var t,e=0;e<n.length;e++){for(var o=n[e],r=!0,l=1;l<o.length;l++){var s=o[l];0!==i[s]&&(r=!1)}r&&(n.splice(e--,1),t=c(c.s=o[0]))}return t}var r={},i={app:0},n=[];function l(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"f1e230e7"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.e=function(t){var e=[],o=i[t];if(0!==o)if(o)e.push(o[2]);else{var r=new Promise((function(e,r){o=i[t]=[e,r]}));e.push(o[2]=r);var n,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=l(t);var a=new Error;n=function(e){s.onerror=s.onload=null,clearTimeout(u);var o=i[t];if(0!==o){if(o){var r=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;a.message="Loading chunk "+t+" failed.\n("+r+": "+n+")",a.name="ChunkLoadError",a.type=r,a.request=n,o[1](a)}i[t]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:s})}),12e4);s.onerror=s.onload=n,document.head.appendChild(s)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,o){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(o,r,function(e){return t[e]}.bind(null,r));return o},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="",c.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],a=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var d=a;n.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("cd49")},"0450":function(t,e,o){},"0631":function(t,e,o){},"0b47":function(t,e,o){"use strict";o("79fa")},1049:function(t,e,o){},4064:function(t,e,o){"use strict";o("4de3")},4879:function(t,e,o){"use strict";o("7eb8")},"4de3":function(t,e,o){},"5c0b":function(t,e,o){"use strict";o("9c0c")},"5e5d":function(t,e,o){"use strict";o("0631")},"6fa3":function(t,e,o){},"79fa":function(t,e,o){},"7eb8":function(t,e,o){},"9ac3":function(t,e,o){"use strict";o("db62")},"9c0c":function(t,e,o){},a16d:function(t,e,o){},aaf3:function(t,e,o){"use strict";o("0450")},c922:function(t,e,o){},cd49:function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var r=o("2b0e"),i=o("ba91"),n=o("9483");Object(n["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});var l=o("bc3a"),c=o.n(l),s=o("2106"),a=o.n(s),u=(o("d3b7"),o("3ca3"),o("ddb0"),o("8c4f")),d=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{ref:"grid",staticClass:"grids-container"},[t.cells.length?o("div",{staticClass:"grid"},[o("div",{staticClass:"horizontal-container"},[t.countsAreVisible?o("cells-count-horizontal",{staticClass:"horizontal-cells-count-container"}):t._e()],1),o("div",[o("div",{staticClass:"vertical-container"},[t.countsAreVisible?o("cells-count-vertical",{staticClass:"vertical-cells-count-container"}):t._e()],1),o("div",{staticClass:"background-gid-container"},[o("background-grid",{staticClass:"background-gid"})],1),o("div",{staticClass:"cells-container",class:{hidden:!t.cellsAreVisible}},t._l(t.cellsCount,(function(t){return o("cell",{key:"cell-"+(t-1),attrs:{index:t}})})),1)])]):t._e(),t.UIIsVisible?o("colors-editor"):t._e(),t.UIIsVisible?o("div",{staticClass:"grid-settings"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.gridBorderWidth,expression:"gridBorderWidth"}],attrs:{type:"range",min:"0",max:"13",step:"1"},domProps:{value:t.gridBorderWidth},on:{change:t.updateBorderWidth,__r:function(e){t.gridBorderWidth=e.target.value}}})]):t._e(),t.UIIsVisible?o("bottom-menu"):t._e()],1)},h=[],g=o("d4ec"),p=o("bee2"),f=o("262e"),b=o("2caf"),v=o("9ab4"),C=o("1b40"),m=o("e774"),k=o("2909"),y=(o("159b"),o("a434"),o("8d27")),O=o("2f62");r["a"].use(O["a"]);var j=new O["a"].Store({state:{},mutations:{},actions:{},modules:{}}),M=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.importExportDatas=["settings","cells","cellsColors","backgroudColor","borderColor"],t.settings={grid:{title:"",width:10,height:10,border:{width:3}}},t.tempGridSetting={grid:{width:0,height:0}},t.cells=[],t.horizontalCellsCount=[],t.verticalCellsCount=[],t.cellsInteraction={clicked:!1},t.cellsColors=[],t.backgroudColor={r:150,g:150,b:150},t.borderColor={r:255,g:255,b:255},t.selectedColor=null,t}return Object(p["a"])(o,[{key:"getFullDatas",get:function(){var t={},e=this;return this.importExportDatas.forEach((function(o){t[o]=e[o]})),t}},{key:"importDatas",value:function(t){var e=this;this.importExportDatas.forEach((function(o){e.updateOneData({dataName:o,dataValue:t[o]})})),this.connectColorsIntances(),this.selectColor(this.cellsColors[0]),this.updateCounts()}},{key:"updateOneData",value:function(t){var e=t.dataName,o=t.dataValue,r=this;r[e]=o}},{key:"initGrid",value:function(){this.initColors();for(var t=0;t<this.settings.grid.height;t+=1)for(var e=0;e<this.settings.grid.width;e+=1)this.addNewCell()}},{key:"updateBorderWidth",value:function(t){this.settings.grid.border.width=t}},{key:"updateGridTitle",value:function(t){this.settings.grid.title=t}},{key:"updateGridWidth",value:function(t){this.saveGridSetting(),this.settings.grid.width=t,this.updateCellsLenght(),this.updateCounts()}},{key:"updateGridHeight",value:function(t){this.saveGridSetting(),this.settings.grid.height=t,this.updateCellsLenght(),this.updateCounts()}},{key:"saveGridSetting",value:function(){this.tempGridSetting=JSON.parse(JSON.stringify(this.settings))}},{key:"getCssGridColumns",get:function(){for(var t="",e=0;e<this.settings.grid.width;e+=1)t+="1fr ";return t}},{key:"getCssGridRows",get:function(){for(var t="",e=0;e<this.settings.grid.height;e+=1)t+="1fr ";return t}},{key:"updateCellsLenght",value:function(){var t=Object(k["a"])(this.cells);console.log(t),this.resetCells(),this.addNewCell(this.settings.grid.width*this.settings.grid.height);for(var e=0;e<this.settings.grid.height;e+=1)for(var o=0;o<this.settings.grid.width;o+=1){var r=!0;if((o>this.settings.grid.width-1||o>this.tempGridSetting.grid.width-1)&&(r=!1),(e>this.settings.grid.height-1||e>this.tempGridSetting.grid.height-1)&&(r=!1),r){var i=o+e*this.tempGridSetting.grid.width;if(i<t.length){var n=t[i],l=o+e*this.settings.grid.width;n.checked&&n.color&&this.checkCell({cellIndex:l,colorObj:n.color})}}}}},{key:"resetCells",value:function(){this.cells=[]}},{key:"addNewCell",value:function(t){if(t)for(var e=0;e<t;e+=1)this.cells.push({checked:!1,color:null});else this.cells.push({checked:!1,color:null})}},{key:"checkCell",value:function(t){var e=t.cellIndex,o=t.colorObj;this.cells[e].checked=!0,this.cells[e].color=o}},{key:"toggleCell",value:function(t){this.cellsInteraction.clicked&&(this.cells[t].checked=!this.cells[t].checked,this.cells[t].checked?this.cells[t].color=this.selectedColor:this.cells[t].color=null,this.updateCounts())}},{key:"cellsCount",get:function(){return this.settings.grid.width*this.settings.grid.height}},{key:"updateCounts",value:function(){0===this.cells.length&&this.initGrid(),this.updateHorizontalCounts(),this.updateVerticalCounts()}},{key:"updateHorizontalCounts",value:function(){this.horizontalCellsCount=[];for(var t=0;t<this.settings.grid.height;t+=1){for(var e={items:[]},o=0;o<this.settings.grid.width;o+=1){var r=t*this.settings.grid.width+o,i=this.cells[r];e.items[e.items.length-1]||e.items.push({number:0,color:null});var n=e.items[e.items.length-1];if(i.checked){var l=null;r-1&&(l=this.cells[r-1]),!l||l.checked&&l.color===i.color?(n.color=i.color,n.number+=1):n.number?e.items.push({number:1,color:i.color}):(null===n.color&&(n.color=i.color),n.number+=1)}}this.horizontalCellsCount.push(e)}}},{key:"updateVerticalCounts",value:function(){this.verticalCellsCount=[];for(var t=0;t<this.settings.grid.width;t+=1){for(var e={items:[]},o=0;o<this.settings.grid.height;o+=1){var r=o*this.settings.grid.width+t,i=this.cells[r];e.items[e.items.length-1]||e.items.push({number:0,color:null});var n=e.items[e.items.length-1];if(i.checked){var l=null,c=null;r-this.settings.grid.width>=0?(c=r-this.settings.grid.width,l=this.cells[r-this.settings.grid.width]):r-1+(this.cellsCount-1)>=0&&(c=r-1,c+=this.settings.grid.width*this.settings.grid.height-1,l=this.cells[c]),!l||l.checked&&l.color===i.color?(n.color=i.color,n.number+=1):n.number?e.items.push({number:1,color:n.color}):(null===n.color&&(n.color=i.color),n.number+=1)}}this.verticalCellsCount.push(e)}}},{key:"toggleCellsInteractionClicked",value:function(t){this.cellsInteraction.clicked=null!=t?t:!this.cellsInteraction.clicked}},{key:"connectColorsIntances",value:function(){var t=this;this.cells.forEach((function(e){for(var o=0;o<t.cellsColors.length;o+=1){var r=t.cellsColors[o];if(e.color){var i=r.r===e.color.r,n=r.g===e.color.g,l=r.b===e.color.b;i&&n&&l&&(e.color=r)}}}))}},{key:"initColors",value:function(){var t={r:Math.round(255*Math.random()),g:Math.round(255*Math.random()),b:Math.round(255*Math.random())};this.cellsColors.push(t),this.selectColor(this.cellsColors[0])}},{key:"selectColor",value:function(t){this.selectedColor=t}},{key:"addColor",value:function(t){if(t)this.cellsColors.push(t);else{var e={r:Math.round(255*Math.random()),g:Math.round(255*Math.random()),b:Math.round(255*Math.random())};this.cellsColors.push(e),this.selectColor(e)}}},{key:"updateColor",value:function(t){var e=t.newColor,o=t.colorIndex;this.cellsColors[o].r=e.r,this.cellsColors[o].g=e.g,this.cellsColors[o].b=e.b}},{key:"updateBasicColor",value:function(t){var e=t.newColor,o=t.colorObj;o.r=e.r,o.g=e.g,o.b=e.b}},{key:"deleteColor",value:function(t){this.cellsColors.length>1&&(this.cellsColors.splice(t,1),this.selectColor(this.cellsColors[this.cellsColors.length-1]))}}]),o}(y["d"]);Object(v["a"])([y["a"]],M.prototype,"importDatas",null),Object(v["a"])([y["c"]],M.prototype,"updateOneData",null),Object(v["a"])([y["a"]],M.prototype,"initGrid",null),Object(v["a"])([y["c"]],M.prototype,"updateBorderWidth",null),Object(v["a"])([y["c"]],M.prototype,"updateGridTitle",null),Object(v["a"])([y["a"]],M.prototype,"updateGridWidth",null),Object(v["a"])([y["a"]],M.prototype,"updateGridHeight",null),Object(v["a"])([y["c"]],M.prototype,"saveGridSetting",null),Object(v["a"])([y["a"]],M.prototype,"updateCellsLenght",null),Object(v["a"])([y["c"]],M.prototype,"resetCells",null),Object(v["a"])([y["c"]],M.prototype,"addNewCell",null),Object(v["a"])([y["c"]],M.prototype,"checkCell",null),Object(v["a"])([y["a"]],M.prototype,"toggleCell",null),Object(v["a"])([y["a"]],M.prototype,"updateCounts",null),Object(v["a"])([y["c"]],M.prototype,"updateHorizontalCounts",null),Object(v["a"])([y["c"]],M.prototype,"updateVerticalCounts",null),Object(v["a"])([y["c"]],M.prototype,"toggleCellsInteractionClicked",null),Object(v["a"])([y["c"]],M.prototype,"connectColorsIntances",null),Object(v["a"])([y["a"]],M.prototype,"initColors",null),Object(v["a"])([y["c"]],M.prototype,"selectColor",null),Object(v["a"])([y["a"]],M.prototype,"addColor",null),Object(v["a"])([y["c"]],M.prototype,"updateColor",null),Object(v["a"])([y["c"]],M.prototype,"updateBasicColor",null),Object(v["a"])([y["a"]],M.prototype,"deleteColor",null),M=Object(v["a"])([y["b"]],M);var w=new M({store:j,name:"grid"}),x=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cells-count-horizontal"},t._l(t.horizontalCellsCount,(function(e,r){return o("div",{key:"cells-count-row-"+r,staticClass:"cells-count-row"},t._l(e.items,(function(e,r){return o("div",{key:"cells-horizontal-count-"+r,staticClass:"cells-count-row-item",style:t.getCssCount(e)},[t._v(" "+t._s(e.number)+" ")])})),0)})),0)},_=[],I=(o("99af"),function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t}return Object(p["a"])(o,[{key:"horizontalCellsCount",get:function(){return this.gridModule.horizontalCellsCount}},{key:"borderColor",get:function(){return this.gridModule.backgroudColor}},{key:"getCssCount",value:function(t){return t.color?{color:"rgb(".concat(t.color.r,", ").concat(t.color.g,", ").concat(t.color.b,")")}:{color:"rgb(".concat(this.borderColor.r,", ").concat(this.borderColor.g,", ").concat(this.borderColor.b,")")}}}]),o}(C["b"]));I=Object(v["a"])([C["a"]],I);var G=I,E=G,S=(o("fcd3"),o("2877")),V=Object(S["a"])(E,x,_,!1,null,"6ff479f6",null),P=V.exports,T=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cells-count-vertical"},t._l(t.verticalCellsCount,(function(e,r){return o("div",{key:"cells-count-column-"+r,staticClass:"cells-count-column"},t._l(e.items,(function(e,r){return o("div",{key:"cells-vertical-count-"+r,staticClass:"cells-count-column-item",style:t.getCssCount(e)},[t._v(" "+t._s(e.number)+" ")])})),0)})),0)},$=[],B=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t}return Object(p["a"])(o,[{key:"verticalCellsCount",get:function(){return this.gridModule.verticalCellsCount}},{key:"borderColor",get:function(){return this.gridModule.backgroudColor}},{key:"getCssCount",value:function(t){return t.color?{color:"rgb(".concat(t.color.r,", ").concat(t.color.g,", ").concat(t.color.b,")")}:{color:"rgb(".concat(this.borderColor.r,", ").concat(this.borderColor.g,", ").concat(this.borderColor.b,")")}}}]),o}(C["b"]);B=Object(v["a"])([C["a"]],B);var N=B,W=N,D=(o("aaf3"),Object(S["a"])(W,T,$,!1,null,"70bf183a",null)),A=D.exports,z=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"background-cells-container"},t._l(t.cellsCount,(function(t){return o("div",{key:"cell-"+t,staticClass:"cell"},[o("div",{staticClass:"cell-border-item"})])})),0)},U=[],H=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t}return Object(p["a"])(o,[{key:"grid",get:function(){return this.gridModule.settings.grid}},{key:"cellsCount",get:function(){return this.gridModule.settings.grid.width*this.gridModule.settings.grid.height}}]),o}(C["b"]);H=Object(v["a"])([C["a"]],H);var L=H,R=L,J=(o("9ac3"),Object(S["a"])(R,z,U,!1,null,"17fc442e",null)),F=J.exports,X=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"colors-editor-container"},[o("div",{staticClass:"gid-colors-container"},[o("simple-color-component",{attrs:{color:t.backgroundGridColor,"no-margin-top":""}}),o("simple-color-component",{attrs:{color:t.borderGridColor}})],1),t._l(t.cellsColor,(function(t,e){return o("color-component",{key:"color-"+e,attrs:{color:t,"color-index":e}})})),o("div",{staticClass:"button",on:{click:t.addNewColor}},[t._v("+")])],2)},q=[],K=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"color-container"},[o("div",{staticClass:"color-button",class:{selected:t.isSelected},style:t.getCssColor,attrs:{for:"color-input"},on:{click:t.clickedButton}},[t.isSelected&&t.canDelete?o("div",{staticClass:"delete-buton",on:{click:function(e){return t.deleteColor(e)}}},[t._v("-")]):t._e()]),o("input",{ref:"colorPicker",staticClass:"color-input",attrs:{type:"color",name:"color-input"},on:{change:function(e){return t.updateEditorColor(e)}}})])},Q=[];o("a9e3"),o("4de4"),o("ac1f"),o("5319"),o("25f0");function Y(t){var e=t.replace("#","");3===e.length&&(e="".concat(e[0]).concat(e[0]).concat(e[1]).concat(e[1]).concat(e[2]).concat(e[2]));var o=parseInt(e.substring(0,2),16),r=parseInt(e.substring(2,4),16),i=parseInt(e.substring(4,6),16);return{r:o,g:r,b:i}}function Z(t){var e=t.toString(16);return 1===e.length?"0".concat(e):e}function tt(t){return"#".concat(Z(t.r)).concat(Z(t.g)).concat(Z(t.b))}var et=r["a"].extend({props:{color:Object,colorIndex:Number}}),ot=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t}return Object(p["a"])(o,[{key:"mounted",value:function(){this.updateInputColorValue()}},{key:"updateEditorColor",value:function(t){var e=Y(t.target.value);this.gridModule.updateColor({newColor:e,colorIndex:this.colorIndex}),this.updateInputColorValue()}},{key:"clickedButton",value:function(){this.isSelected?this.$refs.colorPicker.click():this.gridModule.selectColor(this.color)}},{key:"deleteColor",value:function(t){t.stopPropagation(),this.gridModule.deleteColor(this.colorIndex)}},{key:"canDelete",get:function(){var t=this;if(this.gridModule.cellsColors.length>1){var e=this.gridModule.cells.filter((function(e){return e.color==t.color}));return!(e.length>0)}return!1}},{key:"isSelected",get:function(){return this.color==this.gridModule.selectedColor}},{key:"getCssColor",get:function(){var t={"background-color":"rgb(".concat(this.color.r,", ").concat(this.color.g,", ").concat(this.color.b,")")};return t}},{key:"updateInputColorValue",value:function(){this.$refs.colorPicker.value=tt(this.color)}}]),o}(et);ot=Object(v["a"])([C["a"]],ot);var rt=ot,it=rt,nt=(o("4879"),Object(S["a"])(it,K,Q,!1,null,"8d2e7a92",null)),lt=nt.exports,ct=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"color-container"},[o("div",{staticClass:"color-button",class:{"no-margin-top":t.noMarginTop},style:t.getCssColor,attrs:{for:"color-input"},on:{click:t.clickedButton}}),o("input",{ref:"colorPicker",staticClass:"color-input",attrs:{type:"color",name:"color-input"},on:{change:function(e){return t.updateEditorColor(e)}}})])},st=[],at=r["a"].extend({props:{color:Object,colorIndex:Number,noMarginTop:Boolean}}),ut=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t}return Object(p["a"])(o,[{key:"mounted",value:function(){this.updateInputColorValue()}},{key:"updateEditorColor",value:function(t){var e=Y(t.target.value);this.gridModule.updateBasicColor({newColor:e,colorObj:this.color}),this.updateInputColorValue()}},{key:"clickedButton",value:function(){this.$refs.colorPicker.click()}},{key:"deleteColor",value:function(t){t.stopPropagation(),this.gridModule.deleteColor(this.colorIndex)}},{key:"canDelete",get:function(){return this.gridModule.cellsColors.length>1}},{key:"isSelected",get:function(){return this.color==this.gridModule.selectedColor}},{key:"getCssColor",get:function(){var t={"background-color":"rgb(".concat(this.color.r,", ").concat(this.color.g,", ").concat(this.color.b,")")};return t}},{key:"updateInputColorValue",value:function(){this.$refs.colorPicker.value=tt(this.color)}}]),o}(at);ut=Object(v["a"])([C["a"]],ut);var dt=ut,ht=dt,gt=(o("eb08"),Object(S["a"])(ht,ct,st,!1,null,"23592fe7",null)),pt=gt.exports,ft=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t}return Object(p["a"])(o,[{key:"cellsColor",get:function(){return this.gridModule.cellsColors}},{key:"backgroundGridColor",get:function(){return this.gridModule.backgroudColor}},{key:"borderGridColor",get:function(){return this.gridModule.borderColor}},{key:"addNewColor",value:function(){this.gridModule.addColor()}}]),o}(C["b"]);ft=Object(v["a"])([Object(C["a"])({components:{colorComponent:lt,simpleColorComponent:pt}})],ft);var bt=ft,vt=bt,Ct=(o("0b47"),Object(S["a"])(vt,X,q,!1,null,"62bf4d14",null)),mt=Ct.exports,kt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"bottom-nav-container"},[o("div",{staticClass:"title-container"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.gridTitle,expression:"gridTitle"}],attrs:{type:"text"},domProps:{value:t.gridTitle},on:{change:t.updateTitleGrid,input:function(e){e.target.composing||(t.gridTitle=e.target.value)}}})]),o("div",{staticClass:"grid-sizing"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.gridWidth,expression:"gridWidth"}],attrs:{type:"number"},domProps:{value:t.gridWidth},on:{change:t.updateGridWidth,input:function(e){e.target.composing||(t.gridWidth=e.target.value)}}}),o("p",{staticClass:"division"},[t._v("/")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.gridHeight,expression:"gridHeight"}],attrs:{type:"number"},domProps:{value:t.gridHeight},on:{change:t.updateGridHeight,input:function(e){e.target.composing||(t.gridHeight=e.target.value)}}})]),o("div",{staticClass:"export-container"},[o("p",{staticClass:"export-title"},[t._v("EXPORT:")]),o("p",{staticClass:"button export-button",on:{click:t.exportGame}},[t._v("GAME")]),o("p",{staticClass:"button export-button",on:{click:t.exportSolution}},[t._v("SOLUTION")]),o("p",{staticClass:"button export-button",on:{click:t.exportData}},[t._v("DATA")])]),o("div",{staticClass:"import-container"},[o("p",{staticClass:"export-title"},[t._v("IMPORT:")]),o("input",{ref:"fileInput",staticClass:"file-input",attrs:{type:"file",id:"input"},on:{change:function(e){return t.uploadJsonFile(e)}}}),o("p",{staticClass:"button export-button",on:{click:t.clickInputData}},[t._v("DATA")])])])},yt=[];o("2b3d");function Ot(t,e){var o=document.createElement("a"),r=new Blob([JSON.stringify(t,null,2)],{type:"application/json"});o.href=URL.createObjectURL(r),o.download=e,o.click()}var jt=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t.gridWidth=t.gridModule.settings.grid.width,t.gridHeight=t.gridModule.settings.grid.height,t.gridTitle=t.gridModule.settings.grid.title,t}return Object(p["a"])(o,[{key:"mounted",value:function(){var t=this;this.axios.get("/pix-grid/pix-editor.json").then((function(e){t.importData(e.data)}))}},{key:"updateBottomMenuDatas",value:function(){this.gridWidth=this.gridModule.settings.grid.width,this.gridHeight=this.gridModule.settings.grid.height,this.gridTitle=this.gridModule.settings.grid.title}},{key:"updateGridWidth",value:function(){this.gridModule.updateGridWidth(this.gridWidth)}},{key:"updateGridHeight",value:function(){this.gridModule.updateGridHeight(this.gridHeight)}},{key:"updateTitleGrid",value:function(){this.gridModule.updateGridTitle(this.gridTitle)}},{key:"exportGame",value:function(){this.$bus.$emit("EXPORT_GAME")}},{key:"exportSolution",value:function(){this.$bus.$emit("EXPORT_SOLUTION")}},{key:"exportData",value:function(){var t=this.gridModule.getFullDatas,e=t.settings.grid.title;0==e.length&&(e="no-title"),e=e.toLowerCase().replace(/\s/g,"-"),e+=".json",Ot(t,e)}},{key:"clickInputData",value:function(){if(this.$refs.fileInput){var t=this.$refs.fileInput;t.click()}}},{key:"uploadJsonFile",value:function(t){var e=this,o=t.target.files;if(o&&o[0]){var r=o[0];if("application/json"!=r.type)return void alert("Please select JSON files only!");var i=new FileReader;i.onload=function(t){if("string"===typeof i.result){i.result;e.importData(JSON.parse(i.result))}},i.readAsText(r)}}},{key:"importData",value:function(t){this.gridModule.importDatas(t);this.updateBottomMenuDatas()}}]),o}(C["b"]);jt=Object(v["a"])([Object(C["a"])({})],jt);var Mt=jt,wt=Mt,xt=(o("fbd1"),Object(S["a"])(wt,kt,yt,!1,null,"1969849f",null)),_t=xt.exports,It=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cell",class:{checked:t.cells[t.index-1].checked},style:t.cellCss,attrs:{id:"cell-"+(t.index-1)},on:{mouseover:function(e){return t.gridModule.toggleCell(t.index-1)},mousedown:function(e){return t.mouseDownCell(t.index-1)},mouseup:function(e){return t.mouseUpCell()}}})},Gt=[],Et=r["a"].extend({props:{index:Number,cell:Number}}),St=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t}return Object(p["a"])(o,[{key:"cells",get:function(){return this.gridModule.cells}},{key:"cellCss",get:function(){if(this.cells[this.index-1]&&this.cells[this.index-1].color){var t=this.cells[this.index-1].color;return{"background-color":"rgb(".concat(null===t||void 0===t?void 0:t.r,",").concat(null===t||void 0===t?void 0:t.g,",").concat(null===t||void 0===t?void 0:t.b,")")}}return{}}},{key:"mouseDownCell",value:function(t){this.gridModule.toggleCellsInteractionClicked(),this.gridModule.toggleCell(t)}},{key:"mouseUpCell",value:function(){this.gridModule.toggleCellsInteractionClicked()}}]),o}(Et);St=Object(v["a"])([C["a"]],St);var Vt=St,Pt=Vt,Tt=(o("5e5d"),Object(S["a"])(Pt,It,Gt,!1,null,"7870061a",null)),$t=Tt.exports,Bt=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t.gridBorderWidth=10,t.UIIsVisible=!0,t.cellsAreVisible=!0,t.countsAreVisible=!0,t}return Object(p["a"])(o,[{key:"onGridBorderWidthChange",value:function(){this.updateBorderWidth()}},{key:"grid",get:function(){return this.gridModule.settings.grid}},{key:"cellsCount",get:function(){return this.grid.width*this.grid.height}},{key:"cells",get:function(){return this.gridModule.cells}},{key:"mounted",value:function(){this.gridModule.updateCounts(),this.$bus.$on("EXPORT_GAME",this.exportGame),this.$bus.$on("EXPORT_SOLUTION",this.exportSolution),this.gridBorderWidth=this.gridModule.settings.grid.border.width}},{key:"exportGame",value:function(){var t=this;this.UIIsVisible=!1,this.cellsAreVisible=!1;var e=this.$refs.grid;m["a"](e,{pixelRatio:3}).then((function(e){var o=document.createElement("a");o.download="pix-export.png",o.href=e,o.click(),o.classList.add("inexistant"),t.UIIsVisible=!0,t.cellsAreVisible=!0})).catch((function(e){console.error("oops, something went wrong!",e),t.UIIsVisible=!0,t.cellsAreVisible=!0}))}},{key:"exportSolution",value:function(){var t=this;this.UIIsVisible=!1,this.countsAreVisible=!1;var e=this.$refs.grid;m["a"](e,{pixelRatio:3}).then((function(e){var o=document.createElement("a");o.download="pix-export.png",o.href=e,o.click(),o.classList.add("inexistant"),t.UIIsVisible=!0,t.countsAreVisible=!0})).catch((function(e){console.error("oops, something went wrong!",e),t.UIIsVisible=!0,t.countsAreVisible=!0}))}},{key:"updateBorderWidth",value:function(){this.gridModule.updateBorderWidth(this.gridBorderWidth)}}]),o}(C["b"]);Object(v["a"])([Object(C["c"])("gridBorderWidth")],Bt.prototype,"onGridBorderWidthChange",null),Bt=Object(v["a"])([Object(C["a"])({components:{cellsCountHorizontal:P,cellsCountVertical:A,backgroundGrid:F,ColorsEditor:mt,Cell:$t,BottomMenu:_t}})],Bt);var Nt=Bt,Wt=Nt,Dt=(o("e249"),Object(S["a"])(Wt,d,h,!1,null,"00b458e6",null)),At=Dt.exports;r["a"].use(u["a"]);var zt=[{path:"/",name:"grid",component:At},{path:"/Pages",name:"Pages",component:function(){return o.e("about").then(o.bind(null,"ee3e"))}},{path:"/About",name:"About",component:function(){return o.e("about").then(o.bind(null,"f820"))}}],Ut=new u["a"]({routes:zt}),Ht=Ut,Lt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container",style:t.cssVars,attrs:{id:"app"},on:{mousedown:t.toggleSystemClick,mouseup:t.toggleSystemClick}},[o("background"),o("editor-nav"),o("router-view")],1)},Rt=[];function Jt(t,e,o,r,i){return(i-t)*(r-o)/(e-t+o)}var Ft=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Xt=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("header",{staticClass:"editor-nav"},[o("h1",[t._v("PIX Editor")])])}],qt=(o("b0c0"),function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){return Object(g["a"])(this,o),e.apply(this,arguments)}return Object(p["a"])(o,[{key:"goToPage",value:function(t){this.$route.name!==t&&this.$router.push({name:t})}}]),o}(C["b"]));qt=Object(v["a"])([C["a"]],qt);var Kt=qt,Qt=Kt,Yt=(o("e4f6"),Object(S["a"])(Qt,Ft,Xt,!1,null,"ba9b688e",null)),Zt=Yt.exports,te=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"background-container",style:t.rectVars},t._l(t.rectsCount,(function(t){return o("div",{key:"rect-"+t,staticClass:"rect"},[o("div",{staticClass:"decorator"})])})),0)},ee=[],oe=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.rectSize=30,t.rectsCount=0,t}return Object(p["a"])(o,[{key:"rectVars",get:function(){return{"--rect-size":"".concat(this.rectSize,"px")}}}]),o}(C["b"]);oe=Object(v["a"])([Object(C["a"])({})],oe);var re=oe,ie=re,ne=(o("4064"),Object(S["a"])(ie,te,ee,!1,null,"c21f7848",null)),le=ne.exports,ce=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.gridModule=w,t.mouse={clicked:!1},t}return Object(p["a"])(o,[{key:"toggleClicked",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.mouse.clicked=null!=t?t:!this.mouse.clicked,!1===this.mouse.clicked&&w.toggleCellsInteractionClicked(!1)}},{key:"disableOtherClick",value:function(){this.gridModule.toggleCellsInteractionClicked(!1)}}]),o}(y["d"]);Object(v["a"])([y["c"]],ce.prototype,"toggleClicked",null),Object(v["a"])([y["c"]],ce.prototype,"disableOtherClick",null),ce=Object(v["a"])([y["b"]],ce);var se=new ce({store:j,name:"system"}),ae=function(t){Object(f["a"])(o,t);var e=Object(b["a"])(o);function o(){var t;return Object(g["a"])(this,o),t=e.apply(this,arguments),t.systemModule=se,t.gridModule=w,t}return Object(p["a"])(o,[{key:"mouse",get:function(){return this.gridModule.cellsInteraction}},{key:"toggleSystemClick",value:function(){this.systemModule.toggleClicked()}},{key:"disableOtherClick",value:function(){this.systemModule.disableOtherClick()}},{key:"getClickState",get:function(){return this.systemModule.mouse.clicked}},{key:"backgroundColor",get:function(){var t="rgb(".concat(this.gridModule.backgroudColor.r);return t+=",".concat(this.gridModule.backgroudColor.g),t+=",".concat(this.gridModule.backgroudColor.b),t}},{key:"borderColor",get:function(){var t="rgba(".concat(this.gridModule.borderColor.r);return t+=",".concat(this.gridModule.borderColor.g),t+=",".concat(this.gridModule.borderColor.b),t}},{key:"cssVars",get:function(){var t=this.gridModule.settings.grid.border.width+5;return{"--grid-border-width":"".concat(this.gridModule.settings.grid.border.width,"px"),"--grid-cells-count-margin":"".concat(t,"px"),"--grid-template-columns":this.gridModule.getCssGridColumns,"--grid-template-rows":this.gridModule.getCssGridRows,"--grid-border-color":this.backgroundColor,"--grid-background-color":this.borderColor,"--grid-count-font-weigth":String(Jt(0,13,400,1e3,this.gridModule.settings.grid.border.width))}}}]),o}(C["b"]);ae=Object(v["a"])([Object(C["a"])({components:{EditorNav:Zt,Background:le}})],ae);var ue=ae,de=ue,he=(o("5c0b"),Object(S["a"])(de,Lt,Rt,!1,null,null,null)),ge=he.exports;r["a"].use(a.a,c.a),r["a"].use(i["a"]);var pe=new i["a"].Bus;r["a"].config.productionTip=!1,new r["a"]({router:Ht,store:j,bus:pe,render:function(t){return t(ge)}}).$mount("#app")},db62:function(t,e,o){},e249:function(t,e,o){"use strict";o("1049")},e4f6:function(t,e,o){"use strict";o("c922")},eb08:function(t,e,o){"use strict";o("ff48")},fbd1:function(t,e,o){"use strict";o("a16d")},fcd3:function(t,e,o){"use strict";o("6fa3")},ff48:function(t,e,o){}});
//# sourceMappingURL=app.3aa19761.js.map