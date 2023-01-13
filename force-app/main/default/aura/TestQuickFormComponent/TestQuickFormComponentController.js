({
    onDragStart:function(form,event,helper){
        var x = event.target.dataset.record;          
        event.dataTransfer.setData('text/plain',x);        
        //event.currentTarget.style.backgroundColor='white';
        var xx = document.querySelectorAll('.fieldDiv,.fieldDiv2,.iconDiv');
        for(var s of xx){
          s.style.opacity = 0.5;
        }
    },
    onDragOver : function(from,event){
        event.preventDefault();
    },
    onDrop : function(component,event,helper,form){
        const Fieldid = event.dataTransfer.getData('text');
        var xc = document.querySelector('[data-record="'+Fieldid+'"]');
        var dataRef = xc.getAttribute('data-ref');
        if(dataRef == "inner"){    
            var classname = event.target.className;                      
            if(classname == 'field'){
                event.target.parentElement.insertBefore(xc,event.target);
            }else if(classname == 'example-dropzone'){
                event.target.appendChild(xc);
            } 
            var FieldElement = document.querySelectorAll('.field');
            var Listt = [];
            for(var i =0;i<FieldElement.length;i++){
                var x = FieldElement[i].getAttribute('data-record');
                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                Listt.push(x+':::'+i+':::'+ParentPageId);
            }          
            helper.SequenceSave(component,event,helper,Listt);                          
        }else{
            var FormId = component.get("v.FormId");                                   
            var classname = event.target.className;          
            if(classname == 'field'){
                var PageId = event.target.parentNode.parentNode.id;                
            }else if(classname == 'example-dropzone'){
                var PageId = event.target.parentNode.id;                        
            }          
            var CloneObject = xc.cloneNode(true);        
            event.target.appendChild(CloneObject);
            helper.insertFieldRecord(component,event,helper,FormId,PageId,Fieldid);
        }
        var xx = document.querySelectorAll('.fieldDiv,.fieldDiv2,.iconDiv');
        for(var s of xx){
          s.style.opacity = 1;
        }
        event.dataTransfer.cleardata();
    },
    openModal: function(component, event, helper) {
        helper.openModal(component, event, helper);        
    },
    closeModal: function(component, event, helper) {
        helper.closeModal(component, event, helper);
    },
    createPage: function(component, event, helper) {
        helper.createPage(component, event, helper);
    },
    fetchQuickFormFieldAttValue : function(component, event, helper){
        helper.fetchQuickFormFieldAttValue(component,event,helper);
    },
    // onaddpage : function(component,event,helper){     
    //     helper.onaddpage(component,event,helper); 
    // },
    showSpinner: function(component, event, helper) {
        component.set("v.spinner", true); 
    },
    hideSpinner : function(component,event,helper){  
        component.set("v.spinner", false);
    },     	
    formtitle : function(component,event,helper){  
        helper.formtitle(component,event,helper);
    },    
    editFormName : function(component,event,helper){
        component.set("v.editFormTitle",true);
    },
    editPageTitle : function(component,event,helper){ 
        var Id = event.getSource().get('v.id');
        component.set("v.editPageTitle",Id);
    },
    pagetitle : function(component,event,helper){          
        helper.pagetitle(component,event,helper);
    },
    editPageSubTitle : function(component,event,helper){ 
        var Id = event.getSource().get('v.id');
        component.set("v.editPageSubTitle",Id);
    },
    pagesubtitle : function(component,event,helper){  
        helper.pagesubtitle(component,event,helper);
     },
     deletePage : function(component,event,helper){   
        var msg = 'Are you sure to delete this page ?'     
        if(!confirm(msg)){
            return false;
        }
        else{
            helper.deletepage(component,event,helper);
        }
    },
    openObjectMappingComponent : function(component,event,helper){ 
        var formId = component.get("v.FormId");
        //console.log({formId});        
        var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:ObjectMapping",
                componentAttributes :{
                    FormId : component.get("v.FormId")
            }
        });
        evt.fire();
    },
    openPreviewFormComponent : function(component,event,helper){ 
        var formId = component.get("v.FormId");
        //console.log({formId});
        
        var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:PreviewFormComponent",
                componentAttributes :{
                    FormId : component.get("v.FormId")
            }
        });
        evt.fire();
    },    
    handleid : function(component, event, helper){
        var target=event.target.name;
        console.log({target});
        // var x=component.get("v.FormId");
        // console.log({x});
        var evt = $A.get("e.c:FieldEvent");
        evt.setParams({ "records": target});
        evt.fire(); 
    },
    handleSelect: function (component, event,helper) {
        var selectedMenuItemValue = event.getParam("value");
        var x = event.getSource().get('v.name');
        if(selectedMenuItemValue == "edit"){
            var evt = $A.get("e.c:FieldEvent");
            evt.setParams({ "records": x});
            evt.fire(); 
        }else{
            helper.openModal(component, event, helper);
        }
    },
    handleSelectPage: function (component, event,helper) {
        var selectedMenuItemValue = event.getParam("value");
        var x = event.getSource().get('v.name');
        console.log({x});
        if(selectedMenuItemValue == "edit"){
            var evt = $A.get("e.c:FieldEvent");
            evt.setParams({ "records": x});
            evt.fire(); 
        }else{
            var msg = 'Are you sure to delete this page ?'     
            if(!confirm(msg)){
                return false;
            }
            else{
                helper.deletepage(component,event,helper);
            }
        }
    }
})