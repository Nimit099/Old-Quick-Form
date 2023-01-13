({
    getFormList: function(component, event, helper) {
        try {
            component.set("v.spinner", true);
            // component.set('v.disableSearchBox', 'false');

            // var t = component.find('previewIcon');
            // var b = t.get('v.iconName');
            // t.set("v.iconName", "{!$Resource.addIcon + '/assets/style/images/SVG/previde-hide.svg'}");

            // t.set("v.iconName", "{!$Resource.addIcon}");
            // console.log({ t });
            // console.log({ b });

            var actiont = component.get("c.getUserName");
            actiont.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.Name", response.getReturnValue());
                }
            });
            $A.enqueueAction(actiont);


            var r = document.querySelector(':root');
            r.style.setProperty('--lwc-squareIconMediumContentAlt', '1rem');
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
                        component.set("v.bNoRecordsFound", false);
                        component.set('v.disableSerachBox', false);


                    } else {
                        // if there is no records then display message
                        component.set("v.spinner", false);
                        component.set("v.bNoRecordsFound", true);
                        component.set('v.disableSerachBox', true);

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
                        i.style.filter = "contrast(0.85)";
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
            component.set('v.disableSerachBox', false);


            // component.set('v.disableSearchBox', false);

            component.set("v.spinnerDataTable", true);
            var folderId = component.get("v.divFolderId");
            component.set("v.parentFolderId", folderId);
            var action = component.get("c.getFormInFolder");

            action.setParams({
                'folderId': folderId
            });

            action.setCallback(this, function(response) {
                console.log(response.getReturnValue());
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.spinnerDataTable", false);
                    var oRes = response.getReturnValue();
                    if (oRes.length > 0) {
                        component.set('v.listOfAllForms', oRes);
                        component.set("v.totalRecordsCount", oRes.length);
                        component.set("v.PaginationList", oRes);
                        component.set("v.bNoRecordsFound", false);
                        component.set('v.disableSerachBox', false);
                        console.log('no records');

                    } else {
                        // if there is no records then display message
                        component.set('v.disableSerachBox', true);
                        component.set("v.totalRecordsCount", oRes.length);
                        component.set("v.bNoRecordsFound", true);
                        component.set('v.disableSearchBox', true);
                        console.log('yes it have');
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
                        component.set('v.FolderRecords', oRes);
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

    search: function(component, event, helper) {
        try {
            var searchfilter = event.getSource().get("v.value").toUpperCase();
            var allrecords = component.get("v.listOfAllForms");
            var PaginationListForSeacrch = component.get("v.PaginationListForSeacrch");
            var tempArray = [];
            for (var i = 0; i < allrecords.length; i++) {
                if (allrecords[i].objForm.Title__c && allrecords[i].objForm.Title__c.toUpperCase().indexOf(searchfilter) != -1) {
                    tempArray.push(allrecords[i]);
                }
            }
            if (tempArray.length == 0) {
                component.set("v.NoRecordsFound", true);
                // component.set('v.disableSerachBox', true);
            } else {
                component.set("v.PaginationList", tempArray);
                component.set("v.NoRecordsFound", false);
                // component.set('v.disableSerachBox', false);

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

            var t = component.get('v.selected');
            console.log({ t });
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
            var parentFolderName2 = component.get("v.parentFolderId");
            console.log({ formId });

            var x = component.get("v.divFolderId");
            console.log(x + 'id is ');
            console.log(component.get("v.MainFolderId"));


            if (formTitle == "") {
                helper.showToast("Error", "Error", "Please Fill the Form Title..", "5000");
            } else {
                var action = component.get('c.createFormrecord');
                if (x == null || x == '' || x == undefined) {
                    action.setParams({
                        'formId': formId,
                        // 'parentFolderNameForForm': component.get("v.MainFolderId")

                        'parentFolderNameForForm': parentFolderName,
                        'prntId': component.get("v.MainFolderId")
                            // 'parentFolderId': component.get("v.MainFolderId")

                    });


                } else {
                    action.setParams({
                        'formId': formId,
                        'parentFolderNameForForm': parentFolderName,
                        'prntId': x
                    });


                }

                action.setCallback(this, function(response) {
                    var r = document.querySelector(':root');
                    r.style.setProperty('--formbgiamge', '');
                    r.style.setProperty('--pagebgimage', '');

                    console.log(response.getReturnValue());
                    console.log('-----------*********---------------');

                    var state = response.getState();
                    if (response.getReturnValue() == "error") {
                        helper.showToast("Error", "Error", "Cannot allow duplicate Form Title", "5000");
                    } else {
                        helper.showToast("Success", "Success", "New Form Created Successfully.");
                        var evt = $A.get("e.force:navigateToComponent");
                        evt.setParams({
                            componentDef: "c:FormBuilderSakina",
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
            console.log({ mainFolder });
            // var g =component.get('v.noSelect')
            component.set('v.actionNotSelected', true);
            var actionNot = component.get('v.actionNotSelected');

            console.log({ actionNot });

            component.set("v.parentFolderName", mainFolder);
            component.set("v.disableSave", false);
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
            component.set("v.renameFolderName", '');
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
            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: "c:FormBuilderSakina",
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
                console.log(response.getReturnValue());
                console.log('delete recordds');
                var state = response.getState();
                if (state == "SUCCESS") {
                    helper.showToast("Success", "Success", "Form Successfully deleted.", "5000");
                    var g = component.get('v.notSelected');
                    console.log({ g });
                    if (g) {
                        helper.getFormList(component, event, helper);

                    } else {
                        helper.getFormListFolderWise(component, event, helper);


                    }


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
                    var g = component.get('v.notSelected');
                    if (!g) {
                        helper.getFormListFolderWise(component, event, helper);
                    }
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

    moveForm: function(component, event, helper) {
        try {
            var fid = component.get("v.FormId");
            var parentFolderNameForFormMove = component.get("v.parentFolderName");
            var parentFolderId = component.get("v.parentFolderId");
            console.log({ parentFolderId });
            console.log({ fid });
            var setit = parentFolderId;
            var a = component.get('v.actionNotSelected');
            console.log({ a });



            var action = component.get("c.moveFormRecord");
            // if (parentFolderId == '' || parentFolderId == null || parentFolderId == undefined) {
            if (a) {

                setit = component.get("v.MainFolderId");
                console.log({ setit });
                console.log('in main');

                action.setParams({
                    'selectedRecords': fid,
                    'parentFolderId': component.get("v.MainFolderId")
                });



            } else {
                setit = parentFolderId;
                console.log({ setit });
                console.log('not main');

                action.setParams({
                    'selectedRecords': fid,
                    'parentFolderId': parentFolderId
                        // 'parentFolderNameForFormMove': parentFolderNameForFormMove
                });
            }
            console.log('actual');
            console.log({ setit });
            action.setCallback(this, function(response) {
                console.log(response.getReturnValue());
                console.log('8888');
                var state = response.getState();
                if (state == "SUCCESS") {
                    helper.showToast("Success", "Success", "Form Successfully Moved.", "5000");
                    var g1 = component.get('v.notSelected');
                    console.log(g1 + 'from move  form');
                    if (g1) {
                        component.set("v.listOfAllForms", response.getReturnValue());
                    } else {
                        helper.getFormListFolderWise(component, event, helper);
                        component.set("v.selected", parentFolderId);
                    }

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
            console.log(folder);
            var x = component.get("v.divFolderId");
            console.log({ x });

            folder.Name = folder.Name.replace(/ +(?= )/g, '').trim();
            var folderName = component.get("v.folder.Name");
            var parentFolderName = component.get("v.parentFolderName");
            var parentFolderId = component.get("v.parentFolderId");
            if (folderName == "") {
                helper.showToast("Error", "Error", "Please Enter Folder Name.", "5000");
                component.set("v.spinner", false);
            } else {
                var action = component.get("c.createFolderRecord");
                component.set("v.selected", '');
                if (x == null || x == '' || x == undefined) {
                    // var action = component.get("c.createFolderRecord");
                    action.setParams({
                        'folder': folder,
                        'parentFolderId': component.get("v.MainFolderId")
                    });

                } else {
                    // var action = component.get("c.createFolderRecord");
                    action.setParams({
                        'folder': folder,
                        'parentFolderId': parentFolderId
                    });

                }

                action.setCallback(this, function(response) {
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
                        helper.cancleNewFolder(component, event, helper);
                    }
                });
            }
            $A.enqueueAction(action);
        } catch (error) {
            console.log({ error });
        }
    },

    createFolderForNotSlected: function(component, event, helper) { // Created By Nitin
        try {
            var folder = component.get("v.folder");
            console.log(folder);
            folder.Name = folder.Name.replace(/ +(?= )/g, '').trim();
            var folderName = component.get("v.folder.Name");
            // var parentFolderName = component.get("v.parentFolderName");
            // var parentFolderId = component.get("v.parentFolderId");
            if (folderName == "") {
                helper.showToast("Error", "Error", "Please Enter Folder Name.", "5000");
                component.set("v.spinner", false);
            } else {
                component.set("v.selected", '');
                var action = component.get("c.createFolderRecord");
                action.setParams({
                    'folder': folder,
                    'parentFolderId': component.get("v.MainFolderId")

                    // 'parentFolderName': parentFolderName
                });
                action.setCallback(this, function(response) {
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
                        helper.cancleNewFolder(component, event, helper);
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
            var renameFolderName = component.get("v.renameFolderName");
            renameFolderName = renameFolderName.replace(/ +(?= )/g, '').trim();
            if (divFolderId == "") {
                helper.showToast("Error", "Error", "Please Select Folder.", "5000");
            } else {
                var action = component.get("c.renameFolderRecord");
                action.setParams({
                    'divFolderId': divFolderId,
                    'newFolderName': renameFolderName
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
            var child = component.get('v.childRecords');
            console.log({ child });

            var divFolderId = component.get("v.divFolderId");
            console.log('Div folder Id -->' + divFolderId);
            var parentFolderNameForMove = component.get("v.parentFolderName");
            console.log('parentFolderNameForMove-->' + parentFolderNameForMove);

            var parentFolderIdForMove = component.get("v.parentFolderId");
            console.log('parentFolderIdForMove-->' + parentFolderIdForMove);
            if (divFolderId == "") {
                helper.showToast("Error", "Error", "Please Select Folder.", "5000");
                var action = component.get('c.cancleMoveFolder');
            } else {
                component.set("v.selected", '');
                var action = component.get("c.moveFolderRecord");
                // component.set('v.notSelected', true);
                var g = component.get('v.notSelected');

                console.log({ g });
                console.log('g in move folder');
                if (g) {
                    action.setParams({
                        'divFolderId': child,
                        'parentFolderIdForMove': component.get('v.MainFolderId'),
                    });

                } else {
                    action.setParams({
                        'divFolderId': child,
                        'parentFolderIdForMove': parentFolderIdForMove
                    });
                }


                action.setCallback(this, function(response) {
                    component.set("v.selected", divFolderId);
                    console.log('response from apex -->' + response.getReturnValue());
                    if (response.getReturnValue() == "error") {
                        helper.showToast("Error", "Error", "You Can Not Move Folder Into Their Child Folder", "5000");
                    } else if (response.getReturnValue() == "sameName") {
                        helper.showToast("Error", "Error", "Duplicate Folder Name In Same Folder", "5000");
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
            var e = event.getSource().get('v.items');
            console.log({ e });
            var myName = component.get("v.divFolderId");
            component.set('v.childRecords', myName);
            console.log({ myName });
            component.set('v.notSelected', false);
            console.log('call 2nd');
            var t = component.get('v.selected');
            console.log({ t });

            // for set cursor style on button hover
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


    // search folder for new form
    searchFolderAction1: function(component, event, helper, searchKey) {
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
                        component.set("v.ShowRecList1", true);
                    } else {
                        component.set("v.ShowRecList1", false);
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList1", false);
                var action = component.get("c.getFolder");
                action.setCallback(this, function(response) {
                    var oRes = response.getReturnValue();
                    if (oRes.length > 0) {
                        component.set("v.FolderRecords", oRes);
                        component.set("v.ShowRecList1", true);
                    } else {
                        component.set("v.ShowRecList1", false);
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },
    // search folder for folder
    searchFolderAction2: function(component, event, helper, searchKey) {
        try {
            component.set("v.disableSave", true);
            var x = component.get("v.divFolderId");
            // console.log({ x });
            console.log('folder action 2');
            if (searchKey.length != 0) {
                var action = component.get("c.findFolder");
                action.setParams({
                    'searchKey': searchKey,
                });
                action.setCallback(this, function(response) {
                    component.set("v.FolderRecords", response.getReturnValue());
                    if (response.getReturnValue() != '') {
                        component.set("v.ShowRecList2", true);
                    } else {
                        component.set("v.ShowRecList2", false);
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList2", false);
                var action = component.get("c.getFolder");
                action.setCallback(this, function(response) {
                    var oRes = response.getReturnValue();
                    if (oRes.length > 0) {
                        component.set("v.FolderRecords", oRes);
                        component.set("v.ShowRecList2", true);
                    } else {
                        component.set("v.ShowRecList2", false);
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },
    // search folder for move form
    searchFolderAction3: function(component, event, helper, searchKey) {
        try {
            component.set("v.disableSave", true);
            component.set('v.actionNotSelected', false);

            if (searchKey.length != 0) {
                var action = component.get("c.findFolder");
                action.setParams({
                    'searchKey': searchKey,
                });
                action.setCallback(this, function(response) {
                    component.set("v.FolderRecords", response.getReturnValue());
                    if (response.getReturnValue() != '') {
                        component.set("v.ShowRecList3", true);
                    } else {
                        component.set("v.ShowRecList3", false);
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList3", false);
                var action = component.get("c.getFolder");
                action.setCallback(this, function(response) {
                    var oRes = response.getReturnValue();
                    if (oRes.length > 0) {
                        component.set("v.FolderRecords", oRes);
                        component.set("v.ShowRecList3", true);
                    } else {
                        component.set("v.ShowRecList3", false);
                    }
                });
                $A.enqueueAction(action);
            }
        } catch (error) {
            console.log({ error });
        }
    },
    // search folder for move form
    searchFolderAction4: function(component, event, helper, searchKey) {
        try {
            component.set("v.disableSave", true);
            component.set('v.notSelected', false);
            var g = component.get('v.notSelected');
            console.log({ g });


            if (searchKey.length != 0) {
                var action = component.get("c.findFolder");
                action.setParams({
                    'searchKey': searchKey,
                });
                action.setCallback(this, function(response) {
                    component.set("v.FolderRecords", response.getReturnValue());
                    if (response.getReturnValue() != '') {
                        component.set("v.ShowRecList4", true);
                    } else {
                        component.set("v.ShowRecList4", false);
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.set("v.ShowRecList4", false);
                var action = component.get("c.getFolder");
                action.setCallback(this, function(response) {
                    var oRes = response.getReturnValue();
                    if (oRes.length > 0) {
                        component.set("v.FolderRecords", oRes);
                        component.set("v.ShowRecList4", true);
                    } else {
                        component.set("v.ShowRecList4", false);
                    }
                });
                $A.enqueueAction(action);
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
        } catch (error) {
            console.log({ error });
        }
    }
})