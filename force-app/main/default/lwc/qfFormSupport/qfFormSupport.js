import { LightningElement ,track} from 'lwc';
export default class QfFormSupport extends LightningElement {
  /*  $(this.document).ready(function () {
        function toggleSidebar() {
          $("this.button").toggleClass("active");
          $("this.main").toggleClass("move-to-left");
          $("this..sidebar-item").toggleClass("active");
        }
      
        $("this..button").on("click tap", function () {
          toggleSidebar();
        });
      
        $(document).keyup(function (e) {
          if (e.keyCode === 27) {
            toggleSidebar();
          }
        });
      });*/


      @track changeStyle = false;
    get className(){
      //if changeStle is true, getter will return class1 else class2
        return this.changeStyle ? 'class1': 'class2';
    }
    handleChange(event){
        this.changeStyle = event.target.class1;
    }
    

    // openNav() {
      
    // }
    
    // closeNav() {
    //   this.template.querySelector('[data-id="mySidenav"]').classList.add('class2');
    //   // document.getElementById("mySidenav").style.width = "0";
    //   // document.getElementById("main").style.marginLeft= "0";
    // }
      

   @track clickedButtonLabel = 'Support';  
    @track boolVisible = false;  
    handleClick(event) {  
        const label = event.target.label;  
  
        if ( label === 'Support' ) {  
  
            this.clickedButtonLabel = 'Hide';  
            this.boolVisible = true;  
  
        } else if  ( label === 'Hide' ) {  
              
            this.clickedButtonLabel = 'Support'; 
            this.clickedButtonLabel 
            this.boolVisible = false;  
  
        }  

        
    }  

buttonClicked;
 
//Initialize with light color 
divColor = 'light-color';


appendClass(){
    //Using template query selecter add green-border css class to the div element
    this.template.querySelector('div').classList.add('redColor');
}

toggleClass(){
    //Toggle green border class on the div element
    

    this.template.querySelector('div').classList.toggle('class2');

}

   
}