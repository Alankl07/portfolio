import { Component, OnInit } from '@angular/core';
import socket from 'src/socket/socket';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {

  constructor() { }
  idInterval: any
  controlConnect = false
  scoreboard = 0
  arrayPositions = [0, 6, 12, 18, 24, 30, 36, 42, 48]
  arrayColors = ['green', 'blue', 'yellow', 'red']
  pointColor: any = {
    'green': 10,
    'blue': 20,
    'yellow': 30,
    'red': 40
  }
  currentPositionPixel = {
    x: '0%',
    y: '0%',
    color: 'green',
    status: true
  }

  currentPositionPlay = {
    x: '0%',
    y: '0%',
    color: 'black',
  }

  TIME_SECOUND = 1000 * 7

  ngOnInit(): void {
    this.randomPosition()
    this.connectSocket()
  }

  ngOnDestroy() {
    clearInterval(this.idInterval)
  }

  changeScreen() {
    const elementScreen = document.getElementById('pressStart')
    const elementDivPixel = document.getElementById('divPixel')
    if (elementScreen) {
      elementScreen.style.display = 'none'
    }
    if (elementDivPixel) {
      elementDivPixel.style.opacity = '1'
    }
  }

  changePosition() {
    this.idInterval = setInterval(() => {
      this.randomPosition()
      this.movePixel2()
    }, this.TIME_SECOUND)
  }

  randomPosition() {
    const indexPositionX = Math.round(Math.random() * (1 - this.arrayPositions.length) + this.arrayPositions.length) - 1
    const indexPositionY = Math.round(Math.random() * (1 - this.arrayPositions.length) + this.arrayPositions.length) - 1
    const positiverOrNegativeX = Number(Math.random().toFixed(0)) ? '-' : ''
    const positiverOrNegativeY = Number(Math.random().toFixed(0)) ? '-' : ''
    const indexColor = Math.round(Math.random() * (1 - this.arrayColors.length) + this.arrayColors.length) - 1
    this.currentPositionPixel.x = `${positiverOrNegativeX}${this.arrayPositions[indexPositionX]}%`
    this.currentPositionPixel.y = `${positiverOrNegativeY}${this.arrayPositions[indexPositionY]}%`
    this.currentPositionPixel.color = this.arrayColors[indexColor]
  }

  connectSocket() {
    socket.on('controlConect', () => {
      document.getElementById('showTv')?.click()
    })

    socket.on('actionMove', (data: any) => {
      this.actionMove(data.key)
    })

    socket.on('actionButton', (data: any) => {
      this.changeColor(data.key)
    })

    socket.on('startGame', (data: any) => {
      this.startGame()
    })

    socket.on('disconect', (data: any) => {
      document.getElementById('showQrCode')?.click()
      this.controlConnect = false
    })
  }

  startGame() {
    this.changeScreen()
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

  checkMove() {
    if (
      this.currentPositionPixel.status
      && this.currentPositionPixel.x == this.currentPositionPlay.x
      && this.currentPositionPixel.y == this.currentPositionPlay.y
      && this.currentPositionPixel.color == this.currentPositionPlay.color
    ) {
      this.removePixel2()
    }
  }

  removePixel2() {
    const element = document.getElementById('divPixel2')
    if (element) {
      const elementScoreboard = document.getElementById('scoreboard')
      if (elementScoreboard) {
        this.scoreboard = this.scoreboard + this.pointColor[this.currentPositionPlay.color]
        elementScoreboard.innerHTML = `${this.scoreboard}`
      }
      element.style.opacity = '0'
      this.currentPositionPixel.status = false
    }
  }

  movePixel2() {
    const element = document.getElementById('divPixel2')
    if (element) {
      this.currentPositionPixel.status = true
      element.style.opacity = '1'
      element.style.top = this.currentPositionPixel.y
      element.style.left = this.calcDiff()
      element.style.backgroundColor = this.currentPositionPixel.color
    }
  }

  calcDiff() {
    let value
    if (this.currentPositionPixel.x.includes('-')) {
      value = this.currentPositionPixel.x.split('-').join("").split("%").join("")
      return `-${(Number(value) + 1.9)}%`
    }
    value = this.currentPositionPixel.x.split("%").join("")
    return `${(Number(value) - 1.9)}%`
  }

  moveUp(element: HTMLElement) {
    const position = Number(element.style.top.split('%')[0]) - 6
    if (!this.checkIfCanMove(position)) return
    element.style.top = `${position}%`
    this.currentPositionPlay.y = element.style.top
  }

  moveLeft(element: HTMLElement) {
    const position = Number(element.style.left.split('%')[0]) - 6
    if (!this.checkIfCanMove(position)) return
    element.style.left = `${position}%`
    this.currentPositionPlay.x = element.style.left
  }

  moveRight(element: HTMLElement) {
    const position = Number(element.style.left.split('%')[0]) + 6
    if (!this.checkIfCanMove(position)) return
    element.style.left = `${position}%`
    this.currentPositionPlay.x = element.style.left
  }

  moveDown(element: HTMLElement) {
    const position = Number(element.style.top.split('%')[0]) + 6
    if (!this.checkIfCanMove(position)) return
    element.style.top = `${position}%`
    this.currentPositionPlay.y = element.style.top
  }

  changeColor(color: string) {
    const element = document.getElementById('divPixel')
    if (element) {
      element.style.backgroundColor = color
      this.currentPositionPlay.color = color
      this.checkMove()
    }
  }

  checkIfCanMove(value: number) {
    if (Math.abs(value) > 48) return false
    return true
  }

}
