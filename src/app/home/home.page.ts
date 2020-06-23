import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  passwordType = 'password';
  iconName = 'eye-off';
  userlist: User[];

  constructor(
    private platform: Platform,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.userlist = JSON.parse(localStorage.getItem('users'));
  }

  togglePasswordMode() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.iconName = this.iconName === 'eye-off' ? 'eye' : 'eye-off';
  }

  submit(model: any) {
    const username = model.value.username;
    const password = model.value.password;
    if ( this.userlist.findIndex( user => user.username === username 
      && user.password === password) !== -1 ){
      this.router.navigate(['main']);
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Usuario o contraseña inválida',
      message: 'Intente nuevamente',
      buttons: [
        {
          text: 'Aceptar',
        }
      ]
    });
    await alert.present();
  }

}
