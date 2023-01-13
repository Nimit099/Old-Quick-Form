({
    saveValue: function(component, event, helper) {
        helper.saveList(component, event, helper);
    },

    deleteFieldRecord: function(component, event, helper) {
        helper.deleteRecord(component, event, helper);
    },

    duplicateRecord: function(component, event, helper) {
        helper.duplicateRecordhelper(component, event, helper);
    },

    cancelValidation: function(component, event, helper) {
        try {
            // $A.get('e.force:refreshView').fire();
            var validationBar = document.querySelector('.fieldDiv2');
            validationBar.style.display = "none";
            var r = document.querySelector(':root');
            r.style.setProperty('--hidetabdisplay', 'block');
        } catch (error) {
            console.log({ error });
        }
    },
})