({
    // Run method for Show Field Section If User Can Click From Form Editor
    showOnClick: function(component, event, helper) {
        try {
            var showFieldSection = component.get("v.disableField");
            if (showFieldSection != undefined) {
                var validationBar = document.querySelector('.fieldDiv2');
                validationBar.style.display = "block";
                var r = document.querySelector(':root');
                r.style.setProperty('--hidetabdisplay', 'none');
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // Run method on blur for save field data
    saveData: function(component, event, helper, fieldData) {
        try {
            if (fieldData == '') {
                component.set("v.FieldData", '');
            } else {
                component.set("v.FieldData", fieldData);
            }

            var fId = component.get('v.fId');
            // Event For pass data to preview
            var fieldLabel = component.get("v.FieldAttribute.Label__c");
            var requiredField = component.get("v.FieldAttribute.Required_Field__c");
            var target = [];
            target.push(fId, fieldLabel, fieldData, requiredField);
            var evt = $A.get("e.c:PreviewEvent");
            evt.setParams({ "formFieldData": target });
            evt.fire();

            // Save data in field object
            var action = component.get("c.fieldSave");
            action.setParams({
                'fieldId': fId,
                'fieldData': fieldData
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

    // -------------------------- File Upload Helper Start --------------------------
    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000, //Chunk Max size 750Kb 

    uploadHelper: function(component, event) {
        try {
            var fileInput = component.find("fuploader").get("v.files");
            var file = fileInput[0];
            var self = this;
            if (file.size > self.MAX_FILE_SIZE) {
                component.set("v.fileName", 'Alert : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
                return;
            }

            var objFileReader = new FileReader();
            objFileReader.onload = $A.getCallback(function() {
                var fileContents = objFileReader.result;
                var base64 = 'base64,';
                var dataStart = fileContents.indexOf(base64) + base64.length;
                fileContents = fileContents.substring(dataStart);
                self.uploadProcess(component, file, fileContents);
            });
            objFileReader.readAsDataURL(file);
        } catch (error) {
            console.log({ error });
        }
    },

    uploadProcess: function(component, file, fileContents) {
        try {
            var startPosition = 0;
            var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
            this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');
        } catch (error) {
            console.log({ error });
        }
    },

    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        try {
            var getchunk = fileContents.substring(startPosition, endPosition);
            var action = component.get("c.SaveFile");
            action.setParams({
                fileName: file.name,
                base64Data: encodeURIComponent(getchunk),
                contentType: file.type,
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong In Save Data, Please Reload Page");
                } else {
                    var fieldData = response.getReturnValue();
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
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },
    // -------------------------- File Upload Helper End --------------------------

})