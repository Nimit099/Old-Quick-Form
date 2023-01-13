import { getWaveFolders } from 'lightning/analyticsWaveApi';
import { LightningElement, api,track } from 'lwc';
import getFolders from '@salesforce/apex/qfFolderSideBarController.getFolders';
import createFolder from '@salesforce/apex/qfFolderSideBarController.createFolder';

export default class QfFolderSideBar extends LightningElement {
    // @api getValueFromParent;
    @track allfolders;
    @track error;
    @track isModalOpen = false;
    @track folderName = null;
   
    openModal() {
        console.log('Open Model Called');
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        console.log('Close Model Called');
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    // submitDetails() {
    //     console.log('Submit Details Called');
    //     // to close modal set isModalOpen tarck value as false
    //     //Add your code to call apex method or do some processing
    //     this.isModalOpen = false;
    // }


    createFolder(){
        console.log('Create FOlder Called');
        this.folderName = this.template.querySelector('lightning-input').value;
        console.log('this folderName==='+this.folderName);
        createFolder({folderName:this.folderName})
            .then(result => {
                // folderName = this.folderName;
                console.log({result});
                console.log('after value==='+this.template.querySelector('lightning-input').value);
                this.template.querySelector('lightning-input').value = null;
                this.isModalOpen = false;
                this.getFolders();
            })
            .catch(Error =>{
                console.log({error});
            })
        
    }

    // methodtogetFolders(){
    //     getFolders().then(result => {
    //         console.log({result});
    //     }).catch(error => {
    //         console.log({error});
    //     });
    // }

    connectedCallback() {
        console.log('LWC Component Loaded Successfully');
        this.getFolders();
    }

    getFolders(){
        console.log('Get Folders called');
        getFolders()
        .then(result => {
            this.allfolders = result;
        })
        .catch(error => {
            this.error = error;
        })
    }
}