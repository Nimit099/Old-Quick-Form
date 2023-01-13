({
    openModal: function(component, event, helper) {
        helper.disableSave(component, event, helper);
        helper.openModal(component, event, helper);
    },

    closeModal: function(component, event, helper) {
        helper.closeModal(component, event, helper);
    },

    createNewFolderModal: function(component, event, helper) { // Created By Nitin
        helper.disableSave(component, event, helper);
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
        try {
            var tooltip1 = document.querySelector('.tooltip');
            var tooltip2 = document.querySelector('.tooltip2');
            tooltip1.style.display = "none";
            tooltip2.style.display = "none";

            var currentFolder = component.get("v.divFolderId");
            var MainFolder = component.get("v.MainFolderId");
            if (currentFolder != MainFolder && currentFolder != '') {
                var tooltip = document.querySelector('.tooltip3');
                tooltip.style.display = "none";
                helper.createMoveFolderModal(component, event, helper);
            } else {
                var clicksubfolder = component.get('v.clicksubfolder');
                if (clicksubfolder == true) {
                    var tooltip = document.querySelector('.tooltip3');
                    tooltip.style.display = "block";
                    setTimeout(function() {
                        tooltip.style.display = "none";
                    }, 4000);
                } else {
                    var tooltipmainfolder = document.querySelector('.tooltipmainfolder');
                    tooltipmainfolder.style.display = "none";
                    var tooltip = document.querySelector('.tooltipmainfolder3');
                    tooltip.style.display = "block";
                    setTimeout(function() {
                        tooltip.style.display = "none";
                    }, 4000);

                }

            }
        } catch (error) {
            console.log({ error });
        }
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
        try {
            var tooltip1 = document.querySelector('.tooltip');
            var tooltip3 = document.querySelector('.tooltip3');
            tooltip1.style.display = "none";
            tooltip3.style.display = "none";
            var currentFolder = component.get("v.divFolderId");

            if (currentFolder != '') {
                var tooltip = document.querySelector('.tooltip2');
                tooltip.style.display = "none";
                helper.renameFolderModal(component, event, helper);
            } else {
                var tooltip = document.querySelector('.tooltip2');
                tooltip.style.display = "block";
                setTimeout(function() {
                    tooltip.style.display = "none";
                }, 4000);

            }
        } catch (error) {
            console.log({ error });
        }
    },

    cancleRenameFolder: function(component, event, helper) { // Created By Nitin
        helper.cancleRenameFolder(component, event, helper);
    },

    expFolderTree: function(component, event, helper) { // Created By Nitin
        // ==================== Folder Tree Heirarchy Strat ===================//
        try {
            var tparentFieldAPIname = 'FolderId__c';
            var tlabelFieldAPIName = 'Name';

            helper.callToServer(
                component,
                "c.findHierarchyData",
                function(response) {
                    var apexResponse = response;
                    var roles = {};
                    roles[undefined] = { Name: "Root", items: [] };
                    apexResponse.forEach(function(v) {
                        roles[v.rec.Id] = {
                            label: v.rec[tlabelFieldAPIName],
                            name: v.rec.Id,
                            expanded: v.expanded,
                            items: []
                        };
                    });
                    apexResponse.forEach(function(v) {
                        roles[v.rec[tparentFieldAPIname]].items.push(roles[v.rec.Id]);
                    });
                    component.set("v.items", roles[undefined].items);
                    component.set("v.mainFolderName", roles[undefined].items[0].label);
                }, {
                    recId: '',
                    sObjectName: 'Folder__c',
                    parentFieldAPIname: 'FolderId__c',
                    labelFieldAPIName: 'Name'
                }
            );

        } catch (error) {
            console.log({ error });
        }
        // ==================== Folder Tree Heirarchy Finish ===================//
    },

    doInit: function(component, event, helper) {
        try {
            // ==================== Folder Tree Heirarchy Strat ===================//
            var action = component.get('c.expFolderTree');
            $A.enqueueAction(action);
            // ==================== Folder Tree Heirarchy Finish ===================//

            helper.getFormList(component, event, helper);
            helper.getFolderList(component, event, helper);
            helper.getMainFolderId(component, event, helper);

        } catch (error) {
            console.log({ error });
        }
    },

    showAllForms: function(component, event, helper) {
        try {
            component.set("v.bNoRecordsFound", false);
            component.set("v.divFolderId", '');
            component.set("v.selected", '');
            var mainFolder = component.get("v.mainFolderName");
            component.set("v.parentFolderName", mainFolder)
            helper.getFormList(component, event, helper);
            component.set("v.newFolderName", null);
            var btnClass = document.querySelectorAll('.changeCursor');
            for (var cls of btnClass) {
                cls.style.cursor = 'default';
            }
        } catch (error) {
            console.log({ error });
        }
    },

    createForm: function(component, event, helper) {
        try {
            var formTitle = component.get("v.Form.Title__c");
            if (formTitle.trim() != '') {
                var msg = 'Do you want to create this form?'
                if (!confirm(msg)) {
                    helper.closeModal(component, event, helper);
                    return false;
                } else {
                    helper.createForm(component, event, helper);
                    helper.getFormList(component, event, helper);
                    helper.closeModal(component, event, helper);
                }
            } else {
                helper.showToast("Error", "Error", "Write Valid Name", "5000");
            }
        } catch (error) {
            console.log({ error });
        }
    },

    selectAllCheckbox: function(component, event, helper) {
        try {
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
        } catch (error) {
            console.log({ error });
        }
    },

    checkboxSelect: function(component, event, helper) {
        try {
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
        } catch (error) {
            console.log({ error });
        }
    },

    deleteAllRecords: function(component, event, helper) {
        try {
            var msg = 'Are you sure you want to delete these forms ?'
            if (!confirm(msg)) {
                return false;
            } else {
                helper.deleteAllRecords(component, event, helper);
                helper.getFormList(component, event, helper);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    search: function(component, event, helper) {
        helper.search(component, event, helper);
    },

    onpreview: function(component, event, helper) {
        try {
            var msg = 'Are you sure you want to preview this form?';
            if (!confirm(msg)) {
                return false;
            } else {
                var evt = $A.get("e.force:navigateToComponent");
                evt.setParams({
                    componentDef: "c:PreviewFormComponent",
                    componentAttributes: {
                        FormId: btoa(event.getSource().get("v.name"))
                    }
                });
                evt.fire();
            }
        } catch (error) {
            console.log({ error });
        }
    },

    dropOnEdit: function(component, event, helper) { // Created By Nitin
        helper.dropOnEdit(component, event, helper);
    },

    deleteRecord: function(component, event, helper) { // Created By Nitin
        try {
            var msg = 'Are you sure you want to delete this form ?'
            if (!confirm(msg)) {
                return false;
            } else {
                helper.deleteRecord(component, event, helper);
                helper.getFormListFolderWise(component, event, helper);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    renameForm: function(component, event, helper) { // Created By Nitin
        try {
            var msg = 'Are you sure you want to Rename this form ?'
            if (!confirm(msg)) {
                return false;
            } else {
                helper.renameForm(component, event, helper);
                helper.getFormListFolderWise(component, event, helper);
                helper.cancleRenameForm(component, event, helper);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    moveForm: function(component, event, helper) { // Created By Nitin
        try {
            var msg = 'Are you sure you want to Move this form ?'
            if (!confirm(msg)) {
                return false;
            } else {
                helper.moveForm(component, event, helper);
                helper.getFormList(component, event, helper);
                helper.cancleMoveForm(component, event, helper);
            }
        } catch (error) {
            console.log({ error });
        }
    },

    editFormMenu: function(component, event, helper) { // Created By Nitin
        try {
            var fid = event.getSource().get("v.name");
            component.set("v.FormId", fid);
            var MenuButtonValue = event.getSource().get("v.value");
            component.set("v.newFormName", MenuButtonValue);
        } catch (error) {
            console.log({ error });
        }
    },

    createFolder: function(component, event, helper) { // Created By Nitin
        try {
            var folderTitle = component.get("v.folder.Name");
            if (folderTitle.trim() != '') {
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
            } else {
                helper.showToast("Error", "Error", "Write Valid Name", "5000");
            }
        } catch (error) {
            console.log({ error });
        }
    },

    handleSelect: function(component, event, helper) { // Created By Nitin for tree heirchy
        var myName = event.getParam('name');
        component.set("v.divFolderId", myName);
        helper.handleSelect(component, event, helper);
    },

    deleteFolder: function(component, event, helper) { // Created By Nitin
        try {

            var tooltip2 = document.querySelector('.tooltip2');
            var tooltip3 = document.querySelector('.tooltip3');
            tooltip2.style.display = "none";
            tooltip3.style.display = "none";

            var currentFolder = component.get("v.divFolderId");
            var MainFolder = component.get("v.MainFolderId");
            if (currentFolder != MainFolder && currentFolder != '') {

                var tooltip = document.querySelector('.tooltip');
                tooltip.style.display = "none";
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
            } else {
                // helper.handleSelect(component, event, helper);
                var clicksubfolder = component.get('v.clicksubfolder');
                if (clicksubfolder == true) {
                    var tooltip = document.querySelector('.tooltip');
                    tooltip.style.display = "block";
                    setTimeout(function() {
                        tooltip.style.display = "none";
                    }, 4000);
                } else {
                    var tooltipmainfolder3 = document.querySelector('.tooltipmainfolder3');
                    tooltipmainfolder3.style.display = "none";
                    var tooltip = document.querySelector('.tooltipmainfolder');
                    tooltip.style.display = "block";
                    setTimeout(function() {
                        tooltip.style.display = "none";
                    }, 4000);

                }

            }
        } catch (error) {
            console.log({ error });
        }
    },

    renameFolder: function(component, event, helper) { // Created By Nitin
        try {
            var newFolderName = component.get("v.newFolderName");
            if (newFolderName.trim() != '') {
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
            } else {
                helper.showToast("Error", "Error", "Write Valid Name", "5000");
            }
        } catch (error) {
            console.log({ error });
        }
    },

    moveFolder: function(component, event, helper) { // Created By Nitin'
        try {
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
        } catch (error) {
            console.log({ error });
        }
    },

    handlenav: function(component, event, helper) {
        try {
            var a = document.getElementById("mySidenav");
            a.classList.toggle('addclass');
        } catch (error) {
            console.log({ error });
        }
    },

    sortFormList: function(component, event, helper) {
        try {
            component.set("v.selectedTabsoft", 'Title__c');
            var listToSort = component.get("v.PaginationList");
            listToSort.reverse();
            var currentDir = component.get("v.arrowDirection");
            if (currentDir == 'arrowdown') {
                component.set("v.arrowDirection", 'arrowup');
            } else {
                component.set("v.arrowDirection", 'arrowdown');
            }
            component.set("v.PaginationList", listToSort);
        } catch (error) {
            console.log({ error });
        }

    },

    switchButton: function(component, event, helper) {
        try {
            var fid = event.currentTarget.name;
            component.set("v.FormId", fid);
            helper.activeDeactiveForm(component, event, helper);
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for new form
    searchFolderAction1: function(component, event, helper) {
        try {
            var searchKey = component.find("searchKey1").get("v.value");
            helper.searchFolderAction(component, event, helper, searchKey);
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for new folder
    searchFolderAction2: function(component, event, helper) {
        try {
            var searchKey = component.find("searchKey2").get("v.value");
            helper.searchFolderAction(component, event, helper, searchKey);
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for move form
    searchFolderAction3: function(component, event, helper) {
        try {
            var searchKey = component.find("searchKey3").get("v.value");
            helper.searchFolderAction(component, event, helper, searchKey);
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for move folder
    searchFolderAction4: function(component, event, helper) {
        try {
            var searchKey = component.find("searchKey4").get("v.value");
            helper.searchFolderAction(component, event, helper, searchKey);
        } catch (error) {
            console.log({ error });
        }
    },

    selectFolder: function(component, event, helper) {
        try {
            var idx = event.target.getAttribute('data-index');
            var rowRecord = component.get("v.FolderRecords")[idx];
            component.set("v.parentFolderName", rowRecord.Name);
            component.set("v.ShowRecList", false);
            component.set("v.disableSave", false);
        } catch (error) {
            console.log({ error });
        }
    },

    hideFolderList: function(component, event, helper) {
        try {
            component.set("v.ShowRecList", false);
        } catch (error) {
            console.log({ error });
        }
    },

})