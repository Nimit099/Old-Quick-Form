({
    // Run method on init for get form data
    fetchPreviewFormField: function(component, event, helper) {
        try {
            helper.fetchPreviewFormField(component, event, helper);
        } catch (error) {
            console.log({ error });
        }
    },

    // Call after click on Next button
    onNext: function(component, event, helper) {
        helper.onNext(component, event, helper);
    },

    // Call after click on Previous button
    onPrevious: function(component, event, helper) {
        helper.onPrevious(component, event, helper);
    },

    // Call after click on Submit button
    onSubmit: function(component, event, helper) {
        helper.onSubmit(component, event, helper);
    },

    // Run after fire event form field component For Get Fields Data
    handleEvent: function(component, event, helper) {
        helper.handleEvent(component, event, helper);
    },

    // Run after load pdfgenerater static resource
    testpdfload: function(component, event, helper) {
        console.log('Script Loaded!!!');
    },


    // -------------- captcha Field Start --------------

    // captcha 1
    createCaptcha1: function(component, event, helper) {
        component.set("v.WrongCaptcha", false);
        helper.createCaptcha1(component, event, helper);
    },

    // check captcha 1 is right or wrong
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

    // check captcha 2 is right or wrong
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

    // Show Message on Submit or Next button if any required field is missing
    checkDisableBtn: function(component, event, helper) {
        component.set("v.fieldError", true);
        component.find("toastCmp").showToastModel("Please Fill Required Fields", "Error");
    },

})