import * as React from "react";
import { Panel, PanelType } from "@fluentui/react";
import { IconPicker } from "@pnp/spfx-controls-react/lib/IconPicker";

interface LinkFormProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const LinkForm = ({ isOpen, onDismiss }: LinkFormProps): JSX.Element => {
  const [selectedIcon, setSelectedIcon] = React.useState<string>("Link");

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Add New Link"
      type={PanelType.medium}
      isLightDismiss={true}
    >
      <div style={{ padding: "20px" }}>
        <form>
          <input type="text" placeholder="Title" />
          <input type="text" placeholder="URL" />
          <IconPicker
            buttonLabel={"Icon"}
            onChange={(iconName: string) => {
              setSelectedIcon(iconName);
            }}
            onSave={(iconName: string) => {
              setSelectedIcon(iconName);
            }}
          />
          <p>Selected Icon: {selectedIcon}</p>
          <button type="submit">Add</button>
        </form>
      </div>
    </Panel>
  );
};

export default LinkForm;
