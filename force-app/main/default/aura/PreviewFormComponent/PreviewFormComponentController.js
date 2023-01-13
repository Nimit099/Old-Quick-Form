({
    fetchPreviewFormField: function(component, event, helper) {
        try {
            console.log('Preview');
            helper.fetchPreviewFormField(component, event, helper);
            // window.setTimeout(function() { helper.handleCss(component, event, helper) }, 1000);
            // helper.sendEmailNotification(component, event, helper);
        } catch (error) {
            console.log({ error });
        }
    },

    onNext: function(component, event, helper) {
        helper.onNext(component, event, helper);
    },

    onPrevious: function(component, event, helper) {
        helper.onPrevious(component, event, helper);
    },

    onSubmit: function(component, event, helper) {
        helper.onSubmit(component, event, helper);
    },

    handleCss: function(component, event, helper) {
        helper.handleCss(component, event, helper);
    },

    handleEvent: function(component, event, helper) {
        helper.handleEvent(component, event, helper);
    },

    // test_pdf:function(component, event, helper){
    //     console.log('test_pdf method loaded');
    //         setTimeout(
    //             $A.getCallback(function() {
    //                 html2canvas(document.querySelector("#myff"), {
    //                     onrendered: function(canvas){
    //                         var img = canvas.toDataURL();
    //                         component.set("v.imgsrc", img);
    //                         console.log(img);
    //                     }
    //                 });
    //             }), 1000
    //         );
    //     console.log('end test_method ');
    // },
    testpdfload: function(component, event, helper) {
        console.log('Script Loaded!!!');
    },


    // -------------- captcha Field Start --------------

    // captcha 1
    createCaptcha1: function(component, event, helper) {
        component.set("v.WrongCaptcha", false);
        helper.createCaptcha1(component, event, helper);
    },

    checkCaptcha1: function(component, event, helper) {
        try {
            event.preventDefault();
            var code = component.get("v.CaptchaCode")
            if (document.getElementById("cpatchaTextBox").value == code) {
                component.set("v.CaptchaButton", false);
                component.set("v.WrongCaptcha", false);
                component.set("v.RightCaptcha", true);
            } else {
                component.set("v.CaptchaButton", true);
                helper.createCaptcha1(component, event, helper);
                component.set("v.WrongCaptcha", true);
                component.set("v.RightCaptcha", false);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    //captcha 2
    createCaptcha2: function(component, event, helper) {
        component.set("v.WrongCaptcha", false);
        helper.createCaptcha2(component, event, helper);
    },

    checkCaptcha2: function(component, event, helper) {
        try {
            event.preventDefault();
            var code = new String(component.get("v.CaptchaCode"));
            var inputValue = document.getElementById("submit__input").value;
            if (inputValue.length == code.length) {
                if (inputValue == code) {
                    component.set("v.CaptchaButton", false);
                    component.set("v.WrongCaptcha", false);
                    component.set("v.RightCaptcha", true);
                } else {
                    component.set("v.CaptchaButton", true);
                    helper.createCaptcha2(component, event, helper);
                    component.set("v.WrongCaptcha", true);
                    component.set("v.RightCaptcha", false);
                }
            } else if (inputValue.length >= code.length) {
                helper.createCaptcha2(component, event, helper);
                component.set("v.WrongCaptcha", true);
                component.set("v.RightCaptcha", false);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // captcha 3
    openCaptchaModel: function(component, event, helper) {
        helper.openCaptchaModel(component, event, helper);
    },

    // captcha 4
    captcha4: function(component, event, helper) {
        helper.captcha4(component, event, helper);
    },

    // -------------- captcha Field End --------------

    // for close lookup suggestion in field component
    lookupFalse: function(component, event, helper) {
        component.set("v.ShowRecList", false);
    },

})