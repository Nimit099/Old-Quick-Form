({
    saveList: function(component, event, helper) {
        try {
            if (component.get("v.WrapperList.AttributeList.Add_Prefix_Inside_The_Field__c") != true) {
                component.set("v.WrapperList.AttributeList.Prefix__c", '');
            }
            var WrapperList = component.get("v.WrapperList");
            var action = component.get("c.saveAttributeList");
            action.setParams({
                wlist: WrapperList
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var dataMap = response.getReturnValue();
                    component.set("v.WrapperList", dataMap);
                    var validationBar = document.querySelector('.fieldDiv2');
                    validationBar.style.display = "none";
                    var r = document.querySelector(':root');
                    r.style.setProperty('--hidetabdisplay', 'block');
                    $A.get('e.force:refreshView').fire();
                    helper.showToast("Success", "Success", "5000", "Apply successfully..!");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    deleteRecord: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var fieldId = component.get("v.WrapperList.AttributeList.Form_Field__c");
            var fieldtype = component.get("v.WrapperList.AttributeList.Form_Field__r.Data_Record_Id__c");
            var action = component.get("c.deletefieldRecord");
            action.setParams({ 'fieldId': fieldId, 'fieldtype': fieldtype });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    component.set("v.spinner", false);
                    var validationBar = document.querySelector('.fieldDiv2');
                    validationBar.style.display = "none";
                    var r = document.querySelector(':root');
                    r.style.setProperty('--hidetabdisplay', 'block');
                    $A.get('e.force:refreshView').fire();
                    helper.showToast("Success", "Success", "5000", "Delete successfully..!");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    duplicateRecordhelper: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var fieldId = component.get("v.WrapperList.AttributeList.Form_Field__c");
            var action = component.get("c.duplicatefieldRecord");
            action.setParams({ 'fieldId': fieldId });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    component.set("v.spinner", false);
                    var validationBar = document.querySelector('.fieldDiv2');
                    validationBar.style.display = "none";
                    var r = document.querySelector(':root');
                    r.style.setProperty('--hidetabdisplay', 'block');
                    $A.get('e.force:refreshView').fire();
                    helper.showToast("Success", "Success", "5000", "Duplicate successfully..!");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    showToast: function(type, title, time, message) {
        try {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": title,
                "type": type,
                "Duration": time,
                "message": message
            });
            toastEvent.fire();
        } catch (error) {
            console.log({ error });
        }
    },
})