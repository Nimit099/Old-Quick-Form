({
    // Run method on click for set field style
    showOnClick: function(component, event, helper) {
        try {
            // let mqls = [
            //     window.matchMedia("(max-width: 2002px)"),
            //     window.matchMedia("(max-width: 1488px)"),
            //     window.matchMedia("(max-width: 1463px)"),
            //     window.matchMedia("(max-width: 1224px)"),
            //     window.matchMedia("(max-width: 1124px)"),
            //     window.matchMedia("(max-width: 1024px)"),
            //     window.matchMedia("(max-width: 924px)"),
            //     window.matchMedia("(max-width: 865px)"),
            //     window.matchMedia("(max-width: 755px)"),
            //     window.matchMedia("(max-width: 655px)"),
            //     window.matchMedia("(max-width: 532px)"),
            //     window.matchMedia("(max-width: 445px)"),
            //     window.matchMedia("(max-width: 359px)"),
            //     // window.matchMedia("(max-width: 1602px)"),
            // ];
            // if (mqls[0].matches) {
            //     var a = document.querySelector('.fieldDiv2');
            //     a.style.display = "block";
            //     a.style.position = "absolute";
            //     a.style.left = "3%";
            //     a.style.width = "17%";
            //     a.style.border = "1px solid lightgray";
            // }
            // if (mqls[1].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "3.9%";
            //     b.style.width = "21.2%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[2].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "4.2%";
            //     b.style.width = "23%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[3].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "5%";
            //     b.style.width = "25%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[4].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "5.7%";
            //     b.style.width = "28%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[5].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "5.8%";
            //     b.style.width = "30%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[6].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "5.7%";
            //     b.style.width = "31.3%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[7].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "6%";
            //     b.style.width = "33%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[8].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "7%";
            //     b.style.width = "35%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[9].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "8%";
            //     b.style.width = "40%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[10].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "9%";
            //     b.style.width = "48%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[11].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "11%";
            //     b.style.width = "50%";
            //     b.style.border = "1px solid lightgray";
            // }
            // if (mqls[12].matches) {
            //     var b = document.querySelector('.fieldDiv2');
            //     b.style.display = "block";
            //     b.style.position = "absolute";
            //     b.style.left = "14%";
            //     b.style.width = "89%";
            //     b.style.border = "1px solid lightgray";
            // }

            // Show Field Section If User Can Click From Form Editor
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
            action.setCallback(this, function(response) {});
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // File Upload Helper
    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000, //Chunk Max size 750Kb 

    uploadHelper: function(component, event) {
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
    },

    uploadProcess: function(component, file, fileContents) {
        var startPosition = 0;
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');
    },

    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        var getchunk = fileContents.substring(startPosition, endPosition);
        var action = component.get("c.SaveFile");
        action.setParams({
            fileName: file.name,
            base64Data: encodeURIComponent(getchunk),
            contentType: file.type,
        });
        action.setCallback(this, function(response) {
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
        });
        $A.enqueueAction(action);
    },
})