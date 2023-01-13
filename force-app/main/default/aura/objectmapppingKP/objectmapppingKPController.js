({

    fetchObjectField: function(component, event, helper) {
        helper.fetchObjectField(component, event, helper);
    },

    getfields: function(component, event, helper) {
        helper.getfieldshelper(component, event, helper);
    },

    Addobject: function(component, event, helper) {
        component.set("v.mapingcon", true);
        component.set("v.homecon", false);
        component.set("v.disablevalue", false);
        component.set("v.deletebtndisable", true);
        var a = component.get('c.getfields');
        component.set("v.defvalue", 'Select Object');
        component.set("v.edit_button_validation", 'add new mapping');
        $A.enqueueAction(a);
    },

    selectedsalfield: function(component, event, helper) {
        helper.selectedfieldmap(component, event, helper);
    },

    selectObjField: function(component, event, helper) {
        helper.selectObjFieldhelper(component, event, helper);
    },

    selectedsalfieldtwo: function(component, event, helper) {
        helper.selectedsalfieldfor(component, event, helper);
    },

    lookupfield:function(component, event, helper){
        helper.lookupfieldhelper(component, event, helper);
    },

    remove: function(component, event, helper) {
        helper.remove(component, event, helper);
    },

    addnewmapping: function(component, event, helper) {
        helper.addnewmappinginhelper(component, event, helper);
    },

    cancelvalue: function(component, event, helper) {
        // component.set("v.spinner", true);
        var mappingobjectlist = component.get("v.mappingobjectlist");
        console.log(mappingobjectlist.length);
        if(mappingobjectlist.length == 0){
            component.set("v.homecon", true);
            component.set("v.mapingcon", false);
            component.set("v.mapingcon_edit", false);
            component.set("v.num_edit", []);
            component.set("v.defvalue", 'Select Object');
        }
        else{
            component.set("v.homecon", false);
            component.set("v.mapingcon", false);
            component.set("v.disablevalue", true);
            component.set("v.mapingcon_edit", false);
            component.set("v.num_edit", []);
            component.set("v.defvalue", 'Select Object');
        }
        // component.set("v.spinner", false);
        // var a = component.get('c.fetchObjectField');
        // $A.enqueueAction(a);
    },

    savevalue: function(component, event, helper) {
        helper.savevalue(component, event, helper);
    },

    btnmenu: function(component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        if (selectedMenuItemValue == "Delete") {
            component.set("v.edit_button_validation", 'Delete');
            console.log(selectedMenuItemValue);
            helper.deleteinhelper(component, event, helper);
        }
        else if(selectedMenuItemValue == 'Edit'){
            component.set("v.edit_button_validation", 'Edit');
            helper.editinhelper(component, event, helper);
        }
    },

    toggleout: function(component, event, helper) {
        helper.toggleinhelper(component, event, helper);
    },
})