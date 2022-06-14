import { Provider } from "./provider.model";

export class Creance {
  code?: number;
  selected?: boolean = false;
  dueDate?: string;
  amount?: number;
  creanceStatus?: string;
  creancier?: string;
  provider?: Provider;

  constructor(code?: number, dueDate?: string, amount?: number, creanceStatus?: string, creancier?: string, provider?: Provider) {
    this.code = code;
    this.amount = amount;
    this.selected = false;
    this.dueDate = dueDate;
    this.creanceStatus = creanceStatus;
    this.creancier = creancier;
    this.provider = provider;
  }
}

