import { IWidgetDataGridConfig, IWidgetDataGridColumn, IWidgetInputOutput, DataTypeEnum, InputTypeEnum } from "../WidgetConfigs/widget-config";

//EXEMPLE D'IMPLÉMENTAITON
//Détermine les configurations possibles
//Les colonnes disponibles
//Les inputs disponibles
//Les outputs disponibles
//Les pages dans lesqueles peuvent être disponible le widget
export enum WidgetComp1DataFieldEnum { Label, Title, Date, None };
export class WidgetComp2Config implements IWidgetDataGridConfig
{
  columns: IWidgetDataGridColumn[];
  filters: string[];
  inputs: IWidgetInputOutput[];
  name: string = "Comp2Component";
  outputs: IWidgetInputOutput[];
  pages: string[];

  constructor(){
    this.columns = [{
      allowFiltering: true,
      allowSorting: true,
      dataField: "Label",
      dataType: DataTypeEnum.String,
      localizationKey : "Common.Column.Label",
    },{
      allowFiltering: true,
      allowSorting: true,
      dataField: "Date",
      dataType: DataTypeEnum.Date,
      localizationKey : "Concepts.X.Column.Date",
    },{
      allowFiltering: true,
      allowSorting: true,
      dataField: "Title",
      dataType: DataTypeEnum.String,
      localizationKey : "Concepts.X.Column.Title"
    }];
    this.inputs = [{
      dataField: "Label",
      dataType: DataTypeEnum.String,
      inputType: InputTypeEnum.Filter,
      isRequired: false,
    },{
      dataField: "Date",
      dataType: DataTypeEnum.Date,
      inputType: InputTypeEnum.Filter,
      isRequired: false,
    },{
      dataField: "Title",
      dataType: DataTypeEnum.String,
      inputType: InputTypeEnum.Filter,
      isRequired: false,
    }];
    this.outputs = [{
      dataField: "Date",
      dataType: DataTypeEnum.Date,
      inputType: InputTypeEnum.Filter,
      isRequired: false,
    }];
    //Représente les dataField qui sont filtrer dans la recherche simple
    this.filters = ["Label", "Title"];
    //les pages pour lesquelles ce widget peut être utiliser!
    this.pages = ["CatalogItems"];
  }
}