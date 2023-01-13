({
    fetchQuickFormFieldAttValue : function(component,event,helper){
        component.set("v.spinner", true);
        var formId = component.get("v.FormId");
        var action = component.get("c.fetchQuickFormField");
        action.setParams({'formId' : formId});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {            
                var x = response.getReturnValue(); 
                console.log({x});
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());          
                component.set("v.spinner", false);                       
            }else{
                component.set("v.spinner", false);  
                helper.showToast("Error","Error Occur","Something went wrong to fetch data");
            }
        });
        $A.enqueueAction(action);
    },
    formtitle : function(component,event,helper){
        var formname = event.getSource().get('v.value');
        if(formname == ""){
            helper.showToast("Error","Error","Cannot allow null value For form Title");
        }else{
            var formId = component.get("v.FormId");
            var action = component.get("c.updateFormName");
            action.setParams({'formId' : formId , 'formname' : formname});
            action.setCallback(this, function(response){
                var state = response.getState();
                if(response.getReturnValue() == 'error'){
                    helper.showToast("Error","Error","Cannot allow duplicate value in Form Title");
                }else{
                    component.set("v.editFormTitle",false);
                    helper.showToast("Success","Success","Form Title updated successfully");
                }
                // if(state === "SUCCESS"){
                //     component.set("v.editFormTitle",false);
                // }else{
                //     helper.showToast("Error","Error Occur","Something went wrong to update form title");
                // }
            });
        }
        $A.enqueueAction(action);
    },
    pagetitle : function(component,event,helper){
        var pagetitle = event.getSource().get('v.value');
        var pageId = event.target.parentNode.id;
        var formId = component.get("v.FormId"); 
        var action = component.get("c.updatePageTitle");
        action.setParams({'formId' : formId ,'pageId' : pageId, 'pagetitle' : pagetitle});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.editPageTitle",false);
            }else{
                helper.showToast("Error","Error Occur","Something went wrong to update page title");
            }
        });
        $A.enqueueAction(action);
    },
    pagesubtitle: function(component,event,helper){
        var pagesubtitle = event.getSource().get('v.value');
        var pageId = event.target.parentNode.id;
        var formId = component.get("v.FormId");
        var action = component.get("c.updatePageSubtitle");
        action.setParams({'formId' : formId ,'pageId' : pageId, 'pagesubtitle' : pagesubtitle});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.editPageSubTitle",false);
            }else{
                helper.showToast("Error","Error Occur","Something went wrong to update page sub title");
            }
        });
        $A.enqueueAction(action);
    },
    // onaddpage : function(component,event,helper,formId){
    //     component.set("v.spinner", true);
    //     var formId = component.get("v.FormId");  
    //     var action = component.get('c.addNewPage');
    //     action.setParams({'formId': formId});
    //     action.setCallback(this,function(response){
    //         var state = response.getState();
    //         if (state === "SUCCESS") {  
    //             component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
    //             helper.showToast("Success","Success","Page added successfully");
    //             component.set("v.spinner", false);                
    //         }else{ 
    //             component.set("v.spinner", false);
    //             helper.showToast("Error","Error Occur","Something went wrong to add page");
    //         }
    //     });
    //     $A.enqueueAction(action);                  
	// },
    deletepage :function(component,event,helper){
        component.set("v.spinner", true);
        var pageId = event.getSource().get('v.name');
        var formId = component.get("v.FormId"); 
        var action = component.get("c.DeletePage");
        action.setParams({'pageId' : pageId , 'formId' : formId});
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                helper.showToast("Success","Success","Page delete successfully");
                component.set("v.spinner", false);
            }else{
                component.set("v.spinner", false);
                helper.showToast("Error","Error Occur","Something went wrong to delete page");                
            }
        });
        $A.enqueueAction(action);
    },
    insertFieldRecord : function(component,event,helper,FormId,PageId,Fieldid){
        component.set("v.spinner", true);
        var action = component.get('c.addFieldRecord');
        action.setParams({'formId': FormId , 'pageId' : PageId ,'fieldId' : Fieldid});
        action.setCallback(this,function(response){   
            component.set("v.spinner", false);
            var state = response.getState();
            if (state === "SUCCESS") {  
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                component.set("v.spinner", false);                
            }
            else{
                component.set("v.spinner", false);
                helper.showToast("Error","Error Occur","Something went wrong to insert field","5000");
            }
        });   
        $A.enqueueAction(action);
    },    
    SequenceSave: function(component,event,helper,Listt){
        var action = component.get("c.SequenceSave");
        action.setParams({
            'Listt' : Listt 
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            var res = response.getReturnValue();
            if (state === "SUCCESS") {
                //console.log("Complete");
            }else{
                //console.log("Error");
            }
        });
        $A.enqueueAction(action);
    },
    showToast : function(type,title,message,time){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({     
            "title": title,     
            "type": type,     
            "message": message,
            "duration": time
        });   
        toastEvent.fire();                
    },
    openModal : function(component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");
    },
    closeModal : function(component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    createPage : function(component, event, helper) {
        component.set("v.spinner", true);
        var pagedetail = component.get("v.Page");
        var formId = component.get("v.FormId");
        var action = component.get("c.createPageRecord");
        action.setParams({'pagedetail' : pagedetail , 'formId' : formId});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                helper.closeModal(component,event,helper);
                component.set("v.FormPageFieldValueWrapper", response.getReturnValue());
                helper.showToast("Success","Success","Page added successfully","5000");
                component.set("v.spinner", false);                
            }else{
                component.set("v.spinner", false);
                helper.showToast("Error","Error Occur","Something went wrong to add page","5000");
            }
        });
        $A.enqueueAction(action);
    }
})