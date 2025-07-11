import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { PropertyFieldListPicker } from "@pnp/spfx-property-controls";

import * as strings from "FocusLinksWebPartStrings";
import FocusLinks from "./components/FocusLinks";
import { IFocusLinksProps, ISelectedList } from "./components/IFocusLinksProps";

export interface IFocusLinksWebPartProps {
  title: string;
  layout: "single" | "wrap" | "grid" | "list";
  selectedList: ISelectedList | null;
}

export default class FocusLinksWebPart extends BaseClientSideWebPart<IFocusLinksWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<IFocusLinksProps> = React.createElement(
      FocusLinks,
      {
        title: this.properties.title,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        layout: this.properties.layout || "wrap",
        selectedList: this.properties.selectedList || null,
        context: this.context,
        displayMode: this.displayMode,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
            case "TeamsModern":
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
                PropertyPaneDropdown("layout", {
                  label: "Layout",
                  options: [
                    { key: "wrap", text: "Wrap" },
                    { key: "grid", text: "Grid" },
                    { key: "list", text: "List" },
                  ],
                }),
                PropertyFieldListPicker("selectedList", {
                  label: "Select List",
                  key: "selectedList",
                  selectedList: this.properties.selectedList
                    ? this.properties.selectedList.id
                    : undefined,
                  includeHidden: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  deferredValidationTime: 0,
                  includeListTitleAndUrl: true,
                  baseTemplate: 100, // Filtering on custom list template
                }),
              ],
            },
          ],
        },
      ],
    };
  }

  public onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    if (
      propertyPath === "selectedList" &&
      newValue &&
      typeof newValue === "object"
    ) {
      this.properties.selectedList = {
        id: newValue.id,
        title: newValue.title,
        url: newValue.url,
      };
    }
    this.context.propertyPane.refresh();
    this.render();
  }
}
