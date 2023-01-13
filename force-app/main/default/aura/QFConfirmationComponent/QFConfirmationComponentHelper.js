({
    clickYes: function(component, event, helper) {
        try {
            var getTitle = component.get('v.getTitle');
            var cmpEvent = component.getEvent("cmpEvent");
            cmpEvent.setParams({
                "passMessage": "true",
                "getTitle": getTitle

            });
            cmpEvent.fire();

            // var getTitle = component.get('v.getTitle');
            // var cmpEvent2 = component.getEvent("cmpEvent2");
            // cmpEvent2.setParams({
            //     "passMessage2": "true",
            //     "getTitle2": getTitle

            // });
            // cmpEvent2.fire();



            component.set('v.showIt', false);



        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
        // return true;
    },
    clickNo: function(component, event, helper) {
        try {
            var getTitle = component.get('v.getTitle');
            var cmpEvent = component.getEvent("cmpEvent");
            cmpEvent.setParams({
                "passMessage": "false",
                "getTitle": getTitle

            });
            cmpEvent.fire();


            // var getTitle = component.get('v.getTitle');
            // var cmpEvent2 = component.getEvent("cmpEvent2");
            // cmpEvent2.setParams({
            //     "passMessage2": "false",
            //     "getTitle2": getTitle

            // });
            // cmpEvent2.fire();
            component.set('v.showIt', false);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }

    },


})