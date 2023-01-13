({
    getfieldshelper: function(component, event, helper) {
        var userObj = component.find("SobjectList").get("v.value");
        component.set("v.spinner", true);

        var mapp = new Map(); // map collection in null set
        mapp.set();
        component.set("v.mapDistances", mapp);

        var numlist = []; // non required field list null 
        component.set("v.num", numlist);

        var mappp = new Map();
        mappp.set();
        component.set("v.mapp", mappp); // mapp collection is null set

        var mapfor = new Map();
        mapfor.set();
        component.set("v.mapfor", mapfor); // mapfor collecton is null set

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
                    // console.log('OUTPUT : ',JSON.stringify(response.getReturnValue()));
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
                    console.log('OUTPUT : 3121', allnonreqfld);
                    component.set("v.spinner", false);
                } else {
                    // console.log("Failed with state: " + state);
                    component.set("v.spinner", false);
                }
            });
        }
        $A.enqueueAction(action);
    },

    selectedfieldmap: function(component, event, helper) { // select 1
        var objfieldvalue3 = event.target.id;
        var formfieldvalue = event.getSource().get("v.value");
        var target = event.target;
        var rowIndex = target.getAttribute("data-row-index");
        var objtype = event.getSource().get("v.name");
        var formfieldtype = component.get("v.recordidmap");
        var maplst = component.get("v.mapDistances");
        var obj = { rowIndex, objfieldvalue3, formfieldvalue };
        maplst[objfieldvalue3] = obj;
        var aa = ["PICKLIST", "DOUBLE", "TIME", "DATETIME", "EMAIL", "CURRENCY", "PHONE", "DATE", "BOOLEAN", "URL"];
        var bb = { "QFEMAILID": "EMAIL", "QFDATE": "DATE", "QFRADIOBUTTON": "", "QFTIME": "TIME", "QFDATETIME": "DATETIME", "QFPHONE": "PHONE", "QFDROPDOWN": "PICKLIST", "QFPRICE": "CURRENCY", "QFLINK": "URL", "QFTERMSOFSERVICE": "BOOLEAN" }
        var aatype = aa.includes(objtype);
        target.style.border = ' 0px';
        if (aatype == true) {
            if (objtype == bb[formfieldtype[formfieldvalue]]) {
                var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                maplst[objfieldvalue3] = obj;
                target.style.border = ' 0px ';
            } else {
                target.style.borderRadius = ' 5px';
                target.style.border = ' 2px solid red';
                helper.showToast("Error", "Error", "5000", "Data type not match");
            }
        } else {
            console.log('OUTPUT 3115: else 1');
            target.style.border = ' 0px';
            var obj = { rowIndex, objfieldvalue3, formfieldvalue };
            maplst[objfieldvalue3] = obj;
        }
    },

    selectedsalfieldfor: function(component, event, helper) { //select 3
        var mapfor = component.get("v.mapfor");
        var mapp = component.get("v.mapp");
        var target = event.target;
        // var sd = target.style.border = ' 2px solid red';
        // var sd = target.style.borderRadius = ' 5px';
        // console.log('OUTPUT target: ', target.nextElementSibling.style.border = ' 1px solid red');
        var rowIndex = target.getAttribute("data-row-index");
        // console.log('OUTPUT rowindex: ', rowIndex);
        var formfieldvalue = event.getSource().get("v.value");
        // console.log('OUTPUT formfieldvalue: ', formfieldvalue);
        var objtypemap = component.get("v.selectmapthree");
        // console.log('OUTPUT objtypmap: ', JSON.stringify(objtypemap));
        var formfieldtype = component.get("v.recordidmap");
        // console.log('OUTPUT formfieldtype: ',JSON.stringify(formfieldtype));
        for (var key in objtypemap) {
            if (mapp[rowIndex] == key) {
                var keyvalue = key;
            }
        }
        console.log('keyvalue', keyvalue);
        // var obj =  formfieldvalue;
        // mapfor[rowIndex]  = obj;
        // component.set("v.mapfor" , mapfor);
        var maplst = component.get("v.mapDistances");
        var mapp = component.get("v.mapp");
        var aa = ["PICKLIST", "DOUBLE", "TIME", "DATETIME", "EMAIL", "CURRENCY", "PHONE", "DATE", "BOOLEAN", "URL"];
        var bb = { "QFEMAILID": "EMAIL", "QFDATE": "DATE", "QFTIME": "TIME", "QFDATETIME": "DATETIME", "QFPHONE": "PHONE", "QFDROPDOWN": "PICKLIST", "QFPRICE": "CURRENCY", "QFLINK": "URL", "QFTERMSOFSERVICE": "BOOLEAN" }
        var aatype = aa.includes(objtypemap[mapp[rowIndex]]);
        // var bbtype = bb.includes(formfieldtype[formfieldvalue]);
        // console.log('OUTPUT objtypemap[mapp[rowIndex]]: ',objtypemap[mapp[rowIndex]]);
        // console.log('OUTPUT formfieldvalue: ',formfieldvalue);
        // console.log('OUTPUT formfieldtype[formfieldvalue]: ', formfieldtype[formfieldvalue]);
        // console.log('OUTPUT bb[formfieldtype[formfieldvalue]]: ', bb[formfieldtype[formfieldvalue]]);
        // console.log('OUTPUT aatype: ',aatype);
        // if(aatype == true && bb.has(formfieldtype[formfieldvalue]) == true){
        //     if(objtypemap[objtypemap[mapp[rowIndex]]] == bb[formfieldtype[formfieldvalue]]){
        //         for(var key in mapp){
        //             if(key == rowIndex){
        //                 var rowIndex = key;
        //                 var objfieldvalue3 = mapp[key];
        //                 var obj = {rowIndex , objfieldvalue3 , formfieldvalue};
        //                 maplst[objfieldvalue3] = obj;
        //                 component.set("mapDistances" , maplst);
        //                 target.style.borderRadius = ' 5px';
        //                 target.style.border = ' 0px solid red';
        //             }
        //         } 
        //     }
        //     else{
        //         target.style.borderRadius = ' 5px';
        //         target.style.border = ' 2px solid red';
        //         helper.showToast("Error", "Error", "5000", "Data type not match");
        //     }
        // }
        // else{
        //     console.log('hello you are not selected');
        //     for(var key in mapp){
        //         if(key == rowIndex){
        //             var rowIndex = key;
        //             var objfieldvalue3 = mapp[key];
        //             var obj = {rowIndex , objfieldvalue3 , formfieldvalue};
        //             maplst[objfieldvalue3] = obj;
        //             component.set("mapDistances" , maplst);
        //             target.style.borderRadius = ' 5px';
        //             target.style.border = ' 0px solid red';
        //         }
        //     } 
        // }
        // console.log(rowIndex);
        var abc = false;
        for (var key in mapp) {
            console.log(key);
            if (key == rowIndex) {
                var abc = true;
            }
        }
        var aabc = false;
        for (var key in bb) {
            if (key == formfieldtype[formfieldvalue]) {
                var aabc = true;
            }
        }
        // console.log('abc',abc);
        // console.log('mapp[rowIndex]', mapp[rowIndex]);
        if (abc == true && mapp[rowIndex] != "Select Value") {
            // console.log('aatype',aatype);
            // console.log('aabc', aabc);
            if (aatype == true && aabc == true) {
                // console.log('bb[formfieldtype[formfieldvalue]]',bb[formfieldtype[formfieldvalue]]);
                // console.log('objtypemap[mapp[rowIndex]]', objtypemap[mapp[rowIndex]]);
                if (bb[formfieldtype[formfieldvalue]] == objtypemap[mapp[rowIndex]]) {
                    for (var key in mapp) {
                        if (key == rowIndex) {
                            var rowIndex = key;
                            var objfieldvalue3 = mapp[key];
                            var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                            maplst[objfieldvalue3] = obj;
                            component.set("mapDistances", maplst);
                            target.style.borderRadius = ' 5px';
                            target.style.border = '0px';
                        }
                    }
                } else {
                    target.style.borderRadius = ' 5px';
                    target.style.border = ' 2px solid red';
                    helper.showToast("Error", "Error", "5000", "Data type not match");
                }
            } else {
                // console.log('22');
                for (var key in mapp) {
                    if (key == rowIndex) {
                        var rowIndex = key;
                        var objfieldvalue3 = mapp[key];
                        var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                        maplst[objfieldvalue3] = obj;
                        component.set("mapDistances", maplst);
                        target.style.borderRadius = ' 5px';
                        target.style.border = '0px';
                    }
                }
            }
        } else {
            // console.log('11');
            for (var key in mapp) {
                if (key == rowIndex) {
                    var rowIndex = key;
                    var objfieldvalue3 = mapp[key];
                    var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                    maplst[objfieldvalue3] = obj;
                    component.set("mapDistances", maplst);
                    target.style.borderRadius = ' 5px';
                    target.style.border = '0px';
                }
            }
        }
    },

    fetchObjectField: function(component, event, helper) {
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
                // console.log('OUTPUT 5012: ', {x});
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
                        // console.log('OUTPUT 3132: ', fwl[i].FieldObj);
                        var fobj = fwl[i].FieldObj;
                        var faobj = fwl[i].FieldAttObj;
                        recordidmap[faobj.Id] = fobj.Data_Record_Id__c;
                    }
                }
                component.set("v.recordidmap", recordidmap);
                // console.log('OUTPUT 3133: ', JSON.stringify(recordidmap));
                component.set("v.allValues", response.getReturnValue());
                component.set("v.flv", reqfield);
                var res = response.getReturnValue().formName.Object_Mapping__c;
                console.log('OUTPUT objectmap: ', res);
                if (res != undefined) {
                    var objectmap = JSON.parse(res);
                    var objlist = [];
                    for (var keyy in objectmap) {
                        objlist.push({ key: keyy, value: objectmap[keyy].Active });
                    }
                    console.log('OUTPUT : ', objlist);
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
                // var  = new Map();objmap
                // objmap[key] = objectmap[key].Active;

                // component.set("v.mapingcon" , true);
            } else {
                component.set("v.spinner", true);
                helper.showToast("Error", "Error", "5000", "Error");
            }
        });
        $A.enqueueAction(action);
    },

    savevalue: function(component, event, helper) {
        var maplist = component.get("v.mapDistances");
        var mapp = component.get("v.mapp");
        var mapfor = component.get("v.mapfor");
        var templist = [];
        var str = 'Select Value';

        // var allValid = cmp.find('divId').reduce(function (validSoFar, inputCmp) { //inputCmpinputCmp.reportValidity(); 
        //     inputCmp.focus();
        //     return validSoFar && inputCmp.checkValidity(); 
        //     }, true);
        // console.log('OUTPUT allvalid: ',allValid);

        // console.log('OUTPUT : ',JSON.stringify(maplist));

        for (var key in maplist) {
            var mapvalue = maplist[key];
            for (var key2 in mapvalue) {
                templist.push(mapvalue[key2]);
            }
        }
        var allfields = component.get("v.allFields");
        var objreqfield = allfields[0].objreqfield;

        for (var i = 0; i < objreqfield.length; i++) {
            var testreq = templist.includes(objreqfield[i].apiName);
            if (testreq == false) {
                var testreq = templist.includes(objreqfield[i].apiName);
                break;
            } else {
                var mapforvalue = templist.includes(str);
                // var mapforvalue = 'efef';
                console.log('OUTPUT 45: ', mapforvalue);
                if (mapforvalue == true) {
                    testreq = false;
                    break;
                } else {
                    testreq = true;
                }
            }
        }

        var testnon = true;
        for (var key in mapp) {
            console.log('OUTPUT mapp value: ', mapp[key]);
            if (mapp[key] === str) {
                console.log('OUTPUT 11: ', mapp[key]);
                var testnon = false;
                break;
            } else {
                var mapforvalue = mapfor[key];
                console.log('OUTPUT 22: ', mapforvalue);
                if (mapforvalue == undefined) {
                    console.log('OUTPUT 333: ');
                    var testnon = false;
                    break;
                } else {
                    console.log('OUTPUT mapforvalue: ', mapforvalue);
                    var rowIndex = key;
                    var objfieldvalue3 = mapp[key];
                    var formfieldvalue = mapfor[key];
                    var obj = { rowIndex, objfieldvalue3, formfieldvalue };
                    maplist[objfieldvalue3] = obj;
                    component.set("v.mapDistances", maplist);
                }
            }
        }

        console.log('OUTPUT testreq: ', testreq);
        console.log('OUTPUT testnon: ', testnon);
        if (testreq == true && testnon == true) {
            var allvalue = component.get("v.allValues");
            var finalstring = allvalue.formName.Object_Mapping__c;
            console.log('OUTPUT finalstring: ', finalstring);

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
                // var value = JSON.stringify(maplist);
                var value = maplist;
                var objname = String(component.find("SobjectList").get("v.value"));
                var Active = String(component.get("v.togglesecondary"));
                var obj = { Active, objname, value };
                finalmap[objname] = obj;
                var ab = JSON.stringify(finalmap);
            } else {
                var tmap = new Map();
                // var value = JSON.stringify(maplist);
                var value = maplist;
                var objname = String(component.find("SobjectList").get("v.value"));
                var Active = String(component.get("v.togglesecondary"));
                var obj = { Active, objname, value };
                tmap[objname] = obj;
                var ab = JSON.stringify(tmap);

            }
            var formId = component.get("v.FormId");
            var action = component.get("c.saveList");
            action.setParams({
                'maplist': ab,
                'formid': formId
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state == "SUCCESS") {
                    console.log('OUTPUT :  Success');
                    component.set("v.allValues", finalmap);
                    component.set("v.deletebtndisable", false);
                    component.set("v.defvalue", 'Select Object');

                    // component.set("v.togglebtndisable" , false);
                    component.set("v.mapingcon", false);
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                } else {
                    console.log('OUTPUT : Error');
                }
            });
            $A.enqueueAction(action);
        } else {}
    },

    showToast: function(type, title, time, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "type": type,
            "Duration": time,
            "message": message
        });
        toastEvent.fire();
    },

    remove: function(component, event, helper) {
        var index = event.target.getAttribute("data-row-index");
        var lstlist = component.get("v.num");
        lstlist.splice(index, 1); // 2nd parameter means remove one item only
        component.set("v.num", lstlist);
        component.set("v.refreshSection", true);

    },

    selectObjFieldhelper: function(component, event, helper) {
        var rowIndex = event.target.getAttribute("data-row-index");
        var objfieldvalue3 = event.getSource().get("v.value");
        var mapp = component.get("v.mapp");
        var mapfor = component.get("v.mapfor");
        var num = component.get("v.num");
        var objtypemap = component.get("v.selectmapthree");
        var formfieldtype = component.get("v.recordidmap");

        var allfields = component.get("v.allFields");
        var lstfieldname = allfields[0].lstfieldname;
        var mapp = component.get("v.mapp");

        var aa = ["PICKLIST", "DOUBLE", "TIME", "DATETIME", "EMAIL", "CURRENCY", "PHONE", "DATE", "BOOLEAN", "URL"];
        var bb = { "QFEMAILID": "EMAIL", "QFDATE": "DATE", "QFTIME": "TIME", "QFDATETIME": "DATETIME", "QFPHONE": "PHONE", "QFDROPDOWN": "PICKLIST", "QFPRICE": "CURRENCY", "QFLINK": "URL", "QFTERMSOFSERVICE": "BOOLEAN" }
        var aatype = aa.includes(objtypemap[objfieldvalue3]);
        // if(aatype == true && bb.has(formfieldtype[mapfor[rowIndex]]) == true){
        //             if(objtypemap[objfieldvalue3] == bb[formfieldtype[mapfor[rowIndex]]]){
        //                 var obj = objfieldvalue3 ;
        //                 mapp[rowIndex] = obj;
        //                 component.set("v.mapp" , mapp); 
        //             }
        //             else{
        //                 var obj = objfieldvalue3 ;
        //                 mapp[rowIndex] = obj;
        //                 component.set("v.mapp" , mapp); 
        //                 helper.showToast("Error", "Error", "5000", "Data type not match");
        //             }
        // }
        // else{
        //     var obj = objfieldvalue3 ;
        //     mapp[rowIndex] = obj;
        //     component.set("v.mapp" , mapp); 
        // }
        var abc = false;
        for (var key in mapfor) {
            if (key == rowIndex) {
                var abc = true;
            }
        }
        var aabc = false;
        for (var key in bb) {
            if (key == formfieldtype[mapfor[rowIndex]]) {
                var aabc = true;
            }
        }
        if (abc == true && mapfor[rowIndex] != 'Select Value') {
            if (aatype == true && aabc == true) {
                if (objtypemap[objfieldvalue3] == bb[formfieldtype[mapfor[rowIndex]]]) {
                    var obj = objfieldvalue3;
                    mapp[rowIndex] = obj;
                    component.set("v.mapp", mapp);
                } else {
                    helper.showToast("Error", "Error", "5000", "Data type not match");
                }
            } else {
                var obj = objfieldvalue3;
                mapp[rowIndex] = obj;
                component.set("v.mapp", mapp);
            }
        } else {
            var obj = objfieldvalue3;
            mapp[rowIndex] = obj;
            component.set("v.mapp", mapp);
        }

        var i = 0;
        for (var key in mapp) {
            i = i + 1;
            console.log('a1::' + i + 'a2::' + mapp[key]);
            if (mapp[key] != 'Select Value' && i == num.length) {
                component.set("v.mappingbtndisable", false);
            } else {
                component.set("v.mappingbtndisable", true);
            }
        }
        for (var i = 0; i < lstfieldname.length; i++) {
            if (lstfieldname[i].apiName == objfieldvalue3) {
                lstfieldname.splice(i, 1);
                component.set("allFields", allfields);
            }
        }
        // component.set("v.selectobjmap" , xa);
    },

    deleteinhelper: function(component, event, helper) {
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
                    helper.showToast("Success", "Success", "5000", objname + "delete successfully..!");
                    console.log('OUTPUT :delete Success');
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                } else {
                    helper.showToast("Error", "Error", "5000", objname + "mapping not delete");
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
                    helper.showToast("Success", "Success", "5000", objname + "delete successfully..!");
                    console.log('OUTPUT :delete Success');
                    component.set("v.mapingcon", false);
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                } else {
                    helper.showToast("Error", "Error", "5000", objname + "mapping not delete");
                }
            });
            $A.enqueueAction(action);
        }
    },

    toggleinhelper: function(component, event, helper) {
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
                helper.showToast("Error", "Error", "5000", objname + "mapping not active");
            }
        });
        $A.enqueueAction(action);
    }
})