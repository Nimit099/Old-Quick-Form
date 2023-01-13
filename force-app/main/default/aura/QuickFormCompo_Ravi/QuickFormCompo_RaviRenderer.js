({

    // Your renderer method overrides go here
    rerender : function(component, helper) {
        console.log('super rerender called');
        this.superRerender();
        
        // Write your custom code here.
    }
})