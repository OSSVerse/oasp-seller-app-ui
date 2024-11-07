import { XIcon } from "lucide-react";
import HrefLink from "../ui/href-link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Muted } from "../ui/typography";
import { INVALID_URL_MESSAGE } from "@/lib/constant";
import { useState } from "react";

interface AddLinksProps {
  links: string[];
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
}
const AddLinks = ({ links, setLinks }: AddLinksProps) => {
  const [linkValue, setLinkValue] = useState("");
  const [invalidUrlmsg, setInvalidUrlmsg] = useState("");
  const enabledAddLinkBtn = linkValue.trim() === "" || invalidUrlmsg !== "";

  const handleAddLink = () => {
    setLinks((prevLinks) => [...prevLinks, linkValue]);
    setLinkValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLinkValue(value);
    try {
      if (value.trim() === "") {
        setInvalidUrlmsg("");
      } else {
        new URL(value);
        setInvalidUrlmsg("");
      }
    } catch (_) {
      setInvalidUrlmsg(INVALID_URL_MESSAGE);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !enabledAddLinkBtn) {
      handleAddLink();
    }
  };

  const handleRemoveLink = (indexLink: string) => {
    setLinks((prev) => prev.filter((link, i) => i + link !== indexLink));
  };

  return (
    <>
      <Input
        type="url"
        placeholder="Type Here.."
        value={linkValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {invalidUrlmsg !== "" && linkValue.trim() !== "" && (
        <Muted className="text-red-400">{invalidUrlmsg}</Muted>
      )}
      {links.map((link, index) => (
        <div key={index + link} className="flex items-center justify-between">
          <HrefLink className="line-clamp-1 basis-[95%]">{link}</HrefLink>
          <XIcon
            data-testid="x-icon"
            className="h-6 w-6 text-stone-500 cursor-pointer"
            onClick={() => handleRemoveLink(index + link)}
          />
        </div>
      ))}
      <Button
        disabled={enabledAddLinkBtn}
        className="self-start"
        onClick={handleAddLink}
      >
        + Link
      </Button>
    </>
  );
};

export default AddLinks;
