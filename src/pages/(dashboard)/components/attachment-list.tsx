import Icon from "@/components/common/icon";
import { Paragraph } from "@/components/ui/typography";

export interface IAttachment {
  id: string;
  type: string;
  title: string;
  source: string;
}
export const renderAttachment = (attachment: IAttachment) => {
  const { type, source, title } = attachment;
  switch (type) {
    case "document":
      return (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full items-center flex justify-center"
        >
          <span className="sr-only">{title}</span>
          <Icon icon="file" className="opacity-50" />
        </a>
      );
    case "image":
      return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <img
          className="w-full h-full object-contain"
          src={source}
          alt={title}
          onClick={() => window.open(source, "_blank")}
        />
      );
    case "video":
      return (
        // biome-ignore lint/a11y/useValidAriaRole: <explanation>
        // biome-ignore lint/a11y/useMediaCaption: <explanation>
        // biome-ignore lint/a11y/noInteractiveElementToNoninteractiveRole: <explanation>
        <video role="video" controls className="w-full h-full object-contain">
          <source src={source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    case "audio":
      return (
        <a
          href={source}
          className="w-full h-full items-center flex justify-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">{title}</span>
          <Icon icon="mic" className="opacity-50" />
        </a>
      );
    default:
      return <p>Unsupported resource type</p>;
  }
};

interface AttachmentProps {
  attachment: IAttachment;
}
export const Attachment = ({ attachment }: AttachmentProps) => {
  return (
    <div className="flex gap-2 flex-col w-[132px]">
      <div className="border w-full h-[104px] border-secondary hover:border-primary overflow-hidden cursor-pointer">
        {renderAttachment(attachment)}
      </div>
      <Paragraph className="line-clamp-1">{attachment.title}</Paragraph>
    </div>
  );
};

const Attachments = ({ attachments }: { attachments: IAttachment[] }) => {
  return (
    <div className="flex gap-4 mb-4">
      {attachments.map((attachment) => (
        <Attachment key={attachment.id} attachment={attachment} />
      ))}
    </div>
  );
};

export default Attachments;
