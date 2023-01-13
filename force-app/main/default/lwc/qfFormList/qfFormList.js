import { LightningElement,track } from 'lwc';
import insertFolderMethod from '@salesforce/apex/qfFormListController.insertFolderMethod';
import searchFormMethod from '@salesforce/apex/qfFormListController.searchFormMethod';
import insertFormMethod from '@salesforce/apex/qfFormListController.insertFormMethod';
import folderName from '@salesforce/schema/Folder__c.Name';
import formTitle from '@salesforce/schema/Form__c.Title__c'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import updateFormDetails from '@salesforce/apex/qfFormListController.updateFormDetails';
import deleteFormRecord from '@salesforce/apex/qfFormListController.deleteFormRecord';
import {deleteRecord} from 'lightning/uiRecordApi';

const DELAY=100;
export default class QfFormList extends LightningElement {
    // @wire(getFormRecord) formsrecord;
    @track FormRecords;
    searchValue='';
    @track formList=[];
    @track folderid;
    @track formid;
    @track error;
    // @track getShowContainer =true;
    @track getFolderRecord={
        Name:folderName
    };
    @track getFormRecord={
        Title__c:formTitle
    };
    searchKeyword(event){
        this.searchValue=event.target.value;
    }
    handleSearchKeyword(){
        if(this.searchValue!==''){
            searchFormMethod({
                formName:this.searchValue
            })
            .then(result =>{
                this.FormRecords=result;
            })
            .catch(error => {
                const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            this.FormRecords=null;
        });
        }
        else{
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }



    // Folder Modal
    @track isModalOpen = false;
    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    saveFolderAction() {
        this.isModalOpen = false;
    }
  
    nameInpChange(event){
        this.getFolderRecord.Name = event.target.value;
      }

    saveFolderAction(){
        insertFolderMethod({folder:this.getFolderRecord})
        .then(result=>{
          window.console.log('Test');
            this.getFolderRecord={};
            this.folderid=result.Id;
            window.console.log('after save' );
            
            const toastEvent = new ShowToastEvent({
              title:'Success!',
              message:'Folder created successfully',
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
           this.error=error.message;
           window.console.log(this.error);
        });      
    }
    // Form Model
    @track isModalFormOpen=false;
    openFormModal(){
        this.isModalFormOpen=true;
    }
    closeFormModal(){
        this.isModalFormOpen=false;
    }
    saveFormAction(){
        this.isModalFormOpen=false;
    }
    titleInpChange(event){
        this.getFormRecord.Title__c=event.target.value;
    }
    saveFormAction(){
        console.log('testing::');
        insertFormMethod({form:this.getFormRecord})
        .then(result=>{
          window.console.log('Test');
            this.getFormRecord={};
            this.formid=result.Id;
            window.console.log('after save' );
            
            const toastEvent = new ShowToastEvent({
              title:'Success!',
              message:'Folder created successfully',
              variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
           this.error=error.message;
           window.console.log(this.error);
        });      
    }
    // shortby(event){
    //     this.getShowContainer=true;
    //     window.console.log('shortby');
    // }
    // item(event){
    //     this.getShowContainer=false;
    //     window.console.log('ItemBy');
    // }

    // searching
    // searchFormAction(event){
    //     const searchString=event.target.value;
    //     window.clearTimeout(this.delayTimeout);
    //     this.delayTimeout=setTimeout(()=>{
    //         this.FormName=searchString;
    //     },DELAY);
    // }

    // Rename Title Model
    @track getFormTitleRecord={
        Title__c:formTitle
    }
    titleUpdateChange(event){
        this.getFormTitleRecord.Title__c=event.target.value;
    }

    @track isModalTitleUpdate=false;
    renameFormModal(){
        this.isModalTitleUpdate=true;
    }
    closeTitleUpdateModal(){
        this.isModalTitleUpdate=false;
    }
    updateFormTitleAction(){
        this.isModalTitleUpdate=false;
    }
    updateFormTitleAction(){
        updateFormDetails({formdetails:this.getFormTitleRecord})
        .then(result=>{
            console.log('Its Form title update ');
            this.getFormTitleRecord={};
            this.formid=result.Id;
            console.log('Update');

            const toastEvent=new ShowToastEvent({
                title:'Success!',
                message:'Form Title Updated SuccessFully',
                variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
            this.error=error.message;
            window.console.log(this.error);
        });
    }
    // Delete Form Model
    selectedValue;
    @track isModalDeleteForm=false;
    deleteFormModal(){
        this.isModalDeleteForm=true;
    }
    deleteCloseModal(){
        this.isModalDeleteForm=false;
    }
    deleteFormAction(){
        this.isModalDeleteForm=false;
    }
    deleteFormAction(){
        deleteFormRecord({
            deleteForm:this.recordId
        })
        .then(result=>{
            this.recordId={};
            this.formid=result.Id;

            const toastEvent=new ShowToastEvent({
                title:'Success!',
                message:'Form Delete SuccessFully',
                variant:'success'
            });
            this.dispatchEvent(toastEvent);
        })
        .catch(error=>{
            this.error=error.message;
            console.log(this.error);
        });
    }
}