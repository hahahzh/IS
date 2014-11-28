/*
  *SurveyRazor.js 问卷渲染引擎
  *Version:RW_1.1
  *Author:WGM
  *Data:2014-6-20
  */
  var SurveyRazor = {
  
      /*html模版*/
     htmlTemplate: {
         //必填
         mustFill: "<span style=\"color: red;\">&nbsp;*(必填)</span>",
         //多选
         moreSelc: "<span>[多选题]</span>",
         //问卷大分类
         questionBigType: "<div class='qType'>"
                           + "<label style=\"display: block; padding-top: 7px;\">{content}</label></div>",
         //题的Div
         qustionBody: "<div class=\"div_question\" id=\"{id}\">{content}</div>",
         //题的题干
         questionHead: "<div class=\"div_title_question_all\">"
                        + "<div class=\"div_topic_question\"><b>{seq}.</b></div>"
                        + "<div id=\"{id}\" class=\"div_title_question\">"
                        + "{headTitle}{extend}</div>"
                        + "<div style=\"clear: both;\"></div></div>",

         //单选类型,单选项选项补充
         radio: "<input type=\"radio\" name=\"{name}\" id=\"{id}\" value=\"{value}\"  class=\" {validation}\" onclick='{onclick};' /><label for=\"{for}\">{content}</label>",
         radioAdd: "<input type=\"radio\" name=\"{name}\" id=\"{id}\" value=\"{value}\" class=\" {validation}\" ><label for=\"{for}\" style=\"display: inline-block;\">{content}</label>"
                            + "<input class=\"underline itemExtend\" type=\"text\" value=\"{extendValue}\" rel=\"{rel}\" "
                            + "style=\"color: rgb(153, 153, 153); position: static;\">",
         itemAppend: "<input class=\"underline itemExtend\" type=\"text\" value=\"{value}\" rel=\"{rel}\" name=\"{name}\"  "
                     + "style=\"color: rgb(153, 153, 153); position: static;\">",
         //多选类型,多选项补充
         checkbox: "<input id=\"{id}\" type=\"checkbox\" name=\"{name}\" value=\"{value}\" class=\" {validation}\" /><label for=\"{for}\">{content}</label>",
        checkboxAdd: "<input type=\"checkbox\" name=\"{name}\" id=\"{id}\" value=\"{value}\" class=\" {validation}\" ><label for=\"{for}\" style=\"display: inline-block;\">{content}</label>"
                            + "<input class=\"underline itemExtend\" type=\"text\" value=\"{extendValue}\" rel=\"{rel}\" "
                            + "style=\"color: rgb(153, 153, 153); position: static;\">",
         //包裹的元素
         radioOrCheckboxWrap: "<div class=\"div_table_radio_question\" id=\"{id}\">"
                             + "<div class=\"div_table_clear_top\"></div>"
                             + " <ul class=\"ulradiocheck\">{items}<div style=\"clear: both;\"></div></ul>{discuss}</div>",
         //填空题
         fillInput: "<div class=\"div_table_radio_question\" id=\"{id}\"><div class=\"div_table_clear_top\"></div>"
                    + "<textarea  class=\"inputtext {validation}\" style=\"overflow: auto; width: 62%; height: 22px;\" "
                    + " title='{title}' id=\"{id}\" name=\"{name}\" value='{value}'></textarea>"
                   + "<div class=\"div_table_clear_bottom\"></div></div>",
 
         fillInputWrap: "<div class=\"div_table_radio_question\" id=\"{id}\"><div class=\"div_table_clear_top\"></div>"
                     + "{content}<div class=\"div_table_clear_bottom\"></div></div>",
         fillInputItem: "<label>{title}</label>"
                        + "<textarea title=\"{tip}\" style=\"overflow: auto; width: 20%; height: 22px;\" "
                        + " class=\"inputtext {validation}\" value='{value}' id=\"{id}\" name=\"{name}\"></textarea>",
 
 
         //大填空题
         bigInput: " <div class=\"div_table_radio_question\" id=\"{id}\"><div class=\"div_table_clear_top\"></div>"
                          + "<textarea  class=\"inputtext {validation}\" style=\"overflow: auto; width: 62%;\" rows=\"3\" "
                          + "id='{id}' value='{value}' name='{name}' title='{title}' ></textarea>"
                          + "<div style=\"clear: both;\"></div>"
                          + "<div class=\"div_table_clear_bottom\"></div></div>",
         //评论框
         discussInput: "<ul class=\"ulradiocheck\">"
                              + "<div style=\"float: left; padding: 1px; margin-top: 12px; margin-right: 5px; border: 1px solid gray\">"
                               + "<span>评论</span> </div>"
                               + "<textarea style=\"width: 60%\" rows=\"3\" name='{name}' class=\"inputtext {validation}\" id='{id}' for='{for}' ></textarea>"
                              + "<div style=\"clear: both;\"></div>"
                               + "</ul>",
         //下拉选择题
         comboxSlt: " <div class=\"div_table_radio_question\" id=\"{id}\"><div class=\"div_table_clear_top\"></div>"
                           + "<select id=\"{id}\" name=\"{name}\">{option}</select>"
                           + "<div style=\"clear: both;\"></div>"
                           + "<div class=\"div_table_clear_bottom\"></div></div>",
         //排序题
         sortQuestion: {
             checkItem: "<li style=\"float: none;\" class=\"lisort\">"
                                + "<input id=\"{id}\" type=\"checkbox\" rel=\"{rel}\" value=\"{value}\" class=\" {validation}\" style=\"color: rgb(153, 153, 153);\" />"
                                + "<label for=\"{for}\">{content}</label></li>",
             sortArea: "<select size=\"{size}\" id='{id}' name='{name}' style=\"width:{width}px; overflow: auto; height:{height}px;\"></select>",
             body: "<div class=\"div_table_radio_question\" id=\"{id}\" ><div class=\"div_table_clear_top\"></div>"
                             + "<div style=\"width: 90%;\">"
                            + "<ul style=\"float: left;\">{checkItem}</ul>"
                             + "<table style=\"float: left;\"><tbody>"
                             + "<tr>"
                             + "<td verticalalign=\"center\">"
                             + "<div style=\"margin-left: 10px;\">{sortArea}</div>"
                             + "</td>"
                             + "<td verticalalign=\"center\">"
                             + "<div class=\"qButton\">"
                             + "<ul>"
                             + "<li><a rel=\"{rel}\" class=\"goTop\" href=\"javascript:void(0);\" name=\"first\">移至最前</a></li>"
                             + "<li><a rel=\"{rel}\" href=\"javascript:void(0);\" class=\"upMove\" name=\"up\">上移一位</a></li>"
                             + "<li style=\"margin-top: 10px\"><a rel=\"{rel}\" href=\"javascript:void(0);\" class=\"downMove\" name=\"down\">下移一位</a> </li>"
                             + "<li><a rel=\"{rel}\" class=\"goBottom\" href=\"javascript:void(0);\" name=\"last\">移至最后</a>"
                             + "</li>"
                             + "</ul>"
                             + "</div></td>"
                             + "</tr>"
                             + "</tbody></table>"
                             + "<div style=\"clear: both;\"></div></div></div>"
         },
 
         //矩阵题
         matrix: {
             titleTd: "<td align=\"center\">{content}</td>",
             contentTd: "<td align=\"center\" class=\"##line##\" style=\"cursor: pointer;\">{content}</td>",
             item: "<tr align=\"left\" rowindex=\"{rowindex}\" >"
                + "<th class=\"rowth\" align=\"left\" style=\"\">{leftTitle}</th>"
                 + "{items}<th class=\"rowth\" align=\"left\" style=\"\">{rightTitle}</th></tr>",
 
             body: "<div class=\"div_table_radio_question\" id=\"{id}\"><div class='div_table_clear_top'></div>"
                       + "<table style=\"width: 100%;\" border=\"0px\" cellpadding=\"5\" cellspacing=\"0\">"
                       + "<thead><tr><th></th>{head}</tr></thead>"
                       + "<tbody><tr align=\"left\">{items}"
                       + "</tbody></table>"
                       + "<div class=\"div_table_clear_bottom\"></div></div>"
         }
     },
     //包括标题,页眉, 描述
     headBar: {
         title: ""
     },
     //提交工具栏
     submitBar: {
        title: ""
   },
 
     typeSign: { //题目类型
         "大类别": "BIGTYPE",
         "矩阵": "JUZHEN",
        "单选": "DANXUAN",
         "多选": "DUOXUAN",
         "下拉": "XIALA",
       "评论": "PINGLUN",
         "排序": "PAIXU",
         "填空": "TIANKONG",
         "填写": "TIANXIE",
         "图片单选": "TUPIANDANXUAN",
         "图片多选": "TUPIANDUOXUAN",
         "单选说明": "DANXUANSHUOMING",
         "多选说明": "DUOXUANSHUOMING"
     },
    dataStore: {
         globalData: [],
         mapFields: {
             isInit: false,                   //是否初始化
             Id: "Id",
             Name: "Name",
             LName: "LName",                  //用于矩阵题 (左侧名称)
             RName: "RName",
            SortIndex: "SortIndex",
             Type: "Type",
             TypeCode: "TypeCode",
             IsMoreSlc: "IsMoreSlc",         //多选
             IsMustSlc: "IsMustSlc",         //必选
             IsTiGan: "IsTiGan",             //是否为题干
             ValidateRule: "ValidateRule",   //验证规则
             Layout: "Layout",                //横向,纵向
             ParentId: "ParentId",
            Path: "Path",                   //Path
             IsLeaf: "IsLeaf",               //是否子节点
             Extend: "Extend",                //扩展信息
             Ext1: ""
         },
         configFields: function (option) {
             var option = $.extend(this.mapFields, option || {});
             this.mapFields = option;
             this.mapFields.isInit = true;
             return option;
         },

        //获取子节点
         getChildsById: function (id) {
             if (this.globalData.length <= 0) {
                 throw new Error("dataStore数据集无数据");
                 return;
             }
             var tempArr = [];
             for (var i = 0; i < this.globalData.length; i++) {
                 if (this.globalData[i][this.mapFields.ParentId] == id) {
                     tempArr.push(this.globalData[i]);
                 }
             }
             return tempArr;
         },
         //获取题干
         getTiGanArr: function () {
             if (!$.isArray(this.globalData)) {
                 throw new Error("数据源为空");
                 return;
             }
             var arr = [];
             for (var i = 0; i < this.globalData.length; i++) {
                 if (this.globalData[i][this.mapFields.IsTiGan]) {
                     arr.push(this.globalData[i]);
                 }
             }
             return arr;
         },
         //加载数据
        load: function (data) {
             if (!$.isArray(data)) {
                 throw new Error("数据源为空");
                 return;
             }
             if (!this.mapFields.isInit) {
                this.configFields(); //使用默认配置初始化
             }
             function getChildByPId(pid) {
                 var tempArr = [];
                for (var i = 0; i < data.length; i++) {
                     if (data[i][SurveyRazor.dataStore.mapFields.ParentId] == pid) {
                         tempArr.push(data[i]);
                     }
                 }
                 return tempArr;
             }
             for (var i = 0; i < data.length; i++) {
                 //  if (data[i][this.mapFields.TypeCode] == SurveyRazor.typeSign.矩阵) {
                 //      var arr = getChildByPId(data[i][this.mapFields.Id]);
                 //      data[i][this.mapFields.Extend] = arr; //扩展字段存子节点
                 //  }
 
                var dt = $.extend({
                     Extend: "",
                     Layout: "SingleCln" //默认单列显示
                 }, data[i] || {})
                 this.globalData.push(dt)
             }
         }
    },
     surveyRazor: {
         config: {
             surveyTitle: "",        //问卷标题
            description: "",        //问卷描述
             header: "",              //问卷眉头
             filesItem: [],          //附加的文件
             mapFields: "",          //映射到的字段
             haveBgImg: false,       //是否启用背景   
             bgColor: "",            //背景颜色
             bgImg: "./SurveyRazor/img/bg1.jpg", //背景图片
             mainCss: "./SurveyRazor/surveyq.css",
             extCss: "./SurveyRazor/surveyextend.css",
            records: []               //数据集
         },
 
         /**
         *  配置项
         */
         options: function (options) {
             if (options && $.isEmptyObject(options)) {
                 throw new Error("参数不是对象或对象为空!");
                 return
            }
             this.config.mapFields = SurveyRazor.dataStore.mapFields;
             var opt = $.extend(this.config, options || {});
             this.config = opt;
             return this;
         },
         /**
         *   单选或多选
         *   rec:题干数据
         *   seq:序号
         */
         clearChecked: function (objId) {
             $(":radio[name='" + objId + "']").each(function () {
                 $(this).attr("checked", false);
             })
             $("#clr_" + objId).hide();
         },
         showClrBtn: function (Id) {
             $("#clr_" + Id).show();
         },
         radioOrCheckbox: function (rec, seq) {
             var Id = rec[SurveyRazor.dataStore.mapFields.Id];
             var title = rec[SurveyRazor.dataStore.mapFields.Name];
             var IsMustSlc = rec[SurveyRazor.dataStore.mapFields.IsMustSlc];
             var IsMoreSlc = rec[SurveyRazor.dataStore.mapFields.IsMoreSlc];
 
             var tigan = SurveyRazor.htmlTemplate.qustionBody.replace("{id}", "p_" + Id); //p_
             var content = SurveyRazor.htmlTemplate.questionHead;
             content = content.replace("{seq}", seq); //序号
             content = content.replace("{id}", Id); //Id
             content = content.replace("{headTitle}", title) //题干内容
             var extend = "";
             extend += IsMustSlc ? SurveyRazor.htmlTemplate.mustFill : ""; //是否必填
             extend += IsMoreSlc ? SurveyRazor.htmlTemplate.moreSelc : ""; //[多选题]
 
             if (rec[SurveyRazor.dataStore.mapFields.TypeCode] == SurveyRazor.typeSign.单选) {
                 extend += "<span class='clrBtn' id='clr_" + Id + "' style=' color:rgb(153,51,0);cursor:pointer;font-size:12px;display:none;'"
                        + " onclick=SurveyRazor.surveyRazor.clearChecked(\"" + Id + "\") ;'>【清除】</span>";
             }
             content = content.replace("{extend}", extend);
            var wrapHtml = SurveyRazor.htmlTemplate.radioOrCheckboxWrap;
             wrapHtml = wrapHtml.replace("{id}", "w_" + Id);
 
             //添加选择项
             var gItemHtml = "", pingLun = []; //pingLun:评论项
             var childNodeArrs = SurveyRazor.dataStore.getChildsById(Id);
             for (var j = 0; j < childNodeArrs.length; j++) {
                 var childRec = childNodeArrs[j];
                 if (childRec[SurveyRazor.dataStore.mapFields.TypeCode] == SurveyRazor.typeSign.评论) { //如果是评论项
                     pingLun.push(childRec);
                    continue;
                }
                 var itemHtml = "";
                 if (rec[SurveyRazor.dataStore.mapFields.TypeCode] == SurveyRazor.typeSign.单选) {
                     if (childRec[SurveyRazor.dataStore.mapFields.TypeCode] == SurveyRazor.typeSign.单选说明) {
                         itemHtml = SurveyRazor.htmlTemplate.radioAdd;
                         itemHtml = itemHtml.replace("{rel}", childRec[SurveyRazor.dataStore.mapFields.Id]); //关联的Id
                         itemHtml = itemHtml.replace("{extendValue}", "")
                    } else {
                         itemHtml = SurveyRazor.htmlTemplate.radio;
                         itemHtml = itemHtml.replace("{onclick}", "SurveyRazor.surveyRazor.showClrBtn(\"" + Id + "\")")
                     }
                 } else if (rec[SurveyRazor.dataStore.mapFields.TypeCode] == SurveyRazor.typeSign.多选) {
                     if (childRec[SurveyRazor.dataStore.mapFields.TypeCode] == SurveyRazor.typeSign.多选说明) {
                         itemHtml = SurveyRazor.htmlTemplate.checkboxAdd;
                         itemHtml = itemHtml.replace("{rel}", childRec[SurveyRazor.dataStore.mapFields.Id]);
                         itemHtml = itemHtml.replace("{extendValue}", "")
                     } else {
                         itemHtml = SurveyRazor.htmlTemplate.checkbox;
                     }
                 }
 
                 itemHtml = itemHtml.replace("{id}", childRec[SurveyRazor.dataStore.mapFields.Id]);
                 itemHtml = itemHtml.replace("{name}", Id);
                 itemHtml = itemHtml.replace("{value}", childRec[SurveyRazor.dataStore.mapFields.Name]);
                //验证规则
                 itemHtml = itemHtml.replace("{validation}", childRec[SurveyRazor.dataStore.mapFields.ValidateRule] || "")
                 //选项名称
                 itemHtml = itemHtml.replace("{content}", childRec[SurveyRazor.dataStore.mapFields.Name]);
 
                 if (rec[SurveyRazor.dataStore.mapFields.Layout] == "moreCln") {
                     //需要自动计算列宽
                     var width = parseInt($("body").width() || 700); //默认为700
                     var length = childNodeArrs.length;
                     var parcent = Number(parseFloat(1 / (length > 7 ? 7 : length) * 100)).toFixed(3);
                     itemHtml = "<li style=\"width: " + parcent + "%;\">" + itemHtml + "</li>";
                 } else {//单列布局
                     itemHtml = "<li style=\"width: 99%;\">" + itemHtml + "</li>";
                 }
                 gItemHtml += itemHtml;
             }
             //评论项
             var pinlunItemHtml = "";
             for (var i = 0; i < pingLun.length; i++) {
                 var childRec = pingLun[i];
                 var html = SurveyRazor.htmlTemplate.discussInput;
                 html = html.replace("{name}", Id);
                 html = html.replace("{id}", childRec[SurveyRazor.dataStore.mapFields.Id]);
                 html = html.replace("{validation}", childRec[SurveyRazor.dataStore.mapFields.ValidateRule] || "");
                 pinlunItemHtml += html;
             }
             wrapHtml = wrapHtml.replace("{discuss}", pinlunItemHtml); //添加评论
             wrapHtml = wrapHtml.replace("{items}", gItemHtml);
             tigan = tigan.replace("{content}", content + wrapHtml);
             return tigan;
         },
 
         /*
         *下拉选择
         *
         */
        combox: function (rec, seq) {
             var Id = rec[SurveyRazor.dataStore.mapFields.Id];
             var title = rec[SurveyRazor.dataStore.mapFields.Name];
             var IsMustSlc = rec[SurveyRazor.dataStore.mapFields.IsMustSlc];

             var tigan = SurveyRazor.htmlTemplate.qustionBody.replace("{id}", "p_" + Id); //p_
             var content = SurveyRazor.htmlTemplate.questionHead;
             content = content.replace("{seq}", seq); //序号
             content = content.replace("{id}", Id); //Id
             content = content.replace("{headTitle}", title) //题干内容
             var extend = "";
             extend += IsMustSlc ? SurveyRazor.htmlTemplate.mustFill : ""; //是否必填
 
             content = content.replace("{extend}", extend);
             var wrapHtml = SurveyRazor.htmlTemplate.comboxSlt;
             wrapHtml = wrapHtml.replace("{id}", "w_" + Id);
           wrapHtml = wrapHtml.replace("{id}", Id);
             wrapHtml = wrapHtml.replace("{name}", Id);
 
             //添加子项
             var gItemHtml = "<option value=''>请选择...</option>";
             var childNodeArrs = SurveyRazor.dataStore.getChildsById(Id);
            for (var j = 0; j < childNodeArrs.length; j++) {
                 var childRec = childNodeArrs[j];
                 var itemHtml = "<option value='" + childRec[SurveyRazor.dataStore.mapFields.Id] + "'>"
                                 + childRec[SurveyRazor.dataStore.mapFields.Name]
                                 + "</option>";
                 gItemHtml += itemHtml;
             }
             wrapHtml = wrapHtml.replace("{option}", gItemHtml);
            tigan = tigan.replace("{content}", content + wrapHtml);
             return tigan;
         },
         /**
         * 文本输入
         */
        bigTextarea: function (rec, seq) {
             var Id = rec[SurveyRazor.dataStore.mapFields.Id];
            var title = rec[SurveyRazor.dataStore.mapFields.Name];
             var IsMustSlc = rec[SurveyRazor.dataStore.mapFields.IsMustSlc];
 
             var tigan = SurveyRazor.htmlTemplate.qustionBody.replace("{id}", "p_" + Id); //p_
             var content = SurveyRazor.htmlTemplate.questionHead;
             content = content.replace("{seq}", seq); //序号
             content = content.replace("{id}", Id); //Id
            content = content.replace("{headTitle}", title) //题干内容
             var extend = "";
            extend += IsMustSlc ? SurveyRazor.htmlTemplate.mustFill : ""; //是否必填
 
             content = content.replace("{extend}", extend);
             var wrapHtml = SurveyRazor.htmlTemplate.bigInput;
           wrapHtml = wrapHtml.replace("{id}", "w_" + Id);
             wrapHtml = wrapHtml.replace("{id}", Id);
             wrapHtml = wrapHtml.replace("{value}", "");
            wrapHtml = wrapHtml.replace("{name}", Id);
             wrapHtml = wrapHtml.replace("{title}", ""); //提示,暂时为空
             wrapHtml = wrapHtml.replace("{validation}", rec[SurveyRazor.dataStore.mapFields.ValidateRule] || ""); //验证规则
            tigan = tigan.replace("{content}", content + wrapHtml);
             return tigan;
         },
         smallTextarea: function (rec, seq) {
             var Id = rec[SurveyRazor.dataStore.mapFields.Id];
             var title = rec[SurveyRazor.dataStore.mapFields.Name];
             var IsMustSlc = rec[SurveyRazor.dataStore.mapFields.IsMustSlc];
 
             var tigan = SurveyRazor.htmlTemplate.qustionBody.replace("{id}", "p_" + Id); //p_
            var content = SurveyRazor.htmlTemplate.questionHead;
             content = content.replace("{seq}", seq); //序号
             content = content.replace("{id}", Id); //Id
             content = content.replace("{headTitle}", title) //题干内容
             var extend = "";
             extend += IsMustSlc ? SurveyRazor.htmlTemplate.mustFill : ""; //是否必填
             content = content.replace("{extend}", extend);

             if (rec[SurveyRazor.dataStore.mapFields.IsLeaf]) { //如果是子节点
                var wrapHtml = SurveyRazor.htmlTemplate.fillInput;
                 wrapHtml = wrapHtml.replace("{id}", "w_" + Id);
                 wrapHtml = wrapHtml.replace("{id}", Id);
                 wrapHtml = wrapHtml.replace("{name}", Id);
                 wrapHtml = wrapHtml.replace("{validation}", rec[SurveyRazor.dataStore.mapFields.ValidateRule] || ""); //验证规则
                 wrapHtml = wrapHtml.replace("{title}", ""); //提示,暂时为空
               tigan = tigan.replace("{content}", content + wrapHtml);
                 return tigan;
             } else if (!rec[SurveyRazor.dataStore.mapFields.IsLeaf]) {
                 //还有子节点
                 var wrapHtml = SurveyRazor.htmlTemplate.fillInputWrap;
                wrapHtml = wrapHtml.replace("{id}", "w_" + Id);
                 //处理子节点
                 var gItemHtml = "";
                 var childNodeArrs = SurveyRazor.dataStore.getChildsById(Id);
                 for (var j = 0; j < childNodeArrs.length; j++) {
                     var childRec = childNodeArrs[j];
                     var itemHtml = SurveyRazor.htmlTemplate.fillInputItem;
                    itemHtml = itemHtml.replace("{title}", (j > 0 ? "&nbsp;" : "") + childRec[SurveyRazor.dataStore.mapFields.Name] + ":");
                     itemHtml = itemHtml.replace("{tip}", ""); //提示暂时为空
                     itemHtml = itemHtml.replace("{validation}", childRec[SurveyRazor.dataStore.mapFields.ValidateRule] || "");
                     itemHtml = itemHtml.replace("{id}", childRec[SurveyRazor.dataStore.mapFields.Id]);
                     itemHtml = itemHtml.replace("{value}", "");
                    itemHtml = itemHtml.replace("{name}", childRec[SurveyRazor.dataStore.mapFields.Id]);
                     gItemHtml += itemHtml;
                 }
                 wrapHtml = wrapHtml.replace("{content}", gItemHtml);
                 tigan = tigan.replace("{content}", content + wrapHtml);
                 return tigan;
             }
        },
         /***
        ** 排序题
         ** 
         **/
         sortQuestion: function (rec, seq) {
             var Id = rec[SurveyRazor.dataStore.mapFields.Id];
             var title = rec[SurveyRazor.dataStore.mapFields.Name];
             var IsMustSlc = rec[SurveyRazor.dataStore.mapFields.IsMustSlc];
 
            var tigan = SurveyRazor.htmlTemplate.qustionBody.replace("{id}", "p_" + Id); //p_
             var content = SurveyRazor.htmlTemplate.questionHead;
             content = content.replace("{seq}", seq); //序号
            content = content.replace("{id}", Id); //Id
             content = content.replace("{headTitle}", title) //题干内容
             var extend = "";
             extend += IsMustSlc ? SurveyRazor.htmlTemplate.mustFill : ""; //是否必填
             extend += "<span>【排序题】</span>";
             content = content.replace("{extend}", extend);
 
            var body = SurveyRazor.htmlTemplate.sortQuestion.body;
 
             //子项
            var gItemHtml = "";
             var childNodeArrs = SurveyRazor.dataStore.getChildsById(Id);
             for (var j = 0; j < childNodeArrs.length; j++) {
                var childRec = childNodeArrs[j];
                 var itemHtml = SurveyRazor.htmlTemplate.sortQuestion.checkItem;
                 itemHtml = itemHtml.replace("{id}", childRec[SurveyRazor.dataStore.mapFields.Id]);
                 itemHtml = itemHtml.replace("{rel}", Id);
                 itemHtml = itemHtml.replace("{value}", "");
                 itemHtml = itemHtml.replace("{validation}", childRec[SurveyRazor.dataStore.mapFields.ValidateRule] || "");
                itemHtml = itemHtml.replace("{content}", childRec[SurveyRazor.dataStore.mapFields.Name]);
                 gItemHtml += itemHtml;
             }
             //textarea 区域
             var sortArea = SurveyRazor.htmlTemplate.sortQuestion.sortArea;
             sortArea = sortArea.replace("{id}", Id);
             sortArea = sortArea.replace("{name}", Id);
             sortArea = sortArea.replace("{width}", 170);
            sortArea = sortArea.replace("{size}", 6);
             sortArea = sortArea.replace("{height}", (childNodeArrs.length <= 6) ? 120 : (childNodeArrs.length * 22));
 
             body = body.replace("{id}", "w_" + Id);
           body = body.replace("{checkItem}", gItemHtml);
             body = body.replace("{sortArea}", sortArea);
             body = body.replace("{rel}", Id).replace("{rel}", Id).replace("{rel}", Id).replace("{Id}", Id); //排序按钮
 
           tigan = tigan.replace("{content}", content + body);
             return tigan;
         },
         /**
         * 大类别
         */
        bigType: function (rec, seq) {
             var Id = rec[SurveyRazor.dataStore.mapFields.Id];
             var title = rec[SurveyRazor.dataStore.mapFields.Name];
             var IsMustSlc = rec[SurveyRazor.dataStore.mapFields.IsMustSlc];
 
             var html = SurveyRazor.htmlTemplate.questionBigType;
            html = html.replace("{content}", title);
             return html;
         },
         /**
         *  矩阵题
         */
         matrix: function (rec, seq) {
             var Id = rec[SurveyRazor.dataStore.mapFields.Id];
             var title = rec[SurveyRazor.dataStore.mapFields.Name];
             var IsMustSlc = rec[SurveyRazor.dataStore.mapFields.IsMustSlc];
 
             var tigan = SurveyRazor.htmlTemplate.qustionBody.replace("{id}", "p_" + Id); //p_
             var content = SurveyRazor.htmlTemplate.questionHead;
             content = content.replace("{seq}", seq); //序号
             content = content.replace("{id}", Id); //Id
             content = content.replace("{headTitle}", title) //题干内容
             var extend = "";
             extend += IsMustSlc ? SurveyRazor.htmlTemplate.mustFill : ""; //是否必填
             content = content.replace("{extend}", extend);
             //topcln title
             var theadArr = rec[SurveyRazor.dataStore.mapFields.Extend];
             var theadHtml = "";
             for (var i = 0; i < theadArr.length; i++) {
                 var childRec = theadArr[i];
                var headhtml = SurveyRazor.htmlTemplate.matrix.titleTd;
                 headhtml = headhtml.replace("{content}", childRec[SurveyRazor.dataStore.mapFields.Name]);
                 theadHtml += headhtml;
            }
            //判断是单选还是多选
            var itemHtml = "<input type=\"{type}\" id='{id}' value=\"{value}\" class=' {validation}' selfId=\"{selfId}\" name=\"{name}\" />";
            if (theadArr.length >= 0) {
                if (theadArr[0][SurveyRazor.dataStore.mapFields.TypeCode] == SurveyRazor.typeSign.多选) {
                     itemHtml = itemHtml.replace("{type}", "checkbox");
                 }
                 if (theadArr[0][SurveyRazor.dataStore.mapFields.TypeCode] == SurveyRazor.typeSign.单选) {
                     itemHtml = itemHtml.replace("{type}", "radio");
                 }
            } else {
                 itemHtml = itemHtml.replace("{type}", "radio");
             }
 
             //子项
             var gItemHtml = "";
             var childNodeArrs = SurveyRazor.dataStore.getChildsById(Id);
             for (var j = 0; j < childNodeArrs.length; j++) {
                 var childRec = childNodeArrs[j];
                var childHtml = SurveyRazor.htmlTemplate.matrix.item;
                 childHtml = childHtml.replace("{rowindex}", j);
                childHtml = childHtml.replace("{leftTitle}", childRec[SurveyRazor.dataStore.mapFields.LName] || "");
                childHtml = childHtml.replace("{rightTitle}", childRec[SurveyRazor.dataStore.mapFields.RName] || "");
 
                 //列
                 var clnHtml = "";
               for (var k = 0; k < theadArr.length; k++) {
                     var clnRec = theadArr[k];
                    var tdHtml = SurveyRazor.htmlTemplate.matrix.contentTd;
                     var tempHtml = itemHtml;
                    tempHtml = tempHtml.replace("{id}", clnRec[SurveyRazor.dataStore.mapFields.Id]);
                     tempHtml = tempHtml.replace("{value}", clnRec[SurveyRazor.dataStore.mapFields.Name]);
                    tempHtml = tempHtml.replace("{name}", childRec[SurveyRazor.dataStore.mapFields.Id]); //hang
                     tempHtml = tempHtml.replace("{validation}", childRec[SurveyRazor.dataStore.mapFields.ValidateRule] || ""); //验证规则
                     tempHtml = tempHtml.replace("{selfId}", clnRec[SurveyRazor.dataStore.mapFields.Id]);
                     if (j < childNodeArrs.length - 1) { //设置下划线
                         tdHtml = tdHtml.replace("##line##", "div_matrix_bottomline");
                     }
                     tdHtml = tdHtml.replace("{content}", tempHtml);
                     clnHtml += tdHtml;
                 }
                 //行
                 childHtml = childHtml.replace("{items}", clnHtml);
                 gItemHtml += childHtml;
             }

             //body
           var body = SurveyRazor.htmlTemplate.matrix.body;
             body = body.replace("{head}", theadHtml);
             body = body.replace("{id}", "w_" + Id);
            body = body.replace("{items}", gItemHtml);
             tigan = tigan.replace("{content}", content + body)
             //finally html
            return tigan;
         },
         create: function (option) {
             if (option == undefined || option == "") {
                 this.options()
             }
           if (SurveyRazor.dataStore.globalData.length <= 0) {
                 throw new Error("请配置数据源");
                 return;
         }
             var divHtml = "<form id='aspnetForm'>"
                        + "<div class=\"rootDiv\" style=\"margin: 0px; padding: 0px; text-align: left;display:none; \">"
                        + "<div class='header'><label>{header}</label></div>"
                        + "<div class='surveyTitle' style=\"text-align: center; height: 30px; margin: 10px 0px;"
                        + "margin-bottom: 0px;\">"
                        + "<label style=\"font-weight: bolder;font-family: 微软雅黑, &#39;Microsoft YaHei&#39;; font-size: 16px;\">{surveyTitle}</label></div>"
                        + "<div class=\"descript\" "
                        + "style=\"margin-bottom: 1px; padding-top: 12px; padding-bottom: 12px;border-top: 1px solid gray; border-left: 1px solid gray;"
                        + "border-right: 1px solid gray;\"><label>{content}</label></div>"
                        + "<div class=\"survey\" style=\"margin: 0px auto; width: 700px\">"
                         + "<div id=\"contentPlaceHolder1\" class=\"surveycontent\">"
                        + "<div id=\"surveyContent\"></div>"
                         + "</div></div>"
                        + "<div style=\"width:100.3%; margin-top: 10px; margin-left: auto; margin-right: auto; margin-bottom: 1px;"
                         + "background-color: rgb(224,224,224  );\">"
                         + "<div style=\"margin-left: 38%; margin-right: 38%; padding-top: 5px; padding-bottom: 5px;\">"
                         + "<input type=\"button\" id=\"submit\" value=\"  提交\" "
                         + "style=\"cursor:pointer;width: 60px; height: 28px; background-image: url(./SurveyRazor/img/submit.gif);"
                         + "background-repeat: no-repeat; background-position: left center;\" />&nbsp;&nbsp;&nbsp;"
                         + "<input type=\"button\" id=\"cancel\" value=\"  取消\" "
                         + "style=\"cursor:pointer;width: 60px; height: 28px; background-image: url(./SurveyRazor/img/cancel.png);"
                         + "background-repeat: no-repeat; background-position: left center;\" /></div></div>"
                      + "</div></form>";
             divHtml = divHtml.replace("{header}", this.config.header || "");           //问卷眉头
            divHtml = divHtml.replace("{surveyTitle}", this.config.surveyTitle || ""); //问卷标题
            divHtml = divHtml.replace("{content}", this.config.description || "");     //描述
             $("body").addClass("bodyDiv").append(divHtml);  //追加隐藏
 
             //1设置问卷头部
             // -------------------------
             //题型渲染
             var htmlContainer = "";
             var records = SurveyRazor.dataStore.getTiGanArr();
             for (var i = 0; i < records.length; i++) {
                 var recObj = records[i];
                 switch (recObj[this.config.mapFields.TypeCode]) {
                     case SurveyRazor.typeSign.大类别:
                         var html = this.bigType.call(this, recObj, i + 1);
                         htmlContainer += html;
                         break;
                     case SurveyRazor.typeSign.单选:
                     case SurveyRazor.typeSign.多选:
                         var html = this.radioOrCheckbox.call(this, recObj, i + 1);
                         htmlContainer += html;
                         break;
                     case SurveyRazor.typeSign.下拉:
                         var html = this.combox.call(this, recObj, i + 1);
                         htmlContainer += html;
                         break;
                    case SurveyRazor.typeSign.填写:
                         var html = this.bigTextarea.call(this, recObj, i + 1);
                         htmlContainer += html;
                         break;
                     case SurveyRazor.typeSign.填空:
                         var html = this.smallTextarea.call(this, recObj, i + 1);
                         htmlContainer += html;
                         break;
                     case SurveyRazor.typeSign.排序:
                         var html = this.sortQuestion.call(this, recObj, i + 1);
                         htmlContainer += html;
                         break;
                     case SurveyRazor.typeSign.矩阵:
                        var html = this.matrix.call(this, recObj, i + 1);
                         htmlContainer += html;
                         break;
 
                 }
            }
             $("#surveyContent").append(htmlContainer);
 
             //2设置问卷尾部
             return this;
         },
         /*
         *设置背景图片
         */
         setBgImg: function () {
             if (this.config.haveBgImg) {
                 $("body").css({ "background-image": "url(" + this.config.bgImg + ")"
                 })
             }
             return this;
         },
         show: function () {
             $(".rootDiv").show();
             $("head").append("<script src='./SurveyRazor/jquery.validationEngine.min.js' type='text/javascript'>" + "<" + "/" + "script>");
             window.setTimeout(function () {
                 $("#aspnetForm").validationEngine({
                     onSuccess: function () {
                         alert(true);
                     },
                     onFailure: function () {
                         alert("验证未通过!");
                     },
                     scroll: true
                 });
 
            }, 100);
	this.setBgImg();
	return this;
}
}
}