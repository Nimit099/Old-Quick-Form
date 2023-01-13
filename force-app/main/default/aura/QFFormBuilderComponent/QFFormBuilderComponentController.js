({
    //============= [init method ]============================
    fetchQuickFormFieldAttValue: function(component, event, helper) {
        try {
            helper.fetchQuickFormFieldAttValue(component, event, helper);
            component.set("v.Cssspinner", true);
            window.setTimeout(function() { helper.handleCss(component, event, helper) }, 5000);
            var lastTab = localStorage.getItem('lastTab');
            component.find('tabSet').set('v.selectedTabId', lastTab);


        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    // =============================== [ Event For Refresh Component ]=============================
    refreshCmp: function(component, event, helper) {
        try {
            var formData = event.getParam("formData");
            if (formData == 'Refresh') {
                var validationBar = document.querySelector('.fieldDiv2');
                validationBar.style.display = "none";
                var r = document.querySelector(':root');
                r.style.setProperty('--hidetabdisplay', 'block');

                component.find("toastCmp").showToastModel("Data Saved Successfully", "success");
                helper.fetchQuickFormFieldAttValue(component, event, helper);
                component.set("v.Cssspinner", true);
                window.setTimeout(function() { helper.handleCss(component, event, helper) }, 1000);
            }
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    // =============================== [On draging Field  ]=============================
    onDragStart: function(form, event, helper, component) {
        try {
            var x = event.target.dataset.record;
            var targetcls = event.target.className;
            if (targetcls != 'field') {
                event.target.style.opacity = 0.5;
            }
            // Display drop box when we darg 1st field on page
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
                } else {
                    dropzone.style.opacity = 0.4;
                    dropzone.style.border = " ";
                }
            }
            if (x == null) {
                event.preventDefault();
                onDragOver();
            } else {
                event.dataTransfer.setData('text/plain', x);
                var formtitle = document.querySelector('.formTitleHeader');
                formtitle.style.opacity = 1;
            }
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },
    //====================[Drag over] ===================
    onDragOver: function(from, event) {
        event.preventDefault();
    },
    // =======================[On droping field]=======================
    onDrop: function(component, event, helper, form) {
        try {
            //Disable drop box after droping first field on page
            var dropzoneloop = document.querySelectorAll('.example-dropzone');
            for (var dropzone of dropzoneloop) {
                if (dropzone.lastElementChild == null) {
                    dropzone.style.opacity = 1;
                    dropzone.style.width = '100%';
                    dropzone.style.border = "none";
                    dropzone.style.padding = '';
                    dropzone.style.left = '0';
                    dropzone.innerHTML = " ";
                    dropzone.style.textAlign = "";
                    dropzone.style.fontSize = '';
                    dropzone.style.color = "";
                } else {
                    dropzone.style.opacity = 1;
                    dropzone.style.border = " ";
                }
            }

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
                    } // for full name, datetime field  
                    else if (classname == 'fullname cQFFormFieldComponent' || classname == 'datetime cQFFormFieldComponent' || classname == 'cQFFormFieldComponent' || classname == 'slds-form-element__label cQFFormFieldComponent' || classname == "slds-box slds-box_xx-small ratebox ratingstyle cQFFormFieldComponent" || classname == "outrichstyle cQFFormFieldComponent") {
                        event.target.parentNode.parentNode.insertBefore(xc, event.target.parentNode);
                    } // for star rating field 
                    else if (classname == "ratingLabel" || classname == 'scale_rating') {
                        event.target.parentNode.parentNode.parentNode.insertBefore(xc, event.target.parentNode.parentNode);
                    } // for rating, signature field
                    else if (classname == 'ratingfield' || classname == 'signaturefield' || classname == 'ratingItemList') {
                        event.target.parentNode.parentNode.parentNode.parentNode.insertBefore(xc, event.target.parentNode.parentNode.parentNode);
                    } // for emoji rating field 
                    else if (classname == 'rating') {
                        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(xc, event.target.parentNode.parentNode.parentNode.parentNode);
                    } // for emoji rating field 
                    else if (classname == 'em' || classname == "slds-button slds-button_brand") {
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
                    var formFieldId = '';
                    if (classname == 'field') {
                        formFieldId = event.target.getAttribute('data-record');
                        var FieldElement = document.querySelectorAll('.field');
                        var Listt = [];
                        for (var i = 0; i < FieldElement.length; i++) {
                            var x = FieldElement[i].getAttribute('data-record');
                            if (x == formFieldId) {
                                break;
                            } else {
                                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                                Listt.push(x + ':::' + i + ':::' + ParentPageId);
                            }
                        }
                        var PageId = event.target.parentNode.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid, Listt.length);
                    } else if (classname == 'example-dropzone') {
                        var FieldElement = document.querySelectorAll('.field');
                        var Listt = [];
                        for (var i = 0; i < FieldElement.length; i++) {
                            var x = FieldElement[i].getAttribute('data-record');
                            if (x == formFieldId) {
                                break;
                            } else {
                                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                                Listt.push(x + ':::' + i + ':::' + ParentPageId);
                            }
                        }
                        var PageId = event.target.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.appendChild(CloneObject);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid, Listt.length - 1);
                    } // for name, datetime, rating, signature field
                    else if (classname == 'fullname cQFFormFieldComponent' || classname == 'datetime cQFFormFieldComponent' || classname == 'slds-form-element__label cQFFormFieldComponent' || classname == 'cQFFormFieldComponent' || classname == "slds-box slds-box_xx-small ratebox ratingstyle cQFFormFieldComponent" || classname == "outrichstyle cQFFormFieldComponent") {
                        formFieldId = event.target.parentNode.getAttribute('data-record');
                        var FieldElement = document.querySelectorAll('.field');
                        var Listt = [];
                        for (var i = 0; i < FieldElement.length; i++) {
                            var x = FieldElement[i].getAttribute('data-record');
                            if (x == formFieldId) {
                                break;
                            } else {
                                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                                Listt.push(x + ':::' + i + ':::' + ParentPageId);
                            }
                        }
                        var PageId = event.target.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid, Listt.length);
                    } // for star Rating
                    else if (classname == 'ratingLabel' || classname == 'scale_rating') {
                        formFieldId = event.target.parentNode.parentNode.getAttribute('data-record');
                        var FieldElement = document.querySelectorAll('.field');
                        var Listt = [];
                        for (var i = 0; i < FieldElement.length; i++) {
                            var x = FieldElement[i].getAttribute('data-record');
                            if (x == formFieldId) {
                                break;
                            } else {
                                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                                Listt.push(x + ':::' + i + ':::' + ParentPageId);
                            }
                        }
                        var PageId = event.target.parentNode.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid, Listt.length);
                    } // for Rating
                    else if (classname == 'signaturefield' || classname == 'ratingfield' || classname == 'ratingItemList') {
                        formFieldId = event.target.parentNode.parentNode.parentNode.getAttribute('data-record');
                        var FieldElement = document.querySelectorAll('.field');
                        var Listt = [];
                        for (var i = 0; i < FieldElement.length; i++) {
                            var x = FieldElement[i].getAttribute('data-record');
                            if (x == formFieldId) {
                                break;
                            } else {
                                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                                Listt.push(x + ':::' + i + ':::' + ParentPageId);
                            }
                        }
                        var PageId = event.target.parentNode.parentNode.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid, Listt.length);
                    } // for emoji Rating
                    else if (classname == "rating") {
                        formFieldId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-record');
                        var FieldElement = document.querySelectorAll('.field');
                        var Listt = [];
                        for (var i = 0; i < FieldElement.length; i++) {
                            var x = FieldElement[i].getAttribute('data-record');
                            if (x == formFieldId) {
                                break;
                            } else {
                                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                                Listt.push(x + ':::' + i + ':::' + ParentPageId);
                            }
                        }
                        var PageId = event.target.parentNode.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid, Listt.length);
                    } // for emoji Rating
                    else if (classname == "em" || classname == "slds-button slds-button_brand") {
                        formFieldId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-record');
                        var FieldElement = document.querySelectorAll('.field');
                        var Listt = [];
                        for (var i = 0; i < FieldElement.length; i++) {
                            var x = FieldElement[i].getAttribute('data-record');
                            if (x == formFieldId) {
                                break;
                            } else {
                                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                                Listt.push(x + ':::' + i + ':::' + ParentPageId);
                            }
                        }
                        var PageId = event.target.parentNode.parentNode.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid, Listt.length);
                    } // for Scale Rating
                    else if (classname == "likert-style" || classname == "statement-style") {
                        formFieldId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('data-record');
                        var FieldElement = document.querySelectorAll('.field');
                        var Listt = [];
                        for (var i = 0; i < FieldElement.length; i++) {
                            var x = FieldElement[i].getAttribute('data-record');
                            if (x == formFieldId) {
                                break;
                            } else {
                                var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                                Listt.push(x + ':::' + i + ':::' + ParentPageId);
                            }
                        }
                        var PageId = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                        var CloneObject = xc.cloneNode(true);
                        event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                        helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid, Listt.length);
                    }
                }
                var r = document.querySelector(':root');
                r.style.setProperty('--fieldContent', 'FieldsPresent');
                var xx = document.querySelectorAll('.fieldDiv0,.fieldDiv2,.pagetitle,.formtitle');
                for (var s of xx) {
                    s.style.opacity = 1;
                }
            };
        } catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    // ==================During entering in drop zone this method is called============
    dragEnter: function(event) {
        try {
            // Display drop box when we darg 1st field on page
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
                } else {
                    dropzone.style.opacity = 0.4;
                }
            }

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    //==================[Close popup modal when user click cancel button]======================
    closeModal: function(component, event, helper) {
        helper.closeModal(component, event, helper);
    },

    openCustomizeTemplate: function(component, event, helper) {
        helper.openCustomizeTemplate(component, event, helper);
    },

    cancleCustomizeTemplate: function(component, event, helper) {
        helper.cancleCustomizeTemplate(component, event, helper);
    },


    showbar: function(component, event, helper) {
        helper.showbar(component, event, helper);
    },

    // =========================[Create page ]======================
    createPage: function(component, event, helper) {
        try {
            helper.createPage(component, event, helper);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },

    // ========================[show spinner ]==================
    showSpinner: function(component, event, helper) {
        component.set("v.spinner", true);
    },
    // ========================[Hide spinner]=================
    hideSpinner: function(component, event, helper) {
        component.set("v.spinner", false);
    },
    //===================[Delete page]======================
    deletePage: function(component, event, helper) {
        try {
            var msg = 'Are you sure to delete this page ?'
            if (!confirm(msg)) {
                return false;
            } else {
                helper.deletepage(component, event, helper);
            }
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    // ====================Open object mapping component=================
    openObjectMappingComponent: function(component, event, helper) {
        try {
            var title = event.getSource().get("v.title");
            component.set("v.ids", title);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    // =================Open valiadtion bar for editing form name and etc===============
    formedit: function(component, event, helper) {
        try {
            var title = event.getSource().get("v.title");
            component.set("v.ids", title);
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },

    handleid: function(component, event, helper) {
        try {
            var target = event.target.name;
            console.log({ target });
            if (target != '') {
                var evt = $A.get("e.c:FieldEvent");
                evt.setParams({ "records": target });
                evt.fire();
            }

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },
    // ===================Open validation bar==============
    openValidationBar: function(component, event, helper) {
        try {
            var a = document.querySelector('.fieldDiv2');
            a.style.display = "block";
            var r = document.querySelector(':root');
            r.style.setProperty('--hidetabdisplay', 'none');
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },
    handleSelect: function(component, event, helper) {

        try {

            var getName = event.getSource().get('v.name');
            var getLabel = event.getSource().get('v.label');

            if (getLabel == "Edit") {
                var a = document.querySelector('.fieldDiv2');
                a.style.display = "block";
                var r = document.querySelector(':root');
                r.style.setProperty('--hidetabdisplay', 'none');

                var evt = $A.get("e.c:FieldEvent");
                evt.setParams({ "records": getName });
                evt.fire();
            } else {
                helper.openModal(component, event, helper);
                var validationBar = document.querySelector('.fieldDiv2');
                validationBar.style.display = "none";
                var r = document.querySelector(':root');
                r.style.setProperty('--hidetabdisplay', 'block');
            }

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },

    handleSelectPage: function(component, event, helper) {
        try {;
            var getName = event.target.name;
            var x = event.target.id;
            if (getName == "Edit Page") {
                var r = document.querySelector(':root');
                r.style.setProperty('--hidetabdisplay', 'none');
                var a = document.querySelector('.fieldDiv2');
                a.style.display = "block";
                var evt = $A.get("e.c:FieldEvent");
                evt.setParams({ "records": x });
                evt.fire();
            } else {
                var validationBar = document.querySelector('.fieldDiv2');
                validationBar.style.display = "none";
                var r = document.querySelector(':root');
                r.style.setProperty('--hidetabdisplay', 'block');

                var pageIdStr = event.target.id;
                var pageId = pageIdStr.split(':::');
                component.set("v.selectPageId", pageId[1]);
                component.set("v.showIt", true);
            }



        } catch (e) {
            console.log({ e });
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },
    // ==========click no button to close popup ==================
    clickNo: function(component, event, helper) {
        component.set("v.showIt", false);
    },
    //================= click yes button to close popup and proceed to delete procedure=============
    clickYes: function(component, event, helper) {
        component.set("v.showIt", false);
        helper.deletepage(component, event, helper);
    },


    MethodForOpacity: function(component, event, helper) {
        try {
            event.preventDefault();
            var xx = document.querySelectorAll('.fieldDiv,.fieldDiv2,.pagetitle,.formtitle');
            for (var s of xx) {
                s.style.opacity = 1;
            }
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },

    toggleFields: function(component, event, helper) {
        helper.togField(component, event, helper);
    },

    // ================Search Fields In Field Section=============
    searchAction: function(component, event, helper) {
        try {
            var searchKey = component.find("searchKey").get("v.value");
            if (searchKey.length > 0) {
                component.set("v.ShowField", true);
                var baseField = component.get("v.baseField");
                var newList = [];
                baseField.forEach(function(item, index) {
                    if (item.Label.toLowerCase().search(searchKey.toLowerCase()) >= 0) {
                        newList.push(item);
                    }
                });
                component.set('v.FormPageFieldValueWrapper.basefield', newList);
            } else {
                component.set("v.ShowField", false);
                component.set("v.FormPageFieldValueWrapper.basefield", component.get("v.baseField"));
            }
        } catch (e) {
            // component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },

    SetOpacity: function(component, event, helper) {
        try {
            var xx = document.querySelectorAll('.example-draggable,.fieldDiv0,.fieldDiv2,.pagetitle,.formtitle');
            for (var s of xx) {
                s.style.opacity = 1;
            }
            //Disable drop box after droping first field on page
            var dropzoneloop = document.querySelectorAll('.example-dropzone');
            for (var dropzone of dropzoneloop) {
                if (dropzone.lastElementChild == null) {
                    dropzone.style.opacity = 1;
                    dropzone.style.width = '100%';
                    dropzone.style.border = "none";
                    dropzone.style.padding = '';
                    dropzone.style.left = '0';
                    dropzone.innerHTML = " ";
                    dropzone.style.textAlign = "";
                    dropzone.style.fontSize = '';
                    dropzone.style.color = "";
                } else {
                    dropzone.style.opacity = 1;
                    dropzone.style.border = " ";
                }
            }
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }


    },

    // Accordian section method
    handleSectionToggle: function(cmp, event) {
        try {
            var openSections = event.getParam('openSections');

            if (openSections.length === 0) {
                cmp.set('v.activeSectionsMessage', "All sections are closed");
            } else {
                cmp.set('v.activeSectionsMessage', "Open sections: " + openSections.join(', '));
            }

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }

    },
    //==================Hnadle css for form , page , albel , input , button , choices , field focus and field hover====================
    handleCss: function(component, event, helper) {
        helper.handleCss(component, event);

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
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },

    //===================Save form background image========================
    handleSave: function(component, event, helper) {
        try {
            if (component.find("fuploader").get("v.files").length > 0) {
                // component.set("v.imageSpinner", true);
                component.set("v.spinner", true);

                window.setTimeout(function() { helper.uploadHelper(component, event, helper) }, 1000);
            } else {
                component.find("toastCmp").showToastModel("Please select valid value", "error");
            }

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },

    //====================Save page background image==================
    handlePageSave: function(component, event, helper) {
        try {
            if (component.find("pageuploader").get("v.files").length > 0) {
                // component.set("v.pageImageSpinner", true);
                component.set("v.spinner", true);
                window.setTimeout(function() { helper.uploadPageHelper(component, event, helper) }, 2000);

            } else {
                component.find("toastCmp").showToastModel("Please select valid value", "error");
            }

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }

    },

    // ===========================Confirm box event handler for remove page and form background========================
    addAppEventHandler: function(component, event, helper) {
        try {

            helper.addAppEventHandler(component, event, helper);

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
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
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
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
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
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
    copyInputFieldValue: function(component, event, helper) {
        try {
            var textForCopy = component.get("v.publishurl");
            helper.copyTextFieldHelper(component, event, textForCopy);

        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
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
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    //=================Action after particulat tab is active====================
    handleActiveTab: function(component, event, helper) {
        try {
            helper.handleActiveTab(component, event, helper);

        } catch (error) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    //=============Change  add page blue color image to white on onmouse over===========
    changeIcons: function(component, helper, event) {
        try {
            var formAddPageIcon = document.querySelector('.formAddPageIcon');
            formAddPageIcon.setAttribute('src', $A.get('$Resource.addPageWhiteBg'));
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    //=============Set add page white color image to blue on onmouse out===============
    setIcons: function(component, helper, event) {
        try {
            var formAddPageIcon = document.querySelector('.formAddPageIcon');
            formAddPageIcon.setAttribute('src', $A.get('$Resource.addPageIcon2'));
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    //=============Change  edit page blue color image to white on onmouse over [For page section]===============
    changePageIcons: function(component, helper, event) {
        try {
            var editIconImage = document.querySelector('.editIconImage');
            editIconImage.setAttribute('src', $A.get('$Resource.editWhiteBg'));
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");

        }
    },
    //=============Set edit page white color image to blue on onmouse out [for page section]================
    setPageIcons: function(component, helper, event) {
        try {
            var editIconImage = document.querySelector('.editIconImage');
            editIconImage.setAttribute('src', $A.get('$Resource.edit'));
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    //=============Change  delete page blue color image to white on onmouse over [For page section]=================
    changePageDeleteIcons: function(component, helper, event) {
        try {
            var deleteIconImage = document.querySelector('.deleteIconImage');
            deleteIconImage.setAttribute('src', $A.get('$Resource.deleteWhiteBg'));
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    //=============Change  edit page blue color image to white on onmouse over [For page section]===============
    setPageDeleteIcons: function(component, helper, event) {
        try {
            var deleteIconImage = document.querySelector('.deleteIconImage');
            deleteIconImage.setAttribute('src', $A.get('$Resource.removeIcon'));
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },
    // =================validate page title so that user can't only space in page title=================
    pageTitle: function(component, helper, event) {
        try {
            var getPageTitle = component.get('v.Page.Title__c');
            let regex = new RegExp('[a-z0-9A-Z]');
            var validate = regex.test(getPageTitle);
            if (validate) {
                component.set('v.PageTitle', false);
            } else {
                component.set('v.PageTitle', true);

            }
        } catch (e) {
            component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page", "Content Creation Error");
        }
    },


})