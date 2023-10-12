import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  errorMessage: string = '';
  hasError: boolean = false;

  showErrorMessage = (message: string): void => {
    this.hasError = true;
    this.errorMessage = message;

    setTimeout(() => {
      this.clearErrorMessage();
    }, 4000);
  }

  clearErrorMessage = (): void => {
    this.hasError = false;
    this.errorMessage = '';
  }
}
