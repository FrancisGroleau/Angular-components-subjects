import { Component, AfterViewInit } from '@angular/core';
import { PageManager, InputOutputKey } from '../Services/PageManager';
import { IWidgetConfig, DataTypeEnum, InputActionTypeEnum } from '../WidgetConfigs/widget-config';
import { IWidgetUserConfig } from '../WidgetConfigs/widget-user-config';
import { WidgetComp2Config } from './comp2.widgetconfig';

@Component({
  selector: 'comp3',
  templateUrl: './comp3.component.html',
  styleUrls: [ ]
})

export class Comp3Component implements AfterViewInit {
  
  pageManager: PageManager;
  widgetConfig: IWidgetConfig;
  userConfig: IWidgetUserConfig;
  guid: string;

  _counter = 0;
  
  constructor(pageManager: PageManager)
  {
    this.pageManager = pageManager;

    this.pageManager.onAllWidgetLoaded().subscribe(() => this.allWidgetLoaded());

    this.widgetConfig = new WidgetComp2Config();
  }  

  allWidgetLoaded(){

    for (var i = 0; i < this.userConfig.inputs.length; i++) {

      var currentInput = this.userConfig.inputs[i];
      let inputOut = new InputOutputKey(currentInput.sourceGuid, currentInput.dataField, currentInput.inputActionType); 
      var subject = this.pageManager.getSubject(inputOut);

      if(currentInput.dataField == 'None' && currentInput.dataType == DataTypeEnum.Void && currentInput.inputActionType == InputActionTypeEnum.Refresh)
      {
        subject.asObservable().subscribe(() => this.clickCallBack());
      } 
    }
  }

  ngAfterViewInit() {
    this.pageManager.widgetLoaded(this.guid);
  }

  clickCallBack(){
    this._counter++;
  }

}