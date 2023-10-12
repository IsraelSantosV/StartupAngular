import {Component, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: any;

  constructor(private httpClient: HttpClient,
              private messageService: ToastrService) {
  }

  form = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, Validators.required)
  });

  login = () => {
    if (!this.form.valid) {
      this.messageService.error('Verifique o formulário e tente novamente')
      return;
    }

    const data = {
      ...this.form.value,
      grantType: 'password',
      scope: 'WebSite',
    }

    this.httpClient.post('http://localhost:5000/identity/v1/connect/token', data)
      .subscribe((response : any) => {
        this.messageService.success('Logado com sucesso!');
        this.user = response.data.user;
      }, _ => {
        this.messageService.error('Email ou senha incorretos')
      });
  }

}
