({
    showException: function(component, event, helper) {
        component.set("v.displayException", true)
        var params = event.getParam('arguments');
        console.log({ params });
        component.set("v.message", params.message);
        component.set("v.label", params.label);
    },

    closeException: function(component, event, helper) {
        component.set("v.displayException", false);
    },

    reloadCmp: function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    }
})