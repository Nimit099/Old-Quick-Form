({
    // Init Method
    init: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var formId = component.get("v.FormId");
            var action = component.get('c.fetchFormData');
            action.setParams({ 'formId': formId });
            action.setCallback(this, function(response) {
                var formData = response.getReturnValue();
                if (formData == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                } else {
                    if (formData.ThankYou_Label__c == null) {
                        formData.ThankYou_Label__c = '<p style="text-align: center;"><span style="font-size: 36px;">Thank You !</span></p>';
                    }
                    component.set("v.oldThanksLabel", formData.ThankYou_Label__c);
                    if (formData.ThankYou_Page__c == undefined) {
                        formData.ThankYou_Page__c = 'None';
                    }
                    component.set("v.formData", formData);

                    setTimeout(
                        $A.getCallback(function() {
                            var a = document.querySelector('input[name="flexRadioDefault"]:checked');
                            const collection = document.getElementsByClassName("form-control");
                            for (let i = 0; i < collection.length; i++) {
                                if (a.parentElement.parentElement.nextElementSibling.id == collection[i].id) {
                                    a.parentElement.parentElement.nextElementSibling.style.display = 'block';
                                } else {
                                    collection[i].style.display = 'none';
                                }
                            }
                            component.set("v.spinner", false);
                        }), 50
                    );
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
            var formData = component.get("v.formData");
            var data = true;
            if (formData.ThankYou_Page__c == 'ThankYou_Text') {
                if (formData.ThankYou_Text__c == '' || formData.ThankYou_Text__c == undefined) {
                    data = false
                }
            } else if (formData.ThankYou_Page__c == 'ThankYou_URL') {
                if (formData.ThankYou_URL__c == '' || formData.ThankYou_URL__c == undefined) {
                    data = false
                } else {
                    var validity = component.find("ThanksURL1").get("v.validity");
                    if (validity.valid == false) {
                        data = false
                    }
                }
            } else if (formData.ThankYou_Page__c == 'Redirect_Text_And_URL') {
                if (formData.Redirect_Text__c == '' || formData.Redirect_Text__c == undefined || formData.Redirect_URL__c == '' || formData.Redirect_URL__c == undefined) {
                    data = false
                } else {
                    var validity = component.find("ThanksURL2").get("v.validity");
                    if (validity.valid == false) {
                        data = false
                    }
                }
            } else if (formData.ThankYou_Page__c == 'ThankYou_RichText') {
                if (formData.ThankYou_RichText__c == '' || formData.ThankYou_RichText__c == undefined) {
                    data = false
                }
            }
            if (data == true) {
                component.set("v.spinner", true);
                var action = component.get('c.saveData');
                action.setParams({
                    'formData': formData,
                });
                action.setCallback(this, function(response) {
                    component.set("v.spinner", false);
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
                    } else {
                        component.find("toastCmp").showToastModel("Your Data Saved Successfully", "success");
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.find("toastCmp").showToastModel("Please Fill Input Field With Valid Data", "Error");
            }
        } catch (error) {
            console.log({ error });
        }
    },
})