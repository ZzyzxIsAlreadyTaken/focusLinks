import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISelectedList {
  id: string;
  title: string;
  url: string;
}

export interface ILink {
  id: string;
  title: string;
  url: string;
  iconName: string;
}

export interface IFocusLinksProps {
  title: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  layout: "single" | "wrap" | "grid" | "list";
  selectedList: ISelectedList | null;
  context: WebPartContext;
  displayMode: DisplayMode;
}
