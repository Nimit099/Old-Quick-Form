({
    openModal: function(component, event, helper) {
        helper.openModal(component, event, helper);
    },

    closeModal: function(component, event, helper) {
        helper.closeModal(component, event, helper);
    },

    createNewFolderModal: function(component, event, helper) { // Created By Nitin
        helper.createNewFolderModal(component, event, helper);
    },

    cancleNewFolder: function(component, event, helper) { // Created By Nitin
        helper.cancleNewFolder(component, event, helper);
    },

    createMoveFormModal: function(component, event, helper) { // Created By Nitin
        helper.createMoveFormModal(component, event, helper);
    },

    cancleMoveForm: function(component, event, helper) { // Created By Nitin
        helper.cancleMoveForm(component, event, helper);
    },

    createMoveFolderModal: function(component, event, helper) { // Created By Nitin
        helper.createMoveFolderModal(component, event, helper);
    },

    cancleMoveFolder: function(component, event, helper) { // Created By Nitin
        helper.cancleMoveFolder(component, event, helper);
    },

    RenameFormModal: function(component, event, helper) { // Created By Nitin
        helper.RenameFormModal(component, event, helper);
    },

    cancleRenameForm: function(component, event, helper) { // Created By Nitin
        helper.cancleRenameForm(component, event, helper);
    },

    renameFolderModal: function(component, event, helper) { // Created By Nitin
        helper.renameFolderModal(component, event, helper);
    },

    cancleRenameFolder: function(component, event, helper) { // Created By Nitin
        helper.cancleRenameFolder(component, event, helper);
    },

    editDropDown: function(component, event, helper) { // Created By Nitin
        helper.editDropDown(component, event, helper);
    },

    closeDropDown: function(component, event, helper) { // Created By Nitin
        helper.closeDropDown(component, event, helper);
    },

    expFolderTree: function(component, event, helper) { // Created By Nitin


        // ==================== Folder Tree Heirarchy Strat ===================//


        console.log('doInit of component called');

        // var trecid = component.get('v.ltngcurrentRecId');
        // var tsObjectName = component.get('v.ltngSobjectname');

        var tparentFieldAPIname = component.get('v.ltngParentFieldAPIName');
        var tlabelFieldAPIName = component.get('v.ltngLabelFieldAPIName');

        helper.callToServer(
            component,
            "c.findHierarchyData",
            function(response) {
                var apexResponse = response;
                var roles = {};
                console.log('*******apexResponse:' + JSON.stringify(apexResponse));

                // var results = apexResponse;

                roles[undefined] = { Name: "Root", items: [] };

                apexResponse.forEach(function(v) {
                    //var sk = v.rec;
                    //var labelValue= sk[tlabelFieldAPIName];
                    roles[v.rec.Id] = {
                        label: v.rec[tlabelFieldAPIName],
                        name: v.rec.Id,
                        expanded: v.expanded,
                        items: []
                    };
                });
                console.log('*******roles:' + JSON.stringify(roles));
                apexResponse.forEach(function(v) {
                    roles[v.rec[tparentFieldAPIname]].items.push(roles[v.rec.Id]);
                });
                component.set("v.items", roles[undefined].items);
                console.log('*******roles[undefined].items:' + JSON.stringify(roles[undefined].items));
            }, {
                recId: component.get('v.ltngcurrentRecId'),
                sObjectName: component.get('v.ltngSobjectname'),
                parentFieldAPIname: component.get('v.ltngParentFieldAPIName'),
                labelFieldAPIName: component.get('v.ltngLabelFieldAPIName')
            }
        );


        // ==================== Folder Tree Heirarchy Finish ===================//

    },

    doInit: function(component, event, helper) {

        // ==================== Folder Tree Heirarchy Strat ===================//

        var action = component.get('c.expFolderTree');
        $A.enqueueAction(action);

        // ==================== Folder Tree Heirarchy Finish ===================//

        helper.getFormList(component, event, helper);
        helper.getFolderList(component, event, helper);

    },

    showAllForms: function(component, event, helper) {
        component.set("v.bNoRecordsFound", false);
        component.set("v.divFolderId", '');
        helper.getFormList(component, event, helper);
        component.set("v.newFolderName", null);
    },

    createForm: function(component, event, helper) {
        var msg = 'Do you want to create this form?'
        if (!confirm(msg)) {
            helper.closeModal(component, event, helper);
            return false;
        } else {
            helper.createForm(component, event, helper);
            helper.getFormList(component, event, helper);
            helper.closeModal(component, event, helper);
        }
    },

    navigation: function(component, event, helper) {
        console.log('next 1_button pressed');
        console.log('id thae :::' + event.target.id);
        var sObjectList = component.get("v.listOfAllForms");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");

        // var whichBtn = event.getSource().get("v.name");
        var whichBtn = event.target.id;
        console.log('wivhbtn is ::::' + whichBtn);
        // check if whichBtn value is 'next' then call 'next' helper method
        if (whichBtn == 'next') {
            console.log('next button pressed');
            component.set("v.currentPage", component.get("v.currentPage") + 1);
            helper.next(component, event, sObjectList, end, start, pageSize);
        }
        // check if whichBtn value is 'previous' then call 'previous' helper method
        else if (whichBtn == 'previous') {
            console.log('previous button pressed');
            component.set("v.currentPage", component.get("v.currentPage") - 1);
            helper.previous(component, event, sObjectList, end, start, pageSize);
        }
    },

    selectAllCheckbox: function(component, event, helper) {
        var selectedHeaderCheck = event.getSource().get("v.value");
        var updatedAllRecords = [];
        var updatedPaginationList = [];
        var listOfAllForms = component.get("v.listOfAllForms");
        var PaginationList = component.get("v.PaginationList");
        // play a for loop on all records list 
        for (var i = 0; i < listOfAllForms.length; i++) {
            // check if header checkbox is 'true' then update all checkbox with true and update selected records count
            // else update all records with false and set selectedCount with 0  
            if (selectedHeaderCheck == true) {
                listOfAllForms[i].isChecked = true;
                component.set("v.selectedCount", listOfAllForms.length);
            } else {
                listOfAllForms[i].isChecked = false;
                component.set("v.selectedCount", 0);
            }
            updatedAllRecords.push(listOfAllForms[i]);
        }
        // update the checkbox for 'PaginationList' based on header checbox 
        for (var i = 0; i < PaginationList.length; i++) {
            if (selectedHeaderCheck == true) {
                PaginationList[i].isChecked = true;
            } else {
                PaginationList[i].isChecked = false;
            }
            updatedPaginationList.push(PaginationList[i]);
        }
        component.set("v.listOfAllForms", updatedAllRecords);
        component.set("v.PaginationList", updatedPaginationList);
    },

    checkboxSelect: function(component, event, helper) {
        // on each checkbox selection update the selected record count 
        var selectedRec = event.getSource().get("v.value");
        var getSelectedNumber = component.get("v.selectedCount");
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            getSelectedNumber--;
            component.find("selectAllId").set("v.value", false);
        }
        component.set("v.selectedCount", getSelectedNumber);
        // if all checkboxes are checked then set header checkbox with true   
        if (getSelectedNumber == component.get("v.totalRecordsCount")) {
            component.find("selectAllId").set("v.value", true);
        }
    },

    deleteAllRecords: function(component, event, helper) {
        var msg = 'Are you sure you want to delete these forms ?'
        if (!confirm(msg)) {
            return false;
        } else {
            helper.deleteAllRecords(component, event, helper);
            helper.getFormList(component, event, helper);
        }
    },

    search: function(component, event, helper) {
        helper.search(component, event, helper);
    },

    sortFirstName: function(component, event, helper) {
        component.set("v.selectedTabsoft", 'Title__c');
        helper.sortHelper(component, event, 'Title__c');
        // component.get('c.sortFormList');
    },

    sortCreatedDate: function(component, event, helper) {
        component.set("v.selectedTabsoft", 'CreatedDate');
        helper.sortHelper(component, event, 'CreatedDate');
    },

    onedit: function(component, event, helper) { //    jnot used in component 
        var msg = 'Are you sure you want to edit this form?';
        if (!confirm(msg)) {
            return false;
        } else {
            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:QF_Main",
                componentAttributes: {
                    FormId: event.getSource().get("v.name")
                }
            });
            evt.fire();
        }
    },

    onpreview: function(component, event, helper) {
        var msg = 'Are you sure you want to preview this form?';
        if (!confirm(msg)) {
            console.log("Else part if");
            return false;
        } else {
            console.log("Else part");
            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:QF_Preview",
                componentAttributes: {
                    FormId: event.getSource().get("v.name")
                }
            });
            evt.fire();
        }
    },

    dropOnEdit: function(component, event, helper) { // Created By Nitin
        helper.dropOnEdit(component, event, helper);
    },

    deleteRecord: function(component, event, helper) { // Created By Nitin
        var msg = 'Are you sure you want to delete this form ?'
        if (!confirm(msg)) {
            return false;
        } else {
            helper.deleteRecord(component, event, helper);
            helper.getFormList(component, event, helper);
        }
    },

    activeDeactiveForm: function(component, event, helper) { // Created By Nitin
        var msg = 'Are you sure you want to Active / Deactive this form ?'
        if (!confirm(msg)) {
            return false;
        } else {
            helper.activeDeactiveForm(component, event, helper);
            helper.getFormList(component, event, helper);
        }
    },

    renameForm: function(component, event, helper) { // Created By Nitin
        var msg = 'Are you sure you want to Rename this form ?'
        if (!confirm(msg)) {
            return false;
        } else {
            helper.renameForm(component, event, helper);
            helper.getFormList(component, event, helper);
            helper.cancleRenameForm(component, event, helper);
        }
    },

    moveForm: function(component, event, helper) { // Created By Nitin
        var msg = 'Are you sure you want to Move this form ?'
        if (!confirm(msg)) {
            return false;
        } else {
            helper.moveForm(component, event, helper);
            helper.getFormList(component, event, helper);
            helper.cancleMoveForm(component, event, helper);
        }
    },

    editDropDown_1: function(component, event, helper) { // Created By Nitin
        helper.editDropDown_1(component, event, helper);
    },

    closeDropDown_1: function(component, event, helper) { // Created By Nitin
        helper.closeDropDown_1(component, event, helper);
    },

    editFormMenu: function(component, event, helper) { // Created By Nitin
        var fid = event.getSource().get("v.name");
        component.set("v.FormId", fid);
        // console.log("editFormMenu fid is button menu====>"+fid);

        var MenuButtonValue = event.getSource().get("v.value");
        component.set("v.newFormName", MenuButtonValue);
        // console.log("MenuButtonValue is button menu====>"+MenuButtonValue);
    },

    createFolder: function(component, event, helper) { // Created By Nitin

        var msg = 'Do you want to create this Folder?'
        if (!confirm(msg)) {
            helper.cancleNewFolder(component, event, helper);
            return false;
        } else {
            helper.createFolder(component, event, helper);
            helper.cancleNewFolder(component, event, helper);
            helper.getFolderList(component, event, helper);

            var action = component.get('c.expFolderTree'); // Refreshing Lightning:tree List
            $A.enqueueAction(action);

        }
    },

    handleSelect: function(component, event, helper) { // Created By Nitin for tree heirchy
        var myName = event.getParam('name');
        console.log('folder id ---> ' + myName);

        component.set("v.divFolderId", myName);
        console.log('DivFolderid ---> ' + component.get("v.divFolderId"));

        var action = component.get("c.getFolderName");
        action.setParams({
            'divFolderId': myName
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (response.getReturnValue() == "error") {
                helper.showToast("Error", "Error", " Folder Not Found", "5000");
            } else {
                component.set("v.newFolderName", response.getReturnValue());
                console.log("FOlder name is=====>" + component.get("v.newFolderName"));
            }
        });

        helper.getFormListFolderWise(component, event, helper);
        // helper.getFormList(component, event, helper);

        $A.enqueueAction(action);
        console.log("Handle Select Finished");

    },

    deleteFolder: function(component, event, helper) { // Created By Nitin

        var msg = 'Do you want to delete this Folder?'
        if (!confirm(msg)) {
            return false;
        } else {
            helper.deleteFolder(component, event, helper);
            helper.getFolderList(component, event, helper);
            helper.getFormList(component, event, helper);

            var action = component.get('c.expFolderTree'); // Refreshing Lightning:tree List
            $A.enqueueAction(action);

        }
    },

    renameFolder: function(component, event, helper) { // Created By Nitin

        var msg = 'Do you want to Rename this Folder?'
        if (!confirm(msg)) {
            return false;
        } else {
            helper.renameFolder(component, event, helper);
            helper.getFolderList(component, event, helper);
            helper.cancleRenameFolder(component, event, helper);

            var action = component.get('c.expFolderTree'); // Refreshing Lightning:tree List
            $A.enqueueAction(action);

        }
    },

    moveFolder: function(component, event, helper) { // Created By Nitin

        var msg = 'Do you want to move this Folder?'
        if (!confirm(msg)) {
            helper.cancleMoveFolder(component, event, helper);
            return false;
        } else {
            helper.moveFolder(component, event, helper);
            helper.cancleMoveFolder(component, event, helper);
            helper.getFolderList(component, event, helper);

            var action = component.get('c.expFolderTree'); // Refreshing Lightning:tree List
            $A.enqueueAction(action);

        }
    },
    handlenav: function(component, event, helper) {

        var a = document.getElementById("mySidenav");

        a.classList.toggle('addclass');

    },

    sortFormList: function(component, event, helper) {

        console.log("sort form list start---->");

        var listToSort = component.get("v.PaginationList");
        console.log("ListTosort is -->" + listToSort);
        console.log({ listToSort });
        var lst = [];
        var target_copy = Object.assign({}, listToSort);
        console.log({ target_copy });
        for (var i = 0; i < listToSort.length; i++) {
            console.log('i>>' + i);
            console.log('listToSort(i)>>' + target_copy[i]);
            console.log('listToSort(i)>>===' + target_copy[i].objForm.Title__c);
            lst.push(target_copy[i].objForm.Title__c);
        }
        console.log({ lst });
        // listToSort.sort();
        lst.sort();

        // console.log("sorted list is -->" + listToSort);
        // console.log({listToSort});
        console.log({ lst });
        component.set("v.PaginationList", lst);

        console.log("sort form list finish---->");

    }




})