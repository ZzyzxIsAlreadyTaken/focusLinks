import * as React from "react";
import styles from "./LinkCard.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";

export interface LinkCardProps {
  iconName: string;
  title: string;
  url: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({ iconName, title, url }) => {
  return (
    <a
      href={url}
      className={styles.linkCard}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
    >
      <span className={styles.iconWrapper}>
        <Icon iconName={iconName} aria-hidden="true" />
      </span>
      <span className={styles.linkText}>{title}</span>
    </a>
  );
};
