({
    init : function(component, event, helper) {
        component.set('v.heading');
    },
    ClickFileUpload: function (cmp, event, helper ) {
        var uploadedFiles = event.getParam("files");
        uploadedFiles.forEach(file => console.log(file.name));
    },
    ratingButtonClick : function(component, event, helper){
        component.set('v.rating');
    },
    radioclick : function(component, event, helper){
        alert("Click");
        var radioval=event.getSource().get("v.value");
        console.log(radioval);
         if("{!v.value == 'Show text'}"){
             console.log('xyz');
            // component.set('v.heading',radioval);
            // var myele=component.find("myAtt");
            // console.log(myele);
         }
    }


         
})