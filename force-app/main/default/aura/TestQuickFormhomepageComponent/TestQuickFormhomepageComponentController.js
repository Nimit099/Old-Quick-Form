({
    
    openModal: function(component, event, helper) {
        helper.openModal(component, event, helper);        
    },

    closeModal: function(component, event, helper) {
        helper.closeModal(component, event, helper);
    },

    createForm: function(component, event, helper) {
        // var formTitle = component.get("v.Form.Title__c");
        // var toastEvent = $A.get('e.force:showToast');
        // if(formTitle == ""){
        //     toastEvent.setParams({
        //         'title': 'Error!...',
        //         'type': 'error',
        //         'mode': 'dismissable',
        //         'message' : 'Please Fill the Form Title..'
        //     });
        //     toastEvent.fire();  
        // }
        // else{
            helper.createForm(component, event, helper);
        // }
    },

    doInit : function(component, event, helper) {
        helper.getFormList(component); 
    },
    ondelete : function(component, event, helper) {
        if(confirm('Are you sure?'))
        var Id = event.getSource().get('v.name');
        helper.ondelete(component,event,helper,Id);
        helper.getFormList(component); 
    },
    onedit : function(component, event, helper) {
        var msg ='Are you sure you want to edit this form?';
        if(!confirm(msg)){
            return false;        }
        else {
            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:TestQuickFormComponent",
                componentAttributes :{
                    FormId : event.getSource().get("v.name") 
            }
        });
        evt.fire();
        }
    } ,
    onpreview : function(component, event, helper) {
        var msg ='Are you sure you want to preview this form?';
        if(!confirm(msg)){
            return false;
        }
        else {
            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:PreviewFormComponent",
                componentAttributes :{
                    FormId : event.getSource().get("v.name") 
            }
        });
        evt.fire();
        }
    },
    
})