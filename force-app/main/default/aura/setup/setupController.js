({
  doInit: function(component,event,helper){
  },

  closesiteModel: function(component, event, helper) {
    component.set("v.isModalOpen", false);
  },
  opensite: function(component,event,helper){
    helper.opensite(component,event,helper);
  },
  openModel: function(component, event, helper) {
  component.set("v.isModalOpen", true);
  component.set('v.progressIndicatorFlag', 'step1')
  },
  opencretediteModel:function(component,event,helper){
    component.set("v.issiteModelopen",true);
  },
  closeModel: function(component, event, helper) {
    component.set("v.issiteModelopen", false);
  },
  createfolder : function(component, event, helper){
    helper.createfolder(component,event,helper);
  },
})