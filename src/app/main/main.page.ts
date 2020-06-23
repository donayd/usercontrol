import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userlist: User[];

  constructor(
    public router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.userlist = JSON.parse(localStorage.getItem('users'));
  }

  createUser() {
    this.presentAlertCreate();
  }

  editUser(user: User) {
    this.presentAlertEdit(user);
  }

  trashUser(user: User) {
    this.presentAlertTrash(user);
  }

  signout() {
    this.router.navigate(['home']);
  }

  async presentAlertCreate() {
    const alert = await this.alertController.create({
      header: 'Crear Usuario',
      inputs: [
        {
          name: 'username',
          id: 'username',
          placeholder: 'Usuario'
        },
        {
          name: 'password',
          id: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'danger',
        }, {
          text: 'Aceptar',
          cssClass: 'success',
          handler: (data) => {
            let newId = 0;
            while( this.userlist.find(user => newId === user.id) != undefined){
              newId = Math.floor(Math.random() * 10);
            }
            let newUser: User = {
              'id': newId,
              'username': data.username,
              'password': data.password
            }
            this.userlist.push(newUser);
            localStorage.setItem('users', JSON.stringify(this.userlist));
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertEdit(user: User) {
    let index = this.userlist.findIndex( u => u.id === user.id);
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'username',
          id: 'username',
          type: 'text',
          value: user.username,
          placeholder: 'Usuario'
        },
        {
          name: 'password',
          id: 'password',
          type: 'text',
          value: user.password,
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'danger',
        }, {
          text: 'Aceptar',
          cssClass: 'success',
          handler: (data) => {
            let changeUser: User = {
              'id': user.id,
              'username': data.username,
              'password': data.password
            }
            this.userlist[index] = changeUser;
            localStorage.setItem('users', JSON.stringify(this.userlist));
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertTrash(user: User) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: 'Desea Eliminar a ' + user.username,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'danger',
        }, {
          text: 'Aceptar',
          cssClass: 'success',
          handler: () => {
            let index = this.userlist.findIndex( u => u.id === user.id);
            console.log(index);
            this.userlist.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(this.userlist));
          }
        }
      ]
    });

    await alert.present();
  }
}
