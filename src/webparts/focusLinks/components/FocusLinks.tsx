import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./FocusLinks.module.scss";
import type { IFocusLinksProps, ILink } from "./IFocusLinksProps";
import { exampleLinks } from "./exampleLinks";
import { LinkCardList } from "./LinkCardList";
import { getListItems } from "../services/PnPConnection";
import { DisplayMode } from "@microsoft/sp-core-library";
import LinkForm from "./LinkForm";
import { PrimaryButton } from "@fluentui/react";

const FocusLinks = (props: IFocusLinksProps): JSX.Element => {
  const { hasTeamsContext, layout, selectedList, context, displayMode } = props;

  const [listLinks, setListLinks] = useState<ILink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkFormIsOpen, setLinkFormIsOpen] = useState(false);
  const activeTest = false;

  const editMode = displayMode === DisplayMode.Edit;
  // Fetch items from the selected list
  useEffect(() => {
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
      {editMode && (
        <PrimaryButton onClick={() => setLinkFormIsOpen(true)}>
          Add New Link
        </PrimaryButton>
      )}
      <LinkForm
        isOpen={linkFormIsOpen}
        onDismiss={() => {
          setLinkFormIsOpen(false);
        }}
      />
      {/* Example LinkCards for testing */}
      {!selectedList && (
        <div>
          <h3>Example Quick Links</h3>
          <LinkCardList links={exampleLinks} layout={layout} />
        </div>
      )}
      {/* Display items from selected list */}
      {selectedList && (
        <div>
          <h3>{props.title}</h3>
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

      {/* DEBUG INFORMATION - Display selected list information */}
      {selectedList && activeTest && (
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
