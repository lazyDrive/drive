(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9f47"],{"34c3":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"lazy__signup"},[t("media-signup")],1)},s=[],r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("section",{staticClass:"show lazy_login"},[t("form",{ref:"form"},[t("h1",[e._v("Join LazyDrive")]),t("p",[e._v("Join our wonderfull community")]),e._m(0),t("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{id:"name",name:"name",type:"text"},domProps:{value:e.name},on:{input:function(a){a.target.composing||(e.name=a.target.value)}}}),e._m(1),t("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{id:"email",name:"email",type:"email"},domProps:{value:e.email},on:{input:function(a){a.target.composing||(e.email=a.target.value)}}}),e._m(2),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{autocomplete:"",id:"password",name:"password",type:"password"},domProps:{value:e.password},on:{input:function(a){a.target.composing||(e.password=a.target.value)}}}),t("input",{attrs:{type:"submit",value:"Register"},on:{click:function(a){return a.preventDefault(),e.submit()}}}),t("a",{attrs:{href:"/forgot"}},[e._v("Forgot your password?")]),t("a",{attrs:{href:"/login"}},[e._v("Login")])])])},i=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("label",{attrs:{for:"name"}},[e._v("\n      Name\n      "),t("span")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("label",{attrs:{for:"email"}},[e._v("\n      Email\n      "),t("span")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("label",{attrs:{for:"password"}},[e._v("\n      Password\n      "),t("span")])}],o={name:"lazy-signup",data(){return{password:"",name:"",email:"",loading:!1}},methods:{submit(){const e={name:this.name,email:this.email,password:this.password};this.$store.dispatch("signup",e).then(()=>{this.clear()}).catch(e=>{console.log(e)})},clear(){this.$refs.form.reset()}}},l=o,m=t("2877"),u=Object(m["a"])(l,r,i,!1,null,null,null),p=u.exports,c={name:"media-main-signup",components:{"media-signup":p}},d=c,v=Object(m["a"])(d,n,s,!1,null,null,null);a["default"]=v.exports}}]);
//# sourceMappingURL=chunk-2d0b9f47.71078e07.js.map