import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { IWidgetUserConfig, IPageConfig, SortingEnum } from '../WidgetConfigs/widget-user-config';
import { DataTypeEnum, InputTypeEnum, InputActionTypeEnum } from '../WidgetConfigs/widget-config';

export class InputOutputKey
{
  sourceGuid: string;
  dataField: string;
  inputActionType: InputActionTypeEnum;
  subject: Subject<any>;

  constructor(pSourceGuid: string, pDataField: string, pInputActionType?: InputActionTypeEnum, pSubject?: Subject<any>)
  {
    this.sourceGuid = pSourceGuid;
    this.dataField = pDataField;
    this.inputActionType = pInputActionType;
    this.subject = pSubject;
  }
}


@Injectable()
export class PageManager {

  //Exemple de config qu'on retrouverais 
  //La clef pour le settings serais par user par page
  //
  //TODO get the config from PageService.GetWidgetForPage()
  //that will get it from abp.settings
  private _config = { 
    widgets: [
      {
        guid: "b86678c5-3a34-43d1-9535-1eb5d5031ba2",
        name: "Comp1Component",
        defaultUserFilters : ["Label",  "Title"],
        columns: [{
          Datafield: "Label",
          Sort: SortingEnum.Ascending
        },
        {
          Datafield: "Title",
          Sort: SortingEnum.Ascending
        }],
        inputs: [{
          dataField: "Label",
          dataType: DataTypeEnum.String,
          inputType: InputTypeEnum.Filter,
          sourceGuid: "bed60ccd-eaee-4394-b43e-8c0542697467"
        },
        {
          dataField: "None",
          dataType: DataTypeEnum.Void,
          inputType: InputTypeEnum.Action,
          inputActionType: InputActionTypeEnum.Refresh,
          sourceGuid: "bed60ccd-eaee-4394-b43e-8c0542697467"
        }]
      },
      {
        guid: "bed60ccd-eaee-4394-b43e-8c0542697467",
        name: 'Comp2Component',
        defaultUserFilters : [],
        inputs: [],
      },
      {
        guid: "f1999d95-8854-4f34-b438-4a80cdbdce51",
        name: 'Comp3Component',
        defaultUserFilters: [],
        inputs: [{
          dataField: "None",
          dataType: DataTypeEnum.Void,
          inputType: InputTypeEnum.Action,
          inputActionType: InputActionTypeEnum.Refresh,
          sourceGuid: "bed60ccd-eaee-4394-b43e-8c0542697467"
        }]
      }
    ]
  };


  private _allWidgetLoaded = new Subject<any>();
  private _subjects : InputOutputKey[] = []; 
  private _widgetInstanciation = [];

  constructor(){
    //TODO: aller chercher les widget-config de la page
    //assigner le _numberOfWidgetInPage
  }

  onAllWidgetLoaded() :Observable<any>{

    return this._allWidgetLoaded.asObservable();
  }
 
  widgetLoaded(pGuid: string) :void{

    this._widgetInstanciation.find((f) => { return f.guid == pGuid}).isLoaded = true;

    if(this._widgetInstanciation.every((e) => { return e.isLoaded })){
      this._allWidgetLoaded.next();
    }

  }

  addSubject(pInputOutputKey: InputOutputKey) :void{
    this._subjects.push(pInputOutputKey);
  }

  getSubject(pInputOutputKey: InputOutputKey) :Subject<any>{
    var sub = this._subjects.find((f) => { return f.sourceGuid == pInputOutputKey.sourceGuid && f.dataField == pInputOutputKey.dataField && f.inputActionType == pInputOutputKey.inputActionType });
    if( sub != null){
      return sub.subject;
    }
  }


  getConfigForPage(pPage: string): any{
    //TODO aller chercher dans abp
    //this._config = abp.settings("")

    //on vas mettre tout les widgets a loaded a false, afin que par la suite les widgets eux même se "load" un a un pour pouvoir lancer le onAllWidgetLoaded plus haut
    this._config.widgets.forEach((f) => { this._widgetInstanciation.push({guid: f.guid, isLoaded: false }); });

    return this._config;
  }

  getOutputToRegisterForWidget(pSourceGuid: string){
    //on vas aller voir dans tout les inputs des widget si notre pSourceGuid si trouve
    //ça veut dire qu'un autre widget dans la page a besoin d'un de nos output, on a donc alors besoin de le register

    let outputs = [];
    if(this._config){
      this._config.widgets.forEach((widget) => {

        //on vas chercher tout les inputs dans tout les widget qui ont mon guid comme source, ça veut dire qu'il
        //ont besoin de mes outputs.
        let inputs = widget.inputs.filter(input => input.sourceGuid == pSourceGuid);

        inputs.forEach((i) => {
          
          if(outputs.findIndex(f => f.dataField == i.dataField && f.inputActionType == i.inputActionType && f.widgetGuid == widget.guid) == -1 ){

            outputs.push({
              dataField: i.dataField,
              inputActionType: i.inputActionType,
              widgetGuid: widget.guid
            });
  
          }
          
        });

    
      });
    }

    return outputs;
  }


  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }

}