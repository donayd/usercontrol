import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  passwordType = 'password';
  iconName = 'eye-off';
  userList: User[];

  constructor(
    private platform: Platform,
    public router: Router,
    public alertController: AlertController
  ) { }

  ionViewDidEnter() {
    this.userList = JSON.parse(localStorage.getItem('users'));
    if(this.userList === null || this.userList.length < 1) {
      let admin: User = {
        'id': 0,
        'username': 'admin',
        'password': '123'
      }
      this.userList = [admin];
      localStorage.setItem('users', JSON.stringify(this.userList));
      localStorage.setItem('index', '0');
    }
  }

  togglePasswordMode() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.iconName = this.iconName === 'eye-off' ? 'eye' : 'eye-off';
  }

  submit(model: any) {
    const username = model.value.username;
    const password = model.value.password;
    let index = this.userList.findIndex( user => user.username === username 
      && user.password === password)
    if ( index !== -1 ){
      this.router.navigate(['main'], {queryParams: {index}});
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
