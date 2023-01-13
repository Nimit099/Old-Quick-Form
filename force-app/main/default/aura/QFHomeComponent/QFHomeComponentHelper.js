({
    getFormList: function (component, event, helper) {
        try {
            component.set("v.spinner", true);
            var actiont = component.get("c.getUserName");
            actiont.setCallback(this, function (response) {
                var returnVal = response.getReturnValue();
                if (returnVal == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "User Name Loading Error");
                } else {
                    component.set("v.Name", returnVal);
                }
            });
            $A.enqueueAction(actiont);

            var r = document.querySelector(':root');
            r.style.setProperty('--lwc-squareIconMediumContentAlt', '1rem');
            var action = component.get("c.getForm");
            action.setCallback(this, function (response) {

                var oRes = response.getReturnValue();
                if (oRes == null) {
                    component.set("v.spinner", false);
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Loading Error");
                } else {
                    if (oRes.length > 0) {
                        component.set("v.spinner", false);
                        component.set('v.listOfAllForms', oRes);
                        component.set('v.PaginationList', oRes);
                        component.set("v.totalRecordsCount", oRes.length);
                        component.set('v.PaginationListForSeacrch', oRes);
                        component.set("v.bNoRecordsFound", false);
                    } else {
                        component.set("v.spinner", false);
                        component.set("v.bNoRecordsFound", true);
                    }
                }
            });
            $A.enqueueAction(action);

            setTimeout(
                $A.getCallback(function () {
                    var imagebutton = document.querySelectorAll('.imagebutton, .imagebutton1');
                    for (var i of imagebutton) {
                        i.style.filter = "contrast(0.85)";
                    }
                }), 10
            );

        } catch (error) {
            console.log({ error });
        }
    },

    getFormListFolderWise: function (component, event, helper) {
        try {
            component.set("v.bNoRecordsFound", false);
            component.set("v.spinnerDataTable", true);
            var folderId = component.get("v.divFolderId");
            var action = component.get("c.getFormInFolder");
            action.setParams({
                'folderId': folderId
            });
            action.setCallback(this, function (response) {
                var oRes = response.getReturnValue();
                if (oRes == null) {
                    component.set("v.spinnerDataTable", false);
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Loading Error");
                } else {
                    component.set("v.spinnerDataTable", false);
                    if (oRes.length > 0) {
                        component.set('v.listOfAllForms', oRes);
                        component.set("v.totalRecordsCount", oRes.length);
                        component.set("v.PaginationList", oRes);
                        component.set("v.bNoRecordsFound", false);
                        component.set('v.disableSearchBox', false);
                    } else {
                        component.set('v.disableSearchBox', true);
                        component.set("v.totalRecordsCount", oRes.length);
                        component.set("v.bNoRecordsFound", true);
                    }
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    getFolderList: function (component, event, helper) {
        try {
            // component.set("v.spinnerForFolder", true);
            var action = component.get("c.getFolder");
            action.setCallback(this, function (response) {
                var oRes = response.getReturnValue();
                if (oRes == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Loading Error");
                } else {
                    if (oRes.length > 0) {
                        component.set('v.FolderRecords', oRes);
                    }
                }
            });
            $A.enqueueAction(action);
            component.set("v.spinnerForFolder", false);
        } catch (error) {
            console.log({ error });
            component.set("v.spinnerForFolder", false);
        }
    },

    search: function (component, event, helper) {
        try {
            var searchfilter = event.getSource().get("v.value").toUpperCase();
            var allrecords = component.get("v.listOfAllForms");
            var PaginationListForSeacrch = component.get("v.PaginationListForSeacrch");
            var tempArray = [];
            for (var i = 0; i < allrecords.length; i++) {
                if ((allrecords[i].objForm.Title__c && allrecords[i].objForm.Title__c.toUpperCase().indexOf(searchfilter) != -1)) {
                    tempArray.push(allrecords[i]);
                }
            }
            if (tempArray.length == 0) {
                // component.set("v.NoRecordsFound", true);
                component.set("v.bNoRecordsFound", true);
            } else {
                component.set("v.PaginationList", tempArray);
                // component.set("v.NoRecordsFound", false);
                component.set("v.bNoRecordsFound", false);
            }
            if (searchfilter.length == 0) {
                component.set("v.PaginationList", PaginationListForSeacrch);
                var folder = component.get("v.divFolderId");
                if (folder == '' || folder == undefined) {
                    helper.getFormList(component, event, helper);
                } else {
                    helper.getFormListFolderWise(component, event, helper);
                }
            }
        } catch (error) {
            console.log({ error });
        }
    },

    showToast: function (type, title, message, time) {
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

    createForm: function (component, event, helper) {
        try {
            var formId = component.get("v.Form");
            var formTitle = component.get("v.Form.Title__c");
            component.set("v.disableCreateFormBtn", true);
            component.set("v.Form.Title__c", formTitle.trim());     // For Removing Space from srtating and Ending of Form Titile
            var parentFolderName = component.get("v.parentFolderName");
            console.log("parentFolderName ==>" + parentFolderName);

            var parentFolderIdForMove = component.get("v.parentFolderId");
            console.log('parentFolderIdForMove-->' + parentFolderIdForMove);

            var currentFolder = component.get("v.divFolderId");
            console.log("currentFolder ===>" + currentFolder);

            if (parentFolderIdForMove == undefined) {
                parentFolderIdForMove = currentFolder;
            }
            console.log('parentFolderIdForMove after condition-->' + parentFolderIdForMove);

            if (formTitle == "") {
                component.find("toastCmp").showToastModel("Please Fill the Form Title", "Error");
            } else {
                var action = component.get('c.createFormrecord');
                action.setParams({
                    'formId': formId,
                    'parentFolderNameForForm': parentFolderName,
                    'parentFolderIdForMove': parentFolderIdForMove
                });
                action.setCallback(this, function (response) {
                    var r = document.querySelector(':root');
                    r.style.setProperty('--formbgiamge', '');
                    r.style.setProperty('--pagebgimage', '');

                    var returnVal = response.getReturnValue();
                    if (returnVal == "duplicate") {
                        component.find("toastCmp").showToastModel("Cannot allow duplicate Form Title", "Error");
                    } else if (returnVal == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        component.find("toastCmp").showToastModel("New Form Created Successfully", "success");
                        var evt = $A.get("e.force:navigateToComponent");
                        evt.setParams({
                            componentDef: "c:QFFormBuilderComponent",
                            componentAttributes: {
                                FormId: response.getReturnValue()
                            }
                        });
                        evt.fire();
                        window.setTimeout(function () { location.reload() }, 500);      // for reloading QFFormBuilderComponent component
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    openModal: function (component, event, helper) {
        try {
            component.set("v.isOpenNewForm", true);
        } catch (error) {
            console.log({ error });
        }
    },

    closeModal: function (component, event, helper) {
        try {
            component.set("v.isOpenNewForm", false);
            component.set("v.Form.Title__c", '');
            component.set("v.Form.Description__c", '');
            component.set("v.disableCreateFormBtn", false);

        } catch (error) {
            console.log({ error });
        }
    },

    createNewFolderModal: function (component, event, helper) {
        try {
            component.set("v.isOpenNewFolder", true);
        } catch (error) {
            console.log({ error });
        }
    },

    cancleNewFolder: function (component, event, helper) {
        try {
            component.set("v.isOpenNewFolder", false);
            component.set("v.folder.Name", '');
            component.set("v.folder.Description__c", '');
            component.set("v.disableCreateFolderBtn", false);

        } catch (error) {
            console.log({ error });
        }
    },

    createMoveFormModal: function (component, event, helper) {
        try {
            var mainFolder = component.get("v.mainFolderName");
            component.set("v.parentFolderName", mainFolder);
            component.set("v.disableSave", false);

            component.set("v.isOpenMoveForm", true);
        } catch (error) {
            console.log({ error });
        }
    },

    cancleMoveForm: function (component, event, helper) {
        try {
            component.set("v.isOpenMoveForm", false);
        } catch (error) {
            console.log({ error });
        }
    },

    createMoveFolderModal: function (component, event, helper) {
        try {
            var mainFolder = component.get("v.mainFolderName");
            component.set("v.parentFolderName", mainFolder);
            component.set("v.disableSave", false);
            component.set("v.isOpenMoveFolder", true);
        } catch (error) {
            console.log({ error });
        }
    },

    cancleMoveFolder: function (component, event, helper) {
        try {
            component.set("v.isOpenMoveFolder", false);
        } catch (error) {
            console.log({ error });
        }
    },

    RenameFormModal: function (component, event, helper) {
        try {
            component.set("v.isOpenRenameForm", true);
        } catch (error) {
            console.log({ error });
        }
    },

    cancleRenameForm: function (component, event, helper) {
        try {
            component.set("v.isOpenRenameForm", false);
            component.set("v.newFormName", '');
            component.set("v.disableRenameFormBtn", false);
        } catch (error) {
            console.log({ error });
        }
    },

    renameFolderModal: function (component, event, helper) {
        try {
            component.set("v.isOpenRenameFolder", true);
        } catch (error) {
            console.log({ error });
        }
    },

    cancleRenameFolder: function (component, event, helper) {
        try {
            component.set("v.isOpenRenameFolder", false);
            component.set("v.renameFolderName", '');
            component.set("v.disableRenameFolderBtn", false);
        } catch (error) {
            console.log({ error });
        }
    },

    openDeleteFormCFBox: function (component, event, helper) {
        try {
            component.set("v.isOpenDeleteForm", true);
        } catch (error) {
            console.log({ error });
        }
    },

    cancleDeleteFormCFBox: function (component, event, helper) {
        try {
            component.set("v.isOpenDeleteForm", false);
        } catch (error) {
            console.log({ error });
        }
    },

    openDeleteFolderCFBox: function (component, event, helper) {
        try {
            component.set("v.isOpenDeleteFolder", true);
        } catch (error) {
            console.log({ error });
        }
    },

    cancleDeleteFolderCFBox: function (component, event, helper) {
        try {
            component.set("v.isOpenDeleteFolder", false);
        } catch (error) {
            console.log({ error });
        }
    },

    dropOnEdit: function (component, event, helper) {
        try {
            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:QFFormBuilderComponent",
                componentAttributes: {
                    FormId: component.get("v.FormId")
                }
            });
            window.setTimeout(function () { location.reload() }, 500);
            evt.fire();
        } catch (error) {
            console.log({ error });
        }
    },

    deleteRecord: function (component, event, helper) {
        try {
            var divFolderId = component.get("v.divFolderId");
            component.set("v.selected", divFolderId);
            console.log("Selected is ===>" + component.get("v.selected"));
            var fid = component.get("v.FormId");
            var action = component.get("c.deleteForm");
            action.setParams({
                "formId": fid
            });
            action.setCallback(this, function (response) {
                var returnVal = response.getReturnValue();
                if (returnVal == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Deletion Error");
                } else {
                    component.find("toastCmp").showToastModel("Form Successfully deleted", "success");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    activeDeactiveForm: function (component, event, helper) {
        try {
            var fid = component.get("v.FormId");
            var action = component.get("c.activeDeactiveFormRecord");
            action.setParams({
                "formId": fid
            });
            action.setCallback(this, function (response) {
                var returnVal = response.getReturnValue();
                if (returnVal == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong to Active / Deactive form, Please Reload Page", "Content Updation Error");
                } else if (returnVal == "noForm") {
                    component.find("toastCmp").showToastModel("No Form Found", "Error");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    renameForm: function (component, event, helper) {
        try {
            var divFolderId = component.get("v.divFolderId");
            component.set("v.disableRenameFormBtn", true);
            component.set("v.selected", divFolderId);
            console.log("Selected is ===>" + component.get("v.selected"));
            var newFormName = component.get("v.newFormName");

            newFormName = newFormName.trim();
            console.log("New Name for Form after trim ===>" + newFormName + "<===== New name");

            var action = component.get("c.renameFormRecord");
            action.setParams({
                "newFormName": newFormName,
                "formId": component.get("v.FormId")
            });
            action.setCallback(this, function (response) {
                if (response.getReturnValue() == "success") {
                    helper.cancleRenameForm(component, event, helper);
                    component.find("toastCmp").showToastModel("Form Successfully Renamed.", "success");
                } else if (response.getReturnValue() == "duplicateRecord") {
                    component.find("toastCmp").showToastModel("Duplicate Form Name.", "Error");
                } else if (response.getReturnValue() == null) {
                    helper.cancleRenameForm(component, event, helper);
                    component.find("exceptionCmp").RunException("Something Went Wrong to Rename form, Please Reload Page", "Content Updation Error");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    moveForm: function (component, event, helper) {
        try {
            var divFolderId = component.get("v.divFolderId");
            component.set("v.selected", divFolderId);
            console.log("Selected is ===>" + component.get("v.selected"));
            var fid = component.get("v.FormId");
            var parentFolderNameForFormMove = component.get("v.parentFolderName");
            console.log("folder for form move ==>" + parentFolderNameForFormMove);

            var parentFolderIdForMove = component.get("v.parentFolderId");
            console.log('parentFolderIdForMove-->' + parentFolderIdForMove);

            if (parentFolderIdForMove == undefined) {
                parentFolderIdForMove = '';
            }
            console.log('parentFolderIdForMove after condition-->' + parentFolderIdForMove);

            var action = component.get("c.moveFormRecord");
            action.setParams({
                'selectedRecords': fid,
                'parentFolderNameForFormMove': parentFolderNameForFormMove,
                'parentFolderIdForMove': parentFolderIdForMove
            });
            action.setCallback(this, function (response) {
                var returnVal = response.getReturnValue();
                if (returnVal == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong to Move form, Please Reload Page", "Content Updation Error");
                } else {
                    component.find("toastCmp").showToastModel("Form Successfully Moved.", "success");
                    component.set("v.listOfAllForms", response.getReturnValue());
                    component.set("v.parentFolderId", undefined);
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    createFolder: function (component, event, helper) {
        try {
            component.set("v.spinner", true);
            component.set("v.disableCreateFolderBtn", true);
            var folder = component.get("v.folder");
            folder.Name = folder.Name.replace(/ +(?= )/g, '').trim();
            var folderName = component.get("v.folder.Name");
            var parentFolderName = component.get("v.parentFolderName");

            var parentFolderIdForMove = component.get("v.parentFolderId");
            console.log('parentFolderIdForMove-->' + parentFolderIdForMove);

            var currentFolder = component.get("v.divFolderId");
            console.log("currentFolder ===>" + currentFolder);

            if (parentFolderIdForMove == undefined) {
                parentFolderIdForMove = currentFolder;
            }
            console.log('parentFolderIdForMove after condition-->' + parentFolderIdForMove);


            if (folderName == "") {
                component.find("toastCmp").showToastModel("Please Enter Folder Name.", "Error");
                component.set("v.spinner", false);
            } else {
                component.set("v.selected", '');
                var action = component.get("c.createFolderRecord");
                action.setParams({
                    'folder': folder,
                    'parentFolderName': parentFolderName,
                    'parentFolderIdForMove': parentFolderIdForMove
                });
                action.setCallback(this, function (response) {
                    var returnVal = response.getReturnValue();
                    if (returnVal == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong to Move form, Please Reload Page", "Content Creation Error");
                    } else if (returnVal == "duplicate") {
                        component.set("v.spinner", false);
                        component.find("toastCmp").showToastModel("Duplicate Folder Name.", "Error");
                    } else {
                        component.set("v.spinner", false);
                        component.find("toastCmp").showToastModel("New Folder Created Successfully.", "success");
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
                        helper.cancleNewFolder(component, event, helper);
                    }
                });
            }
            $A.enqueueAction(action);
            component.set("v.spinner", false);
        } catch (error) {
            console.log({ error });
            component.set("v.spinner", false);
        }
    },

    deleteFolder: function (component, event, helper) {
        try {
            var divFolderId = component.get("v.divFolderId");
            if (divFolderId == "") {
                component.find("toastCmp").showToastModel("Please Select Folder.", "Error");
            } else {
                component.set("v.selected", '');
                var action = component.get("c.deleteFolderRecord");
                action.setParams({
                    'divFolderId': divFolderId
                });
                action.setCallback(this, function (response) {
                    var returnVal = response.getReturnValue();
                    if (returnVal == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong to Delete Folder, Please Reload Page", "Content Creation Error");
                    } else if (response.getReturnValue() == "notFound") {
                        component.find("toastCmp").showToastModel("Folder Not Found.", "Error");
                    } else {
                        component.find("toastCmp").showToastModel("Folder Deleted Successfully.", "success");
                        component.set("v.newFolderName", null);
                        component.set("v.divFolderId", '');
                        component.set("v.parentFolderId", undefined);
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    renameFolder: function (component, event, helper) {
        try {
            component.set("v.disableRenameFolderBtn", true);
            component.set("v.spinnerForFolder", true);
            var divFolderId = component.get("v.divFolderId");
            var renameFolderName = component.get("v.renameFolderName");
            renameFolderName = renameFolderName.replace(/ +(?= )/g, '').trim();
            component.set("v.newFolderNameFC", renameFolderName);

            console.log("rename Folder Name ===>" + renameFolderName + "<====== rename");

            if (divFolderId == "") {
                component.find("toastCmp").showToastModel("Please Select Folder.", "Error");
            } else {
                var action = component.get("c.renameFolderRecord");
                action.setParams({
                    'divFolderId': divFolderId,
                    'newFolderName': renameFolderName
                });
                action.setCallback(this, function (response) {
                    component.set("v.selected", divFolderId);
                    var returnVal = response.getReturnValue();
                    if (returnVal == null) {
                        helper.cancleRenameFolder(component, event, helper);
                        component.find("exceptionCmp").RunException("Something Went Wrong to Delete Folder, Please Reload Page", "Content Creation Error");
                    } else if (returnVal == "duplicateRecord") {
                        component.find("toastCmp").showToastModel("Duplicate Folder Name.", "Error");
                    } else if (returnVal == "success") {
                        helper.cancleRenameFolder(component, event, helper);
                        component.find("toastCmp").showToastModel("Folder Renamed Successfully.", "success");
                    }
                });
            }
            $A.enqueueAction(action);
            // component.set("v.spinnerForFolder", false);
        } catch (error) {
            console.log({ error });
            component.set("v.spinnerForFolder", false);
        }
    },

    moveFolder: function (component, event, helper) {
        try {
            component.set("v.spinnerForFolder", true);
            var divFolderId = component.get("v.divFolderId");
            console.log('Div folder Id -->' + divFolderId);
            var parentFolderNameForMove = component.get("v.parentFolderName");
            console.log('parentFolderNameForMove-->' + parentFolderNameForMove);

            var parentFolderIdForMove = component.get("v.parentFolderId");
            console.log('parentFolderIdForMove-->' + parentFolderIdForMove);


            if (parentFolderIdForMove == undefined) {
                parentFolderIdForMove = '';
            }

            console.log('parentFolderIdForMove after condition-->' + parentFolderIdForMove);

            if (divFolderId == "") {
                component.find("toastCmp").showToastModel("Please Select Folder.", "Error");
                var action = component.get('c.cancleMoveFolder');
            } else {
                component.set("v.selected", '');
                var action = component.get("c.moveFolderRecord");
                action.setParams({
                    'divFolderId': divFolderId,
                    'parentFolderIdForMove': parentFolderIdForMove,
                    'parentFolderNameForMove': parentFolderNameForMove
                });
                action.setCallback(this, function (response) {
                    component.set("v.selected", divFolderId);
                    console.log('response from apex -->' + response.getReturnValue());

                    var returnVal = response.getReturnValue();
                    if (returnVal == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong to Delete Folder, Please Reload Page", "Content Creation Error");
                    } else if (returnVal == "error") {
                        component.find("toastCmp").showToastModel("You Can Not Move Folder Into Their Child Folder.", "Error");
                    } else if (returnVal == "sameName") {
                        component.find("toastCmp").showToastModel("Can not move in Same Folder.", "Error");
                    } else {
                        component.find("toastCmp").showToastModel("Folder Moved Successfully.", "success");
                        component.set("v.parentFolderId", undefined);
                    }
                });
            }
            $A.enqueueAction(action);
            // component.set("v.spinnerForFolder", false);
        } catch (error) {
            console.log({ error });
            component.set("v.spinnerForFolder", false);
        }
    },

    // =========================== for folder tree heirchy part  start ===========================
    callToServer: function (component, method, callback, params) {
        try {
            var action = component.get(method);
            if (params) {
                action.setParams(params);
            }
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    callback.call(this, response.getReturnValue());
                } else if (state === "ERROR") {
                    component.find("exceptionCmp").RunException("Something Went Wrong to Load Folder, Please Reload Page", "Content Creation Error");
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },
    // =========================== for folder tree heirchy part  start ===========================

    getMainFolderId: function (component, event, helper) {
        try {
            var action = component.get("c.getMainFolder");
            action.setCallback(this, function (response) {
                var returnVal = response.getReturnValue();
                if (returnVal == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                } else {
                    component.set("v.MainFolderId", returnVal);
                }
            });
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },
    handleSelect: function (component, event, helper) {
        try {
            var myName = component.get("v.divFolderId");
            var PaginationList = [];
            component.set("v.PaginationList", PaginationList);
            var MainFolder = component.get("v.MainFolderId");
            if (myName == MainFolder) {
                var imagebutton = document.querySelectorAll('.imagebutton');
                for (var i of imagebutton) {
                    component.set("v.clicksubfolder", false);
                    i.style.filter = "contrast(0.85)";

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
            action.setCallback(this, function (response) {
                var returnVal = response.getReturnValue();
                if (returnVal == null) {
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                } else if (returnVal == "error") {
                    component.find("toastCmp").showToastModel("Folder Not Found.", "Error");
                } else {
                    // component.set("v.newFolderNameFC", component.get("v.newFolderName"));
                    component.set("v.newFolderName", response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
            helper.getFormListFolderWise(component, event, helper);
            component.set("v.searchFormName", "");
        } catch (error) {
            console.log({ error });
        }
    },


    // search folder for new form
    searchFolderAction1: function (component, event, helper, searchKey) {
        try {
            component.set("v.disableSave", true);
            if (searchKey.length != 0) {
                var action = component.get("c.findFolder");
                action.setParams({
                    'searchKey': searchKey,
                });
                action.setCallback(this, function (response) {
                    var returnVal = response.getReturnValue();
                    if (returnVal == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        component.set("v.FolderRecords", returnVal);
                        if (returnVal != '') {
                            component.set("v.ShowRecList1", true);
                        } else {
                            component.set("v.ShowRecList1", false);
                        }
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList1", false);
                var action = component.get("c.getFolder");
                action.setCallback(this, function (response) {
                    var oRes = response.getReturnValue();
                    if (oRes == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        if (oRes.length > 0) {
                            component.set("v.FolderRecords", oRes);
                            component.set("v.ShowRecList1", true);
                        } else {
                            component.set("v.ShowRecList1", false);
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },
    // search folder for folder
    searchFolderAction2: function (component, event, helper, searchKey) {
        try {
            component.set("v.disableSave", true);
            if (searchKey.length != 0) {
                var action = component.get("c.findFolder");
                action.setParams({
                    'searchKey': searchKey,
                });
                action.setCallback(this, function (response) {
                    var returnVal = response.getReturnValue();
                    if (returnVal == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        component.set("v.FolderRecords", response.getReturnValue());
                        if (response.getReturnValue() != '') {
                            component.set("v.ShowRecList2", true);
                        } else {
                            component.set("v.ShowRecList2", false);
                        }
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList2", false);
                var action = component.get("c.getFolder");
                action.setCallback(this, function (response) {
                    var oRes = response.getReturnValue();
                    if (oRes == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        if (oRes.length > 0) {
                            component.set("v.FolderRecords", oRes);
                            component.set("v.ShowRecList2", true);
                        } else {
                            component.set("v.ShowRecList2", false);
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },
    // search folder for move form
    searchFolderAction3: function (component, event, helper, searchKey) {
        try {
            component.set("v.disableSave", true);
            if (searchKey.length != 0) {
                var action = component.get("c.findFolder");
                action.setParams({
                    'searchKey': searchKey,
                });
                action.setCallback(this, function (response) {
                    var returnVal = response.getReturnValue();
                    if (returnVal == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        component.set("v.FolderRecords", response.getReturnValue());
                        if (response.getReturnValue() != '') {
                            component.set("v.ShowRecList3", true);
                        } else {
                            component.set("v.ShowRecList3", false);
                        }
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList3", false);
                var action = component.get("c.getFolder");
                action.setCallback(this, function (response) {
                    var oRes = response.getReturnValue();
                    if (oRes == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        if (oRes.length > 0) {
                            component.set("v.FolderRecords", oRes);
                            component.set("v.ShowRecList3", true);
                        } else {
                            component.set("v.ShowRecList3", false);
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },
    // search folder for move form
    searchFolderAction4: function (component, event, helper, searchKey) {
        try {
            component.set("v.disableSave", true);
            if (searchKey.length != 0) {
                var action = component.get("c.findFolder");
                action.setParams({
                    'searchKey': searchKey,
                });
                action.setCallback(this, function (response) {
                    var returnVal = response.getReturnValue();
                    if (returnVal == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        component.set("v.FolderRecords", response.getReturnValue());
                        if (response.getReturnValue() != '') {
                            component.set("v.ShowRecList4", true);
                        } else {
                            component.set("v.ShowRecList4", false);
                        }
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList4", false);
                var action = component.get("c.getFolder");
                action.setCallback(this, function (response) {
                    var oRes = response.getReturnValue();
                    if (oRes == null) {
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
                    } else {
                        if (oRes.length > 0) {
                            component.set("v.FolderRecords", oRes);
                            component.set("v.ShowRecList4", true);
                        } else {
                            component.set("v.ShowRecList4", false);
                        }
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    // disable save button of model
    disableSave: function (component, event, helper) {
        try {
            var currentFolder = component.get("v.newFolderName");
            if (currentFolder == undefined) {
                var mainFolder = component.get("v.mainFolderName");
                component.set("v.parentFolderName", mainFolder);
            } else {
                component.set("v.parentFolderName", currentFolder);
            }
            component.set("v.disableSave", false);
        } catch (error) {
            console.log({ error });
        }
    }
})