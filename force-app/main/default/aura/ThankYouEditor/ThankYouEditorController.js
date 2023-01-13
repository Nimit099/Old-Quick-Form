({
    // Init Method
    doInit: function(component, event, helper) {
        helper.init(component, event, helper);
    },

    // Toggle Field When User Create On Radio Button
    toggleFields: function(component, event, helper) {
        helper.togField(component, event, helper);
    },

    // Open Rich Text Model For Edit Thank You Label
    openRichText: function(component, event, helper) {
        component.set("v.showRichText", true);
        var rawhtml = component.find("editor").get("v.value");
        component.set("v.HtmlText", rawhtml);
    },

    // Close Rich Text Model
    closeModel: function(component, event, helper) {
        var oldThanksLabel = component.get("v.oldThanksLabel");
        component.set("v.formData.ThankYou_Label__c", oldThanksLabel);
        component.set("v.showRichText", false);
    },

    // Save Rich Text Data For Thank You Label
    saveRichText: function(component, event, helper) {
        component.set("v.showRichText", false);
        var formData = component.get("v.formData");
        component.set("v.oldThanksLabel", formData.ThankYou_Label__c);
    },

    // Convert Rich Text Data Into Html Text
    HtmlTextC: function(component) {
        var rawhtml = component.find("editor").get("v.value");
        component.set('v.HtmlText', rawhtml);
    },

    // Convert Html Text Data Into Rich Text
    RichTextC: function(component) {
        var rawhtml = component.get("v.HtmlText");
        component.set("v.formData.ThankYou_Label__c", rawhtml);
    },

    // Save Thank You Data In Form Record
    saveThanksData: function(component, event, helper) {
        helper.saveThanksData(component, event, helper);
    },

    // Cancel Thank You Data In Form Record
    cancelThanksData: function(component, event, helper) {
        var formData = component.get("v.formData");
        console.log({ formData });
        var oldFormData = component.get("v.oldFormData");
        console.log({ oldFormData });
        component.set("v.formData", oldFormData);
    },
})