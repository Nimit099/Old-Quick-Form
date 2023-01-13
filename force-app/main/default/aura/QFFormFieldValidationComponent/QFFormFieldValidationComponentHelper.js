({
    //get attribute list for edit section on init method
    getAttributeList: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var validationBar = document.querySelector('.fieldDiv2');
            validationBar.style.display = "block";
            var r = document.querySelector(':root');
            r.style.setProperty('--hidetabdisplay', 'none');
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
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong In Load Field Data, Please Reload Page");
                    } else {
                        var responseData = response.getReturnValue();
                        component.set("v.fields", x[0]);
                        component.set("v.WrapperList", response.getReturnValue());
                        component.set("v.deleteOptionLst", []);
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
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong In Load Form Data, Please Reload Page");
                    } else {
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
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong In Load Page Data, Please Reload Page");
                    } else {
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

    // save scale rating field data
    saveLikertValue: function(component, event, helper) {
        try {
            var fieldWrapper = component.get("v.WrapperList");
            var statementList = component.get("v.StatementList");
            var OptionList = component.get("v.OptionList");
            var statementStr = statementList.join(' ::: ');
            var OptionStr = OptionList.join(' ::: ');

            if (fieldWrapper.AttributeList.Instruction__c != undefined) {
                if (fieldWrapper.AttributeList.Instruction__c.trim() == '') {
                    fieldWrapper.AttributeList.Show_on_click__c = false;
                }
            } else {
                fieldWrapper.AttributeList.Show_on_click__c = false;
            }

            fieldWrapper.FieldList.forEach(function(value) {
                if (value.Likert__c == 'Statement') {
                    value.Likert_Data__c = statementStr;
                } else if (value.Likert__c == 'Option') {
                    value.Likert_Data__c = OptionStr;
                }
            });

            var action = component.get("c.saveAttributeList");
            action.setParams({
                wlist: fieldWrapper,
                deleteOptionLst: []
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Save Data, Please Reload Page");
                } else {
                    var dataMap = response.getReturnValue();
                    component.set("v.WrapperList", dataMap);
                    var evt = $A.get("e.c:QFFormBuilderEvent");
                    evt.setParams({ "formData": 'Refresh' });
                    evt.fire();
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // delete radio, checkbox, dropdown values
    handlefieldDelete: function(component, event, helper) {
        try {
            var deleteOptionLst = component.get("v.deleteOptionLst");
            var WrapperList = component.get("v.WrapperList");
            var valueId = event.getSource().get("v.name");
            var valueIndex = event.getSource().get("v.value");
            var valueLst = [];
            if (WrapperList.FieldList.length > 1) {
                var i = 0;
                WrapperList.FieldList.forEach((element, index) => {
                    if (index != valueIndex) {
                        element.Value_Sequence__c = i;
                        valueLst.push(element);
                        i += 1;
                    }
                });

                component.set("v.WrapperList.FieldList", valueLst);
                if (valueId != undefined) {
                    deleteOptionLst.push(valueId);
                }
                component.set("v.deleteOptionLst", deleteOptionLst);
            } else {
                component.find("toastCmp").showToastModel("Minimum One Value Is Required", "Error");
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // save form data from edit section
    saveFormDetails: function(component, event, helper) {
        try {
            var formdetails = component.get("v.formdetail");
            formdetails.Title__c = formdetails.Title__c.replace(/\s+/g, " ").trim();
            var formTitle = formdetails.Title__c;
            if (formTitle.trim() == "") {
                component.find("toastCmp").showToastModel("Form title should not null..", "Error");
            } else {
                var action = component.get('c.updateFormDetails');
                action.setParams({
                    'formdetails': formdetails,
                    'formTitle': formTitle
                });
                action.setCallback(this, function(response) {
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong In Save Form Data, Please Reload Page");
                    } else if (response.getReturnValue() === "error") {
                        component.find("toastCmp").showToastModel("Don't allow duplicate form name", "Error");
                    } else {
                        var evt = $A.get("e.c:QFFormBuilderEvent");
                        evt.setParams({ "formData": 'Refresh' });
                        evt.fire();
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // save page data from edit section
    savePageDetails: function(component, event, helper) {
        try {
            var pagedetails = component.get("v.pagedetail");
            pagedetails.Title__c = pagedetails.Title__c.replace(/\s+/g, " ").trim();
            var pageTitle = pagedetails.Title__c;
            if (pageTitle.trim() == "") {
                component.find("toastCmp").showToastModel("Page title should not null..", "Error");
            } else {
                var action = component.get("c.upatePageDetails");
                action.setParams({
                    'pagedetails': pagedetails
                });
                action.setCallback(this, function(response) {
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong In Save Page Data, Please Reload Page");
                    } else {
                        var evt = $A.get("e.c:QFFormBuilderEvent");
                        evt.setParams({ "formData": 'Refresh' });
                        evt.fire();
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // For Save Lookup Field Object Data In Field Record
    selectObject: function(component, event, helper) {
        try {
            var userObj = component.find("SobjectList").get("v.value");
            var fieldId = component.get("v.WrapperList.AttributeList.Form_Field__c");

            var action = component.get("c.updateLookUp");
            action.setParams({
                'fieldId': fieldId,
                'userObj': userObj
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Save Object Data, Please Reload Page");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Delete Field From Form
    deleteRecord: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var fieldId = component.get("v.WrapperList.AttributeList.Form_Field__c");
            var fieldtype = component.get("v.WrapperList.AttributeList.Form_Field__r.Data_Record_Id__c");
            var action = component.get("c.deletefieldRecord");
            action.setParams({ 'fieldId': fieldId, 'fieldtype': fieldtype });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Delete Field, Please Reload Page");
                } else {
                    component.set("v.spinner", false);
                    var evt = $A.get("e.c:QFFormBuilderEvent");
                    evt.setParams({ "formData": 'Refresh' });
                    evt.fire();
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Create Duplicate Field In Form
    duplicateRecordhelper: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var fieldId = component.get("v.WrapperList.AttributeList.Form_Field__c");
            var action = component.get("c.duplicatefieldRecord");
            action.setParams({ 'fieldId': fieldId });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Duplicate Field, Please Reload Page");
                } else {
                    component.set("v.spinner", false);
                    var evt = $A.get("e.c:QFFormBuilderEvent");
                    evt.setParams({ "formData": 'Refresh' });
                    evt.fire();
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },
})