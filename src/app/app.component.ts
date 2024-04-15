import {Component, OnDestroy} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {NoteComponent} from "./components/note/note.component";
import {NgForOf, NgIf} from "@angular/common";
import {CreateNoteComponent} from "./components/create-note/create-note.component";
import {NoteService} from "./services/note.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, NoteComponent, NgForOf, CreateNoteComponent, NgIf],
  providers: [NoteService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  private _notes: string[] = [];
  private _isCreationFieldOpened = false;
  private _notesSubscription: Subscription;

  constructor(private readonly _noteService: NoteService) {
    this._notesSubscription = this._noteService.notes.subscribe(notes => {this._notes = notes});
  }

  ngOnDestroy() {
    this._notesSubscription.unsubscribe();
  }

  get notes(): string[] {
    return this._notes;
  }

  get isCreationFieldOpened(): boolean {
    return this._isCreationFieldOpened;
  }

  protected toggleCreationField(): void {
    this._isCreationFieldOpened = !this._isCreationFieldOpened;
  }

  protected addNote(note: string): void {
    this._noteService.addNote(note);
    this.toggleCreationField();
  }

  protected deleteNote(index: number): void {
    this._noteService.deleteNote(index);
  }

  protected closeField(): void {
    this.toggleCreationField();
  }

  protected isNotesListEmpty(): boolean {
    return this._notes.length === 0;
  }
}
