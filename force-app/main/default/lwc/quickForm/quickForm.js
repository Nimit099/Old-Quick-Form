import { LightningElement } from 'lwc';
export default class QuickForm extends LightningElement {
  greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}