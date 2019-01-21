import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class PageService {

  //eventually the config will be from the ABP.Settings object
  private _config = {
    Page: '/catalogItem',
    UserId: 1,
    Widgets: [
      {
        Name: 'Comp1Component',
        IsLoaded: false,
        Inputs: [{
          Source: 'Comp2Component',
          Event: 'Click',
        }]
      },
      {
        Name: 'Comp2Component',
        IsLoaded: false,
        Inputs: []
      },
      {
        Name: 'Comp3Component',
        IsLoaded: false,
        Inputs: [{
          Source: 'Comp2Component',
          Event: 'Click',
        }]
      }
    ]
  };


  private _allWidgetLoaded = new Subject<any>();
  private _subjects = []; 

  constructor()
  {

  }

  onAllWidgetLoaded() :Observable<any>
  {
    return this._allWidgetLoaded.asObservable();
  }
 
  widgetLoaded(name) :void
  {
    this._config.Widgets.find((f) => { return f.Name == name}).IsLoaded = true;

    if(this._config.Widgets.every((e) => { return e.IsLoaded }))
    {
      this._allWidgetLoaded.next();
    }
  }

  addSubject(source, event, subject) :void
  {
    this._subjects.push({
      Source: source,
      Event: event,
      Subject: subject
    });
  }

  getSubject(source, event) :Subject<any>
  {
    var sub = this._subjects.find((f) => { return f.Source == source && f.Event == event });
    if( sub != null){
      return sub.Subject;
    }
  }

  getComponentInputs(name){
    return this._config.Widgets.find((f) => { return f.Name == name }).Inputs;
  }

}