import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

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

  constructor(public alertController: AlertController){}

  alarms: Array<{title: string, time: any, repetition: string, on: boolean}> = []

  createAlarm(){    
    this.alarms.push({'title': this.title, 'time': this.time, 'repetition': this.repetition, 'on': true})
    this.create = false
  }

  alarmPrompt(){
    this.create = true
  }
}
