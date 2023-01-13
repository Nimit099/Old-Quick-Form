({

  createfolder : function(component, event, helper){
    var action=component.get("c.createFolderrecord");
    action.setCallback(this,function(response){
      var state=response.getState();
      console.log(state);
      if(state === 'SUCCESS'){
        console.log({response});
        var x = response.getReturnValue();
                console.log({ x });
        if(x === 'Folder Already Created'){
          var toastEvent = $A.get('e.force:showToast')
          toastEvent.setParams({
          title: 'Info!',
          type:'Info',
          message: 'The Folder is already Created.',
          })
          toastEvent.fire()
        }
        else{
          var toastEvent = $A.get('e.force:showToast')
          toastEvent.setParams({
          title: 'Success!',
          type:'Success',
          message: 'The Folder Created successfully.',
          })
          toastEvent.fire()
        }
      }
    });
    $A.enqueueAction(action);
  },
  opensite: function(component,event,helper){
    try{
      var baseUrl = window.location.origin+'/lightning/setup/CustomDomain/home';
      console.log('baseUrl:::',baseUrl);
      window.open(baseUrl);
    }
    catch(error){
      console.log(error);
    }
   },
})