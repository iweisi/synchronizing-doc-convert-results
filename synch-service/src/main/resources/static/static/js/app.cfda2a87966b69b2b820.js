webpackJsonp([1],{NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")({name:"App"},a,!1,function(t){n("mFR6")},null,null).exports,i=n("/ocq"),r=n("2sCs"),c=n.n(r),l=(n("uAC3"),n("OFNa")),u=n.n(l),d={title:function(t){t=t||"editor demo",window.document.title=t}},p="http://localhost:2020/";d.ajaxUrl=p,d.onlineSocketUrl="ws://localhost:2020/onlineSocket",d.convertingResultSocket="ws://localhost:2020/convertingSocket",d.ajax=c.a.create({baseURL:p,timeout:3e4}),d.post=function(t,e){var n=this;return c()({method:"post",baseURL:p,url:t,data:e,timeout:1e4,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json; charset=UTF-8"}}).then(function(t){return n.checkStatus(t)})},d.checkStatus=function(t){return!t||200!==t.status&&304!==t.status&&400!==t.status?(l.Message.warning("网络异常"),{status:-404,msg:"网络异常"}):t},d.randNumber=function(t){for(var e="",n=0;n<t;n++)e+=Math.floor(10*Math.random());return e};var f=d,h={name:"doc-upload",props:["convertId"],data:function(){return{fileList:[],readyUploadFile:[],cid:0}},created:function(){this.cid=this.convertId},methods:{handleFileToBase64:function(t){var e=new FileReader,n=this;return e.readAsDataURL(t),e.onload=function(){n.fileList.push({name:t.name,content:e.result,convertId:n.cid}),n.readyUploadFile.push({name:t.name})},!1},handleRmFile:function(t){console.log(t);var e=this,n=0;this.fileList.forEach(function(o){o.name==t.name&&(e.fileList.splice(n,1),e.readyUploadFile.splice(n,1)),n++})},submitPic:function(){var t=this;this.isEmpty()?this.$Message.error("请至少上传一个doc文件"):f.post("upload/multybase64",this.fileList).then(function(e){t.$Message.success("file upload success!"),t.$emit("setDocData",t.handleDocList()),t.$emit("next")})},isEmpty:function(){return 0==this.fileList.length},handleDocList:function(){var t=[];return this.fileList.forEach(function(e){t.push({filename:e.name,convertId:e.convertId,status:0})}),t}}},v={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("br"),t._v(" "),n("Row",[n("Col",{attrs:{span:"8",offset:"8"}},[n("Upload",{attrs:{multiple:"",type:"drag",action:"#",accept:".doc, .docx","before-upload":t.handleFileToBase64,"default-file-list":t.readyUploadFile,"on-remove":t.handleRmFile}},[n("div",{staticStyle:{padding:"20px 0"}},[n("Icon",{staticStyle:{color:"#3399ff"},attrs:{type:"ios-cloud-upload",size:"52"}}),t._v(" "),n("p",[t._v("Click or drag files here to upload")])],1)])],1)],1),t._v(" "),n("Row",[n("Col",{attrs:{span:"2",offset:"14"}},[n("Button",{attrs:{type:"primary"},on:{click:t.submitPic}},[t._v("提交")])],1)],1)],1)},staticRenderFns:[]},m=n("VU/8")(h,v,!1,null,null,null).exports,w={WAITING_CONVERT:0,CONVERTED_FAILD:2,CONVERTED_SUCCESS:1},g=w,S={tableResultsColumn:[{title:"序号",type:"index",align:"center",width:80},{title:"文档名称",align:"center",render:function(t,e){return t("span",e.row.filename)}},{title:"转换状态",align:"center",render:function(t,e){var n=e.row,o=n.status===g.CONVERTED_SUCCESS?"成功":"转换中";return t("Tag",{props:{type:"dot",color:n.status===g.CONVERTED_SUCCESS?"green":"red"}},o)}},{title:"操作",align:"center",handle:!0}],tableResultsData:[{filename:"a",status:g.CONVERTED_SUCCESS},{filename:"b",statue:g.WAITING_CONVERT}]},C={name:"converting",props:["convertId","docList"],data:function(){return{ws:null,tableRefs:"convertingResultTable",tableColumn:[],tableData:[],i:0}},created:function(){this.initTable()},mounted:function(){"window"in window?this.initSocket():this.$Message.error("your browser not support socket !")},methods:{initTable:function(){var t=this;this.tableColumn=S.tableResultsColumn,this.tableData=this.docList,this.tableColumn.forEach(function(e){e.handle&&(e.render=function(e,n){var o=n.row,a=[];return o.status==g.CONVERTED_SUCCESS?a.push(t.getDownloadButton(e,o)):a.push(t.getCancledButton(e,o)),e("div",a)})})},initSocket:function(){var t=this;this.ws=new WebSocket(f.convertingResultSocket+"/"+this.convertId),this.ws.onmessage=function(e){t.getMessage(e)}},getMessage:function(t){var e=this.i,n=this,o=t.data;o=JSON.parse(o),this.tableData.forEach(function(t){e==o.index&&(n.tableData[e].savename=o.savename,n.tableData[e].status=g.CONVERTED_SUCCESS,e++,n.i++)}),this.$Message.success("convert success , the file savename is : "+o.savename)},downloadPdf:function(){window.open(f.ajaxUrl+"download/?filename="+this.filename)},getBack:function(){window.location.reload()},getDownloadButton:function(t,e){return t("Button",{props:{type:"success"},on:{click:function(){window.open(f.ajaxUrl+"download/?filename="+e.savename)}}},"下载")},getCancledButton:function(t,e){var n=this;return t("Button",{props:{type:"warning"},on:{click:function(){var t=e._index--;n.tableData.splice(t,1)}}},"取消")}}},b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Row",[n("Col",{attrs:{span:"12",offset:"6"}},[n("div",{staticClass:"spin-container"},[n("br"),t._v(" "),n("div",[n("Table",{ref:t.tableRefs,attrs:{stripe:"",columns:t.tableColumn,data:t.tableData}})],1),t._v(" "),n("div",{staticClass:"spin-content"},[n("br"),t._v(" "),n("Button",{attrs:{type:"default"},on:{click:t.getBack}},[t._v("返回首页")])],1)])])],1)],1)},staticRenderFns:[]};var _={name:"index",components:{docUpload:m,converting:n("VU/8")(C,b,!1,function(t){n("jknv")},null,null).exports},data:function(){return{current:0,people:0,ws:null,convertId:0,docList:[]}},created:function(){this.convertId=f.randNumber(5)},mounted:function(){"window"in window?this.initSocket():this.$Message.error("your browser not support socket !")},methods:{initSocket:function(){var t=this;this.ws=new WebSocket(f.onlineSocketUrl),this.ws.onmessage=function(e){t.getMessage(e)}},getMessage:function(t){this.people=t.data},setDocData:function(t){this.docList=t},nextStep:function(){this.current++},prevStep:function(){this.current--}}},R={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Row",[n("Col",{attrs:{span:"18",offset:"3"}},[n("Card",[n("Steps",{attrs:{current:t.current}},[n("Step",{attrs:{title:"上传doc文档",content:"form表单上传一个待转换的doc文档"}}),t._v(" "),n("Step",{attrs:{title:"转换过程中",content:"通过socket等待转换结果，成功后获取转换好的pdf文档"}})],1),t._v(" "),0==t.current?n("doc-upload",{attrs:{convertId:t.convertId},on:{next:t.nextStep,setDocData:t.setDocData}}):t._e(),t._v(" "),1==t.current?n("converting",{attrs:{docList:t.docList,convertId:t.convertId},on:{next:t.nextStep}}):t._e()],1)],1)],1),t._v(" "),n("Row",[n("Col",{attrs:{span:"18",offset:"3"}},[t._v("\n      当前在线人数："+t._s(t.people)+"\n    ")])],1)],1)},staticRenderFns:[]},E=n("VU/8")(_,R,!1,null,null,null).exports;o.default.use(i.a);var D=new i.a({routes:[{path:"/",name:"Index",component:E}]});n("SMjw");o.default.config.productionTip=!1,o.default.use(u.a),new o.default({el:"#app",router:D,render:function(t){return t(s)},components:{App:s},template:"<App/>"})},SMjw:function(t,e){},jknv:function(t,e){},mFR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.cfda2a87966b69b2b820.js.map