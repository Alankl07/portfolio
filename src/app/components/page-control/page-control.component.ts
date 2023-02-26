import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import socket from 'src/socket/socket';
// import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-page-control',
  templateUrl: './page-control.component.html',
  styleUrls: ['./page-control.component.css']
})
export class PageControlComponent implements OnInit {

  constructor() { }

  url = environment.url

  ngOnInit(): void {
    this.emitTheConnection()
  }
  
  emitTheConnection(){
    socket.emit("controlConect")
  }

  actionMove(direction: string) {
    socket.emit('actionMove', { key: direction })
    this.responseClick(direction)
  }

  actionButton(direction: string) {
    socket.emit('actionButton', { key: direction })
    this.responseClick(direction)
  }

  start() {
    socket.emit('startGame')
    this.responseClick('start')
  }

  actions(action: string) {
    this.actionButton(action)
    this.responseClick(action)
  }

  responseClick(id: string) {
    const element = document.getElementById(id)
    if (element) {
      element.style.opacity = '.3'
      element.style.transition = '.2s'
      setTimeout(() => {
        element.style.opacity = '1'
      }, 200);
    }
  }

}
