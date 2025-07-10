import * as React from "react";
import styles from "./LinkCardList.module.scss";
import { LinkCard } from "./LinkCard";
import { ExampleLink } from "./exampleLinks";
import { ILink } from "./IFocusLinksProps";

interface LinkCardListProps {
  links: ExampleLink[] | ILink[];
  layout: "single" | "wrap" | "grid" | "list";
}

export const LinkCardList: React.FC<LinkCardListProps> = ({
  links,
  layout,
}) => {
  const getLayoutClassName = (): string => {
    switch (layout) {
      case "wrap":
        return styles.linkCardWrap;
      case "grid":
        return styles.linkCardGrid;
      case "list":
        return styles.linkCardList;
      case "single":
      default:
        return styles.linkCardColumn;
    }
  };

  return (
    <div className={getLayoutClassName()}>
      {links.map((link, idx) => (
        <LinkCard
          key={link.title + idx}
          iconName={link.iconName}
          title={link.title}
          url={link.url}
        />
      ))}
    </div>
  );
};
