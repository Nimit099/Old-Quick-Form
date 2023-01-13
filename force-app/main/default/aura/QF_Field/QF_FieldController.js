({
    onValue: function(component, event, helper) {
        var xyz = component.get("v.tView");
        if (xyz == "QFCHECKBOX" || xyz == "QFRADIOBUTTON" || xyz == "QFDROPDOWN") {
            var xx = component.get("v.FieldAttributeValue");
            if (xx == 'undefined') {

            } else {
                var arr = [];
                for (var i = 0; i < xx.length; i++) {
                    arr.push({
                        value: xx[i].Name,
                        label: xx[i].Name
                    });
                }
                component.set("v.Check", arr);
            }
        } else if (xyz == "QFSCALERATING") {
            var fieldId = component.get('v.FieldId');
            var fId = component.get('v.fId');
            var s = '';
            if (fieldId != "null") {
                s = fieldId;
            } else {
                s = fId;
            }
            console.log({ s });
            var action = component.get("c.likertdata");
            action.setParams({
                'fieldId': s,
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                    component.set('v.LikertWrapper', ss);
                }
            });
            $A.enqueueAction(action);
        }
        // for captcha
        let vfOrigin = location.protocol + '//' + location.hostname;
        window.addEventListener('message', function(event) {
            if (event.origin !== vfOrigin) {
                return;
            }
            if (event.data.captchaVisible) {
                let captchEl = document.getElementById('vfFrame');
                if (event.data.captchaVisible === 'visible') {
                    captchEl.classList.add('reCaptchaBig');
                    captchEl.classList.remove('reCaptchaSmall');
                } else {
                    captchEl.classList.remove('reCaptchaBig');
                    captchEl.classList.add('reCaptchaSmall');
                }
            }
            if (event.data.action === 'unlock') {
                // passing captcha is handled here. event.data.response - is a key of captcha
            }
        }, false);
    },

    showOnClick: function(component, event, helper) {
        helper.showOnClick(component, event, helper);
    },

    methodd: function(component, event, helper) {
        var s = component.get('v.fId');
        console.log({ s });

        if (s != 'null') {
            try {
                console.log(event.getSource().get("v.value"));
                var g = event.getSource().get("v.value").toString();
                console.log({ g });
            } catch (error) {
                var g = '';
                console.log({ g });
            }
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': g
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    saveLikertValue: function(component, event, helper) {
        var s = component.get('v.fId');
        var fieldData = '';
        var likertWrapper = component.get("v.LikertWrapper");

        likertWrapper.Statement.forEach(function(statement, index) {
            var radioBtn = '';
            likertWrapper.Option.forEach(function(option) {
                var radioName = statement + ' - Option' + index;
                radioBtn = document.getElementsByName(radioName);
            });
            for (var i = 0; i < radioBtn.length; i++) {
                if (radioBtn[i].checked) {
                    var rating = radioBtn[i].value;
                    fieldData += rating + " ::: ";
                }
            }
        });
        fieldData = fieldData.substring(0, fieldData.length - 5);

        if (s != 'null') {
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': fieldData
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    nameValue: function(component, event, helper) {
        var salutation = component.find('nameValue').get("v.salutation");
        var firstName = component.find('nameValue').get("v.firstName");
        var lastName = component.find('nameValue').get("v.lastName");

        var g = salutation + ' ' + firstName + ' ' + lastName;
        console.log('g ::: ' + g);

        var s = component.get('v.fId');
        console.log({ s });
        if (s != 'null') {
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': g
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    addressValue: function(component, event, helper) {
        var street = component.find('addressValue').get("v.street");
        var city = component.find('addressValue').get("v.city");
        var region = component.find('addressValue').get("v.region");
        var postelCode = component.find('addressValue').get("v.postelCode");
        var country = component.find('addressValue').get("v.country");

        console.log({ street });
        console.log({ city });
        console.log({ region });
        console.log({ postelCode });
        console.log({ country });

        var pageId = component.get('v.PageId');
        var fieldId = component.get('v.fId');
        var action = component.get("c.addressFieldSave");
        action.setParams({
            'pageId': pageId,
            'fieldId': fieldId,
            'street': street,
            'city': city,
            'region': region,
            'postelCode': postelCode,
            'country': country,
        });
        action.setCallback(this, function(response) {});
        $A.enqueueAction(action);
    },

    linkValue: function(component, event, helper) {
        var s = component.get('v.fId');
        console.log({ s });
        var pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

        if (s != 'null') {
            try {
                console.log(event.getSource().get("v.value"));
                var g = event.getSource().get("v.value").toString();
                var validation = pattern.test(g);
                if (validation == false) {
                    var g = '';
                }
            } catch (error) {
                var g = '';
            }
            console.log({ g });
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': g
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    emailValue: function(component, event, helper) {
        var s = component.get('v.fId');
        console.log({ s });
        var pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (s != 'null') {
            try {
                console.log(event.getSource().get("v.value"));
                var g = event.getSource().get("v.value").toString();
                var validation = pattern.test(g);
                if (validation == false) {
                    var g = '';
                }
            } catch (error) {
                var g = '';
            }
            console.log({ g });
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': g
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    phoneValue: function(component, event, helper) {
        var s = component.get('v.fId');
        console.log({ s });
        var pattern = /[0-9]{3}\s[0-9]{3}\s[0-9]{4}$/;

        if (s != 'null') {
            try {
                console.log(event.getSource().get("v.value"));
                var g = event.getSource().get("v.value").toString();
                var validation = pattern.test(g);
                if (validation == false) {
                    var g = '';
                }
            } catch (error) {
                var g = '';
            }
            console.log({ g });
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': g
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    handleUploadFinished: function(component, event) {
        let files = event.getSource().get("v.files");
        let fileName = files[0].name;
        component.set("v.fileName1", fileName);

        var uploadedFiles = event.getParam("files");
        var documentId = uploadedFiles[0].documentId;
        console.log(documentId);

        var s = component.get('v.fId');
        console.log({ s });
        if (s != 'null') {

            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': documentId
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    signInit: function(component, event, helper) {
        var canvas, ctx, flag = false,
            prevX = 0,
            currX = 0,
            prevY = 0,
            currY = 0,
            dot_flag = false;

        var x = "black",
            y = 2,
            w, h;
        canvas = component.find('can').getElement();
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        w = canvas.width * ratio;
        h = canvas.height * ratio;
        ctx = canvas.getContext("2d");
        console.log('ctx:=' + ctx);

        canvas.addEventListener("mousemove", function(e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function(e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function(e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function(e) {
            findxy('out', e)
        }, false);
        // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", function(e) {
            var touch = e.touches[0];
            console.log('touch start:=' + touch);
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();
        }, false);
        canvas.addEventListener("touchend", function(e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchmove", function(e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();

        }, false);

        function findxy(res, e) {
            const rect = canvas.getBoundingClientRect();
            if (res == 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - rect.left;
                currY = e.clientY - rect.top;

                flag = true;
                dot_flag = true;
                if (dot_flag) {
                    ctx.beginPath();
                    ctx.fillStyle = x;
                    ctx.fillRect(currX, currY, 2, 2);
                    ctx.closePath();
                    dot_flag = false;
                }
            }
            if (res == 'up' || res == "out") {
                flag = false;
            }
            if (res == 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - rect.left;
                    currY = e.clientY - rect.top;
                    draw(component, ctx);
                }
            }
        }

        function draw() {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = x;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        }

    },

    erase: function(component, event, helper) {
        var canvas = component.find('can').getElement();
        var ctx = canvas.getContext("2d");
        var w = canvas.width;
        var h = canvas.height;
        ctx.clearRect(0, 0, w, h);
    },

    saveSignature: function(component, event, helper) {
        var pad = component.find('can').getElement();
        var dataUrl = pad.toDataURL();
        console.log('dataUrl:=' + dataUrl);

        var s = component.get('v.fId');
        console.log({ s });

        if (s != 'null') {
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': dataUrl
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    checkboxValue: function(component, event, helper) {
        var s = component.get('v.fId');
        console.log({ s });

        if (s != 'null') {
            var g = event.getSource().get('v.checked');
            console.log(g);
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': g
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    ratingvalue: function(component, event, helper) {
        var rating = event.target.value;
        console.log('rating :' + rating);
        var s = component.get('v.fId');
        console.log({ s });
        if (s != 'null') {
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': rating
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    emojivalue: function(component, event, helper) {
        var rating = event.target.value;
        console.log('rating :' + rating);
        var s = component.get('v.fId');
        console.log({ s });
        if (s != 'null') {
            var action = component.get("c.fieldSave");
            action.setParams({
                'formId': s,
                'Val': rating
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log({ state });
                if (state === "SUCCESS") {
                    var ss = response.getReturnValue();
                    console.log({ ss });
                }
            });
            $A.enqueueAction(action);
        }
    },

    handleid: function(component, event, helper) {
        var target = event.target.name;
        console.log('target ::: ' + target);
        if (target != '') {
            var evt = $A.get("e.c:FieldEvent");
            evt.setParams({ "records": target });
            evt.fire();
        }
    },

    searchAction: function(component, event, helper) {
        var searchKey = component.find("searchKey").get("v.value");
        console.log({ searchKey });
        if (searchKey.length != 0) {
            component.set("v.ShowRecList", true);
            var objName = component.get("v.FormField.LookUp_Obj__c");
            console.log({ objName });
            var action = component.get("c.findByName");
            action.setParams({
                'searchKey': searchKey,
                'objName': objName
            });
            action.setCallback(this, function(response) {
                console.log(response.getReturnValue());
                component.set("v.Records", response.getReturnValue());
            });
            $A.enqueueAction(action);
        } else {
            component.set("v.ShowRecList", false);
        }
    },

    showRec: function(component, event, helper) {;
        var idx = event.target.getAttribute('data-index');
        var rowRecord = component.get("v.Records")[idx];
        component.set("v.selectRecordName", rowRecord.Name);
        component.set("v.ShowRecList", false);

        var s = component.get('v.fId');
        var g = rowRecord.Id;

        var action = component.get("c.fieldSave");
        action.setParams({
            'formId': s,
            'Val': g
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var ss = response.getReturnValue();
                console.log({ ss });
            }
        });
        $A.enqueueAction(action);
    }

})