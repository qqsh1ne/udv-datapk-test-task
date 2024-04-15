import {Component, EventEmitter, Output} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss'
})
export class CreateNoteComponent {
  private readonly _deleteIcon = faTrashCan;
  private readonly _confirmIcon = faCheck;
  private readonly _title: FormControl<string>;

  @Output() confirmationEvent = new EventEmitter<string>();
  @Output() closingEvent = new EventEmitter();

  constructor() {
    this._title = new FormControl();
  }

  protected emitConfirmEvent() {
    this.confirmationEvent.emit(this._title.value);
  }

  protected emitCloseEvent() {
    this.closingEvent.emit();
  }

  get deleteIcon(): IconDefinition {
    return this._deleteIcon;
  }

  get confirmIcon(): IconDefinition {
    return this._confirmIcon;
  }

  get title(): FormControl<string> {
    return this._title;
  }
}
