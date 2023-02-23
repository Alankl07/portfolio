import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { GameAreaComponent } from './components/game-area/game-area.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PageControlComponent } from './components/page-control/page-control.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InitialPageComponent,
    MyProjectsComponent,
    GameAreaComponent,
    PageControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
