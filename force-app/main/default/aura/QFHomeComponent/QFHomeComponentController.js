({
    openModal: function (component, event, helper) {
        helper.disableSave(component, event, helper);
        helper.openModal(component, event, helper);
    },

    closeModal: function (component, event, helper) {
        helper.closeModal(component, event, helper);
    },

    createNewFolderModal: function (component, event, helper) { // Created By Nitin
        helper.disableSave(component, event, helper);
        helper.createNewFolderModal(component, event, helper);
    },

    cancleNewFolder: function (component, event, helper) { // Created By Nitin
        helper.cancleNewFolder(component, event, helper);
    },

    cancleMoveForm: function (component, event, helper) { // Created By Nitin
        helper.cancleMoveForm(component, event, helper);
    },

    createMoveFolderModal: function (component, event, helper) { // Created By Nitin
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
                    setTimeout(function () {
                        tooltip.style.display = "none";
                    }, 4000);
                } else {
                    var tooltipmainfolder = document.querySelector('.tooltipmainfolder');
                    tooltipmainfolder.style.display = "none";
                    var tooltip = document.querySelector('.tooltipmainfolder3');
                    tooltip.style.display = "block";
                    setTimeout(function () {
                        tooltip.style.display = "none";
                    }, 4000);

                }

            }
        } catch (error) {
            console.log({ error });
        }
    },

    cancleMoveFolder: function (component, event, helper) { // Created By Nitin
        helper.cancleMoveFolder(component, event, helper);
    },

    cancleRenameForm: function (component, event, helper) { // Created By Nitin
        helper.cancleRenameForm(component, event, helper);
    },

    renameFolderModal: function (component, event, helper) { // Created By Nitin
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
                setTimeout(function () {
                    tooltip.style.display = "none";
                }, 4000);

            }
        } catch (error) {
            console.log({ error });
        }
    },

    cancleRenameFolder: function (component, event, helper) { // Created By Nitin
        helper.cancleRenameFolder(component, event, helper);
    },

    cancleDeleteFolderCFBox: function (component, event, helper) { // Created By Nitin
        helper.cancleDeleteFolderCFBox(component, event, helper);
    },

    openDeleteFolderCFBox: function (component, event, helper) { // Created By Nitin
        helper.openDeleteFolderCFBox(component, event, helper);
    },

    cancleDeleteFormCFBox: function (component, event, helper) { // Created By Nitin
        helper.cancleDeleteFormCFBox(component, event, helper);
    },

    openDeleteFormCFBox: function (component, event, helper) { // Created By Nitin
        helper.openDeleteFormCFBox(component, event, helper);
    },

    expFolderTree: function (component, event, helper) { // Created By Nitin
        // ==================== Folder Tree Heirarchy Strat ===================//
        try {
            var tparentFieldAPIname = 'FolderId__c';
            var tlabelFieldAPIName = 'Name';

            helper.callToServer(
                component,
                "c.findHierarchyData",
                function (response) {
                    var apexResponse = response;
                    var roles = {};
                    roles[undefined] = { Name: "Root", items: [] };
                    apexResponse.forEach(function (v) {
                        roles[v.rec.Id] = {
                            label: v.rec[tlabelFieldAPIName],
                            name: v.rec.Id,
                            expanded: v.expanded,
                            items: []
                        };
                    });
                    apexResponse.forEach(function (v) {
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

    doInit: function (component, event, helper) {
        try {
            // ====spinner svg ===== //
            // var svg = component.find("svg_content");
            // console.log({ svg });
            // var value = svg.getElement().innerText;
            // console.log({ value });
            // value = value.replace("<![CDATA[", "").replace("]]>", "");
            // console.log({ value });
            // svg.getElement().innerHTML = value;
            // ====spinner svg ===== //

            // ==================== Folder Tree Heirarchy Strat ===================//
            var action = component.get('c.expFolderTree');
            $A.enqueueAction(action);
            // ==================== Folder Tree Heirarchy Finish ===================//

            helper.getFormList(component, event, helper);
            // helper.getFolderList(component, event, helper);
            helper.getMainFolderId(component, event, helper);
            helper.getFolderList(component, event, helper);

        } catch (error) {
            console.log({ error });
        }
    },

    showAllForms: function (component, event, helper) {
        try {
            component.set("v.bNoRecordsFound", false);
            component.set('v.disableSearchBox', false);
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

    createForm: function (component, event, helper) {
        try {
            var formTitle = component.get("v.Form.Title__c");
            if (formTitle.trim() != '') {
                helper.createForm(component, event, helper);
            } else {
                // helper.showToast("Error", "Error", "Write Valid Name", "5000");
                component.find("toastCmp").showToastModel("Please Fill the Form Title", "Error");
            }
        } catch (error) {
            console.log({ error });
        }
    },

    search: function (component, event, helper) {
        helper.search(component, event, helper);
    },

    onpreview: function (component, event, helper) {
        try {

            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:QFPreviewFormComponent",
                componentAttributes: {
                    FormId: btoa(event.target.name),
                }
            });
            evt.fire();
        } catch (error) {
            console.log({ error });
        }
    },

    renameForm: function (component, event, helper) {
        try {


            var newFormName = component.get("v.newFormName");
            if (newFormName.trim() != '') {
                helper.renameForm(component, event, helper);
                var folder = component.get("v.selected");
                console.log("Folder ==>" + folder);
                if (folder == '' || folder == undefined) {
                    helper.getFormList(component, event, helper);
                } else {
                    helper.getFormListFolderWise(component, event, helper);
                }
                // helper.cancleRenameForm(component, event, helper);
            } else {
                component.find("toastCmp").showToastModel("Please Fill the Form Name", "Error");
            }

        } catch (error) {
            console.log({ error });
        }
    },

    moveForm: function (component, event, helper) { // Created By Nitin
        try {
            helper.moveForm(component, event, helper);
            var folder = component.get("v.selected");
            if (folder == '' || folder == undefined) {
                helper.getFormList(component, event, helper);
            } else {
                helper.getFormListFolderWise(component, event, helper);
            }
            helper.cancleMoveForm(component, event, helper);
        } catch (error) {
            console.log({ error });
        }
    },

    deleteFormRecord: function (component, event, helper) {
        try {
            helper.deleteRecord(component, event, helper);
            var folder = component.get("v.selected");
            console.log({ folder });
            if (folder == '' || folder == undefined) {
                helper.getFormList(component, event, helper);
            } else {
                helper.getFormListFolderWise(component, event, helper);
            }
            helper.cancleDeleteFormCFBox(component, event, helper);

        } catch (error) {
            console.log({ error });
        }
    },

    deleteFolderRecordPM: function (component, event, helper) {
        try {
            helper.deleteFolder(component, event, helper);
            helper.getFolderList(component, event, helper);
            helper.getFormList(component, event, helper);
            var action = component.get('c.expFolderTree'); // Refreshing Lightning:tree List
            $A.enqueueAction(action);
            helper.cancleDeleteFolderCFBox(component, event, helper);
        } catch (error) {
            console.log({ error });
        }
    },

    editFormMenu: function (component, event, helper) { // Created By Nitin
        try {
            var fid = event.getSource().get("v.name");
            component.set("v.FormId", fid);
            var MenuButtonValue = event.getSource().get("v.value");
            component.set("v.currentFormName", MenuButtonValue);
        } catch (error) {
            console.log({ error });
        }
    },

    createFolder: function (component, event, helper) {
        try {
            var folderTitle = component.get("v.folder.Name");
            if (folderTitle.trim() != '') {
                helper.createFolder(component, event, helper);
                var action = component.get('c.expFolderTree'); // Refreshing Lightning:tree List
                $A.enqueueAction(action);
            } else {
                // helper.showToast("Error", "Error", "Write Valid Name", "5000");
                component.find("toastCmp").showToastModel("Please Fill the Folder Name", "Error");
            }
        } catch (error) {
            console.log({ error });
        }
    },

    handleSelect: function (component, event, helper) { // Created By Nitin for tree heirchy
        var myName = event.getParam('name');
        component.set("v.divFolderId", myName);
        helper.handleSelect(component, event, helper);
    },

    deleteFolder: function (component, event, helper) { // Created By Nitin
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

                helper.openDeleteFolderCFBox(component, event, helper);

            } else {
                // helper.handleSelect(component, event, helper);
                var clicksubfolder = component.get('v.clicksubfolder');
                if (clicksubfolder == true) {
                    var tooltip = document.querySelector('.tooltip');
                    tooltip.style.display = "block";
                    setTimeout(function () {
                        tooltip.style.display = "none";
                    }, 4000);
                } else {
                    var tooltipmainfolder3 = document.querySelector('.tooltipmainfolder3');
                    tooltipmainfolder3.style.display = "none";
                    var tooltip = document.querySelector('.tooltipmainfolder');
                    tooltip.style.display = "block";
                    setTimeout(function () {
                        tooltip.style.display = "none";
                    }, 4000);

                }

            }
        } catch (error) {
            console.log({ error });
        }
    },

    renameFolder: function (component, event, helper) {
        try {
            // var newFolderName = component.get("v.newFolderName");
            var newFolderName = component.get("v.renameFolderName");;
            console.log({ newFolderName });
            if (newFolderName.trim() != '') {
                helper.renameFolder(component, event, helper);
                helper.getFolderList(component, event, helper);
                var action = component.get('c.expFolderTree'); // Refreshing Lightning:tree List
                $A.enqueueAction(action);
            } else {
                component.find("toastCmp").showToastModel("Please Fill the Folder Name", "Error");
            }
        } catch (error) {
            console.log({ error });
        }
    },

    moveFolder: function (component, event, helper) {
        try {
            // component.set("v.spinner", true);
            helper.moveFolder(component, event, helper);
            helper.cancleMoveFolder(component, event, helper);
            helper.getFolderList(component, event, helper);
            var action = component.get('c.expFolderTree'); // Refreshing Lightning:tree List
            $A.enqueueAction(action);
            // component.set("v.spinner", false);
        } catch (error) {
            console.log({ error });
            // component.set("v.spinner", false);
        }
    },

    handlenav: function (component, event, helper) {
        try {
            var a = document.getElementById("mySidenav");
            a.classList.toggle('addclass');
        } catch (error) {
            console.log({ error });
        }
    },

    sortFormList: function (component, event, helper) {
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

    switchButton: function (component, event, helper) {
        try {
            var fid = event.currentTarget.name;
            component.set("v.FormId", fid);
            helper.activeDeactiveForm(component, event, helper);
        } catch (error) {
            console.log({ error });
        }
    },

    onSetup: function (component, event, helper) {
        try {

            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:QFUserConfigurationComponent",
                componentAttributes: {

                }
            });
            evt.fire();
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for new form
    searchFolderAction1: function (component, event, helper) {
        try {
            var searchKey = component.find("searchKey1").get("v.value");
            helper.searchFolderAction1(component, event, helper, searchKey);
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for new folder
    searchFolderAction2: function (component, event, helper) {
        try {
            console.log('::searchFolderAction2::');
            var searchKey = component.find("searchKey2").get("v.value");
            console.log({ searchKey });
            helper.searchFolderAction2(component, event, helper, searchKey);
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for move form
    searchFolderAction3: function (component, event, helper) {
        try {
            var searchKey = component.find("searchKey3").get("v.value");
            helper.searchFolderAction3(component, event, helper, searchKey);
        } catch (error) {
            console.log({ error });
        }
    },

    // search folder for move folder
    searchFolderAction4: function (component, event, helper) {
        try {
            console.log('::searchFolderAction4::');
            var searchKey = component.find("searchKey4").get("v.value");
            console.log({ searchKey });
            helper.searchFolderAction4(component, event, helper, searchKey);
        } catch (error) {
            console.log({ error });
        }
    },

    selectFolder: function (component, event, helper) {
        try {
            var idx = event.target.getAttribute('data-index');
            var rowRecord = component.get("v.FolderRecords")[idx];
            console.log("record selected folder ==>" + rowRecord);
            console.log("record selected folder Name ==>" + rowRecord.Name);
            console.log("record selected folder Id ==>" + rowRecord.Id);
            component.set("v.parentFolderName", rowRecord.Name);
            component.set("v.parentFolderId", rowRecord.Id);
            component.set("v.ShowRecList1", false);
            component.set("v.ShowRecList2", false);
            component.set("v.ShowRecList3", false);
            component.set("v.ShowRecList4", false);
            component.set("v.disableSave", false);
        } catch (error) {
            console.log({ error });
        }
    },

    hideFolderList: function (component, event, helper) {
        try {
            component.set("v.ShowRecList1", false);
            component.set("v.ShowRecList2", false);
            component.set("v.ShowRecList3", false);
            component.set("v.ShowRecList4", false);
        } catch (error) {
            console.log({ error });
        }
    },

    handleSelectAction: function (component, event, helper) {
        try {
            var fid = event.getSource().get("v.name");
            component.set("v.FormId", fid);
            var MenuButtonValue = event.getSource().get("v.value");
            component.set("v.currentFormName", MenuButtonValue);
            var selectedMenuItemValue = event.getParam("value");
            if (selectedMenuItemValue == "Rename") {
                helper.RenameFormModal(component, event, helper);
            } else if (selectedMenuItemValue == "Edit") {
                helper.dropOnEdit(component, event, helper);
            } else if (selectedMenuItemValue == "Move") {
                helper.createMoveFormModal(component, event, helper);
            } else if (selectedMenuItemValue == "Delete") {
                helper.openDeleteFormCFBox(component, event, helper);
            } else if (selectedMenuItemValue == "Preview") {
                var evt = $A.get("e.force:navigateToComponent");
                evt.setParams({
                    componentDef: "c:QFPreviewFormComponent",
                    componentAttributes: {
                        FormId: btoa(component.get("v.FormId"))
                    }
                });
                evt.fire();
            }
        } catch (error) {
            console.log({ error });
        }
    }

})