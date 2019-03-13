import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PageManager, InputOutputKey } from '../Services/PageManager';
import { IWidget } from '../Interfaces/IWidget';
import { IWidgetConfig, InputActionTypeEnum } from '../WidgetConfigs/widget-config';
import { IWidgetUserConfig } from '../WidgetConfigs/widget-user-config';

@Component({
  selector: 'comp2',
  templateUrl: './comp2.component.html',
  styleUrls: [ ]
})
export class Comp2Component implements AfterViewInit, OnDestroy, IWidget  {

  pageManager: PageManager;
  widgetConfig: IWidgetConfig;
  userConfig: IWidgetUserConfig;
  guid: string;

  private _clickSubject = new Subject<any>();
  

  constructor(pageManager: PageManager){

    this.pageManager = pageManager;
  }

  ngAfterViewInit(){

    //ici notre widget doit aller voir dans la config et register les inputs qui sont demandé par d'autre widget de la page
    let requiredOutputByOtherWidgets = this.pageManager.getOutputToRegisterForWidget(this.guid);
    for (let index = 0; index < requiredOutputByOtherWidgets.length; index++) {
      
      let currentOutput = requiredOutputByOtherWidgets[index];

      //pour tout les output que les autres widget on besoin dans la page je dois rajouter le subject
      //qui correspond à cette output, afin que les autres widgets puisse ce subscribe
      if(currentOutput.dataField == "None" && currentOutput.inputActionType == InputActionTypeEnum.Refresh){
        let inputOutput =  new InputOutputKey(this.guid, "None", InputActionTypeEnum.Refresh, this._clickSubject);
        this.pageManager.addSubject(inputOutput);
      }
  
    }

    this.pageManager.widgetLoaded(this.guid);
  }

  ngOnDestroy(){

    this._clickSubject.complete();
  }

  click(){
    
    this._clickSubject.next();
  }

}

