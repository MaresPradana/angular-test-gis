import { EventEmitter } from "@angular/core";

export interface ConfirmDialogData {
  message?: string;
}

export interface ConfirmDialogResponse {
  confirmed: boolean;
}

export interface IConfirmDialogComponent {
  data: ConfirmDialogData | null;
  result: EventEmitter<ConfirmDialogResponse>;
  confirmDelete(): void;
  cancelDelete(): void;
}