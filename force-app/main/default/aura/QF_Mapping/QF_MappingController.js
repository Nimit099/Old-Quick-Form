({

    fetchObjectField: function(component, event, helper) {
        helper.fetchObjectField(component, event, helper);
    },

    getfields: function(component, event, helper) {
        helper.getfieldshelper(component, event, helper);
    },

    deletein: function(component, event, helper) {
        helper.deleteinhelper(component, event, helper);
    },

    btnmenu: function(component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        if (selectedMenuItemValue == "Delete") {
            helper.deleteinhelper(component, event, helper);
        } else {
            helper.edithelper(component, event, helper);
        }
    },

    selectedsalfield: function(component, event, helper) {
        helper.selectedfieldmap(component, event, helper);
    },

    selectedsalfieldtwo: function(component, event, helper) {
        helper.selectedsalfieldfor(component, event, helper);
    },

    savevalue: function(component, event, helper) {
        helper.savevalue(component, event, helper);
    },
    cancelvalue: function(component, event, helper) {
        component.set("v.homecon", true);
        component.set("v.mapingcon", false);
        component.set("v.defvalue", 'Select Object');
        var a = component.get('c.fetchObjectField');
        $A.enqueueAction(a);
    },

    Addobject: function(component, event, helper) {
        component.set("v.mapingcon", true);
        component.set("v.homecon", false);
        component.set("v.disablevalue", false);
        component.set("v.deletebtndisable", true);
        var a = component.get('c.getfields');
        component.set("v.defvalue", 'Select Object');
        $A.enqueueAction(a);
    },
    addnewmapping: function(component, event, helper) {
        var lst = component.get("v.num");
        lst.push(lst.length);
        component.set("v.num", lst);
        component.set("v.mappingbtndisable", true);
    },

    remove: function(component, event, helper) {
        helper.remove(component, event, helper);
    },

    selectObjField: function(component, event, helper) {
        helper.selectObjFieldhelper(component, event, helper);
    },

    togglein: function(component, event, helper) {
        var aa = component.find("chkbox2").get("v.value");
        component.set("v.togglesecondary", aa);
    },

    toggleout: function(component, event, helper) {
        helper.toggleinhelper(component, event, helper);
    }
})