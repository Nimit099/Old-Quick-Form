({
    fetchData: function(component, event, helper) {
        component.set("v.spinner", true);
        var formId = component.get("v.FormId");
        var action = component.get("c.getPreviewFormField");
        action.setParams({ 'formId': formId });
        action.setCallback(this, function(response) {
            var x = response.getReturnValue()
            console.log({ x });
            component.set("v.spinner", false);
            component.set("v.FormData", response.getReturnValue().formName);
            component.set("v.FormField", response.getReturnValue().PageWrapperList);

            if (x.formName.ThankYou_Page__c == 'ThankYou_URL') {
                window.open(x.formName.ThankYou_URL__c, '_self');
            }

            setTimeout(
                $A.getCallback(function() {
                    if (x.formName.ThankYou_Page__c == 'Redirect_Text_And_URL') {
                        var urlEvent = $A.get("e.force:navigateToURL");
                        urlEvent.setParams({
                            "url": x.formName.Redirect_URL__c
                        });
                        urlEvent.fire();
                    }
                }), 3000
            );
        });
        $A.enqueueAction(action);

    },

})