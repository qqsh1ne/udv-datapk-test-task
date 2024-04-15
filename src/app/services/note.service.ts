import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class NoteService {
  private _notes: BehaviorSubject<string[]>;

  constructor() {
    this._notes = new BehaviorSubject<string[]>([]);
    setTimeout(() => {
      this._notes.next(this.getInitialNotes());
    })
  }

  public get notes(): Observable<string[]> {
    return this._notes.asObservable();
  }

  public addNote(note: string) {
    const notes = this._notes.getValue();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    this._notes.next(notes);
  }

  public deleteNote(index: number) {
    const notes = this._notes.getValue();
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    this._notes.next(notes);
  }

  private getInitialNotes() {
    const notes = localStorage.getItem('notes');

    return notes ? JSON.parse(notes) : [];
  }
}
