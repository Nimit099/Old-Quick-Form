({
    // For Save Attribute Value
    saveList: function(component, event, helper) {
        try {
            if (component.get("v.WrapperList.AttributeList.Add_Prefix_Inside_The_Field__c") != true) {
                component.set("v.WrapperList.AttributeList.Prefix__c", '');
            }
            var WrapperList = component.get("v.WrapperList");
            if (WrapperList.AttributeList.Instruction__c != undefined) {
                if (WrapperList.AttributeList.Instruction__c.trim() == '') {
                    WrapperList.AttributeList.Show_on_click__c = false;
                }
            } else {
                WrapperList.AttributeList.Show_on_click__c = false;
            }
            if (WrapperList.AttributeList.Placeholder__c != undefined) {
                if (WrapperList.AttributeList.Placeholder__c.trim() == '') {
                    WrapperList.AttributeList.Placeholder_text__c = false;
                }
            } else {
                WrapperList.AttributeList.Placeholder_text__c = false;
            }
            if (WrapperList.AttributeList.Prefix__c != undefined) {
                if (WrapperList.AttributeList.Prefix__c.trim() == '') {
                    WrapperList.AttributeList.Add_Prefix_Inside_The_Field__c = false;
                }
            } else {
                WrapperList.AttributeList.Add_Prefix_Inside_The_Field__c = false;
            }

            var empltyName = []
            WrapperList.FieldList.forEach(element => {
                if (element.Name == '') {
                    empltyName.push(element.Id)
                    component.find("toastCmp").showToastModel("Something went wrong to fetch data", "error");
                }
            });
            var deleteOptionLst = component.get("v.deleteOptionLst");
            if (empltyName.length == 0) {
                var action = component.get("c.saveAttributeList");
                action.setParams({
                    wlist: WrapperList,
                    deleteOptionLst: deleteOptionLst
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
            }
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

    // For Create Duplocate Field In Form
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
                    component.set("v.duplicateBtn", false);
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