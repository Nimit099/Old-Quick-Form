({
    doAction: function(component, event, helper) {
        try {
            component.set('v.showIt', true);
            var params = event.getParam('arguments');
            component.set('v.message', params.message);
            component.set('v.getTitle', params.getTitle);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");


        }
    },
    clickYes: function(component, event, helper) {
        try {
            helper.clickYes(component, event, helper);

        } catch (e) {
            console.log({ e });
        }
    },
    clickNo: function(component, event, helper) {
        helper.clickNo(component, event, helper);

    },


})