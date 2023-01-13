({
    //active notification tab to run this method
    loadEmailRecipient: function(component, event, helper) { 
        component.set("v.spinner", true);
        try {
            // form ID
            var formid = component.get("v.FormId");
            var action = component.get("c.fetch_notification_init");
            action.setParams({
                'formId': formid
            });
            action.setCallback(this, function(response) {
                var status = response.getState();
                if (status == "SUCCESS") {
                    var emailRecipientList = response.getReturnValue();

                    if(emailRecipientList.recever_mailid != undefined){
                        component.set("v.ntf_recever_mailid", JSON.parse(emailRecipientList.recever_mailid));
                    }
                    if(emailRecipientList.cc_mailid != undefined){
                        component.set("v.ntf_cc_mailid", JSON.parse(emailRecipientList.cc_mailid));
                    }
                    component.set("v.emailRecipientList", emailRecipientList);

                } else {
                    component.find("toastCmp").showToastModel("Something went wrong reload page", "error");
                    component.set("v.spinner",false);
                }
                component.set("v.spinner", false);
            });
            $A.enqueueAction(action);
        } catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    // recipient popup model closed
    cancleAddRecipient: function(component, event, helper) {
        component.set("v.emailRecipientForList",'');
        var modal = component.find("add_Recipient");
        var modalBackdrop = component.find("ModalBackdrop_add_Recipient");
        component.set("v.recipienterror","");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    // cc popup model closed
    cancel_add_cc_helper: function(component, event, helper) {
        var modal = component.find("add_CC");
        var modalBackdrop = component.find("ModalBackdrop_add_CC");
        component.set("v.ccerror","");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        component.set("v.cc_emailaddress_input",'');
    },

    // add recipient email address
    addRecipient: function(component, event, helper) { 
        
        try {
            var ntf_recever_mailid = component.get("v.ntf_recever_mailid");
            var recipientEmail = component.get("v.emailRecipientForList");
            component.set("v.recipienterror","");
            var pattern =/^(([^<>()\[\]\\.,;#:-\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            var validation = pattern.test(recipientEmail);
            console.log('abc..def@mail.com==>>',validation);
            if(recipientEmail.length == 0 || recipientEmail == '' ){
                component.set("v.emailRecipientForList", '');
                component.set("v.recipienterror","Complete this Field");
            }
            else if (validation) {
                if (ntf_recever_mailid.length == 0) {
                    ntf_recever_mailid.push(recipientEmail.toLowerCase());
                    helper.cancleAddRecipient(component, event, helper);
                    component.set("v.recipienterror","");
                } 
                else {
                    var flag = false;
                    ntf_recever_mailid.forEach(element => {
                        if(element == recipientEmail.toLowerCase()){
                            flag = true;
                        }
                    });
                    if(flag){
                        component.set("v.recipienterror","Don't allow Duplicate Recipient Email Id");
                    }
                    else{
                        ntf_recever_mailid.push(recipientEmail.toLowerCase());
                        helper.cancleAddRecipient(component, event, helper);
                        component.set("v.recipienterror","");
                    }
                }
                component.set("v.ntf_recever_mailid", ntf_recever_mailid);
                }
            else{
                component.set("v.recipienterror","Please Enter Valid Email Details..!");
            }
        } 
        catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    // add cc email address
    add_cc_helper: function(component, event, helper) { 
        try {
                
            var ntf_cc_mailid = component.get("v.ntf_cc_mailid");
            var cc_emailaddress_input = component.get("v.cc_emailaddress_input");
            component.set("v.ccerror","");
            // var pattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var pattern =/^(([^<>()\[\]\\.,;#:-\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var validation = pattern.test(cc_emailaddress_input);
            if (validation == false) {
                component.set("v.ccerror","Please Enter Valid Email Details..!");
            }
            else if(cc_emailaddress_input == undefined || cc_emailaddress_input == '' ){
                component.set("v.ccerror","Complete this Field");
            }
            else{
                if (ntf_cc_mailid.length == 0) {
                    ntf_cc_mailid.push(cc_emailaddress_input.toLowerCase());
                    helper.cancel_add_cc_helper(component, event, helper);
                    component.set("v.ccerror","");
                } 
                else{
                    var flag = false;
                    ntf_cc_mailid.forEach(element => {
                        if(element == cc_emailaddress_input.toLowerCase()){
                            flag = true;
                        }
                    });
                    if(flag){
                        component.set("v.ccerror","Don't allow Duplicate Recipient Email Id");
                    }else{
                        ntf_cc_mailid.push(cc_emailaddress_input.toLowerCase());
                        helper.cancel_add_cc_helper(component, event, helper);
                        component.set("v.ccerror","");
                    }
                }
                component.set("v.ntf_cc_mailid", ntf_cc_mailid);
            }
            fg.reportValidity();
        } catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    // open recipient popup model
    openAddRecipient: function(component, event, helper) {
        var modal = component.find("add_Recipient");
        var modalBackdrop = component.find("ModalBackdrop_add_Recipient");
        component.set("v.emailRecipientForList",'');
        component.set("v.recipienterror","");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },

    // open cc popup model
    open_Add_cc_helper: function(component, event, helper) {
        var modal = component.find("add_CC");
        var modalBackdrop = component.find("ModalBackdrop_add_CC");
        component.set("v.ccerror","");
        component.set("v.cc_emailaddress_input",'');
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },

    // save notification data in backend
    saveNotificationMailData: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var formId = component.get("v.FormId");
            console.log('Form id =========='+ formId);
            var ntf_recever_mailid = component.get("v.ntf_recever_mailid");
            var ntf_cc_mailid = component.get("v.ntf_cc_mailid");
            var emailRecipientList = component.get("v.emailRecipientList");
    
            var pattern =/^(([^<>()\[\]\\.,;#:-\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
            if(emailRecipientList.reply_mailid == '' || emailRecipientList.reply_mailid == undefined){
                var validation = true;
            }
            else{
                var validation = pattern.test(emailRecipientList.reply_mailid);
            }
    
            if(validation == false){
                component.find("toastCmp").showToastModel("Add valid reply-to mail Address", "error");
                component.set("v.spinner", false);
            }
            else if(ntf_recever_mailid.length > 0 ) {
                var action = component.get("c.save_nft_data");
                action.setParams({
                    'formId': formId,
                    'recevermailid' : JSON.stringify(ntf_recever_mailid),
                    'ccmailid' : JSON.stringify(ntf_cc_mailid),
                    'replaymailid': emailRecipientList.reply_mailid,
                    'massageSubject': emailRecipientList.subject_mail ,
                    'massageBody': emailRecipientList.body_mail ,
                    'emailattachment': emailRecipientList.attch_receved
                });
                action.setCallback(this, function(response) {
                    var state=response.getState();
                    if(state == 'SUCCESS'){
                        helper.loadEmailRecipient(component, event, helper);
                        component.find("toastCmp").showToastModel("Successfully Saved", "success");
                        setTimeout(() => {
                            component.set("v.spinner", false);
                        }, 100);
                    }
                    else{
                        setTimeout(() => {
                            component.set("v.spinner", false);    
                        }, 100);
                    }
                });

                $A.enqueueAction(action);
            }
            else if(ntf_recever_mailid.length == 0 && ntf_cc_mailid.length > 0){
                var action = component.get("c.save_nft_data");
                action.setParams({
                    'formId': formId,
                    'recevermailid' : JSON.stringify(ntf_recever_mailid),

                    'ccmailid' : JSON.stringify(ntf_cc_mailid),
                    'replaymailid': emailRecipientList.reply_mailid,
                    'massageSubject': emailRecipientList.subject_mail ,
                    'massageBody': emailRecipientList.body_mail ,
                    'emailattachment': emailRecipientList.attch_receved
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if(state == 'SUCCESS'){
                        helper.loadEmailRecipient(component, event, helper);
                        component.find("toastCmp").showToastModel("Data Successfully Saved...!", "success");
                        setTimeout(() => {
                            component.set("v.spinner", false);    
                        }, 100);
                    }
                    else{
                        setTimeout(() => {
                            component.set("v.spinner", false);    
                        }, 100);
                    }
                });
                $A.enqueueAction(action);
            }
            else{
                component.find("toastCmp").showToastModel("Please Enter Recipient Email Address...!", "error");
                setTimeout(() => {
                    component.set("v.spinner", false);    
                }, 100);
            }
        } catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
            component.set("v.spinner", false);
        }
    },
})