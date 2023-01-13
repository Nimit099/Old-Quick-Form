({

    onDragStart: function(form, event, helper, component) {
        try {

            var x = event.target.dataset.record;
            var targetcls = event.target.className;
            console.log({ targetcls });
            let countFields = 0;

            if (targetcls != 'field') {
                event.target.style.opacity = 0.5;
            }

            if (x == null) {
                event.preventDefault();
                onDragOver();
            } else {
                event.dataTransfer.setData('text/plain', x);

                console.log(event.target.className + '>>>>');


                var formtitle = document.querySelector('.formtitle');
                formtitle.style.opacity = 1;
                var dropzoneloop = document.querySelectorAll('.example-dropzone');

                for (var dropzone of dropzoneloop) {

                    if (dropzone.lastElementChild == null) {
                        dropzone.style.opacity = 0.8;
                        dropzone.style.width = '95%';
                        dropzone.style.border = "1px dashed #3298c8";
                        dropzone.style.padding = '5%';
                        dropzone.style.left = '4%';
                        dropzone.innerHTML = "Drop Here";
                        dropzone.style.textAlign = "center";
                        dropzone.style.fontSize = '1rem';
                        dropzone.style.color = "#3298c8";

                    }
                }


                // if (dropzoneloop.lastElementChild == null) {
                // var r = document.querySelector(':root');
                // var getStyle = getComputedStyle(r);
                // var fieldsPresentVar = getStyle.getPropertyValue('--fieldContent');
                // // console.log(fieldsPresentVar + 'dragging ');
                // if (fieldsPresentVar == 'none') {

                //     for (var dropzone of dropzoneloop) {
                //         dropzone.style.opacity = 0.8;
                //         dropzone.style.width = '95%';
                //         dropzone.style.border = "1px dashed #3298c8";
                //         dropzone.style.padding = '5%';
                //         dropzone.style.left = '4%';
                //         dropzone.innerHTML = "Drop Here";
                //         dropzone.style.textAlign = "center";
                //         dropzone.style.fontSize = '1rem';
                //         dropzone.style.color = "#3298c8";
                //     }
                // }
                // }

                // } else {

                // }


                // }
                // if(dropzoneloop.lastElementChild.class)


                // var r = document.querySelector(':root');
                // var getStyle = getComputedStyle(r);
                // var fieldsPresentVar = getStyle.getPropertyValue('--fieldContent');
                // console.log(fieldsPresentVar + 'dragging ');
                // if (fieldsPresentVar == '') {

                //     for (var dropzone of dropzoneloop) {
                //         dropzone.style.opacity = 0.8;
                //         dropzone.style.width = '95%';
                //         dropzone.style.border = "1px dashed #3298c8";
                //         dropzone.style.padding = '5%';
                //         dropzone.style.left = '4%';
                //         dropzone.innerHTML = "Drop Here";
                //         dropzone.style.textAlign = "center";
                //         dropzone.style.fontSize = '1rem';
                //         dropzone.style.color = "#3298c8";

                //     }


                // } else {
                //     dropzone.style.opacity = 0.5;
                //     const myTimeout = setTimeout(fieldsOpacity, 3000);

                //     function fieldsOpacity() {
                //         var dropzone = document.querySelector('.example-dropzone');
                //         dropzone.style.opacity = 1;
                //     }
                // }


            }
        } catch (e) {
            console.log(e)
            helper.showToast("Error", "Error Occur", "Something went wrong to drag the field");
        }

    },

    onDragOver: function(from, event) {
        event.preventDefault();
        // component.set("v.renderPreview",false);
    },

    onDrop: function(component, event, helper, form) {
        try {

            // $A.get('e.force:refreshView').fire();
            window.setTimeout(function() { helper.handleCss(component, event, helper) }, 100);
            const Fieldid = event.dataTransfer.getData('text');
            if (Fieldid == 'QFPAGEBREAK') {
                helper.pageBreakHelper(component, event, helper);
            } // Drag and Drop for Change Sequence
            else {
                var xc = document.querySelector('[data-record="' + Fieldid + '"]');
                var dataRef = xc.getAttribute('data-ref');
                if (dataRef == "inner") {
                    var classname = event.target.className;;
                    if (classname == 'field') {
                        event.target.parentElement.insertBefore(xc, event.target);
                    } else if (classname == 'example-dropzone') {
                        event.target.appendChild(xc);
                    } // for name, datetime field
                    else if (classname == 'name cQuickformfieldcomponent1' || classname == 'datetime cQuickformfieldcomponent1') {
                        event.target.parentNode.parentNode.insertBefore(xc, event.target.parentNode);
                    } // for rating, signature field
                    else if (classname == 'ratingfield' || classname == 'signaturefield') {
                        event.target.parentNode.parentNode.parentNode.parentNode.insertBefore(xc, event.target.parentNode.parentNode.parentNode);
                    } // for rmoji rating field
                    else if (classname == 'em') {
                        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(xc, event.target.parentNode.parentNode.parentNode.parentNode.parentNode);
                    } // for likert scale 
                    else if (classname == "likert-style" || classname == "statement-style") {
                        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(xc, event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
                    }
                    var FieldElement = document.querySelectorAll('.field');
                    var Listt = [];
                    for (var i = 0; i < FieldElement.length; i++) {
                        var x = FieldElement[i].getAttribute('data-record');
                        var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                        Listt.push(x + ':::' + i + ':::' + ParentPageId);
                    }
                    helper.SequenceSave(component, event, helper, Listt);
                } // Drag and Drop from Field List
                else {
                    var FormId = component.get("v.FormId");
                    var classname = event.target.className;
                    if (classname == 'field') {
                        var PageId = event.target.parentNode.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid);
                    } else if (classname == 'example-dropzone') {
                        var PageId = event.target.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        var testVar = event.target;
                        event.target.appendChild(CloneObject);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid);
                    } // for name, datetime, rating, signature field
                    else if (classname == 'name cQuickformfieldcomponent1' || classname == 'datetime cQuickformfieldcomponent1' || classname == 'ratingfield' || classname == 'signaturefield' || classname == 'slds-form-element__label cQuickformfieldcomponent1') {
                        var PageId = event.target.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid);
                    } // for Scale Rating
                    else if (classname == "likert-style" || classname == "statement-style") {
                        var PageId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid);
                    }
                }

                var dropzoneloop = document.querySelectorAll('.example-dropzone');
                for (var dropzone of dropzoneloop) {
                    dropzone.style.opacity = 1;
                    dropzone.style.width = '100%';
                    dropzone.style.border = "";
                    dropzone.style.padding = '';
                    dropzone.style.left = '-1';

                }

                var r = document.querySelector(':root');
                r.style.setProperty('--fieldContent', 'FieldsPresent');
                // $A.get('e.force:refreshView').fire();
                // window.location.reload();
                var xx = document.querySelectorAll('.fieldDiv0,.fieldDiv2,.pagetitle,.formtitle');
                for (var s of xx) {
                    s.style.opacity = 1;
                }

                // component.set("v.renderPreview",true);
            };
        } catch (error) {
            console.log({ error });
        }
    },
    dragEnter: function(event) {

        var dropzoneloop = document.querySelectorAll('.example-dropzone');

        for (var dropzone of dropzoneloop) {

            if (dropzone.lastElementChild == null) {
                dropzone.style.opacity = 0.8;
                dropzone.style.width = '95%';
                dropzone.style.border = "1px dashed #3298c8";
                dropzone.style.padding = '5%';
                dropzone.style.left = '4%';
                dropzone.innerHTML = "Drop Here";
                dropzone.style.textAlign = "center";
                dropzone.style.fontSize = '1rem';
                dropzone.style.color = "#3298c8";

            }
        }

    },
    dragLeave: function(event) {
        try {
            // var dropzoneloop = document.querySelector('.example-dropzone');
            // var r = document.querySelector(':root');
            // var getStyle = getComputedStyle(r);
            // var fieldsPresentVar = getStyle.getPropertyValue('--fieldContent');
            // console.log({ fieldsPresentVar });
            // if (fieldsPresentVar == '') {
            //     for (var dropzone of dropzoneloop) {
            //         dropzone.style.opacity = 1;
            //         dropzone.style.width = '100%';
            //         dropzone.style.border = "none";
            //         dropzone.style.padding = '';
            //         dropzone.style.left = '-1';
            //         dropzone.innerHTML = " ";
            //         dropzone.style.textAlign = "";
            //         dropzone.style.fontSize = '';
            //         dropzone.style.color = "";

            //     }

            // }


            var dropzoneloop = document.querySelectorAll('.example-dropzone');

            for (var dropzone of dropzoneloop) {

                if (dropzone.lastElementChild == null) {
                    dropzone.style.opacity = 1;
                    dropzone.style.width = '100%';
                    dropzone.style.border = "none";
                    dropzone.style.padding = '';
                    dropzone.style.left = '-1';
                    dropzone.innerHTML = " ";
                    dropzone.style.textAlign = "";
                    dropzone.style.fontSize = '';
                    dropzone.style.color = "";

                }
            }
        } catch (e) {
            console.log({ e });
            helper.showToast("Error", "Error Occur", "Something went wrong while leave the field");

        }


    },
    openModal: function(component, event, helper) {
        helper.openModal(component, event, helper);
    },

    closeModal: function(component, event, helper) {
        helper.closeModal(component, event, helper);
    },

    openCustomizeTemplate: function(component, event, helper) {
        helper.openCustomizeTemplate(component, event, helper);
    },

    cancleCustomizeTemplate: function(component, event, helper) {
        helper.cancleCustomizeTemplate(component, event, helper);
    },

    openAddRecipient: function(component, event, helper) {
        helper.openAddRecipient(component, event, helper);
    },

    cancleAddRecipient: function(component, event, helper) {
        helper.cancleAddRecipient(component, event, helper);
    },

    openEditRecipient: function(component, event, helper) {
        component.set("v.indexToUpdate", event.getSource().get("v.value"));
        helper.openEditRecipient(component, event, helper);
    },

    cancleEditRecipient: function(component, event, helper) {
        helper.cancleEditRecipient(component, event, helper);
    },

    addRecipient: function(component, event, helper) { // notification in add new recever email id
        helper.addRecipient(component, event, helper);
        // helper.loadEmailRecipient(component, event, helper);
        // helper.cancleAddRecipient(component, event, helper);
    },

    showbar: function(component, event, helper) {
        helper.showbar(component, event, helper);
    },

    createPage: function(component, event, helper) {
        var modal = component.find("Modal");
        var modalBackdrop = component.find("ModalBackdrop");
        $A.util.removeClass(modal, "slds-fade-in-open");
        $A.util.removeClass(modalBackdrop, "slds-backdrop_open");

        helper.createPage(component, event, helper);
        window.setTimeout(function() { helper.handleCss(component, event, helper) }, 1000);
    },

    fetchQuickFormFieldAttValue: function(component, event, helper) {
        try {


            helper.fetchQuickFormFieldAttValue(component, event, helper);
            component.set("v.Cssspinner", true);
            window.setTimeout(function() { helper.handleCss(component, event, helper) }, 2000);

        } catch (e) {
            console.log("css error " + e)
        }
    },

    showSpinner: function(component, event, helper) {
        component.set("v.spinner", true);
    },

    hideSpinner: function(component, event, helper) {
        component.set("v.spinner", false);
    },

    deletePage: function(component, event, helper) {
        try {
            var msg = 'Are you sure to delete this page ?'
            if (!confirm(msg)) {
                return false;
            } else {
                helper.deletepage(component, event, helper);
            }
        } catch (e) {}
    },

    openObjectMappingComponent: function(component, event, helper) {
        try {
            var title = event.getSource().get("v.title");
            component.set("v.ids", title);
        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to delete page");
        }
    },

    openPreviewFormComponent: function(component, event, helper) {
        try {
            var title = event.getSource().get("v.title");
            component.set("v.ids", title);
        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to open preview page");
        }
    },

    formedit: function(component, event, helper) {
        try {
            var title = event.getSource().get("v.title");
            component.set("v.ids", title);
        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to edit form");
        }

    },

    handleid: function(component, event, helper) {
        try {
            var target = event.target.name;
            if (target != '') {
                var evt = $A.get("e.c:FieldEvent");
                evt.setParams({ "records": target });
                evt.fire();
            }

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to handle id");
        }

    },
    openValidationBar: function(component, event, helper) {
        try {
            var a = document.querySelector('.fieldDiv2');
            a.style.display = "block";
            var r = document.querySelector(':root');
            r.style.setProperty('--hidetabdisplay', 'none');
        } catch (e) {
            console.log({ e });
        }

    },
    handleSelect: function(component, event, helper) {

        try {

            var selectedMenuItemValue = event.getParam("value");
            var x = event.getSource().get('v.name');
            if (selectedMenuItemValue == "Edit") {
                var a = document.querySelector('.fieldDiv2');
                a.style.display = "block";
                var r = document.querySelector(':root');
                r.style.setProperty('--hidetabdisplay', 'none');

                var evt = $A.get("e.c:FieldEvent");
                evt.setParams({ "records": x });
                evt.fire();
            } else {
                helper.openModal(component, event, helper);
            }

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong");
        }

    },
    handleSelectPage: function(component, event, helper) {
        try {
            var selectedMenuItemValue = event.getParam("value");
            var x = event.getSource().get('v.name');
            if (selectedMenuItemValue == "edit") {
                var a = document.querySelector('.fieldDiv2');
                a.style.display = "block";

                var evt = $A.get("e.c:FieldEvent");
                evt.setParams({ "records": x });
                evt.fire();
            } else {
                var msg = 'Are you sure to delete this page ?'
                if (!confirm(msg)) {
                    return false;
                } else {
                    helper.deletepage(component, event, helper);
                }
            }

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong");
        }

    },
    MethodForOpacity: function(component, event, helper) {
        try {
            event.preventDefault();
            var xx = document.querySelectorAll('.fieldDiv,.fieldDiv2,.iconDiv,.pagetitle,.formtitle');
            for (var s of xx) {
                s.style.opacity = 1;
            }

        } catch (e) {}

    },
    handleActive: function(cmp, event, helper) {
        var title = event.getSource().get("v.title");
        if (title == "Notification") {
            helper.loadEmailRecipient(cmp, event, helper);
        }
        helper.loadTabs(cmp, event);
    },

    toggleFields: function(component, event, helper) {
        helper.togField(component, event, helper);
    },


    searchAction: function(component, event, helper) {
        var searchKey = component.find("searchKey").get("v.value");
        var OldSearchkey = component.get("v.OldSearchkey");
        if (searchKey.length < OldSearchkey && searchKey.length != '') {
            component.set("v.spinner1", true);
            helper.fetchSearchField(component, event, helper);
            setTimeout(
                $A.getCallback(function() {
                    if (searchKey.length > 0) {
                        var x = component.get("v.FormPageFieldValueWrapper.basefield");
                        component.set("v.OldSearchkey", searchKey.length);
                        component.set("v.ShowField", true);
                        var newList = [];
                        x.forEach(function(item, index) {
                            if (item.Label.toLowerCase().startsWith(searchKey.toLowerCase())) {
                                newList.push(item);
                            }
                        });
                        component.set('v.FormPageFieldValueWrapper.basefield', newList);
                        component.set("v.spinner1", false);
                    }
                }), 800
            );
        } else if (searchKey.length > 0) {
            var x = component.get("v.FormPageFieldValueWrapper.basefield");
            component.set("v.OldSearchkey", searchKey.length);
            component.set("v.ShowField", true);
            var newList = [];
            x.forEach(function(item, index) {
                var s = item.Label;
                if (item.Label.toLowerCase().startsWith(searchKey.toLowerCase())) {
                    newList.push(item);
                }
            });
            component.set('v.FormPageFieldValueWrapper.basefield', newList);
        } else {
            component.set("v.spinner1", true);
            component.set("v.ShowField", false);
            helper.fetchSearchField(component, event, helper);
            setTimeout(
                $A.getCallback(function() {
                    component.set("v.spinner1", false);
                }), 500
            );
        }
    },

    SetOpacity: function(component, event, helper) {
        try {
            var xx = document.querySelectorAll('.example-draggable,.fieldDiv0,.fieldDiv2,.iconDiv,.pagetitle,.formtitle');
            for (var s of xx) {
                s.style.opacity = 1;
            }

        } catch (e) {}

    },

    // ========== Email Module Start ==========
    saveNotificationMailData: function(component, event, helper) {
        helper.saveNotificationMailData(component, event, helper);
    },

    deleteRecipient: function(component, event, helper) {
        helper.deleteRecipient(component, event, helper);
    },

    editRecipient: function(component, event, helper) {
        helper.editRecipient(component, event, helper);
        helper.cancleEditRecipient(component, event, helper);
    },


    // ========== Email Module Emd ==========


    // ========== Thank You Module Start ==========
    thanksTxt: function(component, event, helper) {
        helper.thanksTxt(component, event, helper);
    },

    thanksUrl: function(component, event, helper) {
        helper.thanksUrl(component, event, helper);
    },

    redirectTxt: function(component, event, helper) {
        helper.redirectTxt(component, event, helper);
    },

    redirectUrl: function(component, event, helper) {
        helper.redirectUrl(component, event, helper);
    },

    openRichText: function(component, event, helper) {
        component.set("v.showRichText", true);
        var rawhtml = component.find("editor").get("v.value");
        component.set("v.HtmlText", rawhtml);
    },

    closeModel: function(component, event, helper) {
        var richValue = component.get("v.FormPageFieldValueWrapper");
        if (richValue.formName.ThankYou_Label__c != null) {
            component.set("v.ThanksLabel", richValue.formName.ThankYou_Label__c);
        } else {
            var labeldata = '<p style="text-align: center;"><span style="font-size: 36px; color: rgb(59, 76, 228);">Thank You!</span></p>'
            component.set("v.ThanksLabel", labeldata);
        }
        component.set("v.showRichText", false);
    },

    saveData: function(component, event, helper) {
        component.set("v.showRichText", false);
    },

    HtmlTextC: function(component) {
        var rawhtml = component.find("editor").get("v.value");
        component.set('v.HtmlText', rawhtml);
    },

    RichTextC: function(component) {
        var rawhtml = component.get("v.HtmlText");
        component.set("v.ThanksLabel", rawhtml);
    },

    storethanksdata: function(component, event, helper) {
        helper.storethanksdata(component, event, helper);
    },
    // ========== Thank You Module End ==========

    // Accordian section method
    handleSectionToggle: function(cmp, event) {
        try {
            var openSections = event.getParam('openSections');

            if (openSections.length === 0) {
                cmp.set('v.activeSectionsMessage', "All sections are closed");
            } else {
                cmp.set('v.activeSectionsMessage', "Open sections: " + openSections.join(', '));
            }

        } catch (e) {}

    },

    handleCss: function(component, event, helper) {
        helper.handleCss(component, event);

    },

    setPxPercent: function(cmp, event, helper) {
        try {
            var selectedOptionValue = event.getParam("value");

            if (selectedOptionValue == 'Percent') {
                var a = cmp.find('input-id-01').get('v.label');
                if (a == 'Form Width') {
                    var b = cmp.find('input-id-01').set('v.label', a + '' + '(%)');
                } else {
                    if (a.length >= 11) {
                        a = a.slice(0, 10);
                        var b = cmp.find('input-id-01').set('v.label', a + '' + '(%)');
                    }

                }

            } else {
                var a = cmp.find('input-id-01').get('v.label');
                if (a == 'Form Width') {
                    var b = cmp.find('input-id-01').set('v.label', a + '' + '(px)');

                } else {
                    if (a.length >= 11) {
                        a = a.slice(0, 10);
                        var b = cmp.find('input-id-01').set('v.label', a + '' + '(px)');

                    }

                }
            }

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to set pixel or percentage");
        }


    },


    changelabel: function(cmp, event, helper) {
        try {
            var main = cmp.get('v.FormPageFieldValueWrapper');
            var submain = main.PageWrapperList;
            submain.forEach(function(value, index) {
                var a = value.FieldWrapperList;
                a.forEach(function(val, index) {
                    var b = val.FieldAttObj;
                })
            })

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to change label");
        }

    },



    handleSave: function(component, event, helper) {
        try {
            if (component.find("fuploader").get("v.files").length > 0) {
                component.set("v.imageSpinner", true);
                window.setTimeout(function() { helper.uploadHelper(component, event, helper) }, 1000);
                // window.setTimeout(helper.uploadHelper(component, event), 3000);

            } else {
                alert('Please Select a Valid File');
            }

        } catch (e) {
            console.log({ e });
            helper.showToast("Error", "Error Occur", "Something went wrong to save");
        }

    },

    handlePageSave: function(component, event, helper) {
        try {
            if (component.find("pageuploader").get("v.files").length > 0) {
                component.set("v.pageImageSpinner", true);
                window.setTimeout(function() { helper.uploadPageHelper(component, event, helper) }, 2000);

            } else {
                alert('Please Select a Valid File');
            }

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to save the page");
        }

    },



    removeBackground: function(component, event, helper) {
        try {
            confirm("Are You Sure ?");
            var action = component.get('c.DeleteFile');
            action.setParams({
                "formId": component.get("v.FormId"),
                "myId": component.get("v.storeFormbgId")
            })
            action.setCallback(this, function(response) {
                component.set('v.deleteFormImageIds', component.get("v.storeFormbgId"));
                var deleteAction = component.get('c.saveDeletedFormImages');
                deleteAction.setParams({
                    "formId": component.get("v.FormId"),
                    "DeleteformImage": component.get("v.storeFormbgId")
                })
                deleteAction.setCallback(this, function(response) {});
                $A.enqueueAction(deleteAction);


                component.set("v.storeFormbgId", '')
            })

            $A.enqueueAction(action);

            var fetchbackground = document.getElementById('mainformid');
            // for (var i of fetchbackground) {

            fetchbackground.style.backgroundImage = '';



            // }

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to remove form background");
        }


    },

    removePageBackground: function(component, event, helper) {
        try {
            confirm("Are You Sure ?");
            var action = component.get('c.DeletePageFile');
            action.setParams({
                "formId": component.get("v.FormId"),
                "myId": component.get("v.storebgId")
            })
            action.setCallback(this, function(response) {


                component.set('v.deleteImageIds', component.get("v.storebgId"));
                var deleteAction = component.get('c.saveDeletedPageImages');
                deleteAction.setParams({
                    "formId": component.get("v.FormId"),
                    "DeleteImage": component.get("v.storebgId")
                })
                deleteAction.setCallback(this, function(response) {});
                $A.enqueueAction(deleteAction);



                component.set("v.storebgId", '')
            })

            $A.enqueueAction(action);

            var fetchbackground = document.querySelectorAll('.page');
            var r = document.querySelector(':root');
            r.style.setProperty('--labelcolor', 'black');

            for (var i of fetchbackground) {

                i.style.backgroundImage = '';


            }

        } catch (e) {
            console.log(e);
            helper.showToast("Error", "Error Occur", "Something went wrong to remove page background");
        }


    },

    globalsearch: function(component, event, helper) {
        try {
            var value = component.get('v.searchkeyword');
            var searchquery = value.toLowerCase();
            var b = document.getElementsByClassName("accordion");
            for (var i = 0; i < b.length; i++) {
                if (!b[i].innerHTML.toLowerCase().includes(searchquery)) {
                    b[i].style.display = "none";
                } else {
                    b[i].style.display = "list-item";
                }

                if (value == '') {
                    b[i].style.display = "block";
                }
            }


        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to serach action");
        }


    },
    designaccordian: function(component, event, helper) {
        try {
            var acc = document.getElementsByClassName("accordion");
            for (var i = 0; i < acc.length; i++) {
                event.target.classList.toggle("active");
                var panel = event.target.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to accordian");
        }

    },

    thanksTxt: function(component, event, helper) {
        helper.thanksTxt(component, event, helper);
    },

    thanksUrl: function(component, event, helper) {
        helper.thanksUrl(component, event, helper);
    },

    redirectTxt: function(component, event, helper) {
        helper.redirectTxt(component, event, helper);
    },

    redirectUrl: function(component, event, helper) {
        helper.redirectUrl(component, event, helper);
    },

    storethanksdata: function(component, event, helper) {
        helper.storethanksdata(component, event, helper);
    },

    //========== Email module =========

    publiclink: function(component, event, helper) {
        try {
            var formid = component.get("v.FormId");
            var action = component.get("c.siteurl");
            action.setParams({ 'formId': formid });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var forceurl = response.getReturnValue();
                    if (forceurl[0] == 'Deactivate') {
                        component.set("v.site_deactivate", false);
                    } else {
                        var en = btoa(formid);
                        var url = forceurl + "/PreviewForm?Id=" + en;
                        component.set("v.publishurl", url);
                        component.set("v.site_deactivate", true);
                    }
                }
            })
            $A.enqueueAction(action);

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong");
        }

    },

    copyInputFieldValue: function(component, event, helper) {
        try {
            var textForCopy = component.get("v.publishurl");
            helper.copyTextFieldHelper(component, event, textForCopy);

        } catch (e) {
            helper.showToast("Error", "Error Occur", "Something went wrong to copy input field value");
        }

    },

    showModal1: function(component, event, helper) {
        try { component.set("v.showModal1", true); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong to show lightbox text model"); }

    },

    hideModel1: function(component, event, helper) {
        try { component.set("v.showModal1", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong hide model"); }

    },

    saveDetails1: function(component, event, helper) {
        try { component.set("v.showModal1", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong to save lightbox  text model detail"); }

    },
    showModal2: function(component, event, helper) {
        try { component.set("v.showModal2", true); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong show model"); }

    },

    hideModel2: function(component, event, helper) {
        try { component.set("v.showModal2", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong hide model"); }

    },

    saveDetails2: function(component, event, helper) {
        try { component.set("v.showModal2", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong save model detail"); }

    },
    showModal3: function(component, event, helper) {
        try { component.set("v.showModal3", true); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong show model"); }

    },
    hideModel3: function(component, event, helper) {
        try { component.set("v.showModal3", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong hide model"); }

    },
    saveDetails3: function(component, event, helper) {
        try { component.set("v.showModal3", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong save model detail"); }

    },
    showModal4: function(component, event, helper) {
        try { component.set("v.showModal4", true); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong show model"); }

    },
    hideModel4: function(component, event, helper) {
        try { component.set("v.showModal4", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong hide model"); }

    },
    saveDetails4: function(component, event, helper) {
        try { component.set("v.showModal4", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong save model detail"); }

    },
    showTextModal: function(component, event, helper) {
        try { component.set("v.showTextModal", true); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong save model "); }


    },
    hideModel5: function(component, event, helper) {
        try { component.set("v.showTextModal", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong hide model"); }

    },
    showModel6: function(component, event, helper) {
        try { component.set("v.showModel6", true); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong show model"); }

    },
    hideModel6: function(component, event, helper) {
        try { component.set("v.showModel6", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong hide model"); }

    },

    saveDetails6: function(component, event, helper) {
        try { component.set("v.showModel6", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong save model detail"); }

    },

    showModel7: function(component, event, helper) {
        try { component.set("v.showModel7", true); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong show model"); }

    },

    hideModel7: function(component, event, helper) {
        try { component.set("v.showModel7", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong hide model"); }

    },

    saveDetails7: function(component, event, helper) {
        try { component.set("v.showModel7", false); } catch (e) { helper.showToast("Error", "Error Occur", "Something went wrong save model detail"); }

    },
    textCopy: function(component, event, helper) {
        try {
            var s = event.target.nextElementSibling.id;
            var r = document.createRange();
            r.selectNode(document.getElementById(s));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(r);
            document.execCommand('copy');


        } catch (e) {

        }
    },

    Hidetwo_class: function(component, event, helper) {
        var tabs = component.find('demo');

        for (var each in tabs) {
            $A.util.removeClass(tabs[each], 'two');
            $A.util.addClass(tabs[each], 'fieldDiv');
        }
        var a = document.querySelector('.fieldDiv2');
        a.style.display = "none";
    },

    // handleForceRefreshViewForLWC: function(component, event) {
    //         component.find("childlwccomponent").forceRefreshInitiated();

    //     }
    // handleObjectMappingActive: function(component, event) {
    //     var getevent = event.getSource().get('v.title');
    //     if (getevent == 'Object Mapping') {
    //         console.log('Enter oMapping');

    //         console.log(component.get("v.FormId"));
    //         $A.createComponent('c:objectmapingmihir', {
    //             title: 'Please enter your name',
    //             FormId: component.get("v.FormId"),
    //             "aura:id": "inpId",


    //         }, function attachModal(modalCmp, status) {
    //             if (component.isValid() && status === 'SUCCESS') {
    //                 var body = component.get("v.body");
    //                 body.push(modalCmp);
    //                 component.set("v.body", body);
    //             }
    //         });




    //     }

    // },




})