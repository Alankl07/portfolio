import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import socket from 'src/socket/socket';
import { PageControlComponent } from '../page-control/page-control.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {

  constructor() { }
  idInterval: any
  controlConnect = false
  arrayPositions = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48]
  currentPositionPixel = {
    x: '0%',
    y: '0%',
    status: true
  }

  currentPositionPlay = {
    x: '0%',
    y: '0%'
  }

  TIME_10_SECOUND = 1000 * 10

  ngOnInit(): void {
    this.randomPosition()
    this.connectSocket()
  }

  ngOnDestroy(){
    clearInterval(this.idInterval)
  }

  changePosition(){
    this.idInterval = setInterval(() => {
      console.log('ChangePosition'); 
      this.randomPosition()
      this.movePixel2()
    }, this.TIME_10_SECOUND)
  }

  randomPosition(){
    const indexPositionX = Math.round(Math.random() * (1 - this.arrayPositions.length) + this.arrayPositions.length) - 1
    const indexPositionY = Math.round(Math.random() * (1 - this.arrayPositions.length) + this.arrayPositions.length) - 1
    const positiverOrNegativeX = Number(Math.random().toFixed(0)) ? '-' : ''
    const positiverOrNegativeY = Number(Math.random().toFixed(0)) ? '-' : ''
    this.currentPositionPixel.x = `${positiverOrNegativeX}${this.arrayPositions[indexPositionX]}%`
    this.currentPositionPixel.y = `${positiverOrNegativeY}${this.arrayPositions[indexPositionY]}%`
  }

  connectSocket() {
    socket.on('controlConect', () => {
      document.getElementById('showTv')?.click()
    })

    socket.on('actionMove', (data: any) => {
      this.actionMove(data.key)
      console.log("actionMove ", data)
    })

    socket.on('actionButton', (data: any) => {
      this.changeColor(data.key)
      console.log("actionButton ", data)
    })

    socket.on('startGame', (data: any) => {
      this.startGame()
      console.log("startGame ", data)
    })

    socket.on('disconect', (data: any) => {
      document.getElementById('showQrCode')?.click()
      console.log("disconect ", data)
      this.controlConnect = false
    })
  }

  startGame() {
    this.movePixel2()
    this.changePosition()
  }

  showTv() {
    this.controlConnect = true
  }

  showQrCode() {
    this.controlConnect = false
  }

  actionMove(position: string) {
    const element = document.getElementById('divPixel')
    if (element) {
      switch (position) {
        case 'up':
          this.moveUp(element)
          break;
        case 'left':
          this.moveLeft(element)
          break;
        case 'right':
          this.moveRight(element)
          break;
        default:
          this.moveDown(element)
          break;
      }
    }
    this.checkMove()
  }

  checkMove(){
    if( this.currentPositionPixel.status && this.currentPositionPixel.x == this.currentPositionPlay.x && this.currentPositionPixel.y == this.currentPositionPlay.y){
      this.removePixel2()
    }
  }

  removePixel2(){
    const element = document.getElementById('divPixel2')
    if(element){
      element.style.opacity = '0'
      this.currentPositionPixel.status = false
    }
  }

  movePixel2(){
    const element = document.getElementById('divPixel2')
    if(element){
      this.currentPositionPixel.status = true
      element.style.opacity = '1'
      element.style.top = this.currentPositionPixel.y
      element.style.left = this.calcDiff()
    }

    console.log('this.currentPositionPixel ', this.currentPositionPixel);
    
  }

  calcDiff(){
    let value
    if(this.currentPositionPixel.x.includes('-')){
      value = this.currentPositionPixel.x.split('-').join("").split("%").join("")
      return `-${(Number(value) + 1.9)}%`
    }
    value = this.currentPositionPixel.x.split("%").join("")
    return `${(Number(value) - 1.9)}%`
  }

  moveUp(element: HTMLElement) {
    const position = Number(element.style.top.split('%')[0]) - 3
    if(!this.checkIfCanMove(position)) return
    element.style.top = `${position}%`
    this.currentPositionPlay.y = element.style.top
  }

  moveLeft(element: HTMLElement) {
    const position = Number(element.style.left.split('%')[0]) - 3
    if(!this.checkIfCanMove(position)) return
    element.style.left = `${position}%`
    this.currentPositionPlay.x = element.style.left
  }

  moveRight(element: HTMLElement) {
    const position = Number(element.style.left.split('%')[0]) + 3
    if(!this.checkIfCanMove(position)) return
    element.style.left = `${position}%`
    this.currentPositionPlay.x = element.style.left
  }

  moveDown(element: HTMLElement) {
    const position = Number(element.style.top.split('%')[0]) + 3
    if(!this.checkIfCanMove(position)) return
    element.style.top = `${position}%`
    this.currentPositionPlay.y = element.style.top
  }

  changeColor(color: string){
    const element = document.getElementById('divPixel')
    if(element){
      element.style.backgroundColor = color
    }
  }

  checkIfCanMove(value: number) {
    if (Math.abs(value) > 48) return false
    return true    
  }

}
