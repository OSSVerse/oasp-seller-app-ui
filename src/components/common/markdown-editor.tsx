import { useContext, useState } from "react";
import MDEditor, { commands, EditorContext } from "@uiw/react-md-editor";

// customer icons
import {
  FontBoldIcon,
  FontItalicIcon,
  TableIcon,
  ImageIcon,
  StrikethroughIcon,
  QuoteIcon,
  CodeIcon,
  Link2Icon,
  DividerVerticalIcon,
  HeadingIcon,
  StretchHorizontallyIcon,
  ListBulletIcon,
  QuestionMarkCircledIcon,
  EnterFullScreenIcon,
} from "@radix-ui/react-icons";

// customer icon for command
const boldCommand = {
  ...commands.bold,
  icon: <FontBoldIcon />,
};

const italicCommand = {
  ...commands.italic,
  icon: <FontItalicIcon />,
};
const tableCommand = {
  ...commands.table,
  icon: <TableIcon />,
};
const imageCommand = {
  ...commands.image,
  icon: <ImageIcon />,
};
const strikethroughCommand = {
  ...commands.strikethrough,
  icon: <StrikethroughIcon />,
};
const quoteCommand = {
  ...commands.quote,
  icon: <QuoteIcon />,
};
const codeCommand = {
  ...commands.code,
  icon: <CodeIcon />,
};
const linkCommand = {
  ...commands.link,
  icon: <Link2Icon />,
};
const dividerCommand = {
  ...commands.divider,
  icon: <DividerVerticalIcon />,
};
const hrCommand = {
  ...commands.hr,
  icon: <StretchHorizontallyIcon />,
};
const unorderedListCommand = {
  ...commands.unorderedListCommand,
  icon: <ListBulletIcon />,
};
const helpCommand = {
  ...commands.help,
  icon: <QuestionMarkCircledIcon />,
};
const fullscreenCommand = {
  ...commands.fullscreen,
  icon: <EnterFullScreenIcon />,
};

const editorCommands = [
  dividerCommand,
  commands.group(
    [
      commands.title1,
      commands.title2,
      commands.title3,
      commands.title4,
      commands.title5,
      commands.title6,
    ],
    {
      icon: <HeadingIcon />,
      name: "title",
      groupName: "title",
      buttonProps: { "aria-label": "Insert title" },
    },
  ),
  boldCommand,
  italicCommand,
  strikethroughCommand,
  dividerCommand,
  quoteCommand,
  codeCommand,
  linkCommand,
  hrCommand,
  unorderedListCommand,
  commands.orderedListCommand,
  commands.checkedListCommand,
  dividerCommand,
  tableCommand,
  imageCommand,
  dividerCommand,
  helpCommand,
];

interface PreviewEditModeSwitchProps {
  setToolbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const PreviewEditModeSwitch = ({
  setToolbarVisible,
}: PreviewEditModeSwitchProps) => {
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    if (preview === "edit") {
      dispatch!({ preview: "preview" });
      setToolbarVisible(false);
    } else {
      dispatch!({ preview: "edit" });
      setToolbarVisible(true);
    }
  };

  return (
    <button type="button" onClick={click}>
      {preview === "edit" ? "Preview" : "Continue Editing"}
    </button>
  );
};

const codePreview = (
  setToolbarVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => ({
  name: "preview",
  keyCommand: "preview",
  icon: <PreviewEditModeSwitch setToolbarVisible={setToolbarVisible} />,
});

interface MDEditorWrapperProps {
  value: string;
  onChange: (value: string, name: string) => void;
  name: string;
  id: string;
  placeholder?: string;
  height?: number;
  required?: boolean;
}
const MDEditorWrapper = ({
  value,
  onChange,
  name,
  placeholder = "Type here..",
  id,
  height = 400,
  required = false,
}: MDEditorWrapperProps) => {
  const [toolbarVisible, setToolbarVisible] = useState(true);
  return (
    <MDEditor
      data-color-mode="light"
      className="md"
      value={value}
      preview="edit"
      commands={
        toolbarVisible
          ? [codePreview(setToolbarVisible), ...editorCommands]
          : [codePreview(setToolbarVisible)]
      }
      extraCommands={[fullscreenCommand]}
      onChange={(val) => onChange(val || "", name)}
      visibleDragbar={false}
      height={height}
      textareaProps={{
        placeholder,
        name,
        id,
        required,
      }}
    />
  );
};

export { MDEditorWrapper };
