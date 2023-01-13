({
    fetchPreviewFormField: function(component, event, helper) {
        try {
            var formId = atob(component.get("v.FormId"));
            component.set("v.DisableButton", true);
            var action = component.get("c.getPreviewFormField");
            action.setParams({ 'formId': formId });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var pageData = response.getReturnValue();
                    component.set("v.PreviewFormField1", response.getReturnValue().formName);
                    var pageSize = component.get("v.pageSize");
                    component.set("v.PreviewFormField", response.getReturnValue().PageWrapperList);
                    component.set("v.totalRecords", component.get("v.PreviewFormField").length - 1);
                    component.set("v.startPage", 0);
                    component.set("v.endPage", pageSize - 1);
                    var PaginationList = [];
                    for (var i = 0; i < pageSize; i++) {
                        if (component.get("v.PreviewFormField").length > i) {
                            PaginationList.push(response.getReturnValue().PageWrapperList[i]);
                        }
                    }
                    var totalPage = pageData.PageWrapperList.length;
                    component.set("v.totalPage", totalPage);
                    var FieldIdList = [];
                    for (let k = 0; k < pageData.PageWrapperList[0].FieldWrapperList.length; k++) {
                        var fieldobjId = pageData.PageWrapperList[0].FieldWrapperList[k].FieldObj.Id;
                        FieldIdList.push(fieldobjId);
                    }
                    component.set('v.FieldIdList', FieldIdList);
                    component.set('v.PaginationList', PaginationList);

                    //submit button enable if captcha is none
                    if (response.getReturnValue().formName.Captcha_Type__c == 'None' || response.getReturnValue().formName.Captcha_Type__c == undefined) {
                        component.set("v.CaptchaButton", false);
                        component.set("v.CaptchaEnable", false);
                    } else {
                        component.set("v.CaptchaEnable", true);
                    }

                    var pageList = response.getReturnValue().PageWrapperList;
                    var pageName = [];
                    pageList.forEach(function(item, index) {
                        pageName.push(item.PageObj.Title__c);
                        // for store all data in map
                        var fieldList = item.FieldWrapperList;
                        fieldList.forEach(function(item, index) {
                            var formFieldMap = component.get("v.formFieldMap");
                            var fieldDataList = [];
                            fieldDataList.push(item.FieldObj.Id, item.FieldAttObj.Label__c, '', item.FieldAttObj.Required_Field__c);
                            if (formFieldMap == null) {
                                var maplst = new Map();
                                maplst[fieldDataList[0]] = fieldDataList;
                                component.set("v.formFieldMap", maplst);
                            } else {
                                formFieldMap[fieldDataList[0]] = fieldDataList;
                                component.set("v.formFieldMap", formFieldMap);
                            }
                        });
                    });
                    component.set("v.pageNameList", pageName);

                    var temp_map = new Map();
                    pageList.forEach(function(item, index) {
                        var pn = item.PageObj.Title__c;
                        var pst = item.PageObj.Sub_Title__c;
                        if (item.PageObj.Title__c == null) {
                            pn = "Page Name";
                        } else if (item.PageObj.Sub_Title__c == null) {
                            pst = "Page Subtitle";
                        }

                        var temp_mappp = new Map();
                        var fieldList = item.FieldWrapperList;
                        fieldList.forEach(function(item, index) {
                            var key = item.FieldAttObj.Label__c;
                            var value = " ";
                            var obj = { key, value };
                            temp_mappp[item.FieldObj.Id] = obj;
                        });
                        var value = { pn, pst, temp_mappp }
                        temp_map[index] = value;
                        component.set("v.submition_map", temp_map);
                    });

                    // For Set Data in Field Component
                    var fieldListInPage = []
                    var formFieldMap = component.get("v.formFieldMap");
                    var fieldValueList = [];
                    response.getReturnValue().PageWrapperList[0].FieldWrapperList.forEach(function(item, index) {
                        fieldListInPage.push(item.FieldObj.Id);
                        var fieldLabel = formFieldMap[item.FieldObj.Id]
                        fieldValueList.push(fieldLabel[2]);
                    });
                    component.set("v.oldFieldValue", fieldValueList);
                    component.set("v.fieldListInPage", fieldListInPage);
                    helper.checkButton(component, event, helper);

                    // for progress bar
                    var displayType = response.getReturnValue().formName.Display_Type__c;
                    component.set("v.selectedStep", pageName[0]);
                    var progressBar = (100 / pageList.length);
                    // Progress Bar
                    if (displayType == 'Progress Bar') {
                        setTimeout(
                            $A.getCallback(function() {
                                component.set("v.progressBar", progressBar.toFixed());
                                var progressBarValue = document.querySelector('.meter > span');
                                progressBarValue.animate({
                                    width: progressBar + '%',
                                }, {
                                    duration: 1000
                                })
                                setTimeout(
                                    $A.getCallback(function() {
                                        progressBarValue.style.width = progressBar + '%';
                                        if (progressBar == 100) {
                                            progressBarValue.style.borderTopRightRadius = '25px';
                                            progressBarValue.style.borderBottomRightRadius = '25px';
                                        } else {
                                            progressBarValue.style.borderTopRightRadius = '0';
                                            progressBarValue.style.borderBottomRightRadius = '0';
                                        }
                                    }), 1000
                                );
                            }), 10
                        );
                    }

                    // Progress Custom Steps
                    if (displayType == 'Custom Steps') {
                        setTimeout(
                            $A.getCallback(function() {
                                var steps = document.querySelectorAll(".step");
                                steps.forEach((step, i) => {
                                    if (i < 1) {
                                        step.classList.add("active");
                                    }
                                });
                            }), 10
                        )
                    }

                    // create captcha if only one page in form 
                    var CaptchaEnable = component.get("v.CaptchaEnable");
                    if (CaptchaEnable) {
                        if (pageName.length == 1) {
                            setTimeout(
                                $A.getCallback(function() {
                                    helper.createCaptcha1(component, event, helper);
                                    helper.createCaptcha2(component, event, helper);
                                    helper.createCaptcha5(component, event, helper);
                                    helper.captcha4(component, event, helper);
                                }), 500
                            );
                        }
                    }

                    var progress_list = [];
                    for (var i = 0; i < pageName.length; i++) {
                        progress_list.push({ key: i, value: pageName[i] });
                    }
                    component.set("v.progress_list", progress_list);

                    var arr = response.getReturnValue().cssProperties;
                    var arr_parse = JSON.parse((arr));
                    var arr_map = new Map();
                    for (var i = 0; i < arr_parse.length; i++) {
                        for (var key in arr_parse[i]) {
                            arr_map[key] = arr_parse[i][key];
                        }
                    }

                    component.set("v.setCss", arr_map);
                    for (var key in arr_map) {

                        if (key == 'Form width') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--myformwidth', arr_map[key] + '%');
                        }
                        if (key == 'Background') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--bgcolor', arr_map[key]);
                        }
                        if (key == 'headerPadding') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--formPaddingTop', arr_map[key] + '%');
                        }
                        if (key == 'footerPadding') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--formPaddingBottom', arr_map[key] + '%');
                        }
                        if (key == 'Left Padding') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--formPaddingLeft', arr_map[key] + '%');
                        }
                        if (key == 'Right Padding') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--formPaddingRight', arr_map[key] + '%');
                        }
                        if (key == 'Form Direction') {

                        }
                        if (key == 'Form_BackgroundSize') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--formBackgroundSize', arr_map[key]);
                        }
                        if (key == 'Form_BackgroundPosition') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--formBackgroundPosition', arr_map[key]);
                        }
                        if (key == 'Form_BackgroundRepeat') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--formBackgroundRepeat', arr_map[key]);
                        }
                        if (key == 'Form_BackgroundFixPosition') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--formBackgroundfixPosition', arr_map[key]);
                        }
                        if (key == 'Label_Alignment') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--labelAlign', arr_map[key]);
                        }
                        if (key == 'Label_Font') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--labelfontfamily', arr_map[key]);
                        }
                        if (key == 'Label_FontWeight') {
                            var r = document.querySelector(':root');
                            // var weight = arr_map[key] + 'px';
                            r.style.setProperty('--labelfontweight', arr_map[key]);
                        }
                        if (key == 'Label_FontStyle') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--labelfontstyle', arr_map[key]);
                        }
                        if (key == 'Label_FontSize') {
                            var size = arr_map[key] + 'px';
                            r.style.setProperty('--labelfontsize', size);
                        }
                        if (key == 'Label_FontLineHeight') {
                            var r = document.querySelector(':root');
                            // var height = arr_map[key] + 'px';
                            r.style.setProperty('--labelineheight', arr_map[key]);
                        }
                        if (key == 'Label_Color') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--labelcolor', arr_map[key]);
                        }
                        if (key == 'Label_TopMargin') {
                            var r = document.querySelector(':root');
                            var margin = arr_map[key] + 'px';
                            r.style.setProperty('--labeltopmargin', margin);
                        }
                        if (key == 'Label_BottomMargin') {
                            var margin = arr_map[key] + 'px';
                            r.style.setProperty('--labelbottommargin', margin);
                        }
                        if (key == 'Input_BackgroundColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--bgcolorfield', arr_map[key]);
                        }
                        if (key == 'Input_BorderColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--bordercolorfield', arr_map[key]);
                        }
                        if (key == 'Input_BorderStyle') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--borderstylefield', arr_map[key]);
                        }
                        if (key == 'Input_BorderThickness') {
                            var r = document.querySelector(':root');
                            var thickness = arr_map[key] + 'px';
                            r.style.setProperty('--borderwidthfield', thickness);
                        }
                        if (key == 'Input_BorderRadius') {
                            var r = document.querySelector(':root');
                            var borderRadius = arr_map[key] + 'px'
                            r.style.setProperty('--borderradiusfield', borderRadius);
                        }
                        if (key == 'Input_Font') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--inputfontfamily', arr_map[key]);
                        }
                        if (key == 'Input_FontWeight') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--inputfontweight', arr_map[key]);
                        }
                        if (key == 'Input_FontStyle') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--inputfontstyle', arr_map[key]);
                        }
                        if (key == 'Input_FontSize') {
                            var r = document.querySelector(':root');
                            var fontsize = arr_map[key] + 'px';
                            r.style.setProperty('--inputfontsize', fontsize);
                        }
                        if (key == 'Input_FontLineHeight') {
                            var r = document.querySelector(':root');
                            var lineHeight = arr_map[key] + 'px';
                            r.style.setProperty('--inputlineheight', lineHeight);
                        }
                        if (key == 'Input_TextColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--bordertextcolor', arr_map[key]);
                        }
                        if (key == 'Input_HorizontalPadding') {
                            var r = document.querySelector(':root');
                            var padding = arr_map[key] + 'px';
                            r.style.setProperty('--borderhlpaddingfield', padding);
                            r.style.setProperty('--borderhrpaddingfield', padding);
                        }
                        if (key == 'Input_VerticalPadding') {
                            var r = document.querySelector(':root');
                            var padding = arr_map[key] + 'px';
                            r.style.setProperty('--bordervtpaddingfield', padding);
                            r.style.setProperty('--bordervbpaddingfield', padding);
                        }

                        //Field focus
                        if (key == 'FieldFocus_backgroundColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--fieldfocusbg', arr_map[key]);
                        }
                        if (key == 'FieldFocus_Border') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--fieldfocusborderColor', arr_map[key]);
                        }
                        if (key == 'FieldFocus_TextColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--fieldfocuscolor', arr_map[key]);
                        }
                        if (key == 'FieldFocus_LabelColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--focuslabelcolor', arr_map[key]);
                        }

                        //fieldHover
                        if (key == 'FieldHover_background') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--fieldhoverbg', arr_map[key]);
                        }
                        if (key == 'FieldHover_Border') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--fieldhoverborderColor', arr_map[key]);
                        }
                        if (key == 'FieldHover_TextColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--fieldhovercolor', arr_map[key]);
                        }
                        if (key == 'FieldHover_LabelColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--focuslabelcolor', arr_map[key]);
                        }

                        //Choices
                        if (key == 'Choices_radioWidth') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--radiowidth', arr_map[key] + 'px');
                        }
                        if (key == 'Choices_radioHeight') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--radioheight', arr_map[key] + 'px');
                        }
                        if (key == 'Choices_radioMarginTop') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--radiomarginright', arr_map[key] + 'px');
                        }
                        if (key == 'Choices_checkboxWidth') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--checkwidth', arr_map[key] + 'px');
                        }
                        if (key == 'Choices_checkboxHeight') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--checkheight', arr_map[key]);
                        }
                        if (key == 'Choices_checkboxTopMargin') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--checkmargintop', arr_map[key]);
                        }
                        if (key == 'Button_BorderColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btncolor', arr_map[key]);
                        }
                        if (key == 'Button_BorderStyle') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnborderstyle', arr_map[key]);
                        }
                        if (key == 'Button_BorderThickness') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnborderwidth', arr_map[key] + 'px');
                        }
                        if (key == 'Button_BorderRadius') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnborderradius', arr_map[key] + 'px');
                        }
                        if (key == 'Button_FontFamliy') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--buttonfontfamily', arr_map[key]);
                        }
                        if (key == 'Button_FontWeight') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--buttonfontweight', arr_map[key]);
                        }
                        if (key == 'Button_FontStyle') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--buttonfontstyle', arr_map[key]);
                        }
                        if (key == 'Button_FontSize') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--buttonfontsize', arr_map[key] + 'px');
                        }
                        if (key == 'Button_BackgroundColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnBgColor', arr_map[key]);
                        }
                        if (key == 'Button_Justify') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnJustify', arr_map[key]);
                        }

                        if (key == 'Button_TextColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnTextColor', arr_map[key]);
                        }
                        if (key == 'Button_Width') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnWidth', arr_map[key] + 'px');
                        }
                        if (key == 'Button_Height') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnHeight', arr_map[key] + 'px');
                        }
                        if (key == 'Button_Hpadding') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnLeftPadding', arr_map[key] + 'px');
                            r.style.setProperty('--btnRightPadding', arr_map[key] + 'px');

                        }
                        if (key == 'Button_Vpadding') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--btnTopPadding', arr_map[key] + 'px');
                            r.style.setProperty('--btnBottomPadding', arr_map[key] + 'px');

                        }
                    }

                    // page css 
                    var arrPageCss = response.getReturnValue().pageCss;
                    var arr_pageCssParse = JSON.parse((arrPageCss));
                    var arr_pageMap = new Map();
                    for (var i = 0; i < arr_pageCssParse.length; i++) {
                        for (var key in arr_pageCssParse[i]) {
                            arr_pageMap[key] = arr_pageCssParse[i][key];
                        }
                    }
                    component.set("v.setPageCss", arr_pageMap);
                    for (var key in arr_pageMap) {
                        if (key == 'Background Color') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--bg', arr_pageMap[key]);
                        }
                        if (key == 'Top Padding') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pagePaddingTop', arr_pageMap[key] + 'px');
                        }
                        if (key == 'Bottom Padding') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pagePaddingBottom', arr_pageMap[key] + 'px');
                        }
                        if (key == 'Background size') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pagebg', arr_pageMap[key]);
                        }
                        if (key == 'Background position') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pagebgPostion', arr_pageMap[key]);
                        }
                        if (key == 'Background repeat') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pagebgRepeat', arr_pageMap[key]);
                        }
                        if (key == 'Background fix position') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pagebgFixPosition', arr_pageMap[key]);
                        }
                        if (key == 'BorderColor') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pageborderColor', arr_pageMap[key]);
                        }
                        if (key == 'BorderStyle') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pageborderStyle', arr_pageMap[key]);
                        }
                        if (key == 'BorderThickness') {
                            var r = document.querySelector(':root');
                            r.style.setProperty('--pageborderWidth', arr_pageMap[key] + 'px');
                        }
                    }
                    //end of page css

                    // //fetchform background..
                    // console.log('Form images ids' + response.getReturnValue().formBgImage + ' >>>>.' + response.getReturnValue().DeletedFormImageId);
                    // if (response.getReturnValue().formBgImage != response.getReturnValue().DeletedFormImageId) {
                    //     var imgurl = 'url(/servlet/servlet.FileDownload?file=' + response.getReturnValue().formBgImage + ')';
                    //     console.log(imgurl + 'yrk');
                    //     var r = document.querySelector(':root');
                    //     r.style.setProperty('--formbgiamge', imgurl);
                    // }
                }
            })
            $A.enqueueAction(action);
        } catch (error) {
            console.log('fetchPreviewFormField', { error });
        }
    },

    // For Get Fields Data (Create by Krunal)
    handleEvent: function(component, event, helper) {
        try {
            var FieldData = event.getParam("formFieldData");
            var formFieldMap = component.get("v.formFieldMap");
            if (FieldData.length == 6) {
                for (let i = 0; i < 5; i++) {
                    var FieldDataLst = FieldData[i];
                    formFieldMap[FieldDataLst[0]] = FieldDataLst;
                    component.set("v.formFieldMap", formFieldMap);
                }
            } else {
                formFieldMap[FieldData[0]] = FieldData;
                component.set("v.formFieldMap", formFieldMap);
            }

            helper.checkButton(component, event, helper);

            // console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
            // for (var key in formFieldMap) {
            //     console.log("key: " + key + ", value: " + formFieldMap[key]);
            // }

        } catch (error) {
            console.log({ error });
        }
    },

    // For Enable and Disable Button (Create by Krunal)
    checkButton: function(component, event, helper) {
        try {
            component.set("v.DisableButton", true);
            var formFieldMap = component.get("v.formFieldMap");
            var fieldListInPage = component.get("v.fieldListInPage");
            for (var key in formFieldMap) {
                if (fieldListInPage.includes(key)) {
                    if (formFieldMap[key][3] == true) {
                        if (formFieldMap[key][2] == '') {
                            component.set("v.DisableButton", true);
                            break;
                        } else {
                            component.set("v.DisableButton", false);
                        }
                    } else {
                        component.set("v.DisableButton", false);
                    }
                }
            }
        } catch (error) {
            console.log('checkButton', { error });
        }
    },

    onNext: function(component, event, helper) {
        try {
            component.set("v.DisableButton", true);
            var PageNo = component.get("v.PageNo");
            component.set("v.PageNo", PageNo + 1);

            var sObjectList = component.get("v.PreviewFormField");
            var end = component.get("v.endPage");
            var start = component.get("v.startPage");
            var pageSize = component.get("v.pageSize");
            var Paginationlist = [];
            var counter = 0;
            for (var i = end + 1; i < end + pageSize + 1; i++) {
                if (sObjectList.length > i) {
                    Paginationlist.push(sObjectList[i]);
                }
                counter++;
            }
            start = start + counter;
            end = end + counter;
            component.set("v.startPage", start);
            component.set("v.endPage", end);
            component.set('v.PaginationList', Paginationlist);

            // For Set Data in Field Component
            var fieldListInPage = [];
            var PreviewFormField = component.get("v.PreviewFormField");
            var formFieldMap = component.get("v.formFieldMap");
            var fieldValueList = [];
            var fieldList = PreviewFormField[PageNo + 1].FieldWrapperList;
            PreviewFormField[PageNo + 1].FieldWrapperList.forEach(function(item, index) {
                var fieldLabel = formFieldMap[item.FieldObj.Id]
                fieldListInPage.push(item.FieldObj.Id);
                if (fieldLabel[1] == 'Salutation') {
                    var NameList = [fieldLabel[2], '', '']
                    for (let i = 0; i < fieldList.length; i++) {
                        if (fieldLabel[0] == formFieldMap[fieldList[i].FieldObj.Id][4]) {
                            if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'First Name') {
                                NameList[1] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            } else if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'Last Name') {
                                NameList[2] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            }
                        }
                    }
                    var fieldData = NameList.join(" ::: ");
                    fieldValueList.push(fieldData);
                } else if (fieldLabel[1] == 'Street') {
                    var addressList = [fieldLabel[2], '', '', '', '']
                    for (let i = 0; i < fieldList.length; i++) {
                        if (fieldLabel[0] == formFieldMap[fieldList[i].FieldObj.Id][4]) {
                            if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'City') {
                                addressList[1] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            } else if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'Region') {
                                addressList[2] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            } else if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'PostalCode') {
                                addressList[3] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            } else if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'Country') {
                                addressList[4] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            }
                        }
                    }
                    var fieldData = addressList.join(" ::: ");
                    fieldValueList.push(fieldData);
                } else {
                    fieldValueList.push(fieldLabel[2]);
                }
            });
            component.set("v.oldFieldValue", fieldValueList);
            component.set("v.fieldListInPage", fieldListInPage);
            helper.checkButton(component, event, helper);

            var displayType = component.get("v.PreviewFormField1.Display_Type__c");
            // Progress Indicator
            var pageList = component.get("v.pageNameList");
            var selectedNumber = component.get("v.selectedNumber");
            if (selectedNumber + 1 < pageList.length) {
                // Progress Step
                component.set("v.selectedNumber", selectedNumber + 1);
                component.set("v.selectedStep", pageList[selectedNumber + 1]);
                var progressBar = (100 * (selectedNumber + 2) / pageList.length);
                // Progress Bar
                if (displayType == 'Progress Bar') {;
                    var progressBarValue = document.querySelector('.meter > span');
                    progressBarValue.animate({
                        width: progressBar + '%'
                    }, {
                        duration: 1000
                    })
                    setTimeout(
                        $A.getCallback(function() {
                            component.set("v.progressBar", progressBar.toFixed());
                            progressBarValue.style.width = progressBar + '%';
                            if (progressBar == 100) {
                                progressBarValue.style.borderTopRightRadius = '25px';
                                progressBarValue.style.borderBottomRightRadius = '25px';
                            }
                        }), 1000
                    );
                }
            }
            // Progress Custom Steps
            if (displayType == 'Custom Steps') {
                const progressStepBar = document.getElementById("progress-bar");
                var steps = document.querySelectorAll(".step");
                var active = PageNo + 2;
                steps.forEach((step, i) => {
                    if (i < active) {
                        step.classList.add("active");
                    }
                });
                progressStepBar.style.width = ((active - 1) / (steps.length - 1)) * 100 + "%";
            }

            var progress_step = component.get("v.progress_step");
            component.set("v.progress_step", progress_step + 1);
            var captchaType = component.get("v.PreviewFormField1.Captcha_Type__c");
            if (captchaType != 'None') {
                // create captcha if this is last page
                var CaptchaEnable = component.get("v.CaptchaEnable");
                if (CaptchaEnable) {
                    if (pageList.length == end + 1) {
                        setTimeout(
                            $A.getCallback(function() {
                                helper.createCaptcha1(component, event, helper);
                                helper.createCaptcha2(component, event, helper);
                                helper.captcha4(component, event, helper);
                                helper.createCaptcha5(component, event, helper);
                            }), 500
                        );
                    }
                }
            }

        } catch (error) {
            console.log('onNext', { error });
        }
    },

    onPrevious: function(component, event, helper) {
        try {
            var PageNo = component.get("v.PageNo");
            component.set("v.PageNo", PageNo - 1);

            var sObjectList = component.get("v.PreviewFormField");
            var end = component.get("v.endPage");
            var start = component.get("v.startPage");
            var pageSize = component.get("v.pageSize");
            var Paginationlist = [];
            var counter = 0;
            for (var i = start - pageSize; i < start; i++) {
                if (i > -1) {
                    Paginationlist.push(sObjectList[i]);
                    counter++;
                } else {
                    start++;
                }
            }
            start = start - counter;
            end = end - counter;
            component.set("v.startPage", start);
            component.set("v.endPage", end);
            component.set('v.PaginationList', Paginationlist);

            // For Set Data in Field Component
            var fieldListInPage = [];
            var PreviewFormField = component.get("v.PreviewFormField");
            var formFieldMap = component.get("v.formFieldMap");
            var fieldValueList = [];
            var fieldList = PreviewFormField[PageNo - 1].FieldWrapperList;
            PreviewFormField[PageNo - 1].FieldWrapperList.forEach(function(item, index) {
                fieldListInPage.push(item.FieldObj.Id);
                var fieldLabel = formFieldMap[item.FieldObj.Id]
                if (fieldLabel[1] == 'Salutation') {
                    var NameList = [fieldLabel[2], '', '']
                    for (let i = 0; i < fieldList.length; i++) {
                        if (fieldLabel[0] == formFieldMap[fieldList[i].FieldObj.Id][4]) {
                            if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'First Name') {
                                NameList[1] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            } else if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'Last Name') {
                                NameList[2] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            }
                        }
                    }
                    var fieldData = NameList.join(" ::: ");
                    fieldValueList.push(fieldData);
                } else if (fieldLabel[1] == 'Street') {
                    var addressList = [fieldLabel[2], '', '', '', '']
                    for (let i = 0; i < fieldList.length; i++) {
                        if (fieldLabel[0] == formFieldMap[fieldList[i].FieldObj.Id][4]) {
                            if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'City') {
                                addressList[1] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            } else if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'Region') {
                                addressList[2] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            } else if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'PostalCode') {
                                addressList[3] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            } else if (formFieldMap[fieldList[i].FieldObj.Id][1] == 'Country') {
                                addressList[4] = formFieldMap[fieldList[i].FieldObj.Id][2]
                            }
                        }
                    }
                    var fieldData = addressList.join(" ::: ");
                    fieldValueList.push(fieldData);
                } else {
                    fieldValueList.push(fieldLabel[2]);
                }
            });
            component.set("v.oldFieldValue", fieldValueList);
            component.set("v.fieldListInPage", fieldListInPage);
            helper.checkButton(component, event, helper);

            var displayType = component.get("v.PreviewFormField1.Display_Type__c");
            // Progress Indicator
            var pageList = component.get("v.pageNameList");
            var selectedNumber = component.get("v.selectedNumber");

            if (selectedNumber > 0) {
                // Progress Step
                component.set("v.selectedNumber", selectedNumber - 1);
                component.set("v.selectedStep", pageList[selectedNumber - 1]);

                var progressBar = (100 * selectedNumber / pageList.length);
                // Progress Bar
                if (displayType == 'Progress Bar') {
                    var progressBarValue = document.querySelector('.meter > span');
                    progressBarValue.animate({
                        width: progressBar + '%'
                    }, {
                        duration: 1000
                    })
                    setTimeout(
                        $A.getCallback(function() {
                            component.set("v.progressBar", progressBar.toFixed());
                            progressBarValue.style.width = progressBar + '%';
                            progressBarValue.style.borderTopRightRadius = '0';
                            progressBarValue.style.borderBottomRightRadius = '0';
                        }), 1000
                    );
                }
            }
            var progress_step = component.get("v.progress_step");
            component.set("v.progress_step", progress_step - 1);

            // Progress Custom Steps
            if (displayType == 'Custom Steps') {
                const progressStepBar = document.getElementById("progress-bar");
                var steps = document.querySelectorAll(".step");
                var active = PageNo;
                steps.forEach((step, i) => {
                    if (i >= active) {
                        step.classList.remove("active");
                    }
                });
                progressStepBar.style.width = ((active - 1) / (steps.length - 1)) * 100 + "%";
            }

        } catch (error) {
            console.log('onPrevious', { error });
        }
    },

    onSubmit: function(component, event, helper) {
        try {
            component.set("v.DisableSubmit", true);

            var thankYouType = component.get('v.PreviewFormField1.ThankYou_Page__c');
            var formid = atob(component.get("v.FormId"));
            var formFieldMap = component.get("v.formFieldMap");
            var submition_map = component.get("v.submition_map");
            for (var pagekey in submition_map) {
                var test_map = submition_map[pagekey];
                for (var tempkey in test_map) {
                    if (tempkey == 'temp_mappp') {
                        var tesy_key = test_map[tempkey];
                        for (var idkey in tesy_key) {;
                            var key = formFieldMap[idkey][1];
                            var value = formFieldMap[idkey][2];
                            var obj = { key, value };
                            tesy_key[idkey] = obj;
                        }
                    }
                }
            }
            console.log('submition_map >>>>>>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(submition_map));
            console.log('formFieldMap >>>>>>>>>>>>>>>>>>>>>>' + JSON.stringify(formFieldMap));
            var submition_map = JSON.stringify(submition_map);
            var action = component.get("c.fieldSubmit");
            action.setParams({
                'formId': formid,
                'formFieldMap': formFieldMap,
                'allData': submition_map
            });
            action.setCallback(this, function(response) {
                console.log(response.getReturnValue());
                var obj_return_data = response.getReturnValue();
                helper.form_submission_method(component, event, helper, submition_map, obj_return_data);
                if (thankYouType == 'None' || thankYouType == undefined) {
                    component.set("v.DisableSubmit", true);
                    helper.showToast("Success", "Success", "Submit successfully", "5000");

                } else {
                    helper.fetchThankYouData(component, event, helper)
                }

            });
            $A.enqueueAction(action);

        } catch (error) {
            console.log('onSubmit', { error });
        }
    },

    form_submission_method: function(component, event, helper, submition_map, obj_return_data) {
        try {
            var submition_map = submition_map;
            var obj_return_data = obj_return_data;
            var formId = atob(component.get("v.FormId"));
            var action = component.get("c.form_submission");
            action.setParams({
                'formId': formId,
                'submissionData': submition_map,
                'obj_return_data': obj_return_data
            });
            action.setCallback(this, function(response) {
                var submissionid = response.getReturnValue();
                helper.sendEmailNotification(component, event, helper, submissionid);
            });
            $A.enqueueAction(action);

        } catch (error) {

        }
    },

    sendEmailNotification: function(component, event, helper, submissionid) {
        try {
            var formId = atob(component.get("v.FormId"));
            var action = component.get("c.sendNotificationEmail");

            var submissionid = submissionid;
            action.setParams({
                'formId': formId,
                'submittionid': submissionid
            });
            action.setCallback(this, function(response) {});
            $A.enqueueAction(action);
        } catch (error) {
            console.log('sendEmailNotification', { error });
        }
    },

    showToast: function(type, title, message, time) {
        try {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": title,
                "type": type,
                "message": message,
                "duration": time
            });
            toastEvent.fire();
        } catch (error) {
            console.log({ error });
        }
    },

    // thankyou page data
    fetchThankYouData: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var formData = component.get("v.PreviewFormField1");
            var formFieldMap = component.get("v.formFieldMap");
            var fieldDataList = [];
            for (const [key, value] of Object.entries(formFieldMap)) {
                var dataLst = [];
                dataLst.push(`${value[1]}`, `${value[2]}`)
                fieldDataList.push(dataLst);
            }
            component.set("v.FormFieldData", fieldDataList);
            if (formData.ThankYou_Page__c == 'ThankYou_URL') {
                window.open(formData.ThankYou_URL__c, '_self');
            }
            setTimeout(
                $A.getCallback(function() {
                    if (formData.ThankYou_Page__c == 'Redirect_Text_And_URL') {
                        window.open(formData.Redirect_URL__c, '_blank');
                    }
                }), 3000
            );
            setTimeout(
                $A.getCallback(function() {
                    component.set("v.PreviewPage", false);
                    component.set("v.ThankYouPage", true);
                    component.set("v.spinner", false);
                }), 1000
            );
        } catch (error) {
            console.log({ error });
        }
    },


    // handleCss: function(component, event, helper) {

    //     var css_map = component.get("v.setCss");
    //     for (var key in css_map) {
    //         console.log(key);
    //         if (key == 'form width') {
    //             var r = document.querySelector(':root');
    //             r.style.setProperty('--myformwidth', css_map[key] + '%');
    //         }
    //     }
    // }


    // -------------- captcha Field Start --------------

    // captcha 1 for create captcha
    createCaptcha1: function(component, event, helper) {
        try {
            component.set("v.CaptchaButton", true);
            var inputValue = document.getElementById("cpatchaTextBox");
            inputValue.value = '';
            component.set("v.RightCaptcha", false);
            var alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
            var captcha = [];
            let first = alphabets[Math.floor(Math.random() * alphabets.length)];
            let second = Math.floor(Math.random() * 10);
            let third = Math.floor(Math.random() * 10);
            let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
            let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
            let sixth = Math.floor(Math.random() * 10);
            captcha = first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString() + sixth.toString();
            document.getElementById("generated-captcha").value = captcha;
            component.set("v.CaptchaCode", captcha);
        } catch (error) {
            console.log({ error });
        }
    },

    // captcha 2
    createCaptcha2: function(component, event, helper) {
        try {
            component.set("v.CaptchaButton", true);
            var inputValue = document.getElementById("submit__input");
            inputValue.value = '';

            component.set("v.RightCaptcha", false);
            var a, b, c;
            var maths1 = document.getElementById('maths1');
            var maths2 = document.getElementById('maths2');

            a = Math.ceil(Math.random() * 10);
            b = Math.ceil(Math.random() * 10);
            c = a + b;

            maths1.innerHTML = a;
            maths2.innerHTML = b;

            component.set("v.CaptchaCode", c);
        } catch (error) {
            console.log({ error });
        }
    },

    // captcha 3
    openCaptchaModel: function(component, event, helper) {
        try {
            var modal = document.getElementById("captcha_modal");
            var btnShow = document.getElementById("show_captcha_button");
            var btnVerify = document.getElementById("verifyButton");
            var btnRefresh = document.getElementById("refreshButton");
            var span = document.getElementsByClassName("close_captcha")[0];

            btnShow.onclick = function() {
                modal.style.display = "block";
                component.set("v.WrongCaptcha", false);
                helper.createCaptcha3(component, event, helper);
            };

            btnRefresh.onclick = function() {
                component.set("v.WrongCaptcha", false);
                helper.createCaptcha3(component, event, helper);
            };

            btnVerify.onclick = function() {
                helper.checkCaptcha3(component, event, helper);
            };

            span.onclick = function() {
                modal.style.display = "none";
            };

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        } catch (error) {
            console.log({ error });
        }
    },

    createCaptcha3: function(component, event, helper) {
        try {
            component.set("v.CaptchaButton", true);
            component.set("v.RightCaptcha", false);
            var inputValue = document.getElementById("txtInput");
            inputValue.value = '';

            var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
            for (var i = 0; i < 6; i++) {
                var a = alpha[Math.floor(Math.random() * alpha.length)];
                var b = alpha[Math.floor(Math.random() * alpha.length)];
                var c = alpha[Math.floor(Math.random() * alpha.length)];
                var d = alpha[Math.floor(Math.random() * alpha.length)];
                var e = alpha[Math.floor(Math.random() * alpha.length)];
                var f = alpha[Math.floor(Math.random() * alpha.length)];
                var g = alpha[Math.floor(Math.random() * alpha.length)];
            }
            var captcha_text = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
            component.set("v.CaptchaCode", captcha_text);
            var tCtx = document.getElementById('textCanvas').getContext('2d');
            var font = '270 27px "Cutive Mono"';
            var imageElem = document.getElementById('image');

            document.fonts.load(font)
                .then(function() {
                    tCtx.font = font;
                    tCtx.canvas.width = tCtx.measureText(captcha_text).width;
                    tCtx.canvas.height = 40;
                    tCtx.font = font;
                    tCtx.fillStyle = '#444';
                    tCtx.fillText(captcha_text, 0, 20);

                    var c = document.getElementById("textCanvas");
                    var ctx = c.getContext("2d");
                    // Draw lines
                    for (var i = 0; i < 7; i++) {
                        ctx.beginPath();
                        ctx.moveTo(c.width * Math.random(), c.height * Math.random());
                        ctx.lineTo(c.width * Math.random(), c.height * Math.random());
                        ctx.strokeStyle = "rgb(" +
                            Math.round(256 * Math.random()) + "," +
                            Math.round(256 * Math.random()) + "," +
                            Math.round(256 * Math.random()) + ")";
                        ctx.stroke();
                    }

                    imageElem.src = tCtx.canvas.toDataURL();
                });
        } catch (error) {
            console.log({ error });
        }
    },

    checkCaptcha3: function(component, event, helper) {
        try {
            var modal = document.getElementById("captcha_modal");
            var string1 = component.get("v.CaptchaCode").split(' ').join('');;
            var string2 = document.getElementById('txtInput').value;
            if (string1 === string2) {
                component.set("v.CaptchaButton", false);
                component.set("v.WrongCaptcha", false);
                component.set("v.RightCaptcha", true);
                modal.style.display = "none";
            } else {
                component.set("v.WrongCaptcha", true);
                helper.createCaptcha3(component, event, helper);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // captcha 4
    captcha4: function(component, event, helper) {
        try {
            var dragItem = document.querySelector(".slide-block");
            var container = document.querySelector(".slide-captcha");
            var slideText = document.querySelector(".slide-text");

            var active = false;
            var currentX;
            var currentY;
            var initialX;
            var initialY;
            var xOffset = 0;
            var yOffset = 0;

            container.addEventListener("touchstart", dragStart, false);
            container.addEventListener("touchend", dragEnd, false);
            container.addEventListener("touchmove", drag, false);

            container.addEventListener("mousedown", dragStart, false);
            container.addEventListener("mouseup", dragEnd, false);
            container.addEventListener("mousemove", drag, false);

            function dragStart(e) {
                if (e.type === "touchstart") {
                    initialX = e.touches[0].clientX - xOffset;
                    initialY = e.touches[0].clientY - yOffset;
                } else {
                    initialX = e.clientX - xOffset;
                    initialY = e.clientY - yOffset;
                }

                if (e.target === dragItem) {
                    active = true;
                }
            }

            function dragEnd(e) {
                if (currentX == 200) {
                    initialX = currentX;
                    setTranslate(initialX, initialY, dragItem);
                    helper.captcha4Complete(component, event, helper);
                } else {
                    initialX = currentX;
                }
                initialY = currentY;
                setTranslate(initialX, initialY, dragItem);
                active = false;
            }

            function drag(e) {
                if (active) {
                    e.preventDefault();
                    if (e.type === "touchmove") {
                        if (e.touches[0].clientX - initialX <= 0) {
                            currentX = 0;
                        } else if (e.touches[0].clientX - initialX >= 200) {
                            currentX = 200;
                        } else {
                            currentX = e.touches[0].clientX - initialX;
                        }
                        currentY = 0;
                    } else {
                        if (e.clientX - initialX <= 0) {
                            currentX = 0;
                        } else if (e.clientX - initialX >= 200) {
                            currentX = 200;
                        } else {
                            currentX = e.clientX - initialX;
                        }
                        currentY = 0;
                    }
                    xOffset = currentX;
                    yOffset = currentY;
                    setTranslate(currentX, currentY, dragItem);
                }
            }

            function setTranslate(xPos, yPos, el) {
                el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
                var slidePercentage = xPos / 2;
                slideText.style.opacity = 1 - slidePercentage / 100;
            }
        } catch (error) {
            console.log({ error });
        }
    },

    captcha4Complete: function(component, event, helper) {
        try {
            var container = document.querySelector(".slide-captcha");
            var dragItem = document.querySelector(".slide-block");
            dragItem.style.backgroundColor = '#3498db';
            container.animate({
                width: '100px'
            }, {
                duration: 1000
            });
            dragItem.animate({
                transform: "translate3d(0, 0, 0)",
                backgroundColor: '#2ecc71'
            }, {
                duration: 1000
            });
            setTimeout(
                $A.getCallback(function() {
                    container.style.width = '100px';
                    dragItem.style.transform = "translate3d(0, 0, 0)";
                    dragItem.style.backgroundColor = '#2ecc71';
                    component.set("v.RightCaptcha", true);
                    component.set("v.CaptchaButton", false);
                }), 1000
            );
        } catch (error) {
            console.log({ error });
        }
    },

    // captcha 5
    createCaptcha5: function(component, event, helper) {
        try {
            !(function() {
                "use strict";
                var t = function() {
                        var t = arguments.length,
                            e = arguments[0] || {};
                        "object" != typeof e && "function" != typeof e && (e = {}),
                            1 == t && ((e = this), i--);
                        for (var i = 1; i < t; i++) {
                            var n = arguments[i];
                            for (var o in n)
                                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                        }
                        return e;
                    },
                    e = function(t) {
                        return "function" == typeof t && "number" != typeof t.nodeType;
                    },
                    i = function(e, n) {
                        (this.$element = e),
                        (this.options = t({}, i.DEFAULTS, n)),
                        (this.$element.style.position = "relative"),
                        (this.$element.style.width = this.options.width + "px"),
                        (this.$element.style.margin = "0 auto"),
                        this.init();
                    };
                (i.DEFAULTS = {
                    width: 280,
                    height: 155,
                    PI: Math.PI,
                    sliderL: 42,
                    sliderR: 9,
                    offset: 5,
                    loadingText: "Loading...",
                    failedText: "Try Again",
                    barText: "Slide To Verify",
                    repeatIcon: "fa fa-repeat",
                    maxLoadCount: 3,
                    localImages: function() {
                        return "images/Pic" + Math.round(4 * Math.random()) + ".jpg";
                    },
                    verify: function(t, e) {
                        var i = !1;
                        return (
                            $.ajax({
                                url: e,
                                data: { datas: JSON.stringify(t) },
                                dataType: "json",
                                type: "post",
                                async: !1,
                                success: function(t) {
                                    (i = JSON.stringify(t));
                                }
                            }),
                            i
                        );
                    },
                    remoteUrl: null
                }),
                (window.sliderCaptcha = function(t) {
                    var e = document.getElementById(t.id);
                    return new i(e, "object" == typeof t && t);
                }),
                (window.sliderCaptcha.Constructor = i);
                var n = i.prototype;
                (n.init = function() {
                    this.initDOM(), this.initImg(), this.bindEvents();
                }),
                (n.initDOM = function() {
                    var i = function(t, e) {
                            var i = document.createElement(t);
                            return (i.className = e), i;
                        },
                        n = (function(t, e) {
                            var i = document.createElement("canvas");
                            return (i.width = t), (i.height = e), i;
                        })(this.options.width - 2, this.options.height),
                        o = n.cloneNode(!0),
                        s = i("div", "sliderContainer"),
                        r = i("i", "refreshIcon " + this.options.repeatIcon),
                        a = i("div", "sliderMask"),
                        l = i("div", "sliderbg"),
                        d = i("div", "slider"),
                        c = i("i", "fa fa-arrow-right sliderIcon"),
                        h = i("span", "sliderText");
                    (o.className = "block"), (h.innerHTML = this.options.barText);
                    var p = this.$element;
                    p.appendChild(n),
                        p.appendChild(r),
                        p.appendChild(o),
                        d.appendChild(c),
                        a.appendChild(d),
                        s.appendChild(l),
                        s.appendChild(a),
                        s.appendChild(h),
                        p.appendChild(s);
                    var u = {
                        canvas: n,
                        block: o,
                        sliderContainer: s,
                        refreshIcon: r,
                        slider: d,
                        sliderMask: a,
                        sliderIcon: c,
                        text: h,
                        canvasCtx: n.getContext("2d"),
                        blockCtx: o.getContext("2d")
                    };
                    e(Object.assign) ? Object.assign(this, u) : t(this, u);
                }),
                (n.initImg = function() {
                    var t = this,
                        i = window.navigator.userAgent.indexOf("Trident") > -1,
                        n = this.options.sliderL + 2 * this.options.sliderR + 3,
                        o = function(e, n) {
                            var o = t.options.sliderL,
                                s = t.options.sliderR,
                                r = t.options.PI,
                                a = t.x,
                                l = t.y;
                            e.beginPath(),
                                e.moveTo(a, l),
                                e.arc(a + o / 2, l - s + 2, s, 0.72 * r, 2.26 * r),
                                e.lineTo(a + o, l),
                                e.arc(a + o + s - 2, l + o / 2, s, 1.21 * r, 2.78 * r),
                                e.lineTo(a + o, l + o),
                                e.lineTo(a, l + o),
                                e.arc(a + s - 2, l + o / 2, s + 0.4, 2.76 * r, 1.24 * r, !0),
                                e.lineTo(a, l),
                                (e.lineWidth = 2),
                                (e.fillStyle = "rgba(255, 255, 255, 0.7)"),
                                (e.strokeStyle = "rgba(255, 255, 255, 0.7)"),
                                e.stroke(),
                                e[n](),
                                (e.globalCompositeOperation = i ? "xor" : "destination-over");
                        },
                        s = function(t, e) {
                            return Math.round(Math.random() * (e - t) + t);
                        },
                        r = new Image();
                    r.crossOrigin = "Anonymous";
                    var a = 0;
                    (r.onload = function() {
                        (t.x = s(n + 10, t.options.width - (n + 10))),
                        (t.y = s(10 + 2 * t.options.sliderR, t.options.height - (n + 10))),
                        o(t.canvasCtx, "fill"),
                            o(t.blockCtx, "clip"),
                            t.canvasCtx.drawImage(r, 0, 0, t.options.width - 2, t.options.height),
                            t.blockCtx.drawImage(r, 0, 0, t.options.width - 2, t.options.height);
                        var e = t.y - 2 * t.options.sliderR - 1,
                            i = t.blockCtx.getImageData(t.x - 3, e, n, n);
                        (t.block.width = n),
                        t.blockCtx.putImageData(i, 0, e + 1),
                            (t.text.textContent = t.text.getAttribute("data-text"));
                    }),
                    (r.onerror = function() {
                        if (
                            (a++,
                                "file:" === window.location.protocol &&
                                ((a = t.options.maxLoadCount),
                                    console.error(
                                        "can't load pic resource file from File protocal. Please try http or https"
                                    )),
                                a >= t.options.maxLoadCount)
                        )
                            return (
                                (t.text.textContent = "Failed to load"),
                                void t.classList.add("text-danger")
                            );
                        r.src = t.options.localImages();
                    }),
                    (r.setSrc = function() {
                        var n = "";
                        if (
                            ((a = 0),
                                t.text.classList.remove("text-danger"),
                                e(t.options.setSrc) && (n = t.options.setSrc()),
                                (n && "" !== n) ||
                                (n =
                                    "https://picsum.photos/" +
                                    t.options.width +
                                    "/" +
                                    t.options.height +
                                    "/?image=" +
                                    Math.round(20 * Math.random())),
                                i)
                        ) {
                            var o = new XMLHttpRequest();
                            (o.onloadend = function(t) {
                                var e = new FileReader();
                                e.readAsDataURL(t.target.response),
                                    (e.onloadend = function(t) {
                                        r.src = t.target.result;
                                    });
                            }),
                            o.open("GET", n),
                                (o.responseType = "blob"),
                                o.send();
                        } else r.src = n;
                    }),
                    r.setSrc(),
                        this.text.setAttribute("data-text", this.options.barText),
                        (this.text.textContent = this.options.loadingText),
                        (this.img = r);
                }),
                (n.clean = function() {
                    this.canvasCtx.clearRect(0, 0, this.options.width, this.options.height),
                        this.blockCtx.clearRect(0, 0, this.options.width, this.options.height),
                        (this.block.width = this.options.width);
                }),
                (n.bindEvents = function() {
                    var t = this;
                    this.$element.addEventListener("selectstart", function() {
                            return !1;
                        }),
                        this.refreshIcon.addEventListener("click", function() {
                            component.set("v.RightCaptcha", false);
                            component.set("v.CaptchaButton", true);
                            (t.text.textContent = t.options.barText),
                            t.reset(),
                                e(t.options.onRefresh) && t.options.onRefresh.call(t.$element);
                        });
                    var i,
                        n,
                        o = [],
                        s = !1,
                        r = function(e) {
                            t.text.classList.contains("text-danger") ||
                                ((i = e.clientX || e.touches[0].clientX),
                                    (n = e.clientY || e.touches[0].clientY),
                                    (s = !0));
                        },
                        a = function(e) {
                            if (!s) return !1;
                            var r = e.clientX || e.touches[0].clientX,
                                a = e.clientY || e.touches[0].clientY,
                                l = r - i,
                                d = a - n;
                            if (l < 0 || l + 40 > t.options.width) return !1;
                            t.slider.style.left = l - 1 + "px";
                            var c = ((t.options.width - 40 - 20) / (t.options.width - 40)) * l;
                            (t.block.style.left = c + "px"),
                            t.sliderContainer.classList.add("sliderContainer_active"),
                                (t.sliderMask.style.width = l + 4 + "px"),
                                o.push(Math.round(d));
                        },
                        l = function(n) {
                            if (!s) return !1;
                            if (((s = !1), (n.clientX || n.changedTouches[0].clientX) === i))
                                return !1;
                            t.sliderContainer.classList.remove("sliderContainer_active"),
                                (t.trail = o);
                            var r = t.verify();
                            r.spliced && r.verified ?
                                (t.sliderContainer.classList.add("sliderContainer_success"),
                                    e(t.options.onSuccess) && t.options.onSuccess.call(t.$element)) :
                                (t.sliderContainer.classList.add("sliderContainer_fail"),
                                    e(t.options.onFail) && t.options.onFail.call(t.$element),
                                    setTimeout(function() {
                                        (t.text.innerHTML = t.options.failedText), t.reset();
                                    }, 1e3));
                        };
                    this.slider.addEventListener("mousedown", r),
                        this.slider.addEventListener("touchstart", r),
                        document.addEventListener("mousemove", a),
                        document.addEventListener("touchmove", a),
                        document.addEventListener("mouseup", l),
                        document.addEventListener("touchend", l),
                        document.addEventListener("mousedown", function() {
                            return !1;
                        }),
                        document.addEventListener("touchstart", function() {
                            return !1;
                        }),
                        document.addEventListener("swipe", function() {
                            return !1;
                        });
                }),
                (n.verify = function() {
                    var t = this.trail,
                        e = parseInt(this.block.style.left),
                        i = !1;
                    if (null !== this.options.remoteUrl)
                        i = this.options.verify(t, this.options.remoteUrl);
                    else {
                        var n = function(t, e) {
                                return t + e;
                            },
                            o = t.reduce(n) / t.length,
                            s = t.map(function(t) {
                                return t - o;
                            });
                        i =
                            0 !==
                            Math.sqrt(
                                s
                                .map(function(t) {
                                    return t * t;
                                })
                                .reduce(n) / t.length
                            );
                    }
                    return {
                        spliced: Math.abs(e - this.x) < this.options.offset,
                        verified: i
                    };
                }),
                (n.reset = function() {
                    component.set("v.RightCaptcha", false);
                    component.set("v.CaptchaButton", true);
                    this.sliderContainer.classList.remove("sliderContainer_fail"),
                        this.sliderContainer.classList.remove("sliderContainer_success"),
                        (this.slider.style.left = 0),
                        (this.block.style.left = 0),
                        (this.sliderMask.style.width = 0),
                        this.clean(),
                        this.text.setAttribute("data-text", this.text.textContent),
                        (this.text.textContent = this.options.loadingText),
                        this.img.setSrc();
                });
            })();

            var captcha = sliderCaptcha({
                id: 'captcha',
                loadingText: 'Loading...',
                failedText: 'Try again',
                barText: 'Slide right to fill',
                repeatIcon: 'fa fa-redo',
                onSuccess: function() {
                    setTimeout(function() {
                        component.set("v.RightCaptcha", true);
                        component.set("v.CaptchaButton", false);
                    }, 500);
                },
                setSrc: function() {
                    var checkCaptcha = component.get("v.CaptchaButton");
                    if (checkCaptcha == true) {
                        var img = "https://picsum.photos/200/155/?image=" + Math.round(20 * Math.random());
                        console.log(img);
                        return img;
                    }

                },
            });
        } catch (error) {
            console.log({ error });
        }
    },

    // -------------- captcha Field End --------------

})