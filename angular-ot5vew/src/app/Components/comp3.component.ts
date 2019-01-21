import { Component, AfterViewInit } from '@angular/core';
import { PageService } from '../Services/PageService';

@Component({
  selector: 'comp3',
  templateUrl: './comp3.component.html',
  styleUrls: [ ]
})

export class Comp3Component implements AfterViewInit {
  _counter = 0;

  _inputs = [];

  constructor(private _pageService: PageService)
  {

    this._pageService.onAllWidgetLoaded().subscribe(() =>{ this.allWidgetLoaded() });
    this._inputs = _pageService.getComponentInputs('Comp3Component');

  }  

  getInputs()
  {
    return this._inputs;
  }

  allWidgetLoaded()
  {

    var length = this._inputs.length;
    for (var i = 0; i < length; i++) {

      var currentInput = this._inputs[i];
      var subject = this._pageService.getSubject(currentInput.Source, currentInput.Event);

      if(currentInput.Event == 'Click')
      {
        subject.asObservable().subscribe(() => { this.ClickCallBack() });
      }
      
    }
  }

  ngAfterViewInit() {
    this._pageService.widgetLoaded('Comp3Component');
  }

  ClickCallBack()
  {
    this._counter++;
  }

}