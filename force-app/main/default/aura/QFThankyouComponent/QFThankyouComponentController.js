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
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        var thanksLabel = document.querySelector('.thanksLabel');
        thanksLabel.style.visibility = 'hidden';
    },

    // Close Rich Text Model
    closeModel: function(component, event, helper) {
        var oldThanksLabel = component.get("v.oldThanksLabel");
        component.set("v.formData.ThankYou_Label__c", oldThanksLabel);
        var thanksLabel = document.querySelector('.thanksLabel');
        thanksLabel.style.visibility = 'visible';
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    // Save Rich Text Data For Thank You Label
    saveRichText: function(component, event, helper) {
        var formData = component.get("v.formData");
        component.set("v.oldThanksLabel", formData.ThankYou_Label__c);
        var thanksLabel = document.querySelector('.thanksLabel');
        thanksLabel.style.visibility = 'visible';
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
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
        helper.init(component, event, helper);
    },
})