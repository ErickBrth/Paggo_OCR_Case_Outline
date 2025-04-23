import { BankInfo, CompanyData, Invoice } from "@/types";

export function generateKeyValueArray(
  translationMap: any,
  obj?: Invoice | CompanyData | BankInfo
) {
  if (!obj || Object.values(obj).every((value) => !value)) {
    return [];
  }
  const array = Object.entries(obj).map(([key, value]) => {
    const newKey = translationMap[key];
    let formatedValue: string | null | number = value;
    if (key === "totalAmount" || key === "netAmount") {
      formatedValue = (Number(value) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    if (key === "cpfCnpj") {
      formatedValue = formatCpfOrCnpj(value);
    }
    if (key === "phoneNumber") {
      formatedValue = formatPhone(value);
    }
    return { newKey, value: formatedValue ? String(formatedValue) : "-" };
  });
  return array;
}
function formatCpf(cpf: string) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length <= 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else {
    return cpf;
  }
}

function formatCnpj(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length <= 14) {
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    return cnpj;
  }
}
export function formatCpfOrCnpj(value: string | number) {
  value = value.toString().replace(/\D/g, "");

  if (value.length <= 11) {
    return formatCpf(value);
  } else if (value.length <= 14) {
    return formatCnpj(value);
  } else {
    return value;
  }
}
export function formatPhone(value: string | number) {
  if (!value) {
    return null;
  }
  value = value.toString().replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}
