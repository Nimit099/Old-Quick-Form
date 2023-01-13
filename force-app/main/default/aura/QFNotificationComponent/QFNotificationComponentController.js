({
    //init method
    doInit : function(component,event,helper){
        helper.loadEmailRecipient(component, event, helper);
    },

    // cancel popup ( Add recipient)
    cancleAddRecipient: function(component, event, helper) {
        helper.cancleAddRecipient(component, event, helper);
    },

    // cancel popup ( Add CC)
    cancel_add_cc: function(component, event, helper) {
        helper.cancel_add_cc_helper(component, event, helper);
    },

    // Add button popup ( Add recipient )
    addRecipient: function(component, event, helper) {              // notification in add new recever email id
        helper.addRecipient(component, event, helper);
    },

    // add button popup ( Add CC)
    add_cc: function(component, event, helper) {              // notification in add new recever email id
        helper.add_cc_helper(component, event, helper);
    },

    // save notification data
    saveNotificationMailData: function(component, event, helper) {
        helper.saveNotificationMailData(component, event, helper);
    },

    // open recipient popup
    openAddRecipient: function(component, event, helper) {
        helper.openAddRecipient(component, event, helper);
    },

    // open CC popup
    open_Add_cc: function(component, event, helper) {
        helper.open_Add_cc_helper(component, event, helper);
    },

    // remove recipient pills
    onRemove_recipient:function(component, event, helper){
        var pillname = event.getSource().get('v.name');
        var ntf_recever_mailid = component.get('v.ntf_recever_mailid');
        for (var i = 0; i < ntf_recever_mailid.length; i++) {
            if (pillname === ntf_recever_mailid[i]) {
                ntf_recever_mailid.splice(i, 1);
                break;
            }
        }
        component.set('v.ntf_recever_mailid', ntf_recever_mailid);
    },

    // remove cc pills
    onRemove_cc:function(component, event, helper){
        var pillname = event.getSource().get('v.name');
        var ntf_cc_mailid = component.get('v.ntf_cc_mailid');
        for (var i = 0; i < ntf_cc_mailid.length; i++) {
            if (pillname === ntf_cc_mailid[i]) {
                ntf_cc_mailid.splice(i, 1);
                break;
            }
        }
        component.set('v.ntf_cc_mailid', ntf_cc_mailid);
    },

    // cancel notification 
    cancelNotifiationMailData:function(component, event, helper){
        helper.loadEmailRecipient(component, event, helper);
    },
})