({
    getFormList: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            var action = component.get("c.getForm");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var oRes = response.getReturnValue();
                    if (oRes.length > 0) {
                        component.set("v.spinner", false);
                        component.set('v.listOfAllForms', oRes);
                        component.set('v.PaginationList', oRes);
                        component.set("v.totalRecordsCount", oRes.length);
                        component.set('v.PaginationListForSeacrch', oRes);
                        component.set("v.selectedCount", 0);
                        component.set("v.bNoRecordsFound", false);
                        component.find("selectAllId").set("v.value", false);
                    } else {
                        // if there is no records then display message
                        component.set("v.spinner", false);
                        component.set("v.bNoRecordsFound", true);
                    }
                } else {
                    component.set("v.spinner", false);
                    alert('Error...');
                }
            });
            $A.enqueueAction(action);

            setTimeout(
                $A.getCallback(function() {
                    var imagebutton = document.querySelectorAll('.imagebutton, .imagebutton1');
                    for (var i of imagebutton) {
                        i.style.filter = "contrast(0.7)";
                    }
                }), 10
            );

        } catch (error) {
            console.log({ error });
        }
    },

    getFormListFolderWise: function(component, event, helper) {
        try {
            component.set("v.bNoRecordsFound", false);
            component.set("v.spinnerDataTable", true);
            var folderId = component.get("v.divFolderId");
            var action = component.get("c.getFormInFolder");
            action.setParams({
                'folderId': folderId
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.spinnerDataTable", false);
                    var oRes = response.getReturnValue();
                    if (oRes.length > 0) {
                        component.set('v.listOfAllForms', oRes);
                        component.set("v.totalRecordsCount", oRes.length);
                        component.set("v.PaginationList", oRes);
                        component.find("selectAllId").set("v.value", false);
                    } else {
                        // if there is no records then display message
                        component.set("v.totalRecordsCount", oRes.length);
                        component.set("v.bNoRecordsFound", true);
                    }
                } else {
                    component.set("v.spinnerDataTable", false);
                    alert('Error...');
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    getFolderList: function(component, event, helper) { // Created By Nitin
        try {
            var action = component.get("c.getFolder");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var oRes = response.getReturnValue();
                    if (oRes.length > 0) {
                        component.set('v.availableFolder', oRes);
                    } else {
                        // if there is no records then display message
                        alert("No folder found");
                    }
                } else {
                    alert('Error...');
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    deleteAllRecords: function(component, event, helper) {
        try {
            var allRecords = component.get("v.listOfAllForms");
            var selectedRecords = [];
            for (var i = 0; i < allRecords.length; i++) {
                if (allRecords[i].isChecked) {
                    selectedRecords.push(allRecords[i].objForm);
                }
            }
            var action = component.get("c.deleteSelectedRecord");
            action.setParams({ 'selectedRecords': selectedRecords });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    helper.showToast("Success", "Success", "Form Successfully deleted.", "5000");
                    component.set("v.listOfAllForms", response.getReturnValue());
                } else {
                    helper.showToast("Error", "Error Occur", "Something went wrong to delete form.", "5000");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    search: function(component, event, helper) {
        try {
            var searchfilter = event.getSource().get("v.value").toUpperCase();
            var allrecords = component.get("v.listOfAllForms");
            var PaginationListForSeacrch = component.get("v.PaginationListForSeacrch");
            var tempArray = [];
            for (var i = 0; i < allrecords.length; i++) {
                if ((allrecords[i].objForm.Title__c && allrecords[i].objForm.Title__c.toUpperCase().indexOf(searchfilter) != -1) ||
                    (allrecords[i].objForm.Description__c && allrecords[i].objForm.Description__c.toUpperCase().indexOf(searchfilter) != -1)) {
                    tempArray.push(allrecords[i]);
                }
            }
            if (tempArray.length == 0) {
                helper.showToast("Info", "Info", "No Records Found.", "5000");
                component.set("v.NoRecordsFound", true);
            } else {
                component.set("v.PaginationList", tempArray);
                component.set("v.NoRecordsFound", false);
            }
            if (searchfilter.length == 0) {
                component.set("v.PaginationList", PaginationListForSeacrch);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    showToast: function(type, title, message, time) {
        try {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": title,
                "type": type,
                "message": message,
                "duration": time
            });
            toastEvent.fire();
        } catch (error) {
            console.log({ error });
        }
    },

    createForm: function(component, event, helper) {
        try {
            var formId = component.get("v.Form");
            var formTitle = component.get("v.Form.Title__c");
            var parentFolderName = component.get("v.parentFolderName");
            if (formTitle == "") {
                helper.showToast("Error", "Error", "Please Fill the Form Title..", "5000");
            } else {
                var action = component.get('c.createFormrecord');
                action.setParams({
                    'formId': formId,
                    'parentFolderNameForForm': parentFolderName
                });
                action.setCallback(this, function(response) {
                    var r = document.querySelector(':root');
                    r.style.setProperty('--formbgiamge', '');
                    r.style.setProperty('--pagebgimage', '');

                    var state = response.getState();
                    if (response.getReturnValue() == "error") {
                        helper.showToast("Error", "Error", "Cannot allow duplicate Form Title", "5000");
                    } else {
                        helper.showToast("Success", "Success", "New Form Created Successfully.");
                        var evt = $A.get("e.force:navigateToComponent");
                        evt.setParams({
                            componentDef: "c:QuickFormMainComp",
                            componentAttributes: {
                                FormId: response.getReturnValue()

                            }
                        });
                        evt.fire();
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    openModal: function(component, event, helper) {
        try {
            var modal = component.find("Modal");
            var modalBackdrop = component.find("ModalBackdrop");
            $A.util.addClass(modal, "slds-fade-in-open");
            $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    closeModal: function(component, event, helper) {
        try {
            var modal = component.find("Modal");
            var modalBackdrop = component.find("ModalBackdrop");
            $A.util.removeClass(modal, "slds-fade-in-open");
            $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    createNewFolderModal: function(component, event, helper) { // Created By Nitin
        try {
            var modal = component.find("new_Folder");
            var modalBackdrop = component.find("ModalBackdrop_folder");
            $A.util.addClass(modal, "slds-fade-in-open");
            $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    cancleNewFolder: function(component, event, helper) { // Created By Nitin
        try {
            var modal = component.find("new_Folder");
            var modalBackdrop = component.find("ModalBackdrop_folder");
            $A.util.removeClass(modal, "slds-fade-in-open");
            $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    createMoveFormModal: function(component, event, helper) { // Created By Nitin
        try {
            var mainFolder = component.get("v.mainFolderName");
            component.set("v.parentFolderName", mainFolder);
            component.set("v.disableSave", false);
            component.set("v.ShowRecList", false);
            var modal = component.find("move_Form");
            var modalBackdrop = component.find("ModalBackdrop_Moveform");
            $A.util.addClass(modal, "slds-fade-in-open");
            $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    cancleMoveForm: function(component, event, helper) { // Created By Nitin
        try {
            var modal = component.find("move_Form");
            var modalBackdrop = component.find("ModalBackdrop_Moveform");
            $A.util.removeClass(modal, "slds-fade-in-open");
            $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    createMoveFolderModal: function(component, event, helper) { // Created By Nitin
        try {
            var mainFolder = component.get("v.mainFolderName");
            component.set("v.parentFolderName", mainFolder);
            component.set("v.disableSave", false);
            component.set("v.ShowRecList", false);
            var modal = component.find("move_Folder");
            var modalBackdrop = component.find("ModalBackdrop_Movefolder");
            $A.util.addClass(modal, "slds-fade-in-open");
            $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    cancleMoveFolder: function(component, event, helper) { // Created By Nitin
        try {
            var modal = component.find("move_Folder");
            var modalBackdrop = component.find("ModalBackdrop_Movefolder");
            $A.util.removeClass(modal, "slds-fade-in-open");
            $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    RenameFormModal: function(component, event, helper) { // Created By Nitin
        try {
            var modal = component.find("rename_Form");
            var modalBackdrop = component.find("ModalBackdrop_renameForm");
            $A.util.addClass(modal, "slds-fade-in-open");
            $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    cancleRenameForm: function(component, event, helper) { // Created By Nitin
        try {
            var modal = component.find("rename_Form");
            var modalBackdrop = component.find("ModalBackdrop_renameForm");
            $A.util.removeClass(modal, "slds-fade-in-open");
            $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    renameFolderModal: function(component, event, helper) { // Created By Nitin
        try {
            var modal = component.find("rename_Folder");
            var modalBackdrop = component.find("ModalBackdrop_renameFolder");
            $A.util.addClass(modal, "slds-fade-in-open");
            $A.util.addClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    cancleRenameFolder: function(component, event, helper) { // Created By Nitin
        try {
            var modal = component.find("rename_Folder");
            var modalBackdrop = component.find("ModalBackdrop_renameFolder");
            $A.util.removeClass(modal, "slds-fade-in-open");
            $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
        } catch (error) {
            console.log({ error });
        }
    },

    dropOnEdit: function(component, event, helper) { // Created By Nitin
        try {
            var id = component.get("v.FormId");
            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:QuickFormMainComp",
                componentAttributes: {
                    FormId: component.get("v.FormId")
                }
            });
            window.setTimeout(function() { location.reload() }, 500);

            evt.fire();


        } catch (error) {
            console.log({ error });
        }
    },

    deleteRecord: function(component, event, helper) { // Created By Nitin
        try {
            var fid = component.get("v.FormId");
            var action = component.get("c.deleteForm");
            action.setParams({
                "formId": fid
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    helper.showToast("Success", "Success", "Form Successfully deleted.", "5000");
                    component.set("v.listOfAllForms", response.getReturnValue());
                } else {
                    helper.showToast("Error", "Error Occur", "Something went wrong to delete form.", "5000");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    activeDeactiveForm: function(component, event, helper) { // Created By Nitin
        try {
            var fid = component.get("v.FormId");
            var action = component.get("c.activeDeactiveFormRecord");
            action.setParams({
                "formId": fid
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state != "SUCCESS") {
                    helper.showToast("Error", "Error Occur", "Something went wrong to Active / Deactive form.", "5000");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    renameForm: function(component, event, helper) { // Created By Nitin
        try {
            var newFormName = component.get("v.newFormName");
            var action = component.get("c.renameFormRecord");
            action.setParams({
                "newFormName": newFormName,
                "formId": component.get("v.FormId")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    helper.showToast("Success", "Success", "Form Successfully Renamed.", "5000");
                    component.set("v.listOfAllForms", response.getReturnValue());
                } else {
                    helper.showToast("Error", "Error Occur", "Something went wrong to Rename form.", "5000");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    moveForm: function(component, event, helper) { // Created By Nitin
        try {
            component.set("v.selected", '');
            var allRecords = component.get("v.listOfAllForms");
            var parentFolderNameForFormMove = component.get("v.parentFolderName");
            var selectedRecords = [];
            for (var i = 0; i < allRecords.length; i++) {
                if (allRecords[i].isChecked) {
                    selectedRecords.push(allRecords[i].objForm);
                }
            }
            var action = component.get("c.moveFormRecord");
            action.setParams({
                'selectedRecords': selectedRecords,
                'parentFolderNameForFormMove': parentFolderNameForFormMove
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    helper.showToast("Success", "Success", "Form Successfully Moved.", "5000");
                    component.set("v.listOfAllForms", response.getReturnValue());
                } else {
                    helper.showToast("Error", "Error Occur", "Something went wrong to Move form.", "5000");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    createFolder: function(component, event, helper) { // Created By Nitin
        try {
            var folder = component.get("v.folder");
            var folderName = component.get("v.folder.Name");
            var parentFolderName = component.get("v.parentFolderName");
            if (folderName == "") {
                helper.showToast("Error", "Error", "Please Enter Folder Name.", "5000");
                component.set("v.spinner", false);
            } else {
                component.set("v.selected", '');
                var action = component.get("c.createFolderRecord");
                action.setParams({
                    'folder': folder,
                    'parentFolderName': parentFolderName
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (response.getReturnValue() == "error") {
                        component.set("v.spinner", false);
                        helper.showToast("Error", "Error", "Duplicate Folder Name", "5000");
                    } else {
                        component.set("v.spinner", false);
                        helper.showToast("Success", "Success", "New Folder Created Successfully.");
                        var newFolder = {
                            'SObjectType': 'Folder__c',
                            'Name': '',
                            'Description__c': '',
                            'FolderId__c': '',
                            'Active__c': false
                        };
                        component.set("v.folder", newFolder);
                        component.set("v.parentFolderName", 'zero');
                        component.set("v.divFolderId", response.getReturnValue());
                        component.set("v.selected", response.getReturnValue());
                        helper.handleSelect(component, event, helper);
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    deleteFolder: function(component, event, helper) { // Created By Nitin
        try {
            var divFolderId = component.get("v.divFolderId");
            if (divFolderId == "") {
                helper.showToast("Error", "Error", "Please Select Folder.", "5000");
            } else {
                component.set("v.selected", '');
                var action = component.get("c.deleteFolderRecord");
                action.setParams({
                    'divFolderId': divFolderId
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (response.getReturnValue() == "error") {
                        helper.showToast("Error", "Error", " Folder Not Found", "5000");
                    } else {
                        helper.showToast("Success", "Success", "Folder Deleted Successfully.");
                        component.set("v.newFolderName", null);
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    renameFolder: function(component, event, helper) { // Created By Nitin
        try {
            var divFolderId = component.get("v.divFolderId");
            var newFolderName = component.get("v.newFolderName");
            if (divFolderId == "") {
                helper.showToast("Error", "Error", "Please Select Folder.", "5000");
            } else {
                var action = component.get("c.renameFolderRecord");
                action.setParams({
                    'divFolderId': divFolderId,
                    'newFolderName': newFolderName
                });
                action.setCallback(this, function(response) {
                    component.set("v.selected", divFolderId);
                    var state = response.getState();
                    if (response.getReturnValue() == "error") {
                        helper.showToast("Error", "Error", " Duplicate Folder Name", "5000");
                    } else {
                        helper.showToast("Success", "Success", "Folder Renamed Successfully.");
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    moveFolder: function(component, event, helper) { // Created By Nitin
        try {
            var divFolderId = component.get("v.divFolderId");
            var parentFolderNameForMove = component.get("v.parentFolderName");
            if (divFolderId == "") {
                helper.showToast("Error", "Error", "Please Select Folder.", "5000");
                var action = component.get('c.cancleMoveFolder');
            } else {
                component.set("v.selected", '');
                var action = component.get("c.moveFolderRecord");
                action.setParams({
                    'divFolderId': divFolderId,
                    'parentFolderNameForMove': parentFolderNameForMove
                });
                action.setCallback(this, function(response) {
                    component.set("v.selected", divFolderId);
                    if (response.getReturnValue() == "error") {
                        helper.showToast("Error", "Error", "Something Went Wrong", "5000");
                    } else {
                        helper.showToast("Success", "Success", "Folder Moved Successfully.");
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    // =========================== for folder tree heirchy part  start ===========================
    callToServer: function(component, method, callback, params) {
        try {
            var action = component.get(method);
            if (params) {
                action.setParams(params);
            }
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    callback.call(this, response.getReturnValue());
                } else if (state === "ERROR") {
                    alert('Problem with connection. Please try again.');
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },
    // =========================== for folder tree heirchy part  start ===========================

    getMainFolderId: function(component, event, helper) {
        try {
            var action = component.get("c.getMainFolder");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.MainFolderId", response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },
    handleSelect: function(component, event, helper) {
        try {
            component.set("v.selectedCount", 0);
            var myName = component.get("v.divFolderId");
            // for set cursor style on button hover
            var MainFolder = component.get("v.MainFolderId");
            if (myName == MainFolder) {
                var imagebutton = document.querySelectorAll('.imagebutton');
                for (var i of imagebutton) {
                    component.set("v.clicksubfolder", false);
                    i.style.filter = "contrast(0.7)";

                }
                var imagebutton1 = document.querySelector('.imagebutton1');
                imagebutton1.style.filter = "contrast(1)";
            } else {
                var imagebutton = document.querySelectorAll('.imagebutton');
                for (var i of imagebutton) {

                    i.style.filter = "contrast(1)";
                }
                var imagebutton1 = document.querySelector('.imagebutton1');
                imagebutton1.style.filter = "contrast(1)";
            }
            if (myName != MainFolder && myName != '') {
                var btnClass = document.querySelectorAll('.changeCursor');
                for (var cls of btnClass) {
                    cls.style.cursor = 'pointer';
                }
            } else {
                var btnClass = document.querySelectorAll('.changeCursor');
                for (var cls of btnClass) {
                    cls.style.cursor = 'default';
                }
            }
            if (myName != '') {
                var btnClass = document.querySelector('.changeCursor1');
                btnClass.style.cursor = 'pointer';
            }
            var action = component.get("c.getFolderName");
            action.setParams({
                'divFolderId': myName
            });
            action.setCallback(this, function(response) {
                if (response.getReturnValue() == "error") {
                    helper.showToast("Error", "Error", " Folder Not Found", "5000");
                } else {
                    component.set("v.newFolderName", response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
            helper.getFormListFolderWise(component, event, helper);
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for new form and new folder
    searchFolderAction: function(component, event, helper, searchKey) {
        try {
            component.set("v.disableSave", true);
            if (searchKey.length != 0) {
                var action = component.get("c.findFolder");
                action.setParams({
                    'searchKey': searchKey,
                });
                action.setCallback(this, function(response) {
                    component.set("v.FolderRecords", response.getReturnValue());
                    if (response.getReturnValue() != '') {
                        component.set("v.ShowRecList", true);
                    } else {
                        component.set("v.ShowRecList", false);
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList", false);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // disable save button of model
    disableSave: function(component, event, helper) {
        try {
            var currentFolder = component.get("v.newFolderName");
            if (currentFolder == undefined) {
                var mainFolder = component.get("v.mainFolderName");
                component.set("v.parentFolderName", mainFolder);
            } else {
                component.set("v.parentFolderName", currentFolder);
            }
            component.set("v.disableSave", false);
            component.set("v.ShowRecList", false);
        } catch (error) {
            console.log({ error });
        }
    }
})