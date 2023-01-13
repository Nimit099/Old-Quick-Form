({
    onDragStart: function(form, event, helper) {
        var x = event.target.dataset.record;
        var targetcls = event.target.className;
        if (targetcls != 'field') {
            event.target.style.opacity = 0.5;
            // var pDiv = event.target;
            // var cDiv = pDiv.children;
            // for (var i = 0; i < cDiv.length; i++) {
            //     cDiv[i].style.border = 'none';
            // }
        }
        console.log({ x });
        if (x == null) {
            event.preventDefault();
            onDragOver();
        } else {
            event.dataTransfer.setData('text/plain', x);
            var xx = document.querySelectorAll('.fieldDiv0,.fieldDiv2,.pagetitle,.formtitle');
            for (var s of xx) {
                s.style.opacity = 0.4;
            }
        }
    },
    onDragOver: function(from, event) {
        event.preventDefault();
    },
    onDrop: function(component, event, helper, form) {
        const Fieldid = event.dataTransfer.getData('text');
        if (Fieldid == 'QFPAGEBREAK') {
            helper.pageBreakHelper(component, event, helper);
        } else {
            var xc = document.querySelector('[data-record="' + Fieldid + '"]');
            console.log('xc :' + xc);
            var dataRef = xc.getAttribute('data-ref');
            console.log({ dataRef });
            if (dataRef == "inner") {
                var classname = event.target.className;
                console.log('classname :' + classname);
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
                }
                var FieldElement = document.querySelectorAll('.field');
                var Listt = [];
                for (var i = 0; i < FieldElement.length; i++) {
                    var x = FieldElement[i].getAttribute('data-record');
                    var ParentPageId = FieldElement[i].parentElement.parentElement.getAttribute('id');
                    Listt.push(x + ':::' + i + ':::' + ParentPageId);
                }
                helper.SequenceSave(component, event, helper, Listt);
            } else {
                var FormId = component.get("v.FormId");
                var classname = event.target.className;
                console.log({ classname });
                if (classname == 'field') {
                    var PageId = event.target.parentNode.parentNode.id;
                    var CloneObject = xc.cloneNode(true);
                    event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                    helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid);
                } else if (classname == 'example-dropzone') {
                    var PageId = event.target.parentNode.id;
                    var CloneObject = xc.cloneNode(true);
                    var testVar = event.target;
                    console.log({ testVar });
                    event.target.appendChild(CloneObject);
                    helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid);
                } // for name, datetime, rating, signature field
                else if (classname == 'name cQuickformfieldcomponent1' || classname == 'datetime cQuickformfieldcomponent1' || classname == 'ratingfield' || classname == 'signaturefield') {
                    var PageId = event.target.parentNode.id;
                    var CloneObject = xc.cloneNode(true);
                    event.target.parentNode.insertBefore(CloneObject, event.target.nextElementSibling);
                    helper.insertFieldRecord(component, event, helper, FormId, PageId, Fieldid);
                }
            }
            var xx = document.querySelectorAll('.fieldDiv0,.fieldDiv2,.pagetitle,.formtitle');
            for (var s of xx) {
                s.style.opacity = 1;
            }
        }
        event.dataTransfer.cleardata();

    },
    fetchQuickFormFieldAttValue: function(component, event, helper) {
        helper.fetchQuickFormFieldAttValue(component, event, helper);
    },

    // Search Fields In Field Section
    searchAction: function(component, event, helper) {
        var searchKey = component.find("searchKey").get("v.value");
        if (searchKey.length > 0) {
            component.set("v.ShowField", true);
            var baseField = component.get("v.baseField");
            var newList = [];
            baseField.forEach(function(item, index) {
                if (item.Label.toLowerCase().startsWith(searchKey.toLowerCase())) {
                    newList.push(item);
                }
            });
            component.set('v.FormPageFieldValueWrapper.basefield', newList);
        } else {
            component.set("v.ShowField", false);
            component.set("v.FormPageFieldValueWrapper.basefield", component.get("v.baseField"));
        }
    },
    handleActiveTab: function(event, component, helper) {
        try {

            var a = document.querySelector('.EditForm');
            a.style.display = 'none';

        } catch (e) {
            console.log({ e });
        }

    }
})