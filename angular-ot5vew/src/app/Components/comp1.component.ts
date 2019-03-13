import { Component, AfterViewInit } from '@angular/core';
import { PageManager, InputOutputKey } from '../Services/PageManager';
import { IWidget } from '../Interfaces/IWidget';
import { IWidgetConfig, DataTypeEnum, InputActionTypeEnum } from '../WidgetConfigs/widget-config';
import { IWidgetUserConfig } from '../WidgetConfigs/widget-user-config';
import { WidgetComp1Config } from './comp1.widgetconfig';


@Component({
  selector: 'comp1',
  templateUrl: './comp1.component.html',
  styleUrls: [ ]
})

export class Comp1Component implements AfterViewInit, IWidget {

  pageManager: PageManager;
  widgetConfig: IWidgetConfig;
  userConfig: IWidgetUserConfig;
  guid: string;

  _counter = 0;


  constructor(pageManager: PageManager)
  {
    this.pageManager = pageManager;

    this.pageManager.onAllWidgetLoaded().subscribe(() => this.allWidgetLoaded());

    this.widgetConfig = new WidgetComp1Config();
  }  

  allWidgetLoaded()
  {

    for (var i = 0; i < this.userConfig.inputs.length; i++) {

      var currentInput = this.userConfig.inputs[i];
      let inputOut = new InputOutputKey(currentInput.sourceGuid, currentInput.dataField, currentInput.inputActionType ); 
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