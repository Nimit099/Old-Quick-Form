({
    onDragStart:function(form,event,helper){
        var x = event.target.dataset.record;          
        event.dataTransfer.setData('text/plain',x);        
        //event.currentTarget.style.backgroundColor='white';
        var xx = document.querySelector('.iconDiv').nodeName;
        //xx.style.opacity="0";
        console.log(xx);
        //for(var s of xx){
         // s.style.color= 'red';
        //}
    },
    onDragOver : function(from,event){
        event.preventDefault();
    },
    onDrop : function(component,event,helper,form){
        const Fieldid = event.dataTransfer.getData('text');
        var xc = document.querySelector('[data-record="'+Fieldid+'"]');
        var dataRef = xc.getAttribute('data-ref');
        console.log({dataRef});
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
            console.log({classname});
            if(classname == 'field'){
                var PageId = event.target.parentNode.parentNode.id;
                var CloneObject = xc.cloneNode(true);
                // event.target.parentElement.insertBefore(CloneObject,event.target);
                event.target.parentNode.insertBefore(CloneObject,event.target.nextElementSibling);
                // event.target.parentNode.insertBefore(CloneObject,event.target);
                helper.insertFieldRecord(component,event,helper,FormId,PageId,Fieldid);   
            }else if(classname == 'example-dropzone'){
                var PageId = event.target.parentNode.id;
                var CloneObject = xc.cloneNode(true);
                var testVar = event.target;
                console.log({testVar});
                event.target.appendChild(CloneObject);
                helper.insertFieldRecord(component,event,helper,FormId,PageId,Fieldid);                       
            }                         
        }
        var xx = document.querySelectorAll('.fieldDiv,.fieldDiv2,.iconDiv,.pagetitle,.formtitle');
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
                     showbar: function(component, event, helper) {
        helper. showbar(component, event, helper);
    },
    createPage: function(component, event, helper) {
        helper.createPage(component, event, helper);
    },
    fetchQuickFormFieldAttValue : function(component, event, helper){
        // var screenHeight = window.innerHeight+'px';
        // var x = document.querySelectorAll('body');
        // console.log({x});
        // x.style.height = window.innerHeight;        
   
        helper.fetchQuickFormFieldAttValue(component,event,helper);
    },
    showSpinner: function(component, event, helper) {
        component.set("v.spinner", true); 
    },
    hideSpinner : function(component,event,helper){  
        component.set("v.spinner", false);
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
        var title=event.getSource().get("v.title");
        component.set("v.ids",title);

    },
    openPreviewFormComponent : function(component,event,helper){ 
        var title=event.getSource().get("v.title");
        component.set("v.ids",title);
    }, 
    formedit : function(component,event,helper){
        var title=event.getSource().get("v.title");
        component.set("v.ids",title);
    },
    handleid : function(component, event, helper){
        var target=event.target.name;
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
    },
    MethodForOpacity: function(component,event,helper){
        event.preventDefault();
        var xx = document.querySelectorAll('.fieldDiv,.fieldDiv2,.iconDiv,.pagetitle,.formtitle');
            for(var s of xx){
              s.style.opacity = 1;
            }
    },
     handleActive: function (cmp, event, helper) {
        helper.loadTabs(cmp, event);
    },
    toggleFields:function(component , event ,helper){
    /* var a=document.querySelector('input[name="flexRadioDefault"]:checked');     
       
     
          const collection = document.getElementsByClassName("form-control");
           for (let i = 0; i < collection.length; i++) {
               
               if(a.nextElementSibling.id == collection[i].id){
                        a.nextElementSibling.style.display='block';
               }else{
                        collection[i].style.display='none';
               }
               
            } */
            var numberFieldValue = event.target.checked;
            console.log(numberFieldValue);
        
	},
 
    
})