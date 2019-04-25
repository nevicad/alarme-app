import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as environment from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  data: Observable<any>
  constructor(public http: HttpClient) { }

  public postAlarm(alarm: {title: string, time: any, repetition: string, on: boolean}): Promise<any>{
    return new Promise((response)=>{
      //console.log(encodeURI(JSON.stringify(forms)))
      //console.log(encodeURI(JSON.stringify(forms)))
      console.log(alarm)
      this.http.post(`${environment.backendAddress}/alarms`, alarm).subscribe(
        data => response({status: true, data: data}),
        error => response({status: false, error: error})
      )
    })
  }
}
