import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PageService } from '../Services/PageService';

@Component({
  selector: 'comp2',
  templateUrl: './comp2.component.html',
  styleUrls: [ ]
})
export class Comp2Component implements AfterViewInit, OnDestroy  {
  name = 'Angular';

  private _clickSubject = new Subject<any>();

  constructor(private _pageService: PageService){
    this._pageService.addSubject('Comp2Component', 'Click', this._clickSubject);
  }

  ngAfterViewInit()
  {
    this._pageService.widgetLoaded('Comp2Component');
  }

  ngOnDestroy()
  {
    this._clickSubject.complete();
  }

  click()
  {
    this._clickSubject.next();
  }

}

