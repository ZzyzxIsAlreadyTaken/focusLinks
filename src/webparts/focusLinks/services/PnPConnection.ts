import { spfi, SPFx } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface IListInfo {
  id: string;
  title: string;
  url: string;
}

// Get all lists from the current web
export const getLists = async (
  context: WebPartContext
): Promise<IListInfo[]> => {
  try {
    const sp = spfi().using(SPFx(context)) as any;
    const lists = await sp.web.lists.filter("Hidden eq false").get();
    return lists.map((list: any) => ({
      id: list.Id,
      title: list.Title,
      url: list.DefaultViewUrl,
    }));
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
};

// Get items from a specific list by ID
export const getListItems = async (
  context: WebPartContext,
  listId: string
): Promise<any[]> => {
  if (!context) {
    console.error("SPFx context is undefined!");
    return [];
  }
  try {
    const sp = spfi().using(SPFx(context));
    console.log("sp object:", sp);
    // Try logging sp.web to see if it's defined
    console.log("sp.web:", sp.web);
    const items = await sp.web.lists.getById(listId).items();
    return items;
  } catch (error) {
    console.error("Error fetching list items:", error);
    return [];
  }
};

// Get a list by its title
export const getListByTitle = async (
  context: WebPartContext,
  listTitle: string
): Promise<any> => {
  try {
    const sp = spfi().using(SPFx(context)) as any;
    const list = await sp.web.lists.getByTitle(listTitle).get();
    return list;
  } catch (error) {
    console.error("Error fetching list by title:", error);
    return null;
  }
};

// Get items from a list by title
export const getListItemsByTitle = async (
  context: WebPartContext,
  listTitle: string,
  select: string[] = ["*"]
): Promise<any[]> => {
  try {
    const sp = spfi().using(SPFx(context)) as any;
    const items = await sp.web.lists
      .getByTitle(listTitle)
      .items.select(...select)
      .get();
    return items;
  } catch (error) {
    console.error("Error fetching list items by title:", error);
    return [];
  }
};
