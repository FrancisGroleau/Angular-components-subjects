export interface IWidgetConfig {
  inputs: IWidgetInputOutput[];
  name: string;
  pages: string[];
  outputs: IWidgetInputOutput[];
}
export interface IWidgetDataGridConfig extends IWidgetConfig {
  columns: IWidgetDataGridColumn[];
  filters: string[];
}


export enum FilterOperatorEnum { Equal, NotEqual, GreaterThan, GreaterThanOrEqual, LessThan, LessThanOrEqual, Contains, StartWith, EndWith }
export enum DataTypeEnum { Number, String, Date, Void}
export enum InputTypeEnum { Action, Filter }
export enum InputActionTypeEnum { Refresh }
export interface IWidgetInputOutput {
  dataField: string;
  dataType: DataTypeEnum;
  inputActionType?: InputActionTypeEnum;
  inputType: InputTypeEnum;
  isRequired: boolean;
}
export interface IWidgetDataGridColumn{
  allowFiltering: boolean;
  allowSorting: boolean;
  dataField: string; 
  dataType: DataTypeEnum;
  localizationKey: string;
}


