(function(t){function e(e){for(var r,l,c=e[0],s=e[1],a=e[2],u=0,h=[];u<c.length;u++)l=c[u],Object.prototype.hasOwnProperty.call(i,l)&&i[l]&&h.push(i[l][0]),i[l]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);d&&d(e);while(h.length)h.shift()();return n.push.apply(n,a||[]),o()}function o(){for(var t,e=0;e<n.length;e++){for(var o=n[e],r=!0,l=1;l<o.length;l++){var s=o[l];0!==i[s]&&(r=!1)}r&&(n.splice(e--,1),t=c(c.s=o[0]))}return t}var r={},i={app:0},n=[];function l(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"c6d178ac"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.e=function(t){var e=[],o=i[t];if(0!==o)if(o)e.push(o[2]);else{var r=new Promise((function(e,r){o=i[t]=[e,r]}));e.push(o[2]=r);var n,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=l(t);var a=new Error;n=function(e){s.onerror=s.onload=null,clearTimeout(u);var o=i[t];if(0!==o){if(o){var r=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;a.message="Loading chunk "+t+" failed.\n("+r+": "+n+")",a.name="ChunkLoadError",a.type=r,a.request=n,o[1](a)}i[t]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:s})}),12e4);s.onerror=s.onload=n,document.head.appendChild(s)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,o){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(o,r,function(e){return t[e]}.bind(null,r));return o},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="",c.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],a=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var d=a;n.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("cd49d")},"18b9":function(t,e,o){},"1dcd":function(t,e,o){"use strict";o("6c28")},4064:function(t,e,o){"use strict";o("4de3")},4356:function(t,e,o){},4374:function(t,e,o){"use strict";o("d64c")},4879:function(t,e,o){"use strict";o("7eb8")},"4de3":function(t,e,o){},"554e":function(t,e,o){"use strict";o("b288")},"5c0b":function(t,e,o){"use strict";o("9c0c")},"660b":function(t,e,o){"use strict";o("8027")},"6c28":function(t,e,o){},"74dc":function(t,e,o){"use strict";o("4356")},"7eb8":function(t,e,o){},8027:function(t,e,o){},8286:function(t,e,o){"use strict";o("8685")},8685:function(t,e,o){},"9ac3":function(t,e,o){"use strict";o("db62")},"9c0c":function(t,e,o){},b288:function(t,e,o){},cd49:function(t,e,o){},cd49d:function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var r=o("2b0e"),i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"app-container",style:t.cssVars,attrs:{id:"app"},on:{mousedown:t.toggleSystemClick,mouseup:t.toggleSystemClick}},[o("background"),o("editor-nav"),o("router-view"),o("p",[t._v("mouse "+t._s(t.mouse))])],1)},n=[],l=o("d4ec"),c=o("bee2"),s=o("262e"),a=o("2caf"),u=o("9ab4"),d=o("1b40"),h=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},g=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("header",{staticClass:"editor-nav"},[o("h1",[t._v("PIX")])])}],p=(o("b0c0"),function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){return Object(l["a"])(this,o),e.apply(this,arguments)}return Object(c["a"])(o,[{key:"goToPage",value:function(t){this.$route.name!==t&&this.$router.push({name:t})}}]),o}(d["b"]));p=Object(u["a"])([d["a"]],p);var b=p,f=b,v=(o("660b"),o("2877")),C=Object(v["a"])(f,h,g,!1,null,"96b7e1dc",null),k=C.exports,m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"background-container",style:t.rectVars},t._l(t.rectsCount,(function(t){return o("div",{key:"rect-"+t,staticClass:"rect"},[o("div",{staticClass:"decorator"})])})),0)},y=[],O=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.rectSize=30,t.rectsCount=0,t}return Object(c["a"])(o,[{key:"rectVars",get:function(){return{"--rect-size":"".concat(this.rectSize,"px")}}}]),o}(d["b"]);O=Object(u["a"])([Object(d["a"])({})],O);var j=O,w=j,M=(o("4064"),Object(v["a"])(w,m,y,!1,null,"c21f7848",null)),x=M.exports,_=o("8d27"),I=o("2f62");r["a"].use(I["a"]);var G=new I["a"].Store({state:{},mutations:{},actions:{},modules:{}}),S=o("2909"),V=(o("a434"),function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.settings={grid:{width:10,height:10,border:{width:3}}},t.tempGridSetting={grid:{width:0,height:0}},t.cells=[],t.horizontalCellsCount=[],t.verticalCellsCount=[],t.cellsInteraction={clicked:!1},t.cellsColors=[],t.backgroudColor={r:150,g:150,b:150},t.borderColor={r:255,g:255,b:255},t.selectedColor=null,t}return Object(c["a"])(o,[{key:"init",value:function(){}},{key:"initGrid",value:function(){this.initColors();for(var t=0;t<this.settings.grid.height;t+=1)for(var e=0;e<this.settings.grid.width;e+=1)this.addNewCell()}},{key:"updateBorderWidth",value:function(t){this.settings.grid.border.width=t}},{key:"updateGridWidth",value:function(t){this.saveGridSetting(),this.settings.grid.width=t,this.updateCellsLenght(),this.updateCounts()}},{key:"updateGridHeight",value:function(t){this.saveGridSetting(),this.settings.grid.height=t,this.updateCellsLenght(),this.updateCounts()}},{key:"saveGridSetting",value:function(){this.tempGridSetting=JSON.parse(JSON.stringify(this.settings))}},{key:"getCssGridColumns",get:function(){for(var t="",e=0;e<this.settings.grid.width;e+=1)t+="1fr ";return t}},{key:"getCssGridRows",get:function(){for(var t="",e=0;e<this.settings.grid.height;e+=1)t+="1fr ";return t}},{key:"updateCellsLenght",value:function(){this.settings.grid.width,this.settings.grid.height;var t=Object(S["a"])(this.cells);console.log(t),this.resetCells(),this.addNewCell(this.settings.grid.width*this.settings.grid.height);for(var e=0;e<this.settings.grid.height;e++)for(var o=0;o<this.settings.grid.width;o++){var r=!0;if((o>this.settings.grid.width-1||o>this.tempGridSetting.grid.width-1)&&(r=!1),(e>this.settings.grid.height-1||e>this.tempGridSetting.grid.height-1)&&(r=!1),r){var i=o+e*this.tempGridSetting.grid.width;if(i<t.length){var n=t[i],l=o+e*this.settings.grid.width;n.checked&&n.color&&this.checkCell({cellIndex:l,color:n.color})}}}}},{key:"resetCells",value:function(){this.cells=[]}},{key:"addNewCell",value:function(t){if(t)for(var e=0;e<t;e++)this.cells.push({checked:!1,color:null});else this.cells.push({checked:!1,color:null})}},{key:"checkCell",value:function(t){var e=t.cellIndex,o=t.color;this.cells[e].checked=!0,this.cells[e].color=o}},{key:"toggleCell",value:function(t){this.cellsInteraction.clicked&&(this.cells[t].checked=!this.cells[t].checked,this.cells[t].checked?this.cells[t].color=this.selectedColor:this.cells[t].color=null,this.updateCounts())}},{key:"cellsCount",get:function(){return this.settings.grid.width*this.settings.grid.height}},{key:"updateCounts",value:function(){0===this.cells.length&&this.initGrid(),this.updateHorizontalCounts(),this.updateVerticalCounts()}},{key:"updateHorizontalCounts",value:function(){this.horizontalCellsCount=[];for(var t=0;t<this.settings.grid.height;t+=1){for(var e={items:[]},o=0;o<this.settings.grid.width;o+=1){var r=t*this.settings.grid.width+o,i=this.cells[r];e.items[e.items.length-1]||e.items.push({number:0,color:null});var n=e.items[e.items.length-1];if(i.checked){var l=null;r-1&&(l=this.cells[r-1]),!l||l.checked&&l.color==i.color?(n.color=i.color,n.number+=1):n.number?e.items.push({number:1,color:i.color}):(null===n.color&&(n.color=i.color),n.number+=1)}}this.horizontalCellsCount.push(e)}}},{key:"updateVerticalCounts",value:function(){this.verticalCellsCount=[];for(var t=0;t<this.settings.grid.width;t+=1){for(var e={items:[]},o=0;o<this.settings.grid.height;o+=1){var r=o*this.settings.grid.width+t,i=this.cells[r];e.items[e.items.length-1]||e.items.push({number:0,color:null});var n=e.items[e.items.length-1];if(i.checked){var l=null,c=null;r-this.settings.grid.width>=0?(c=r-this.settings.grid.width,l=this.cells[r-this.settings.grid.width]):r-1+(this.cellsCount-1)>=0&&(c=r-1,c+=this.settings.grid.width*this.settings.grid.height-1,l=this.cells[c]),!l||l.checked&&l.color==i.color?(n.color=i.color,n.number+=1):n.number?e.items.push({number:1,color:n.color}):(null===n.color&&(n.color=i.color),n.number+=1)}}this.verticalCellsCount.push(e)}}},{key:"toggleCellsInteractionClicked",value:function(t){this.cellsInteraction.clicked=null!=t?t:!this.cellsInteraction.clicked}},{key:"initColors",value:function(){var t={r:Math.round(255*Math.random()),g:Math.round(255*Math.random()),b:Math.round(255*Math.random())};this.cellsColors.push(t),this.selectColor(this.cellsColors[0])}},{key:"selectColor",value:function(t){this.selectedColor=t}},{key:"addColor",value:function(t){if(t)this.cellsColors.push(t);else{var e={r:Math.round(255*Math.random()),g:Math.round(255*Math.random()),b:Math.round(255*Math.random())};this.cellsColors.push(e),this.selectColor(e)}}},{key:"updateColor",value:function(t){var e=t.newColor,o=t.colorIndex;this.cellsColors[o].r=e.r,this.cellsColors[o].g=e.g,this.cellsColors[o].b=e.b}},{key:"updateBasicColor",value:function(t){var e=t.newColor,o=t.color;o.r=e.r,o.g=e.g,o.b=e.b}},{key:"deleteColor",value:function(t){this.cellsColors.length>1&&(this.cellsColors.splice(t,1),this.selectColor(this.cellsColors[this.cellsColors.length-1]))}}]),o}(_["d"]));Object(u["a"])([_["a"]],V.prototype,"init",null),Object(u["a"])([_["a"]],V.prototype,"initGrid",null),Object(u["a"])([_["c"]],V.prototype,"updateBorderWidth",null),Object(u["a"])([_["a"]],V.prototype,"updateGridWidth",null),Object(u["a"])([_["a"]],V.prototype,"updateGridHeight",null),Object(u["a"])([_["c"]],V.prototype,"saveGridSetting",null),Object(u["a"])([_["a"]],V.prototype,"updateCellsLenght",null),Object(u["a"])([_["c"]],V.prototype,"resetCells",null),Object(u["a"])([_["c"]],V.prototype,"addNewCell",null),Object(u["a"])([_["c"]],V.prototype,"checkCell",null),Object(u["a"])([_["a"]],V.prototype,"toggleCell",null),Object(u["a"])([_["a"]],V.prototype,"updateCounts",null),Object(u["a"])([_["c"]],V.prototype,"updateHorizontalCounts",null),Object(u["a"])([_["c"]],V.prototype,"updateVerticalCounts",null),Object(u["a"])([_["c"]],V.prototype,"toggleCellsInteractionClicked",null),Object(u["a"])([_["a"]],V.prototype,"initColors",null),Object(u["a"])([_["c"]],V.prototype,"selectColor",null),Object(u["a"])([_["a"]],V.prototype,"addColor",null),Object(u["a"])([_["c"]],V.prototype,"updateColor",null),Object(u["a"])([_["c"]],V.prototype,"updateBasicColor",null),Object(u["a"])([_["a"]],V.prototype,"deleteColor",null),V=Object(u["a"])([_["b"]],V);var E=new V({store:G,name:"grid"}),$=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.mouse={clicked:!1},t}return Object(c["a"])(o,[{key:"toggleClicked",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.mouse.clicked=null!=t?t:!this.mouse.clicked,!1===this.mouse.clicked&&E.toggleCellsInteractionClicked(!1)}},{key:"disableOtherClick",value:function(){E.toggleCellsInteractionClicked(!1)}}]),o}(_["d"]);Object(u["a"])([_["c"]],$.prototype,"toggleClicked",null),Object(u["a"])([_["c"]],$.prototype,"disableOtherClick",null),$=Object(u["a"])([_["b"]],$);var P=new $({store:G,name:"system"}),B=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.systemModule=P,t.gridModule=E,t}return Object(c["a"])(o,[{key:"mouse",get:function(){return this.gridModule.cellsInteraction}},{key:"mounted",value:function(){this.gridModule.init()}},{key:"toggleSystemClick",value:function(){this.systemModule.toggleClicked()}},{key:"disableOtherClick",value:function(){this.systemModule.disableOtherClick()}},{key:"getClickState",get:function(){return this.systemModule.mouse.clicked}},{key:"backgroundColor",get:function(){var t="rgb(".concat(this.gridModule.backgroudColor.r);return t+=",".concat(this.gridModule.backgroudColor.g),t+=",".concat(this.gridModule.backgroudColor.b),t}},{key:"borderColor",get:function(){var t="rgba(".concat(this.gridModule.borderColor.r);return t+=",".concat(this.gridModule.borderColor.g),t+=",".concat(this.gridModule.borderColor.b),t}},{key:"cssVars",get:function(){return{"--grid-border-width":"".concat(this.gridModule.settings.grid.border.width,"px"),"--grid-template-columns":this.gridModule.getCssGridColumns,"--grid-template-rows":this.gridModule.getCssGridRows,"--grid-border-color":this.backgroundColor,"--grid-background-color":this.borderColor}}}]),o}(d["b"]);B=Object(u["a"])([Object(d["a"])({components:{EditorNav:k,Background:x}})],B);var W=B,N=W,A=(o("5c0b"),Object(v["a"])(N,i,n,!1,null,null,null)),z=A.exports,T=o("9483");Object(T["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});o("d3b7"),o("3ca3"),o("ddb0");var H=o("8c4f"),U=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{ref:"grid",staticClass:"grids-container"},[t.cells.length?o("div",{staticClass:"grid"},[o("div",{staticClass:"horizontal-container"},[t.countsAreVisible?o("cells-count-horizontal",{staticClass:"horizontal-cells-count-container"}):t._e()],1),o("div",[o("div",{staticClass:"vertical-container"},[t.countsAreVisible?o("cells-count-vertical",{staticClass:"vertical-cells-count-container"}):t._e()],1),o("div",{staticClass:"background-gid-container"},[o("background-grid",{staticClass:"background-gid"})],1),o("div",{staticClass:"cells-container",class:{hidden:!t.cellsAreVisible}},t._l(t.cellsCount,(function(t){return o("cell",{key:"cell-"+(t-1),attrs:{index:t}})})),1)])]):t._e(),t.UIIsVisible?o("colors-editor"):t._e(),t.UIIsVisible?o("div",{staticClass:"grid-settings"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.gridBorderWidth,expression:"gridBorderWidth"}],attrs:{type:"range",min:"0",max:"13",step:"1"},domProps:{value:t.gridBorderWidth},on:{change:t.updateBorderWidth,__r:function(e){t.gridBorderWidth=e.target.value}}})]):t._e(),t.UIIsVisible?o("bottom-menu"):t._e()],1)},L=[],R=o("e774"),X=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cells-count-horizontal"},t._l(t.horizontalCellsCount,(function(e,r){return o("div",{key:"cells-count-row-"+r,staticClass:"cells-count-row"},t._l(e.items,(function(e,r){return o("div",{key:"cells-horizontal-count-"+r,staticClass:"cells-count-row-item",style:t.getCssCount(e)},[t._v(" "+t._s(e.number)+" ")])})),0)})),0)},D=[],J=(o("99af"),function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t}return Object(c["a"])(o,[{key:"horizontalCellsCount",get:function(){return this.gridModule.horizontalCellsCount}},{key:"borderColor",get:function(){return this.gridModule.backgroudColor}},{key:"getCssCount",value:function(t){return t.color?{color:"rgb(".concat(t.color.r,", ").concat(t.color.g,", ").concat(t.color.b,")")}:{color:"rgb(".concat(this.borderColor.r,", ").concat(this.borderColor.g,", ").concat(this.borderColor.b,")")}}}]),o}(d["b"]));J=Object(u["a"])([d["a"]],J);var q=J,F=q,K=(o("1dcd"),Object(v["a"])(F,X,D,!1,null,"57962b72",null)),Q=K.exports,Y=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cells-count-vertical"},t._l(t.verticalCellsCount,(function(e,r){return o("div",{key:"cells-count-column-"+r,staticClass:"cells-count-column"},t._l(e.items,(function(e,r){return o("div",{key:"cells-vertical-count-"+r,staticClass:"cells-count-column-item",style:t.getCssCount(e)},[t._v(" "+t._s(e.number)+" ")])})),0)})),0)},Z=[],tt=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t}return Object(c["a"])(o,[{key:"verticalCellsCount",get:function(){return this.gridModule.verticalCellsCount}},{key:"borderColor",get:function(){return this.gridModule.backgroudColor}},{key:"getCssCount",value:function(t){return t.color?{color:"rgb(".concat(t.color.r,", ").concat(t.color.g,", ").concat(t.color.b,")")}:{color:"rgb(".concat(this.borderColor.r,", ").concat(this.borderColor.g,", ").concat(this.borderColor.b,")")}}}]),o}(d["b"]);tt=Object(u["a"])([d["a"]],tt);var et=tt,ot=et,rt=(o("da5d"),Object(v["a"])(ot,Y,Z,!1,null,"0e320f50",null)),it=rt.exports,nt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"background-cells-container"},t._l(t.cellsCount,(function(t){return o("div",{key:"cell-"+t,staticClass:"cell"},[o("div",{staticClass:"cell-border-item"})])})),0)},lt=[],ct=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t}return Object(c["a"])(o,[{key:"grid",get:function(){return this.gridModule.settings.grid}},{key:"cellsCount",get:function(){return this.gridModule.settings.grid.width*this.gridModule.settings.grid.height}}]),o}(d["b"]);ct=Object(u["a"])([d["a"]],ct);var st=ct,at=st,ut=(o("9ac3"),Object(v["a"])(at,nt,lt,!1,null,"17fc442e",null)),dt=ut.exports,ht=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"colors-editor-container"},[o("div",{staticClass:"gid-colors-container"},[o("simple-color-component",{attrs:{color:t.backgroundGridColor,"no-margin-top":""}}),o("simple-color-component",{attrs:{color:t.borderGridColor}})],1),t._l(t.cellsColor,(function(t,e){return o("color-component",{key:"color-"+e,attrs:{color:t,"color-index":e}})})),o("div",{staticClass:"button",on:{click:t.addNewColor}},[t._v("+")])],2)},gt=[],pt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"color-container"},[o("div",{staticClass:"color-button",class:{selected:t.isSelected},style:t.getCssColor,attrs:{for:"color-input"},on:{click:t.clickedButton}},[t.isSelected&&t.canDelete?o("div",{staticClass:"delete-buton",on:{click:function(e){return t.deleteColor(e)}}},[t._v("-")]):t._e()]),o("input",{ref:"colorPicker",staticClass:"color-input",attrs:{type:"color",name:"color-input"},on:{change:function(e){return t.updateEditorColor(e)}}})])},bt=[];o("a9e3"),o("4de4"),o("ac1f"),o("5319"),o("25f0");function ft(t){var e=t.replace("#","");3===e.length&&(e="".concat(e[0]).concat(e[0]).concat(e[1]).concat(e[1]).concat(e[2]).concat(e[2]));var o=parseInt(e.substring(0,2),16),r=parseInt(e.substring(2,4),16),i=parseInt(e.substring(4,6),16);return{r:o,g:r,b:i}}function vt(t){var e=t.toString(16);return 1==e.length?"0"+e:e}function Ct(t){return"#"+vt(t.r)+vt(t.g)+vt(t.b)}var kt=r["a"].extend({props:{color:Object,colorIndex:Number}}),mt=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t}return Object(c["a"])(o,[{key:"mounted",value:function(){this.updateInputColorValue()}},{key:"updateEditorColor",value:function(t){var e=ft(t.target.value);this.gridModule.updateColor({newColor:e,colorIndex:this.colorIndex}),this.updateInputColorValue()}},{key:"clickedButton",value:function(){this.isSelected?this.$refs.colorPicker.click():this.gridModule.selectColor(this.color)}},{key:"deleteColor",value:function(t){t.stopPropagation(),this.gridModule.deleteColor(this.colorIndex)}},{key:"canDelete",get:function(){var t=this;if(this.gridModule.cellsColors.length>1){var e=this.gridModule.cells.filter((function(e){return e.color==t.color}));return!(e.length>0)}return!1}},{key:"isSelected",get:function(){return this.color==this.gridModule.selectedColor}},{key:"getCssColor",get:function(){var t={"background-color":"rgb(".concat(this.color.r,", ").concat(this.color.g,", ").concat(this.color.b,")")};return t}},{key:"updateInputColorValue",value:function(){this.$refs.colorPicker.value=Ct(this.color)}}]),o}(kt);mt=Object(u["a"])([d["a"]],mt);var yt=mt,Ot=yt,jt=(o("4879"),Object(v["a"])(Ot,pt,bt,!1,null,"8d2e7a92",null)),wt=jt.exports,Mt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"color-container"},[o("div",{staticClass:"color-button",class:{"no-margin-top":t.noMarginTop},style:t.getCssColor,attrs:{for:"color-input"},on:{click:t.clickedButton}}),o("input",{ref:"colorPicker",staticClass:"color-input",attrs:{type:"color",name:"color-input"},on:{change:function(e){return t.updateEditorColor(e)}}})])},xt=[],_t=r["a"].extend({props:{color:Object,colorIndex:Number,noMarginTop:Boolean}}),It=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t}return Object(c["a"])(o,[{key:"mounted",value:function(){this.updateInputColorValue()}},{key:"updateEditorColor",value:function(t){var e=ft(t.target.value);this.gridModule.updateBasicColor({newColor:e,color:this.color}),this.updateInputColorValue()}},{key:"clickedButton",value:function(){this.$refs.colorPicker.click()}},{key:"deleteColor",value:function(t){t.stopPropagation(),this.gridModule.deleteColor(this.colorIndex)}},{key:"canDelete",get:function(){return this.gridModule.cellsColors.length>1}},{key:"isSelected",get:function(){return this.color==this.gridModule.selectedColor}},{key:"getCssColor",get:function(){var t={"background-color":"rgb(".concat(this.color.r,", ").concat(this.color.g,", ").concat(this.color.b,")")};return t}},{key:"updateInputColorValue",value:function(){this.$refs.colorPicker.value=Ct(this.color)}}]),o}(_t);It=Object(u["a"])([d["a"]],It);var Gt=It,St=Gt,Vt=(o("554e"),Object(v["a"])(St,Mt,xt,!1,null,"32e38ab5",null)),Et=Vt.exports,$t=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t}return Object(c["a"])(o,[{key:"cellsColor",get:function(){return this.gridModule.cellsColors}},{key:"backgroundGridColor",get:function(){return this.gridModule.backgroudColor}},{key:"borderGridColor",get:function(){return this.gridModule.borderColor}},{key:"addNewColor",value:function(){this.gridModule.addColor()}}]),o}(d["b"]);$t=Object(u["a"])([Object(d["a"])({components:{colorComponent:wt,simpleColorComponent:Et}})],$t);var Pt=$t,Bt=Pt,Wt=(o("4374"),Object(v["a"])(Bt,ht,gt,!1,null,"25c82930",null)),Nt=Wt.exports,At=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"bottom-nav-container"},[o("div",{staticClass:"grid-sizing"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.gridWidth,expression:"gridWidth"}],attrs:{type:"number"},domProps:{value:t.gridWidth},on:{change:t.updateGridWidth,input:function(e){e.target.composing||(t.gridWidth=e.target.value)}}}),o("p",{staticClass:"division"},[t._v("/")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.gridHeight,expression:"gridHeight"}],attrs:{type:"number"},domProps:{value:t.gridHeight},on:{change:t.updateGridHeight,input:function(e){e.target.composing||(t.gridHeight=e.target.value)}}})]),o("div",{staticClass:"export-container"},[o("p",{staticClass:"export-title"},[t._v("EXPORT:")]),o("p",{staticClass:"button export-button",on:{click:t.exportGame}},[t._v("GAME")]),o("p",{staticClass:"button export-button",on:{click:t.exportSolution}},[t._v("SOLUTION")])])])},zt=[],Tt=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t.gridWidth=t.gridModule.settings.grid.width,t.gridHeight=t.gridModule.settings.grid.height,t}return Object(c["a"])(o,[{key:"updateGridWidth",value:function(){this.gridModule.updateGridWidth(this.gridWidth)}},{key:"updateGridHeight",value:function(){this.gridModule.updateGridHeight(this.gridHeight)}},{key:"exportGame",value:function(){this.$bus.$emit("EXPORT_GAME")}},{key:"exportSolution",value:function(){this.$bus.$emit("EXPORT_SOLUTION")}}]),o}(d["b"]);Tt=Object(u["a"])([Object(d["a"])({})],Tt);var Ht=Tt,Ut=Ht,Lt=(o("8286"),Object(v["a"])(Ut,At,zt,!1,null,"44f1af06",null)),Rt=Lt.exports,Xt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"cell",class:{checked:t.cells[t.index-1].checked},style:t.cellCss,attrs:{id:"cell-"+(t.index-1)},on:{mouseover:function(e){return t.gridModule.toggleCell(t.index-1)},mousedown:function(e){return t.mouseDownCell(t.index-1)},mouseup:function(e){return t.mouseUpCell(t.index-1)}}})},Dt=[],Jt=r["a"].extend({props:{index:Number,cell:Number}}),qt=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t}return Object(c["a"])(o,[{key:"cells",get:function(){return this.gridModule.cells}},{key:"cellCss",get:function(){if(this.cells[this.index-1]&&this.cells[this.index-1].color){var t=this.cells[this.index-1].color;return{"background-color":"rgb(".concat(null===t||void 0===t?void 0:t.r,",").concat(null===t||void 0===t?void 0:t.g,",").concat(null===t||void 0===t?void 0:t.b,")")}}return{}}},{key:"mouseDownCell",value:function(t){this.gridModule.toggleCellsInteractionClicked(),this.gridModule.toggleCell(t)}},{key:"mouseUpCell",value:function(t){this.gridModule.toggleCellsInteractionClicked()}}]),o}(Jt);qt=Object(u["a"])([d["a"]],qt);var Ft=qt,Kt=Ft,Qt=(o("d19d"),Object(v["a"])(Kt,Xt,Dt,!1,null,"1ed3ab4c",null)),Yt=Qt.exports,Zt=function(t){Object(s["a"])(o,t);var e=Object(a["a"])(o);function o(){var t;return Object(l["a"])(this,o),t=e.apply(this,arguments),t.gridModule=E,t.gridBorderWidth=10,t.UIIsVisible=!0,t.cellsAreVisible=!0,t.countsAreVisible=!0,t}return Object(c["a"])(o,[{key:"onGridBorderWidthChange",value:function(t,e){this.updateBorderWidth()}},{key:"grid",get:function(){return this.gridModule.settings.grid}},{key:"cellsCount",get:function(){return this.grid.width*this.grid.height}},{key:"cells",get:function(){return this.gridModule.cells}},{key:"mounted",value:function(){this.gridModule.updateCounts(),this.$bus.$on("EXPORT_GAME",this.exportGame),this.$bus.$on("EXPORT_SOLUTION",this.exportSolution)}},{key:"exportGame",value:function(){var t=this;this.UIIsVisible=!1,this.cellsAreVisible=!1;var e=this.$refs.grid;R["a"](e,{pixelRatio:3}).then((function(e){var o=document.createElement("a");o.download="pix-export.png",o.href=e,o.click(),o.classList.add("inexistant"),t.UIIsVisible=!0,t.cellsAreVisible=!0})).catch((function(e){console.error("oops, something went wrong!",e),t.UIIsVisible=!0,t.cellsAreVisible=!0}))}},{key:"exportSolution",value:function(){var t=this;this.UIIsVisible=!1,this.countsAreVisible=!1;var e=this.$refs.grid;R["a"](e,{pixelRatio:3}).then((function(e){var o=document.createElement("a");o.download="pix-export.png",o.href=e,o.click(),o.classList.add("inexistant"),t.UIIsVisible=!0,t.countsAreVisible=!0})).catch((function(e){console.error("oops, something went wrong!",e),t.UIIsVisible=!0,t.countsAreVisible=!0}))}},{key:"updateBorderWidth",value:function(){this.gridModule.updateBorderWidth(this.gridBorderWidth)}}]),o}(d["b"]);Object(u["a"])([Object(d["c"])("gridBorderWidth")],Zt.prototype,"onGridBorderWidthChange",null),Zt=Object(u["a"])([Object(d["a"])({components:{cellsCountHorizontal:Q,cellsCountVertical:it,backgroundGrid:dt,ColorsEditor:Nt,Cell:Yt,BottomMenu:Rt}})],Zt);var te=Zt,ee=te,oe=(o("74dc"),Object(v["a"])(ee,U,L,!1,null,"84435f46",null)),re=oe.exports;r["a"].use(H["a"]);var ie=[{path:"/",name:"grid",component:re},{path:"/Pages",name:"Pages",component:function(){return o.e("about").then(o.bind(null,"ee3e"))}},{path:"/About",name:"About",component:function(){return o.e("about").then(o.bind(null,"f820"))}}],ne=new H["a"]({routes:ie}),le=ne,ce=o("ba91");r["a"].use(ce["a"]);new ce["a"].Bus;r["a"].config.productionTip=!1,new r["a"]({router:le,store:G,render:function(t){return t(z)}}).$mount("#app")},d19d:function(t,e,o){"use strict";o("cd49")},d64c:function(t,e,o){},da5d:function(t,e,o){"use strict";o("18b9")},db62:function(t,e,o){}});
//# sourceMappingURL=app.abf9dc21.js.map