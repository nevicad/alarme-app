import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  create: boolean = false

  time: Date = new Date()
  title: string = ''
  repetition: string = 'una vez'

  constructor(
    public alertController: AlertController, 
    private backend: BackendService,
    private toastController: ToastController,
    ){}

  alarms: Array<{title: string, time: any, repetition: string, on: boolean}> = []

  async createAlarm(){
    const alarm = {'title': this.title, 'time': this.time, 'repetition': this.repetition, 'on': true}
    const response = await this.backend.postAlarm(alarm);

    if (response.status){
      this.alarms.push(alarm)
      this.create = false

      this.presentToast('Alarma agregada')
    } else {
      this.presentToast('No se pudo agregar alarma')
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  alarmPrompt(){
    this.create = true
  }
}
