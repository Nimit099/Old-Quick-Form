({
    fetchQuickFormFieldAttValue: function(component, event, helper) {

        component.set("v.spinner", true);
        var ttval = component.get("v.testing1");
        var formId = component.get("v.FormId");
        var decryptId = atob(component.get("v.FormId"));
        var formidencode = component.set("v.FormIdencod", btoa(formId));
        var action = component.get("c.fetchQuickFormField");
        action.setParams({ 'formId': formId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var x = response.getReturnValue();
                console.log({ x });
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                if (x.formName.ThankYou_Label__c != null) {
                    component.set("v.ThanksLabel", x.formName.ThankYou_Label__c);
                } else {
                    var labeldata = '<p style="text-align: center;"><span style="font-size: 36px; color: rgb(59, 76, 228);">Thank You!</span></p>'
                    component.set("v.ThanksLabel", labeldata);
                }
                var inList = document.querySelectorAll('.example-dropzone input');
                for (var s of inList) {
                    s.disable = true;
                }
                component.set("v.spinner", false);
            } else {
                component.set("v.spinner", false);
                helper.showToast("Error", "Error Occur", "Something went wrong to fetch data");
            }
        });
        $A.enqueueAction(action);


        var action1 = component.get('c.fetchCss');
        action1.setParams({
            "formId": component.get('v.FormId'),

        });
        action1.setCallback(this, function(response) {

            var arr = JSON.parse(response.getReturnValue());
            for (var i = 0; i < arr.length; i++) {

                var aa = arr[6];
                component.set("v.colorpicker", aa.Background);

                var a = arr[0];
                for (var key in a) {
                    component.set('v.formWidth', a[key]);

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

                var h = arr[11];
                for (var key in h) {
                    component.set('v.fverticalPadding', h[key]);

                }
                var i = arr[12];
                for (var key in i) {
                    component.set('v.fhorizontalPadding', i[key]);

                }
                var j = arr[13];
                for (var key in j) {
                    component.set('v.bgInput', j[key]);

                }
                var k = arr[14];
                for (var key in k) {
                    component.set('v.borderInput', k[key]);

                }
                var l = arr[15];
                for (var key in l) {
                    component.set('v.borderStyle', l[key]);

                }
                var m = arr[16];
                for (var key in m) {
                    component.set('v.borderWidth', m[key]);

                }
                var n = arr[17];
                for (var key in n) {
                    component.set('v.borderRadius', n[key]);

                }
                var o = arr[18];
                for (var key in o) {
                    component.set('v.inputfontfamily', o[key]);

                }
                var p = arr[19];
                for (var key in p) {
                    component.set('v.inputfontweight', p[key]);

                }
                var q = arr[20];
                for (var key in q) {
                    component.set('v.inputfontstyle', q[key]);

                }
                var r = arr[21];
                for (var key in r) {
                    component.set('v.inputfontsize', r[key]);

                }
                var s = arr[22];
                for (var key in s) {
                    component.set('v.inputlineheight', s[key]);

                }
                var t = arr[23];
                for (var key in t) {
                    component.set('v.bordertextcolor', t[key]);

                }
                var u = arr[24];
                for (var key in u) {
                    component.set('v.inputHpadding', u[key]);

                }
                var v = arr[25];
                for (var key in v) {
                    component.set('v.inputVpadding', v[key]);

                }
                var w = arr[26];
                for (var key in w) {
                    component.set('v.labelalign', w[key]);

                }
                var x = arr[27];
                for (var key in x) {
                    component.set('v.labelfontfamily', x[key]);

                }
                var y = arr[28];
                for (var key in y) {
                    component.set('v.labelfontweight', y[key]);

                }
                var z = arr[29];
                for (var key in z) {
                    component.set('v.labelfontstyle', z[key]);

                }
                var labelfontsize = arr[30];
                for (var key in labelfontsize) {
                    component.set('v.labelfontsize ', labelfontsize[key]);

                }
                var labelineheight = arr[31];
                for (var key in labelineheight) {
                    component.set('v.labelineheight', labelineheight[key]);

                }
                var labelcolor = arr[32];
                for (var key in labelcolor) {
                    component.set('v.labelcolor', labelcolor[key]);

                }
                var labeltopmargin = arr[33];
                for (var key in labeltopmargin) {
                    component.set('v.labeltopmargin', labeltopmargin[key]);

                }
                var labelbottommargin = arr[34];
                for (var key in labelbottommargin) {
                    component.set('v.labelbottommargin', labelbottommargin[key]);

                }
                var fverticalPadding = arr[35];
                for (var key in fverticalPadding) {
                    component.set('v.fverticalPadding', fverticalPadding[key]);

                }
                var fhorizontalPadding = arr[36];
                for (var key in fhorizontalPadding) {
                    component.set('v.fhorizontalPadding', fhorizontalPadding[key]);

                }
                var fieldhoverbg = arr[37];
                for (var key in fieldhoverbg) {
                    component.set('v.fieldhoverbg', fieldhoverbg[key]);

                }
                var fieldhoverborderColor = arr[38];
                for (var key in fieldhoverborderColor) {
                    component.set('v.fieldhoverborderColor', fieldhoverborderColor[key]);

                }
                var fieldhovercolor = arr[39];
                for (var key in fieldhovercolor) {
                    component.set('v.fieldhovercolor', fieldhovercolor[key]);

                }
                var hoverlabelcolor = arr[40];
                for (var key in hoverlabelcolor) {
                    component.set('v.hoverlabelcolor', hoverlabelcolor[key]);

                }
                var instructionhover = arr[41];
                for (var key in instructionhover) {
                    component.set('v.instructionhover', instructionhover[key]);

                }
                var fieldfocusbg = arr[42];
                for (var key in fieldfocusbg) {
                    component.set('v.fieldfocusbg', fieldfocusbg[key]);

                }
                var fieldfocusborderColor = arr[43];
                for (var key in fieldfocusborderColor) {
                    component.set('v.fieldfocusborderColor', fieldfocusborderColor[key]);

                }
                var fieldfocuscolor = arr[44];
                for (var key in fieldfocuscolor) {
                    component.set('v.fieldfocuscolor', fieldfocuscolor[key]);

                }
                var focuslabelcolor = arr[45];
                for (var key in focuslabelcolor) {
                    component.set('v.focuslabelcolor', focuslabelcolor[key]);

                }

                var focusinstructioncolor = arr[46];
                for (var key in focusinstructioncolor) {
                    component.set('v.focusinstructioncolor', focusinstructioncolor[key]);

                }
                var radiowidth = arr[47];
                for (var key in radiowidth) {
                    component.set('v.radiowidth', radiowidth[key]);

                }
                var radioheight = arr[48];
                for (var key in radioheight) {
                    component.set('v.radioheight', radioheight[key]);

                }
                var radiomarginright = arr[49];
                for (var key in radiomarginright) {
                    component.set('v.radiomarginright', radiomarginright[key]);

                }
                var checkwidth = arr[50];
                for (var key in checkwidth) {
                    component.set('v.checkwidth', checkwidth[key]);

                }
                var checkheight = arr[51];
                for (var key in checkheight) {
                    component.set('v.checkheight', checkheight[key]);

                }
                var checkmargintop = arr[52];
                for (var key in checkmargintop) {
                    component.set('v.checkmargintop', checkmargintop[key]);

                }
                var btncolor = arr[53];
                for (var key in btncolor) {
                    component.set('v.btncolor', btncolor[key]);

                }

                var btnborderstyle = arr[54];
                for (var key in btnborderstyle) {
                    component.set('v.btnborderstyle', btnborderstyle[key]);

                }

                var btnborderwidth = arr[55];
                for (var key in btnborderwidth) {
                    component.set('v.btnborderwidth', btnborderwidth[key]);

                }

                var btnborderradius = arr[56];
                for (var key in btnborderradius) {
                    component.set('v.btnborderradius', btnborderradius[key]);

                }

                var buttonfontfamily = arr[57];
                for (var key in buttonfontfamily) {
                    component.set('v.buttonfontfamily', buttonfontfamily[key]);

                }

                var buttonfontweight = arr[58];
                for (var key in buttonfontweight) {
                    component.set('v.buttonfontweight', buttonfontweight[key]);

                }

                var buttonfontstyle = arr[59];
                for (var key in buttonfontstyle) {
                    component.set('v.buttonfontstyle', buttonfontstyle[key]);

                }
                var buttonfontsize = arr[60];
                for (var key in buttonfontsize) {
                    component.set('v.buttonfontsize', buttonfontsize[key]);

                }
                var buttonlineheight = arr[61];
                for (var key in buttonlineheight) {
                    component.set('v.buttonlineheight', buttonlineheight[key]);

                }
                var btnhorizontalpadding = arr[62];
                for (var key in btnhorizontalpadding) {
                    component.set('v.btnhorizontalpadding', btnhorizontalpadding[key]);

                }
                var btnverticalpadding = arr[63];
                for (var key in btnverticalpadding) {
                    component.set('v.btnverticalpadding', btnverticalpadding[key]);

                }

                var errorfontfamily = arr[64];
                for (var key in errorfontfamily) {
                    component.set('v.errorfontfamily', errorfontfamily[key]);

                }

                var errorfontweight = arr[65];
                for (var key in errorfontweight) {
                    component.set('v.errorfontweight', errorfontweight[key]);

                }

                var errorfontstyle = arr[66];
                for (var key in errorfontstyle) {
                    component.set('v.errorfontstyle', errorfontstyle[key]);

                }

                var errorfontsize = arr[67];
                for (var key in errorfontsize) {
                    component.set('v.errorfontsize', errorfontsize[key]);

                }
                var errorlineheight = arr[68];
                for (var key in errorlineheight) {
                    component.set('v.errorlineheight', errorlineheight[key]);

                }
                var errorcolor = arr[69];
                for (var key in errorcolor) {
                    component.set('v.errorcolor', errorcolor[key]);

                }
                var errortopmargin = arr[70];
                for (var key in errortopmargin) {
                    component.set('v.errortopmargin', errortopmargin[key]);

                }
                var errorbottommargin = arr[71];
                for (var key in errorbottommargin) {
                    component.set('v.errorbottommargin', errorbottommargin[key]);

                }
            }

        })

        $A.enqueueAction(action1);

        var action2 = component.get('c.fetchpageCss');
        action2.setParams({
            "formId": component.get('v.FormId'),

        });
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

        })

        $A.enqueueAction(action2);


        var action4 = component.get('c.fetchFormCssId');
        action4.setParams({
            "formId": component.get('v.FormId'),
        });
        action4.setCallback(this, function(response) {
            component.set("v.storeFormbgId", response.getReturnValue());
            var imgurl = 'url(/servlet/servlet.FileDownload?file=' + response.getReturnValue() + ')';
            var r = document.querySelector(':root');
            r.style.setProperty('--formbgiamge', imgurl);

        })
        $A.enqueueAction(action4);


        var action3 = component.get('c.fetchpageCssId');
        action3.setParams({
            "formId": component.get('v.FormId'),
        });


        action3.setCallback(this, function(response) {

            component.set("v.storebgId ", response.getReturnValue());
            var fetchbackground = document.querySelectorAll('.page');
            var imgurl = 'url(/servlet/servlet.FileDownload?file=' + response.getReturnValue() + ')';
            var r = document.querySelector(':root');
            r.style.setProperty('--pagebgimage', imgurl);






        })
        $A.enqueueAction(action3);



    },

    pageBreakHelper: function(component, event, helper) {
        component.set("v.spinner", true);
        var BreakFieldId = event.target.dataset.record;
        // for signature, name, rating fields
        if (BreakFieldId == undefined) {
            try {
                var BreakFieldName = event.target.name;
                var x = BreakFieldName.split(':::');
                if (x[0] == "field") {
                    var BreakFieldId = x[1];
                }
            } catch (error) {

            }
            // for rating field
            if (BreakFieldId == undefined) {
                try {
                    var BreakFieldName = event.target.parentNode.name;
                    var x = BreakFieldName.split(':::');
                    if (x[0] == "field") {
                        var BreakFieldId = x[1];
                    }
                } catch (error) {

                }
            }
        }
        var pagedetail = component.get("v.Page");
        var formId = component.get("v.FormId");
        var PageId = event.target.parentNode.parentNode.id;
        // for signature, name, rating fields
        if (PageId == '') {
            try {
                var PageId = event.target.id;
            } catch (error) {

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

        console.log({ pagedetail });
        console.log({ formId });
        console.log({ Listt });
        console.log({ PageId });

        if (PageId != '') {
            var action = component.get("c.pageBreak");
            action.setParams({ 'pagedetail': pagedetail, 'formId': formId, 'Listt': Listt, 'pageId': PageId });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    component.set("v.spinner", false);
                    helper.closeModal(component, event, helper);
                    component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                    helper.showToast("Success", "Success", "Page added successfully");
                } else {
                    component.set("v.spinner", false);
                    helper.showToast("Error", "Error Occur", "Something went wrong to add page");
                }
            });
            $A.enqueueAction(action);
        } else {
            component.set("v.spinner", false);
            helper.showToast("Error", "Error Occur", "Something went wrong to add page");
        }
        event.preventDefault();
        var xx = document.querySelectorAll('.fieldDiv0,.fieldDiv2,.pagetitle,.formtitle');
        for (var s of xx) {
            s.style.opacity = 1;
        }
    },

    deletepage: function(component, event, helper) {
        component.set("v.spinner", true);
        var pageId = event.getSource().get('v.name');
        var x = pageId.split(':::');
        var formId = component.get("v.FormId");
        var action = component.get("c.DeletePage");
        action.setParams({ 'pageId': x[1], 'formId': formId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.spinner", false);
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                helper.showToast("Success", "Success", "Page delete successfully");
            } else {
                component.set("v.spinner", false);
                helper.showToast("Error", "Error Occur", "Something went wrong to delete page");
            }
        });
        $A.enqueueAction(action);
    },
    insertFieldRecord: function(component, event, helper, FormId, PageId, Fieldid) {
        component.set("v.spinner", true);
        var action = component.get('c.addFieldRecord');
        action.setParams({ 'formId': FormId, 'pageId': PageId, 'fieldId': Fieldid });
        action.setCallback(this, function(response) {
            component.set("v.spinner", false);
            var state = response.getState();
            if (state === "SUCCESS") {
                helper.showToast("Success", "Success", "Field added successfully", "5000");
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                component.set("v.spinner", false);
            } else {
                component.set("v.spinner", false);
                helper.showToast("Error", "Error Occur", "Something went wrong to insert field", "5000");
            }
        });
        $A.enqueueAction(action);
    },
    SequenceSave: function(component, event, helper, Listt) {
        var action = component.get("c.SequenceSave");
        action.setParams({
            'Listt': Listt
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var res = response.getReturnValue();
            if (state === "SUCCESS") {

            }
        });
        $A.enqueueAction(action);
    },
    showToast: function(type, title, message, time) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "type": type,
            "message": message,
            "duration": time
        });
        toastEvent.fire();
    },
    openModal: function(component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },
    closeModal: function(component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    createPage: function(component, event, helper) {
        component.set("v.spinner", true);
        var pagedetail = component.get("v.Page");
        var formId = component.get("v.FormId");
        var action = component.get("c.createPageRecord");
        action.setParams({ 'pagedetail': pagedetail, 'formId': formId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                helper.closeModal(component, event, helper);
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                helper.showToast("Success", "Success", "Page added successfully", "5000");
                component.set("v.spinner", false);
            } else {
                component.set("v.spinner", false);
                helper.showToast("Error", "Error Occur", "Something went wrong to add page", "5000");
            }
        });
        $A.enqueueAction(action);
    },

    loadTabs: function(component, event) {
        event.preventDefault();
        var tabs = component.find('demo');

        for (var each in tabs) {
            $A.util.addClass(tabs[each], 'two');
            $A.util.removeClass(tabs[each], 'fieldDiv');
        }
        var a = document.querySelector('.fieldDiv2');
        a.style.display = "none";
    },
    togField: function(component, event, helper) {
        component.set("v.ShowOutPut", false);
        var a = document.querySelector('input[name="flexRadioDefault"]:checked');
        component.set("v.ThanksType", a.id);
        const collection = document.getElementsByClassName("form-control");
        for (let i = 0; i < collection.length; i++) {
            if (a.parentElement.parentElement.nextElementSibling.id == collection[i].id) {
                a.parentElement.parentElement.nextElementSibling.style.display = 'block';
            } else {
                collection[i].style.display = 'none';
            }
        }
    },

    // ========== Email Module Start ==========
    openAddRecipient: function(component, event, helper) {
        var modal = component.find("add_Recipient");
        var modalBackdrop = component.find("ModalBackdrop_add_Recipient");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },

    cancleAddRecipient: function(component, event, helper) {
        var modal = component.find("add_Recipient");
        var modalBackdrop = component.find("ModalBackdrop_add_Recipient");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    openEditRecipient: function(component, event, helper) {
        var modal = component.find("edit_Recipient");
        var modalBackdrop = component.find("ModalBackdrop_edit_Recipient");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },

    cancleEditRecipient: function(component, event, helper) {
        var modal = component.find("edit_Recipient");
        var modalBackdrop = component.find("ModalBackdrop_edit_Recipient");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    openCustomizeTemplate: function(component, event, helper) {
        var modal = component.find("customize_email_Temp");
        var modalBackdrop = component.find("ModalBackdrop_customize_email_Temp");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },

    cancleCustomizeTemplate: function(component, event, helper) {
        var modal = component.find("customize_email_Temp");
        var modalBackdrop = component.find("ModalBackdrop_customize_email_Temp");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    saveNotificationMailData: function(component, event, helper) {

        console.log("save button clicked------->");

        component.set("v.spinner", true);
        var formId = component.get("v.FormId");
        var fromName = component.get("v.fromName");
        var fromEmail = component.get("v.fromEmail");
        var replyToEmail = component.get("v.replyToEmail");
        var massageSubject = component.get("v.massageSubject");
        var massageBody = component.get("v.massageBody");
        // var redirectUrl = component.get("v.RedirectUrl");
        // var richtxt = component.get("v.myVal");

        var action = component.get("c.saveNotificationData");
        action.setParams({
            'formId': formId,
            'fromName': fromName,
            'fromEmail': fromEmail,
            'replyToEmail': replyToEmail,
            'massageSubject': massageSubject,
            'massageBody': massageBody,
            // 'redirectUrl': redirectUrl,
            // 'richtxt': richtxt
        });
        action.setCallback(this, function(response) {
            // component.set("v.FormData", response.getReturnValue());
            if (response.getReturnValue() == 'Success') {
                console.log("Success fully data saved");
            }
            component.set("v.spinner", false);
        });
        $A.enqueueAction(action);

    },

    addRecipient: function(component, event, helper) {

        console.log("add recipient clicked------->");

        component.set("v.spinner", true);
        var formId = component.get("v.FormId");

        var emailRecipientList = component.get("v.emailRecipientList");
        console.log("email List value----->" + emailRecipientList);

        var recipientEmail = component.get("v.emailRecipientForList");
        console.log("email value----->" + recipientEmail);

        emailRecipientList.push(recipientEmail);
        console.log("Email list is----->" + emailRecipientList);

        var emailRecipientListString = emailRecipientList.toString();
        console.log("Email list string is----->" + emailRecipientListString);

        var action = component.get("c.saveEmailRecipientList");
        action.setParams({
            'formId': formId,
            'emailRecipientList': emailRecipientListString
        });
        action.setCallback(this, function(response) {
            console.log("response call back value--->" + response.getReturnValue());
            if (response.getReturnValue() == 'Success') {
                console.log("Add Recipent sucessfully");
            }
            component.set("v.spinner", false);
        });
        $A.enqueueAction(action);

    },

    loadEmailRecipient: function(component, event, helper) {

        // console.log("loadEmailRecipient loading------->");
        var formId = component.get("v.FormId");

        var action = component.get("c.loadRecipient");
        action.setParams({
            'formId': formId
        });
        action.setCallback(this, function(response) {
            // console.log("response call back value--->"+response.getReturnValue());
            // console.log("response call back status--->"+response.getState());
            if (response.getState() == 'SUCCESS') {

                // console.log("loadEmailRecipient sucessfully");
                var emailRecipientList = response.getReturnValue().split(",");
                // console.log("emailRecipientList is---->" + emailRecipientList);

                component.set("v.emailRecipientList", emailRecipientList);
            }
        });
        $A.enqueueAction(action);

    },

    deleteRecipient: function(component, event, helper) {

        console.log("loadEmailRecipient loading------->");
        var formId = component.get("v.FormId");

        var emailRecipientList = component.get("v.emailRecipientList");
        console.log("emailRecipientList retrived is --->" + emailRecipientList);

        var indexToDelete = event.getSource().get("v.value");
        console.log("indexToDelete is --->" + indexToDelete);

        emailRecipientList.splice(indexToDelete, 1);
        console.log("after splice is --->" + emailRecipientList);

        var emailRecipientListString = emailRecipientList.toString();
        console.log("Email list string is----->" + emailRecipientListString);


        var action = component.get("c.deleteRecipientEmail");
        action.setParams({
            'formId': formId,
            'emailRecipientList': emailRecipientListString
        });
        action.setCallback(this, function(response) {
            console.log("response call back value--->" + response.getReturnValue());
            console.log("response call back status--->" + response.getState());
            if (response.getState() == 'SUCCESS') {

                console.log("loadEmailRecipient sucessfully");
                var emailRecipientList = response.getReturnValue().split(",");
                console.log("emailRecipientList is---->" + emailRecipientList);

                component.set("v.emailRecipientList", emailRecipientList);
            }
        });
        $A.enqueueAction(action);

    },

    editRecipient: function(component, event, helper) {

        console.log("editRecipient loading------->");
        var formId = component.get("v.FormId");

        var emailRecipientList = component.get("v.emailRecipientList");
        console.log("emailRecipientList retrived is --->" + emailRecipientList);

        // var indexToUpdate = event.getSource().get("v.value");
        var indexToUpdate = component.get("v.indexToUpdate");
        console.log("indexToUpdate is --->" + indexToUpdate);

        // var updatedEmail = "test@info.com";
        var updatedEmail = component.get("v.editEmailAdd");
        console.log("editEmailAdd is --->" + emailRecipientList);

        emailRecipientList.splice(indexToUpdate, 1, updatedEmail);
        console.log("after changes is --->" + emailRecipientList);

        var emailRecipientListString = emailRecipientList.toString();
        console.log("Email list string is----->" + emailRecipientListString);


        var action = component.get("c.editRecipientEmail");
        action.setParams({
            'formId': formId,
            'emailRecipientList': emailRecipientListString
        });
        action.setCallback(this, function(response) {
            console.log("response call back value--->" + response.getReturnValue());
            console.log("response call back status--->" + response.getState());
            if (response.getState() == 'SUCCESS') {

                console.log("loadEmailRecipient sucessfully");
                var emailRecipientList = response.getReturnValue().split(",");
                console.log("emailRecipientList is---->" + emailRecipientList);

                component.set("v.emailRecipientList", emailRecipientList);
            }
        });
        $A.enqueueAction(action);

    },

    // ========== Email Module End ==========


    // ========== Thank You Module Start ==========
    thanksTxt: function(component, event, helper) {
        var fieldvelue = event.getSource().get("v.value");
        component.set("v.ThanksTxt", fieldvelue);
    },

    thanksUrl: function(component, event, helper) {
        var fieldvelue = event.getSource().get("v.value").toString();
        component.set("v.ThanksURL", fieldvelue);
    },

    redirectTxt: function(component, event, helper) {
        var fieldvelue = event.getSource().get("v.value");
        component.set("v.RedirectTxt", fieldvelue);
    },

    redirectUrl: function(component, event, helper) {
        var fieldvelue = event.getSource().get("v.value").toString();
        console.log(fieldvelue);
        component.set("v.RedirectUrl", fieldvelue);
    },

    storethanksdata: function(component, event, helper) {
        component.set("v.spinner", true);
        var formId = component.get("v.FormId");
        var thanksLabel = component.get("v.ThanksLabel");
        var thanksType = component.get("v.ThanksType");
        var thanksTxt = component.get("v.ThanksTxt");
        var thanksURL = component.get("v.ThanksURL");
        var redirectTxt = component.get("v.RedirectTxt");
        var redirectUrl = component.get("v.RedirectUrl");
        var richtxt = component.get("v.myVal");

        var action = component.get("c.thanksdata");
        action.setParams({
            'formId': formId,
            'thanksLabel': thanksLabel,
            'ThanksType': thanksType,
            'thanksTxt': thanksTxt,
            'thanksURL': thanksURL,
            'redirectTxt': redirectTxt,
            'redirectUrl': redirectUrl,
            'richtxt': richtxt
        });
        action.setCallback(this, function(response) {
            component.set("v.FormData", response.getReturnValue());
            if (thanksType == 'ThankYou_Text' || thanksType == 'ThankYou_RichText' || thanksType == 'Redirect_Text_And_URL') {
                component.set("v.ShowOutPut", true);
            }
            component.set("v.spinner", false);
        });
        $A.enqueueAction(action);
    },
    // ========== Thank You Module End ==========

    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000, //Chunk Max size 750Kb 


    uploadHelper: function(component, event) {
        // get the selected files using aura:id [return array of files]
        var fileInput = component.find("fuploader").get("v.files");
        // get the first file using array index[0]  
        var file = fileInput[0];

        var self = this;

        var fetchbackground = document.querySelectorAll('.myform');
        var setPreview = component.get("v.setPreview");

        var imgurl = 'url(/servlet/servlet.FileDownload?file=' + setPreview + ')';

        for (var i of fetchbackground) {

            i.style.backgroundImage = imgurl;

        }

        // check the selected file size, if select file size greter then MAX_FILE_SIZE,
        // then show a alert msg to user,hide the loading spinner and return from function  
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.fileName", 'Alert : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
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


    },

    uploadProcess: function(component, file, fileContents) {
        // set a default size or startpostiton as 0 
        var startPosition = 0;
        // calculate the end size or endPostion using Math.min() function which is return the min. value   
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);

        // start with the initial chunk, and set the attachId(last parameter)is null in begin
        this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');

    },
    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        // call the apex method 'SaveFile'

        var getchunk = fileContents.substring(startPosition, endPosition);
        var action = component.get("c.SaveFile");
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
                component.set("v.setPreview", attachId);
                var sp = component.get("v.setPreview");

                // update the start position with end postion
                startPosition = endPosition;
                endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                // check if the start postion is still less then end postion 
                // then call again 'uploadInChunk' method , 
                // else, diaply alert msg and hide the loading spinner
                var fetchbackground = document.querySelector('.myform');
                var setPreview = component.get("v.setPreview");

                var imgurl = 'url(/servlet/servlet.FileDownload?file=' + setPreview + ')';

                fetchbackground.style.backgroundImage = imgurl;
                component.set("v.storeFormbgId", response.getReturnValue());

                var action2 = component.get("c.saveFormCssId");
                action2.setParams({
                    "formId": component.get("v.FormId"),

                    "addStyle": component.get("v.storeFormbgId"),
                });

                action2.setCallback(this, function(response) {

                });
                $A.enqueueAction(action2);

                if (startPosition < endPosition) {
                    this.uploadInChunk(component, file, fileContents, startPosition, endPosition, attachId);

                } else {
                    alert('File has been uploaded successfully');
                }
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message) {
                        helper.showToast("Error", "Error Occur", errors[0].message);
                    }
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);
    },





    uploadPageHelper: function(component, event) {

        // get the selected files using aura:id [return array of files]
        var fileInput = component.find("pageuploader").get("v.files");
        // get the first file using array index[0]  
        var file = fileInput[0];

        var self = this;

        var fetchbackground = document.querySelectorAll('.page');
        var setPreview = component.get("v.setPagePreview");
        // console.log({setPreview});
        var imgurl = 'url(/servlet/servlet.FileDownload?file=' + setPreview + ')';
        // console.log({imgurl});
        for (var i of fetchbackground) {

            i.style.backgroundImage = imgurl;

        }

        // check the selected file size, if select file size greter then MAX_FILE_SIZE,
        // then show a alert msg to user,hide the loading spinner and return from function  
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.fileName", 'Alert : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
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


    },
    uploadPageProcess: function(component, file, fileContents) {
        var startPosition = 0;
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        this.uploadPageInChunk(component, file, fileContents, startPosition, endPosition, '');
    },

    uploadPageInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {

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
            console.log({ response });
            attachId = response.getReturnValue();
            var state = response.getState();

            if (state === "SUCCESS") {

                component.set("v.setPagePreview", attachId);
                var sp = component.get("v.setPagePreview");

                console.log(response.getReturnValue())
                    // update the start position with end postion
                startPosition = endPosition;
                endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                // check if the start postion is still less then end postion 
                // then call again 'uploadInChunk' method , 
                // else, diaply alert msg and hide the loading spinn
                var fetchbackground = document.querySelectorAll('.page');
                var setPreview = component.get("v.setPagePreview");

                var imgurl = 'url(/servlet/servlet.FileDownload?file=' + setPreview + ')';
                console.log({ imgurl });
                for (var i of fetchbackground) {
                    i.style.backgroundImage = imgurl;
                    component.set("v.storebgId", response.getReturnValue());

                }
                var action2 = component.get("c.savepageCssId");
                action2.setParams({
                    "formId": component.get("v.FormId"),

                    "addStyle": component.get("v.storebgId"),
                });

                action2.setCallback(this, function(response) {

                });
                $A.enqueueAction(action2);


                if (startPosition < endPosition) {
                    this.uploadInChunk(component, file, fileContents, startPosition, endPosition, attachId);

                } else {
                    alert('File has been uploaded successfully');
                }
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message) {
                        helper.showToast("Error", "Error Occur", errors[0].message);
                    }
                } else {
                    helper.showToast("Error", "Error Occur", "Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);




    },





    handleCss: function(component, event, helper) {

        // Form Accordian
        var fetchbackground = document.querySelector('.myform');
        var getback = component.get('v.formWidth');
        var r = document.querySelector(':root');
        r.style.setProperty('--myformwidth', getback + '%');

        //For head padding

        var fetchbackground = document.querySelector('.myform');
        var gethead = component.get('v.headpadding');
        fetchbackground.style.paddingTop = gethead + "px";


        //   Form Footer
        var fetchbackground = document.querySelector('.myform');
        var getfoot = component.get('v.footpadding');
        fetchbackground.style.paddingBottom = getfoot + "px";



        //Form left padding
        var fetchbackground = document.querySelector('.myform');
        var getleft = component.get('v.leftpadding');
        fetchbackground.style.paddingLeft = getleft + "px";


        //Form right padding
        var fetchbackground = document.querySelector('.myform');
        var getright = component.get('v.rightpadding');
        fetchbackground.style.paddingRight = getright + "px";

        // Form direction
        var selectedOptionValue = component.get('v.formdir')
        if (selectedOptionValue == "Left to Right") {
            var fetch = document.querySelector('.myform');
            fetch.style.direction = "ltr";
        } else if (selectedOptionValue == "Right to Left") {
            var fetch = document.querySelector('.myform');
            fetch.style.direction = "rtl";

        }

        // Form  Background size

        var formbackSize = component.get('v.formbackSize');
        if (formbackSize == 'contain') {

            var background = document.querySelector('.myform');
            background.style.backgroundSize = "contain";

        } else if (formbackSize == 'auto') {


            var background = document.querySelector('.myform');
            background.style.backgroundSize = "auto";

        } else if (formbackSize == 'cover') {

            var background = document.querySelector('.myform');
            background.style.backgroundSize = "cover";

        } else if (formbackSize == 'inherit') {

            var background = document.querySelector('.myform');
            background.style.backgroundSize = "inherit";

        } else if (formbackSize == 'initial') {

            var background = document.querySelector('.myform');
            background.style.backgroundSize = "initial";

        } else if (formbackSize == 'revert') {

            var background = document.querySelector('.myform');
            background.style.backgroundSize = "revert";

        } else if (formbackSize == 'unset') {

            var background = document.querySelector('.myform');
            background.style.backgroundSize = "unset";
        }


        //    form  background position

        var formbackpagePostion = component.get('v.formbackpagePostion');
        if (formbackpagePostion == 'top left') {

            var background = document.querySelector('.myform');
            background.style.backgroundPosition = "top left";


        } else if (formbackpagePostion == 'top center') {
            var background = document.querySelector('.myform');
            background.style.backgroundPosition = "top center";

        } else if (formbackpagePostion == 'top right') {
            var background = document.querySelector('.myform');
            background.style.backgroundPosition = "top right";


        } else if (formbackpagePostion == 'center left') {
            var background = document.querySelector('.myform');
            background.style.backgroundPosition = "center left";

        } else if (formbackpagePostion == 'center right') {
            var background = document.querySelector('.myform');
            background.style.backgroundPosition = "center right";


        } else if (formbackpagePostion == 'bottom left') {
            var background = document.querySelector('.myform');
            background.style.backgroundPosition = "bottom left";


        } else if (formbackpagePostion == 'bottom right') {
            var background = document.querySelector('.myform');
            background.style.backgroundPosition = "bottom right";


        }

        // form  background fix position

        var formbackgroundPagefixposition = component.get('v.formbackgroundPagefixposition');
        if (formbackgroundPagefixposition == 'fixed') {
            var background = document.querySelector('.myform');
            background.style.backgroundAttachment = "fixed";


        } else if (formbackgroundPagefixposition == 'scroll') {

            var background = document.querySelector('.myform ');
            background.style.backgroundAttachment = "scroll";

        }




        var formbackpageRepeat = component.get('v.formbackpageRepeat');
        if (formbackpageRepeat == 'none') {
            var background = document.querySelector('.myform ');
            background.style.backgroundRepeat = "no-repeat";

        } else if (formbackpageRepeat == 'repeat') {

            var background = document.querySelector('.myform ');
            background.style.backgroundRepeat = "repeat";

        } else if (formbackpageRepeat == 'horizontal') {
            var background = document.querySelector('.myform ');
            background.style.backgroundRepeat = "repeat-x";

        } else if (formbackpageRepeat == 'vertical') {
            var background = document.querySelector('.myform ');
            background.style.backgroundRepeat = "repeat-y";

        }




        // form background

        var fetchbackground = document.querySelector('.page').parentNode;
        var test = document.querySelector('.page');
        var getback = component.get('v.colorpicker');
        fetchbackground.style.backgroundColor = getback;
        // test.style.backgroundColor="white"

        var r = document.querySelector(':root');
        // r.style.setProperty('--bgcolor', getback);
        r.style.setProperty('--bg', 'white');







        // Input  Accodiancss

        var bgInput = component.get('v.bgInput');
        var r = document.querySelector(':root');
        r.style.setProperty('--bgcolorfield', bgInput);



        var borderInput = component.get('v.borderInput');
        var r = document.querySelector(':root');
        r.style.setProperty('--bordercolorfield', borderInput);



        var borderStyle = component.get('v.borderStyle');


        if (borderStyle == 'None') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);


        } else if (borderStyle == 'Dotted') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);

        } else if (borderStyle == 'Dashed') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);

        } else if (borderStyle == 'Solid') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);

        } else if (borderStyle == 'Double') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);

        } else if (borderStyle == 'Groove') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);

        } else if (borderStyle == 'Ridge') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);

        } else if (borderStyle == 'Inset') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);

        } else if (borderStyle == 'Outset') {
            var r = document.querySelector(':root');
            r.style.setProperty('--borderstylefield', borderStyle);

        }




        var borderWidth = component.get('v.borderWidth');
        var r = document.querySelector(':root');
        r.style.setProperty('--borderwidthfield', borderWidth + 'px');


        var borderRadius = component.get('v.borderRadius');
        var r = document.querySelector(':root');
        r.style.setProperty('--borderradiusfield', borderRadius + 'px');


        var inputHpadding = component.get('v.inputHpadding');
        var r = document.querySelector(':root');
        r.style.setProperty('--borderhlpaddingfield', inputHpadding + 'px');
        r.style.setProperty('--borderhrpaddingfield', inputHpadding + 'px');



        var inputVpadding = component.get('v.inputVpadding');
        var r = document.querySelector(':root');
        r.style.setProperty('--bordervtpaddingfield', inputVpadding + 'px');
        r.style.setProperty('--bordervbpaddingfield', inputVpadding + 'px');



        var bordertextcolor = component.get('v.bordertextcolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--bordertextcolor', bordertextcolor);

        var inputlineheight = component.get('v.inputlineheight');
        var r = document.querySelector(':root');
        if (inputlineheight == 'Single') {
            r.style.setProperty('--inputlineheight', ' normal');
        } else if (inputlineheight == '1.5 Lines') {
            r.style.setProperty('--inputlineheight', 1.5);

        } else if (inputlineheight == 'Double') {
            r.style.setProperty('--inputlineheight', 3);

        }

        var inputfontsize = component.get('v.inputfontsize');
        var r = document.querySelector(':root');
        r.style.setProperty('--inputfontsize', inputfontsize + 'px');


        var inputfontstyle = component.get('v.inputfontstyle');
        var r = document.querySelector(':root');
        if (inputfontstyle == 'Normal') {
            r.style.setProperty('--inputfontstyle', inputfontstyle);

        } else if (inputfontstyle == 'italic') {
            r.style.setProperty('--inputfontstyle', inputfontstyle);

        }


        var inputfontweight = component.get('v.inputfontweight');
        var r = document.querySelector(':root');
        if (inputfontweight == 'Normal') {
            r.style.setProperty('--inputfontweight', inputfontweight);

        } else if (inputfontweight == 'bold') {
            r.style.setProperty('--inputfontweight', inputfontweight);

        }


        var inputfontfamily = component.get('v.inputfontfamily');
        var r = document.querySelector(':root');
        if (inputfontfamily == 'Times New Roman') {
            r.style.setProperty('--inputfontfamily', inputfontfamily);

        } else if (inputfontfamily == 'Arial') {
            r.style.setProperty('--inputfontfamily', inputfontfamily);

        } else if (inputfontfamily == 'Tahoma') {
            r.style.setProperty('--inputfontfamily', inputfontfamily);

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


        // Field Focucs
        var fieldfocusbg = component.get('v.fieldfocusbg');
        var r = document.querySelector(':root');
        r.style.setProperty('--fieldfocusbg', fieldfocusbg);


        var fieldfocusborderColor = component.get('v.fieldfocusborderColor');
        var r = document.querySelector(':root');
        r.style.setProperty('--fieldfocusborderColor', fieldfocusborderColor);


        var fieldfocuscolor = component.get('v.fieldfocuscolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--fieldfocuscolor', fieldfocuscolor);


        var focuslabelcolor = component.get('v.focuslabelcolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--focuslabelcolor', focuslabelcolor);

        var focusinstructioncolor = component.get('v.focusinstructioncolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--focusinstructioncolor', focusinstructioncolor);



        // Field Hover 
        var fieldhoverbg = component.get('v.fieldhoverbg');
        var r = document.querySelector(':root');
        r.style.setProperty('--fieldhoverbg', fieldhoverbg);


        var fieldhoverborderColor = component.get('v.fieldhoverborderColor');
        var r = document.querySelector(':root');
        r.style.setProperty('--fieldhoverborderColor', fieldhoverborderColor);


        var fieldhovercolor = component.get('v.fieldhovercolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--fieldhovercolor', fieldhovercolor);

        var hoverlabelcolor = component.get('v.hoverlabelcolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--hoverlabelcolor', hoverlabelcolor);

        var instructionhover = component.get('v.instructionhover');
        var r = document.querySelector(':root');
        r.style.setProperty('--instructionhover', instructionhover);




        // Label Accordian
        var labelalign = component.get('v.labelalign');
        var r = document.querySelector(':root');
        r.style.setProperty('--labelalign', labelalign);


        var labelfontfamily = component.get('v.labelfontfamily');
        var r = document.querySelector(':root');
        if (labelfontfamily == 'Times New Roman') {
            r.style.setProperty('--labelfontfamily', labelfontfamily);

        } else if (labelfontfamily == 'Arial') {
            r.style.setProperty('--  labelfontfamily', labelfontfamily);

        } else if (labelfontfamily == 'Tahoma') {
            r.style.setProperty('--labelfontfamily', labelfontfamily);

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



        var labelfontweight = component.get('v.labelfontweight');
        var r = document.querySelector(':root');
        if (labelfontweight == 'Normal') {
            r.style.setProperty('--labelfontweight', labelfontweight);

        } else if (labelfontweight == 'bold') {
            r.style.setProperty('--labelfontweight', labelfontweight);

        }


        var labelfontstyle = component.get('v.labelfontstyle');
        var r = document.querySelector(':root');
        if (labelfontstyle == 'Normal') {
            r.style.setProperty('--labelfontstyle', labelfontstyle);

        } else if (labelfontstyle == 'italic') {
            r.style.setProperty('--labelfontstyle', labelfontstyle);

        }


        var labelfontsize = component.get('v.labelfontsize');
        var r = document.querySelector(':root');
        r.style.setProperty('--labelfontsize', labelfontsize + 'px');


        var labelineheight = component.get('v.labelineheight');
        var r = document.querySelector(':root');
        if (labelineheight == 'Single') {
            r.style.setProperty('--labelineheight', ' normal');
        } else if (labelineheight == '1.5 Lines') {
            r.style.setProperty('--labelineheight', 1.5);

        } else if (labelineheight == 'Double') {
            r.style.setProperty('--labelineheight', 3);

        }



        var labelcolor = component.get('v.labelcolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--labelcolor', labelcolor);


        var labeltopmargin = component.get('v.labeltopmargin');
        var r = document.querySelector(':root');
        r.style.setProperty('--labeltopmargin', labeltopmargin + 'px');



        var labelbottommargin = component.get('v.labelbottommargin');
        var r = document.querySelector(':root');
        r.style.setProperty('--labelbottommargin', labelbottommargin + 'px');


        // Error Accordian
        var errorfontfamily = component.get('v.errorfontfamily');
        var r = document.querySelector(':root');
        if (errorfontfamily == 'Times New Roman') {
            r.style.setProperty('--errorfontfamily', errorfontfamily);

        } else if (errorfontfamily == 'Arial') {
            r.style.setProperty('--  errorfontfamily', errorfontfamily);

        } else if (errorfontfamily == 'Tahoma') {
            r.style.setProperty('--errorfontfamily', errorfontfamily);

        } else if (errorfontfamily == 'cursive') {
            r.style.setProperty('--errorfontfamily', errorfontfamily);

        } else if (errorfontfamily == 'fantasy') {
            r.style.setProperty('--errorfontfamily', errorfontfamily);

        } else if (errorfontfamily == 'monospace') {
            r.style.setProperty('--errorfontfamily', errorfontfamily);

        } else if (errorfontfamily == 'Helvetica') {
            r.style.setProperty('--errorfontfamily', errorfontfamily);

        } else if (errorfontfamily == 'sans-serif') {
            r.style.setProperty('--errorfontfamily', errorfontfamily);

        }

        var errorfontweight = component.get('v.errorfontweight');
        var r = document.querySelector(':root');
        if (errorfontweight == 'Normal') {
            r.style.setProperty('--errorfontweight', errorfontweight);

        } else if (errorfontweight == 'bold') {
            r.style.setProperty('--errorfontweight', errorfontweight);

        }


        var errorfontstyle = component.get('v.errorfontstyle');
        var r = document.querySelector(':root');
        if (errorfontstyle == 'Normal') {
            r.style.setProperty('--errorfontstyle', errorfontstyle);

        } else if (errorfontstyle == 'italic') {
            r.style.setProperty('--errorfontstyle', errorfontstyle);

        }


        var errorfontsize = component.get('v.errorfontsize');
        var r = document.querySelector(':root');
        r.style.setProperty('--errorfontsize', errorfontsize + 'px');


        var errorlineheight = component.get('v.errorlineheight');
        var r = document.querySelector(':root');
        if (errorlineheight == 'Single') {
            r.style.setProperty('--errorlineheight', ' normal');
        } else if (errorlineheight == '1.5 Lines') {
            r.style.setProperty('--errorlineheight', 1.5);

        } else if (errorlineheight == 'Double') {
            r.style.setProperty('--errorlineheight', 3);

        }



        var errorcolor = component.get('v.errorcolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--errorcolor', errorcolor);



        var errortopmargin = component.get('v.errortopmargin');
        var r = document.querySelector(':root');
        r.style.setProperty('--errortopmargin', errortopmargin + 'px');





        var errorbottommargin = component.get('v.errorbottommargin');
        var r = document.querySelector(':root');
        r.style.setProperty('--errorbottommargin ', errorbottommargin + 'px');


        var errorbg = component.get('v.errorbg');
        var r = document.querySelector(':root');
        r.style.setProperty('--errorbg', errorbg);

        var errorborderColor = component.get('v.errorborderColor');
        var r = document.querySelector(':root');
        r.style.setProperty('--errorborderColor', errorborderColor);

        var errorInpcolor = component.get('v.errorInpcolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--errorInpcolor', errorInpcolor);




        // Button ACCORDIAN

        var btncolor = component.get('v.btncolor');
        var r = document.querySelector(':root');
        r.style.setProperty('--btncolor', btncolor);


        var btnborderstyle = component.get('v.btnborderstyle');

        if (btnborderstyle == 'None') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);


        } else if (btnborderstyle == 'Dotted') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);

        } else if (btnborderstyle == 'Dashed') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);

        } else if (btnborderstyle == 'Solid') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);

        } else if (btnborderstyle == 'Double') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);

        } else if (btnborderstyle == 'Groove') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);

        } else if (btnborderstyle == 'Ridge') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);

        } else if (btnborderstyle == 'Inset') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);

        } else if (btnborderstyle == 'Outset') {
            var r = document.querySelector(':root');
            r.style.setProperty('--btnborderstyle', btnborderstyle);

        }


        var btnborderwidth = component.get('v.btnborderwidth');
        var r = document.querySelector(':root');
        r.style.setProperty('--btnborderwidth', btnborderwidth + 'px');

        var btnborderradius = component.get('v.btnborderradius');
        var r = document.querySelector(':root');
        r.style.setProperty('--btnborderradius', btnborderradius + 'px');


        var buttonfontfamily = component.get('v.buttonfontfamily');
        var r = document.querySelector(':root');
        if (buttonfontfamily == 'Times New Roman') {
            r.style.setProperty('--buttonfontfamily', buttonfontfamily);

        } else if (buttonfontfamily == 'Arial') {
            r.style.setProperty('-- buttonfontfamily', buttonfontfamily);

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

        } else if (buttonfontfamily == 'sans-serif') {
            r.style.setProperty('--buttonfontfamily', buttonfontfamily);

        }

        var buttonfontweight = component.get('v.buttonfontweight');
        var r = document.querySelector(':root');
        if (buttonfontweight == 'Normal') {
            r.style.setProperty('--buttonfontweight', buttonfontweight);

        } else if (buttonfontweight == 'bold') {
            r.style.setProperty('--buttonfontweight', buttonfontweight);

        }


        var buttonfontstyle = component.get('v.buttonfontstyle');
        var r = document.querySelector(':root');
        if (buttonfontstyle == 'Normal') {
            r.style.setProperty('--buttonfontstyle', buttonfontstyle);

        } else if (buttonfontstyle == 'italic') {
            r.style.setProperty('--buttonfontstyle', buttonfontstyle);

        }

        var buttonfontsize = component.get('v.buttonfontsize');
        var r = document.querySelector(':root');
        r.style.setProperty('--buttonfontsize', buttonfontsize + 'px');


        var buttonlineheight = component.get('v.buttonlineheight');
        var r = document.querySelector(':root');
        if (buttonlineheight == 'Single') {
            r.style.setProperty('--buttonlineheight', ' normal');
        } else if (buttonlineheight == '1.5 Lines') {
            r.style.setProperty('--buttonlineheight', 1.5);

        } else if (buttonlineheight == 'Double') {
            r.style.setProperty('--buttonlineheight', 3);

        }
        var btnhorizontalpadding = component.get('v.btnhorizontalpadding');
        var r = document.querySelector(':root');
        r.style.setProperty('--btnlpadding', btnhorizontalpadding + 'px');
        r.style.setProperty('--btnrpadding', btnhorizontalpadding + 'px');

        var btnverticalpadding = component.get('v.btnverticalpadding');
        var r = document.querySelector(':root');
        r.style.setProperty('--btntpadding', btnverticalpadding + 'px');
        r.style.setProperty('--btnbpadding', btnverticalpadding + 'px');


        // Choices Accordian
        var radiowidthvar = component.get('v.radiowidth');
        var r = document.querySelector(':root');
        r.style.setProperty('--radiowidth', radiowidthvar + 'rem');



        var radioheight = component.get('v.radioheight');
        var r = document.querySelector(':root');
        r.style.setProperty('--radioheight', radioheight + 'rem');

        var radiomarginright = component.get('v.radiomarginright');
        var r = document.querySelector(':root');
        r.style.setProperty('--radiomarginright', radiomarginright + 'px');

        var checkwidth = component.get('v.checkwidth');
        var r = document.querySelector(':root');
        r.style.setProperty('--checkwidth', checkwidth + 'px');

        var checkheight = component.get('v.checkheight');
        var r = document.querySelector(':root');
        r.style.setProperty('--checkheight', checkheight + 'px');

        var checkmargintop = component.get('v.checkmargintop');
        var r = document.querySelector(':root');
        r.style.setProperty('--checkmargintop', checkmargintop + 'px');




        // Field Accordian
        var entryContent = document.querySelectorAll('.field');
        var fverticalPadding = component.get('v.fverticalPadding');
        for (var i of entryContent) {
            i.style.paddingTop = fverticalPadding + 'px';
            i.style.paddingBottom = fverticalPadding + 'px';

        }

        // var entryContent = document.querySelectorAll('.field');
        var fhpadding = component.get('v.fhorizontalPadding');
        for (var i of entryContent) {
            i.style.paddingLeft = fhpadding + 'px';
            i.style.paddingRight = fhpadding + 'px';

        }



        // page Accordian
        var page = document.querySelectorAll('.page');
        var gettopPadding = component.get('v.toppadding');
        var getbottom = component.get('v.bottompadding');
        var pagecolorpicker = component.get('v.pagecolorpicker');
        var r = document.querySelector(':root');
        r.style.setProperty('--bg', pagecolorpicker);

        for (var i of page) {
            i.style.marginTop = gettopPadding + 'px';
            i.style.marginBottom = getbottom + 'px';




        }


        // page  Background size

        var pagebackground = component.get('v.backSize');
        if (pagebackground == 'contain') {

            var background = document.querySelectorAll('.page');
            for (var i of background) {
                i.style.backgroundSize = "contain";
            }
        } else if (pagebackground == 'auto') {

            var background = document.querySelectorAll('.page');
            for (var i of background) {
                i.style.backgroundSize = "auto";
            }

        } else if (pagebackground == 'cover') {
            var background = document.querySelectorAll('.page');
            for (var i of background) {
                i.style.backgroundSize = "cover";
            }
        } else if (pagebackground == 'inherit') {
            var background = document.querySelectorAll('.page');
            for (var i of background) {
                i.style.backgroundSize = "inherit";
            }

        } else if (pagebackground == 'initial') {
            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundSize = "initial";
            }

        } else if (pagebackground == 'revert') {
            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundSize = "revert";
            }

        } else if (pagebackground == 'unset') {
            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundSize = "unset";
            }
        }
        //    page  background position
        var pagebackgroundPosition = component.get('v.backpagePostion');
        if (pagebackgroundPosition == 'top left') {

            var background = document.querySelectorAll('.page');
            for (var i of background) {
                i.style.backgroundPosition = "top left";
            }

        } else if (pagebackgroundPosition == 'top center') {
            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundPosition = "top center";
            }

        } else if (pagebackgroundPosition == 'top right') {
            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundPosition = "top right";
            }

        } else if (pagebackgroundPosition == 'center left') {
            var background = document.querySelectorAll('.page');
            for (var i of background) {
                i.style.backgroundPosition = "center left";
            }

        } else if (pagebackgroundPosition == 'center right') {
            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundPosition = "center right";
            }


        } else if (pagebackgroundPosition == 'bottom left') {
            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundPosition = "bottom left";
            }


        } else if (pagebackgroundPosition == 'bottom right') {
            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundPosition = "bottom right";
            }


        }


        var pagebackgroundRepeat = component.get('v.backpageRepeat');
        if (pagebackgroundRepeat == 'none') {
            var backgroundrepeat = document.querySelectorAll('.page');
            for (var i of backgroundrepeat) {

                i.style.backgroundRepeat = "no-repeat";
            }
        } else if (pagebackgroundRepeat == 'repeat') {
            var backgroundrepeat = document.querySelectorAll('.page');

            for (var i of backgroundrepeat) {

                i.style.backgroundRepeat = "repeat";
            }

        } else if (pagebackgroundRepeat == 'horizontal') {
            var backgroundrepeat = document.querySelectorAll('.page');
            for (var i of backgroundrepeat) {

                i.style.backgroundRepeat = "repeat-x";
            }

        } else if (pagebackgroundRepeat == 'vertical') {
            var backgroundrepeat = document.querySelectorAll('.page');
            for (var i of backgroundrepeat) {

                i.style.backgroundRepeat = "repeat-y";
            }

        }
        // page  background fix position

        var pagebackgroundfixposition = component.get('v.backgroundPagefixposition');
        if (pagebackgroundfixposition == 'fixed') {

            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundAttachment = "fixed";
            }



        } else if (pagebackgroundfixposition == 'scroll') {

            var background = document.querySelectorAll('.page ');
            for (var i of background) {
                i.style.backgroundAttachment = "scroll";
            }

        }


        //  form border color
        var formbordercolor = component.get("v.formbordercolor")
        var formborder = document.querySelectorAll('.page');
        for (var i of formborder) {
            i.style.borderColor = formbordercolor;
        }

        // form border style
        var formborderStyle = component.get('v.formborderStyle');
        if (formborderStyle == 'None') {
            var formborder = document.querySelectorAll('.page');
            for (var i of formborder) {
                i.style.borderStyle = formborderStyle;
            }


        } else if (formborderStyle == 'Dotted') {
            var formborder = document.querySelectorAll('.page');
            for (var i of formborder) {
                i.style.borderStyle = formborderStyle;
            }

        } else if (formborderStyle == 'Dashed') {
            var formborder = document.querySelectorAll('.page');
            for (var i of formborder) {
                i.style.borderStyle = formborderStyle;
            }
        } else if (formborderStyle == 'Solid') {
            var formborder = document.querySelectorAll('.page');
            for (var i of formborder) {
                i.style.borderStyle = formborderStyle;
            }
        } else if (formborderStyle == 'Double') {
            var formborder = document.querySelectorAll('.page');
            for (var i of formborder) {
                i.style.borderStyle = formborderStyle;
            }

        } else if (formborderStyle == 'Groove') {
            var formborder = document.querySelectorAll('.page');
            for (var i of formborder) {
                i.style.borderStyle = formborderStyle;
            }

        } else if (formborderStyle == 'Ridge') {
            var formborder = document.querySelectorAll('.page');
            for (var i of formborder) {
                i.style.borderStyle = formborderStyle;
            }

        } else if (formborderStyle == 'Inset') {
            var formborder = document.querySelectorAll('.page');
            for (var i of formborder) {
                i.style.borderStyle = formborderStyle;
            }

        }



        // form width
        var formborderwidth = component.get('v.formborderwidth')
        var formborder = document.querySelectorAll('.page');
        for (var i of formborder) {
            i.style.borderWidth = formborderwidth + 'px';
        }


        // background image
        var fileName = 'No File Selected..';


        let a = [
            { "Form width": component.get("v.formWidth") },
            { "headerPadding": gethead },
            { "footerPadding": getfoot },
            { "Left Padding": getleft },
            { "Right Padding": getright },
            { "Form Direction": selectedOptionValue },
            { "Background": getback },
            { "Form_BackgroundSize": formbackSize },
            { "Form_BackgroundPosition": formbackpagePostion },
            { "Form_BackgroundRepeat": formbackpageRepeat },
            { "Form_BackgroundFixPosition": formbackgroundPagefixposition },
            { "Field_VerticalPadding": fverticalPadding },
            { "Field_HorizontalPadding": fhpadding },
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
            { "Field_VerticalPadding": fverticalPadding },
            { "Field_HorizontalPadding": fhpadding },
            { "FieldHover_background": fieldhoverbg },
            { "FieldHover_Border": fieldhoverborderColor },
            { "FieldHover_TextColor": fieldhovercolor },
            { "FieldHover_LabelColor": hoverlabelcolor },
            { "FieldHover_InstructionsColor": instructionhover },
            { "FieldFocus_backgroundColor": fieldfocusbg },
            { "FieldFocus_Border": fieldfocusborderColor },
            { "FieldFocus_TextColor": fieldfocuscolor },
            { "FieldFocus_LabelColor": focuslabelcolor },
            { "FieldFocus_InstructionColor": focusinstructioncolor },
            { "Choices_radioWidth": radiowidthvar },
            { "Choices_radioHeight": radioheight },
            { "Choices_radioMarginTop": radiomarginright },
            { "Choices_checkboxWidth": checkwidth },
            { "Choices_checkboxHeight": checkheight },
            { "Choices_checkboxTopMargin": checkmargintop },
            { "Button_BorderColor": btncolor },
            { "Button_BorderStyle": btnborderstyle },
            { "Button_BorderThickness": btnborderwidth },
            { "Button_BorderRadius": btnborderradius },
            { "Button_FontFamliy": buttonfontfamily },
            { "Button_FontWeight": buttonfontweight },
            { "Button_FontStyle": buttonfontstyle },
            { "Button_FontSize": buttonfontsize },
            { "Button_LineHeight": buttonlineheight },
            { "Button_HorizontalPadding": btnhorizontalpadding },
            { "Button_VerticalPadding": btnverticalpadding },
            { "Error_FontFamily": errorfontfamily },
            { "Error_FontWeight": errorfontweight },
            { "Error_FontStyle": errorfontstyle },
            { "Error_FontSize": errorfontsize },
            { "Error_LineHeight": errorlineheight },
            { "Error_Color": errorcolor },
            { "Error_TopMargin": errortopmargin },
            { "Error_BottomMargin": errorbottommargin },



        ];




        var action = component.get('c.saveCss');
        action.setParams({
            "formId": component.get('v.FormId'),
            "addStyle": JSON.stringify(a)



        });
        action.setCallback(this, function(response) {

        })

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
        var action1 = component.get('c.savepageCss');
        action1.setParams({
            "formId": component.get('v.FormId'),
            "addStyle": JSON.stringify(b)



        });
        action1.setCallback(this, function(response) {

        })

        $A.enqueueAction(action1);

    },

    fetchSearchField: function(component, event, helper) {
        var formId = component.get("v.FormId");
        var action = component.get("c.fetchQuickFormField");
        action.setParams({ 'formId': formId });
        action.setCallback(this, function(response) {
            var x = response.getReturnValue();
            component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    copyTextFieldHelper: function(component, event, text) {
        var hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("value", text);
        document.body.appendChild(hiddenInput);
        hiddenInput.select();
        document.execCommand("copy");
        document.body.removeChild(hiddenInput);
        var orignalLabel = event.getSource().get("v.label");
        event.getSource().set("v.iconName", 'utility:check');
        event.getSource().set("v.label", 'copied');
        setTimeout(function() {
            event.getSource().set("v.iconName", 'utility:copy_to_clipboard');
            event.getSource().set("v.label", orignalLabel);
        }, 1000);
    },

    escape: function(component, event, helper) {
        alert('loaded')
        var tagsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;'
        };
        return this.replace(/[&<>]/g, function(tag) {
            return tagsToReplace[tag] || tag;
        });
    }



})