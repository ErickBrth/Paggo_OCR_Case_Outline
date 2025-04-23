import { TableCellRowParams } from "@/types";
import { TableCell, TableRow } from "@mui/material";

export default function TableCellRow({ newKey, value }: TableCellRowParams) {
  return (
    <TableRow className="border-b border-gray-200">
      <TableCell className={"p-4 w-[180px] text-gray-800"}>
        <p className="font-semibold">{newKey}</p>
      </TableCell>
      <TableCell className="p-4  text-gray-600">
        {newKey === "Link da imagem" ? (
          <a
            href={value || ""}
            target="_blank"
            className="max-h-[150px] overflow-auto text-blue-800 "
          >
            {value}
          </a>
        ) : (
          <p className="max-h-[150px] overflow-auto ">{value}</p>
        )}
      </TableCell>
    </TableRow>
  );
}
