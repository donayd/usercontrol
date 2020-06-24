import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  userList: User[];
  currentUser: User;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    console.log("Actualizando...");
    this.userList = JSON.parse(localStorage.getItem('users'));
    let index = this.route.snapshot.queryParamMap.get('index');
    this.currentUser = this.userList[index];
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
    this.navCtrl.pop();
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
            let newId = +localStorage.getItem('index') + 1;
            localStorage.setItem('index', String(newId));
            let newUser: User = {
              'id': newId,
              'username': data.username,
              'password': data.password
            }
            this.userList.push(newUser);
            localStorage.setItem('users', JSON.stringify(this.userList));
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertEdit(user: User) {
    let index = this.userList.findIndex( u => u.id === user.id);
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
            this.userList[index] = changeUser;
            localStorage.setItem('users', JSON.stringify(this.userList));
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertTrash(user: User) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: '¿Desea eliminar a ' + user.username + '?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'danger',
        }, {
          text: 'Aceptar',
          cssClass: 'success',
          handler: () => {
            let index = this.userList.findIndex( u => u.id === user.id);
            this.userList.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(this.userList));
          }
        }
      ]
    });

    await alert.present();
  }
}
