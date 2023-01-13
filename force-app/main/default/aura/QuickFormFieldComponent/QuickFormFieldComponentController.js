({
    init : function(component, event, helper) {
        
        
    },
    handleClick : function (component, event, helper) {
        var target = event.getSource().get("v.label");
        console.log(target);
        component.set("v.view",target);
    }
})