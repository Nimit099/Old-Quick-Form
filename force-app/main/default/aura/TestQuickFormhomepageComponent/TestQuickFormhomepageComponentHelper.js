({
    getFormList: function (component) {
        var action = component.get('c.getForm');
        var self = this;
        action.setCallback(this, function (actionResult) {
            component.set("v.listOfForm", actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    ondelete: function (component, event, helper, Id) {
        var action = component.get("c.deleterecord");
        action.setParams({ Id1: Id });
        action.setCallback(this, function (response) {
            component.set("v.listOfForm", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },

    createForm: function (component, event, helper) {
        var formTitle = component.get("v.Form.Title__c");
        if(formTitle == ""){
            helper.showToast("Error","Error","5000","Please Fill the Form Title..");
        }else{
            var formId = component.get("v.Form");
            var action = component.get('c.createFormrecord');
            action.setParams({ 'formId': formId });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if(response.getReturnValue() == "error"){
                    helper.showToast("Error","Error","time","Cannot allow duplicate Form Title");
                }else{
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef: "c:TestQuickFormComponent",
                        componentAttributes: {
                            FormId: response.getReturnValue()
                        }
                    });
                    evt.fire();
                }
                });
        }
        $A.enqueueAction(action);
    },
    openModal: function (component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },
    closeModal: function (component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },
    showToast : function(type,title,time,message){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({     
            "title": title,     
            "type": type,
            "Duration" : time,
            "message": message   
        });   
        toastEvent.fire();                
    }
})