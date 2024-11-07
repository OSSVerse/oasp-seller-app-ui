import React from "react";
import DiplomaIcon from "../icons/diploma-icon";
import FileAddIcon from "../icons/file-add-icon";
import FileCheckIcon from "../icons/file-check-icon";
import RefreshIcon from "../icons/refresh-icon";
import SearchAltIcon from "../icons/search-alt-icon";
import ShieldCheckIcon from "../icons/shield-check-icon";
import UploadIcon from "../icons/upload-icon";
import ClockIcon from "../icons/clock-icon";
import CreditCardIcon from "../icons/credit-card-icon";
import FileIcon from "../icons/file-icon";
import MicIcon from "../icons/mic-icon";
import SmartPhoneIcon from "../icons/smart-phone-icon";
import UserIcon from "../icons/user-icon";
import AddIcon from "../icons/add-icon";
import ChevronDownIcon from "../icons/chevron-down-icon";
import ExternalLinkIcon from "../icons/external-link-icon";
import ShieldIcon from "../icons/shield-icon";

const iconMap = {
  add: <AddIcon />,
  "search-alt": <SearchAltIcon />,
  "rr-file": <FileCheckIcon />,
  diploma: <DiplomaIcon />,
  refresh: <RefreshIcon />,
  "file-add": <FileAddIcon />,
  file: <FileIcon />,
  upload: <UploadIcon />,
  clock: <ClockIcon />,
  mic: <MicIcon />,
  user: <UserIcon />,
  "credit-card": <CreditCardIcon />,
  "smart-phone": <SmartPhoneIcon />,
  "chevron-down": <ChevronDownIcon />,
  "external-link": <ExternalLinkIcon />,
  shield: <ShieldIcon />,
  default: <ShieldCheckIcon />,
} as const;

type IconMapKeys = keyof typeof iconMap;

interface IconProps {
  icon: string;
  size?: "small" | "normal" | "medium" | "large";
  className?: string;
}

export const Icon = ({ icon, size = "normal", className = "" }: IconProps) => {
  const sizeClass = {
    small: "w-4 h-4",
    normal: "w-5 h-5",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  }[size];

  const SelectedIcon = iconMap[icon as IconMapKeys] || iconMap.default;
  return React.cloneElement(SelectedIcon, {
    className: `${sizeClass} ${className}`,
    "data-testid": `icon-${icon}`,
  });
};

export default Icon;
