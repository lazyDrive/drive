(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a3d2"],{bb51:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"lazy__home"},[t("lazy-login")],1)},n=[],o=t("646f"),i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("section",{staticClass:"show lazy_login"},[t("form",{ref:"form"},[t("h1",[e._v("Welcome Back!")]),t("p",[e._v("We're so excited to see you again!")]),e._m(0),t("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{id:"email",name:"email",type:"email"},domProps:{value:e.email},on:{input:function(a){a.target.composing||(e.email=a.target.value)}}}),e._m(1),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{autocomplete:"",id:"password",name:"password",type:"password"},domProps:{value:e.password},on:{input:function(a){a.target.composing||(e.password=a.target.value)}}}),t("input",{attrs:{type:"submit",value:"Login"},on:{click:function(a){return a.preventDefault(),e.submit()}}}),t("a",{attrs:{href:"/forgot"}},[e._v("Forgot your password?")]),t("a",{attrs:{href:"/signup"}},[e._v("Register an account")])])])},r=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("label",{attrs:{for:"email"}},[e._v("\n      Email\n      "),t("span")])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("label",{attrs:{for:"password"}},[e._v("\n      Password\n      "),t("span")])}],l={name:"lazy-login",data(){return{password:"",loading:!1,email:""}},methods:{submit(){const e={email:this.email,password:this.password};this.loading=!0,this.$store.dispatch("login",e).then(e=>{this.finalize(e)}).catch(e=>{this.loading=!1,o["a"]._handleError(e)})},finalize(e){o["a"].mediastorage.cookies.set("name",e.data.userData.name,5e3),o["a"].mediastorage.cookies.set("email",e.data.userData.email,5e3),o["a"].mediastorage.cookies.set("token",e.data.token,5e3),o["a"].mediastorage.session.set("name",e.data.userData.name),o["a"].mediastorage.session.set("email",e.data.userData.email),o["a"].mediastorage.session.set("token",e.data.token),this.$store.state.token=e.data.token,this.$store.state.isUserLoggedIn=!0;var a=setInterval(function(){if(o["a"].auth.loggedIn()&&(clearInterval(a),200==e.status)){const a={action:"get"};a.settings=e.data.userData,this.$store.dispatch("settings",a).then(()=>{this.$router.push("/drive/u/0/my-drive")}).catch(e=>{o["a"]._handleError(e)}),this.loading=!1}}.bind(this),500)},clear(){this.$refs.form.reset()}}},d=l,m=t("2877"),u=Object(m["a"])(d,i,r,!1,null,null,null),c=u.exports,p={name:"media-home",data(){return{}},components:{"lazy-login":c},computed:{isLoggedIn:function(){return o["a"].auth.loggedIn()}}},g=p,h=Object(m["a"])(g,s,n,!1,null,null,null);a["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d21a3d2.cd81eea4.js.map