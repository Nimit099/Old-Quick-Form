({
    FetchAttributeList: function(component, event, helper) {
        helper.getAttributeList(component, event, helper);
    },

    addvalue: function(component, event, helper) {
        var lst = component.get("v.WrapperTest.FieldList");
        console.log(lst);
        var xy = [];
        console.log(xy);
        for (var x of lst) {
            xy.push(x.Form__c);
        }
        lst.push({ "Name": "Option", Form_Field__c: component.get("v.WrapperTest.AttributeList.Form_Field__c"), Form__c: xy[0] });
        console.log(component.get("v.WrapperTest.AttributeList.Form_Field__c"));
        component.set("v.WrapperTest.FieldList", lst);
    },

    addStatement: function(component, event, helper) {
        var statementList = component.get("v.StatementList");
        statementList.push('Statement');
        component.set("v.StatementList", statementList);
    },

    addOption: function(component, event, helper) {
        var optionList = component.get("v.OptionList");
        optionList.push('Option');
        component.set("v.OptionList", optionList);
    },

    changeStatement: function(component, event, helper) {
        var index = event.target.id;
        var value = event.getSource().get("v.value")

        var statement = component.get("v.StatementList");
        statement[index] = value;
        component.set("v.StatementList", statement);
    },

    changeOption: function(component, event, helper) {
        var index = event.target.id;
        var value = event.getSource().get("v.value")

        var Option = component.get("v.OptionList");
        Option[index] = value;
        component.set("v.OptionList", Option);
    },

    deleteStatement: function(component, event, helper) {
        var index = event.target.id;
        var statement = component.get("v.StatementList");
        statement.splice(index, 1);
        component.set("v.StatementList", statement);
    },

    deleteOption: function(component, event, helper) {
        var index = event.target.id;
        var Option = component.get("v.OptionList");
        Option.splice(index, 1);
        component.set("v.OptionList", Option);
    },

    saveValue: function(component, event, helper) {
        helper.saveList(component, event, helper);
    },

    saveLikertValue: function(component, event, helper) {
        helper.saveLikertValue(component, event, helper);
    },

    deleteFieldRecord: function(component, event, helper) {
        helper.deleteRecord(component, event, helper);
    },

    duplicateRecord: function(component, event, helper) {
        helper.duplicateRecordhelper(component, event, helper);
    },

    cancelValidation: function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },

    resetCharacter: function(component, event, helper) {
        component.set("v.WrapperTest.AttributeList.Min_no_of_character__c", '');
        component.set("v.WrapperTest.AttributeList.Max_no_of_character__c", '');
    },

    handledelete: function(component, event, helper) {
        helper.handlefieldDelete(component, event, helper)
    },

    saveFormDetails: function(component, event, helper) {
        helper.saveFormDetails(component, event, helper);
    },

    savePageDetails: function(component, event, helper) {
        helper.savePageDetails(component, event, helper);
    },

    handleCancel: function(component, event, helper) {
        component.set('v.fields', 'null');
        return false;
    },

    openRichText: function(component, event, helper) {
        component.set("v.showRichText", true);
        var rawhtml = component.find("editor").get("v.value");
        component.set("v.HtmlText", rawhtml);
    },

    closeModel: function(component, event, helper) {
        component.set("v.showRichText", false);
    },
    HtmlTextC: function(component) {
        var rawhtml = component.find("editor").get("v.value");
        component.set('v.HtmlText', rawhtml);
    },

    RichTextC: function(component) {
        var rawhtml = component.get("v.HtmlText");
        component.set("v.WrapperTest.AttributeList.RichText__c", rawhtml);
    },

    OutRichC: function(component) {
        var rawhtml = component.find("editor").get("v.value");
        component.set("v.WrapperTest.AttributeList.RichText__c", rawhtml);

        var id = component.get("v.WrapperTest");
        var action = component.get("c.saveAttributeList");
        action.setParams({
            wlist: id
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var dataMap = response.getReturnValue();
                component.set("v.WrapperTest", dataMap);
                var x = component.get("v.WrapperTest");
                $A.get('e.force:refreshView').fire();
                helper.showToast("Success", "Success", "5000", "Apply successfully..!");
            }
        });
        $A.enqueueAction(action);

        component.set("v.showRichText", false);
    },
    callParentMethod: function(component, event, helper) {
        //Call Parent aura method
        var parentComponent = component.get("v.parent");
        parentComponent.greetingMethod()
    },

    selectObject: function(component, event, helper) {
        helper.selectObject(component, event, helper);
    },

})