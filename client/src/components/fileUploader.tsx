import { FileEntry } from "@/shared.types";
import {
  FileUploaderRegular,
  OutputFileEntry,
  UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useRef } from "react";

interface IFileUploaderProps {
  fileEntry: FileEntry;
  setFileEntry: React.Dispatch<React.SetStateAction<FileEntry>>;
  preview?: boolean;
}

const FileUploader: React.FC<IFileUploaderProps> = ({
  fileEntry,
  setFileEntry,
  preview = true,
}) => {
  const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);
  /*usefull for simpler interractions/less functionality*/
  const handleUploadSuccess = (item: OutputFileEntry) => {
    setFileEntry({ files: [...fileEntry.files, item] });
    console.log(`final fileEntry: ${JSON.stringify(fileEntry)}`);
  };
  return (
    <div>
      <FileUploaderRegular
        pubkey="022782405d0a1783e085"
        maxLocalFileSizeBytes={1000000000}
        imgOnly={true}
        sourceList="local, camera, gdrive, gphotos"
        classNameUploader="my-config uc-light"
        onFileUploadSuccess={handleUploadSuccess}
        apiRef={uploaderRef}
        multiple={preview}
      />
      {preview ? (
        <div>
          {fileEntry.files.map((file) => (
            <div key={file.uuid}>
              <img
                // src={`${file.cdnUrl}/-/format/auto/-/quality/smart/-/stretch/fill`}
                src={`${file.cdnUrl}/-/format/auto/-/quality/smart/`}
                alt={file.fileInfo!.originalFilename!}
              />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileUploader;
