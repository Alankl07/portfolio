import { Component, OnInit } from '@angular/core';
import { testeFle } from 'src/app/utils/allFilesImports';

interface ProjectInterface{
  image: string,
  nameProject: string,
  description: string,
  gitHub?: string,
  linkPage?: string
}

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {

  constructor() { }

  arrowLeft = '<'

  projectShow = 0

  projects: ProjectInterface[] = [
    {
      image: testeFle,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas facilis laborum id repellat, eum nisi ea placeat similique ab aut numquam, sunt explicabo ipsum molestias dolorem quisquam! Voluptatum, cum consequuntur!',
      nameProject: 'AR Modas',
      gitHub: 'https://github.com/Alankl07',
      linkPage: 'https://google.com'
    },
    {
      image: testeFle,
      description: 'TEste Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas facilis laborum id repellat, eum nisi ea placeat similique ab aut numquam, sunt explicabo ipsum molestias dolorem quisquam! Voluptatum, cum consequuntur!',
      nameProject: 'Teste Modas',
      gitHub: 'https://github.com/Alankl07',
      linkPage: 'https://google.com'
    }
  ]

  ngOnInit(): void {
  }

  goBack(){
    if(!this.projectShow) this.projectShow = this.projects.length - 1
    else this.projectShow--
  }

  next(){
    if(this.projectShow >= (this.projects.length - 1)) this.projectShow = 0
    else this.projectShow++
  }

}
