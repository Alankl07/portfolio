import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WabSocketService {
  
  socket: any


  listen(eventName: string) {
    return new Observable((subscribe) => {
      this.socket.emit(eventName, (data: any) => {
        console.log('connect', data);
        
        subscribe.next(data)
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }

}
