(function(e){function t(t){for(var o,i,r=t[0],c=t[1],l=t[2],u=0,h=[];u<r.length;u++)i=r[u],s[i]&&h.push(s[i][0]),s[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);d&&d(t);while(h.length)h.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(o=!1)}o&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},s={app:0},a=[];function i(e){return r.p+"js/"+({pdfjsWorker:"pdfjsWorker"}[e]||e)+"."+{"chunk-2d0b9f47":"71078e07","chunk-2d0be70b":"c945a914","chunk-2d0d6921":"753635c0","chunk-2d0d7fc5":"aa8fe47c","chunk-2d208bfd":"32753825","chunk-2d21a3d2":"cd81eea4","chunk-45a67fcd":"2cb10b05",pdfjsWorker:"f9776382"}[e]+".js"}function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(e){var t=[],n=s[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(function(t,o){n=s[e]=[t,o]});t.push(n[2]=o);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,r.nc&&c.setAttribute("nonce",r.nc),c.src=i(e),a=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=s[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+o+": "+a+")");i.type=o,i.request=a,n[1](i)}s[e]=void 0}};var l=setTimeout(function(){a({type:"timeout",target:c})},12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var d=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"07a4":function(e,t,n){"use strict";var o={};n.r(o),n.d(o,"getContents",function(){return d}),n.d(o,"update",function(){return h}),n.d(o,"upload",function(){return m}),n.d(o,"login",function(){return p}),n.d(o,"log",function(){return f}),n.d(o,"settings",function(){return g}),n.d(o,"deleteFile",function(){return _}),n.d(o,"createDirectory",function(){return w}),n.d(o,"rename",function(){return v}),n.d(o,"signup",function(){return E}),n.d(o,"download",function(){return b});var s=n("2b0e"),a=n("2f62"),i={contents:[],loadLimit:30,settings:{dropbox:{},google:{}},selectedItems:[],uploadItems:[],view:"grid",uploadItemsMenu:[],diskLoaded:[],selectedDirectory:"my-drive",showConfirmDeleteModal:!1,showCreateFolderModal:!1,showUploadMenu:!1,showPreviewModal:!1,showShareModal:!1,showRenameModal:!1,showSettings:!1,showMenu:{state:!1,x:0,y:0},showToolModal:!1,showInfoBar:!1,showsnackbar:{state:!1,data:"",color:"default",time:6e3},previewItem:null,modelBackdrop:!1,isLoading:!1,isUploading:!1,isMobile:!1,token:"",selectAllFile:!1,selectAll:!1,selectAllFolder:!1,isUserLoggedIn:!1,search:""},r=n("94d5"),c=n("646f"),l=n("9fb0"),u=n("21a6");const d=(e,t)=>{return new Promise((n,o)=>{e.commit(l["x"],!0);let s=t.path||e.state.selectedDirectory,a=t.limit||e.state.loadLimit;c["a"].axios().get(`/api/getFiles/${s}/${a}`,{retry:3,retryDelay:1e3}).then(t=>{e.state.selectedDirectory=s,e.commit(l["q"],t.data.contents),e.commit(l["x"],!1),n(t)}).catch(e=>{c["a"]._handleError(e),o(e)})})},h=(e,t)=>{let n=t.path||e.state.selectedDirectory,o=t.limit||e.state.loadLimit;const s=!0===e.state.isUploading?"subscribe":"eventCacheUpdate";c["a"].axios().get(`/api/getFiles/${n}/${o}/update/nocache/${s}`,{retry:3,retryDelay:1e3}).then(t=>{e.commit(l["q"],t.data.contents),e.commit(l["x"],!1)}).catch(e=>{c["a"]._handleError(e)})},m=(e,t)=>{const n=e.state.uploadItemsMenu.findIndex(e=>e.id==t.id&&"file"==e.type);return new Promise((o,s)=>{c["a"].axios().post(`/api/upload/${t.uploadPath}`,t.formData,{retry:3,retryDelay:1e3,onUploadProgress:t=>{-1!==n&&(e.state.uploadItemsMenu[n].uploadPercent=Math.round(100*t.loaded/t.total))}}).then(e=>{setInterval(()=>{o(e)},1e3)}).catch(e=>{c["a"]._handleError(e),s(e)})})},p=(e,t)=>{return new Promise((e,n)=>{c["a"].axios().post("/user/login",t).then(t=>{e(t)}).catch(e=>{n(e)})})},f=(e,t)=>{c["a"].axios().post("api/log",t).then(()=>{}).catch(e=>{c["a"]._handleError(e)})},g=(e,t)=>{return new Promise((n,o)=>{c["a"].axios().post("/user/settings",t).then(t=>{e.commit(l["B"],t),n(t)}).catch(e=>{c["a"]._handleError(e),o(e)})})},_=(e,t)=>{const n=t;return new Promise((t,o)=>{c["a"].axios().delete("/api/delete/"+n.path).then(n=>{e.state.showConfirmDeleteModal=!1,t(n)}).catch(e=>{c["a"]._handleError(e),o(e)})})},w=(e,t)=>{e.commit(l["x"],!0);const n=e.state.selectedDirectory;c["a"].axios().put(`/api/createDirectory/${n}`,t).then(t=>{var n={data:t.data.message,color:"success"};e.state.showCreateFolderModal=!1,e.commit(l["K"],n),e.dispatch("update",{path:e.state.selectedDirectory})}).catch(e=>{c["a"]._handleError(e)}),e.commit(l["x"],!1)},v=(e,t)=>{e.commit(l["x"],!0),c["a"].axios().put(`/api/rename/${t.path}`,t).then(t=>{var n={data:t.data.message,color:"success"};e.state.showRenameModal=!1,e.commit(l["K"],n),e.dispatch("update",{path:e.state.selectedDirectory})}).catch(e=>{c["a"]._handleError(e)}),e.commit(l["x"],!1)},E=(e,t)=>{return new Promise((n,o)=>{c["a"].axios().post("/user/signup",t).then(t=>{var o={data:t.data.message,color:"success"};e.commit(l["K"],o),n(t)}).catch(e=>{o(e),c["a"]._handleError(e)})})},b=(e,t)=>{var n={data:"Preparing download.",color:"default",time:0};if(e.commit(l["K"],n),1==t.length)c["a"].axios().get(t[0].filePath,{responseType:"blob"}).then(n=>{u["saveAs"](new Blob([n.data]),t[0].name),e.commit(l["m"])}).catch(e=>{c["a"]._handleError(e)});else{const n=e.state.selectedDirectory;c["a"].axios().post(`/api/batch/${n}`,{files:t},{responseType:"blob"}).then(t=>{u["saveAs"](new Blob([t.data]),"Media_Drive_"+new Date+".zip"),e.commit(l["m"])}).catch(e=>{c["a"]._handleError(e)})}},x=["xs","sm","md","lg","xl"];var S={[l["w"]]:(e,t)=>{e.selectedDirectory=t},[l["B"]]:(e,t)=>{e.settings=t.data.settings},[l["q"]]:(e,t)=>{e.contents=t,e.isContentsLoaded=!0},[l["s"]]:(e,t)=>{e.contents.push(t)},[l["O"]]:(e,t)=>{},[l["b"]]:(e,t)=>{},[l["t"]]:(e,t)=>{},[l["d"]]:(e,t)=>{const n=t;"file"===n.type&&e.files.splice(e.files.findIndex(e=>e.path===n.path),1),"dir"===n.type&&e.directories.splice(e.directories.findIndex(e=>e.path===n.path),1)},[l["u"]]:(e,t)=>{e.selectedItems.push(t)},[l["v"]]:(e,t)=>{e.selectedItems=t},[l["N"]]:(e,t)=>{const n=t;e.selectedItems.splice(e.selectedItems.findIndex(e=>e.id===n.id),1)},[l["M"]]:(e,t)=>{e.selectAllFile=!1,e.selectAllFolder=!1,t?e.selectedItems.splice(e.selectedItems.findIndex(e=>e.type===t.type)):e.selectedItems=[]},[l["D"]]:e=>{e.modelBackdrop=!0,e.showCreateFolderModal=!0},[l["f"]]:e=>{e.modelBackdrop=!1,e.showCreateFolderModal=!1},[l["L"]]:e=>{e.showToolModal=!0},[l["n"]]:e=>{e.showToolModal=!1},[l["F"]]:(e,t)=>{var n=t.event||window.event;n.preventDefault(),e.showMenu.x=n.clientX,e.showMenu.y=n.clientY},[l["h"]]:e=>{e.showMenu.state=!1},[l["E"]]:e=>{e.showInfoBar=!0},[l["g"]]:e=>{e.showInfoBar=!1},[l["a"]]:(e,t)=>{e.view=t},[l["r"]]:(e,t)=>{e.previewItem=t},[l["G"]]:e=>{e.modelBackdrop=!0,e.showPreviewModal=!0},[l["i"]]:e=>{e.modelBackdrop=!1,e.showPreviewModal=!1},[l["x"]]:(e,t)=>{e.isLoading=t},[l["z"]]:(e,t)=>{e.isUploading=t},[l["p"]]:(e,t)=>{e.isMobile=t},[l["y"]]:(e,t)=>{e.loadMoreProgress=t.value,e.loadingValue=t.per},[l["H"]]:e=>{e.modelBackdrop=!0,e.showRenameModal=!0},[l["j"]]:e=>{e.showRenameModal=!1,e.modelBackdrop=!1},[l["I"]]:e=>{e.showSettings=!0},[l["k"]]:e=>{e.showSettings=!1},[l["K"]]:(e,t)=>{e.showsnackbar.state=!0,e.showsnackbar.data=t.data,t.color&&(e.showsnackbar.color=t.color),0==t.time&&(e.showsnackbar.time=t.time)},[l["m"]]:e=>{e.showsnackbar.state=!1,e.showsnackbar.data=""},[l["J"]]:e=>{e.showShareModal=!0},[l["l"]]:e=>{e.showShareModal=!1},[l["o"]]:e=>{let t=x.indexOf(e.gridSize);t>=0&&t<x.length-1&&(e.gridSize=x[++t])},[l["c"]]:e=>{let t=x.indexOf(e.gridSize);t>0&&t<x.length&&(e.gridSize=x[--t])},[l["A"]]:(e,t)=>{e.search=t},[l["C"]]:e=>{e.modelBackdrop=!0,e.showConfirmDeleteModal=!0},[l["e"]]:e=>{e.modelBackdrop=!1,e.showConfirmDeleteModal=!1}},y=n("0e44");const C={key:"mediamanager",paths:["selectedDirectory","showInfoBar","view","token","isUserLoggedIn","settings"],storage:window.sessionStorage};s["a"].use(a["a"]);t["a"]=new a["a"].Store({state:i,getters:r,actions:o,mutations:S,plugins:[Object(y["a"])(C)],strict:!1})},1:function(e,t){},2:function(e,t){},"265b":function(e,t,n){},3:function(e,t){},4:function(e,t){},"41cb":function(e,t,n){"use strict";var o=n("2b0e"),s=n("8c4f"),a=[{path:"/",name:"home",component:()=>n.e("chunk-2d21a3d2").then(n.bind(null,"bb51"))},{path:"/drive/u/:adapter/:path/:dir?",name:"my-drive",component:()=>n.e("chunk-45a67fcd").then(n.bind(null,"115c")),meta:{requiresAuth:!0}},{path:"/login",name:"login",component:()=>n.e("chunk-2d21a3d2").then(n.bind(null,"bb51")),meta:{requiresAuth:!0}},{path:"/auth",name:"auth",component:()=>n.e("chunk-2d0be70b").then(n.bind(null,"2fef"))},{path:"/signup",name:"signup",component:()=>n.e("chunk-2d0b9f47").then(n.bind(null,"34c3")),meta:{requiresAuth:!0}},{path:"/test",name:"test",component:()=>n.e("chunk-2d0d7fc5").then(n.bind(null,"78c1"))},{path:"/drive/open",name:"open",component:()=>n.e("chunk-2d0d6921").then(n.bind(null,"72b2"))},{path:"/PageNotFound",name:"NotFound",component:()=>n.e("chunk-2d208bfd").then(n.bind(null,"a5b5"))},{path:"*",name:"PageNotFound",component:()=>n.e("chunk-2d208bfd").then(n.bind(null,"a5b5"))}],i=n("646f");o["a"].use(s["a"]);const r=new s["a"]({mode:"history",routes:a});r.beforeEach((e,t,n)=>{if(e.matched.some(e=>e.meta.requiresAuth)){const t=i["a"].auth.loggedIn();t?"login"==e.name||"signup"==e.name?n({path:"/"}):n():"login"!=e.name&&"signup"!=e.name?n({path:"/login",query:{redirect:e.fullPath}}):n()}else n()});t["a"]=r},"56d7":function(e,t,n){"use strict";n.r(t);var o=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("router-view"),n("lazy-snack-bar",{attrs:{position:"top-center"}}),n("lazy-model")],1)},a=[],i=n("2877"),r={},c=Object(i["a"])(r,s,a,!1,null,null,null),l=c.exports;class u{constructor(){this.vue=new o["a"]}fire(e,t=null){this.vue.$emit(e,t)}listen(e,t){this.vue.$on(e,t)}}var d=n("41cb"),h=n("07a4"),m=n("9483");Object(m["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var p=n("0284"),f=n.n(p),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"snackbar"}},[e.active?n("div",{staticClass:"snackbar",class:e.classes},[n("div",{class:"snackbar__wrap "+e.color},[n("div",{staticClass:"snackbar__body"},[e._t("default"),e._v("\n        "+e._s(e.messagedata)+"\n        "),n("button",{staticClass:"close-btn",on:{click:e.hide}},[e._v("close")])],2)])]):e._e()])},_=[],w=n("9fb0"),v={name:"snackbar",props:{timeout:{type:Number,default:3e3},infinity:{type:Boolean,default:!1},position:{type:String,default:"bottom-left"}},data(){return{timer:null}},watch:{active(){this.setTimer()}},computed:{classes(){return{[`snackbar--${this.position}`]:!0}},active(){return this.$store.state.showsnackbar.state},color(){return this.$store.state.showsnackbar.color},messagedata(){return this.$store.state.showsnackbar.data||"Empty Message."}},methods:{hide(){this.$store.commit(w["m"])},setTimer(){this.timer&&clearTimeout(this.timer),this.infinity||(this.timer=setTimeout(()=>{this.active&&this.hide()},this.timeout))}}},E=v,b=Object(i["a"])(E,g,_,!1,null,null,null),x=b.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",{ref:"contextMenu",staticClass:"context__menu"},[n("li",{staticClass:"context__menu-item",on:{click:function(t){return t.preventDefault(),e.open()}}},[e._m(0)]),e._m(1),n("li",{staticClass:"context__menu-separator"}),e._m(2),e._m(3),n("li",{staticClass:"context__menu-separator"}),e._m(4),e._m(5),e._m(6)])},y=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a",{staticClass:"context__menu-btn"},[n("i",{staticClass:"fa fa-folder-open"}),n("span",{staticClass:"context__menu-text"},[e._v("Open")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"context__menu-item context__menu-item-disabled"},[n("button",{staticClass:"context__menu-btn",attrs:{type:"button"}},[n("span",{staticClass:"context__menu-text"},[e._v("Open in New Window")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"context__menu-item"},[n("button",{staticClass:"context__menu-btn",attrs:{type:"button"}},[n("i",{staticClass:"fa fa-reply"}),n("span",{staticClass:"context__menu-text"},[e._v("Reply")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"context__menu-item"},[n("button",{staticClass:"context__menu-btn",attrs:{type:"button"}},[n("i",{staticClass:"fa fa-star"}),n("span",{staticClass:"context__menu-text"},[e._v("Favorite")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"context__menu-item"},[n("button",{staticClass:"context__menu-btn",attrs:{type:"button"}},[n("i",{staticClass:"fa fa-download"}),n("span",{staticClass:"context__menu-text"},[e._v("Save")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"context__menu-item"},[n("button",{staticClass:"context__menu-btn",attrs:{type:"button"}},[n("i",{staticClass:"fa fa-edit"}),n("span",{staticClass:"context__menu-text"},[e._v("Rename")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"context__menu-item"},[n("button",{staticClass:"context__menu-btn",attrs:{type:"button"}},[n("i",{staticClass:"fa fa-trash"}),n("span",{staticClass:"context__menu-text"},[e._v("Delete")])])])}],C={name:"lazy-contextmenu",data:()=>{return{}},methods:{onContextMenu:function(e){e.preventDefault();const t=this.$refs.contextMenu;t.style.left=e.pageX+"px",t.style.top=e.pageY+"px",t.classList.add("context__menu-show")},hideContextMenu:function(e){e.preventDefault();const t=this.$refs.contextMenu;t.classList.remove("context__menu-show")},delete:function(e){this.showConfirmDeleteModal(),console.log(e)},getShareableLink:function(e){console.log(e)},changeColor:function(e){console.log(e)},download:function(){const e=this.$store.state.selectedItems;this.$store.dispatch("download",e)},getShareableLike:function(e){console.log(e)},viewDetails:function(e){this.$store.commit(w["E"]),console.log(e)},stars:function(e){console.log(e)},open:function(){console.log("open");const e=this.$store.state.selectedItems[0];try{let n=e.path;"my-drive"!=n?this.$router.push({path:`/drive/u/0/folder/${n}`}):this.$router.push({path:"/drive/u/0/my-drive"})}catch(t){console.log(t)}},showConfirmDeleteModal:function(){this.$store.commit(w["C"])},rename:function(){this.$store.commit(w["H"])},share:function(){console.log("share")},fire:function(e,t){this.$store.commit(w["h"]),this[e](t)}},created(){document.addEventListener("mousedown",this.hideContextMenu,!1),document.addEventListener("contextmenu",this.onContextMenu,!1)},destroyed(){document.removeEventListener("mousedown",this.hideContextMenu,!1),document.removeEventListener("contextmenu",this.onContextMenu,!1)}},I=C,k=Object(i["a"])(I,S,y,!1,null,null,null),D=k.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"lazy_switch"},[n("label",{staticClass:"switch",attrs:{for:"toggle"+e.sid}},[n("input",{attrs:{type:"checkbox",id:"toggle"+e.sid},domProps:{value:e.value},on:{input:function(t){return e.updateValue(t)}}}),n("span",{staticClass:"slider"})])])},A=[],M={name:"lazy-switch",data:()=>{return{}},props:["sid","value"],methods:{updateValue:function(e){console.log(e)}}},O=M,P=Object(i["a"])(O,T,A,!1,null,null,null),L=P.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"media-model"},[n("lazy-preview-model")],1)},R=[],U=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isActive?n("div",{staticClass:"modal media-preview-modal"},[n("lazy-switch",{attrs:{sid:1},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}}),n("lazy-switch",{attrs:{sid:2}}),e.val?n("p",[e._v("ANurag")]):e._e()],1):e._e()},N=[],F=n("858e"),B={name:"media-create-folder",data:()=>({val:!0,files:[],numPages:void 0,videoExt:["mp4","ogv","avi","webm"],audioExt:["mp3"],fileExt:["txt","js","css","php","vue","go","html","c","cpp","c++","sql","java","shell"]}),components:{},watch:{isActive:function(e){document.querySelector("html").classList.toggle("app--modal--opened",e),"pdf"==this.item.extension&&this.pdfsrc.then(e=>{this.numPages=e.numPages})}},computed:{pdfsrc:function(){return F["a"].createLoadingTask(this.item.filePath)},item:function(){return this.$store.state.previewItem},isActive:function(){return this.$store.state.showPreviewModal},video:function(){return-1!=this.videoExt.indexOf(this.item.extension.toLowerCase())},fileText:function(){return-1!=this.fileExt.indexOf(this.item.extension.toLowerCase())},audio:function(){return-1!=this.audioExt.indexOf(this.item.extension.toLowerCase())},audioFile:function(){return this.item.filePath}},methods:{hidePreviewModal:function(){this.$store.commit(w["i"])},download:function(){const e=[];e.push(this.item),this.$store.dispatch("download",e)},getName:function(){return this.item.name.length>=20&&this.$store.state.isMobile?this.item.name.substring(0,20)+"..":this.item.name},print:function(){this.$refs.myPdfComponent[0].print()},current:function(){return"pdf"==this.item.extension&&this.pdfsrc.then(e=>{this.numPages=e.numPages}),this.files=this.$store.state.contents.filter(e=>"dir"!=e.type),this.files.findIndex(e=>{if(e.id===this.item.id)return!0})},next:function(){var e=this.current();e<this.files.length-1?this.$store.state.previewItem=this.files[e+1]:this.$store.state.previewItem=this.files[e]},prev:function(){var e=this.current();e>0&&(this.$store.state.previewItem=this.files[e-1])},keyup:function(e){e.preventDefault(),this.$store.state.showPreviewModal&&(27==e.keyCode?this.hidePreviewModal():39==e.keyCode?this.next():37==e.keyCode&&this.prev())}},created(){window.addEventListener("keyup",this.keyup)},destroyed(){window.removeEventListener("keyup",this.keyup)}},j=B,z=Object(i["a"])(j,U,N,!1,null,null,null),H=z.exports,q={name:"media-model",components:{"lazy-preview-model":H},computed:{isActivePreview(){return this.$store.state.showPreviewModal}}},W=q,G=Object(i["a"])(W,$,R,!1,null,null,null),V=G.exports;n("265b");o["a"].use(f.a,{id:"UA-131081167-1",router:d["a"]}),o["a"].component("lazySnackBar",x),o["a"].component("lazyModel",V),o["a"].component("lazyContext",D),o["a"].component("lazySwitch",L),window.LazyDrive=window.LazyDrive||{},window.LazyDrive.Event=new u,o["a"].config.productionTip=!1,new o["a"]({router:d["a"],store:h["a"],render:e=>e(l)}).$mount("#app")},"646f":function(e,t,n){"use strict";var o={};n.r(o),n.d(o,"cookies",function(){return u}),n.d(o,"local",function(){return d}),n.d(o,"session",function(){return h});var s=n("bc3a"),a=n.n(s),i=n("07a4"),r=n("41cb"),c=n("9fb0");const l=n("17fb");window.localStorage||(window.localStorage={getItem:function(e){return e&&this.hasOwnProperty(e)?unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"),"$1")):null},key:function(e){return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/,"").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[e])},setItem:function(e,t){e&&(document.cookie=escape(e)+"="+escape(t)+"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/",this.length=document.cookie.match(/\=/g).length)},length:0,removeItem:function(e){e&&this.hasOwnProperty(e)&&(document.cookie=escape(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",this.length--)},hasOwnProperty:function(e){return new RegExp("(?:^|;\\s*)"+escape(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)}},window.localStorage.length=(document.cookie.match(/\=/g)||window.localStorage).length);const u={getAll:function(){var e={};return l(document.cookie.split(";")).chain().map(function(e){return e.replace(/^\s+/,"").replace(/\s+$/,"")}).each(function(t){var n=t.split("="),o=n[0],s=null,a=l.size(n);a>1&&(s=n.slice(1).join("")),e[o]=s}),e},get:function(e){var t=null,n=this.getAll();return l.each(n,function(n,o){o===e&&(t=n)}),t},set:function(e,t,n){var o=new Date,s="undefined"===typeof n?864e5:1e3*n,a=new Date(o.getTime()+s),i=l.map({name:escape(t),expires:a.toGMTString(),path:"/"},function(t,n){return["name"==n?e:n,t].join("=")}).join(";");return document.cookie=i,this},destroy:function(e){return""==this.get(e)&&null==this.get(e)||this.set(e,null,-1e6),this}},d={getAll:function(){const e={...localStorage};return e},get:function(e){var t=null;return t=localStorage.getItem(e),t},set:function(e,t){return localStorage.setItem(e,t),this},destroy:function(e){return""==this.get(e)&&null==this.get(e)||localStorage.removeItem(e),this}},h={getAll:function(){const e={...sessionStorage};return e},get:function(e){var t=null;return t=sessionStorage.getItem(e),t},set:function(e,t){return sessionStorage.setItem(e,t),this},destroy:function(e){return""==this.get(e)&&null==this.get(e)||sessionStorage.removeItem(e),this},destroyAll:function(){sessionStorage.clear()}},m={loggedIn(){return""!==u.get("email")&&null!==u.get("email")&&""!==u.get("token")&&null!==u.get("token")},logout(){return u.destroy("email"),u.destroy("token"),!0}};var p=n("0032"),f=n.n(p),g=n("2e94"),_=n.n(g);class w{constructor(e,t,n){this.ACCESS_TOKEN=e,this.REDIRECT_PORT=t,this.CLIENT_ID=n||"w3mmmph398qrnx9",this.UPLOAD_FILE_SIZE_LIMIT=157286400,this.dbx=new f.a.Dropbox({accessToken:this.ACCESS_TOKEN,fetch:_.a})}auth(){var e=new f.a.Dropbox({clientId:this.CLIENT_ID,fetch:_.a}),t=e.getAuthenticationUrl(`http://localhost:${this.REDIRECT_PORT}/auth`);const n=window.open(t,"targetWindow","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500");return new Promise(e=>{var t=setInterval(function(){n.closed&&(clearInterval(t),e())},500)})}deleteFile(e){return new Promise((t,n)=>{this.dbx.filesDelete({path:e}).then(function(e){t(e)}).catch(function(e){n(e)})})}filesGetThumbnail(e){return new Promise((t,n)=>{this.dbx.filesGetThumbnail({path:e}).then(function(e){t(e)}).catch(function(e){n(e)})})}fetchFile(e=""){return new Promise((t,n)=>{this.dbx.filesListFolder({path:e}).then(function(e){t(e)}).catch(function(e){n(e)})})}downloadFile(e){return this.dbx.sharingGetSharedLinkFile({url:e}).then(function(e){let t=URL.createObjectURL(e.fileBlob),n=document.createElement("a");n.setAttribute("href",t),n.setAttribute("download",e.name),n.setAttribute("class","button"),n.innerText="Download: "+e.name,document.getElementById("results").appendChild(n)}).catch(function(e){console.error(e)}),!1}uploadFile(e){const t=e.files[0];if(t.size<this.UPLOAD_FILE_SIZE_LIMIT)return new Promise((e,n)=>{this.dbx.filesUpload({path:"/"+t.name,contents:t}).then(function(t){e(t)}).catch(function(e){n(e)})});{const e=8e6,n=[];let o=0;while(o<t.size){let s=Math.min(e,t.size-o);n.push(t.slice(o,o+s)),o+=s}const s=n.reduce((n,o,s,a)=>{return 0==s?n.then(function(){return this.dbx.filesUploadSessionStart({close:!1,contents:o}).then(e=>e.session_id)}):s<a.length-1?n.then(function(t){let n={session_id:t,offset:s*e};return this.dbx.filesUploadSessionAppendV2({cursor:n,close:!1,contents:o}).then(()=>t)}):n.then(function(e){let n={session_id:e,offset:t.size-o.size},s={path:"/"+t.name,mode:"add",autorename:!0,mute:!1};return this.dbx.filesUploadSessionFinish({cursor:n,commit:s,contents:o})})},Promise.resolve());return new Promise((e,t)=>{s.then(function(t){e(t)}).catch(function(e){t(e)})})}}}function v(e){return new Promise(function(t){var n=document.createElement("script");n.src=e,n.onreadystatechange=n.onload=function(){var e=setInterval(function(){n.readyState&&!/loaded|complete/.test(n.readyState)||(clearInterval(e),t())},100)},document.getElementsByTagName("head")[0].appendChild(n)})}const E=v("https://apis.google.com/js/api.js");class b{constructor(){this.authenticated=this.isAuthenticated(),this.authInstance=null,this.login=this.login.bind(this),this.refreshToken=this.refreshToken.bind(this),this.setSession=this.setSession.bind(this),this.logout=this.logout.bind(this),this.isAuthenticated=this.isAuthenticated.bind(this),this.isSignedIn=this.isSignedIn.bind(this)}_expiresAt(e){return JSON.stringify(1e3*e.expires_in+(new Date).getTime())}_setStorage(e,t=null){localStorage.setItem("gapi.access_token",e.access_token),localStorage.setItem("gapi.id_token",e.id_token),localStorage.setItem("gapi.expires_at",this._expiresAt(e)),t&&(localStorage.setItem("gapi.id",t.getId()),localStorage.setItem("gapi.full_name",t.getName()),localStorage.setItem("gapi.first_name",t.getGivenName()),localStorage.setItem("gapi.last_name",t.getFamilyName()),localStorage.setItem("gapi.image_url",t.getImageUrl()),localStorage.setItem("gapi.email",t.getEmail()))}_clearStorage(){localStorage.removeItem("gapi.access_token"),localStorage.removeItem("gapi.id_token"),localStorage.removeItem("gapi.expires_at"),localStorage.removeItem("gapi.id"),localStorage.removeItem("gapi.full_name"),localStorage.removeItem("gapi.first_name"),localStorage.removeItem("gapi.last_name"),localStorage.removeItem("gapi.image_url"),localStorage.removeItem("gapi.email")}login(){if(!this.authInstance)throw new Error("gapi not initialized");return this.authInstance.signIn().then(this.setSession)}refreshToken(){if(!this.authInstance)throw new Error("gapi not initialized");const e=this.authInstance.currentUser.get();e.reloadAuthResponse().then(e=>{this._setStorage(e)})}logout(){if(!this.authInstance)throw new Error("gapi not initialized");this.authInstance.signOut(e=>console.log(e)),this._clearStorage(),this.authenticated=!1}setSession(e){const t=this.authInstance.currentUser.get().getBasicProfile(),n=e.Zi;this._setStorage(n,t),this.authenticated=!0}isAuthenticated(){const e=JSON.parse(localStorage.getItem("gapi.expires_at"));return(new Date).getTime()<e}isSignedIn(){const e=this.authInstance.currentUser.get();return e.isSignedIn.get()}getUserData(){return{firstName:localStorage.getItem("gapi.first_name"),lastName:localStorage.getItem("gapi.last_name"),email:localStorage.getItem("gapi.email")}}}const x=new b,{login:S,logout:y,isAuthenticated:C,getUserData:I,refreshToken:k,isSignedIn:D}=x;var T={install:function(e,t){e.gapiLoadClientPromise=null;const n=n=>{E.then(o=>{const s=window.gapi;s?s.auth?n(s):s.load("client:auth2",()=>{e.gapiLoadClientPromise=s.client.init(t).then(()=>{console.info("gapi client initialised."),x.authInstance=s.auth2.getAuthInstance(),n(s)}).catch(e=>{if(e.error){const t=e.error;console.error("Failed to initialize gapi: %s (status=%s, code=%s)",t.message,t.status,t.code,e)}})}):console.error("Failed to load gapi!")})};e.prototype.$getGapiClient=()=>{return new Promise((t,o)=>{e.gapiLoadClientPromise&&0===e.gapiLoadClientPromise.status?t(e.gapiLoadClientPromise):n(t,o)})},e.prototype.$login=()=>{return e.prototype.$getGapiClient().then(S)},e.prototype.$refreshToken=()=>{return e.prototype.$getGapiClient().then(k)},e.prototype.$logout=()=>{return e.prototype.$getGapiClient().then(y)},e.prototype.$isAuthenticated=C,e.prototype.$isSignedIn=D,e.prototype.$getUserData=I}};function A(e,t){e.use(T,t)}"undefined"!==typeof window&&window.Vue&&window.Vue.use(A);var M=A;class O{constructor(){this.BASE_URL="http://172.16.187.238",this.proxyPort=Object({NODE_ENV:"production",VUE_APP_SECRET:"C_MW5rCdAz36_3QCXFUECqwjl4qqFTKp113T8bHg",VUE_APP_DEBUG:"true",BASE_URL:"/"}).PORT?Object({NODE_ENV:"production",VUE_APP_SECRET:"C_MW5rCdAz36_3QCXFUECqwjl4qqFTKp113T8bHg",VUE_APP_DEBUG:"true",BASE_URL:"/"}).PORT:3344,this.redirectPort=Object({NODE_ENV:"production",VUE_APP_SECRET:"C_MW5rCdAz36_3QCXFUECqwjl4qqFTKp113T8bHg",VUE_APP_DEBUG:"true",BASE_URL:"/"}).PORT?Object({NODE_ENV:"production",VUE_APP_SECRET:"C_MW5rCdAz36_3QCXFUECqwjl4qqFTKp113T8bHg",VUE_APP_DEBUG:"true",BASE_URL:"/"}).PORT:3344,this.settings={dropbox:{},google:{}}}}let P=new O;class L{constructor(){const e=i["a"].state.settings.dropbox.accessToken;this.dropbox=new w(e,P.redirectPort),this.google=M}}let $=new L;var R=n("04e1");class U{constructor(){this.token=u.get("token"),this.userData=this.getTokenData()}getTokenData(){try{return R(this.token)}catch(Error){return null}}}let N=new U;n.d(t,"a",function(){return B});class F{constructor(){this.mediastorage=o,this.auth=m,this.user=N,this.config=P,this.service=$}getUidV4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"==e?t:3&t|8;return n.toString(16)})}debounce(e,t,n){var o;return function(){var s=this,a=arguments,i=function(){o=null,n||e.apply(s,a)},r=n&&!o;clearTimeout(o),o=setTimeout(i,t),r&&e.apply(s,a)}}time_ago(e){var t=new Date,n=6e4,o=60*n,s=24*o,a=30*s,i=365*s,r=t-e;return r<n?Math.round(r/1e3)+" seconds ago":r<o?Math.round(r/n)+" minutes ago":r<s?Math.round(r/o)+" hours ago":r<a?Math.round(r/s)+" days ago":r<i?Math.round(r/a)+" months ago":Math.round(r/i)+" years ago"}axios(){return a.a.defaults.headers.common["Authorization"]=`Bearer ${this.mediastorage.cookies.get("token")}`,a.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",a.a.defaults.headers.common["csrfToken"]="C_MW5rCdAz36_3QCXFUECqwjl4qqFTKp113T8bHg",a.a.interceptors.response.use(void 0,function(e){var t=e.config;if(!t||!t.retry)return Promise.reject(e);if(t.__retryCount=t.__retryCount||0,t.__retryCount>=t.retry)return Promise.reject(e);t.__retryCount+=1;var n=new Promise(function(e){setTimeout(function(){e()},t.retryDelay||1)});return n.then(function(){return a()(t)})}),a.a}_handleError(e){var t={data:e.response.data.message,color:"error"};switch(e.response.status){case 409:i["a"].commit(c["K"],t);break;case 404:i["a"].state.errorState=!0,t.data="Something went wrong.",i["a"].commit(c["K"],t);break;case 401:this.auth.logout(),r["a"].push("/"),i["a"].commit(c["K"],t);break;case 403:i["a"].commit(c["K"],t);break;case 500:t.data="Server Internal Error.",i["a"].commit(c["K"],t);break;default:i["a"].commit(c["K"],t)}throw e}}let B=new F},"94d5":function(e,t){},"9fb0":function(e,t,n){"use strict";n.d(t,"x",function(){return o}),n.d(t,"z",function(){return s}),n.d(t,"y",function(){return a}),n.d(t,"w",function(){return i}),n.d(t,"u",function(){return r}),n.d(t,"v",function(){return c}),n.d(t,"N",function(){return l}),n.d(t,"M",function(){return u}),n.d(t,"o",function(){return d}),n.d(t,"c",function(){return h}),n.d(t,"q",function(){return m}),n.d(t,"s",function(){return p}),n.d(t,"r",function(){return f}),n.d(t,"b",function(){return g}),n.d(t,"O",function(){return _}),n.d(t,"D",function(){return w}),n.d(t,"f",function(){return v}),n.d(t,"C",function(){return E}),n.d(t,"e",function(){return b}),n.d(t,"F",function(){return x}),n.d(t,"h",function(){return S}),n.d(t,"L",function(){return y}),n.d(t,"n",function(){return C}),n.d(t,"E",function(){return I}),n.d(t,"g",function(){return k}),n.d(t,"K",function(){return D}),n.d(t,"m",function(){return T}),n.d(t,"I",function(){return A}),n.d(t,"k",function(){return M}),n.d(t,"d",function(){return O}),n.d(t,"B",function(){return P}),n.d(t,"p",function(){return L}),n.d(t,"a",function(){return $}),n.d(t,"G",function(){return R}),n.d(t,"i",function(){return U}),n.d(t,"H",function(){return N}),n.d(t,"j",function(){return F}),n.d(t,"t",function(){return B}),n.d(t,"J",function(){return j}),n.d(t,"l",function(){return z}),n.d(t,"A",function(){return H});const o="SET_IS_LOADING",s="SET_IS_UPLOADING",a="SET_IS_LOADING_MORE",i="SELECT_DIRECTORY",r="SELECT_BROWSER_ITEM",c="SELECT_BROWSER_ITEMS",l="UNSELECT_BROWSER_ITEM",u="UNSELECT_ALL_BROWSER_ITEMS",d="INCREASE_GRID_SIZE",h="DECREASE_GRID_SIZE",m="LOAD_CONTENTS_SUCCESS",p="LOAD_MORE_CONTENTS_SUCCESS",f="LOAD_FULL_CONTENTS_SUCCESS",g="CREATE_DIRECTORY_SUCCESS",_="UPLOAD_SUCCESS",w="SHOW_CREATE_FOLDER_MODAL",v="HIDE_CREATE_FOLDER_MODAL",E="SHOW_CONFIRM_DELETE_MODAL",b="HIDE_CONFIRM_DELETE_MODAL",x="SHOW_MENU",S="HIDE_MENU",y="SHOW_TOOL_MODAL",C="HIDE_TOOL_MODAL",I="SHOW_INFOBAR",k="HIDE_INFOBAR",D="SHOW_SNACKBAR",T="HIDE_SNACKBAR",A="SHOW_SETTINGS",M="HIDE_SETTINGS",O="DELETE_SUCCESS",P="SET_SETTINGS",L="IS_MOBILE",$="CHANGE_VIEW",R="SHOW_PREVIEW_MODAL",U="HIDE_PREVIEW_MODAL",N="SHOW_RENAME_MODAL",F="HIDE_RENAME_MODAL",B="RENAME_SUCCESS",j="SHOW_SHARE_MODAL",z="HIDE_SHARE_MODAL",H="SET_SEARCH_QUERY"}});
//# sourceMappingURL=app.4fa4e8e9.js.map