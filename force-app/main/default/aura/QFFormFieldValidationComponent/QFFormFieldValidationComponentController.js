({
    // get attribute list for edit section on init method
    FetchAttributeList: function(component, event, helper) {
        helper.getAttributeList(component, event, helper);
    },

    // Save Radio Button, CheckBox and Dropdown Field Values
    addvalue: function(component, event, helper) {
        try {
            var lst = component.get("v.WrapperList.FieldList");
            var formId = [];
            for (var x of lst) {
                formId.push(x.Form__c);
            }
            lst.push({ "Name": "Option", Form_Field__c: component.get("v.WrapperList.AttributeList.Form_Field__c"), Form__c: formId[0], Value_Sequence__c: lst.length });
            component.set("v.WrapperList.FieldList", lst);
        } catch (error) {
            console.log({ error });
        }
    },

    // ---------------- Linkert Scale Rating Start ----------------
    addStatement: function(component, event, helper) {
        try {
            var statementList = component.get("v.StatementList");
            statementList.push('Statement');
            component.set("v.StatementList", statementList);
        } catch (error) {
            console.log({ error });
        }
    },

    addOption: function(component, event, helper) {
        try {
            var optionList = component.get("v.OptionList");
            optionList.push('Option');
            component.set("v.OptionList", optionList);
        } catch (error) {
            console.log({ error });
        }
    },

    changeStatement: function(component, event, helper) {
        try {
            var index = event.target.id;
            var value = event.getSource().get("v.value")
            var statement = component.get("v.StatementList");
            statement[index] = value;
            component.set("v.StatementList", statement);
        } catch (error) {
            console.log({ error });
        }
    },

    changeOption: function(component, event, helper) {
        try {
            var index = event.target.id;
            var value = event.getSource().get("v.value")
            var Option = component.get("v.OptionList");
            Option[index] = value;
            component.set("v.OptionList", Option);
        } catch (error) {
            console.log({ error });
        }
    },

    deleteStatement: function(component, event, helper) {
        try {
            var index = event.target.id;
            var statement = component.get("v.StatementList");
            statement.splice(index, 1);
            component.set("v.StatementList", statement);
        } catch (error) {
            console.log({ error });
        }
    },

    deleteOption: function(component, event, helper) {
        try {
            var index = event.target.id;
            var Option = component.get("v.OptionList");
            Option.splice(index, 1);
            component.set("v.OptionList", Option);
        } catch (error) {
            console.log({ error });
        }
    },

    // save scale rating field data
    saveLikertValue: function(component, event, helper) {
        helper.saveLikertValue(component, event, helper);
    },
    // ---------------- Linkert Scale Rating End ----------------

    // for reset min and max character limit of fields
    resetCharacter: function(component, event, helper) {
        try {
            component.set("v.WrapperList.AttributeList.Min_no_of_character__c", '');
            component.set("v.WrapperList.AttributeList.Max_no_of_character__c", '');
        } catch (error) {
            console.log({ error });
        }
    },

    // save file field data
    handledelete: function(component, event, helper) {
        helper.handlefieldDelete(component, event, helper)
    },

    // save form data from edit section
    saveFormDetails: function(component, event, helper) {
        helper.saveFormDetails(component, event, helper);
    },

    // save page data from edit section
    savePageDetails: function(component, event, helper) {
        helper.savePageDetails(component, event, helper);
    },

    // ---------------- Rich Text Field Start ----------------
    openRichText: function(component, event, helper) {
        try {
            var fieldType = component.get("v.WrapperList.AttributeList.Form_Field__r.Data_Record_Id__c");
            if (fieldType == 'QFTERMSOFSERVICE') {
                component.set("v.termRichText", true);
                var rawhtml = component.find("textEditor").get("v.value");
            } else {
                component.set("v.showRichText", true);
                var rawhtml = component.find("editor").get("v.value");
            }
            component.set("v.HtmlText", rawhtml);
        } catch (error) {
            console.log({ error });
        }
    },

    closeModel: function(component, event, helper) {
        try {
            var fieldType = component.get("v.WrapperList.AttributeList.Form_Field__r.Data_Record_Id__c");
            if (fieldType == 'QFTERMSOFSERVICE') {
                component.set("v.termRichText", false);
            } else {
                component.set("v.showRichText", false);
            }
        } catch (error) {
            console.log({ error });
        }
    },
    HtmlTextC: function(component) {
        try {
            var fieldType = component.get("v.WrapperList.AttributeList.Form_Field__r.Data_Record_Id__c");
            if (fieldType == 'QFTERMSOFSERVICE') {
                var rawhtml = component.find("textEditor").get("v.value");
            } else {
                var rawhtml = component.find("editor").get("v.value");
            }
            component.set('v.HtmlText', rawhtml);
        } catch (error) {
            console.log({ error });
        }
    },

    RichTextC: function(component) {
        try {
            var fieldType = component.get("v.WrapperList.AttributeList.Form_Field__r.Data_Record_Id__c");
            var rawhtml = component.get("v.HtmlText");
            if (fieldType == 'QFTERMSOFSERVICE') {
                component.set("v.WrapperList.AttributeList.Agreement_Text__c", rawhtml);
            } else {
                component.set("v.WrapperList.AttributeList.RichText__c", rawhtml);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    OutRichC: function(component) {
        try {
            var fieldType = component.get("v.WrapperList.AttributeList.Form_Field__r.Data_Record_Id__c");
            if (fieldType == 'QFTERMSOFSERVICE') {
                var rawhtml = component.find("textEditor").get("v.value");
                component.set("v.WrapperList.AttributeList.Agreement_Text__c", rawhtml);
                component.set("v.termRichText", false);
            } else {
                var rawhtml = component.find("editor").get("v.value");
                component.set("v.WrapperList.AttributeList.RichText__c", rawhtml);
                component.set("v.showRichText", false);
            }
        } catch (error) {
            console.log({ error });
        }
    },
    // ---------------- Rich Text Field End ----------------

    // For Save Lookup Field Object Data In Field Record
    selectObject: function(component, event, helper) {
        helper.selectObject(component, event, helper);
    },

    // For Delete Field From Form
    deleteFieldRecord: function(component, event, helper) {
        helper.deleteRecord(component, event, helper);
    },

    // For Create Duplocate Field In Form
    duplicateRecord: function(component, event, helper) {
        component.set("v.duplicateBtn", true);
        helper.duplicateRecordhelper(component, event, helper);
    },

    // for cancel validation fields
    cancelValidation: function(component, event, helper) {
        try {
            var validationBar = document.querySelector('.fieldDiv2');
            validationBar.style.display = "none";
            var r = document.querySelector(':root');
            r.style.setProperty('--hidetabdisplay', 'block');
        } catch (error) {
            console.log({ error });
        }
    },

    // for show toast message if min character limit is equal to max limit
    changeMinValue: function(component, event, helper) {
        try {
            var WrapperList = component.get("v.WrapperList");
            if (parseInt(WrapperList.AttributeList.Min_no_of_character__c) + 1 == WrapperList.AttributeList.Max_no_of_character__c) {
                component.find("toastCmp").showToastModel("Increase Max Character First For Increase Min Character", "Error");
            }
        } catch (error) {
            console.log({ error });
        }

    },

    // for show toast message if min character limit is equal to max limit
    changeMaxValue: function(component, event, helper) {
        try {
            var WrapperList = component.get("v.WrapperList");
            if (WrapperList.AttributeList.Min_no_of_character__c == WrapperList.AttributeList.Max_no_of_character__c) {
                component.find("toastCmp").showToastModel("Decrease Min Character First For Decrease Max Character", "Error");
            }
        } catch (error) {
            console.log({ error });
        }
    },

})