import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialPageComponent,
    MyProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
