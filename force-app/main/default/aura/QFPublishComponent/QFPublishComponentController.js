({
    //=======================Handler=============================== 
    myAction: function(component, event, helper) {
        try {
            var formid = component.get("v.FormId");
            var action = component.get("c.siteUrl");
            action.setParams({ 'formId': formid });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var forceurl = response.getReturnValue();
                    if (forceurl[0] == 'Deactivate') {
                        component.set("v.site_deactivate", false);
                    } else {
                        var en = btoa(formid);
                        var url = forceurl + "/QFPreviewForm?Id=" + en;
                        component.set("v.publishurl", url);
                        component.set("v.site_deactivate", true);
                    }
                }
            })
            $A.enqueueAction(action);
        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");
        }
    },
    //==========================Click button to show QR code=================
    showQr: function(component, event) {
        try {
            let qrImg = document.querySelector(".qr-img img");
            let imgSrc = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + component.get('v.publishurl');
            qrImg.src = imgSrc;
        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");

        }
    },
    //==========================Click one checkbox content and hide other check box content=======================
    checkedBox: function(component, event, helper) {
        try {

            var publishCheckboxes = component.get('v.publishCheckboxes');
            if (publishCheckboxes == 'lwc') {
                component.set('v.showLwcCode', true);
                component.set('v.showAuraCode', false);
                component.set('v.showIframeCode', false);
                component.set('v.showLinkToFormCode', false);
                component.set('v.showLightBoxCode', false);
                component.set('v.qrCode', false);


            } else if (publishCheckboxes == 'iframe') {
                component.set('v.showIframeCode', true);
                component.set('v.showAuraCode', false);
                component.set('v.showLwcCode', false);
                component.set('v.showLinkToFormCode', false);
                component.set('v.showLightBoxCode', false);
                component.set('v.qrCode', false);


            } else if (publishCheckboxes == 'linkToForm') {
                component.set('v.showLinkToFormCode', true);
                component.set('v.showIframeCode', false);
                component.set('v.showAuraCode', false);
                component.set('v.showLwcCode', false);
                component.set('v.showLightBoxCode', false);
                component.set('v.qrCode', false);




            } else if (publishCheckboxes == 'lightBox') {
                component.set('v.showLightBoxTextLinkCode', true);
                component.set('v.showLightBoxCode', true);
                component.set('v.showAuraCode', false);
                component.set('v.showLwcCode', false);
                component.set('v.showIframeCode', false);
                component.set('v.showLinkToFormCode', false);
                component.set('v.qrCode', false);


            } else if (publishCheckboxes == 'QR Code') {
                component.set('v.qrCode', true);
                component.set('v.showAuraCode', false);
                component.set('v.showLwcCode', false);
                component.set('v.showIframeCode', false);
                component.set('v.showLinkToFormCode', false);
                component.set('v.showLightBoxCode', false);

            } else {
                component.set('v.showAuraCode', true);
                component.set('v.showLwcCode', false);
                component.set('v.showIframeCode', false);
                component.set('v.showLinkToFormCode', false);
                component.set('v.showLightBoxCode', false);
                component.set('v.qrCode', false);

            }

        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");
        }
    },
    //========================Toggle content of Lightbox accordion on onclick===========================
    showContent: function(component, event, helper) {
        try {
            var getDiv = event.target.id;
            var img = document.getElementById('imageLink');
            var popup = document.getElementById('autoPopup');
            var fBtn = document.getElementById('floatingBtn');
            var aura = document.getElementById('textLink');

            if (getDiv == 'imageLink') {
                component.set('v.showLightBoxImageLinkCode', true);
                component.set('v.showPopupFloatingButtonBox', false);
                component.set('v.showLightBoxTextLinkCode', false);
                component.set('v.showLightBoxAutoPopupCode', false);
                component.set('v.showLightBoxFloatingCode', false);
                fBtn.style.backgroundColor = 'white';
                img.style.backgroundColor = '#B2CCE5';
                popup.style.backgroundColor = 'white';
                aura.style.backgroundColor = 'white';


            } else if (getDiv == 'autoPopup') {
                component.set('v.showPopupFloatingButtonBox', false);
                component.set('v.showLightBoxAutoPopupCode', true);
                component.set('v.showLightBoxImageLinkCode', false);
                component.set('v.showLightBoxTextLinkCode', false);
                component.set('v.showLightBoxFloatingCode', false);
                fBtn.style.backgroundColor = 'white';
                img.style.backgroundColor = 'white';
                popup.style.backgroundColor = '#B2CCE5';
                aura.style.backgroundColor = 'white';

            } else if (getDiv == 'floatingBtn') {
                component.set('v.showPopupFloatingButtonBox', false);
                component.set('v.showLightBoxFloatingCode', true);
                component.set('v.showLightBoxAutoPopupCode', false);
                component.set('v.showLightBoxImageLinkCode', false);
                component.set('v.showLightBoxTextLinkCode', false);
                fBtn.style.backgroundColor = '#B2CCE5';
                img.style.backgroundColor = 'white';
                popup.style.backgroundColor = 'white';
                aura.style.backgroundColor = 'white';

            } else {
                component.set('v.showPopupFloatingButtonBox', false);
                component.set('v.showLightBoxTextLinkCode', true);
                component.set('v.showLightBoxAutoPopupCode', false);
                component.set('v.showLightBoxImageLinkCode', false);
                component.set('v.showLightBoxFloatingCode', false);
                fBtn.style.backgroundColor = 'white';
                popup.style.backgroundColor = 'white';
                aura.style.backgroundColor = '#B2CCE5';
                img.style.backgroundColor = 'white';

            }
        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");

        }

    },
    //================Copy button for copy iframe , aura and LWC code=========================
    copyCode: function(component, event, helper) {
        try {

            var s = event.target.firstElementChild.firstElementChild.id;
            var r = document.createRange();
            r.selectNode(document.getElementById(s));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(r);
            document.execCommand('copy');
            var copied = document.querySelector('.copiedtext');
            copied.style.display = 'block';
            setTimeout(function() { copied.style.display = 'none'; }, 1500);

        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");

        }
    },
    //===================Copy button for copy HTML ,CSS and JS Code=====================
    textCopy: function(component, event, helper) {
        try {
            var s = event.target.nextElementSibling.id;
            var r = document.createRange();
            r.selectNode(document.getElementById(s));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(r);
            document.execCommand('copy');

        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");

        }
    },
    //========================copy button for copy form url======================
    copyInputFieldValue: function(component, event, helper) {
        try {
            var textForCopy = component.get("v.publishurl");
            helper.copyTextFieldHelper(component, event, textForCopy);

        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong to copy input field", "error");
        }
    },
    //==================== Popup Modal================
    showPopupTextBox: function(component, event, helper) {
        component.set('v.showPopupTextBox', true);
    },
    showPopupImageBox: function(component, event, helper) {
        component.set('v.showPopupImageBox', true);
    },
    showPopupTextLinkBox: function(component, event, helper) {
        component.set('v.showPopupTextLinkBox', true);
        // component.set('v.showPopupFloatingButtonBox', false);


    },
    showPopupImageLinkBox: function(component, event, helper) {
        component.set('v.showPopupImageLinkBox', true);
        // component.set('v.showPopupFloatingButtonBox', false);

    },
    showAutoPopupBox: function(component, event, helper) {
        component.set('v.showAutoPopupBox', false);
        // component.set('v.showPopupFloatingButtonBox', false);
        window.setTimeout(function() { component.set('v.showAutoPopupBox', true) }, 3000);

    },
    showPopupFloatingButtonBox: function(component, event, helper) {
        component.set('v.showPopupFloatingButtonBox', true);
    },
    // ===================[Display modal in which form is there]==========
    showIframeModal: function(component, event, helper) {
        component.set('v.showPopupTextLinkBox', false);
        component.set('v.showPopupImageLinkBox', false);
        component.set('v.showIframeModal', true);
        component.set('v.showPopupFloatingButtonBox', false);
    },
    // =================[Close popup modal]=================================
    close: function(component, event, helper) {
        component.set('v.showPopupTextBox', false);
        component.set('v.showPopupImageBox', false);
        component.set('v.showPopupTextLinkBox', false);
        component.set('v.showPopupImageLinkBox', false);
        component.set('v.showAutoPopupBox', false);
        component.set('v.showPopupFloatingButtonBox', false);
        component.set('v.showIframeModal', false);





    }
})