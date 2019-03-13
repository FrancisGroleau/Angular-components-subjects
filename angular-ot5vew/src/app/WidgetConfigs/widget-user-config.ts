import{ IWidgetInputOutput, DataTypeEnum, InputTypeEnum, IWidgetConfig } from './widget-config'


export interface IWidgetInputOutputUser extends IWidgetInputOutput {
  sourceGuid: string;
}

export interface IWidgetUserConfig{
  guid: string;
  name: string;
  defaultUserFilters: string[];
  inputs: IWidgetInputOutputUser[];
}

export interface IWidgetDataGridUserConfig extends IWidgetUserConfig{ 
  columns: IWidgetDataGridColumnConfig[];
}

export interface IPageConfig{
  widgets: IWidgetUserConfig[];
}

export enum SortingEnum { Ascending, Descending }
export interface IWidgetDataGridColumnConfig{
  dataField: string;
  sorting: SortingEnum;
}
