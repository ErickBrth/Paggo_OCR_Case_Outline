import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { InputUploadFilesParamns } from "@/types";
import { alert } from "@/utils/alerts";
import { useSession } from "next-auth/react";

export default function InputUploadFiles({
  label,
  subtitle,
  setUploadState,
  uploadStates,
  setTableData,
}: InputUploadFilesParamns) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const VisuallyButton = styled(Button)({
    backgroundColor: "#2c00cc",
    height: "40px",
    width: "150px",
    borderRadius: "8px",
    color: "#ffffff",
    fontWeight: "600",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  });
  const { data: session } = useSession();

  async function post(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setUploadState(uploadStates.send);
    try {
      const invoice = event.target.files?.[0];
      if (invoice) {
        const { data } = await axios.get(
          `/api/aws-s3-upload?fileName=${invoice.name}&fileType=${invoice.type}`
        );

        await axios.put(data.signedUrl, invoice, {
          headers: { "Content-Type": invoice.type },
        });

        setUploadState(uploadStates.ocrProcessing);

        const { data: ocrResponse } = await axios.post("/api/send-to-ocr", {
          uniqueName: data.uniqueName,
          userName: session?.user?.name,
          email: session?.user?.email,
        });

        setTableData(ocrResponse);
        console.log("ocrResponse: ", ocrResponse);
        setUploadState(uploadStates.done);
      }
    } catch (err: any) {
      console.log(err.response);
      setUploadState(uploadStates.wait);
      await alert("Algo deu errado, tente novamente");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center  h-fit pb-6">
      <div className="mb-6">
        <p className="text-3xl font-bold text-gray-800">{label}</p>
        <p className="mt-2 text-gray-600">{subtitle}</p>
      </div>
      <VisuallyButton
        // @ts-ignore:next-line
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            post(event);
          }}
          multiple
        />
      </VisuallyButton>
    </div>
  );
}
