export type SetUploadStateType = React.Dispatch<React.SetStateAction<string>>;

export type SetTableData =
  | React.Dispatch<React.SetStateAction<string>>
  | React.Dispatch<React.SetStateAction<ExtractedInfosInterface>>;

export type UploadStates = {
  wait: string;
  send: string;
  done: string;
  ocrProcessing: string;
};

export type InputUploadFilesParamns = {
  label: string;
  subtitle: string;
  setUploadState: SetUploadStateType;
  uploadStates: UploadStates;
  setTableData: SetTableData;
};

export type Invoice = {
  description?: string;
  imageLink: string;
  imageName?: string;
  issuanceDate?: string;
  netAmount?: number;
  number?: string;
  textRaw: string;
  totalAmount?: number;
};

export type CompanyData = {
  name: string;
  address: string;
  cpfCnpj: string;
  email: string;
  city: string;
  phoneNumber: string;
  state: string;
};

export type BankInfo = {
  bankName: string;
  agency: string;
  account: string;
  pixKey: string;
};

export interface ExtractedInfosInterface {
  invoice: Invoice;
  bankInfo?: BankInfo;
  payerData?: CompanyData;
  receiverData?: CompanyData;
}

export interface DataTableParams {
  extractedInfos: ExtractedInfosInterface | string;
}

export type TranslationInvoiceMap = {
  description?: string;
  imageLink: string;
  issuanceDate?: string;
  netAmount?: string;
  number?: string;
  textRaw: string;
  totalAmount?: string;
};

export type TableCellRowParams = {
  value: string | null;
  newKey: string;
};
