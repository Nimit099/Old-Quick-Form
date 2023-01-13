({

    getFormList: function(component, event, helper) {
        component.set("v.spinner", true);
        var action = component.get("c.getForm");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var oRes = response.getReturnValue();
                if (oRes.length > 0) {
                    component.set('v.listOfAllForms', oRes);
                    component.set('v.PaginationList', oRes);

                    // var totalRecordsList = oRes;
                    // var totalLength = totalRecordsList.length;
                    // var pageSize = component.get("v.pageSize");
                    component.set("v.totalRecordsCount", oRes.length);
                    // component.set("v.startPage", 0);
                    // component.set("v.endPage", pageSize - 1);

                    // var PaginationLst = [];
                    // for (var i = 0; i < pageSize; i++) {
                    //     if (component.get("v.listOfAllForms").length > i) {
                    //         PaginationLst.push(oRes[i]);
                    //     }
                    // }
                    // component.set('v.PaginationList', PaginationLst);
                    component.set('v.PaginationListForSeacrch', oRes);
                    component.set("v.selectedCount", 0);
                    component.set("v.spinner", false);
                    // //use Math.ceil() to Round a number upward to its nearest integer
                    // component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));
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
    },


    getFormListFolderWise: function(component, event, helper) {

        console.log("GeformFolder Wide clicked----->");
        component.set("v.bNoRecordsFound", false);
        component.set("v.spinnerDataTable", true);
        var folderId = component.get("v.divFolderId");

        console.log("folder id is ------->" + folderId);

        var action = component.get("c.getFormInFolder");
        action.setParams({
            'folderId': folderId
        });
        action.setCallback(this, function(response) {
            console.log("return value is ----->" + response.getReturnValue());
            var state = response.getState();
            if (state === "SUCCESS") {
                var oRes = response.getReturnValue();
                if (oRes.length > 0) {
                    console.log("GeformFolder Wide in if condition----->");
                    component.set('v.listOfAllForms', oRes);
                    component.set('v.PaginationList', oRes);
                    component.set("v.totalRecordsCount", oRes.length);
                    component.set("v.spinnerDataTable", false);

                } else {
                    // if there is no records then display message
                    component.set('v.PaginationList', oRes);
                    component.set("v.totalRecordsCount", oRes.length);
                    component.set("v.spinnerDataTable", false);
                    component.set("v.bNoRecordsFound", true);
                }
            } else {
                component.set("v.spinnerDataTable", false);
                alert('Error...');
            }
        });
        $A.enqueueAction(action);
    },



    // getFormList: function(component, event, helper) {
    //     var action = component.get("c.getForm");
    //     action.setCallback(this, function(response) {
    //         var state = response.getState();
    //         if (state === "SUCCESS") {
    //             var oRes = response.getReturnValue();
    //             if (oRes.length > 0) {
    //                 component.set('v.listOfAllForms', oRes);
    //                 var pageSize = component.get("v.pageSize");
    //                 var totalRecordsList = oRes;
    //                 var totalLength = totalRecordsList.length;
    //                 component.set("v.totalRecordsCount", totalLength);
    //                 component.set("v.startPage", 0);
    //                 component.set("v.endPage", pageSize - 1);

    //                 var PaginationLst = [];
    //                 for (var i = 0; i < pageSize; i++) {
    //                     if (component.get("v.listOfAllForms").length > i) {
    //                         PaginationLst.push(oRes[i]);
    //                     }
    //                 }
    //                 component.set('v.PaginationList', PaginationLst);
    //                 component.set('v.PaginationListForSeacrch', PaginationLst);
    //                 component.set("v.selectedCount", 0);
    //                 //use Math.ceil() to Round a number upward to its nearest integer
    //                 component.set("v.totalPagesCount", Math.ceil(totalLength / pageSize));
    //             } else {
    //                 // if there is no records then display message
    //                 component.set("v.bNoRecordsFound", true);
    //             }
    //         } else {
    //             alert('Error...');
    //         }
    //     });
    //     $A.enqueueAction(action);
    // },

    getFolderList: function(component, event, helper) { // Created By Nitin

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

    },

    // navigate to next pagination record set
    next: function(component, event, sObjectList, end, start, pageSize) {
        var Paginationlist = [];
        var counter = 0;
        for (var i = end + 1; i < end + pageSize + 1; i++) {
            if (sObjectList.length > i) {
                if (component.find("selectAllId").get("v.value")) {
                    Paginationlist.push(sObjectList[i]);
                } else {
                    Paginationlist.push(sObjectList[i]);
                }
            }
            counter++;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage", start);
        component.set("v.endPage", end);
        component.set('v.PaginationList', Paginationlist);
        component.set('v.PaginationListForSeacrch', Paginationlist);
    },
    // navigate to previous pagination record set
    previous: function(component, event, sObjectList, end, start, pageSize) {
        var Paginationlist = [];
        var counter = 0;
        for (var i = start - pageSize; i < start; i++) {
            if (i > -1) {
                if (component.find("selectAllId").get("v.value")) {
                    Paginationlist.push(sObjectList[i]);
                } else {
                    Paginationlist.push(sObjectList[i]);
                }
                counter++;
            } else {
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage", start);
        component.set("v.endPage", end);
        component.set('v.PaginationList', Paginationlist);
        component.set('v.PaginationListForSeacrch', Paginationlist);
    },
    deleteAllRecords: function(component, event, helper) {
        var allRecords = component.get("v.listOfAllForms");
        var selectedRecords = [];
        for (var i = 0; i < allRecords.length; i++) {
            if (allRecords[i].isChecked) {
                selectedRecords.push(allRecords[i].objForm);
            }
        }
        //console.log({selectedRecords});
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
    },
    search: function(component, event, helper) {
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
        } else {
            component.set("v.PaginationList", tempArray);
        }
        if (searchfilter.length == 0) {
            component.set("v.PaginationList", PaginationListForSeacrch);
        }
    },

    onLoad: function(component, event, sortField) {

        var folderId = component.get("v.divFolderId");
        component.set("v.spinnerDataTable", true);

        if (folderId != '') {

            folderId = "'" + folderId + "'";
        }


        var action = component.get('c.fetchContact');
        action.setParams({
            'sortField': sortField,
            'isAsc': component.get("v.isAsc"),
            'folderId': folderId

        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log("return state ==>" + state);
            console.log("return value ==>" + response.getReturnValue());
            if (state === "SUCCESS") {
                component.set('v.PaginationList', response.getReturnValue());
                component.set("v.spinnerDataTable", false);
            }
            component.set("v.spinnerDataTable", false);
        });
        $A.enqueueAction(action);
    },
    sortHelper: function(component, event, sortFieldName) {
        var currentDir = component.get("v.arrowDirection");
        if (currentDir == 'arrowdown') {
            component.set("v.arrowDirection", 'arrowup');
            component.set("v.isAsc", true);
        } else {
            component.set("v.arrowDirection", 'arrowdown');
            component.set("v.isAsc", false);
        }
        this.onLoad(component, event, sortFieldName);
    },
    showToast: function(type, title, message, time) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "type": type,
            "message": message,
            "duration": time
        });
        toastEvent.fire();
    },



    createForm: function(component, event, helper) {
        var formId = component.get("v.Form");
        var formTitle = component.get("v.Form.Title__c");

        var parentFolderNameForForm = component.get("v.parentFolderNameForForm");
        console.log("parentFolderNameForForm is :::::::>" + parentFolderNameForForm);

        if (formTitle == "") {
            helper.showToast("Error", "Error", "Please Fill the Form Title..", "5000");
        } else {
            var action = component.get('c.createFormrecord');
            action.setParams({
                'formId': formId,
                'parentFolderNameForForm': parentFolderNameForForm
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (response.getReturnValue() == "error") {
                    helper.showToast("Error", "Error", "Cannot allow duplicate Form Title", "5000");
                } else {

                    helper.showToast("Success", "Success", "New Form Created Successfully.");

                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef: "c:QF_Main",
                        componentAttributes: {
                            FormId: response.getReturnValue()
                        }
                    });
                    evt.fire();

                }
            });
        }
        $A.enqueueAction(action);
    },

    openModal: function(component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },
    closeModal: function(component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    createNewFolderModal: function(component, event, helper) { // Created By Nitin
        var modal = component.find("new_Folder");
        var modalBackdrop = component.find("ModalBackdrop_folder");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },
    cancleNewFolder: function(component, event, helper) { // Created By Nitin
        var modal = component.find("new_Folder");
        var modalBackdrop = component.find("ModalBackdrop_folder");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    createMoveFormModal: function(component, event, helper) { // Created By Nitin
        var modal = component.find("move_Form");
        var modalBackdrop = component.find("ModalBackdrop_Moveform");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },
    cancleMoveForm: function(component, event, helper) { // Created By Nitin
        var modal = component.find("move_Form");
        var modalBackdrop = component.find("ModalBackdrop_Moveform");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    createMoveFolderModal: function(component, event, helper) { // Created By Nitin
        var modal = component.find("move_Folder");
        var modalBackdrop = component.find("ModalBackdrop_Movefolder");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },
    cancleMoveFolder: function(component, event, helper) { // Created By Nitin
        var modal = component.find("move_Folder");
        var modalBackdrop = component.find("ModalBackdrop_Movefolder");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },

    RenameFormModal: function(component, event, helper) { // Created By Nitin
        var modal = component.find("rename_Form");
        var modalBackdrop = component.find("ModalBackdrop_renameForm");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },
    cancleRenameForm: function(component, event, helper) { // Created By Nitin
        var modal = component.find("rename_Form");
        var modalBackdrop = component.find("ModalBackdrop_renameForm");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },



    renameFolderModal: function(component, event, helper) { // Created By Nitin
        var modal = component.find("rename_Folder");
        var modalBackdrop = component.find("ModalBackdrop_renameFolder");
        $A.util.addClass(modal, "slds-fade-in-open");
        $A.util.addClass(modalBackdrop, "slds-backdrop_open");
    },
    cancleRenameFolder: function(component, event, helper) { // Created By Nitin
        var modal = component.find("rename_Folder");
        var modalBackdrop = component.find("ModalBackdrop_renameFolder");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");
    },



    editDropDown: function(component, event, helper) { // Created By Nitin
        var divId = event.target.id;
        component.set("v.FormId", divId);

        var divValue = event.target.value;
        component.set("v.newFormName", divValue);
        // console.log("fromid is ::::>"+component.get("v.FormId"));
        console.log("formNameForRename is ::::>" + divValue);

        var toggleText = document.getElementById("div_" + divId);
        $A.util.removeClass(toggleText, "drop-down");
        $A.util.toggleClass(toggleText, "drop-down--active");
    },

    editDropDown_1: function(component, event, helper) { // Created By Nitin
        // var divId = event.target.id;
        // component.set("v.FormId",divId);
        // console.log("div id is ::>"+divId);

        // var toggleText = document.getElementById("div_"+divId);
        // $A.util.removeClass(toggleText,"drop-down");
        // $A.util.toggleClass(toggleText, "drop-down--active");

        var divId = event.target.id;
        console.log({ divId });
        component.set("v.FormId", divId);

        var divValue = event.target.value;
        component.set("v.newFormName", divValue);
        // console.log("fromid is ::::>"+component.get("v.FormId"));
        console.log("formNameForRename is ::::>" + divValue);

        var toggleText = document.getElementById("div_" + divId);
        $A.util.removeClass(toggleText, "drop-down");
        $A.util.addClass(toggleText, "drop-down--active");

    },

    closeDropDown_1: function(component, event, helper) { // Created By Nitin
        var divId = event.target.id;
        console.log({ divId });
        component.set("v.FormId", divId);
        console.log("onblur called");

        // var toggleText = document.getElementById("div_"+divId);
        // $A.util.removeClass(toggleText, "drop-down--active");
        // $A.util.addClass(toggleText,"drop-down");
        // var toggleText = document.getElementById("div_"+divId);
        console.log("clod start");
        var toggleText = document.getElementById("div_" + divId);
        $A.util.addClass(toggleText, "drop-down");
        $A.util.removeClass(toggleText, "drop-down--active");
        console.log("clod Finish");

    },

    dropOnEdit: function(component, event, helper) { // Created By Nitin
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: "c:QF_Main",
            componentAttributes: {
                FormId: component.get("v.FormId")
            }
        });
        evt.fire();
    },

    deleteRecord: function(component, event, helper) { // Created By Nitin

        var fid = component.get("v.FormId");

        var action = component.get("c.deleteForm");
        // var action = component.get("c.testmethod11");

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

    },

    activeDeactiveForm: function(component, event, helper) { // Created By Nitin

        var fid = component.get("v.FormId");

        var action = component.get("c.activeDeactiveFormRecord");

        action.setParams({
            "formId": fid
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {

                if (response.getReturnValue() == 'Active') {
                    helper.showToast("Success", "Success", "Form Successfully Activated.", "5000");
                } else {
                    helper.showToast("Success", "Success", "Form Successfully Deactivated.", "5000");
                }

                // component.set("v.listOfAllForms", response.getReturnValue());
            } else {
                helper.showToast("Error", "Error Occur", "Something went wrong to Active / Deactive form.", "5000");
            }
        });
        $A.enqueueAction(action);

    },

    renameForm: function(component, event, helper) { // Created By Nitin

        console.log("rename button clicked");

        // component,set("v.newFormName", )

        var newFormName = component.get("v.newFormName");
        console.log("newFormName is ====>" + newFormName);

        var action = component.get("c.renameFormRecord");
        action.setParams({
            "newFormName": newFormName,
            "FormId": component.get("v.FormId")
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

        console.log("rename button Finished");
    },

    moveForm: function(component, event, helper) { // Created By Nitin

        console.log("moveForm button clicked");

        var allRecords = component.get("v.listOfAllForms");
        var parentFolderNameForFormMove = component.get("v.parentFolderNameForFormMove");
        var selectedRecords = [];
        for (var i = 0; i < allRecords.length; i++) {
            if (allRecords[i].isChecked) {
                selectedRecords.push(allRecords[i].objForm);
            }
        }

        console.log("Selected Record is ====>>" + selectedRecords);
        console.log("parentFolderNameForFormMove is ====>>" + parentFolderNameForFormMove);

        var action = component.get("c.moveFormRecord");
        action.setParams({
            // "newFormName": newFormName,
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

        console.log("MoveForm button Finished");
    },

    createFolder: function(component, event, helper) { // Created By Nitin

        // console.log("CreateFolder Cliked");

        component.set("v.spinner", true);

        var folder = component.get("v.folder");
        var folderName = component.get("v.folder.Name");
        // console.log("folder name is ======>" + folderName);

        var parentFolderName = component.get("v.parentFolderName");
        console.log("parentFolderName is :::::::>" + parentFolderName);


        if (folderName == "") {
            helper.showToast("Error", "Error", "Please Enter Folder Name.", "5000");
            component.set("v.spinner", false);
        } else {

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
                }
            });

        }

        $A.enqueueAction(action);
        console.log("CreateFolder Finished");

    },



    deleteFolder: function(component, event, helper) { // Created By Nitin

        console.log("Delete Folder Cliked");


        var divFolderId = component.get("v.divFolderId");
        console.log("divFolderId is ------> " + divFolderId);


        if (divFolderId == "") {
            helper.showToast("Error", "Error", "Please Select Folder.", "5000");
        } else {

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
                }
            });
        }

        $A.enqueueAction(action);
        console.log("DeleteFolder Finished");
    },


    renameFolder: function(component, event, helper) { // Created By Nitin

        console.log("renameFolder Cliked");

        var divFolderId = component.get("v.divFolderId");
        console.log("divFolderId is ------> " + divFolderId);

        var newFolderName = component.get("v.newFolderName");
        console.log("newFolderName is ------> " + newFolderName);

        if (divFolderId == "") {
            helper.showToast("Error", "Error", "Please Select Folder.", "5000");
        } else {

            var action = component.get("c.renameFolderRecord");
            action.setParams({
                'divFolderId': divFolderId,
                'newFolderName': newFolderName
            });

            action.setCallback(this, function(response) {
                var state = response.getState();
                if (response.getReturnValue() == "error") {
                    helper.showToast("Error", "Error", " Duplicate Folder Name", "5000");
                } else {
                    helper.showToast("Success", "Success", "Folder Renamed Successfully.");
                }
            });
        }

        $A.enqueueAction(action);
        console.log("RenameFolder Finished");
    },


    moveFolder: function(component, event, helper) { // Created By Nitin

        console.log("moveFolder Cliked");

        var divFolderId = component.get("v.divFolderId");
        console.log("divFolderId is ------> " + divFolderId);

        var parentFolderNameForMove = component.get("v.parentFolderNameForMove");
        console.log("parentFolderNameForMove is ------> " + parentFolderNameForMove);

        if (divFolderId == "") {
            helper.showToast("Error", "Error", "Please Select Folder.", "5000");
            var action = component.get('c.cancleMoveFolder');
        } else {

            var action = component.get("c.moveFolderRecord");
            action.setParams({
                'divFolderId': divFolderId,
                'parentFolderNameForMove': parentFolderNameForMove

            });

            action.setCallback(this, function(response) {
                var state = response.getState();
                if (response.getReturnValue() == "error") {
                    helper.showToast("Error", "Error", " Duplicate Folder Name", "5000");
                } else {
                    helper.showToast("Success", "Success", "Folder Moved Successfully.");
                }
            });
        }

        $A.enqueueAction(action);
        console.log("RenameFolder Finished");
    },



    // =========================== for folder tree heirchy part  start ===========================

    callToServer: function(component, method, callback, params) {
        console.log('Calling helper callToServer function');
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        console.log(JSON.stringify(params));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //alert('Processed successfully at server');
                callback.call(this, response.getReturnValue());
            } else if (state === "ERROR") {
                alert('Problem with connection. Please try again.');
            }
        });
        $A.enqueueAction(action);

    }

    // =========================== for folder tree heirchy part  start ===========================


})