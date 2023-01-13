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

    lookupfield: function(component, event, helper) {
        helper.lookupfieldhelper(component, event, helper);
    },

    remove: function(component, event, helper) {
        helper.remove(component, event, helper);
    },

    addnewmapping: function(component, event, helper) {
        helper.addnewmappinginhelper(component, event, helper);
    },

    cancelvalue: function(component, event, helper) {
        var mappingobjectlist = component.get("v.mappingobjectlist");
        // component.set("v.spinner", true);
        console.log({ mappingobjectlist });
        console.log(mappingobjectlist.length);
        if (mappingobjectlist.length == 0) {
            component.set("v.homecon", true);
        } else {
            component.set("v.homecon", false);
            component.set("v.disablevalue", true);
        }
        component.set("v.selectedFieldsVar", '');
        component.set("v.num", '');
        component.set("v.mapingcon", false);
        component.set("v.mapingcon_edit", false);
        component.set("v.num_edit", []);
        component.set("v.defvalue", 'Select Object');
        component.set("v.edit_object_name", "");
        console.log('end cancel');
        helper.fetchObjectField(component, event, helper);
        // component.set("v.spinner", false);
    },

    savevalue: function(component, event, helper) {
        helper.savevalue(component, event, helper);
    },

    edit_mapping: function(component, event, helper) {
        component.set("v.edit_button_validation", 'Edit');
        helper.editinhelper(component, event, helper);
    },

    remove_mapping: function(component, event, helper) {
        component.set("v.edit_button_validation", 'Delete');
        var objname = event.target.name;
        component.set("v.deletemapping", objname);
        var modal = component.find("detete_conferm");
        var modalBackdrop = component.find("ModalBackdrop_detete_conferm");
        component.set("v.emailRecipientForList", '');
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        // helper.deleteinhelper(component, event, helper);
    },

    confirm_no: function(component, event, helper) {
        var modal = component.find("detete_conferm");
        var modalBackdrop = component.find("ModalBackdrop_detete_conferm");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    confirm_yes: function(component, event, helper) {
        var objname = event.target.name;
        console.log(objname);
        var modal = component.find("detete_conferm");
        var modalBackdrop = component.find("ModalBackdrop_detete_conferm");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        helper.deleteinhelper(component, event, helper, objname);
    },

    toggleout: function(component, event, helper) {
        helper.toggleinhelper(component, event, helper);
    },

})