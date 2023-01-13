({
    // <<init>> - object select to fetch all object field
    fetchObjectField: function(component, event, helper) {
        // var cmpTarget = component.find('divId');
        // $A.util.addClass(cmpTarget, 'divShow');
        console.log(' start fetchObjectField');
        component.set("v.spinner", true);
        var FormId = component.get("v.FormId");
        component.set("v.disablevalue", false);
        component.set("v.mapingcon", false);
        component.set("v.mapingcon_edit", false);
        var action = component.get("c.fetchQuickFormField");
        action.setParams({
            'formId': FormId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                var allvalue = response.getReturnValue();
                var x = response.getReturnValue().SObjectList;
                console.log({ allvalue });
                var res = response.getReturnValue().formName.Object_Mapping__c;
                console.log(res);
                var allObject = [];
                var remove_obj_map = component.get("v.remove_obj_map");
                if (res != undefined) {
                    var objectmap = JSON.parse(res);
                    console.log(objectmap);
                    for (var i = 0; i < x.length; i++) {
                        if (objectmap[x[i].split(',')[1]] == undefined) {
                            allObject.push({
                                value: x[i].split(',')[0],
                                label: x[i].split(',')[1]
                            });
                        } else {
                            remove_obj_map[x[i].split(',')[0]] = { value: x[i].split(',')[0], label: x[i].split(',')[1] };
                        }
                    }
                } else {
                    for (var i = 0; i < x.length; i++) {
                        allObject.push({
                            value: x[i].split(',')[0],
                            label: x[i].split(',')[1]
                        });
                    }
                }
                component.set("v.remove_obj_map", remove_obj_map);
                console.log(JSON.stringify(remove_obj_map));
                component.set("v.allObject", allObject);
                var pgwr = allvalue.PageWrapperList;
                var flv = [];
                for (var i = 0; i < pgwr.length; i++) {
                    var fwl = pgwr[i].FieldWrapperList;
                    flv.push(fwl);
                }
                component.set("v.allValues", response.getReturnValue());
                component.set("v.flv", flv);

                console.log(res);
                if (res != undefined) {
                    var objectmap = JSON.parse(res);
                    var objlist = [];
                    for (var keyy in objectmap) {
                        objlist.push({ key: keyy, value: objectmap[keyy].Active });
                    }
                    console.log({ objlist });
                    console.log('fetchobjectfield 12');
                    console.log({ objlist });
                    // component.set("v.mappingobjectlist" , objlist);
                    console.log('fetchobjectlist 13');
                    if (objlist.length == 0) {
                        component.set("v.homecon", true);
                        component.set("v.disablevalue", false);
                    } else {
                        try {
                            component.set("v.mappingobjectlist", objlist);
                        } catch (error) {
                            console.log({ error });
                            component.set("v.spinner", false);
                        }
                        component.set("v.homecon", false);
                        component.set("v.disablevalue", true);
                    }
                } else {
                    component.set("v.homecon", true);
                    component.set("v.disablevalue", false);
                }
                component.set("v.spinner", false);
            } else {
                component.set("v.spinner", true);
                // component.find("toastCmp").showToastModel("Something Went Wrong....", "error");
                component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
            }
            console.log('end fetchObjectField');
        });
        $A.enqueueAction(action);
    },


    getfieldshelper: function(component, event, helper, userobj_edit) { // select object to get all field  init method
        component.set("v.spinner", true);
        console.log('getfieldshelper');
        console.log('userobj');
        var userObj = component.find("SobjectList").get("v.value");
        component.set("v.userObj", userObj);
        var edit_button_validation = component.get("v.edit_button_validation");
        var mappingobjectlist = component.get("v.mappingobjectlist");
        console.log("mappingobjectlist.length===>", mappingobjectlist.length);
        if (edit_button_validation == 'Edit') {
            var userObj = userobj_edit;
            console.log('userobj_edit', userobj_edit);
        }
        console.log(userObj);
        // console.log('9');
        var temp_map = new Map(); // map collection in null set
        temp_map.set();
        component.set("v.mapDistances", temp_map); // non required field list null 
        var numlist = component.get("v.num"); // component.set("v.num" , numlist);
        console.log({ numlist });
        numlist.splice(0, numlist.length);
        // console.log('10');

        var mappp = new Map();
        mappp.set();
        component.set("v.mapp", mappp); // mapp collection is null set
        // console.log('11');

        var mapfor = new Map();
        mapfor.set();
        component.set("v.mapfor", mapfor); // mapfor collecton is null set
        component.set("v.form_option_nreq", []);
        component.set("v.form_option_req", []);
        // console.log('12');

        if (userObj == 'Select Object' || userObj == '') {
            // console.log('14');
            component.set("v.mappingbtndisable", true);
            component.set("v.allFields", '');
            component.set("v.allReqFields", '');
            component.set("v.tablevalue", false);
            component.set("v.spinner", false);
        } else {
            component.set("v.mappingbtndisable", false);
            var flv = component.get("v.flv");
            component.set("v.obj_list_message", []);
            var mapRun = true
            for (var i = 0; i < flv.length; i++) {
                var FormFieldLst = flv[i];
                if (FormFieldLst == undefined) {
                    mapRun = false;
                }
            }
            if (mapRun) {
                component.set("v.tablevalue", true);
                var action = component.get("c.getAllFields");
                action.setParams({
                    "fld": userObj
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    console.log(state);
                    if (state == "SUCCESS") {
                        component.set("v.allFields", response.getReturnValue());
                        component.set("v.selectedFieldsVar", []);
                        var allfld = response.getReturnValue();
                        var allreqfld = allfld[0].objreqfield;
                        var allnonreqfld = allfld[0].lstfieldname;

                        // var mappingobjectlist = component.get("v.mappingobjectlist");
                        // console.log(mappingobjectlist);
                        // var mappingobjectlist_count = 0;
                        // mappingobjectlist.forEach(element => {
                        //     if (element.value == true) {
                        //         mappingobjectlist_count = mappingobjectlist_count + 1;
                        //     }
                        // });
                        // console.log('mappingobjectlist_count=>', mappingobjectlist_count);


                        
                        var mappingobjectlist_count = 0;

                        if(edit_button_validation == "Edit"){
                            var edit_object_name = component.get("v.edit_object_name"); 
                            console.log(edit_object_name);
                            mappingobjectlist.forEach(element => {
                                if (element.value == true && element.key != edit_object_name) {
                                    mappingobjectlist_count = mappingobjectlist_count + 1;
                                }
                            });
                        }
                        else{
                            mappingobjectlist.forEach(element => {
                                if (element.value == true ) {
                                    mappingobjectlist_count = mappingobjectlist_count + 1;
                                }
                            });
                        }

                        console.log('mappingobjectlist_count=>', mappingobjectlist_count);

                        // console.log(typeof(allnonreqfld));
                        console.log(allnonreqfld.length);
                        if (allnonreqfld.length == 0) {
                            component.set("v.mappingbtndisable", true);
                        }

                        var objtypemap = new Map();
                        for (var i = 0; i < allreqfld.length; i++) {
                            objtypemap[allreqfld[i].apiName] = allreqfld[i].type;
                        }

                        var obj_nreq_fldtype = new Map();
                        for (var i = 0; i < allnonreqfld.length; i++) {
                            obj_nreq_fldtype[allnonreqfld[i].apiName] = allnonreqfld[i].type;
                        }

                        component.set("v.selectmapthree", obj_nreq_fldtype);

                        var allfields = component.get("v.allFields");
                        console.log({ allfields });
                        var form_option_req = component.get("v.form_option_req");

                        console.log({ form_option_req });
                        for (var k = 0; k < allfields[0].objreqfield.length; k++) {
                            var rowIndex = k + 100;
                            var objfieldvalue3 = allfields[0].objreqfield[k].apiName;
                            if (objtypemap[objfieldvalue3] == 'REFERENCE') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                        }
                                    }
                                }
                                if (mappingobjectlist.length != 0 && mappingobjectlist_count > 0) {
                                    templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                                    templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Reference Datatype Releted Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'PICKLIST') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                        }
                                    }
                                }
                                if (mappingobjectlist.length != 0 && mappingobjectlist_count > 0) {
                                    templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                                    templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Picklist Datatype Releted Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'TEXTAREA') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c != 'QFTIME' || field_value.Data_Record_Id__c != 'QFDATETIME' || field_value.Data_Record_Id__c != 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFDATE' || field_value.Data_Record_Id__c == 'QFRECAPTCHA') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                        }
                                    }
                                }
                                if (mappingobjectlist.length != 0 && mappingobjectlist_count > 0) {
                                    templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                                    templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Textarea Datatype Releted Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'EMAIL') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFEMAILID') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Email type Releted Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'STRING') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFRECAPTCHA' || field_value.Data_Record_Id__c == 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFSIGNATURE' || field_value.Data_Record_Id__c == 'QFFILEUPLOAD') {} else {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, index: '0' });
                                        }
                                    }
                                }
                                if (mappingobjectlist.length != 0 && mappingobjectlist_count > 0) {
                                    templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                                    templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add String type Releted Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'DOUBLE') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFPRICE') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Double type Releted Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'PHONE') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFPHONE') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Phone type Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'URL') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFLINK') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add URL type Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'CURRENCY') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFPRICE') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Price Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'INTEGER') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFNUMBER') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Number Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'DATE') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFDATE') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Date Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'TIME') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFTIME') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Time Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'DATETIME') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFDATETIME') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Date-Time Field In Form", "error");
                                }
                            } else if (objtypemap[objfieldvalue3] == 'BOOLEAN') {
                                var templist = [];
                                for (var i = 0; i < flv.length; i++) {
                                    var fldList = 0;
                                    var fieldatt = flv[i];
                                    for (var j = 0; j < fieldatt.length; j++) {
                                        var field_value = fieldatt[j].FieldObj;
                                        if (field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFTERMSOFSERVICE') {
                                            templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                            fldList += 1;
                                        }
                                    }
                                }
                                if (templist.length == 0) {
                                    component.find("toastCmp").showToastModel("Please, First Add Radio Button/Terms OF Service Field In Form", "error");
                                }
                            }
                            form_option_req.push({ key: rowIndex, value: templist });
                        }

                        component.set("v.form_option_req", form_option_req);

                        // console.log(JSON.stringify(form_option_reqs));
                        component.set("v.spinner", false);
                    } else {
                        component.set("v.spinner", false);
                        component.find("toastCmp").showToastModel("Something Went Wrong", "error");
                    }
                    if (response.getReturnValue() == null) {
                        component.set("v.spinner", false);
                        component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.find("toastCmp").showToastModel("Your Form's Page Is Blank, Please Don't Create Blank Page In Form", "error");
                component.set("v.spinner", false);
            }
        }
        console.log('end getfieldshelper');
    },

    selectedfieldmap: function(component, event, helper) { // select required form field
        var objfieldvalue3 = event.target.id;
        var formfieldvalue = event.getSource().get("v.value");
        var rowIndex = event.target.getAttribute("data-row-index");
        var edit_button_validation = component.get("v.edit_button_validation");
        console.log(formfieldvalue);
        // console.log(event.target.getAttribute("aura:id"));
        // object required fields to create map
        // console.log(component.find('index0').get("v.value"));
        console.log(rowIndex);
        // var rowIndex = parseInt(rowIndex.substring(0, rowIndex.length - 4));
        // var rowIndex = rowIndex.toLocaleString('en-US', {minimumIntegerDigits: 3,useGrouping: false})
        // var rowIndex = rowIndex + '_req';
        // console.log(rowIndex);
        var maplst = component.get("v.mapDistances");
        var obj = { rowIndex, objfieldvalue3, formfieldvalue };
        maplst[objfieldvalue3] = obj;

        var temp_list = [];
        if (edit_button_validation == "Edit" && formfieldvalue != 'Lookup relationship') {
            var req_lk_value = component.get("v.req_lk_value");
            for (var i = 0; i < req_lk_value.length; ++i) {
                if (req_lk_value[i].key == rowIndex) {
                    var key = rowIndex;
                    var value = 'Select Object';
                    console.log(rowIndex);
                    temp_list.push({ key, value });
                } else {
                    temp_list.push(req_lk_value[i]);
                }
            }
            component.set("v.req_lk_value", temp_list);
        }

        $A.util.addClass(add_style_class, 'changeMe_lookselect1');
        if (formfieldvalue == 'Lookup relationship') {
            var auraid = rowIndex;
            console.log(auraid);
            var add_style_class = document.getElementById(auraid);
            console.log(add_style_class);
            $A.util.addClass(add_style_class, 'changeMe');
            var lookupvalue = "LK_" + rowIndex;
            var obj = lookupvalue;
            mapfor[rowIndex] = obj;
        } else {
            var auraid = rowIndex;
            var add_style_class = document.getElementById(auraid);
            $A.util.removeClass(add_style_class, 'changeMe');
            var obj = formfieldvalue;
            mapfor[rowIndex] = obj;
            var tar = component.find(rowIndex);
            tar.style.display = 'none';
        }
        component.set("v.mapfor", mapfor);
        console.log(JSON.stringify(mapfor));
    },

    selectObjFieldhelper: function(component, event, helper) { // select object none required field
        var rowIndex = event.target.getAttribute("data-row-index");
        var objfieldvalue3 = event.getSource().get("v.value");
        var objtypemap = component.get("v.selectmapthree");
        var allfields = component.get("v.allFields");
        var lstfieldname = allfields[0].lstfieldname;
        var mapp = component.get("v.mapp");
        var form_option_nreq = component.get("v.form_option_nreq");
        var mappingobjectlist = component.get("v.mappingobjectlist");
        var edit_button_validation = component.get("v.edit_button_validation");

        var mappingobjectlist_count = 0;

        if(edit_button_validation == "Edit"){
            var edit_object_name = component.get("v.edit_object_name"); 
            console.log(edit_object_name);
            mappingobjectlist.forEach(element => {
                if (element.value == true && element.key != edit_object_name) {
                    mappingobjectlist_count = mappingobjectlist_count + 1;
                }
            });
        }
        else{
            mappingobjectlist.forEach(element => {
                if (element.value == true ) {
                    mappingobjectlist_count = mappingobjectlist_count + 1;
                }
            });
        }

        console.log('mappingobjectlist_count=>', mappingobjectlist_count);

        console.log({ objtypemap });
        var indexV = event.getSource().get("v.name");
        // console.log({ indexV });

        var num = component.get("v.num");

        console.log(rowIndex);
        var old_value = mapp[rowIndex];
        console.log(JSON.stringify(mapp));
        console.log('old value====>', old_value);

        var obj = objfieldvalue3;
        mapp[rowIndex] = obj;
        component.set("v.mapp", mapp);

        var mapp = component.get("v.mapp");
        var mapp_value_lst = [];
        for (var key in mapp) {
            mapp_value_lst.push(mapp[key]);
        }

        // lookup relationship dropdown is remove when selected other field
        if (objfieldvalue3 != 'Lookup relationship') {
            var auraid1 = "lookselect1" + rowIndex;
            var add_style_class1 = document.getElementById(auraid1);
            $A.util.addClass(add_style_class1, 'changeMe_lookselect1');
            var auraid = "lookup" + rowIndex;
            var add_style_class = document.getElementById(auraid);
            $A.util.removeClass(add_style_class, 'changeMe');
        }

        var i = 0;
        if (objfieldvalue3 == 'Select Value') {
            component.set("v.mappingbtndisable", true);
        } else {
            var num_edit = component.get("v.num_edit");
            console.log({ num_edit });
            for (var key in mapp) {
                i = i + 1;
                if (mapp[key] != 'Select Value' && i == num.length && lstfieldname.length != 1) {
                    component.set("v.mappingbtndisable", false);
                } else if (mapp[key] != 'Select Value' && i == num_edit.length && lstfieldname.length != 1) {
                    component.set("v.mappingbtndisable", false);
                } else {
                    if (mapp[key] == 'Select Value') {
                        component.set("v.mappingbtndisable", true);
                        break
                    }
                }
            }
        }

        // object field related field show in form field
        for (var k = 0; k < form_option_nreq.length; k++) {
            if (form_option_nreq[k].key == rowIndex) {
                form_option_nreq[k].value = [];
            }
        }

        var flv = component.get("v.flv");
        if (objtypemap[objfieldvalue3] == 'REFERENCE') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                var fldList = 0;
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                    }
                }
            }
            if (mappingobjectlist.length != 0 && mappingobjectlist_count > 0) {
                templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true', selected: 'false' });
                templist.push({ key: 'Lookup relationship', value: 'Lookup relationship', selected: 'false' });
            }
            if (templist.length == 0) {
                component.find("toastCmp").showToastModel("Please, First Add Reference Datatype Releted Field In Form", "error");
            }
        } else if (objtypemap[objfieldvalue3] == 'PICKLIST') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                var fldList = 0;
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' || field_value.Data_Record_Id__c == 'QFFULLNAME') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                    }
                }
            }
            if (mappingobjectlist.length != 0 && mappingobjectlist_count > 0) {
                templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true', selected: 'false' });
                templist.push({ key: 'Lookup relationship', value: 'Lookup relationship', selected: 'false' });
            }
            if (templist.length == 0) {
                component.find("toastCmp").showToastModel("Please, First Add Picklist Datatype Releted Field In Form", "error");
            }
        } else if (objtypemap[objfieldvalue3] == 'TEXTAREA') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                var fldList = 0;
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c != 'QFTIME' || field_value.Data_Record_Id__c != 'QFDATETIME' || field_value.Data_Record_Id__c != 'QFCAPTCHA' || field_value.Data_Record_Id__c != 'QFRECAPTCHA') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                    }
                }
            }
            if (mappingobjectlist.length != 0 && mappingobjectlist_count > 0) {
                templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true', selected: 'false' });
                templist.push({ key: 'Lookup relationship', value: 'Lookup relationship', selected: 'false' });
            }
            if (templist.length == 0) {
                component.find("toastCmp").showToastModel("Please, First Add Textarea Datatype Releted Field In Form", "error");
            }
        } else if (objtypemap[objfieldvalue3] == 'EMAIL') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;

                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFEMAILID') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add Email type Releted Field In Form", "error");
                }
            }
        } else if (objtypemap[objfieldvalue3] == 'STRING') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                var fldList = 0;
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFRECAPTCHA' || field_value.Data_Record_Id__c == 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFSIGNATURE' || field_value.Data_Record_Id__c == 'QFFILEUPLOAD') {} else {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                    }
                }
            }
            if (mappingobjectlist.length != 0 && mappingobjectlist_count > 0) {
                templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true', selected: 'false' });
                templist.push({ key: 'Lookup relationship', value: 'Lookup relationship', selected: 'false' });
            }
            if (templist.length == 0) {
                component.find("toastCmp").showToastModel("Please, First Add String type Releted Field In Form", "error");
            }
        } else if (objtypemap[objfieldvalue3] == 'DOUBLE') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFNUMBER') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
            }
            if (templist.length == 0) {
                component.find("toastCmp").showToastModel("Please, First Add Double type Releted Field In Form", "error");
            }
        } else if (objtypemap[objfieldvalue3] == 'PHONE') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFPHONE') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add Phone type Field In Form", "error");
                }
            }
        } else if (objtypemap[objfieldvalue3] == 'URL') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFLINK') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add URL type Field In Form", "error");
                }
            }
        } else if (objtypemap[objfieldvalue3] == 'CURRENCY') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFPRICE') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add Price Field In Form", "error");
                }
            }
        } else if (objtypemap[objfieldvalue3] == 'INTEGER') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFNUMBER') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add Number Field In Form", "error");
                }
            }
        } else if (objtypemap[objfieldvalue3] == 'DATE') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFDATE') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add Date Field In Form", "error");
                }
            }
        } else if (objtypemap[objfieldvalue3] == 'TIME') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFTIME') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add Time Field In Form", "error");
                }
            }
        } else if (objtypemap[objfieldvalue3] == 'DATETIME') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFDATETIME') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add Date-Time Field In Form", "error");
                }
            }
        } else if (objtypemap[objfieldvalue3] == 'BOOLEAN') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fldList = 0;
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFTERMSOFSERVICE') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                        fldList += 1;
                    }
                }
                if (templist.length == 0) {
                    component.find("toastCmp").showToastModel("Please, First Add Radio Button Or Terms OF Service Field In Form", "error");
                }
            }
        }
        form_option_nreq.push({ key: rowIndex, value: templist });
        component.set("v.form_option_nreq", form_option_nreq);
        console.log({ form_option_nreq });
        console.log('object field option ========');
        // selected object remove list 
        // console.log(lstfieldname.length);

        // console.log(templist.length);
        // if(templist.length == 0){
        //     var id = 'message'+rowIndex;
        //     var cls_add = document.getElementById(id);
        //     console.log(cls_add);
        //     // debugger;
        //     cls_add.classList.toggle('message_add');
        //     // debugger;
        //     console.log({cls_add});
        //     // debugger;
        //     // $A.util.addClass(cls_add, 'message_add');
        // }
        // else{
        //     // console.log('else');
        //     // var id = 'message'+rowIndex;
        //     // var cls_add = document.getElementById(id);
        //     // $A.util.removeClass(cls_add, 'message_remove');
        // }
        // // debugger;

        setTimeout(() => {
            var obj_list_message = component.get("v.obj_list_message");
            var index = obj_list_message.indexOf(rowIndex);
            obj_list_message.forEach(element => {
                var id = 'message' + element;
                document.getElementById(id).style.display = "none";
            });
            if (index !== -1) {
                obj_list_message.splice(index, 1);
            }
            if (templist.length == 0) {
                var id = 'message' + rowIndex;
                document.getElementById(id).style.display = "block";
                obj_list_message.push(rowIndex);
            }
            obj_list_message.forEach(element => {
                var id = 'message' + element;
                console.log({ id });
                document.getElementById(id).style.display = "block";
            });
            component.set("v.obj_list_message", obj_list_message);
        }, 300);



        setTimeout(() => {
            form_option_nreq.forEach(ele => {
                console.log(ele);
                console.log(ele.value);
                var ev = ele.value;
                ev.forEach(e => {
                    if (e.selected == 'true' && e.key == "Lookup relationship") {
                        console.log(ele.key);
                        var auraid1 = "lookselect1" + ele.key;
                        var add_style_class1 = document.getElementById(auraid1);
                        $A.util.addClass(add_style_class1, 'changeMe_lookselect1');
                        var auraid = "lookup" + ele.key;
                        var add_style_class = document.getElementById(auraid);
                        $A.util.addClass(add_style_class, 'changeMe');
                    }
                });
            });
        }, 100);

        var edit_button_validation = component.get("v.edit_button_validation");
        if (edit_button_validation == 'Edit') {
            console.log(mapp_value_lst);
            for (var i = 0; i < lstfieldname.length; i++) {
                if (lstfieldname[i].apiName == objfieldvalue3) {
                    console.log(lstfieldname[i].apiName);

                    kl = component.get("v.num_edit");
                    console.log({ kl });
                    var sfv = [];
                    kl.forEach((element, ind) => {
                        element.objlist.forEach((ele_1) => {
                            if (element.key == rowIndex && ele_1.apiName == objfieldvalue3) {
                                ele_1.selected = true;
                            } else if (element.key == rowIndex && ele_1.apiName != objfieldvalue3) {
                                ele_1.selected = false;
                            }
                            if (ele_1.selected) {
                                ele_1.disabled = false;
                            } else if (mapp_value_lst.includes(ele_1.apiName) && ele_1.selected == false) {
                                ele_1.disabled = true;
                            } else {
                                ele_1.disabled = false;
                            }
                        });
                    });
                    console.log({ kl });
                    kl.forEach(element => {
                        element.objlist.forEach(ele => {
                            if (ele.selected) {
                                sfv.push(ele.apiName);
                            }
                        });
                    });
                    console.log({ sfv });
                    component.set("v.selectedFieldsVar", sfv);

                    var allFields = component.get("v.allFields");
                    allFields[0].lstfieldname.forEach(element => {
                        if (mapp_value_lst.includes(element.apiName)) {
                            element.disabled = true;
                        } else {
                            element.disabled = false;
                        }
                    });
                    component.set("v.allFields", allFields);
                }
            }
        } else {
            try {
                console.log(mapp_value_lst);
                for (var i = 0; i < lstfieldname.length; i++) {
                    if (lstfieldname[i].apiName == objfieldvalue3) {
                        var kl = [];
                        kl = component.get("v.num");

                        kl = JSON.parse(JSON.stringify(kl));

                        var sfv = [];

                        kl.forEach((element, ind) => {
                            console.log({ element });
                            console.log(ind);
                            element.option_list.forEach((ele_1) => {
                                console.log(ele_1.apiName);
                                console.log(ele_1.selected);
                                console.log(ele_1.disabled);
                                if (element.key == rowIndex && ele_1.apiName == objfieldvalue3) {
                                    ele_1.selected = true;
                                } else if (element.key == rowIndex && ele_1.apiName != objfieldvalue3) {
                                    ele_1.selected = false;
                                }

                                if (ele_1.selected) {
                                    ele_1.disabled = false;
                                } else if (mapp_value_lst.includes(ele_1.apiName) && ele_1.selected == false) {
                                    ele_1.disabled = true;
                                } else {
                                    ele_1.disabled = false;
                                }
                            });

                        });

                        kl.forEach(element => {;
                            element.option_list.forEach(ele => {
                                if (ele.selected) {
                                    sfv.push(ele.apiName);
                                }
                            });
                        });
                        console.log({ kl });
                        if (sfv.length == lstfieldname.length) {
                            component.set("v.mappingbtndisable", true);
                        }
                        component.set("v.selectedFieldsVar", sfv);
                        component.set("v.num", kl);
                    }
                }

                // console.log(templist.length);
                // if(templist.length == 0){
                //     var id = 'message'+rowIndex;
                //     var cls_add = document.getElementById(id);
                //     console.log(cls_add);
                //     // debugger;
                //     cls_add.classList.toggle('message_add');
                //     // debugger;
                //     console.log({cls_add});
                //     // debugger;
                //     // $A.util.addClass(cls_add, 'message_add');
                // }
                // else{
                //     // console.log('else');
                //     // var id = 'message'+rowIndex;
                //     // var cls_add = document.getElementById(id);
                //     // $A.util.removeClass(cls_add, 'message_remove');
                // }
                // debugger;

                // for (var i = 0; i < lstfieldname.length; i++) {
                //     if (lstfieldname[i].apiName == objfieldvalue3) {
                //         var objfield_selected_fieldlist = component.get("v.objfield_selected_fieldlist");
                //         var select_objfield_list = component.get("v.select_objfield_list");
                //         select_objfield_list.push(lstfieldname[i].apiName);
                //         var obb = lstfieldname[i];
                //         objfield_selected_fieldlist[rowIndex] = obb;
                //         component.set("v.objfield_selected_fieldlist", objfield_selected_fieldlist);
                //         var numList = [];
                //         numList = component.get("v.num");

                //         numList = JSON.parse(JSON.stringify(numList));

                //         //ADDED BY ALPHA

                //         var sfv = [];
                //         var sd = [];

                //         numList.forEach((element, ind) => {
                //             if (ind < indexV) {
                //                 element.option_list.forEach(ele => {
                //                     if (ele.apiName == objfieldvalue3) {
                //                         ele.disabled = true;
                //                     }
                //                 });
                //             } 
                //             else if (ind == indexV) {
                //                 element.option_list.forEach(ele => {
                //                     if (ele.apiName == objfieldvalue3) {
                //                         ele.selected = true;
                //                     }
                //                     if (ele.apiName != objfieldvalue3 && ele.selected) {
                //                         sd.push(ele.apiName);
                //                         ele.selected = false;
                //                     }
                //                 });
                //             }
                //         });

                //         numList.forEach((element, ind) => {
                //             if (ind < indexV) {
                //                 sd.forEach(e => {
                //                     element.option_list.forEach(ee => {
                //                         if (e == ee.apiName) {
                //                             ee.disabled = false;
                //                         }
                //                     });
                //                 });
                //             }
                //         });

                //         numList.forEach(element => {;
                //             element.option_list.forEach(ele => {
                //                 if (ele.selected) {
                //                     sfv.push(ele.apiName);
                //                 }
                //             });
                //         });

                //         if (sfv.length == lstfieldname.length) {
                //             component.set("v.mappingbtndisable", true);
                //         }
                //         component.set("v.selectedFieldsVar", sfv);
                //         component.set("v.num", numList);
                //         component.set("v.select_objfield_list", select_objfield_list);

                //         console.log(' === === === === === ');
                //     }
                // }
            } catch (error) {
                console.log({ error });
            }
        }


    },

    selectedsalfieldfor: function(component, event, helper) { //select non-required form field
        try {
            var mapfor = component.get("v.mapfor");
            var mapp = component.get("v.mapp");
            var rowIndex = event.target.getAttribute("data-row-index");
            var formfieldvalue = event.getSource().get("v.value");

            var edit_button_validation = component.get("v.edit_button_validation");
            console.log('edit_button_validation', edit_button_validation);
            console.log('formfieldvalue', formfieldvalue);
            // var num_edit = component.get("v.num_edit");

            var form_option_nreq = component.get("v.form_option_nreq");
            console.log({ form_option_nreq });

            for (var i = 0; i < form_option_nreq.length; i++) {
                if (form_option_nreq[i].key == rowIndex) {
                    console.log(form_option_nreq[i].key);
                    console.log(form_option_nreq[i].value);
                    for (var j = 0; j < form_option_nreq[i].value.length; j++) {
                        console.log(form_option_nreq[i].value[j].selected);
                        console.log(form_option_nreq[i].value[j].selected);
                        if (form_option_nreq[i].value[j].value == formfieldvalue) {
                            form_option_nreq[i].value[j].selected = 'true';
                        } else {
                            form_option_nreq[i].value[j].selected = 'false';
                        }
                    }
                }
            }
            console.log({ form_option_nreq });

            console.log('hjd');
            // lookup field option select 

            var auraid = "lookselect1" + rowIndex;
            var add_style_class = document.getElementById(auraid);
            $A.util.addClass(add_style_class, 'changeMe_lookselect1');
            if (formfieldvalue == 'Lookup relationship') {
                var auraid = "lookup" + rowIndex;
                var add_style_class = document.getElementById(auraid);
                $A.util.addClass(add_style_class, 'changeMe');
                // var lookupvalue = "LK_"+rowIndex;
                var obj = formfieldvalue;
                mapfor[rowIndex] = obj;
            } else {
                var auraid = "lookup" + rowIndex;
                var add_style_class = document.getElementById(auraid);
                $A.util.removeClass(add_style_class, 'changeMe');
                var obj = formfieldvalue;
                mapfor[rowIndex] = obj;
            }
            component.set("v.mapfor", mapfor);

            var temp_list = [];
            if (edit_button_validation == "Edit" && formfieldvalue != 'Lookup relationship') {
                var nreq_lk_value = component.get("v.nreq_lk_value");
                for (var i = 0; i < nreq_lk_value.length; ++i) {
                    console.log(nreq_lk_value[i]);
                    if (nreq_lk_value[i].key == rowIndex) {
                        var key = rowIndex;
                        var value = 'Select Object';
                        console.log(rowIndex);
                        temp_list.push({ key, value });
                    } else {
                        temp_list.push(nreq_lk_value[i]);
                    }
                }
                component.set("v.nreq_lk_value", temp_list);
            }

            // form field value enter in map
            // var mapDistances = component.get("v.mapDistances");
            // var mapp = component.get("v.mapp");
            // for (var key in mapp) {
            //     if (key == rowIndex) {
            //         var rowIndex = key;
            //         var objfieldvalue3 = mapp[key];
            //         var obj = { rowIndex, objfieldvalue3, formfieldvalue };
            //         mapDistances[objfieldvalue3] = obj;
            //         console.log('aseed');
            //         // component.set("v.mapDistances", mapDistances);
            //     }
            // }
        } catch (selectedsalfieldfor_error) {
            console.log({ selectedsalfieldfor_error });
        }
    },

    lookupfieldhelper: function(component, event, helper) { // lookup field mapping
        try {
            var rowIndex = event.target.getAttribute("data-row-index");
            var lkvalue = event.getSource().get("v.value");

            console.log(rowIndex.substring(4, 8));

            // lookup relationship dropdown for required field 
            if (rowIndex.substring(4, 8) == 'req') {
                var mapDistances = component.get("v.mapDistances");
                for (var key in mapDistances) {
                    if (rowIndex == mapDistances[key].rowIndex) {
                        if (lkvalue == 'Select Object') {
                            var obj = 'Lookup relationship';
                        } else {
                            var obj = "LK_" + mapDistances[key].rowIndex + "_" + lkvalue;
                        }
                        mapDistances[key].formfieldvalue = obj;
                    }
                }
                component.set("v.mapDistances", mapDistances);
            } else {
                var mapfor = component.get("v.mapfor");
                if (lkvalue == 'Select Object') {
                    var obj = 'Lookup relationship';
                } else {
                    var obj = "LK_" + rowIndex + "_" + lkvalue;
                }
                mapfor[rowIndex] = obj;
                component.set("v.mapfor", mapfor);
            }

            var edit_button_validation = component.get("v.edit_button_validation");
            if (edit_button_validation == 'Edit') {
                var num = component.get("v.num_edit");
                var nreq_lk_value = component.get("v.nreq_lk_value");
                var temp_nreq_lk_value = [];
                for (var i = 0; i < nreq_lk_value.length; i++) {
                    if (nreq_lk_value[i].key != rowIndex) {
                        temp_nreq_lk_value.push(nreq_lk_value[i]);
                    } else {
                        temp_nreq_lk_value.push({ key: rowIndex, value: lkvalue });
                    }
                }
                console.log({ temp_nreq_lk_value });
                console.log(JSON.stringify(temp_nreq_lk_value));
                component.set("v.nreq_lk_value", temp_nreq_lk_value);
            } else {
                var num = component.get("v.num");
                for (var i = 0; i < num.length; i++) {
                    if (num[i].key == rowIndex) {
                        console.log(num[i]);
                        num[i].lukvalue = lkvalue;
                    }
                }
                console.log({ num });
            }
        } catch (lookupfieldhelper_error) {
            console.log({ lookupfieldhelper_error });
        }
    },

    remove: function(component, event, helper) { // object mapping table field remove
        try {
            var num = component.get("v.num");
            console.log({ num });

            var index = event.target.getAttribute("data-row-index");
            console.log(index);
            var map = component.get("v.mapp");
            var mapfor = component.get("v.mapfor");
            // var allfields = component.get("v.allFields");
            // var lstfieldname = allfields[0].lstfieldname;
            // var objfield_selected_fieldlist = component.get("v.objfield_selected_fieldlist");
            // lstfieldname.push(objfield_selected_fieldlist[index]);

            // for(var i=0; i<lstfieldname.length; i++){
            //     console.log(lstfieldname[i].disabled);
            //     if(lstfieldname[i].apiName == map[index]){
            //         console.log(lstfieldname[i].apiName);
            //         lstfieldname[i].disabled = false;
            //     }
            // }

            // console.log({lstfieldname});
            // console.log({allfields});
            // component.set("v.allfields", allfields);

            // console.log({ objfield_selected_fieldlist });
            // console.log({ lstfieldname });
            var s = component.get("v.selectedFieldsVar");
            console.log(s);
            var temp_s = [];
            s.forEach((ele, idx) => {
                console.log(ele);
                console.log(idx);
                if (ele != map[index]) {
                    temp_s.push(ele);
                }

            });
            console.log(temp_s);
            component.set("v.selectedFieldsVar", temp_s);


            var edit_button_validation = component.get("v.edit_button_validation");

            var objname = map[index];
            console.log('objname===', objname);

            var temp = new Map();
            var tempp = new Map();

            // remove this field data in map 
            for (var key in map) {
                if (key != index) {
                    temp[key] = map[key];
                }
            }
            component.set("v.mapp", temp);
            for (var key in mapfor) {
                if (key != index) {
                    tempp[key] = mapfor[key];
                }
            }
            component.set("v.mapfor", tempp);

            var mapp = component.get("v.mapp");

            // check add new mapping button Enable/Disabled
            if (mapp.size == 0) {
                component.set("v.mappingbtndisable", false);
            }
            for (var key in mapp) {
                if (mapp[key] == 'Select Value') {
                    component.set("v.mappingbtndisable", true);
                    break;
                } else {
                    component.set("v.mappingbtndisable", false);
                }
            }

            // remove row in num list 
            if (edit_button_validation == "Edit") {
                var num_edit = component.get("v.num_edit");
                console.log({ num_edit });
                var temp_num_edit = [];
                for (var i = 0; i < num_edit.length; i++) {
                    if (index != num_edit[i].key) {
                        temp_num_edit.push(num_edit[i]);
                    }
                }
                console.log('remove num edit', temp_num_edit.length);
                var allFields = component.get("v.allFields");
                allFields[0].lstfieldname.forEach(element => {
                    if (temp_s.includes(element.apiName)) {
                        element.disabled = true;
                    } else {
                        element.disabled = false;
                    }
                });
                component.set("v.allFields", allFields);
                component.set("v.num_edit", temp_num_edit);
            } else {
                var num = component.get("v.num");
                var temp_num = [];
                for (var i = 0; i < num.length; i++) {
                    if (num[i].key != index) {
                        temp_num.push(num[i]);
                    }
                }
                console.log({ temp_num });
                for (var j = 0; j < temp_num.length; j++) {
                    for (var i = 0; i < temp_num[j].option_list.length; i++) {
                        if (temp_num[j].option_list[i].apiName == objname) {
                            temp_num[j].option_list[i].disabled = false;
                            temp_num[j].option_list[i].selected = false;
                        }
                    }
                }
                var form_option_nreq = component.get("v.form_option_nreq");
                setTimeout(() => {
                    form_option_nreq.forEach(ele => {
                        console.log('ele==>>', ele);
                        console.log('ele.value==>', ele.value);
                        var ev = ele.value;
                        console.log({ ev });
                        ev.forEach(e => {
                            console.log(e.selected);
                            console.log(e.key);
                            if (e.selected == 'true' && e.key == "Lookup relationship") {
                                console.log(ele.key);
                                var auraid1 = "lookselect1" + ele.key;
                                var add_style_class1 = document.getElementById(auraid1);
                                $A.util.addClass(add_style_class1, 'changeMe_lookselect1');
                                var auraid = "lookup" + ele.key;
                                var add_style_class = document.getElementById(auraid);
                                $A.util.addClass(add_style_class, 'changeMe');
                            }
                        });
                    });
                }, 100);
                console.log({ temp_num });
                component.set("v.num", temp_num);
            }
            console.log('remove end');
        } catch (remove_error) {
            console.log({ remove_error });
        }
    },

    addnewmappinginhelper: function(component, event, helper) { // add new mapping row
        try {
            console.log('add new mapping start');
            var edit_button_validation = component.get("v.edit_button_validation");
            var allFields = component.get("v.allFields");
            console.log({ allFields });
            var lstfieldname = allFields[0].lstfieldname;
            var s = component.get("v.selectedFieldsVar");
            console.log('s list ====>', s);
            console.log({ edit_button_validation });
            if (edit_button_validation == "Edit") {
                component.set("v.mappingbtndisable", true);
                var num_edit = component.get("v.num_edit");
                var count = num_edit.length;
                var req_lk_value = component.get("v.req_lk_value");
                var nreq_lk_value = component.get("v.nreq_lk_value");
                let countt = count.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })
                var key = countt + '_nreq_' + Math.random().toString(36).substring(2, 4);
                // num_edit.push({ key, value: 'Select Value', vf: 'Select Value' });
                var value = 'Select Object';
                req_lk_value.push({ key, value });
                nreq_lk_value.push({ key, value });
                console.log({ num_edit });

                console.log({ lstfieldname });
                lstfieldname.forEach(ele => {
                    s.forEach(e => {
                        if (e == ele.apiName) {
                            ele.disabled = true;
                        }
                    });
                });

                // // selected 
                // lstfieldname.forEach(lst_ele => {
                //     console.log(lst_ele.apiName);
                //     if (s.includes(lst_ele.apiName) == false) {
                //         lst_ele.disabled = false;
                //     }
                // });

                var test_lst = [];
                for (var i = 0; i < lstfieldname.length; i++) {
                    test_lst.push({ apiName: lstfieldname[i].apiName, disabled: lstfieldname[i].disabled, label: lstfieldname[i].label, selected: lstfieldname[i].selected, type: lstfieldname[i].type });
                }

                num_edit.push({ key: key, value: 'Select Value', vf: 'Select Value', objlist: test_lst });
                console.log({ num_edit });
                console.log({ allFields });

                component.set("v.allFields", allFields);

                // num_edit.forEach((element, index) => {
                //     num_edit[index].objlist = test_lst;
                // });
                // console.log({ num_edit });
                component.set("v.num_edit", num_edit);
                console.log(' ====== ');
            } else {
                component.set("v.mappingbtndisable", true);
                var lst = component.get("v.num");
                var mapp = component.get("v.mapp");
                var count = lst.length;
                let countt = count.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false })
                var str_lst = countt + '_nreq_' + Math.random().toString(36).substring(2, 4);
                var test_lst = [];

                // use in lookup relationship dropdown hide and show
                var form_option_nreq = component.get("v.form_option_nreq");
                setTimeout(() => {
                    form_option_nreq.forEach(ele => {
                        console.log(ele);
                        console.log(ele.value);
                        var ev = ele.value;
                        ev.forEach(e => {
                            if (e.selected == 'true' && e.key == "Lookup relationship") {
                                console.log(ele.key);
                                var auraid1 = "lookselect1" + ele.key;
                                var add_style_class1 = document.getElementById(auraid1);
                                $A.util.addClass(add_style_class1, 'changeMe_lookselect1');
                                var auraid = "lookup" + ele.key;
                                var add_style_class = document.getElementById(auraid);
                                $A.util.addClass(add_style_class, 'changeMe');
                            }
                        });
                    });
                }, 100);

                console.log('sdfs');
                // console.log();

                // selected object field is disabled 
                console.log(JSON.stringify(mapp));
                lstfieldname.forEach(ele => {
                    s.forEach(e => {
                        if (e == ele.apiName) {
                            ele.disabled = true;
                        }
                    });
                });

                // selected 
                lstfieldname.forEach(lst_ele => {
                    console.log(lst_ele.apiName);
                    if (s.includes(lst_ele.apiName) == false) {
                        lst_ele.disabled = false;
                    }
                });

                for (var i = 0; i < lstfieldname.length; i++) {
                    test_lst.push({ apiName: lstfieldname[i].apiName, disabled: lstfieldname[i].disabled, label: lstfieldname[i].label, selected: lstfieldname[i].selected, type: lstfieldname[i].type });
                }
                lst.push({ key: str_lst, option_list: test_lst });
                console.log({ lst });
                component.set("v.num", lst);
            }
        } catch (addnewmappinginhelper_error) {
            console.log({ addnewmappinginhelper_error });
        }
    },

    savevalue: function(component, event, helper) { // save button click 

        try {
            var mapDistances = component.get("v.mapDistances");
            var mapp = component.get("v.mapp");
            var mapfor = component.get("v.mapfor");
            console.log('mapdistance====', JSON.stringify(mapDistances));
            console.log('mapp ==========', JSON.stringify(mapp));
            console.log('mapfor ========', JSON.stringify(mapfor));
            var str = 'Select Value';
            var edit_button_validation = component.get("v.edit_button_validation");
            if (edit_button_validation != 'Edit') {
                var num = component.get("v.num");
            } else {
                var num = component.get("v.num_edit");
            }
            var templist = [];

            console.log(num.length);
            console.log(mapp.size);
            var mappp_list = [];
            for (var key in mapp) {
                mappp_list.push(mapp[key]);
            }
            console.log(mappp_list.length);

            if (num.length == 0) {
                var testnon = true;
                console.log('1 st condition');
            } else {

                for (var key in mapp) {
                    console.log(mapp[key]);
                    if (mapp[key] === str) {
                        var testnon = false;
                        component.find("toastCmp").showToastModel("Fill Blank Mapping Row.", "error");
                        break;
                    } else if (mapfor[key] == undefined) {
                        var testnon = false;
                        component.find("toastCmp").showToastModel("Fill Blank Mapping Row..", "error");
                        break;
                    } else if (num.length != mappp_list.length) {
                        var testnon = false;
                        console.log('num.length != mapp.size');
                        component.find("toastCmp").showToastModel("Fill Blank Mapping Row...", "error");
                        break;
                    } else {
                        var mapforvalue = mapfor[key];
                        console.log(mapforvalue.substring(0, 3));
                        if (mapforvalue == undefined) {
                            var testnon = false;
                            component.find("toastCmp").showToastModel("Fill Blank Mapping Row....", "error");
                            break;
                        } else if (mapforvalue == 'Select Value') {
                            var testnon = false;
                            component.find("toastCmp").showToastModel("Fill Blank Mapping Row....", "error");
                            break;
                        } else if (mapforvalue == 'Lookup relationship') {
                            var testnon = false;
                            component.find("toastCmp").showToastModel("Fill Lookup relationship Mapping Row...", "error");
                            break;
                        } else {
                            var rowIndex = key;
                            var objfieldvalue3 = mapp[key];
                            var formfieldvalue = mapfor[key];
                            var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                            mapDistances[objfieldvalue3] = obj;
                            var testnon = true;
                            component.set("v.mapDistances", mapDistances);
                        }
                    }
                }
            }

            for (var key in mapDistances) {
                var mapvalue = mapDistances[key];
                for (var key2 in mapvalue) {
                    templist.push(mapvalue[key2]);
                }
            }
            console.log('templist', templist);
            console.log('templist', templist.length);
            var allfields = component.get("v.allFields");
            var objreqfield = allfields[0].objreqfield;

            if (templist.length == 0) {
                testreq = false;
            } else {
                if (objreqfield.length == 0) {
                    testreq = true;
                }
                for (var i = 0; i < objreqfield.length; i++) {
                    var testreq = templist.includes(objreqfield[i].apiName);
                    if (testreq == false) {
                        var testreq = templist.includes(objreqfield[i].apiName);
                        // helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                        component.find("toastCmp").showToastModel("Fill Blank Mapping Row...", "error");
                        break;
                    } else {
                        var mapforvalue = templist.includes(str);
                        var mapinselectvalue = templist.includes('Select Value');
                        console.log(mapinselectvalue);
                        var mapfor_LK_value = templist.includes('Lookup relationship');
                        console.log('mapforvalue', mapforvalue);
                        console.log('mapfor_LK_value', mapfor_LK_value);
                        if (mapforvalue == true || mapfor_LK_value == true || mapinselectvalue == true) {
                            testreq = false;
                            // helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                            component.find("toastCmp").showToastModel("Fill Blank Mapping Row...", "error");
                            break;
                        } else {
                            testreq = true;
                        }
                    }
                }
            }


            console.log(testreq + '<<>>' + testnon);
            if (testreq == true && testnon == true) {
                component.set("v.spinner", true);
                var allValues = component.get("v.allValues");
                var finalstring = allValues.formName.Object_Mapping__c;
                if (finalstring == undefined) {
                    finalstring = "{}";
                }
                var finalmap = JSON.parse(finalstring);
                console.log({ finalmap });
                var act_value = true;
                for (var key in finalmap) {
                    console.log(key);
                    var act_objname = component.get("v.defvalue");
                    console.log(act_objname);
                    if (key == act_objname) {
                        var act_value = finalmap[key];
                        console.log({ act_value });
                        var act_value = act_value["Active"];
                    }
                }
                console.log(act_value);

                var finallist = [];
                for (var key in mapp) {
                    finallist.push(mapp[key]);
                }
                for (var i = 0; i < objreqfield.length; i++) {
                    finallist.push(objreqfield[i].apiName);
                }
                var tempmap = new Map();
                for (var key in mapDistances) {
                    var chkkey = finallist.includes(key);
                    if (chkkey == true) {
                        tempmap[key] = mapDistances[key];
                    }
                }
                component.set("v.mapDistances", tempmap);


                if (finalstring != undefined) {
                    var finalmap = JSON.parse(finalstring);
                    var mapDistances = component.get("v.mapDistances");
                    var value = JSON.stringify(mapDistances);
                    var objname = String(component.find("SobjectList").get("v.value"));
                    // var Active = String(component.get("v.togglesecondary"));
                    var Active = act_value;
                    var obj = { Active, objname, value };
                    finalmap[objname] = obj;
                    var ab = JSON.stringify(finalmap);
                } else {
                    var tmap = new Map();
                    var value = JSON.stringify(mapDistances);
                    var objname = String(component.find("SobjectList").get("v.value"));
                    // var Active = String(component.get("v.togglesecondary"));
                    var Active = act_value;
                    var obj = { Active, objname, value };
                    tmap[objname] = obj;
                    var ab = JSON.stringify(tmap);

                }
                console.log('ab >>>', ab);
                var formId = component.get("v.FormId");
                var action = component.get("c.saveList");
                action.setParams({
                    'maplist': ab,
                    'formid': formId
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state == "SUCCESS") {
                        // helper.showToast("Success", "Success", "5000", "Save successfully..!");
                        component.find("toastCmp").showToastModel("Save successfully..", "success");
                        console.log('OUTPUT :  Success');
                        component.set("v.allValues", finalmap);
                        component.set("v.deletebtndisable", false);
                        component.set("v.defvalue", 'Select Object');
                        component.set("v.mapingcon", false);
                        component.set("v.mapingcon_edit", false);
                        component.set("v.homecon", false);
                        component.set("v.edit_object_name", "");
                        // component.set("v.num_edit", null);
                        // component.set("v.num_edit", []);
                        var a = component.get("c.fetchObjectField");
                        $A.enqueueAction(a);
                        component.set("v.spinner", false);
                    } else {
                        console.log('OUTPUT : Error');
                        component.find("toastCmp").showToastModel("Data Not Saved Please try again !", "error");
                    }
                });
                $A.enqueueAction(action);
            } else {
                component.find("toastCmp").showToastModel("Fill Blank Mapping Row...", "error");
            }
        } catch (savevalue_error) {
            console.log({ savevalue_error });
        }
    },

    deleteinhelper: function(component, event, helper, objname) { // delete object mapping 

        try {
            var objmappingfield = component.get("v.allValues");
            var objmaptemp = objmappingfield.formName.Object_Mapping__c;
            var objmap = JSON.parse(objmaptemp);
            var formId = component.get("v.FormId");

            var map = new Map();

            for (var key in objmap) {
                if (key != objname) {
                    map[key] = objmap[key];
                }
            }
            var ab = JSON.stringify(map);
            var action = component.get("c.saveList");
            action.setParams({
                'maplist': ab,
                'formid': formId
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    component.find("toastCmp").showToastModel(objname + " delete successfully..", "success");
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                } else {
                    // component.find("toastCmp").showToastModel(objname +" mapping not delete", "error");
                    component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
                }
            });
            $A.enqueueAction(action);
        } catch (deleteinhelper_error) {
            console.log({ deleteinhelper_error });
        }
    },

    toggleinhelper: function(component, event, helper) { // toggle button

        try {
            var formId = component.get("v.FormId");
            var aa = event.getSource().get("v.value");
            var cc = event.getSource().get("v.name");
            var objmappingfield = component.get("v.allValues");
            var objmaptemp = objmappingfield.formName.Object_Mapping__c;
            var objmap = JSON.parse(objmaptemp);
            for (var key in objmap) {
                if (key == cc) {
                    objmap[key].Active = aa;
                }
            }
            var objstrmap = JSON.stringify(objmap);
            component.set("v.allValues.formName.Object_Mapping__c", objstrmap);
            var action = component.get("c.saveList");
            action.setParams({
                'maplist': objstrmap,
                'formid': formId
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    console.log('OUTPUT :active change Success');
                } else {
                    component.find("toastCmp").showToastModel(objname + " mapping not active", "error");
                }
            });
            $A.enqueueAction(action);
        } catch (toggleinhelper_error) {
            console.log(toggleinhelper_error);
        }
    },

    editinhelper: function(component, event, helper) {
        // try {
        var formId = component.get("v.FormId"); // Form Name
        var objname = event.target.name; // Edited Object name
        var remove_obj_map = component.get("v.remove_obj_map"); // removed object name List
        console.log('edit objname', objname);
        component.set("v.edit_object_name", objname);
        var mappingobjectlist = component.get("v.mappingobjectlist");

        // removedobject add in dropdown list
        var allObject = component.get("v.allObject");
        allObject.push(remove_obj_map[objname]);
        component.set("v.allObject", allObject);

        // lookup relationship dropdown field in removed current object name
        var mappingobjectlist = component.get("v.mappingobjectlist");
        var lst = [];
        component.set("v.mappingobjectlist_edit", lst);
        console.log({ mappingobjectlist });
        var temp_mappingobjectlist = [];
        mappingobjectlist.forEach(ele => {
            if (ele.key != objname) {
                temp_mappingobjectlist.push(ele);
            }
        });
        console.log({ temp_mappingobjectlist });
        var mappingobjectlist_edit = component.get("v.mappingobjectlist_edit");
        console.log({ mappingobjectlist_edit });
        try {
            component.set("v.mappingobjectlist_edit", temp_mappingobjectlist);
        } catch (error) {
            console.log(error);
        }

        // default page and value set in base of edited object
        component.set("v.defvalue", objname);
        component.set("v.mapingcon", false);
        component.set("v.disablevalue", false);
        component.set("v.mapingcon_edit", true);
        component.set("v.spinner", true);
        component.set("v.num_edit", []);

        // // lookup relationship dropdown field in removed current object name
        // var mappingobjectlist = component.get("v.mappingobjectlist");
        // var temp_mappingobjectlist = [];
        // mappingobjectlist.forEach(ele => {
        //     if(ele.key != objname){
        //         temp_mappingobjectlist.push(ele);
        //     }
        // });
        // console.log({temp_mappingobjectlist});
        // component.set("v.mappingobjectlist_edit",temp_mappingobjectlist );

        // var allFields = component.get("v.allFields");

        var flv = component.get("v.flv");
        var userobj_edit = objname;
        // call helper to all validation are applied after all updated value is set
        helper.getfieldshelper(component, event, helper, userobj_edit);

        // form id to get this form fied object mapping data
        var action = component.get("c.editform");
        // console.log({ action });
        action.setParams({
            'formId': formId
        });
        action.setCallback(this, function(response) {
            // console.log({ response });
            var state = response.getState();
            console.log(state);
            if (state == "SUCCESS") {
                // multiple object mapping data
                var objmapping_data = response.getReturnValue();
                console.log(JSON.stringify(objmapping_data));
                var objmapping_data_parse = JSON.parse(objmapping_data);
                // object data type map
                var objtypemap = component.get("v.selectmapthree");
                var mapp_req = new Map();
                var mapp_nreq = new Map();
                var mapfor_nreq = new Map();
                var num_edit_map = [];
                var form_option_nreq = [];
                var remove_obj_fld_lst = new Map();
                var selectedFieldsVarlst = [];
                for (var key in objmapping_data_parse) {
                    if (key == objname) {
                        var second_map = JSON.parse(objmapping_data_parse[key].value);
                        // var objfield_selected_fieldlist = component.get("v.objfield_selected_fieldlist");
                        for (var key_2 in second_map) {
                            console.log('key', key_2);

                            var rowIndex = second_map[key_2].rowIndex;
                            var objfieldvalue3 = second_map[key_2].objfieldvalue3;
                            var formfieldvalue = second_map[key_2].formfieldvalue;
                            var str = rowIndex.substr(4, rowIndex.length);

                            remove_obj_fld_lst[objfieldvalue3] = rowIndex;

                            if (str == "req") {
                                var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                                mapp_req[objfieldvalue3] = obj;
                            } else {
                                console.log('objfieldvalue3 =======>>>>', objfieldvalue3);

                                selectedFieldsVarlst.push(objfieldvalue3);
                                obj = { rowIndex, objfieldvalue3, formfieldvalue };
                                mapp_nreq[rowIndex] = objfieldvalue3;
                                mapfor_nreq[rowIndex] = formfieldvalue;
                                num_edit_map.push({ key: rowIndex, value: objfieldvalue3, vf: formfieldvalue, objlist: '' });

                                // form field dropdown value is set to object field datatype
                                if (objtypemap[objfieldvalue3] == 'REFERENCE') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    // if(mappingobjectlist.length != 0){
                                    templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true', selected: 'false' });
                                    templist.push({ key: 'Lookup relationship', value: 'Lookup relationship', selected: 'false' });
                                    // }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'PICKLIST') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' || field_value.Data_Record_Id__c == 'QFFULLNAME') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    // if(mappingobjectlist.length != 0){
                                    templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true', selected: 'false' });
                                    templist.push({ key: 'Lookup relationship', value: 'Lookup relationship', selected: 'false' });
                                    // }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'TEXTAREA') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c != 'QFTIME' || field_value.Data_Record_Id__c != 'QFDATETIME' || field_value.Data_Record_Id__c != 'QFCAPTCHA' || field_value.Data_Record_Id__c != 'QFRECAPTCHA') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    // if(mappingobjectlist.length != 0){
                                    templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true', selected: 'false' });
                                    templist.push({ key: 'Lookup relationship', value: 'Lookup relationship', selected: 'false' });
                                    // }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'EMAIL') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFEMAILID') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Email Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'STRING') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFRECAPTCHA' || field_value.Data_Record_Id__c == 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFSIGNATURE' || field_value.Data_Record_Id__c == 'QFFILEUPLOAD') {} else {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    // if(mappingobjectlist.length != 0){
                                    templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true', selected: 'false' });
                                    templist.push({ key: 'Lookup relationship', value: 'Lookup relationship', selected: 'false' });
                                    // }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'DOUBLE') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFPRICE') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'PHONE') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFPHONE') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Phone Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'URL') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFLINK') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add URL Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'CURRENCY') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFPRICE') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Price Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'INTEGER') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFPHONE' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Number Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'DATE') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFDATE') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Date Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'TIME') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFTIME') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Time Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'DATETIME') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFDATETIME') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Date-Time Field In Form", "error");
                                    }
                                } else if (objtypemap[objfieldvalue3] == 'BOOLEAN') {
                                    var templist = [];
                                    for (var i = 0; i < flv.length; ++i) {
                                        var fieldatt = flv[i];
                                        for (var j = 0; j < fieldatt.length; j++) {
                                            var field_value = fieldatt[j].FieldObj;
                                            if (field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFTERMSOFSERVICE') {
                                                templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c, selected: 'false' });
                                            }
                                        }
                                    }
                                    if (templist.length == 0) {
                                        component.find("toastCmp").showToastModel("Please, First Add Radio Button Or Terms OF Service Field In Form", "error");
                                    }
                                }
                                form_option_nreq.push({ key: rowIndex, value: templist });
                            }
                        }
                    }
                }
                component.set("v.selectedFieldsVar", selectedFieldsVarlst);
                console.log({ form_option_nreq });

                setTimeout(() => {
                    var obj_list_message = component.get("v.obj_list_message");
                    if (templist.length == 0) {
                        var id = 'message' + rowIndex;
                        document.getElementById(id).style.display = "block";
                        obj_list_message.push(rowIndex);
                    }
                    obj_list_message.forEach(element => {
                        var id = 'message' + element;
                        document.getElementById(id).style.display = "block";
                    });
                    component.set("v.obj_list_message", obj_list_message);
                }, 300);

                // console.log({ num_edit_map });
                var allFields = component.get("v.allFields");
                // console.log({ allFields });
                var d = allFields[0].objreqfield;
                console.log({ d });
                var temp_nreq_lookup_index = [];
                var temp_req_lookup_index = [];

                var nreq_lk_value = [];
                var req_lk_value = [];

                for (var i = 0; i < d.length; ++i) {
                    // console.log({ i });
                    console.log('aaa', mapp_req[d[i].apiName].formfieldvalue.substring(0, 2));
                    if (mapp_req[d[i].apiName].formfieldvalue.substring(0, 2) == "LK") {
                        d[i].select_req_value = "Lookup relationship";
                        d[i].LKR = mapp_req[d[i].apiName].formfieldvalue.substring(11, mapp_req[d[i].apiName].formfieldvalue.length);
                        var key = mapp_req[d[i].apiName].rowIndex;
                        var value = mapp_req[d[i].apiName].formfieldvalue.substring(11, mapp_req[d[i].apiName].formfieldvalue.length);
                        req_lk_value.push({ key, value });
                        temp_req_lookup_index.push(mapp_req[d[i].apiName].rowIndex);
                    } else {
                        // Object.assign(d[i], {select_req_value: mapp_req[d[i].apiName].formfieldvalue});
                        d[i].select_req_value = mapp_req[d[i].apiName].formfieldvalue;
                    }
                }
                for (var i = 0; i < num_edit_map.length; ++i) {
                    console.log(num_edit_map[i].vf.substring(0, 2));
                    if (num_edit_map[i].vf.substring(0, 2) == "LK") {
                        temp_nreq_lookup_index.push(num_edit_map[i].key);
                        console.log(num_edit_map[i].key);
                        num_edit_map[i].LKR = num_edit_map[i].vf.substring(15, num_edit_map[i].vf.length);
                        var key = num_edit_map[i].key;
                        var value = num_edit_map[i].vf.substring(15, num_edit_map[i].vf.length);
                        nreq_lk_value.push({ key, value });
                        console.log(num_edit_map[i].vf.substring(15, num_edit_map[i].vf.length));
                        num_edit_map[i].vf = "Lookup relationship";
                    }
                }
                console.log('numm');
                var mapp_nreq_lst = [];

                // map non required field name list
                for (var key in mapp_nreq) {
                    mapp_nreq_lst.push(mapp_nreq[key]);
                }

                var lstfieldname = allFields[0].lstfieldname;
                console.log({ lstfieldname });
                console.log(mapp_nreq_lst);
                // for (var i = 0; i < num_edit_map.length; i++) {
                //     var temp_list = [];
                //     console.log('test list');

                // for(var i=0; i<lstfieldname.length; i++){

                //         console.log('test list 2');
                //         console.log(lstfieldname[i]);
                //         console.log(mapp_nreq_lst.includes(lstfieldname[i].apiName));
                //         console.log(lstfieldname[i].apiName);
                //         console.log(num_edit_map[i].value);
                //         // if(mapp_nreq_lst.includes(lstfieldname[i].apiName) == true && lstfieldname[i].apiName != num_edit_map[i].value){
                //         //     temp_list.push({ apiName: lstfieldname[i].apiName, disabled: true, label:lstfieldname[i].label, selected: false, type:lstfieldname[i].type })
                //         // }
                //         // else{
                //         //     temp_list.push({ apiName: lstfieldname[i].apiName, disabled: false, label: lstfieldname[i].label, selected: false, type:lstfieldname[i].type })
                //         // }
                //     }
                //     console.log(num_edit_map[i].objlist);
                //     num_edit_map[i].objlist = temp_list;
                // }
                var map_nreq_value_list = [];
                for (var key in mapp_nreq) {
                    map_nreq_value_list.push(mapp_nreq[key]);
                }
                var test_lst = lstfieldname;

                console.log(map_nreq_value_list);

                num_edit_map.forEach(element => {
                    console.log({ element });
                    var temp_objlist = [];
                    test_lst.forEach(ele_lst => {
                        console.log({ ele_lst });
                        console.log('test');
                        if (map_nreq_value_list.includes(ele_lst.apiName)) {
                            // console.log(element.value);
                            // console.log(ele_lst.apiName);
                            if (element.value != ele_lst.apiName) {
                                ele_lst.disabled = true;
                            } else {
                                ele_lst.disabled = false;
                            }
                        } else {
                            ele_lst.disabled = false;
                            ele_lst.selected = false;
                        }

                        if (element.value == ele_lst.apiName) {
                            // ele_lst.disabled = false;
                            ele_lst.selected = true;
                        } else {
                            ele_lst.selected = false;
                        }
                        temp_objlist.push(ele_lst);
                    });
                    console.log({ temp_objlist });
                    element.objlist = temp_objlist;
                });

                // lstfieldname.forEach(element => {

                //     num_edit_map.forEach(ele_1 =>{
                //         if(ele_1.value == element.apiName && map_nreq_value_list.includes(element.apiName)){
                //             element.selected = true;
                //         }
                //         else{
                //             element.selected = false;
                //         }

                //         if(map_nreq_value_list.includes(element.apiName) && element.selected == false){
                //             element.disabled = true;
                //         }
                //         else{
                //             element.disabled = false;
                //         }
                //     });
                // });
                // console.log({lstfieldname});

                // num_edit_map.forEach(ele_1 =>{

                // });

                console.log({ num_edit_map });
                // var nsks = component.get("v.num_edit");
                // console.log({ nsks });
                // var nullss = [];
                // component.set("v.num_edit",nullss);
                // var nskaa = component.get("v.num_edit");
                // console.log({ nskaa });

                component.set("v.num_edit", num_edit_map);

                console.log({ form_option_nreq });
                component.set("v.form_option_nreq", form_option_nreq);
                console.log({ form_option_nreq });
                component.set("v.mapDistances", mapp_req);
                component.set("v.mapp", mapp_nreq);
                component.set("v.mapfor", mapfor_nreq);
                console.log({ num_edit_map });
                console.log('end edit');

                console.log('nreq_lk_value>>>>>>', JSON.stringify(nreq_lk_value));
                console.log('req_lk_value>>>>>>', JSON.stringify(req_lk_value));
                component.set("v.nreq_lk_value", nreq_lk_value);
                component.set("v.req_lk_value", req_lk_value);

                setTimeout(() => {
                    var allfields = component.get("v.allFields");
                    var lstfieldname = allfields[0].lstfieldname;
                    var objfield_selected_fieldlist = new Map();
                    console.log({ remove_obj_fld_lst });
                    console.log(lstfieldname.length);
                    console.log({ lstfieldname });
                    var sfv = [];
                    for (var key in remove_obj_fld_lst) {
                        for (var i = 0; i < lstfieldname.length; ++i) {
                            if (key == lstfieldname[i].apiName) {
                                var obb = lstfieldname[i];
                                objfield_selected_fieldlist[remove_obj_fld_lst[key]] = obb;
                                lstfieldname[i].disabled = true;
                                sfv.push(lstfieldname[i].apiName);
                                // lstfieldname.splice(i, 1);
                            }
                        }
                    }

                    // add mapping button disabled and enabled if avilable non required field available
                    console.log('start lst field');
                    for (var i = 0; i < lstfieldname.length; ++i) {
                        console.log(lstfieldname[i].disabled);
                        if (lstfieldname[i].disabled == false) {
                            component.set("v.mappingbtndisable", false);
                            break;
                        } else {
                            // component.set("v.mappingbtndisable", true);
                        }
                    }
                    component.set("v.spinner", false);
                }, 1000);

                // lookup field add and remove in front side
                setTimeout(() => {
                    for (var i = 0; i < temp_nreq_lookup_index.length; ++i) {
                        var auraid = "lookup" + temp_nreq_lookup_index[i];
                        console.log(auraid);
                        var add_style_class = document.getElementById(auraid);
                        $A.util.addClass(add_style_class, 'changeMe');
                    }
                    for (var i = 0; i < temp_req_lookup_index.length; ++i) {
                        var auraid = temp_req_lookup_index[i];
                        console.log(auraid);
                        var add_style_class = document.getElementById(auraid);
                        $A.util.addClass(add_style_class, 'changeMe');
                    }
                    component.set("v.spinner", false);
                }, 1000);
                // component.set("v.spinner", false);
            } else {
                component.find("toastCmp").showToastModel(objname + " mapping not Edited", "error");
                component.set("v.spinner", false);
                // component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
            }
        });
        console.log('end edit');
        $A.enqueueAction(action);
        // } catch (editinhelper_error) {
        //     console.log({editinhelper_error});
        //     console.log('editinhelper error', editinhelper_error.message);
        //     console.log('editinhelper error name', editinhelper_error.name);
        //     console.log('line number',editinhelper_error.stack );
        //     component.set("v.spinner", false);
        //     component.find("exceptionCmp").RunException("Something Went Wrong, Please Reload Page");
        // }
    },
})