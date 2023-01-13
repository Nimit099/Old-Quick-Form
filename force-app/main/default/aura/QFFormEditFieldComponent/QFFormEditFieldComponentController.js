({
    // For Save Attribute Value
    saveValue: function(component, event, helper) {
        helper.saveList(component, event, helper);
    },

    // For Delete Field From Form
    deleteFieldRecord: function(component, event, helper) {
        helper.deleteRecord(component, event, helper);
    },

    // For Create Duplocate Field In Form
    duplicateRecord: function(component, event, helper) {
        component.set("v.duplicateBtn", true);
        helper.duplicateRecordhelper(component, event, helper);
    },

    // for cancel validation fields
    cancelValidation: function(component, event, helper) {
        try {
            var validationBar = document.querySelector('.fieldDiv2');
            validationBar.style.display = "none";
            var r = document.querySelector(':root');
            r.style.setProperty('--hidetabdisplay', 'block');
        } catch (error) {
            console.log({ error });
        }
    },
})