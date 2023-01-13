({
    // ===============init method===========================
    fetchQuickFormFieldAttValue: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var getBgImgId = component.get('v.storeFormbgId');
            var storebgId = component.get('v.storebgId');
            if (getBgImgId == undefined) {
                component.set('v.storeFormbgId', '');
            }
            if (storebgId == undefined) {
                component.set('v.storebgId', '');
            }
            var formId = component.get("v.FormId");
            component.set("v.FormIdencod", btoa(formId));
            var action = component.get("c.fetchQuickFormField");
            action.setParams({ 'formId': formId });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue())
                    component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                    component.set("v.baseField", response.getReturnValue().basefield);
                    var inList = document.querySelectorAll('.example-dropzone input');
                    for (var s of inList) {
                        s.disable = true;
                    }
                    component.set("v.spinner", false);
                } else {
                    component.set("v.spinner", false);
                    component.find("toastCmp").showToastModel("Something went wrong to fetch data", "error");

                }
            });
            $A.enqueueAction(action);
            var action1 = component.get('c.fetchCss');
            action1.setParams({ 'formId': formId });
            action1.setCallback(this, function(response) {
                var arr = JSON.parse(response.getReturnValue());
                for (var i = 0; i < arr.length; i++) {
                    var a = arr[0];
                    for (var key in a) {
                        if (a[key] <= 100) {
                            component.set('v.formWidth', a[key]);
                        }
                    }
                    var b = arr[1];
                    for (var key in b) {
                        component.set('v.headpadding', b[key]);
                    }
                    var c = arr[2];
                    for (var key in c) {
                        component.set('v.footpadding', c[key]);
                    }
                    var d = arr[3];
                    for (var key in d) {
                        component.set('v.leftpadding', d[key]);
                    }
                    var e = arr[4];
                    for (var key in e) {
                        component.set('v.rightpadding', e[key]);
                    }
                    var f = arr[5];
                    for (var key in f) {
                        component.set('v.formdir', f[key]);
                    }
                    var g = arr[6];
                    for (var key in g) {
                        component.set('v.colorpicker', g[key]);
                        var r = document.querySelector(':root');
                        r.style.setProperty('--bgcolor', g[key]);
                    }
                    var formbackSize = arr[7];
                    for (var key in formbackSize) {
                        component.set('v.formbackSize', formbackSize[key]);
                    }
                    var formbackpagePostion = arr[8];
                    for (var key in formbackpagePostion) {
                        component.set('v.formbackpagePostion', formbackpagePostion[key]);
                    }
                    var formbackpageRepeat = arr[9];
                    for (var key in formbackpageRepeat) {
                        component.set('v.formbackpageRepeat', formbackpageRepeat[key]);
                    }
                    var formbackgroundPagefixposition = arr[10];
                    for (var key in formbackgroundPagefixposition) {
                        component.set('v.formbackgroundPagefixposition', formbackgroundPagefixposition[key]);
                    }
                    var btnBorderColor = arr[11];
                    for (var key in btnBorderColor) {
                        component.set('v.btncolor', btnBorderColor[key]);
                    }
                    var btnBorderStyle = arr[12];
                    for (var key in btnBorderStyle) {
                        component.set('v.btnborderstyle', btnBorderStyle[key]);
                    }
                    var btnBorderThickness = arr[13];
                    for (var key in btnBorderThickness) {
                        component.set('v.btnborderwidth', btnBorderThickness[key]);
                    }
                    var btnBorderRadius = arr[14];
                    for (var key in btnBorderRadius) {
                        component.set('v.btnborderradius', btnBorderRadius[key]);
                    }
                    var buttonfontfamily = arr[15];
                    for (var key in buttonfontfamily) {
                        component.set('v.buttonfontfamily', buttonfontfamily[key]);
                    }
                    var buttonfontweight = arr[16];
                    for (var key in buttonfontweight) {
                        component.set('v.buttonfontweight', buttonfontweight[key]);
                    }
                    var buttonfontstyle = arr[17];
                    for (var key in buttonfontstyle) {
                        component.set('v.buttonfontstyle', buttonfontstyle[key]);
                    }
                    var buttonfontsize = arr[18];
                    for (var key in buttonfontsize) {
                        component.set('v.buttonfontsize', buttonfontsize[key]);
                    }
                    var btnBgColor = arr[19];
                    for (var key in btnBgColor) {
                        component.set('v.btnBgColor', btnBgColor[key]);
                    }
                    var btnJustify = arr[20];
                    for (var key in btnJustify) {
                        component.set('v.btnJustify', btnJustify[key]);
                    }
                    var j = arr[21];
                    for (var key in j) {
                        component.set('v.bgInput', j[key]);
                    }
                    var k = arr[22];
                    for (var key in k) {
                        component.set('v.borderInput', k[key]);
                    }
                    var l = arr[23];
                    for (var key in l) {
                        component.set('v.borderStyle', l[key]);
                    }
                    var m = arr[24];
                    for (var key in m) {
                        component.set('v.borderWidth', m[key]);
                    }
                    var n = arr[25];
                    for (var key in n) {
                        component.set('v.borderRadius', n[key]);
                    }
                    var o = arr[26];
                    for (var key in o) {
                        component.set('v.inputfontfamily', o[key]);
                    }
                    var p = arr[27];
                    for (var key in p) {
                        component.set('v.inputfontweight', p[key]);
                    }
                    var q = arr[28];
                    for (var key in q) {
                        component.set('v.inputfontstyle', q[key]);
                    }
                    var r = arr[29];
                    for (var key in r) {
                        component.set('v.inputfontsize', r[key]);
                    }
                    var s = arr[30];
                    for (var key in s) {
                        component.set('v.inputlineheight', s[key]);
                    }
                    var t = arr[31];
                    for (var key in t) {
                        component.set('v.bordertextcolor', t[key]);
                    }
                    var u = arr[32];
                    for (var key in u) {
                        component.set('v.inputHpadding', u[key]);
                    }
                    var v = arr[33];
                    for (var key in v) {
                        component.set('v.inputVpadding', v[key]);
                    }
                    var w = arr[34];
                    for (var key in w) {
                        component.set('v.labelalign', w[key]);
                    }
                    var x = arr[35];
                    for (var key in x) {
                        component.set('v.labelfontfamily', x[key]);
                    }
                    var y = arr[36];
                    for (var key in y) {
                        component.set('v.labelfontweight', y[key]);
                    }
                    var z = arr[37];
                    for (var key in z) {
                        component.set('v.labelfontstyle', z[key]);
                    }
                    var labelfontsize = arr[38];
                    for (var key in labelfontsize) {
                        component.set('v.labelfontsize ', labelfontsize[key]);
                    }
                    var labelineheight = arr[39];
                    for (var key in labelineheight) {
                        component.set('v.labelineheight', labelineheight[key]);
                    }
                    var labelcolor = arr[40];
                    for (var key in labelcolor) {
                        component.set('v.labelcolor', labelcolor[key]);
                    }
                    var labeltopmargin = arr[41];
                    for (var key in labeltopmargin) {
                        component.set('v.labeltopmargin', labeltopmargin[key]);
                    }
                    var labelbottommargin = arr[42];
                    for (var key in labelbottommargin) {
                        component.set('v.labelbottommargin', labelbottommargin[key]);
                    }
                    var fieldhoverbg = arr[43];
                    for (var key in fieldhoverbg) {
                        component.set('v.fieldhoverbg', fieldhoverbg[key]);
                    }
                    var fieldhoverborderColor = arr[44];
                    for (var key in fieldhoverborderColor) {
                        component.set('v.fieldhoverborderColor', fieldhoverborderColor[key]);
                    }
                    var fieldhovercolor = arr[45];
                    for (var key in fieldhovercolor) {
                        component.set('v.fieldhovercolor', fieldhovercolor[key]);
                    }
                    var hoverlabelcolor = arr[46];
                    for (var key in hoverlabelcolor) {
                        component.set('v.hoverlabelcolor', hoverlabelcolor[key]);
                    }
                    var fieldfocusbg = arr[47];
                    for (var key in fieldfocusbg) {
                        component.set('v.fieldfocusbg', fieldfocusbg[key]);
                    }
                    var fieldfocusborderColor = arr[48];
                    for (var key in fieldfocusborderColor) {
                        component.set('v.fieldfocusborderColor', fieldfocusborderColor[key]);
                    }
                    var fieldfocuscolor = arr[49];
                    for (var key in fieldfocuscolor) {
                        component.set('v.fieldfocuscolor', fieldfocuscolor[key]);
                    }

                    var radiowidth = arr[50];
                    for (var key in radiowidth) {
                        component.set('v.radiowidth', radiowidth[key]);
                    }
                    var radioheight = arr[51];
                    for (var key in radioheight) {
                        component.set('v.radioheight', radioheight[key]);
                    }
                    var radiomarginright = arr[52];
                    for (var key in radiomarginright) {
                        component.set('v.radiomarginright', radiomarginright[key]);
                    }
                    var checkwidth = arr[53];
                    for (var key in checkwidth) {
                        component.set('v.checkwidth', checkwidth[key]);
                    }
                    var checkheight = arr[54];
                    for (var key in checkheight) {
                        component.set('v.checkheight', checkheight[key]);
                    }
                    var checkmargintop = arr[55];
                    for (var key in checkmargintop) {
                        component.set('v.checkmargintop', checkmargintop[key]);
                    }
                    var btnTextColor = arr[56];
                    for (var key in btnTextColor) {
                        component.set('v.btnTextColor', btnTextColor[key]);
                    }
                    var btnWidth = arr[57];
                    for (var key in btnWidth) {
                        component.set('v.btnWidth', btnWidth[key]);
                    }
                    var btnHeight = arr[58];
                    for (var key in btnHeight) {
                        component.set('v.btnHeight', btnHeight[key]);
                    }
                    var btnHorizontalPadding = arr[59];
                    for (var key in btnHorizontalPadding) {
                        component.set('v.btnHorizontalPadding', btnHorizontalPadding[key]);
                    }
                    var btnVerticalPadding = arr[60];
                    for (var key in btnVerticalPadding) {
                        component.set('v.btnVerticalPadding', btnVerticalPadding[key]);
                    }
                }
            });
            $A.enqueueAction(action1);

            var action2 = component.get('c.fetchPageCss');
            action2.setParams({ 'formId': formId });
            action2.setCallback(this, function(response) {
                var arr = JSON.parse(response.getReturnValue());
                for (var i = 0; i < arr.length; i++) {
                    var a = arr[0];
                    for (var key in a) {
                        component.set('v.toppadding', a[key]);
                        var fetch = document.querySelectorAll('.page');
                    }
                    var b = arr[1];
                    for (var key in b) {
                        component.set('v.bottompadding', b[key]);
                    }
                    var d = arr[2];
                    for (var key in d) {
                        component.set('v.pagecolorpicker', d[key]);
                    }
                    var e = arr[3];
                    for (var key in e) {
                        component.set('v.backSize', e[key]);
                    }
                    var f = arr[4];
                    for (var key in f) {
                        component.set('v.backpagePostion', f[key]);
                    }
                    var g = arr[5];
                    for (var key in g) {
                        component.set('v.backpageRepeat', g[key]);
                    }
                    var h = arr[6];
                    for (var key in h) {
                        component.set('v.backgroundPagefixposition', h[key]);
                    }
                    var i = arr[7];
                    for (var key in i) {
                        component.set('v.formbordercolor', i[key]);
                    }
                    var j = arr[8];
                    for (var key in j) {
                        component.set('v.formborderStyle', j[key]);
                    }
                    var k = arr[9];
                    for (var key in k) {
                        component.set('v.formborderwidth', k[key]);
                    }
                }
            });
            $A.enqueueAction(action2);

            var action4 = component.get('c.fetchFormCssId');
            var responsevaltes = '';
            action4.setParams({ 'formId': formId });
            action4.setCallback(this, function(response) {
                responsevaltes = response.getReturnValue();
            });
            $A.enqueueAction(action4);

            var fetchDeletedFormImages = component.get('c.fetchDeletedFormImages');
            fetchDeletedFormImages.setParams({ 'formId': formId });
            fetchDeletedFormImages.setCallback(this, function(deletedresponse) {
                if (responsevaltes != deletedresponse.getReturnValue()) {
                    component.set("v.storeFormbgId", responsevaltes);
                    var imgurl = 'url(/servlet/servlet.FileDownload?file=' + responsevaltes + ')';
                    var r = document.querySelector(':root');
                    r.style.setProperty('--formbgiamge', imgurl);
                }
            })
            $A.enqueueAction(fetchDeletedFormImages);

            //Page 
            var action3 = component.get('c.fetchPageCssId');
            var page_response_values = '';
            action3.setParams({ 'formId': formId });
            action3.setCallback(this, function(response) {
                page_response_values = response.getReturnValue();
            });
            $A.enqueueAction(action3);

            var fetchDeletedImage = component.get('c.fetchDeletedPageImages');
            fetchDeletedImage.setParams({ 'formId': formId });
            fetchDeletedImage.setCallback(this, function(Deletedresponse) {
                if (page_response_values == Deletedresponse.getReturnValue()) {} else {
                    component.set("v.storebgId ", page_response_values);
                    var imgurl = 'url(/servlet/servlet.FileDownload?file=' + page_response_values + ')';
                    var r = document.querySelector(':root');
                    r.style.setProperty('--pagebgimage', imgurl);
                }
            })
            $A.enqueueAction(fetchDeletedImage);



        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }



    },

    // ==================For Page Break===================
    pageBreakHelper: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var BreakFieldId = event.target.dataset.record;
            // for signature, name, rating fields
            if (BreakFieldId == undefined) {
                var BreakFieldName = event.target.name;
                if (BreakFieldName != undefined) {
                    var x = BreakFieldName.split(':::');
                    if (x[0] == "field") {
                        BreakFieldId = x[1];
                    }
                } else {
                    var BreakFieldName = event.target.parentNode.name;
                    if (BreakFieldName != undefined) {
                        var x = BreakFieldName.split(':::');
                        if (x[0] == "field") {
                            BreakFieldId = x[1];
                        }
                    }
                }
            }
            var pagedetail = component.get("v.Page");
            var formId = component.get("v.FormId");
            var PageId = event.target.parentNode.parentNode.id;
            // for signature, name, rating fields
            if (PageId == '') {
                PageId = event.target.id;
                if (PageId == '') {
                    PageId = event.target.parentNode.id;
                }
            }

            var FieldElement = document.querySelectorAll('.field');
            var Listt = [];
            var j;
            for (var i = 0; i < FieldElement.length; i++) {
                var x = FieldElement[i].getAttribute('data-record');
                if (x == BreakFieldId) {
                    j = i;
                }
            }
            for (var i = j; i < FieldElement.length; i++) {
                var x = FieldElement[i].getAttribute('data-record');
                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                if (ParentPageId == PageId) {
                    Listt.push(x + ':::' + i + ':::' + ParentPageId);
                }
            }

            if (PageId != '') {
                var action = component.get("c.pageBreak");
                action.setParams({ 'pagedetail': pagedetail, 'formId': formId, 'Listt': Listt, 'pageId': PageId });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state == "SUCCESS") {
                        if (response.getReturnValue() == null) {
                            component.set("v.spinner", false);
                            component.find("toastCmp").showToastModel("Something went wrong", "error");
                        } else {
                            component.set("v.spinner", false);
                            component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                            component.find("toastCmp").showToastModel("Page added successfully", "success");

                        }
                    } else {
                        component.set("v.spinner", false);
                        component.find("toastCmp").showToastModel("Something went wrong", "error");
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.spinner", false);
                component.find("toastCmp").showToastModel("Something went wrong", "error");

            }
            event.preventDefault();
            var xx = document.querySelectorAll('.fieldDiv0,.fieldDiv2,.pagetitle,.formtitle');
            for (var s of xx) {
                s.style.opacity = 1;
            }
        } catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },

    // ====================Delete page================
    deletepage: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var pageId = component.get("v.selectPageId");
            // var x = pageId.split(':::');
            var formId = component.get("v.FormId");
            var action = component.get("c.DeletePage");
            action.setParams({ 'pageId': pageId, 'formId': formId });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.spinner", false);
                    component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                    component.find("toastCmp").showToastModel("Page delete successfully", "success");

                } else {
                    component.set("v.spinner", false);
                    component.find("toastCmp").showToastModel("Something went wrong to delete page", "error");

                }
            });
            $A.enqueueAction(action);
            component.set('v.testS', false);

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },

    // =====================Insert Field Record==================
    insertFieldRecord: function(component, event, helper, FormId, PageId, Fieldid, length) {
        try {
            component.set("v.spinner", true);
            var sequenceValue = parseInt(length) + 1
            var FieldElement = document.querySelectorAll('.field');
            var Listt = [];
            for (var i = 0; i < FieldElement.length; i++) {
                var x = FieldElement[i].getAttribute('data-record');
                if (i < sequenceValue) {
                    var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                    Listt.push(x + ':::' + i + ':::' + ParentPageId);
                } else {
                    var j = parseInt(i) + 1;
                    var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                    Listt.push(x + ':::' + j + ':::' + ParentPageId);
                }
            }
            helper.SequenceSave(component, event, helper, Listt);
            var action = component.get('c.addFieldRecord');
            action.setParams({ 'formId': FormId, 'pageId': PageId, 'fieldId': Fieldid, 'length': sequenceValue });
            action.setCallback(this, function(response) {
                component.set("v.spinner", false);
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.find("toastCmp").showToastModel("Field added successfully", "success");
                    component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                    component.set("v.ShowField", false);
                    component.find("searchKey").set("v.value", '');
                    component.set("v.spinner", false);
                } else {
                    component.set("v.spinner", false);
                    component.find("toastCmp").showToastModel("Something went wrong to insert field", "error");
                }
            });
            $A.enqueueAction(action);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },

    // ================Save field sequence====================
    SequenceSave: function(component, event, helper, Listt) {
        try {
            var action = component.get("c.SequenceSave");
            action.setParams({
                'Listt': Listt
            });
            action.setCallback(this, function(response) {});
            $A.enqueueAction(action);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    // =================Popup open======================
    openModal: function(component, event, helper) {
        try {
            var modal = component.find("Modal");
            var modalBackdrop = component.find("ModalBackdrop");
            $A.util.addClass(modal, "slds-fade-in-open");
            $A.util.addClass(modalBackdrop, "slds-backdrop_open");
            component.set('v.PageTitle', true);


            component.set('v.Page.Title__c', '');
            component.set('v.Page.Sub_Title__c', '');
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    // ============Close popup=======================
    closeModal: function(component, event, helper) {
        try {
            var modal = component.find("Modal");
            var modalBackdrop = component.find("ModalBackdrop");
            $A.util.removeClass(modal, "slds-fade-in-open");
            $A.util.removeClass(modalBackdrop, "slds-backdrop_open");

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    // ===============craete page====================
    createPage: function(component, event, helper) {
        try {
            helper.closeModal(component, event, helper);
            component.set("v.spinner", true);
            var pagedetail = component.get("v.Page");
            var formId = component.get("v.FormId");
            var action = component.get("c.createPageRecord");
            action.setParams({ 'pagedetail': pagedetail, 'formId': formId });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                    component.find("toastCmp").showToastModel("Page added successfully", "success");
                    window.setTimeout(function() { helper.handleCss(component, event, helper) }, 1000);
                    component.set("v.spinner", false);
                } else {
                    component.set("v.spinner", false);
                    component.find("toastCmp").showToastModel("Something went wrong", "error");
                }
            });
            $A.enqueueAction(action);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    openCustomizeTemplate: function(component, event, helper) {
        try {
            var modal = component.find("customize_email_Temp");
            var modalBackdrop = component.find("ModalBackdrop_customize_email_Temp");
            $A.util.addClass(modal, "slds-fade-in-open");
            $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    cancleCustomizeTemplate: function(component, event, helper) {
        try {
            var modal = component.find("customize_email_Temp");
            var modalBackdrop = component.find("ModalBackdrop_customize_email_Temp");
            $A.util.removeClass(modal, "slds-fade-in-open");
            $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },

    // ======================upload form background image as attachment and  set it===========================
    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000, //Chunk Max size 750Kb 

    // Form background image
    uploadHelper: function(component, event) {
        try {
            // get the selected files using aura:id [return array of files]
            var fileInput = component.find("fuploader").get("v.files");
            // get the first file using array index[0]  
            var file = fileInput[0];
            var self = this;
            // check the selected file size, if select file size greter then MAX_FILE_SIZE,
            // then show a alert msg to user,hide the loading spinner and return from function  
            if (file.size > self.MAX_FILE_SIZE) {
                component.set("v.spinner", false);
                component.find("toastCmp").showToastModel("Image size cannot exceed then " + '4.5 MB', "error");
                // component.set("v.fileName", 'Alert : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
                return;
            }
            // create a FileReader object 
            var objFileReader = new FileReader();
            // set onload function of FileReader object   
            objFileReader.onload = $A.getCallback(function() {
                var fileContents = objFileReader.result;
                var base64 = 'base64,';
                var dataStart = fileContents.indexOf(base64) + base64.length;
                fileContents = fileContents.substring(dataStart);
                // call the uploadProcess method 
                self.uploadProcess(component, file, fileContents);
            });

            objFileReader.readAsDataURL(file);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    uploadProcess: function(component, file, fileContents) {
        try {
            // set a default size or startpostiton as 0 
            var startPosition = 0;
            // calculate the end size or endPostion using Math.min() function which is return the min. value   
            var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
            console.log(endPosition, fileContents.length, startPosition, this.CHUNK_SIZE);
            // start with the initial chunk, and set the attachId(last parameter)is null in begin
            this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        try {
            var getchunk = fileContents.substring(startPosition, endPosition);
            var action = component.get("c.SaveFile");
            action.setParams({
                parentId: component.get("v.FormId"),
                fileName: file.name,
                base64Data: encodeURIComponent(getchunk),
                contentType: file.type,
                fileId: attachId
            });
            console.log(file.type);
            console.log(file.name);
            // set call back 
            action.setCallback(this, function(response) {
                // store the response / Attachment Id   
                attachId = response.getReturnValue();
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.setPreview", attachId);
                    var sp = component.get("v.setPreview");
                    // update the start position with end postion
                    startPosition = endPosition;
                    endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                    if (startPosition != endPosition) {
                        component.set("v.spinner", false);
                        component.find("toastCmp").showToastModel("Something went wrong to this image ", "error");
                        return;

                    } else {

                        console.log(endPosition, fileContents.length, startPosition, this.CHUNK_SIZE);
                        // check if the start postion is still less then end postion 
                        // then call again 'uploadInChunk' method , 
                        // else, diaply alert msg and hide the loading spinner
                        var fetchbackground = document.getElementById('mainformid');
                        var setPreview = component.get("v.setPreview");
                        var imgurl = 'url(/servlet/servlet.FileDownload?file=' + setPreview + ')';
                        fetchbackground.style.backgroundImage = imgurl;
                        component.set("v.storeFormbgId", response.getReturnValue());
                        console.log({ imgurl });
                        var action2 = component.get("c.saveFormCssId");
                        action2.setParams({
                            "formId": component.get("v.FormId"),
                            "addStyle": component.get("v.storeFormbgId"),
                        });
                        action2.setCallback(this, function(response) {});
                        $A.enqueueAction(action2);
                        if (startPosition < endPosition) {
                            this.uploadInChunk(component, file, fileContents, startPosition, endPosition, attachId);
                        } else {
                            component.set("v.spinner", false);
                        }
                    }
                } else if (state === "INCOMPLETE") {
                    alert("From server: " + response.getReturnValue());
                    component.set("v.spinner", false);
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            helper.showToast("Error", "Error Occur", errors[0].message);
                        }
                    }
                    component.set("v.spinner", false);
                }

            });
            // enqueue the action
            $A.enqueueAction(action);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    //====================== End of form background image as attachment ==================================
    // ======================upload form background image as attachment and  set it===========================
    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000, //Chunk Max size 750Kb 

    // =========================upload Page background image as attachment and set it========================
    uploadPageHelper: function(component, event) {
        try {
            // get the selected files using aura:id [return array of files]
            var fileInput = component.find("pageuploader").get("v.files");
            // get the first file using array index[0]  
            var file = fileInput[0];
            var self = this;
            if (file.size > self.MAX_FILE_SIZE) {
                component.set("v.spinner", false);
                component.find("toastCmp").showToastModel("Image size cannot exceed then " + '4.5 MB', "error");
                return;
            }
            // create a FileReader object 
            var objFileReader = new FileReader();
            // set onload function of FileReader object   
            objFileReader.onload = $A.getCallback(function() {
                var fileContents = objFileReader.result;
                var base64 = 'base64,';
                var dataStart = fileContents.indexOf(base64) + base64.length;
                fileContents = fileContents.substring(dataStart);
                // call the uploadProcess method 
                self.uploadPageProcess(component, file, fileContents);
            });

            objFileReader.readAsDataURL(file);
        } catch (e) {
            console.log({ e });
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }


    },
    uploadPageProcess: function(component, file, fileContents) {
        try {
            var startPosition = 0;
            var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
            this.uploadPageInChunk(component, file, fileContents, startPosition, endPosition, '');
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    uploadPageInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        try {

            var getchunk = fileContents.substring(startPosition, endPosition);
            var action = component.get("c.SavePageFile");
            action.setParams({
                parentId: component.get("v.FormId"),
                fileName: file.name,
                base64Data: encodeURIComponent(getchunk),
                contentType: file.type,
                fileId: attachId
            });

            // set call back 
            action.setCallback(this, function(response) {
                // store the response / Attachment Id   
                attachId = response.getReturnValue();
                var state = response.getState();

                if (state === "SUCCESS") {
                    component.set("v.setPagePreview", attachId);
                    var sp = component.get("v.setPagePreview");

                    // update the start position with end postion
                    startPosition = endPosition;
                    endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                    console.log({ startPosition });
                    console.log({ endPosition });

                    if (startPosition != endPosition) {
                        component.set("v.spinner", false);
                        component.find("toastCmp").showToastModel("Something went wrong to this image ", "error");
                        return;

                    } else {

                        // check if the start postion is still less then end postion 
                        // then call again 'uploadInChunk' method , 
                        // else, diaply alert msg and hide the loading spinn
                        var fetchbackground = document.querySelectorAll('.page');
                        var setPreview = component.get("v.setPagePreview");

                        var imgurl = 'url(/servlet/servlet.FileDownload?file=' + setPreview + ')';
                        var r = document.querySelector(':root');
                        r.style.setProperty('--bgcolorfield', 'white');
                        r.style.setProperty('--labelcolor', 'black');
                        r.style.setProperty('--btnBgColor', 'white');
                        for (var i of fetchbackground) {
                            i.style.backgroundImage = imgurl;
                            component.set("v.storebgId", response.getReturnValue());
                        }
                        var r = document.querySelector(':root');
                        r.style.setProperty('--labelcolor', 'black');
                        var action2 = component.get("c.savePageCssId");
                        action2.setParams({
                            "formId": component.get("v.FormId"),
                            "addStyle": component.get("v.storebgId"),
                        });
                        action2.setCallback(this, function(response) {});
                        $A.enqueueAction(action2);
                        if (startPosition < endPosition) {
                            this.uploadPageInChunk(component, file, fileContents, startPosition, endPosition, attachId);
                        } else {
                            component.set("v.spinner", false);
                        }
                    }
                }

                // handel the response errors        
                else if (state === "INCOMPLETE") {
                    alert("From server: " + response.getReturnValue());
                } else if (state === "ERROR") {
                    var errors = response.getError();

                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            component.find("toastCmp").showToastModel("errors[0].message", "error");

                        }
                    } else {
                        component.find("toastCmp").showToastModel("Unknown error", "error");
                    }
                }
            });
            // enqueue the action
            $A.enqueueAction(action);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    // =========================End of page background image================================================

    // Applying css to Fields , Forms , Page, Input , Checkboxes, radio buttons , field focus, field hover ,label
    handleCss: function(component, event, helper) {
        try {
            /* 
              1)  Math.abs is used to prevent negative value
              2)  Css variable is used to apply style of child component elemnt using parent component
             */

            //=======================[ Form Accordian]====================
            var fetchbackground = document.getElementById('mainformid');
            // form width
            var getformWidth = component.get('v.formWidth');
            var r = document.querySelector(':root');
            if (getformWidth > 100) {
                r.style.setProperty('--myformwidth', '80%');
                component.find("toastCmp").showToastModel("Form width can not be greater then 100", "error");
            } else {
                getformWidth = Math.abs(getformWidth);
                component.set('v.formWidth', getformWidth);
                r.style.setProperty('--myformwidth', getformWidth + '% ');

            }

            //For head padding
            var gethead = component.get('v.headpadding');
            var r = document.querySelector(':root');
            if (gethead == '' || gethead == null) {
                r.style.setProperty('--formPaddingTop', '5%');

            } else {
                gethead = Math.abs(gethead);
                component.set('v.headpadding', gethead);
                r.style.setProperty('--formPaddingTop', gethead + 'px');
            }


            //   Form Footer
            var getfoot = component.get('v.footpadding');
            if (getfoot == '' || getfoot == null) {
                r.style.setProperty('--formPaddingBottom', '5%');
            } else {
                getfoot = Math.abs(getfoot);
                component.set('v.footpadding', getfoot);
                r.style.setProperty('--formPaddingBottom', getfoot + 'px');
            }

            //Form left padding
            var getleft = component.get('v.leftpadding');
            if (getleft == '' || getleft == null) {
                r.style.setProperty('--formPaddingLeft', '5%');

            } else {
                getleft = Math.abs(getleft);
                component.set('v.leftpadding', getleft);
                r.style.setProperty('--formPaddingLeft', getleft + 'px');
            }

            //Form right padding
            var getright = component.get('v.rightpadding');
            if (getright == '' || getright == null) {
                r.style.setProperty('--formPaddingRight', '5%');
            } else {
                getright = Math.abs(getright);
                component.set('v.rightpadding', getright);
                r.style.setProperty('--formPaddingRight', getright + 'px');
            }

            // Form direction
            var g = document.getElementById('mainformid');
            var selectedOptionValue = component.get('v.formdir')
            if (selectedOptionValue == "Left to Right") {
                r.style.setProperty('--formDirection', 'ltr');
                g.style.direction = 'ltr';
            } else if (selectedOptionValue == "Right to Left") {
                r.style.setProperty('--formDirection', 'rtl');
                g.style.direction = 'rtl';
            }

            // form background
            var getFormBg = component.get('v.colorpicker');
            var r = document.querySelector(':root');
            r.style.setProperty('--bgcolor', getFormBg);

            // Page background color
            var pagecolorpicker = component.get('v.pagecolorpicker');
            if (pagecolorpicker == '' || pagecolorpicker == null) {
                r.style.setProperty('--bg', 'white');

            } else {
                r.style.setProperty('--bg', pagecolorpicker);
            }

            // Form  Background size
            var formbackSize = component.get('v.formbackSize');
            if (formbackSize == 'contain') {
                r.style.setProperty('--formBackgroundSize', formbackSize);

            } else if (formbackSize == 'auto') {
                r.style.setProperty('--formBackgroundSize', formbackSize);

            } else if (formbackSize == 'cover') {
                r.style.setProperty('--formBackgroundSize', formbackSize);

            } else if (formbackSize == 'inherit') {
                r.style.setProperty('--formBackgroundSize', formbackSize);

            }

            //    form  background position
            var formbackpagePostion = component.get('v.formbackpagePostion');
            if (formbackpagePostion == 'top left') {
                r.style.setProperty('--formBackgroundPosition', formbackpagePostion);


            } else if (formbackpagePostion == 'top center') {
                r.style.setProperty('--formBackgroundPosition', formbackpagePostion);

            } else if (formbackpagePostion == 'top right') {
                r.style.setProperty('--formBackgroundPosition', formbackpagePostion);


            } else if (formbackpagePostion == 'center left') {
                r.style.setProperty('--formBackgroundPosition', formbackpagePostion);

            } else if (formbackpagePostion == 'center right') {
                r.style.setProperty('--formBackgroundPosition', formbackpagePostion);


            } else if (formbackpagePostion == 'bottom left') {
                r.style.setProperty('--formBackgroundPosition', formbackpagePostion);


            } else if (formbackpagePostion == 'bottom right') {
                r.style.setProperty('--formBackgroundPosition', formbackpagePostion);

            }


            //form background repeat
            var formbackpageRepeat = component.get('v.formbackpageRepeat');
            if (formbackpageRepeat == 'no-repeat') {
                r.style.setProperty('--formBackgroundRepeat', formbackpageRepeat);

            } else if (formbackpageRepeat == 'repeat') {
                r.style.setProperty('--formBackgroundRepeat', formbackpageRepeat);


            } else if (formbackpageRepeat == 'repeat-x') {
                r.style.setProperty('--formBackgroundRepeat', formbackpageRepeat);

            } else if (formbackpageRepeat == 'repeat-y') {
                r.style.setProperty('--formBackgroundRepeat', formbackpageRepeat);

            }


            // form  background fix position
            var formbackgroundPagefixposition = component.get('v.formbackgroundPagefixposition');
            if (formbackgroundPagefixposition == 'fixed') {
                r.style.setProperty('--formBackgroundfixPosition', formbackgroundPagefixposition);


            } else if (formbackgroundPagefixposition == 'scroll') {
                r.style.setProperty('--formBackgroundfixPosition', formbackgroundPagefixposition);
            }


            // ===========================[Label Accordian]===================
            //label alignment
            var labelalign = component.get('v.labelalign');
            var r = document.querySelector(':root');
            r.style.setProperty('--labelAlign', labelalign);

            // label font family
            var labelfontfamily = component.get('v.labelfontfamily');
            var r = document.querySelector(':root');
            if (labelfontfamily == 'Times New Roman') {
                r.style.setProperty('--labelfontfamily', labelfontfamily);

            } else if (labelfontfamily == 'Arial') {
                r.style.setProperty('--labelfontfamily', labelfontfamily);
                r.style.setProperty('--resourceUrl2', 'url(/resource/arialFont)');

            } else if (labelfontfamily == 'Tahoma') {
                r.style.setProperty('--labelfontfamily', labelfontfamily);
                r.style.setProperty('--resourceUrl', 'url(/resource/ThFont)');

            } else if (labelfontfamily == 'cursive') {
                r.style.setProperty('--labelfontfamily', labelfontfamily);

            } else if (labelfontfamily == 'fantasy') {
                r.style.setProperty('--labelfontfamily', labelfontfamily);

            } else if (labelfontfamily == 'monospace') {
                r.style.setProperty('--labelfontfamily', labelfontfamily);

            } else if (labelfontfamily == 'Helvetica') {
                r.style.setProperty('--labelfontfamily', labelfontfamily);

            } else if (labelfontfamily == 'sans-serif') {
                r.style.setProperty('--labelfontfamily', labelfontfamily);

            }


            // label font weight
            var labelfontweight = component.get('v.labelfontweight');
            var r = document.querySelector(':root');
            if (labelfontweight == 'Normal') {
                r.style.setProperty('--labelfontweight', labelfontweight);

            } else if (labelfontweight == 'bold') {
                r.style.setProperty('--labelfontweight', labelfontweight);

            }


            //label font style
            var labelfontstyle = component.get('v.labelfontstyle');
            var r = document.querySelector(':root');
            if (labelfontstyle == 'Normal') {
                r.style.setProperty('--labelfontstyle', labelfontstyle);

            } else if (labelfontstyle == 'italic') {
                r.style.setProperty('--labelfontstyle', labelfontstyle);

            }

            //label font size
            var labelfontsize = component.get('v.labelfontsize');
            if (labelfontsize == null || labelfontsize == '' || labelfontsize == undefined) {
                r.style.setProperty('--labelfontsize', '16px');

            } else {
                labelfontsize = Math.abs(labelfontsize);
                component.set('v.labelfontsize', labelfontsize);
                r.style.setProperty('--labelfontsize', labelfontsize + 'px');
            }

            //  label line height
            var labelineheight = component.get('v.labelineheight');
            var r = document.querySelector(':root');
            if (labelineheight == 'Single') {
                r.style.setProperty('--labelineheight', ' normal');
            } else if (labelineheight == '1.5 Lines') {
                r.style.setProperty('--labelineheight', 1.5);

            } else if (labelineheight == 'Double') {
                r.style.setProperty('--labelineheight', 3);

            }


            //label color 
            var labelcolor = component.get('v.labelcolor');
            var r = document.querySelector(':root');
            if (labelcolor == '' || labelcolor == undefined) {
                var r = document.querySelector(':root');
                r.style.setProperty('--labelcolor', 'black');

            } else {
                r.style.setProperty('--labelcolor', labelcolor);
            }


            //label top margin
            var labeltopmargin = component.get('v.labeltopmargin');
            labeltopmargin = Math.abs(labeltopmargin);
            component.set('v.labeltopmargin', labeltopmargin);
            r.style.setProperty('--labeltopmargin', labeltopmargin + 'px');


            //label bottom margin
            var labelbottommargin = component.get('v.labelbottommargin');
            labelbottommargin = Math.abs(labelbottommargin);
            component.set('v.labelbottommargin', labelbottommargin);
            r.style.setProperty('--labelbottommargin', labelbottommargin + 'px');


            // =========================[Input  Accodiancss]=====================
            //Input background color
            var bgInput = component.get('v.bgInput');
            var r = document.querySelector(':root');
            if (bgInput == '' || bgInput == undefined) {
                var r = document.querySelector(':root');
                r.style.setProperty('--bgcolorfield', 'white');

            } else {
                r.style.setProperty('--bgcolorfield', bgInput);

            }

            //Input border color
            var borderInput = component.get('v.borderInput');
            r.style.setProperty('--bordercolorfield', borderInput);

            //Input border style
            var borderStyle = component.get('v.borderStyle');
            if (borderStyle == 'None') {
                r.style.setProperty('--borderstylefield', borderStyle);

            } else if (borderStyle == 'Dotted') {
                r.style.setProperty('--borderstylefield', borderStyle);

            } else if (borderStyle == 'Dashed') {
                r.style.setProperty('--borderstylefield', borderStyle);

            } else if (borderStyle == 'Solid') {
                r.style.setProperty('--borderstylefield', borderStyle);

            } else if (borderStyle == 'Double') {
                r.style.setProperty('--borderstylefield', borderStyle);

            } else if (borderStyle == 'Groove') {
                r.style.setProperty('--borderstylefield', borderStyle);

            } else if (borderStyle == 'Ridge') {
                r.style.setProperty('--borderstylefield', borderStyle);

            } else if (borderStyle == 'Inset') {
                r.style.setProperty('--borderstylefield', borderStyle);

            } else if (borderStyle == 'Outset') {
                r.style.setProperty('--borderstylefield', borderStyle);

            }

            // Input border width
            var borderWidth = component.get('v.borderWidth');
            borderWidth = Math.abs(borderWidth);
            component.set('v.borderWidth', borderWidth);
            r.style.setProperty('--borderwidthfield', borderWidth + 'px');

            //Input border radius
            var borderRadius = component.get('v.borderRadius');
            borderRadius = Math.abs(borderRadius);
            component.set('v.borderRadius', borderRadius);
            r.style.setProperty('--borderradiusfield', borderRadius + 'px');


            //Input horizontal padding
            var inputHpadding = component.get('v.inputHpadding');
            inputHpadding = Math.abs(inputHpadding);
            component.set('v.inputHpadding', inputHpadding);
            r.style.setProperty('--borderhlpaddingfield', inputHpadding + 'px');
            r.style.setProperty('--borderhrpaddingfield', inputHpadding + 'px');

            //Input Horizontal padding
            var inputVpadding = component.get('v.inputVpadding');
            inputVpadding = Math.abs(inputVpadding);
            component.set('v.inputVpadding', inputVpadding);
            r.style.setProperty('--bordervtpaddingfield', inputVpadding + 'px');
            r.style.setProperty('--bordervbpaddingfield', inputVpadding + 'px');

            //Input text color
            var bordertextcolor = component.get('v.bordertextcolor');
            r.style.setProperty('--bordertextcolor', bordertextcolor);

            //Input line height
            var inputlineheight = component.get('v.inputlineheight');
            if (inputlineheight == 'Single') {
                r.style.setProperty('--inputlineheight', ' normal');
            } else if (inputlineheight == '1.5 Lines') {
                r.style.setProperty('--inputlineheight', 1.5);

            } else if (inputlineheight == 'Double') {
                r.style.setProperty('--inputlineheight', 3);

            }

            //Input font size
            var inputfontsize = component.get('v.inputfontsize');
            inputfontsize = Math.abs(inputfontsize);
            component.set('v.inputfontsize', inputfontsize);
            r.style.setProperty('--inputfontsize', inputfontsize + 'px');

            //Input font style
            var inputfontstyle = component.get('v.inputfontstyle');
            if (inputfontstyle == 'Normal') {
                r.style.setProperty('--inputfontstyle', inputfontstyle);

            } else if (inputfontstyle == 'italic') {
                r.style.setProperty('--inputfontstyle', inputfontstyle);

            }

            //Input font weight
            var inputfontweight = component.get('v.inputfontweight');
            if (inputfontweight == 'Normal') {
                r.style.setProperty('--inputfontweight', inputfontweight);

            } else if (inputfontweight == 'bold') {
                r.style.setProperty('--inputfontweight', inputfontweight);

            }

            //input font family
            var inputfontfamily = component.get('v.inputfontfamily');
            if (inputfontfamily == 'Times New Roman') {
                r.style.setProperty('--inputfontfamily', inputfontfamily);

            } else if (inputfontfamily == 'Arial') {
                r.style.setProperty('--inputfontfamily', inputfontfamily);
                r.style.setProperty('--resourceUrl2', 'url(/resource/arialFont)');


            } else if (inputfontfamily == 'Tahoma') {
                r.style.setProperty('--inputfontfamily', inputfontfamily);
                r.style.setProperty('--resourceUrl', 'url(/resource/ThFont)');


            } else if (inputfontfamily == 'cursive') {
                r.style.setProperty('--inputfontfamily', inputfontfamily);

            } else if (inputfontfamily == 'fantasy') {
                r.style.setProperty('--inputfontfamily', inputfontfamily);

            } else if (inputfontfamily == 'monospace') {
                r.style.setProperty('--inputfontfamily', inputfontfamily);

            } else if (inputfontfamily == 'Helvetica') {
                r.style.setProperty('--inputfontfamily', inputfontfamily);

            } else if (inputfontfamily == 'sans-serif') {
                r.style.setProperty('--inputfontfamily', inputfontfamily);

            }


            // ======================[Field Focucs]=================
            //background color
            var fieldfocusbg = component.get('v.fieldfocusbg');
            r.style.setProperty('--fieldfocusbg', fieldfocusbg);

            // border color
            var fieldfocusborderColor = component.get('v.fieldfocusborderColor');
            r.style.setProperty('--fieldfocusborderColor', fieldfocusborderColor);

            //focus color
            var fieldfocuscolor = component.get('v.fieldfocuscolor');
            r.style.setProperty('--fieldfocuscolor', fieldfocuscolor);




            // ===============[Field Hover]================ 
            var fieldhoverbg = component.get('v.fieldhoverbg');
            r.style.setProperty('--fieldhoverbg', fieldhoverbg);

            var fieldhoverborderColor = component.get('v.fieldhoverborderColor');
            r.style.setProperty('--fieldhoverborderColor', fieldhoverborderColor);

            var fieldhovercolor = component.get('v.fieldhovercolor');
            r.style.setProperty('--fieldhovercolor', fieldhovercolor);

            var hoverlabelcolor = component.get('v.hoverlabelcolor');
            r.style.setProperty('--hoverlabelcolor', hoverlabelcolor);


            // =============[Button ACCORDIAN]==============
            //color
            var btncolor = component.get('v.btncolor');
            r.style.setProperty('--btncolor', btncolor);

            //Border style
            var btnborderstyle = component.get('v.btnborderstyle');
            if (btnborderstyle == 'None') {
                r.style.setProperty('--btnborderstyle', btnborderstyle);

            } else if (btnborderstyle == 'Dotted') {
                r.style.setProperty('--btnborderstyle', btnborderstyle);
            } else if (btnborderstyle == 'Dashed') {
                r.style.setProperty('--btnborderstyle', btnborderstyle);
            } else if (btnborderstyle == 'Double') {
                r.style.setProperty('--btnborderstyle', btnborderstyle);
            } else if (btnborderstyle == 'Groove') {
                r.style.setProperty('--btnborderstyle', btnborderstyle);
            } else if (btnborderstyle == 'Ridge') {
                r.style.setProperty('--btnborderstyle', btnborderstyle);
            } else if (btnborderstyle == 'Inset') {
                r.style.setProperty('--btnborderstyle', btnborderstyle);
            } else if (btnborderstyle == 'Outset') {
                r.style.setProperty('--btnborderstyle', btnborderstyle);
            } else {
                r.style.setProperty('--btnborderstyle', 'Solid');
            }

            //Border width
            var btnborderwidth = component.get('v.btnborderwidth');
            btnborderwidth = Math.abs(btnborderwidth);
            component.set('v.btnborderwidth', btnborderwidth);
            r.style.setProperty('--btnborderwidth', btnborderwidth + 'px');

            //border radius
            var btnborderradius = component.get('v.btnborderradius');
            btnborderradius = Math.abs(btnborderradius);
            component.set('v.btnborderradius', btnborderradius);
            r.style.setProperty('--btnborderradius', btnborderradius + 'px');

            //font family
            var buttonfontfamily = component.get('v.buttonfontfamily');
            if (buttonfontfamily == 'Times New Roman') {
                r.style.setProperty('--buttonfontfamily', buttonfontfamily);
            } else if (buttonfontfamily == 'Arial') {
                r.style.setProperty('--buttonfontfamily', buttonfontfamily);
            } else if (buttonfontfamily == 'Tahoma') {
                r.style.setProperty('--buttonfontfamily', buttonfontfamily);
            } else if (buttonfontfamily == 'cursive') {
                r.style.setProperty('--buttonfontfamily', buttonfontfamily);
            } else if (buttonfontfamily == 'fantasy') {
                r.style.setProperty('--buttonfontfamily', buttonfontfamily);
            } else if (buttonfontfamily == 'monospace') {
                r.style.setProperty('--buttonfontfamily', buttonfontfamily);
            } else if (buttonfontfamily == 'Helvetica') {
                r.style.setProperty('--buttonfontfamily', buttonfontfamily);
            } else {
                r.style.setProperty('--buttonfontfamily', buttonfontfamily);
            }

            //font weight
            var buttonfontweight = component.get('v.buttonfontweight');
            if (buttonfontweight == 'bold') {
                r.style.setProperty('--buttonfontweight', buttonfontweight);
            } else {
                r.style.setProperty('--buttonfontweight', 'Normal');
            }

            //font style
            var buttonfontstyle = component.get('v.buttonfontstyle');
            if (buttonfontstyle == 'italic') {
                r.style.setProperty('--buttonfontstyle', buttonfontstyle);
            } else {
                r.style.setProperty('--buttonfontstyle', 'Normal');
            }

            // font size
            var buttonfontsize = component.get('v.buttonfontsize');
            buttonfontsize = Math.abs(buttonfontsize);
            component.set('v.buttonfontsize', buttonfontsize)
            r.style.setProperty('--buttonfontsize', buttonfontsize + 'px');

            //background color
            var btnBgColor = component.get('v.btnBgColor');
            if (btnBgColor == '' || btnBgColor == undefined) {
                r.style.setProperty('--btnBgColor', 'white');

            } else {
                r.style.setProperty('--btnBgColor', btnBgColor);
            }

            // Button alignment
            var btnJustify = component.get('v.btnJustify');
            if (btnJustify == 'Left') {
                r.style.setProperty('--btnJustify', btnJustify);
            } else if (btnJustify == 'Right') {
                r.style.setProperty('--btnJustify', btnJustify);
            } else if (btnJustify == 'center') {
                r.style.setProperty('--btnJustify', btnJustify);
            }
            // text color

            var btnTextColor = component.get('v.btnTextColor');
            r.style.setProperty('--btnTextColor', btnTextColor);

            //width
            var btnWidth = component.get('v.btnWidth');
            btnWidth = Math.abs(btnWidth);
            component.set('v.btnWidth', btnWidth);
            r.style.setProperty('--btnWidth', btnWidth + 'px');

            //Height
            var btnHeight = component.get('v.btnHeight');
            btnHeight = Math.abs(btnHeight);
            component.set('v.btnHeight', btnHeight);
            r.style.setProperty('--btnHeight', btnHeight + 'px');

            //Horizonatl padding
            var btnHorizontalPadding = component.get('v.btnHorizontalPadding');
            btnHorizontalPadding = Math.abs(btnHorizontalPadding);
            component.set('v.btnHorizontalPadding', btnHorizontalPadding);
            r.style.setProperty('--btnLeftPadding', btnHorizontalPadding + 'px');
            r.style.setProperty('--btnRightPadding', btnHorizontalPadding + 'px');

            //Vertical padding
            var btnVerticalPadding = component.get('v.btnVerticalPadding');
            btnVerticalPadding = Math.abs(btnVerticalPadding);
            component.set('v.btnVerticalPadding', btnVerticalPadding);
            r.style.setProperty('--btnTopPadding', btnVerticalPadding + 'px');
            r.style.setProperty('--btnBottomPadding', btnVerticalPadding + 'px');


            // =================[Choices Accordian]=================
            // Radio width
            var radiowidthvar = component.get('v.radiowidth');
            radiowidthvar = Math.abs(radiowidthvar);
            component.set('v.radiowidth', radiowidthvar);
            r.style.setProperty('--radiowidth', radiowidthvar + 'px');
            // Radio height
            var radioheight = component.get('v.radioheight');
            radioheight = Math.abs(radioheight);
            component.set('v.radioheight', radioheight);
            r.style.setProperty('--radioheight', radioheight + 'px');
            // radio margin 
            var radiomarginright = component.get('v.radiomarginright');
            radiomarginright = Math.abs(radiomarginright);
            component.set('v.radiomarginright', radiomarginright);
            r.style.setProperty('--radiomarginright', radiomarginright + 'px');

            //checkbox width
            var checkwidth = component.get('v.checkwidth');
            checkwidth = Math.abs(checkwidth);
            component.set('v.checkwidth', checkwidth);
            r.style.setProperty('--checkwidth', checkwidth + 'px');

            //check box height
            var checkheight = component.get('v.checkheight');
            checkheight = Math.abs(checkheight);
            component.set('v.checkheight', checkheight);
            r.style.setProperty('--checkheight', checkheight + 'px');

            // checkbox margin top
            var checkmargintop = component.get('v.checkmargintop');
            checkmargintop = Math.abs(checkmargintop);
            component.set('v.checkmargintop', checkmargintop);
            r.style.setProperty('--checkmargintop', checkmargintop + 'px');


            // ==============[page Accordian]=================
            // Top padding and bottom padding
            var gettopPadding = component.get('v.toppadding');
            var getbottom = component.get('v.bottompadding');
            gettopPadding = Math.abs(gettopPadding);
            getbottom = Math.abs(getbottom);
            component.set('v.toppadding', gettopPadding);
            component.set('v.bottompadding', getbottom);
            r.style.setProperty('--pagePaddingTop', gettopPadding + 'px');
            r.style.setProperty('--pagePaddingBottom', getbottom + 'px');


            // page  Background size
            var pagebackground = component.get('v.backSize');
            if (pagebackground == 'contain') {
                r.style.setProperty('--pagebg', pagebackground);
            } else if (pagebackground == 'auto') {
                r.style.setProperty('--pagebg', pagebackground);
            } else if (pagebackground == 'cover') {
                r.style.setProperty('--pagebg', pagebackground);
            } else if (pagebackground == 'inherit') {
                r.style.setProperty('--pagebg', pagebackground);
            }

            //    page  background position
            var pagebackgroundPosition = component.get('v.backpagePostion');
            if (pagebackgroundPosition == 'top left') {
                r.style.setProperty('--pagebgPostion', pagebackgroundPosition);
            } else if (pagebackgroundPosition == 'top center') {
                r.style.setProperty('--pagebgPostion', pagebackgroundPosition);
            } else if (pagebackgroundPosition == 'top right') {
                r.style.setProperty('--pagebgPostion', pagebackgroundPosition);
            } else if (pagebackgroundPosition == 'center left') {
                r.style.setProperty('--pagebgPostion', pagebackgroundPosition);
            } else if (pagebackgroundPosition == 'center right') {
                r.style.setProperty('--pagebgPostion', pagebackgroundPosition);
            } else if (pagebackgroundPosition == 'bottom left') {
                r.style.setProperty('--pagebgPostion', pagebackgroundPosition);
            } else if (pagebackgroundPosition == 'bottom right') {
                r.style.setProperty('--pagebgPostion', pagebackgroundPosition);
            }


            //background repeat
            var pagebackgroundRepeat = component.get('v.backpageRepeat');
            if (pagebackgroundRepeat == 'no-repeat') {
                r.style.setProperty('--pagebgRepeat', pagebackgroundRepeat);
            } else if (pagebackgroundRepeat == 'repeat') {
                r.style.setProperty('--pagebgRepeat', pagebackgroundRepeat);
            } else if (pagebackgroundRepeat == 'repeat-x') {
                r.style.setProperty('--pagebgRepeat', pagebackgroundRepeat);
            } else if (pagebackgroundRepeat == 'repeat-y') {
                r.style.setProperty('--pagebgRepeat', pagebackgroundRepeat);
            }
            // page  background fix position
            var pagebackgroundfixposition = component.get('v.backgroundPagefixposition');
            if (pagebackgroundfixposition == 'fixed') {
                r.style.setProperty('--pagebgFixPosition', pagebackgroundfixposition);
            } else if (pagebackgroundfixposition == 'scroll') {
                r.style.setProperty('--pagebgFixPosition', pagebackgroundfixposition);
            }

            //  page border color
            var formbordercolor = component.get("v.formbordercolor");
            r.style.setProperty('--pageborderColor', formbordercolor);

            // page border style
            var formborderStyle = component.get('v.formborderStyle');
            if (formborderStyle == 'None') {
                r.style.setProperty('--pageborderStyle', formborderStyle);
            } else if (formborderStyle == 'Dotted') {
                r.style.setProperty('--pageborderStyle', formborderStyle);
            } else if (formborderStyle == 'Dashed') {
                r.style.setProperty('--pageborderStyle', formborderStyle);
            } else if (formborderStyle == 'Solid') {
                r.style.setProperty('--pageborderStyle', formborderStyle);
            } else if (formborderStyle == 'Double') {
                r.style.setProperty('--pageborderStyle', formborderStyle);
            } else if (formborderStyle == 'Groove') {
                r.style.setProperty('--pageborderStyle', formborderStyle);
            } else if (formborderStyle == 'Ridge') {
                r.style.setProperty('--pageborderStyle', formborderStyle);
            } else if (formborderStyle == 'Inset') {
                r.style.setProperty('--pageborderStyle', formborderStyle);
            }

            // page border width
            var formborderwidth = component.get('v.formborderwidth');
            formborderwidth = Math.abs(formborderwidth);
            component.set('v.formborderwidth', formborderwidth);
            r.style.setProperty('--pageborderWidth', formborderwidth + 'px');

            component.set("v.Cssspinner", false);
            // background image
            var fileName = 'No File Selected..';
            let a = [
                { "Form width": getformWidth },
                { "headerPadding": gethead },
                { "footerPadding": getfoot },
                { "Left Padding": getleft },
                { "Right Padding": getright },
                { "Form Direction": selectedOptionValue },
                { "Background": getFormBg },
                { "Form_BackgroundSize": formbackSize },
                { "Form_BackgroundPosition": formbackpagePostion },
                { "Form_BackgroundRepeat": formbackpageRepeat },
                { "Form_BackgroundFixPosition": formbackgroundPagefixposition },
                { "Button_BorderColor": btncolor },
                { "Button_BorderStyle": btnborderstyle },
                { "Button_BorderThickness": btnborderwidth },
                { "Button_BorderRadius": btnborderradius },
                { "Button_FontFamliy": buttonfontfamily },
                { "Button_FontWeight": buttonfontweight },
                { "Button_FontStyle": buttonfontstyle },
                { "Button_FontSize": buttonfontsize },
                { "Button_BackgroundColor": btnBgColor },
                { "Button_Justify": btnJustify },
                { "Input_BackgroundColor": bgInput },
                { "Input_BorderColor": borderInput },
                { "Input_BorderStyle": borderStyle },
                { "Input_BorderThickness": borderWidth },
                { "Input_BorderRadius": borderRadius },
                { "Input_Font": inputfontfamily },
                { "Input_FontWeight": inputfontweight },
                { "Input_FontStyle": inputfontstyle },
                { "Input_FontSize": inputfontsize },
                { "Input_FontLineHeight": inputlineheight },
                { "Input_TextColor": bordertextcolor },
                { "Input_HorizontalPadding": inputHpadding },
                { "Input_VerticalPadding": inputVpadding },
                { "Label_Alignment": labelalign },
                { "Label_Font": labelfontfamily },
                { "Label_FontWeight": labelfontweight },
                { "Label_FontStyle": labelfontstyle },
                { "Label_FontSize": labelfontsize },
                { "Label_FontLineHeight": labelineheight },
                { "Label_Color": labelcolor },
                { "Label_TopMargin": labeltopmargin },
                { "Label_BottomMargin": labelbottommargin },
                { "FieldHover_background": fieldhoverbg },
                { "FieldHover_Border": fieldhoverborderColor },
                { "FieldHover_TextColor": fieldhovercolor },
                { "FieldHover_LabelColor": hoverlabelcolor },
                { "FieldFocus_backgroundColor": fieldfocusbg },
                { "FieldFocus_Border": fieldfocusborderColor },
                { "FieldFocus_TextColor": fieldfocuscolor },
                { "Choices_radioWidth": radiowidthvar },
                { "Choices_radioHeight": radioheight },
                { "Choices_radioMarginTop": radiomarginright },
                { "Choices_checkboxWidth": checkwidth },
                { "Choices_checkboxHeight": checkheight },
                { "Choices_checkboxTopMargin": checkmargintop },
                { 'Button_TextColor': btnTextColor },
                { 'Button_Width': btnWidth },
                { 'Button_Height': btnHeight },
                { 'Button_Hpadding': btnHorizontalPadding },
                { 'Button_Vpadding': btnVerticalPadding },
            ];


            var action = component.get('c.saveCss');
            action.setParams({
                "formId": component.get('v.FormId'),
                "addStyle": JSON.stringify(a),
            });

            action.setCallback(this, function(response) {})
            $A.enqueueAction(action);
            let b = [
                { "Top Padding": gettopPadding },
                { "Bottom Padding": getbottom },
                { "Background Color": pagecolorpicker },
                { "Background size": pagebackground },
                { "Background position": pagebackgroundPosition },
                { "Background repeat": pagebackgroundRepeat },
                { "Background fix position": pagebackgroundfixposition },
                { "BorderColor": formbordercolor },
                { "BorderStyle": formborderStyle },
                { "BorderThickness": formborderwidth },

            ];
            var action1 = component.get('c.savePageCss');
            action1.setParams({
                "formId": component.get('v.FormId'),
                "addStyle": JSON.stringify(b),
            });
            action1.setCallback(this, function(response) {})

            $A.enqueueAction(action1);

        } catch (e) {
            console.log({ e });
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    //================End of handle css==============================================================
    fetchSearchField: function(component, event, helper) {
        try {
            var action = component.get("c.getBaseField");
            action.setParams({});
            action.setCallback(this, function(response) {
                component.set("v.FormPageFieldValueWrapper.basefield", response.getReturnValue());
            });
            $A.enqueueAction(action);
        } catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },

    copyTextFieldHelper: function(component, event, text) {
        try {
            var hiddenInput = document.createElement("input");
            hiddenInput.setAttribute("value", text);
            document.body.appendChild(hiddenInput);
            hiddenInput.select();
            document.execCommand("copy");
            document.body.removeChild(hiddenInput);

            var copied = document.querySelector('.urlCopied');
            copied.style.display = 'block';
            setTimeout(function() { copied.style.display = 'none'; }, 1500);

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },

    escape: function(component, event, helper) {
        try {
            alert('loaded');
            var tagsToReplace = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;'
            };
            return this.replace(/[&<>]/g, function(tag) {
                return tagsToReplace[tag] || tag;
            })

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    // ===================remove form background image by clicking remove button====================
    removeFormBackground: function(component, event, helper) {
        try {
            var action = component.get('c.deleteFile');
            action.setParams({
                "formId": component.get("v.FormId"),
                "myId": component.get("v.storeFormbgId")
            })
            action.setCallback(this, function(response) {
                component.set('v.deleteFormImageIds', component.get("v.storeFormbgId"));
                var deleteAction = component.get('c.saveDeletedFormImages');
                deleteAction.setParams({
                    "formId": component.get("v.FormId"),
                    "DeleteformImage": component.get("v.storeFormbgId")
                })
                deleteAction.setCallback(this, function(response) {});
                $A.enqueueAction(deleteAction);
                component.set("v.storeFormbgId", '')
            })

            $A.enqueueAction(action);
            var fetchbackground = document.getElementById('mainformid');
            fetchbackground.style.backgroundImage = '';
            component.find("toastCmp").showToastModel("Form background image removed successfully", "success");
        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong to upload image", "error");
        }

    },
    // ========================remove page background image by clicking remove button=====================
    removePageBackground: function(component, event, helper) {
        try {
            var action = component.get('c.deletePageFile');
            action.setParams({
                "formId": component.get("v.FormId"),
                "myId": component.get("v.storebgId")
            });
            action.setCallback(this, function(response) {
                component.set('v.deleteImageIds', component.get("v.storebgId"));
                var deleteAction = component.get('c.saveDeletedPageImages');
                deleteAction.setParams({
                    "formId": component.get("v.FormId"),
                    "DeleteImage": component.get("v.storebgId")
                });
                deleteAction.setCallback(this, function(response) {});
                $A.enqueueAction(deleteAction);
                component.set("v.storebgId", '')
            });

            $A.enqueueAction(action);
            var fetchbackground = document.querySelectorAll('.page');
            var r = document.querySelector(':root');
            r.style.setProperty('--labelcolor', 'black');
            for (var i of fetchbackground) {
                i.style.backgroundImage = '';
            }
            component.find("toastCmp").showToastModel("Page background image removed successfully", "success");
        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong to upload image", "error");

        }

    },
    // ===================Handle event of confirm box ============================
    addAppEventHandler: function(component, event, helper) {
        try {

            var getEventTitle = event.getSource().get('v.title');
            var confirmMessage = component.find("confirmComp").doAction("You want to remove : Background Image ? ", getEventTitle);
            var message = event.getParam("passMessage");
            var getTitle = event.getParam("getTitle");
            component.set("v.getValue", message);
            component.set("v.getTitle", getTitle);
            var getValue = component.get("v.getValue");
            var getSectionTitle = component.get("v.getTitle");
            if (getValue == 'true' && getSectionTitle == 'removeFormImage') {
                // component.set('v.spinner', true);

                this.removeFormBackground(component, event, helper);

            }

            if (getValue == 'true' && getSectionTitle == 'removePageImage') {
                this.removePageBackground(component, event, helper);
            }


        } catch (e) {
            console.log({ e });
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    //=================Action after particulat tab is active====================
    handleActiveTab: function(component, event, helper) {
        try {
            var validationBar = document.querySelector('.fieldDiv2');
            validationBar.style.display = "none";
            var r = document.querySelector(':root');
            r.style.setProperty('--hidetabdisplay', 'block');

            var mainDiv = document.querySelector('.EditForm');
            var getDiv = document.querySelector('.EditFormMain');
            var publishDiv = document.querySelector('.publishComponent');
            var thankDiv = document.querySelector('.thankYou');
            var previewDiv = document.querySelector('.preview');
            var mappingDiv = document.querySelector('.mapping');
            var notificationDiv = document.querySelector('.notification');
            var getSelectedTabId = event.getSource().get('v.id');
            localStorage.setItem('lastTab', getSelectedTabId);
            var formId = component.get("v.FormId");
            localStorage.setItem('formId', formId);

            var lastTab = localStorage.getItem('lastTab');
            var getFormId = localStorage.getItem('formId');
            var getSelectedTab = component.find('tabSet').get('v.selectedTabId');
            console.log({ lastTab });

            component.find('tabSet').set('v.selectedTabId', lastTab);
            console.log(component.find('tabSet').get('v.selectedTabId'));

            if (event.getSource().get('v.title') == 'Home') {
                var evt = $A.get("e.force:navigateToComponent");
                evt.setParams({
                    componentDef: "c:QFHomeComponent",
                });
                evt.fire();
            } else if (event.getSource().get('v.title') == 'Publish') {

                publishDiv.style.display = 'block';
                mainDiv.style.display = 'none';
                getDiv.style.display = 'none';
                thankDiv.style.display = 'none';
                notificationDiv.style.display = 'none';
                previewDiv.style.display = 'none';
                mappingDiv.style.display = 'none';

            } else if (event.getSource().get('v.title') == 'Thank You') {

                thankDiv.style.display = 'block';
                mainDiv.style.display = 'none';
                getDiv.style.display = 'none';
                previewDiv.style.display = 'none';
                mappingDiv.style.display = 'none';
                publishDiv.style.display = 'none';
                notificationDiv.style.display = 'none';
                const precmp = component.find('thankcmp');
                precmp.reloadCmp();
            } else if (event.getSource().get('v.title') == 'Preview') {

                previewDiv.style.display = 'block';
                mainDiv.style.display = 'none';
                thankDiv.style.display = 'none';
                getDiv.style.display = 'none';
                publishDiv.style.display = 'none';
                mappingDiv.style.display = 'none';
                notificationDiv.style.display = 'none';
                const precmp = component.find('precmp');
                precmp.reloadCmp();
            } else if (event.getSource().get('v.title') == 'Mapping') {

                mappingDiv.style.display = 'block';
                previewDiv.style.display = 'none';
                mainDiv.style.display = 'none';
                thankDiv.style.display = 'none';
                getDiv.style.display = 'none';
                publishDiv.style.display = 'none';
                notificationDiv.style.display = 'none';
                const mapcmp = component.find('mapcmp');
                mapcmp.reloadCmp();
            } else if (event.getSource().get('v.title') == 'Notification') {
                notificationDiv.style.display = 'block';
                mappingDiv.style.display = 'none';
                previewDiv.style.display = 'none';
                mainDiv.style.display = 'none';
                thankDiv.style.display = 'none';
                getDiv.style.display = 'none';
                publishDiv.style.display = 'none';
            } else {
                mainDiv.style.display = 'block';
                getDiv.style.display = 'block';
                publishDiv.style.display = 'none';
                thankDiv.style.display = 'none';
                notificationDiv.style.display = 'none';
                mappingDiv.style.display = 'none';
                previewDiv.style.display = 'none';
            }
        } catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

})