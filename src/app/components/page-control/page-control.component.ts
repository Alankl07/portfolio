import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-control',
  templateUrl: './page-control.component.html',
  styleUrls: ['./page-control.component.css']
})
export class PageControlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  move(direction: string){
    this.responseClick(direction)
  }

  start(){
    this.responseClick('start')
  }

  actions(action: string){
    this.responseClick(action)
  }

  responseClick(id: string){
    const element = document.getElementById(id)
    if(element){
      element.style.opacity = '.3'
      element.style.transition = '.2s'
    setTimeout(() => {
      element.style.opacity = '1'
    }, 200);
    }
  }

}
