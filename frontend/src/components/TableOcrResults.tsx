import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { generateKeyValueArray } from "@/utils";
import { DataTableParams } from "@/types";
import TableCellRow from "./TableCellRow";

export default function TableOcrResults({ extractedInfos }: DataTableParams) {
  if (typeof extractedInfos === "string") {
    return [];
  }
  const translationInvoiceMap = {
    number: "Número da Nota",
    issuanceDate: "Data de emissão",
    description: "Descrição",
    netAmount: "Valor líquido",
    totalAmount: "Valor total",
    imageLink: "Link da imagem",
    textRaw: "Texto bruto extraído",
  };
  const translationCompanyMap = {
    name: "Nome",
    address: "Endereço",
    cpfCnpj: "CPF ou CNPJ",
    email: "E-mail",
    city: "Cidade",
    phoneNumber: "Telefone ou celular",
    state: "UF",
  };
  const translationBankInfoMap = {
    bankName: "Nome do banco",
    agency: "Agência",
    account: "Conta",
    pixKey: "Chave Pix",
  };
  delete extractedInfos.invoice.imageName;
  const invoiceArray = generateKeyValueArray(
    translationInvoiceMap,
    extractedInfos.invoice
  );
  const bankInfoArray = generateKeyValueArray(
    translationBankInfoMap,
    extractedInfos.bankInfo
  );

  const payerArray = generateKeyValueArray(
    translationCompanyMap,
    extractedInfos.payerData
  );
  const receiverArray = generateKeyValueArray(
    translationCompanyMap,
    extractedInfos.receiverData
  );
  return (
    <TableContainer
      className="w-[80vw] h-[70vh] overflow-y-auto bg-white shadow-md rounded-lg"
      component={Paper}
    >
      <Table>
        <TableBody>
          {invoiceArray.map((row, index) => (
            <TableCellRow key={index} value={row.value} newKey={row.newKey} />
          ))}
          <TableRow className="bg-gray-200">
            <TableCell colSpan={2} className="p-4">
              <h1 className="font-bold text-gray-700 text-lg">
                Informações do Emissor/Prestador
              </h1>
            </TableCell>
          </TableRow>
          {receiverArray.map((row, index) => (
            <TableCellRow key={index} value={row.value} newKey={row.newKey} />
          ))}
          {bankInfoArray.length ? (
            <>
              <TableRow className="bg-gray-200">
                <TableCell colSpan={2} className="p-4">
                  <h1 className="font-bold text-gray-700 text-lg">
                    Informações para pagamento
                  </h1>
                </TableCell>
              </TableRow>
              {bankInfoArray.map((row, index) => (
                <TableCellRow
                  key={index}
                  value={row.value}
                  newKey={row.newKey}
                />
              ))}
            </>
          ) : (
            <></>
          )}
          <TableRow className="bg-gray-200">
            <TableCell colSpan={2} className="p-4">
              <h1 className="font-bold text-gray-700 text-lg">
                Informações do Tomador/Remitente
              </h1>
            </TableCell>
          </TableRow>

          {payerArray.map((row, index) => (
            <TableCellRow key={index} value={row.value} newKey={row.newKey} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
