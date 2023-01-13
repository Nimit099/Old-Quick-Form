({
    getAttributeList: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var validationBar = document.querySelector('.fieldDiv2');
            validationBar.style.display = "block";
            var r = document.querySelector(':root');
            r.style.setProperty('--hidetabdisplay', 'none');
            component.set('v.truthy', true);
            var ShowResultValue = event.getParam("records");
            var x = ShowResultValue.split(':::');
            if (x[0] == "field") {
                component.set("v.spinner", true);
                component.set("v.fId", x[1]);
                var action = component.get("c.fetchList");
                action.setParams({
                    'ids': x[1],
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var responseData = response.getReturnValue();
                        component.set("v.fields", x[0]);
                        component.set("v.WrapperList", response.getReturnValue());
                        component.set("v.spinner", false);

                        // for lookup field
                        if (responseData.AttributeList.Form_Field__r.Data_Record_Id__c == 'QFLOOKUP') {
                            var objLst = responseData.SObjectList;
                            var opts = [];
                            for (var i = 0; i < objLst.length; i++) {
                                opts.push({
                                    value: objLst[i].split(',')[0],
                                    label: objLst[i].split(',')[1]
                                });
                            }
                            component.set("v.allObject", opts);
                            component.set("v.defvalue", responseData.FieldObj.LookUp_Obj__c);
                        }

                        // for Likert Rating Field
                        responseData.FieldList.forEach(function(value) {
                            if (value.Likert__c == 'Statement') {
                                var statementLst = value.Likert_Data__c.split(' ::: ');
                                component.set('v.StatementList', statementLst);
                            } else if (value.Likert__c == 'Option') {
                                var optionLst = value.Likert_Data__c.split(' ::: ');
                                component.set('v.OptionList', optionLst);
                            }
                        });
                    }
                });
            } else if (x[0] == "form") {
                var action = component.get("c.fetchQuickFormField");
                action.setParams({
                    'formId': x[1]
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set("v.fields", x[0]);;
                        component.set("v.formdetail", response.getReturnValue());
                        component.set("v.spinner", false);
                    }
                });
            } else if (x[0] == "page") {
                var action = component.get("c.fetchPagedetails");
                action.setParams({
                    'pageId': x[1]
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set("v.fields", x[0]);
                        component.set("v.pagedetail", response.getReturnValue());
                        component.set("v.spinner", false);
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            component.set("v.spinner", false);
            console.log({ error });
        }
    },

    saveLikertValue: function(component, event, helper) {
        try {
            var fieldWrapper = component.get("v.WrapperList");
            var statementList = component.get("v.StatementList");
            var OptionList = component.get("v.OptionList");
            var statementStr = statementList.join(' ::: ');
            var OptionStr = OptionList.join(' ::: ');

            fieldWrapper.FieldList.forEach(function(value) {
                if (value.Likert__c == 'Statement') {
                    value.Likert_Data__c = statementStr;
                } else if (value.Likert__c == 'Option') {
                    value.Likert_Data__c = OptionStr;
                }
            });

            var action = component.get("c.saveAttributeList");
            action.setParams({
                wlist: fieldWrapper
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var dataMap = response.getReturnValue();
                    component.set("v.WrapperList", dataMap);
                    var x = component.get("v.WrapperList");
                    $A.get('e.force:refreshView').fire();
                    helper.showToast("Success", "Success", "5000", "Apply successfully..!");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    handlefieldDelete: function(component, event, helper) {
        try {
            var fId = component.get("v.fId");
            var val = event.getSource().get("v.name");
            var action = component.get("c.deleteRecord");
            action.setParams({
                'field': val,
                'ids': fId
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    component.set("v.WrapperList.FieldList", response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    saveFormDetails: function(component, event, helper) {
        try {
            var formTitle = component.find("formtitle").get("v.value");
            if (formTitle.trim() == "") {
                helper.showToast("Error", "Error", "5000", "Form title should not null..");
            } else {
                var formdetails = component.get("v.formdetail");
                var Id = component.get("v.formdetail.Id");
                var action = component.get('c.updateFormDetails');
                console.log({ formdetails });
                action.setParams({ 'formdetails': formdetails, 'formTitle': formTitle });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (response.getReturnValue() === "error") {
                        helper.showToast("Error", "Error", "5000", "Don't allow duplicate form name");
                    } else {
                        $A.get('e.force:refreshView').fire();
                        helper.showToast("Success", "Success", "5000", "Form detail updated successfully..!");
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    savePageDetails: function(component, event, helper) {
        try {
            var pagedetails = component.get("v.pagedetail");
            var action = component.get("c.upatePageDetails");
            action.setParams({
                'pagedetails': pagedetails
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    $A.get('e.force:refreshView').fire();
                    helper.showToast("Success", "Success", "5000", "Page detail updated successfully..!");
                } else {
                    helper.showToast("Error", "Error", "5000", "Error...");
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

    selectObject: function(component, event, helper) {
        try {
            var userObj = component.find("SobjectList").get("v.value");
            var fieldId = component.get("v.WrapperList.AttributeList.Form_Field__c");

            var action = component.get("c.updateLookUp");
            action.setParams({
                'fieldId': fieldId,
                'userObj': userObj
            });
            action.setCallback(this, function(response) {});
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
                    $A.get('e.force:refreshView').fire();
                    helper.showToast("Success", "Success", "5000", "Duplicate successfully..!");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },
})