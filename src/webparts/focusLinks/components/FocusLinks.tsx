import * as React from "react";
import styles from "./FocusLinks.module.scss";
import type { IFocusLinksProps, ILink } from "./IFocusLinksProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { exampleLinks } from "./exampleLinks";
import { LinkCardList } from "./LinkCardList";
import { getListItems } from "../services/PnPConnection";

const FocusLinks: React.FC<IFocusLinksProps> = (props) => {
  const {
    description,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    layout,
    selectedList,
    context,
  } = props;

  const [listLinks, setListLinks] = React.useState<ILink[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch items from the selected list
  React.useEffect(() => {
    const fetchListItems = async (): Promise<void> => {
      if (!selectedList || !context) {
        setListLinks([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const items = await getListItems(context, selectedList.id);
        console.log("Raw SharePoint items:", items);

        // Convert SharePoint items to ILink format
        const links: ILink[] = items.map((item: any) => ({
          id: item.Id?.toString() || "",
          title: item.Title || "Untitled",
          url: item.Url || "#",
          iconName: item.iconName || "Link",
        }));

        setListLinks(links);
      } catch (err) {
        console.error("Error fetching list items:", err);
        setError("Failed to load list items");
        setListLinks([]);
      } finally {
        setIsLoading(false);
      }
    };

    // eslint-disable-next-line no-void
    void fetchListItems();
  }, [selectedList, context]);

  return (
    <section
      className={`${styles.focusLinks} ${hasTeamsContext ? styles.teams : ""}`}
    >
      <div className={styles.welcome}>
        <img
          alt=""
          src={
            isDarkTheme
              ? require("../assets/welcome-dark.png")
              : require("../assets/welcome-light.png")
          }
          className={styles.welcomeImage}
        />
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
        <div>
          Web part property value: <strong>{escape(description)}</strong>
        </div>
      </div>

      {/* Example LinkCards for testing */}
      <div>
        <h3>Example Quick Links</h3>
        <LinkCardList links={exampleLinks} layout={layout} />
      </div>

      {/* Display items from selected list */}
      {selectedList && (
        <div>
          <h3>Links from: {selectedList.title}</h3>
          {console.log("Lenke liste", listLinks)}
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!isLoading && !error && listLinks.length > 0 && (
            <LinkCardList links={listLinks} layout={layout} />
          )}
          {!isLoading && !error && listLinks.length === 0 && (
            <p>No items found in this list.</p>
          )}
        </div>
      )}

      {/* Display selected list information */}
      {selectedList && (
        <div>
          <h3>Selected List</h3>
          <p>List ID: {selectedList.id}</p>
          <p>List Title: {selectedList.title}</p>
          <p>List URL: {selectedList.url}</p>
        </div>
      )}
    </section>
  );
};

export default FocusLinks;
