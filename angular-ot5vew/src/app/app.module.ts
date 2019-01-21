import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Comp1Component } from './Components/comp1.component';
import { Comp2Component } from './Components/comp2.component';
import { Comp3Component } from './Components/comp3.component';
import { PageService } from './Services/PageService';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, Comp1Component, Comp2Component, Comp3Component ],
  bootstrap:    [ AppComponent ],
  providers: [ PageService ]
})
export class AppModule { }
