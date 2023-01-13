({
    fetchData: function(component, event, helper) {
        component.set("v.spinner", true);
        var formId = component.get("v.FormId");
        console.log({ formId });
        var action = component.get("c.getPreviewFormField");
        action.setParams({ 'formId': formId });
        action.setCallback(this, function(response) {
            var wrapperData = response.getReturnValue()
            console.log({ wrapperData });
            var formData = wrapperData.formName;
            var formField = wrapperData.PageWrapperList;
            console.log({ formField });
            component.set("v.spinner", false);
            component.set("v.FormData", formData);
            component.set("v.FormField", formField);

            if (wrapperData.formName.ThankYou_Page__c == 'ThankYou_URL') {
                window.open(wrapperData.formName.ThankYou_URL__c, '_self');
            }
            setTimeout(
                $A.getCallback(function() {
                    if (wrapperData.formName.ThankYou_Page__c == 'Redirect_Text_And_URL') {
                        var urlEvent = $A.get("e.force:navigateToURL");
                        urlEvent.setParams({
                            "url": wrapperData.formName.Redirect_URL__c
                        });
                        urlEvent.fire();
                    }
                }), 3000
            );
        });
        $A.enqueueAction(action);
    },
})