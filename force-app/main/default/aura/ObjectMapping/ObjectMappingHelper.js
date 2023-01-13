({
    getfieldshelper: function(component, event, helper) { // select object to get all field  init method

        ;

        var userObj = component.find("SobjectList").get("v.value");
        component.set("v.spinner", true);

        var mapp = new Map(); // map collection in null set
        mapp.set();
        component.set("v.mapDistances", mapp); // non required field list null 
        var numlist = component.get("v.num"); // component.set("v.num" , numlist);
        numlist.splice(0, numlist.length);

        var mappp = new Map();
        mappp.set();
        component.set("v.mapp", mappp); // mapp collection is null set

        var mapfor = new Map();
        mapfor.set();
        component.set("v.mapfor", mapfor); // mapfor collecton is null set
        component.set("v.teso", []);
        component.set("v.teso_req", []);

        if (userObj == 'Select Object' || userObj == '') {
            component.set("v.mappingbtndisable", true);
            component.set("v.allFields", '');
            component.set("v.allReqFields", '');
            component.set("v.tablevalue", false);
            component.set("v.spinner", false);
        } else {
            component.set("v.mappingbtndisable", false);
            component.set("v.tablevalue", true);
            var action = component.get("c.getAllFields");
            action.setParams({
                "fld": userObj
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    component.set("v.allFields", response.getReturnValue());
                    var allfld = response.getReturnValue();
                    var allreqfld = allfld[0].objreqfield;
                    var allnonreqfld = allfld[0].lstfieldname;
                    var mapone = new Map();
                    for (var i = 0; i < allreqfld.length; i++) {
                        mapone[allreqfld[i].apiName] = allreqfld[i].type;
                    }
                    component.set("v.selectmapone", mapone);
                    var maptwo = new Map();
                    for (var i = 0; i < allnonreqfld.length; i++) {
                        maptwo[allnonreqfld[i].apiName] = allnonreqfld[i].type;
                    }
                    component.set("v.selectmapthree", maptwo);
                    component.set("v.spinner", false);
                } else {
                    component.set("v.spinner", false);
                }

                // required object field to set form field

                var allfields = component.get("v.allFields");
                var teso_req = component.get("v.teso_req");
                var flv = component.get("v.flv");
                var objtypemap = component.get("v.selectmapone");
                for (var k = 0; k < allfields[0].objreqfield.length; k++) {
                    var rowIndex = k;
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
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
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
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
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
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'EMAIL') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFEMAILID') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'STRING') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFRECAPTCHA' || field_value.Data_Record_Id__c == 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFSIGNATURE' || field_value.Data_Record_Id__c == 'QFFILEUPLOAD') {} else {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
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
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'PHONE') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFPHONE') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'URL') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFLINK') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'CURRENCY') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFPRICE') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'INTEGER') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFPHONE' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'DATE') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFDATE') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'TIME') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFTIME') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'DATETIME') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFDATETIME') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    } else if (objtypemap[objfieldvalue3] == 'BOOLEAN') {
                        var templist = [];
                        for (var i = 0; i < flv.length; i++) {
                            var fieldatt = flv[i];
                            for (var j = 0; j < fieldatt.length; j++) {
                                var field_value = fieldatt[j].FieldObj;
                                if (field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFTERMSOFSERVICE') {
                                    templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                                }
                            }
                        }
                        templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
                        templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
                    }
                    teso_req.push({ key: rowIndex, value: templist });
                }
                component.set("v.teso_req", teso_req);
            });
        }
        $A.enqueueAction(action);
    },

    selectedfieldmap: function(component, event, helper) { // select required form field
        var objfieldvalue3 = event.target.id;
        var formfieldvalue = event.getSource().get("v.value");
        var rowIndex = event.target.getAttribute("data-row-index");

        // object required fields to create map

        var maplst = component.get("v.mapDistances");
        var obj = { rowIndex, objfieldvalue3, formfieldvalue };
        maplst[objfieldvalue3] = obj;
    },

    selectedsalfieldfor: function(component, event, helper) { //select non-required form field
        var mapfor = component.get("v.mapfor");
        var mapp = component.get("v.mapp");
        var rowIndex = event.target.getAttribute("data-row-index");
        var formfieldvalue = event.getSource().get("v.value");

        // lookup field option select 

        var auraid = "lookselect1" + rowIndex;
        var add_style_class = document.getElementById(auraid);
        $A.util.addClass(add_style_class, 'changeMe_lookselect1');
        if (formfieldvalue == 'Lookup relationship') {
            var auraid = "lookup" + rowIndex;
            console.log(auraid);
            var add_style_class = document.getElementById(auraid);
            console.log(add_style_class);
            $A.util.addClass(add_style_class, 'changeMe');
            var lookupvalue = "LK_" + rowIndex;
            var obj = lookupvalue;
            mapfor[rowIndex] = obj;
        } else {
            var auraid = "lookup" + rowIndex;
            var add_style_class = document.getElementById(auraid);
            $A.util.removeClass(add_style_class, 'changeMe');
            var obj = formfieldvalue;
            mapfor[rowIndex] = obj;
            var tar = component.find(rowIndex);
            tar.style.display = 'none';
        }
        component.set("v.mapfor", mapfor);

        // form field value enter in map

        var maplst = component.get("v.mapDistances");
        var mapp = component.get("v.mapp");
        for (var key in mapp) {
            if (key == rowIndex) {
                var rowIndex = key;
                var objfieldvalue3 = mapp[key];
                var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                maplst[objfieldvalue3] = obj;
                component.set("mapDistances", maplst);
            }
        }
    },

    lookupfieldhelper: function(component, event, helper) { // lookup field mapping
        var rowIndex = event.target.getAttribute("data-row-index");
        var lkvalue = event.getSource().get("v.value");
        var mapfor = component.get("v.mapfor");
        for (var key in mapfor) {
            if (key == rowIndex) {
                var lkv = mapfor[key];
                var obj = lkv + "_" + lkvalue;
                mapfor[rowIndex] = obj;
                component.set("v.mapfor", mapfor);
            }
        }
        var mapfor = component.get("v.mapfor");
    },

    fetchObjectField: function(component, event, helper) { // object select to fetch all object field
        var cmpTarget = component.find('divId');
        $A.util.addClass(cmpTarget, 'divShow');
        component.set("v.spinner", true);
        var formId = component.get("v.FormId");
        var action = component.get("c.fetchQuickFormField");
        action.setParams({
            'formId': formId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                component.set("v.spinner", false);
                var allvalue = response.getReturnValue();
                var x = response.getReturnValue().SObjectList;
                var opts = [];
                for (var i = 0; i < x.length; i++) {
                    opts.push({
                        value: x[i].split(',')[0],
                        label: x[i].split(',')[1]
                    });
                    component.set("v.allObject", opts);
                }
                var recordidmap = new Map();
                var pgwr = allvalue.PageWrapperList;
                var reqfield = [];
                for (var i = 0; i < pgwr.length; i++) {
                    var fwl = pgwr[i].FieldWrapperList;
                    reqfield.push(fwl);
                    for (let i = 0; i < fwl.length; i++) {
                        var fobj = fwl[i].FieldObj;
                        var faobj = fwl[i].FieldAttObj;
                        recordidmap[faobj.Form_Field__c] = fobj.Data_Record_Id__c;
                    }
                }
                component.set("v.recordidmap", recordidmap);
                component.set("v.allValues", response.getReturnValue());
                component.set("v.flv", reqfield);
                var res = response.getReturnValue().formName.Object_Mapping__c;
                if (res != undefined) {
                    var objectmap = JSON.parse(res);
                    var objlist = [];
                    for (var keyy in objectmap) {
                        objlist.push({ key: keyy, value: objectmap[keyy].Active });
                    }
                    component.set("v.mappingobjectlist", objlist);
                    if (objlist.length == 0) {
                        component.set("v.homecon", true);
                        component.set("v.disablevalue", false);
                    } else {
                        component.set("v.homecon", false);
                        component.set("v.disablevalue", true);
                    }
                } else {
                    component.set("v.homecon", true);
                    component.set("v.disablevalue", false);
                }
            } else {
                component.set("v.spinner", true);
                helper.showToast("Error", "Error", "5000", "Error");
            }
        });
        $A.enqueueAction(action);
    },

    savevalue: function(component, event, helper) { // save button click 
        var maplist = component.get("v.mapDistances");
        var mapp = component.get("v.mapp");
        var mapfor = component.get("v.mapfor");
        var str = 'Select Value';
        var templist = [];
        console.log('maplist : ', JSON.stringify(maplist));
        console.log('maplist : ', maplist.size);
        for (var key in maplist) {
            var mapvalue = maplist[key];
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
            for (var i = 0; i < objreqfield.length; i++) {
                var testreq = templist.includes(objreqfield[i].apiName);
                if (testreq == false) {
                    var testreq = templist.includes(objreqfield[i].apiName);
                    helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                    break;
                } else {
                    var mapforvalue = templist.includes(str);
                    if (mapforvalue == true) {
                        testreq = false;
                        helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                        break;
                    } else {
                        testreq = true;
                    }
                }
            }
        }

        var testnon = true;
        for (var key in mapp) {
            if (mapp[key] === str) {
                var testnon = false;
                helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                break;
            } else {
                var mapforvalue = mapfor[key];
                if (mapforvalue == undefined) {
                    var testnon = false;
                    helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                    break;
                } else {
                    var rowIndex = key;
                    var objfieldvalue3 = mapp[key];
                    var formfieldvalue = mapfor[key];
                    var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                    maplist[objfieldvalue3] = obj;
                    component.set("v.mapDistances", maplist);
                }
            }
        }
        if (testreq == true && testnon == true) {
            var allvalue = component.get("v.allValues");
            var finalstring = allvalue.formName.Object_Mapping__c;

            var finallist = [];
            for (var key in mapp) {
                finallist.push(mapp[key]);
            }
            for (var i = 0; i < objreqfield.length; i++) {
                finallist.push(objreqfield[i].apiName);
            }
            var tempmap = new Map();
            for (var key in maplist) {
                var chkkey = finallist.includes(key);
                if (chkkey == true) {
                    tempmap[key] = maplist[key];
                }
            }
            component.set("v.mapDistances", tempmap);


            if (finalstring != undefined) {
                var finalmap = JSON.parse(finalstring);
                var maplist = component.get("v.mapDistances");
                var value = JSON.stringify(maplist);
                var objname = String(component.find("SobjectList").get("v.value"));
                var Active = String(component.get("v.togglesecondary"));
                var obj = { Active, objname, value };
                finalmap[objname] = obj;
                var ab = JSON.stringify(finalmap);
            } else {
                var tmap = new Map();
                var value = JSON.stringify(maplist);
                var objname = String(component.find("SobjectList").get("v.value"));
                var Active = String(component.get("v.togglesecondary"));
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
                    helper.showToast("Success", "Success", "5000", "Save successfully..!");
                    console.log('OUTPUT :  Success');
                    component.set("v.allValues", finalmap);
                    component.set("v.deletebtndisable", false);
                    component.set("v.defvalue", 'Select Object');
                    component.set("v.mapingcon", false);
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                } else {
                    console.log('OUTPUT : Error');
                    helper.showToast("Error", "Error", "5000", "Error");
                }
            });
            $A.enqueueAction(action);
        } else {
            helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
        }
    },

    showToast: function(type, title, time, message) { // show notification message 
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "type": type,
            "Duration": time,
            "message": message
        });
        toastEvent.fire();
    },

    remove: function(component, event, helper) { // object mapping table field remove
        var index = event.target.getAttribute("data-row-index");
        // console.log('OUTPUT index: ',index);
        var allfields = component.get("v.allFields");
        var lstfieldname = allfields[0].lstfieldname;
        console.log('dsfgds1');
        var objfield_selected_fieldlist = component.get("v.objfield_selected_fieldlist");
        lstfieldname.push(objfield_selected_fieldlist[index]);
        console.log('grgrs2');
        component.set("v.allfields", lstfieldname);
        var lstlist = component.get("v.num");
        var tmp = lstlist.indexOf(index);
        lstlist.splice(tmp, 1);
        var map = component.get("v.mapp");
        var mapfor = component.get("v.mapfor");

        var temp = new Map();
        var tempp = new Map();

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
        console.log(mapp.size);
        if (mapp.size == 0) {
            component.set("v.mappingbtndisable", false);
            console.log(component.get("v.mappingbtndisable"));
            console.log('dhebjve19');
        }
        for (var key in mapp) {
            if (mapp[key] == 'Select Value') {
                console.log('1.');
                component.set("v.mappingbtndisable", true);
                console.log(component.get("v.mappingbtndisable"));
                break;
            } else {
                console.log('2.');
                component.set("v.mappingbtndisable", false);
                console.log(component.get("v.mappingbtndisable"));
            }
        }
        console.log(component.get("v.mappingbtndisable"));
        console.log('hjfvbghj20');
        component.set("v.num", lstlist);
        console.log('hello');
    },

    selectObjFieldhelper: function(component, event, helper) { // select object none required field

        var rowIndex = event.target.getAttribute("data-row-index");
        var objfieldvalue3 = event.getSource().get("v.value");
        var objtypemap = component.get("v.selectmapthree");
        var num = component.get("v.num");
        var allfields = component.get("v.allFields");
        var lstfieldname = allfields[0].lstfieldname;
        var mapp = component.get("v.mapp");
        var teso = component.get("v.teso");

        component.set("v.nonreq_select_option", null);
        // non-required object field in create map

        var obj = objfieldvalue3;
        mapp[rowIndex] = obj;
        component.set("v.mapp", mapp);

        // mapping button Disable/Enable

        var mapp = component.get("v.mapp");
        var i = 0;
        if (objfieldvalue3 == 'Select Value') {
            component.set("v.mappingbtndisable", true);
        } else {
            for (var key in mapp) {
                i = i + 1;
                if (mapp[key] != 'Select Value' && i == num.length && lstfieldname.length != 1) {
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

        for (var k = 0; k < teso.length; k++) {
            if (teso[k].key == rowIndex) {
                teso[k].value = [];
            }
        }

        var flv = component.get("v.flv");
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
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'PICKLIST') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' || field_value.Data_Record_Id__c == 'QFFULLNAME') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'TEXTAREA') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c != 'QFTIME' || field_value.Data_Record_Id__c != 'QFDATETIME' || field_value.Data_Record_Id__c != 'QFCAPTCHA' || field_value.Data_Record_Id__c != 'QFRECAPTCHA') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'EMAIL') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFEMAILID') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'STRING') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFRECAPTCHA' || field_value.Data_Record_Id__c == 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFSIGNATURE' || field_value.Data_Record_Id__c == 'QFFILEUPLOAD') {} else {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
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
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'PHONE') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFPHONE') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'URL') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFLINK') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'CURRENCY') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFPRICE') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'INTEGER') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFPHONE' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'DATE') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFDATE') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'TIME') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFTIME') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'DATETIME') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFDATETIME') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        } else if (objtypemap[objfieldvalue3] == 'BOOLEAN') {
            var templist = [];
            for (var i = 0; i < flv.length; i++) {
                var fieldatt = flv[i];
                for (var j = 0; j < fieldatt.length; j++) {
                    var field_value = fieldatt[j].FieldObj;
                    if (field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFTERMSOFSERVICE') {
                        templist.push({ key: fieldatt[j].FieldAttObj.Label__c, value: fieldatt[j].FieldAttObj.Form_Field__c });
                    }
                }
            }
            templist.push({ key: '--------------------------------------------------------------------------------------------', value: 'true' });
            templist.push({ key: 'Lookup relationship', value: 'Lookup relationship' });
        }
        teso.push({ key: rowIndex, value: templist });
        component.set("v.teso", teso);

        // selected object remove list 
        console.log(lstfieldname.length);
        for (var i = 0; i < lstfieldname.length; i++) {
            if (lstfieldname[i].apiName == objfieldvalue3) {
                var objfield_selected_fieldlist = component.get("v.objfield_selected_fieldlist");
                var obb = lstfieldname[i];
                objfield_selected_fieldlist[rowIndex] = obb;
                component.set("v.objfield_selected_fieldlist", objfield_selected_fieldlist);
                lstfieldname.splice(i, 1);
                component.set("allFields", allfields);
            }
        }
    },

    deleteinhelper: function(component, event, helper) { // delete object mapping 
        var mapingcon = component.get("v.mapingcon");
        if (mapingcon == true) {
            var objname = component.find("SobjectList").get("v.value");
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
                    helper.showToast("Success", "Success", "5000 ", objname + " delete successfully..!");
                    // console.log('OUTPUT :delete Success');
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                } else {
                    helper.showToast("Error", "Error", "5000 ", objname + " mapping not delete");
                }
            });
            $A.enqueueAction(action);
        } else {
            var objname = event.getSource().get("v.value");
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
                    helper.showToast("Success", "Success", "5000 ", objname + " delete successfully..!");
                    console.log('OUTPUT :delete Success');
                    component.set("v.mapingcon", false);
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                } else {
                    helper.showToast("Error", "Error", "5000 ", objname + " mapping not delete");
                }
            });
            $A.enqueueAction(action);
        }
    },

    toggleinhelper: function(component, event, helper) { // toggle button
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
                helper.showToast("Error", "Error", "5000", objname + " mapping not active");
            }
        });
        $A.enqueueAction(action);
    }
})