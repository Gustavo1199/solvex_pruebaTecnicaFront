import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent {
  @Input() isOpen?: boolean;
  @Input() title?: string;
  @Input() imageUrl?: string;
  @Input() formGroup!: FormGroup; // Utilizando el operador !
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  onSubmitForm() {
    this.submitForm.emit();
  }
}
