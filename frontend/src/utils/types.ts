import { TMonthView, TYearView } from "../pages/dashboard/types";

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
  PIX = "PIX",
}

export enum EPaymentTypeLabels {
  CASH = "Espécie",
  DEBIT = "Débito",
  CREDIT = "Crédito",
  INSTALLMENTS = "Parcelado",
  PIX = "Pix",
}

export type TServicePayments = TBase & {
  value: number;
  paid_at: string;
  payment_type: EPaymentType;
  services: TService[];
  customer: TCustomer;
  customer_id: string;
  observation: string;
};

export type TEmployeePayment = TBase & {
  value: number;
  paid_at: string;
  employee: TEmployee;
};

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
    year_view: TYearView;
  };
  employees_analysis: {
    count: number;
    cost: number;
    employees_payments: {
      id: string;
      name: string;
      value: number;
    }[];
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
  };
};

export type TFilterField = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

export type TCustomer = TBase & {
  name: string;
  address: string;
  birth_date: string;
  contact: string;
  balance: number;
};

export type TCashier = {
  id: string;
  open_by: TUser;
  open_at: string;
  start_value: number;
  closed_by: TUser;
  closed_at: string;
  end_value: number;
};
