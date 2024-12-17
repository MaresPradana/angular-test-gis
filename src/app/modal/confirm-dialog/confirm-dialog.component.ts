import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmDialogData, ConfirmDialogResponse, IConfirmDialogComponent } from '../../interface/confirm-dialog.interface';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements IConfirmDialogComponent {
  @Input() data: ConfirmDialogData | null = null;
  @Output() result = new EventEmitter<ConfirmDialogResponse>();

  constructor(public bsModalRef: BsModalRef) {}

  // Mengonfirmasi penghapusan
  confirmDelete(): void {
    this.bsModalRef.hide();
    this.result.emit({ confirmed: true});
  }

  // Membatalkan penghapusan
  cancelDelete(): void {
    this.bsModalRef.hide();
    this.result.emit({ confirmed: false });
  }
}
