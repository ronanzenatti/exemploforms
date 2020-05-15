import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

// Importações necessárias para formulários
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../services/usuario.service';

/*
* Para funcionar os formulários, precisamos importar (adicionar)
* o módulo ReactiveFormsModule no arquivo .module.ts
*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public formLogin: FormGroup;

  public mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
    senha: [
      { tipo: 'required', mensagem: 'É obrigatório digitar a senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caractéres.' }
    ],
  };

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public router: Router,
    public usuarioService: UsuarioService) {

    // Monta o formulário
    this.formLogin = formBuilder.group({
      // Declara os campos do formulário.
      email: ['', Validators.compose([Validators.email, Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])]
    });
  }

  public async login() {
    if (this.formLogin.valid) {

      let email = this.formLogin.value.email;
      let senha = this.formLogin.value.senha;

      if (await this.usuarioService.login(email, senha)) {
        this.router.navigateByUrl('painel-usuario');
      } else {
        this.alertUserInvalid();
      }

    } else {
      this.alertFormInvalid();
    }
  }

  async alertFormInvalid() {
    const alert = await this.alertController.create({
      header: 'ERRO!!!',
      message: 'Formulário inválido, confira os dados!',
      buttons: ['OK']
    });

    await alert.present();
  }


  async alertUserInvalid() {
    const alert = await this.alertController.create({
      header: 'ERRO!!!',
      message: 'E-mail/Senha inválidos, confira os dados!',
      buttons: ['OK']
    });

    await alert.present();
  }


}
