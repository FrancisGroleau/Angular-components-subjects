import { IWidgetConfig } from "../WidgetConfigs/widget-config";
import { IWidgetUserConfig } from "../WidgetConfigs/widget-user-config";
import { PageManager } from "../Services/PageManager";

export interface IWidget{
    pageManager: PageManager;
    widgetConfig: IWidgetConfig;
    userConfig: IWidgetUserConfig;
    guid: string;
}