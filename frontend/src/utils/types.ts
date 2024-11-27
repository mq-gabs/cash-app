import { TMonthView } from "../pages/dashboard/types";

export type TBase = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type TService = TBase & {
  name: string;
  description: string;
  price: number;
};

export enum ERoles {
  ADMIN = "ADMIN",
  DEFAULT = "DEFAULT",
}

export enum ERolesLabels {
  ADMIN = "Administrador",
  DEFAULT = "Padrão",
}

export type TUser = TBase & {
  name: string;
  email: string;
  password: string;
  role: ERoles;
};

export type TEmployee = TBase & {
  name: string;
  wage: number;
  role: string;
};

export type TOtherPayment = TBase & {
  value: number;
  paid_at: string;
  title: string;
  description: string;
};

export enum EPaymentType {
  CASH = "CASH",
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
  INSTALLMENTS = "INSTALLMENTS",
}

export enum EPaymentTypeLabels {
  CASH = "Espécie",
  DEBIT = "Débito",
  CREDIT = "Crédito",
  INSTALLMENTS = "Parcelado",
}

export type TServicePayments = TBase & {
  value: number;
  paid_at: string;
  payment_type: EPaymentType;
  services: TService[];
};

export type TEmployeePayment = TBase & {
  value: number;
  paid_at: string;
  employee: TEmployee;
}

export type TMonthReport = {
  services_analysis: {
    revenue: {
      id: string;
      name: string;
      revenue: number;
    }[];
    count: {
      id: string;
      name: string;
      count: number;
    }[];
    month_view: TMonthView;
  };
  employees_analysis: {
    count: number;
    cost: number;
    employees_payments: {
      id: string;
      name: string;
      value: number;
    }[]
  };
  other_payments_analysis: {
    count: number;
    cost: number;
    other_payments: TOtherPayment[];
  };
  general_analysis: {
    revenue: number;
    cost: number;
    profit: number;
    profit_margin: number;
  }
}

export type TFilterField = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};
