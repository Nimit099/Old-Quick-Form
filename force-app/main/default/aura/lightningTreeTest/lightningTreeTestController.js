({
    doInit: function(component, event, helper) {
        console.log('doInit of component called');

        // var trecid = component.get('v.ltngcurrentRecId');
        // var tsObjectName = component.get('v.ltngSobjectname');

        var tparentFieldAPIname = component.get('v.ltngParentFieldAPIName');
        var tlabelFieldAPIName = component.get('v.ltngLabelFieldAPIName');
        // helper.callToServer(
        helper.callToServer(
            component,
            "c.findHierarchyData",
            function(response) {
                var apexResponse = response;
                var roles = {};
                console.log('*******apexResponse:' + JSON.stringify(apexResponse));

                // var results = apexResponse;

                roles[undefined] = { Name: "Root", items: [] };

                apexResponse.forEach(function(v) {
                    //var sk = v.rec;
                    //var labelValue= sk[tlabelFieldAPIName];
                    roles[v.rec.Id] = {
                        label: v.rec[tlabelFieldAPIName],
                        name: v.rec.Id,
                        expanded: v.expanded,
                        items: []
                    };
                });
                console.log('*******roles:' + JSON.stringify(roles));
                apexResponse.forEach(function(v) {
                    roles[v.rec[tparentFieldAPIname]].items.push(roles[v.rec.Id]);
                });
                component.set("v.items", roles[undefined].items);
                console.log('*******roles[undefined].items:' + JSON.stringify(roles[undefined].items));
            }, {
                recId: component.get('v.ltngcurrentRecId'),
                sObjectName: component.get('v.ltngSobjectname'),
                parentFieldAPIname: component.get('v.ltngParentFieldAPIName'),
                labelFieldAPIName: component.get('v.ltngLabelFieldAPIName')
            }
        );

    },
    handleSelect: function(cmp, event, helper) {
        var myName = event.getParam('name');
        console.log('folder id ---> ' + myName);
    }
})