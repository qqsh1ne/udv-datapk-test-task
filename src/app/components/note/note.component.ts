import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  private _title: string = '';
  private _index: number = -1;
  private _deleteIcon = faTrashCan;

  @Output() deleteEvent = new EventEmitter<number>();

  @Input() set title(value: string) {
    this._title = value;
  }

  @Input() set index(index: number) {
    this._index = index;
  }

  protected emitDeleteEvent() {
    this.deleteEvent.emit(this._index);
  }

  get index(): number {
    return this._index;
  }

  get title(): string {
    return this._title;
  }

  get deleteIcon(): IconDefinition {
    return this._deleteIcon;
  }
}
