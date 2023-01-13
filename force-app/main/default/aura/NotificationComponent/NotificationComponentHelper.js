({
    loadEmailRecipient: function(component, event, helper) { //active notification tab to run this method
        component.set("v.spinner", true);
        try {
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
                    helper.showToast("Error", "Error Occur", "Something went wrong reload page", "5000");
                    component.set("v.spinner",false);
                }
                component.set("v.spinner", false);
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({error});
            component.set("v.spinner", false);
        }
    },

    cancleAddRecipient: function(component, event, helper) {
        var modal = component.find("add_Recipient");
        var modalBackdrop = component.find("ModalBackdrop_add_Recipient");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    cancel_add_cc_helper: function(component, event, helper) {
        var modal = component.find("add_CC");
        var modalBackdrop = component.find("ModalBackdrop_add_CC");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    addRecipient: function(component, event, helper) { // notification in add new recever email id

        var ntf_recever_mailid = component.get("v.ntf_recever_mailid");
        var recipientEmail = component.get("v.emailRecipientForList");
        var pattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validation = pattern.test(recipientEmail);

        if (validation == false) {
            helper.showToast("Error", "Error", "Please Enter Valid Email Details..!","5000");
        }
        else if(recipientEmail == undefined || recipientEmail == '' ){
            helper.showToast("Error", "Error", "Please Enter Valid Email Details..!","5000");
        }
        else{
            if (ntf_recever_mailid.length == 0) {
                ntf_recever_mailid.push(recipientEmail);
                helper.cancleAddRecipient(component, event, helper);
            } 
            else {
                var flag = false;
                ntf_recever_mailid.forEach(element => {
                    if(element == recipientEmail){
                        flag = true;
                    }
                });
                if(flag){
                    helper.showToast("Error", "Error", "Don't allow Duplicate Recipient Email Id","5000");
                }else{
                    ntf_recever_mailid.push(recipientEmail);
                    helper.cancleAddRecipient(component, event, helper);
                }
            }
            component.set("v.ntf_recever_mailid", ntf_recever_mailid);
        }
    },

    add_cc_helper: function(component, event, helper) { // notification in add new recever email id

        var ntf_cc_mailid = component.get("v.ntf_cc_mailid");
        var cc_emailaddress_input = component.get("v.cc_emailaddress_input");
        var pattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validation = pattern.test(cc_emailaddress_input);

        if (validation == false) {
            helper.showToast("Error", "Error", "Please Enter Valid Email Details..!","5000");
        }
        else if(cc_emailaddress_input == undefined || cc_emailaddress_input == '' ){
            helper.showToast("Error", "Error", "Please Enter Valid Email Details..!","5000");
        }
        else{
            if (ntf_cc_mailid.length == 0) {
                ntf_cc_mailid.push(cc_emailaddress_input);
                helper.cancel_add_cc_helper(component, event, helper);
            } 
            else{
                var flag = false;
                ntf_cc_mailid.forEach(element => {
                    if(element == cc_emailaddress_input){
                        flag = true;
                    }
                });
                if(flag){
                    helper.showToast("Error", "Error", "Don't allow Duplicate Recipient Email Id","5000");
                }else{
                    ntf_cc_mailid.push(cc_emailaddress_input);
                    helper.cancel_add_cc_helper(component, event, helper);
                }
            }
            component.set("v.ntf_cc_mailid", ntf_cc_mailid);
        }
    },

    openAddRecipient: function(component, event, helper) {
        var modal = component.find("add_Recipient");
        var modalBackdrop = component.find("ModalBackdrop_add_Recipient");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },

    open_Add_cc_helper: function(component, event, helper) {
        var modal = component.find("add_CC");
        var modalBackdrop = component.find("ModalBackdrop_add_CC");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },

    saveNotificationMailData: function(component, event, helper) {
        component.set("v.spinner", true);
        var formId = component.get("v.FormId");
        var ntf_recever_mailid = component.get("v.ntf_recever_mailid");
        var ntf_cc_mailid = component.get("v.ntf_cc_mailid");
        var emailRecipientList = component.get("v.emailRecipientList");


        var pattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validation = pattern.test(emailRecipientList.reply_mailid);

        if(emailRecipientList.body_mail == null || emailRecipientList.subject_mail == null || ntf_recever_mailid.length == 0 || emailRecipientList.reply_mailid == null || emailRecipientList.reply_mailid == ' ' || emailRecipientList.subject_mail == ' ' || emailRecipientList.body_mail == ' '  ){
            helper.showToast("Error", "Error Occur", "Something went wrong Please fill the data", "5000");
            component.set("v.spinner", false);
        }
        else if(validation == false){
            helper.showToast("Error", "Error", "Please Enter Valid Email Details..!","5000");
            component.set("v.spinner", false);
        }
        else{
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
                }
                component.set("v.spinner", false);
            });
            $A.enqueueAction(action);
        }
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

})