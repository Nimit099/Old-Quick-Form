({
    fetchPreviewFormField : function(component, event, helper) { 
        helper.fetchPreviewFormField(component, event, helper);
    },
    dd: function(component,event,helper){
        jQuery("document").ready(function(){
            console.log('loaded');
            
        });
    },
    onNext: function(component, event, helper) {
        helper.onNext(component, event, helper);
    },
    onPrevious: function(component, event, helper) {
        helper.onPrevious(component, event, helper);
    },
    onSubmit: function(component, event, helper) {
        // var tess = document.querySelectorAll('.longtext');
        // var tt = tess.length;
        // console.log({tt});
        // console.log({tess});
        helper.onSubmit(component, event, helper);
    },
    sendMail: function(component, event, helper) {	
        var getEmail = component.get("v.email");
        var getSubject = component.get("v.subject");
        var getbody = component.get("v.body");   
        if ($A.util.isEmpty(getEmail) || !getEmail.includes("@")) {
            alert('Please Enter valid Email Address');
        } else {
            helper.sendHelper(component, getEmail, getSubject, getbody);
        }
    },
    closeMessage: function(component, event, helper) {
        component.set("v.mailStatus", false);
        component.set("v.email", null);
        component.set("v.subject", null);
        component.set("v.body", null);
    },
})