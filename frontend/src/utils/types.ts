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
