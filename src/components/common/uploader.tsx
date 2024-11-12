import { useEffect, useState } from "react";
import Icon from "./icon";
import { FileIcon, MicIcon, XIcon } from "lucide-react";
import { Separator } from "../ui/separator";

interface IFileOptions {
  type: string;
  multiple?: boolean | false;
  allowed: string;
}

interface UploaderProps {
  ID: string;
  options: IFileOptions;
  onFilesSelected: (files: File[]) => void;
}

const Uploader = ({ ID, options, onFilesSelected }: UploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!options.multiple && files.length > 0) return;
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section>
      <div
        className="text-center py-7 border-2 border-stone-300 border-dashed rounded-lg text-stone-500"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className="opacity-80">
          <label htmlFor={`browse_${ID}`}>
            <div className="flex flex-col items-center">
              <div className="mb-3">
                <Icon icon="upload" size="large" />
              </div>
              <div>
                <p data-testid="drag-drop-text" >Drag & drop file here or Select file</p>
                <p>(File type {options.type})</p>
              </div>
            </div>
          </label>
          <input
            type="file"
            data-testid="file-input"
            hidden
            id={"browse_" + ID}
            onChange={handleFileChange}
            onClick={handleInputClick}
            accept={options.allowed}
            disabled={!options.multiple && files.length > 0}
          />
        </div>
      </div>
      {files.length > 0 && !options.multiple ? (
        <div className="bg-stone-100 p-3 rounded-md mt-3 flex items-center">
          <FileIcon className="h-5 w-5 text-stone-500" />
          {files.map((file, index) => (
            <div key={index} className="flex ms-2 w-full justify-between">
              <div className="line-clamp-1">{file.name}</div>
              <XIcon
                data-testid="x-icon"
                className="h-6 w-6 text-stone-500 cursor-pointer"
                onClick={() => handleRemoveFile(index)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 flex">
          {files.map((file, index) => (
            <div key={index} className="me-3">
              <div
                className={`w-24 h-20 ${file.type !== "audio/mp3" &&
                  file.type !== "audio/mpeg" &&
                  "bg-stone-100"
                  } border-2`}
              >
                <div className="flex justify-end">
                  <XIcon
                    className="h-6 w-6 text-stone-500 cursor-pointer"
                    onClick={() => handleRemoveFile(index)}
                  />
                </div>
                {file.type === "audio/mp3" || file.type === "audio/mpeg" ? (
                  <div className="flex justify-center">
                    <MicIcon className="h-6 w-6 text-stone-500" />
                  </div>
                ) : (
                  <div className="relative">
                    <Separator className="absolute top-[15px] transform rotate-[37deg]" />
                    <Separator className="absolute top-[15px] transform -rotate-[37deg]" />
                  </div>
                )}
              </div>
              <div className="mt-1">
                {file.type === "image/jpeg" || file.type === "image/png"
                  ? "Acme image"
                  : file.type === "video/mp4"
                    ? "Acme video"
                    : file.type === "audio/mp3" || file.type === "audio/mpeg"
                      ? "Audio record"
                      : file.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Uploader;
