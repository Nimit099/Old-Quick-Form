({
    fetchQuickFormFieldAttValue : function(component,event,helper){ 
         component.set('v.myVal', '<p><script>alert(this)</script></p><p>hi!</p>');
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
                var inList = document.querySelectorAll('.example-dropzone input');
                console.log({inList});
                for(var s of inList){
                    s.disable = true;
                }
                component.set("v.spinner", false);                       
            }else{
                component.set("v.spinner", false);  
                helper.showToast("Error","Error Occur","Something went wrong to fetch data");
            }
        });
        $A.enqueueAction(action);
    },
    deletepage :function(component,event,helper){
        component.set("v.spinner", true);
        var pageId = event.getSource().get('v.name');
        var x = pageId.split(':::');
        var formId = component.get("v.FormId"); 
        var action = component.get("c.DeletePage");
        action.setParams({'pageId' : x[1] , 'formId' : formId});
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
                helper.showToast("Success","Success","Field added successfully","5000");
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
    },
     loadTabs: function (cmp, event) {
          event.preventDefault();
          var tabs = cmp.find('demo');
      
             
       for (var each in tabs ){
        $A.util.addClass(tabs[each], 'two'); 
                   }  
       

    }
        
  
})