({
    fetchObjectField: function(component, event, helper) {          // <<init>> - object select to fetch all object field
        // var cmpTarget = component.find('divId');
        // $A.util.addClass(cmpTarget, 'divShow');
        console.log(' start fetchObjectField');
        component.set("v.spinner", true);
        var FormId = component.get("v.FormId");
        var action = component.get("c.fetchQuickFormField");
        action.setParams({
            'formId': FormId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state == "SUCCESS") {
                var allvalue = response.getReturnValue();
                var x = response.getReturnValue().SObjectList;
                console.log({allvalue});
                var res = response.getReturnValue().formName.Object_Mapping__c;
                console.log(res);
                var allObject = [];
                var remove_obj_map = component.get("v.remove_obj_map");
                if(res != undefined){
                    var objectmap = JSON.parse(res);
                    console.log(objectmap);
                    for (var i = 0; i < x.length; i++) {
                        if(objectmap[x[i].split(',')[1]] == undefined){
                            allObject.push({
                                value: x[i].split(',')[0],
                                label: x[i].split(',')[1]
                            });
                        }
                        else{
                            remove_obj_map[x[i].split(',')[0]] = { value: x[i].split(',')[0], label: x[i].split(',')[1] };
                        }
                    }
                }
                else{
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
                if(res != undefined){
                    var objectmap = JSON.parse(res);
                    var objlist = [];
                    for(var keyy in objectmap){
                        objlist.push({key: keyy, value: objectmap[keyy].Active});
                    }
                    console.log({objlist});
                    console.log('fetchobjectfield 12');
                    console.log({objlist});
                    // component.set("v.mappingobjectlist" , objlist);
                    console.log('fetchobjectlist 13');
                    if(objlist.length == 0){
                        component.set("v.homecon", true);
                        component.set("v.disablevalue", false);
                    }
                    else{
                        try {
                            component.set("v.mappingobjectlist" , objlist);
                        } catch (error) {
                            console.log({error});
                            component.set("v.spinner", false);
                        }
                        component.set("v.homecon" , false);
                        component.set("v.disablevalue" , true);
                    }
                }
                else{
                    component.set("v.homecon", true);
                    component.set("v.disablevalue", false);
                }
                component.set("v.spinner", false);
            } else {
                component.set("v.spinner", true);
                helper.showToast("Error", "Error", "5000", "Error");
            }
            console.log('end fetchObjectField');
        });
        $A.enqueueAction(action);
    },

    getfieldshelper:function(component , event , helper){           // select object to get all field  init method
        console.log('getfieldshelper');
        console.log('userobj');
        var userObj = component.find("SobjectList").get("v.value");
        component.set("v.userObj", userObj);
        console.log(userObj);
        console.log('9');
        component.set("v.spinner", true);
        var temp_map = new Map();                             // map collection in null set
        temp_map.set();
        component.set("v.mapDistances", temp_map);            // non required field list null 
        var numlist = component.get("v.num");             // component.set("v.num" , numlist);
        numlist.splice(0 , numlist.length);
        console.log('10');

        var mappp = new Map();
        mappp.set();
        component.set("v.mapp" , mappp);                   // mapp collection is null set
        console.log('11');

        var mapfor = new Map();
        mapfor.set();
        component.set("v.mapfor", mapfor);                 // mapfor collecton is null set
        component.set("v.form_option_nreq" , []);
        component.set("v.form_option_req" , []);
        console.log('12');

        if (userObj == 'Select Object' || userObj == '') {
            console.log('14');
            component.set("v.mappingbtndisable", true);
            component.set("v.allFields", '');
            component.set("v.allReqFields", '');
            component.set("v.tablevalue", false);
            component.set("v.spinner", false);
        } 
        else {
            component.set("v.mappingbtndisable", false);
            component.set("v.tablevalue", true);
            console.log('15');
            var action = component.get("c.getAllFields");
            action.setParams({
                "fld": userObj
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log(state);
                if (state == "SUCCESS") {
                    component.set("v.allFields", response.getReturnValue());
                    var allfld = response.getReturnValue();
                    var allreqfld = allfld[0].objreqfield;
                    var allnonreqfld = allfld[0].lstfieldname;

                    var mappingobjectlist = component.get("v.mappingobjectlist");
                    console.log(mappingobjectlist);

                    var objtypemap = new Map();
                    for(var i= 0; i < allreqfld.length; i++){
                        objtypemap[allreqfld[i].apiName] = allreqfld[i].type;
                    }

                    var obj_nreq_fldtype = new Map();
                    for(var i= 0; i < allnonreqfld.length ; i++){
                        obj_nreq_fldtype[allnonreqfld[i].apiName] = allnonreqfld[i].type;
                    }

                    component.set("v.selectmapthree" , obj_nreq_fldtype);

                    var allfields = component.get("v.allFields");
                    var form_option_req = component.get("v.form_option_req");
                    var flv = component.get("v.flv");
                    for(var k=0; k < allfields[0].objreqfield.length; k++){
                        var rowIndex = k + 100;
                        var objfieldvalue3 = allfields[0].objreqfield[k].apiName;

                        if(objtypemap[objfieldvalue3] ==  'REFERENCE'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'PICKLIST'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'TEXTAREA'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c != 'QFTIME' || field_value.Data_Record_Id__c != 'QFDATETIME' || field_value.Data_Record_Id__c != 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFDATE' || field_value.Data_Record_Id__c == 'QFRECAPTCHA' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'EMAIL'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFEMAILID' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'STRING'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFRECAPTCHA' || field_value.Data_Record_Id__c == 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFSIGNATURE' || field_value.Data_Record_Id__c == 'QFFILEUPLOAD' ){
                                    }
                                    else{
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c, index:'0'});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'DOUBLE'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFPRICE' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'PHONE'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFPHONE' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'URL'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFLINK' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'CURRENCY'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFPRICE' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'INTEGER'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFPHONE' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER'){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'DATE'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFDATE' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'TIME'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFTIME' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'DATETIME'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFDATETIME' ){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        else if(objtypemap[objfieldvalue3] ==  'BOOLEAN'){
                            var templist = [];
                            for(var  i = 0; i < flv.length; i++){
                                var fieldatt = flv[i];
                                for(var j=0; j< fieldatt.length; j++){
                                    var field_value = fieldatt[j].FieldObj;
                                    if(field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFTERMSOFSERVICE'){
                                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                    }
                                }
                            }
                            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                        }
                        form_option_req.push({key: rowIndex, value: templist});
                    }
                    // console.log(JSON.stringify(form_option_reqs));
                    component.set("v.form_option_req" , form_option_req);
                    component.set("v.spinner", false);
                } else {
                    component.set("v.spinner", true);
                }
            });
            $A.enqueueAction(action);
        }
    },

    selectedfieldmap: function(component, event, helper) {          // select required form field
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
        var obj = {rowIndex , objfieldvalue3 , formfieldvalue};
        maplst[objfieldvalue3] = obj;

        var temp_list = [];
        if(edit_button_validation == "Edit" && formfieldvalue != 'Lookup relationship'){
            var req_lk_value = component.get("v.req_lk_value");
            for(var i=0; i<req_lk_value.length; ++i){
                if(req_lk_value[i].key == rowIndex){
                    var key = rowIndex;
                    var value = 'Select Object';
                    console.log(rowIndex);
                    temp_list.push({key, value});
                }
                else{
                    temp_list.push(req_lk_value[i]);
                }
            }
            component.set("v.req_lk_value", temp_list);
        }

        $A.util.addClass(add_style_class, 'changeMe_lookselect1');
        if(formfieldvalue == 'Lookup relationship'){
            var auraid = rowIndex;
            console.log(auraid);
            var add_style_class = document.getElementById(auraid);
            console.log(add_style_class);
            $A.util.addClass(add_style_class, 'changeMe');
            var lookupvalue = "LK_"+rowIndex;
            var obj =  lookupvalue;
            mapfor[rowIndex]  = obj;
        }
        else{
            var auraid = rowIndex;
            var add_style_class = document.getElementById(auraid);
            $A.util.removeClass(add_style_class, 'changeMe');
            var obj =  formfieldvalue;
            mapfor[rowIndex]  = obj;
            var tar = component.find(rowIndex);
            tar.style.display = 'none';
        }
        component.set("v.mapfor" , mapfor);
        console.log(JSON.stringify(mapfor));
    },

    selectObjFieldhelper:function(component,event,helper){          // select object none required field

        
        var rowIndex = event.target.getAttribute("data-row-index");
        var objfieldvalue3 = event.getSource().get("v.value");
        var objtypemap =  component.get("v.selectmapthree");
        var num = component.get("v.num");
        var allfields = component.get("v.allFields");
        var lstfieldname = allfields[0].lstfieldname;
        var mapp = component.get("v.mapp");
        var form_option_nreq = component.get("v.form_option_nreq");

        // component.set("v.nonreq_select_option" , null);
        // non-required object field in create map
        // var mapp = new Map();

        // var select = component.find('options');
        // if (!select.checkValidity()) {
        //     select.showHelpMessageIfInvalid();
        // }  else  {
        //     select.showHelpMessageIfInvalid();
        // } 

        console.log(JSON.stringify(mapp));

        var obj = objfieldvalue3 ;
        mapp[rowIndex] = obj;
        component.set("v.mapp" , mapp);
        console.log(JSON.stringify(mapp));
        console.log(objfieldvalue3);

        // mapping button Disable/Enable

        var mapp = component.get("v.mapp");
        var i = 0;
        if(objfieldvalue3 == 'Select Value'){
            component.set("v.mappingbtndisable" , true);
        }
        else{
            var num_edit = component.get("v.num_edit");
            for(var key in mapp){
                i = i + 1;
                if(mapp[key] != 'Select Value' && i == num.length && lstfieldname.length != 1){
                    component.set("v.mappingbtndisable", false);
                }
                else if(mapp[key] != 'Select Value' && i == num_edit.length && lstfieldname.length != 1){
                    component.set("v.mappingbtndisable", false);
                }
                else{
                    if(mapp[key] == 'Select Value'){
                        component.set("v.mappingbtndisable" , true);
                        break
                    }
                }
            } 
        }

        // object field related field show in form field

        for(var k=0; k < form_option_nreq.length; k++){
            if(form_option_nreq[k].key == rowIndex){
                form_option_nreq[k].value = [];
            }
        }

        var flv = component.get("v.flv");
        if(objtypemap[objfieldvalue3] ==  'REFERENCE'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'PICKLIST'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' || field_value.Data_Record_Id__c == 'QFFULLNAME'){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'TEXTAREA'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c != 'QFTIME' || field_value.Data_Record_Id__c != 'QFDATETIME' || field_value.Data_Record_Id__c != 'QFCAPTCHA'  || field_value.Data_Record_Id__c != 'QFRECAPTCHA' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'EMAIL'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFEMAILID' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'STRING'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFRECAPTCHA' || field_value.Data_Record_Id__c == 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFSIGNATURE' || field_value.Data_Record_Id__c == 'QFFILEUPLOAD' ){
                    }
                    else{
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'DOUBLE'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFPRICE' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'PHONE'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFPHONE' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'URL'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFLINK' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'CURRENCY'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFPRICE' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'INTEGER'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFPHONE' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER'){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'DATE'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFDATE' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'TIME'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFTIME' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'DATETIME'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFDATETIME' ){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        else if(objtypemap[objfieldvalue3] ==  'BOOLEAN'){
            var templist = [];
            for(var  i = 0; i < flv.length; i++){
                var fieldatt = flv[i];
                for(var j=0; j< fieldatt.length; j++){
                    var field_value = fieldatt[j].FieldObj;
                    if(field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFTERMSOFSERVICE'){
                        templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                    }
                }
            }
            templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
            templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
        }
        form_option_nreq.push({key: rowIndex, value:templist});
        component.set("v.form_option_nreq" , form_option_nreq);
        console.log({mapp});
        // selected object remove list 
        console.log(lstfieldname.length);
        for(var i = 0; i < lstfieldname.length; i++){
            if(lstfieldname[i].apiName == objfieldvalue3){
                var objfield_selected_fieldlist = component.get("v.objfield_selected_fieldlist");
                var select_objfield_list = component.get("v.select_objfield_list");
                select_objfield_list.push(lstfieldname[i].apiName);
                var obb = lstfieldname[i];
                objfield_selected_fieldlist[rowIndex] = obb;
                component.set("v.objfield_selected_fieldlist", objfield_selected_fieldlist);
                lstfieldname.splice(i , 1);
                component.set("allFields", allfields);
                component.set("v.select_objfield_list", select_objfield_list);
            }
        }
    },

    selectedsalfieldfor: function(component, event, helper){        //select non-required form field
        var mapfor = component.get("v.mapfor");
        var mapp = component.get("v.mapp");  
        var rowIndex = event.target.getAttribute("data-row-index");
        var formfieldvalue = event.getSource().get("v.value");

        var edit_button_validation = component.get("v.edit_button_validation");
        console.log('edit_button_validation',edit_button_validation);
        console.log('formfieldvalue',formfieldvalue);
        // var num_edit = component.get("v.num_edit");
        

       
        console.log('hjd');
        // lookup field option select 

        var auraid = "lookselect1"+rowIndex;
        var add_style_class = document.getElementById(auraid);
        $A.util.addClass(add_style_class, 'changeMe_lookselect1');
        if(formfieldvalue == 'Lookup relationship'){
            var auraid = "lookup"+rowIndex;
            var add_style_class = document.getElementById(auraid);
            $A.util.addClass(add_style_class, 'changeMe');
            // var lookupvalue = "LK_"+rowIndex;
            var obj =  formfieldvalue;
            mapfor[rowIndex]  = obj;
        }
        else{
            var auraid = "lookup"+rowIndex;
            var add_style_class = document.getElementById(auraid);
            $A.util.removeClass(add_style_class, 'changeMe');
            var obj =  formfieldvalue;
            mapfor[rowIndex]  = obj;
        }
        component.set("v.mapfor" , mapfor);
        
        var temp_list = [];
        if(edit_button_validation == "Edit" && formfieldvalue != 'Lookup relationship'){
            var nreq_lk_value = component.get("v.nreq_lk_value");
            for(var i=0; i<nreq_lk_value.length; ++i){
                console.log(nreq_lk_value[i]);
                if(nreq_lk_value[i].key == rowIndex){
                    var key = rowIndex;
                    var value = 'Select Object';
                    console.log(rowIndex);
                    temp_list.push({key, value});
                }
                else{
                    temp_list.push(nreq_lk_value[i]);
                }
            }
            component.set("v.nreq_lk_value", temp_list);
        }

        // form field value enter in map
        var mapDistances = component.get("v.mapDistances");
        var mapp = component.get("v.mapp");
        for(var key in mapp){
            if(key == rowIndex){
                var rowIndex = key;
                var objfieldvalue3 = mapp[key];
                var obj = {rowIndex , objfieldvalue3 , formfieldvalue};
                mapDistances[objfieldvalue3] = obj;
                console.log('aseed');
                component.set("mapDistances" , mapDistances);
            }
        }
    },

    lookupfieldhelper:function(component, event, helper){           // lookup field mapping

        var rowIndex = event.target.getAttribute("data-row-index");   
        var lkvalue = event.getSource().get("v.value");

        console.log(rowIndex.substring(4, 8));

        if(rowIndex.substring(4, 8) == 'req'){
            var mapDistances = component.get("v.mapDistances");
            for(var key in mapDistances){
                if(rowIndex == mapDistances[key].rowIndex){
                    if(lkvalue == 'Select Object'){
                        var obj = 'Lookup relationship';
                    }
                    else{
                        var obj = "LK_"+mapDistances[key].rowIndex+"_"+lkvalue;
                    }
                    mapDistances[key].formfieldvalue = obj;
                }
            }
            component.set("v.mapDistances" , mapDistances);
        }
        else{
            var mapfor = component.get("v.mapfor");
                if(lkvalue == 'Select Object'){
                    var obj = 'Lookup relationship';
                }
                else{
                    var obj = "LK_"+rowIndex+"_"+lkvalue;
                }
                mapfor[rowIndex] = obj;
            component.set("v.mapfor" , mapfor);
        }
    },

    remove: function(component, event, helper) {                    // object mapping table field remove
        var index = event.target.getAttribute("data-row-index");
        var allfields = component.get("v.allFields");
        var lstfieldname = allfields[0].lstfieldname;
        var objfield_selected_fieldlist = component.get("v.objfield_selected_fieldlist");
        lstfieldname.push(objfield_selected_fieldlist[index]);
        component.set("v.allfields", lstfieldname);

        var edit_button_validation = component.get("v.edit_button_validation");
        
        var map = component.get("v.mapp");
        var mapfor = component.get("v.mapfor");
        
        var temp = new Map();
        var tempp = new Map();

        for(var key in map){
            if(key != index){
                temp[key] = map[key];
            }
        }
        component.set("v.mapp" , temp);
        for(var key in mapfor){
            if(key != index){
                tempp[key] = mapfor[key];
            }
        }
        component.set("v.mapfor" , tempp);
        var mapp = component.get("v.mapp");
        if(mapp.size == 0 ){
            component.set("v.mappingbtndisable" , false);
        }
        for(var key in mapp){
            if(mapp[key] == 'Select Value'){
                component.set("v.mappingbtndisable" , true);
                break;
            }
            else{
                component.set("v.mappingbtndisable" , false);
            }
        }
        if(edit_button_validation == "Edit"){
            var num_edit = component.get("v.num_edit");
            var temp_num_edit = [];
            for(var i=0; i<num_edit.length; i++){
                if(index != num_edit[i].key){
                    temp_num_edit.push(num_edit[i]);
                }
            }
            component.set("v.num_edit", temp_num_edit);
        }
        else{
            var num  = component.get("v.num");
            var tmp = num.indexOf(index);
            num.splice(tmp,1);
            component.set("v.num", num);
        }
    },

    addnewmappinginhelper:function(component, event, helper){       // add new mapping row
        var edit_button_validation = component.get("v.edit_button_validation");
        if(edit_button_validation == "Edit"){
            var num_edit = component.get("v.num_edit");
            var count = num_edit.length;
            var req_lk_value = component.get("v.req_lk_value");
            var nreq_lk_value = component.get("v.nreq_lk_value");
            let countt = count.toLocaleString('en-US', {minimumIntegerDigits: 3,useGrouping: false})
            var key = countt + '_nreq_' + Math.random().toString(36).substring(2,4);
            num_edit.push({key, value:'Select Value', vf:'Select Value'});
            var value = 'Select Object';
            req_lk_value.push({key, value});
            nreq_lk_value.push({key, value});
            component.set("v.mappingbtndisable", true);
            console.log({num_edit});
            component.set("v.num_edit", num_edit);
        }
        else{
            var lst = component.get("v.num");
            var count = lst.length;
            let countt = count.toLocaleString('en-US', {minimumIntegerDigits: 3,useGrouping: false})
            lst.push(countt + '_nreq_' + Math.random().toString(36).substring(2,4));
            component.set("v.mappingbtndisable", true);
            console.log({lst});
            component.set("v.num", lst);
        }
    },

    savevalue:function(component, event, helper) {                 // save button click 
        
        var mapDistances = component.get("v.mapDistances");
        console.log('mapDistances',JSON.stringify(mapDistances));
        var mapp = component.get("v.mapp");
        var mapfor = component.get("v.mapfor");
        console.log('mapp kiwjd',JSON.stringify(mapp));
        console.log('mapfor olk;l   ',JSON.stringify(mapfor));
        var str = 'Select Value';
        var templist = [];
        console.log('mapDistances : ', mapDistances.size);

        var testnon = true;
        for(var key in mapp){
            console.log(mapp[key]);
            if(mapp[key] === str){
                var testnon = false;
                helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                break;
            }
            else{
                var mapforvalue = mapfor[key];
                console.log(mapforvalue.substring(0, 3));
                if(mapforvalue == undefined){
                    var testnon = false;
                    helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                    break;
                }
                else if(mapforvalue == 'Lookup relationship'){
                    var testnon = false;
                    helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                    break;
                }
                else{
                    var rowIndex = key;
                    var objfieldvalue3 = mapp[key];
                    var formfieldvalue = mapfor[key];
                    var obj = {rowIndex , objfieldvalue3 , formfieldvalue};
                    mapDistances[objfieldvalue3] = obj;
                    var testnon = true;
                    component.set("v.mapDistances", mapDistances);
                }
            }
        }

        for(var key in mapDistances){
            var mapvalue = mapDistances[key];
            for(var key2 in mapvalue){
                templist.push(mapvalue[key2]);
            }
        }
        console.log('templist',templist);
        console.log('templist',templist.length);
        var allfields = component.get("v.allFields");
        var objreqfield = allfields[0].objreqfield;

        if(templist.length == 0){
            testreq = false;
        }
        else{
            for(var i = 0; i < objreqfield.length; i++){
                var testreq = templist.includes(objreqfield[i].apiName);
                if(testreq == false){
                    var testreq = templist.includes(objreqfield[i].apiName);
                    helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                    break;
                }
                else{
                    var mapforvalue = templist.includes(str);
                    var mapfor_LK_value = templist.includes('Lookup relationship');
                    if(mapforvalue == true){
                        testreq = false;
                        helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                        break;
                    }
                    else if(mapfor_LK_value){
                        testreq = false;
                        helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
                        break;
                    }
                    else{
                        testreq = true;
                    }
                }
            }
        }



        console.log(testreq+'<<>>'+testnon);
        if(testreq == true && testnon == true ){
            component.set("v.spinner", true);
            var allValues = component.get("v.allValues");
            var finalstring = allValues.formName.Object_Mapping__c;

                var finallist = [];
                for(var key in mapp){
                    finallist.push(mapp[key]);
                }
                for(var i = 0; i < objreqfield.length; i++){
                    finallist.push(objreqfield[i].apiName);
                }
                var tempmap = new Map();
                for(var key in mapDistances){
                    var chkkey = finallist.includes(key);
                    if(chkkey == true){
                        tempmap[key] = mapDistances[key];
                    }
                }
                component.set("v.mapDistances", tempmap);


            if(finalstring != undefined){
                var finalmap  = JSON.parse(finalstring);
                var mapDistances = component.get("v.mapDistances");
                var value = JSON.stringify(mapDistances);
                var objname = String(component.find("SobjectList").get("v.value"));
                // var Active = String(component.get("v.togglesecondary"));
                var Active = true;
                var obj = {Active , objname , value};
                finalmap[objname] = obj;
                var ab = JSON.stringify(finalmap);
            }
            else{
                var tmap = new Map();
                var value = JSON.stringify(mapDistances);
                var objname = String(component.find("SobjectList").get("v.value"));
                // var Active = String(component.get("v.togglesecondary"));
                var Active = true;
                var obj = {Active , objname , value};
                tmap[objname] = obj;
                var ab = JSON.stringify(tmap);

            }

        


            console.log('ab >>>', ab);
            var formId = component.get("v.FormId");
            var action = component.get("c.saveList");
            action.setParams({
                'maplist' : ab,
                'formid' : formId
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state == "SUCCESS"){
                    helper.showToast("Success", "Success", "5000", "Save successfully..!");
                    console.log('OUTPUT :  Success');
                    component.set("v.allValues" , finalmap);
                    component.set("v.deletebtndisable" , false);
                    component.set("v.defvalue", 'Select Object');
                    component.set("v.mapingcon" , false);
                    component.set("v.mapingcon_edit" , false);
                    component.set("v.homecon", false);
                    // component.set("v.num_edit", null);
                    // component.set("v.num_edit", []);
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                    component.set("v.spinner", false);
                }
                else{
                    console.log('OUTPUT : Error');
                    helper.showToast("Error", "Error", "5000", "Error");
                }
            });
            $A.enqueueAction(action);
        }
        else{
            helper.showToast("Error", "Error", "5000", "Fill Blank Mapping Row...!");
        }
    },

    deleteinhelper:function(component, event, helper){              // delete object mapping 

        if (confirm('Do You Really want to Delete this Mapping!!') == true) {
            console.log('ehdcbhjecb');
            var objname = event.getSource().get("v.value");
            console.log(objname);
            var objmappingfield = component.get("v.allValues");
            console.log({objmappingfield});
            var objmaptemp = objmappingfield.formName.Object_Mapping__c;
            console.log(objmaptemp);
            var objmap = JSON.parse(objmaptemp);
            console.log({objmap});
            var formId = component.get("v.FormId");

            var map = new Map();

            for(var key in objmap){
                if(key != objname){
                    map[key] = objmap[key];
                }
            }
            var ab = JSON.stringify(map);
            var action = component.get("c.saveList");
            action.setParams({
                'maplist' : ab,
                'formid' : formId
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state == "SUCCESS"){
                    helper.showToast("Success", "Success", "5000 ", objname +" delete successfully..!");
                    // console.log('OUTPUT :delete Success');
                    var a = component.get("c.fetchObjectField");
                    $A.enqueueAction(a);
                }
                else{
                    helper.showToast("Error", "Error", "5000 ", objname + " mapping not delete");
                }
            });
            $A.enqueueAction(action);
        }
        else {
           console.log('not conferm');
        }
    },

    toggleinhelper:function(component, event , helper){             // toggle button
        var formId = component.get("v.FormId");
        var aa = event.getSource().get("v.value");
        var cc = event.getSource().get("v.name");
        var objmappingfield = component.get("v.allValues");
        var objmaptemp = objmappingfield.formName.Object_Mapping__c;
        var objmap = JSON.parse(objmaptemp);
        for(var key in objmap){
            if(key == cc){
                objmap[key].Active = aa;
            }
        }
        var objstrmap = JSON.stringify(objmap);
        component.set("v.allValues.formName.Object_Mapping__c" , objstrmap);
        var action = component.get("c.saveList");
            action.setParams({
                'maplist' : objstrmap,
                'formid' : formId
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state == "SUCCESS"){
                    console.log('OUTPUT :active change Success');
                }
                else{
                    helper.showToast("Error", "Error", "5000", objname + " mapping not active");
                }
            });
            $A.enqueueAction(action);
    },

    editinhelper:function(component, event, helper){
        var formId = component.get("v.FormId");
        var objname = event.getSource().get("v.value");
        var remove_obj_map = component.get("v.remove_obj_map");
        var allObject = component.get("v.allObject");
        allObject.push(remove_obj_map[objname]);
        component.set("v.allObject", allObject);
        component.set("v.defvalue", objname);
        component.set("v.mapingcon", false);
        component.set("v.disablevalue", false);
        component.set("v.mapingcon_edit", true);
        component.set("v.spinner", true);
        component.set("v.num_edit", []);

        var flv = component.get("v.flv");
        helper.getfieldshelper(component, event,helper);
        var action = component.get("c.editform");
        console.log({action});
        action.setParams({
            'formId' : formId
        });
        action.setCallback(this, function(response){
            console.log({response});
            var state = response.getState();
                if(state == "SUCCESS"){
                    var objmapping_data = response.getReturnValue();
                    console.log({objmapping_data});
                    var objmapping_data_parse = JSON.parse(objmapping_data);
                    var mapp_req = new Map();
                    var mapp_nreq = new Map();
                    var mapfor_nreq = new Map();
                    var num_edit_map = [];
                    var objtypemap =  component.get("v.selectmapthree");
                    var form_option_nreq = [];
                    var remove_obj_fld_lst = new Map();
                    for(var key in objmapping_data_parse){
                        if(key == objname){
                            var second_map = JSON.parse(objmapping_data_parse[key].value);
                            // var objfield_selected_fieldlist = component.get("v.objfield_selected_fieldlist");
                            for(var key_2 in second_map){
                                console.log('key', key_2);

                                // var allfields = component.get("v.allFields");
                                // var lstfieldname = allfields[0].lstfieldname;
                                // console.log({lstfieldname});


                                var rowIndex = second_map[key_2].rowIndex;
                                var objfieldvalue3 =  second_map[key_2].objfieldvalue3;
                                var formfieldvalue = second_map[key_2].formfieldvalue;
                                var str = rowIndex.substr(4, rowIndex.length);

                                remove_obj_fld_lst[objfieldvalue3] = rowIndex;
                                // for(var i = 0; i < lstfieldname.length; i++){
                                //     if(lstfieldname[i].apiName == objfieldvalue3){
                                        
                                //         var obb = lstfieldname[i];
                                //         objfield_selected_fieldlist[rowIndex] = obb;
                                //         lstfieldname.splice(i , 1);
                                        
                                //     }
                                // }

                                if(str == "req"){
                                    var obj = {rowIndex , objfieldvalue3 , formfieldvalue};
                                    mapp_req[objfieldvalue3] = obj;
                                }
                                else{
                                    obj = {rowIndex , objfieldvalue3 , formfieldvalue};
                                    mapp_nreq[rowIndex] = objfieldvalue3;
                                    mapfor_nreq[rowIndex] = formfieldvalue;
                                    num_edit_map.push({key:rowIndex, value:objfieldvalue3, vf:formfieldvalue});

                                    if(objtypemap[objfieldvalue3] ==  'REFERENCE'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'PICKLIST'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFDROPDOWN' || field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFLOOKUP' || field_value.Data_Record_Id__c == 'QFFULLNAME'){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'TEXTAREA'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c != 'QFTIME' || field_value.Data_Record_Id__c != 'QFDATETIME' || field_value.Data_Record_Id__c != 'QFCAPTCHA'  || field_value.Data_Record_Id__c != 'QFRECAPTCHA' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'EMAIL'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFEMAILID' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'STRING'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFRECAPTCHA' || field_value.Data_Record_Id__c == 'QFCAPTCHA' || field_value.Data_Record_Id__c == 'QFSIGNATURE' || field_value.Data_Record_Id__c == 'QFFILEUPLOAD' ){
                                                }
                                                else{
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'DOUBLE'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFPRICE' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'PHONE'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFPHONE' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'URL'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFLINK' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'CURRENCY'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFPRICE' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'INTEGER'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFPHONE' || field_value.Data_Record_Id__c == 'QFNUMBER' || field_value.Data_Record_Id__c == 'QFNUMBER'){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'DATE'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFDATE' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'TIME'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFTIME' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'DATETIME'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFDATETIME' ){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    else if(objtypemap[objfieldvalue3] ==  'BOOLEAN'){
                                        var templist = [];
                                        for(var  i = 0; i < flv.length; ++i){
                                            var fieldatt = flv[i];
                                            for(var j=0; j< fieldatt.length; j++){
                                                var field_value = fieldatt[j].FieldObj;
                                                if(field_value.Data_Record_Id__c == 'QFRADIOBUTTON' || field_value.Data_Record_Id__c == 'QFTERMSOFSERVICE'){
                                                    templist.push({key: fieldatt[j].FieldAttObj.Label__c, value:fieldatt[j].FieldAttObj.Form_Field__c});
                                                }
                                            }
                                        }
                                        templist.push({key: '--------------------------------------------------------------------------------------------', value:'true'});
                                        templist.push({key: 'Lookup relationship', value:'Lookup relationship'});
                                    }
                                    form_option_nreq.push({key: rowIndex, value:templist});
                                }
                                // component.set("v.objfield_selected_fieldlist", objfield_selected_fieldlist);
                                // component.set("allFields", allfields);
                            }
                        }
                    }
                    console.log({form_option_nreq});   
                    
                    
                    console.log('whejv');
                    console.log({num_edit_map});
                    var allFields = component.get("v.allFields");
                    console.log({allFields});
                    var d =allFields[0].objreqfield;
                    console.log({d});
                    var temp_nreq_lookup_index = [];
                    var temp_req_lookup_index = [];

                    var nreq_lk_value = [];
                    var req_lk_value = [];

                    for(var i=0; i<d.length; ++i){
                        console.log({i});
                        console.log('aaa',mapp_req[d[i].apiName].formfieldvalue.substring(0,2));
                        if(mapp_req[d[i].apiName].formfieldvalue.substring(0,2) == "LK"){
                            console.log('iff');
                            d[i].select_req_value = "Lookup relationship";
                            console.log('sss');
                            d[i].LKR = mapp_req[d[i].apiName].formfieldvalue.substring(11, mapp_req[d[i].apiName].formfieldvalue.length);
                            console.log('sss');
                            var key = mapp_req[d[i].apiName].rowIndex;
                            console.log('sss');
                            var value = mapp_req[d[i].apiName].formfieldvalue.substring(11, mapp_req[d[i].apiName].formfieldvalue.length);
                            console.log('sss');
                            req_lk_value.push({key, value});
                            console.log('sss');
                            temp_req_lookup_index.push(mapp_req[d[i].apiName].rowIndex);
                            console.log('ecfjk');
                        }
                        else{
                            // Object.assign(d[i], {select_req_value: mapp_req[d[i].apiName].formfieldvalue});
                            console.log('else');
                            d[i].select_req_value = mapp_req[d[i].apiName].formfieldvalue;
                        }
                    }
                    for(var i=0; i<num_edit_map.length; ++i){
                        console.log(num_edit_map[i].vf.substring(0, 2));
                        console.log('aaaaa');
                        if(num_edit_map[i].vf.substring(0, 2) == "LK"){
                            temp_nreq_lookup_index.push(num_edit_map[i].key);
                            console.log(num_edit_map[i].key);
                            num_edit_map[i].LKR = num_edit_map[i].vf.substring(15, num_edit_map[i].vf.length);
                            var key = num_edit_map[i].key;
                            var value = num_edit_map[i].vf.substring(15, num_edit_map[i].vf.length);
                            nreq_lk_value.push({key, value});
                            console.log(num_edit_map[i].vf.substring(15, num_edit_map[i].vf.length));
                            num_edit_map[i].vf = "Lookup relationship";
                        }
                        console.log('ssssfor');
                    }
                    console.log('numm');
                    console.log({num_edit_map});
                    var nsks = component.get("v.num_edit");
                    console.log({nsks});
                    var nullss = [];
                    // component.set("v.num_edit",nullss);
                    var nskaa = component.get("v.num_edit");
                    console.log({nskaa});

                    component.set("v.num_edit", num_edit_map);
                    console.log('dfv');
                    console.log({form_option_nreq});
                    component.set("v.form_option_nreq" , form_option_nreq);
                    console.log('dvwefv');
                    console.log({form_option_nreq});
                    component.set("v.mapDistances", mapp_req);
                    console.log('fvfv');
                    component.set("v.mapp", mapp_nreq);
                    console.log('advfv');
                    component.set("v.mapfor", mapfor_nreq);
                    console.log('asdvqefav');
                    console.log('evqefv');
                    console.log({num_edit_map});
                    console.log('end edit');

                    console.log('nreq_lk_value>>>>>>', JSON.stringify(nreq_lk_value));
                    console.log('req_lk_value>>>>>>', JSON.stringify(req_lk_value));
                    component.set("v.nreq_lk_value", nreq_lk_value);
                    component.set("v.req_lk_value", req_lk_value);

                    setTimeout(() =>{
                        var allfields = component.get("v.allFields");
                        var lstfieldname = allfields[0].lstfieldname;
                        var objfield_selected_fieldlist = new Map();
                        console.log({remove_obj_fld_lst});
                        console.log(lstfieldname.length);
                        for(var key in remove_obj_fld_lst){
                           for( var i = 0; i < lstfieldname.length; ++i){
                               if(key == lstfieldname[i].apiName){
                                var obb = lstfieldname[i];
                                objfield_selected_fieldlist[remove_obj_fld_lst[key]] = obb;
                                lstfieldname.splice(i , 1);
                               }
                           }
                        }
                        console.log({lstfieldname});
                        component.set("v.objfield_selected_fieldlist", objfield_selected_fieldlist);
                        if(lstfieldname.length == 0){
                            component.set("v.mappingbtndisable" , true);
                        }
                        else{
                            component.set("v.mappingbtndisable" , false);
                        }
                        component.set("allFields", allfields);
                    },1000)

                    setTimeout(() => {
                        for(var i=0; i<temp_nreq_lookup_index.length; ++i){
                            var auraid = "lookup"+temp_nreq_lookup_index[i];
                            console.log(auraid);
                            var add_style_class = document.getElementById(auraid);
                            $A.util.addClass(add_style_class, 'changeMe');
                        }
                        for(var i=0; i<temp_req_lookup_index.length; ++i){
                            var auraid = temp_req_lookup_index[i];
                            console.log(auraid);
                            var add_style_class = document.getElementById(auraid);
                            $A.util.addClass(add_style_class, 'changeMe');
                        }
                    }, 1000);
                    component.set("v.spinner", false);
                }
                else{
                    helper.showToast("Error", "Error", "5000 ", objname + " mapping not Edited");
                }
        });
        console.log('end edit');
        $A.enqueueAction(action);
    },

    showToast: function(type, title, time, message) {               // show notification message 
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "type": type,
            "Duration": time,
            "message": message
        });
        toastEvent.fire();
    },

})