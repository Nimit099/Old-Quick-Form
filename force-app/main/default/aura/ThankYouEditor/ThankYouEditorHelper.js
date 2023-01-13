({
    // Init Method
    init: function(component, event, helper) {
        try {
            var formId = component.get("v.FormId");
            var action = component.get('c.fetchFormData');
            action.setParams({ 'formId': formId });
            action.setCallback(this, function(response) {
                var formData = response.getReturnValue();
                if (formData != null) {
                    if (formData.ThankYou_Label__c == null) {
                        formData.ThankYou_Label__c = '<p style="text-align: center;"><span style="font-size: 36px;">Thank You !</span></p>';
                    }
                    component.set("v.oldThanksLabel", formData.ThankYou_Label__c)
                    component.set("v.formData", formData);
                    component.set("v.oldFormData", formData);
                } else {
                    helper.showToast("Error", "Error Occur", "Something went wrong", "5000");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // Toggle Field When User Create On Radio Button
    togField: function(component, event, helper) {
        try {
            var a = document.querySelector('input[name="flexRadioDefault"]:checked');
            component.set("v.formData.ThankYou_Page__c", a.id);
            const collection = document.getElementsByClassName("form-control");
            for (let i = 0; i < collection.length; i++) {
                if (a.parentElement.parentElement.nextElementSibling.id == collection[i].id) {
                    a.parentElement.parentElement.nextElementSibling.style.display = 'block';
                } else {
                    collection[i].style.display = 'none';
                }
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // Save Thank You Data In Form Record
    saveThanksData: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var action = component.get("c.saveData");
            var formData = component.get("v.formData");
            action.setParams({
                'formData': formData,
            });
            action.setCallback(this, function(response) {
                component.set("v.spinner", false);
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
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