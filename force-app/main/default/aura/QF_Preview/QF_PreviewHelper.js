({
    fetchPreviewFormField: function(component, event, helper) {
        var formId = component.get("v.FormId");
        var action = component.get("c.getPreviewFormField");
        action.setParams({ 'formId': formId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var x = response.getReturnValue();
                console.log({ x });
                component.set("v.PreviewFormField1", response.getReturnValue().formName);
                var pageSize = component.get("v.pageSize");
                component.set("v.PreviewFormField", response.getReturnValue().PageWrapperList);
                component.set("v.totalRecords", component.get("v.PreviewFormField").length - 1);
                component.set("v.startPage", 0);
                component.set("v.endPage", pageSize - 1);
                var PaginationList = [];
                for (var i = 0; i < pageSize; i++) {
                    if (component.get("v.PreviewFormField").length > i)
                        PaginationList.push(response.getReturnValue().PageWrapperList[i]);
                }
                var FieldIdList = [];
                for (var i = 0; i < x.PageWrapperList.length; i++) {
                    for (var j = 0; j < x.PageWrapperList[i].FieldWrapperList.length; j++) {
                        var xxx = x.PageWrapperList[i].FieldWrapperList[j].FieldObj.Id;
                        FieldIdList.push(xxx);
                    }
                }
                console.log({ FieldIdList });
                component.set('v.FieldIdList', FieldIdList);

                component.set('v.PaginationList', PaginationList);
                console.log({ PaginationList });
            } else {
                console.log("error");
            }
        });
        $A.enqueueAction(action);
    },
    onNext: function(component, event, helper) {
        var sObjectList = component.get("v.PreviewFormField");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for (var i = end + 1; i < end + pageSize + 1; i++) {
            if (sObjectList.length > i) {
                Paginationlist.push(sObjectList[i]);
            }
            counter++;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage", start);
        component.set("v.endPage", end);
        component.set('v.PaginationList', Paginationlist);
    },
    onPrevious: function(component, event, helper) {
        var sObjectList = component.get("v.PreviewFormField");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for (var i = start - pageSize; i < start; i++) {
            if (i > -1) {
                Paginationlist.push(sObjectList[i]);
                counter++;
            } else {
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage", start);
        component.set("v.endPage", end);
        component.set('v.PaginationList', Paginationlist);
    },
    onSubmit: function(component, event, helper) {
        console.log("submit Clicked");
        var txt = event.getSource().get("v.label");


        var s = component.get('v.FieldIdList');
        console.log({ s });

        var action = component.get("c.FieldSubmit");
        action.setParams({
            'IdList': s
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log({ state });
            if (state === "SUCCESS") {
                var ss = response.getReturnValue();
                console.log({ ss });
            }
        });
        $A.enqueueAction(action);

        var formId = component.get("v.FormId");
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: "c:QF_ThankYou",
            componentAttributes: {
                'FormId': formId
            }
        });
        evt.fire();
    },

    sendHelper: function(component, getEmail, getSubject, getbody) {
        var action = component.get("c.sendMailMethod");
        action.setParams({
            'mMail': getEmail,
            'mSubject': getSubject,
            'mbody': getbody
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.mailStatus", true);
            }
        });
        $A.enqueueAction(action);
    },
})