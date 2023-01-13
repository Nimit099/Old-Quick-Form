({
    // Init Method for get radio, checkbox, dropdown and scale rating field values 
    onValue: function(component, event, helper) {
        try {
            var fieldValue = component.get("v.fieldValue");
            component.set("v.FieldData", fieldValue);
            var fieldType = component.get("v.tView");
            if (fieldType == "QFCHECKBOX" || fieldType == "QFRADIOBUTTON" || fieldType == "QFDROPDOWN" || fieldType == "QFFULLNAME") {
                var valueList = component.get("v.FieldAttributeValue");
                if (valueList != 'undefined') {
                    var arr = [];
                    for (var i = 0; i < valueList.length; i++) {
                        arr.push({
                            value: valueList[i].Name,
                            label: valueList[i].Name
                        });
                    }
                    component.set("v.Check", arr);
                }
            } else if (fieldType == "QFSCALERATING") {
                var fieldId = component.get('v.FieldId');
                var fId = component.get('v.fId');
                var Id = '';
                if (fieldId != "null") {
                    Id = fieldId;
                } else {
                    Id = fId;
                }
                var action = component.get("c.likertdata");
                action.setParams({
                    'fieldId': Id,
                });
                action.setCallback(this, function(response) {
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
                    } else {
                        var responseData = response.getReturnValue();
                        component.set('v.LikertWrapper', responseData);

                        // for set input field value for scale rating
                        var scaleValue = component.get("v.fieldValue");
                        if (scaleValue != '') {
                            var scaleValueLst = scaleValue.split(' ::: ');
                            component.set("v.scaleValueLst", scaleValueLst);
                        } else {
                            var scaleValueLst = [];
                            responseData.Statement.forEach(function(item, index) {
                                scaleValueLst.push(item);
                            });
                            component.set("v.scaleValueLst", scaleValueLst);
                        }
                    }
                });
                $A.enqueueAction(action);
            }
            // for set input field value for loockup 
            if (fieldType == "QFLOOKUP") {
                var fieldValue = component.get("v.fieldValue");
                if (fieldValue != '') {
                    var objName = component.get("v.FormField.LookUp_Obj__c");
                    if (objName != null) {
                        var action = component.get("c.findById");
                        action.setParams({
                            'objId': fieldValue,
                            'objName': objName
                        });
                        action.setCallback(this, function(response) {
                            if (response.getReturnValue() == null) {
                                component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
                            } else {
                                component.set("v.selectRecordName", response.getReturnValue()[0].Name);
                            }
                        });
                        $A.enqueueAction(action);
                    }
                }
            } // for set input field value for file upload 
            else if (fieldType == "QFFILEUPLOAD") {
                var fieldValue = component.get("v.fieldValue");
                if (fieldValue != '' && fieldValue != undefined) {
                    var action = component.get("c.findContentById");
                    action.setParams({
                        'objId': fieldValue,
                    });
                    action.setCallback(this, function(response) {
                        if (response.getReturnValue() == null) {
                            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
                        } else {
                            component.set("v.fileName", response.getReturnValue());
                        }
                    });
                    $A.enqueueAction(action);
                }
            } // for set input field value for Address
            else if (fieldType == "QFADDRESS") {
                var fieldValue = component.get("v.fieldValue");
                if (fieldValue != '') {
                    var fieldValueLst = fieldValue.split(' ::: ');
                    component.find("addressValue").set("v.street", fieldValueLst[0]);
                    component.find("addressValue").set("v.city", fieldValueLst[1]);
                    component.find("addressValue").set("v.province", fieldValueLst[2]);
                    component.find("addressValue").set("v.postalCode", fieldValueLst[3]);
                    component.find("addressValue").set("v.country", fieldValueLst[4]);
                }
            } // for set input field value for Full Name
            else if (fieldType == "QFFULLNAME") {
                var fieldValue = component.get("v.fieldValue");
                if (fieldValue != '') {
                    var fieldValueLst = fieldValue.split(' ::: ');
                    component.find("Salutation").set("v.value", fieldValueLst[0]);
                    component.find("FirstName").set("v.value", fieldValueLst[1]);
                    component.find("LastName").set("v.value", fieldValueLst[2]);
                }
            }
        } catch (error) {}
    },

    // Run method for Show Field Section If User Can Click From Form Editor
    showOnClick: function(component, event, helper) {
        helper.showOnClick(component, event, helper);
    },

    // Run method on blur for save field data
    storeData: function(component, event, helper) {
        try {
            var fieldData = event.getSource().get("v.value").toString();
        } catch (error) {
            var fieldData = '';
        }
        helper.saveData(component, event, helper, fieldData);
    },

    // For Store Salutation From FullName Field
    salutationValue: function(component, event, helper) {
        try {
            var fId = component.get('v.fId');;
            var pageId = component.get('v.PageId');
            try {
                var fieldData = event.getSource().get("v.value").toString();
            } catch (error) {
                var fieldData = '';
            }
            if (fieldData == '') {
                component.set("v.FieldData", '');
            } else {
                component.set("v.FieldData", fieldData);
            }
            // Event For pass data to preview
            var fieldLabel = 'Salutation';
            var requiredField = component.get("v.FieldAttribute.Required_Field__c");
            var target = [];
            target.push(fId, fieldLabel, fieldData, requiredField);
            var evt = $A.get("e.c:PreviewEvent");
            evt.setParams({ "formFieldData": target });
            evt.fire();

            // Save data in field object
            var action = component.get("c.fullNameSave");
            action.setParams({
                'pageId': pageId,
                'fieldId': fId,
                'fieldData': fieldData,
                'fieldType': 'Salutation'
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Save Data, Please Reload Page");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store First Name From FullName Field
    firstNameValue: function(component, event, helper) {
        try {
            var fId = component.get('v.fId');
            var pageId = component.get('v.PageId');
            try {
                var fieldData = event.getSource().get("v.value").toString();
            } catch (error) {
                var fieldData = '';
            }
            if (fieldData == '') {
                component.set("v.FieldData", '');
            } else {
                component.set("v.FieldData", fieldData);
            }
            // Save data in field object
            var action = component.get("c.fullNameSave");
            action.setParams({
                'pageId': pageId,
                'fieldId': fId,
                'fieldData': fieldData,
                'fieldType': 'First Name'
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Save Data, Please Reload Page");
                } else {
                    // Event For pass data to preview
                    var fieldId = response.getReturnValue();
                    if (fieldId != null) {
                        var fieldLabel = 'First Name';
                        var requiredField = component.get("v.FieldAttribute.Required_Field__c");
                        var target = [];
                        target.push(fieldId, fieldLabel, fieldData, requiredField, fId);
                        var evt = $A.get("e.c:PreviewEvent");
                        evt.setParams({ "formFieldData": target });
                        evt.fire();
                    }
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store Last Name From FullName Field
    lastNameValue: function(component, event, helper) {
        try {
            var fId = component.get('v.fId');
            var pageId = component.get('v.PageId');
            try {
                var fieldData = event.getSource().get("v.value").toString();
            } catch (error) {
                var fieldData = '';
            }
            if (fieldData == '') {
                component.set("v.FieldData", '');
            } else {
                component.set("v.FieldData", fieldData);
            }
            // Save data in field object
            var action = component.get("c.fullNameSave");
            action.setParams({
                'pageId': pageId,
                'fieldId': fId,
                'fieldData': fieldData,
                'fieldType': 'Last Name'
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Save Data, Please Reload Page");
                } else {
                    // Event For pass data to preview
                    var fieldId = response.getReturnValue();
                    if (fieldId != null) {
                        var fieldLabel = 'Last Name';
                        var requiredField = component.get("v.FieldAttribute.Required_Field__c");
                        var target = [];
                        target.push(fieldId, fieldLabel, fieldData, requiredField, fId);
                        var evt = $A.get("e.c:PreviewEvent");
                        evt.setParams({ "formFieldData": target });
                        evt.fire();
                    }
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store Scale Rating Field Data
    saveLikertValue: function(component, event, helper) {
        try {
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
            helper.saveData(component, event, helper, fieldData);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store Address Field Data
    addressValue: function(component, event, helper) {
        try {
            var street = component.find('addressValue').get("v.street");
            var city = component.find('addressValue').get("v.city");
            var region = component.find('addressValue').get("v.province");
            var postalCode = component.find('addressValue').get("v.postalCode");
            var country = component.find('addressValue').get("v.country");

            var addressLabel = [];
            addressLabel.push('Street', 'City', 'Region', 'PostalCode', 'Country');

            var addressValue = [];
            addressValue.push(street, city, region, postalCode, country);
            var requiredField = component.get("v.FieldAttribute.Required_Field__c");

            var pageId = component.get('v.PageId');
            var fieldId = component.get('v.fId');

            for (let i = 0; i < addressValue.length; i++) {
                if (addressValue[i] == '') {
                    component.set("v.FieldData", '');
                    break;
                } else {
                    component.set("v.FieldData", addressValue);
                }
            }

            var action = component.get("c.addressFieldSave");
            action.setParams({
                'pageId': pageId,
                'fieldId': fieldId,
                'street': street,
                'city': city,
                'region': region,
                'postalCode': postalCode,
                'country': country,
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Save Data, Please Reload Page");
                } else {
                    // Event For pass data to preview
                    var addressId = response.getReturnValue();
                    if (addressId != null) {
                        var target = [];
                        for (let i = 0; i < addressId.length; i++) {
                            var addressList = [];
                            addressList.push(addressId[i], addressLabel[i], addressValue[i], requiredField, fieldId);
                            target.push(addressList);
                        }
                        target.push('');
                        var evt = $A.get("e.c:PreviewEvent");
                        evt.setParams({ "formFieldData": target });
                        evt.fire();
                    }
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store Link Field Data
    linkValue: function(component, event, helper) {
        try {
            var pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
            var fieldData = event.getSource().get("v.value").toString();
            var validation = pattern.test(fieldData);
            if (validation == false) {
                var fieldData = '';
            }
        } catch (error) {
            var fieldData = '';
        }
        helper.saveData(component, event, helper, fieldData);
    },

    // For Store Email Field Data
    emailValue: function(component, event, helper) {
        try {
            var pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
            var fieldData = event.getSource().get("v.value").toString();
            var validation = pattern.test(fieldData);
            if (validation == false) {
                var fieldData = '';
            }
        } catch (error) {
            var fieldData = '';
        }
        helper.saveData(component, event, helper, fieldData);
    },

    // For Store Phone Field Data
    phoneValue: function(component, event, helper) {
        try {
            var pattern = /[0-9]{10}$/;
            var fieldData = event.getSource().get("v.value").toString();
            var validation = pattern.test(fieldData);
            if (validation == false) {
                var fieldData = '';
            }
        } catch (error) {
            var fieldData = '';
        }
        helper.saveData(component, event, helper, fieldData);
    },

    // For Store File Upload Field Data
    handleFilesChange: function(component, event, helper) {
        try {
            if (event.getSource().get("v.files").length > 0) {
                var fileName = event.getSource().get("v.files")[0]['name'];
                component.set("v.fileName", fileName);
                helper.uploadHelper(component, event);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // For Signature Field
    signInit: function(component, event, helper) {
        try {
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

            var disableField = component.get("v.disableField");

            if (disableField != true) {

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
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // For Clear Signature
    erase: function(component, event, helper) {
        try {
            var canvas = component.find('can').getElement();
            var ctx = canvas.getContext("2d");
            var w = canvas.width;
            var h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            var target = [];
            var fId = component.get('v.fId');
            var fieldLabel = component.get("v.FieldAttribute.Label__c");
            var requiredField = component.get("v.FieldAttribute.Required_Field__c");
            target.push(fId, fieldLabel, '', requiredField);
            var evt = $A.get("e.c:PreviewEvent");
            evt.setParams({ "formFieldData": target });
            evt.fire();

        } catch (error) {
            console.log({ error });
        }
    },

    // For Store Signature Field Data
    saveSignature: function(component, event, helper) {
        try {
            var pad = component.find('can').getElement();
            var fieldData = pad.toDataURL();
            var fId = component.get('v.fId');
            var fieldLabel = component.get("v.FieldAttribute.Label__c");
            var target = [];

            var canvas = component.find('can').getElement();
            var ctx = canvas.getContext("2d");
            const pixelBuffer = new Uint32Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
            const blank = !pixelBuffer.some(color => color !== 0)

            // Save data in field object
            if (blank == true) {
                component.set("v.FieldData", '');
            } else {
                component.set("v.FieldData", 'Done');
                var action = component.get("c.signatureSave");
                action.setParams({
                    'fieldId': fId,
                    'fieldData': fieldData
                });
                action.setCallback(this, function(response) {
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong In Save Data, Please Reload Page");
                    } else {
                        var fieldData = response.getReturnValue();
                        var requiredField = component.get("v.FieldAttribute.Required_Field__c");
                        target.push(fId, fieldLabel, fieldData, requiredField);
                        var evt = $A.get("e.c:PreviewEvent");
                        evt.setParams({ "formFieldData": target });
                        evt.fire();
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store Checkbox Field Data
    checkboxValue: function(component, event, helper) {
        try {
            var fieldData = event.getSource().get('v.checked');
            helper.saveData(component, event, helper, fieldData);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store Star Rating Field Data
    ratingvalue: function(component, event, helper) {
        try {
            var fieldData = event.target.value;
            helper.saveData(component, event, helper, fieldData);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store Emoji Rating Field Data
    emojivalue: function(component, event, helper) {
        try {
            var fieldData = event.target.value;
            helper.saveData(component, event, helper, fieldData);
        } catch (error) {
            console.log({ error });
        }
    },

    // Fire Event When Click on Field For Open Field Attribure Validation
    handleid: function(component, event, helper) {
        try {
            var target = event.target.name;
            if (target != '') {
                var evt = $A.get("e.c:FieldEvent");
                evt.setParams({ "records": target });
                evt.fire();
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // Set Icon And Show Record of LookUp Field Search
    searchAction: function(component, event, helper) {
        try {
            helper.saveData(component, event, helper, '');
            var searchKey = component.find("searchKey").get("v.value");
            var objName = component.get("v.FormField.LookUp_Obj__c");
            if (objName == 'Account') {
                component.set("v.RecordIcon", 'standard:account');
            } else if (objName == 'Contact') {
                component.set("v.RecordIcon", 'standard:contact');
            } else if (objName == 'Lead') {
                component.set("v.RecordIcon", 'standard:lead');
            } else if (objName == 'Case') {
                component.set("v.RecordIcon", 'standard:case');
            } else if (objName == 'Opportunity') {
                component.set("v.RecordIcon", 'standard:opportunity');
            } else if (objName == 'Task') {
                component.set("v.RecordIcon", 'standard:task');
            } else {
                component.set("v.RecordIcon", 'custom:custom57');
            }
            var action = component.get("c.findByName");
            action.setParams({
                'searchKey': searchKey,
                'objName': objName
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
                } else {
                    component.set("v.Records", response.getReturnValue());
                    if (response.getReturnValue() != '') {
                        component.set("v.ShowRecList", true);
                    } else {
                        component.set("v.ShowRecList", false);
                    }
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // For Store LookUp Field Data
    showRec: function(component, event, helper) {
        try {
            var idx = event.target.getAttribute('data-index');
            var rowRecord = component.get("v.Records")[idx];
            component.set("v.selectRecordName", rowRecord.Name);
            component.set("v.ShowRecList", false);
            var fieldData = rowRecord.Id;
            helper.saveData(component, event, helper, fieldData);
        } catch (error) {
            console.log({ error });
        }
    },

    // fire event after check field data is null
    blankValueCheck: function(component, event, helper) {
        try {
            var fieldData = event.getSource().get("v.value");
            if (fieldData == '') {
                component.set("v.FieldData", '');
                // Event For pass data to preview
                var fId = component.get('v.fId');
                var fieldLabel = component.get("v.FieldAttribute.Label__c");
                var requiredField = component.get("v.FieldAttribute.Required_Field__c");
                var target = [];
                target.push(fId, fieldLabel, fieldData, requiredField);
                var evt = $A.get("e.c:PreviewEvent");
                evt.setParams({ "formFieldData": target });
                evt.fire();
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // fire event after check Last Name field data is null
    blankValueCheckLastName: function(component, event, helper) {
        try {
            var fieldData = event.getSource().get("v.value");
            if (fieldData == '') {
                component.set("v.FieldData", '');
                var fId = component.get('v.fId');
                var pageId = component.get('v.PageId');
                var requiredField = component.get("v.FieldAttribute.Required_Field__c");
                var action = component.get("c.fullNameData");
                action.setParams({
                    'pageId': pageId,
                    'fieldId': fId,
                    'fieldType': 'Last Name'
                });
                action.setCallback(this, function(response) {
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
                    } else {
                        // Event For pass data to preview
                        var fieldId = response.getReturnValue();
                        if (fieldId != null) {
                            var fieldLabel = 'Last Name';
                            var target = [];
                            target.push(fieldId, fieldLabel, '', requiredField);
                            var evt = $A.get("e.c:PreviewEvent");
                            evt.setParams({ "formFieldData": target });
                            evt.fire();
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // fire event after check First Name field data is null
    blankValueCheckFirstName: function(component, event, helper) {
        try {
            var fieldData = event.getSource().get("v.value");
            if (fieldData == '') {
                component.set("v.FieldData", '');
                var fId = component.get('v.fId');
                var pageId = component.get('v.PageId');
                var requiredField = component.get("v.FieldAttribute.Required_Field__c");
                var action = component.get("c.fullNameData");
                action.setParams({
                    'pageId': pageId,
                    'fieldId': fId,
                    'fieldType': 'First Name'
                });
                action.setCallback(this, function(response) {
                    if (response.getReturnValue() == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong In Save Data, Please Reload Page");
                    } else {
                        // Event For pass data to preview
                        var fieldId = response.getReturnValue();
                        if (fieldId != null) {
                            var fieldLabel = 'First Name';
                            var target = [];
                            target.push(fieldId, fieldLabel, '', requiredField);
                            var evt = $A.get("e.c:PreviewEvent");
                            evt.setParams({ "formFieldData": target });
                            evt.fire();
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },

})