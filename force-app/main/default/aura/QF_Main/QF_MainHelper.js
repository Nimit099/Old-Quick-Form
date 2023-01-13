({
    fetchQuickFormFieldAttValue: function(component, event, helper) {
        component.set('v.myVal', '<p><script>alert(this)</script></p><p>hi!</p>');
        component.set("v.spinner", true);
        var formId = component.get("v.FormId");
        var action = component.get("c.fetchQuickFormField");
        action.setParams({ 'formId': formId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                component.set("v.baseField", response.getReturnValue().basefield);
                response.getReturnValue()
                var inList = document.querySelectorAll('.example-dropzone input');
                for (var s of inList) {
                    s.disable = true;
                }
                component.set("v.spinner", false);
            } else {
                component.set("v.spinner", false);
                helper.showToast("Error", "Error Occur", "Something went wrong to fetch data");
            }
        });
        $A.enqueueAction(action);
    },

    fetchSearchField: function(component, event, helper) {
        try {
            component.set("v.FormPageFieldValueWrapper.basefield", component.get("v.baseField"));
        } catch (error) {
            console.log(error);
        }
    },
})