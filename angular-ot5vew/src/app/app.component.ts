import { Component, OnInit, AfterViewInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewChildren, QueryList, TemplateRef } from '@angular/core';
import { PageManager } from './Services/PageManager';
import { IWidgetUserConfig, IPageConfig } from './WidgetConfigs/widget-user-config';
import { ComponentMap } from './Services/ComponentMap';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  name = 'Angular';

  _config: IPageConfig;
  @ViewChildren('widgets', { read: ViewContainerRef }) widgets;

  constructor(private _pageManager: PageManager, private _componentFactoryResolver: ComponentFactoryResolver) {
    this._config = <IPageConfig>this._pageManager.getConfigForPage("test");
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //https://stackoverflow.com/questions/50109137/angular-dynamic-components-and-expressionchangedafterithasbeencheckederror
    //On doit différé l'exécution de la création des component dynamiquement, sinon puisqu'on le fait dans le afterviewinit
    //Et que dans les component on vas surement utiliser des variables dans les templates ça va donner des ExpressionChangedAfterItHasBeenCheckedError tout le temps
    Promise.resolve(null).then(() => this.renderWidgets());
  }

  renderWidgets(){
    for (let index = 0; index < this.widgets.length; index++) {

      let w = this._config.widgets[index];
      let comp = ComponentMap.Map.find((item) => { return item.Name == w.name });

      const factory = this._componentFactoryResolver.resolveComponentFactory(comp.Component);
      let componentRef = this.widgets.toArray()[index].createComponent(factory);
      //on passe les valeurs qu'on a sauvegarder dans la config aux components
      componentRef.instance.userConfig = w;
      componentRef.instance.guid = w.guid;
    }
  }


}
