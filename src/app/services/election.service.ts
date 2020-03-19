import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Election,
  Position,
  ElectionPayload,
  PositionPayload,
  ElectionsPayload
} from '../interfaces';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BROWSER_STORAGE } from '../interfaces/storage';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) {
      this.getElections().subscribe();
  }

  // tslint:disable-next-line:variable-name
  _election = new BehaviorSubject<Election>(null);
  // tslint:disable-next-line:variable-name
  private _elections = new BehaviorSubject<Election[]>(null);


  setElection(elec: Election) {
    this._election.next(elec);
  }

  get election() {
    return this._election.asObservable();
  }

  get $elections() {
    return this._elections.asObservable();
  }

  /////////////////////// ELECTION START HERE /////////////////////////

  /** Get single election */
  getElection(elec: string | Election): Observable<ElectionPayload> {
    const id = typeof elec === 'string' ? elec : elec._id;
    return this.http.get<ElectionPayload>(`/api/v1/elections/${id}`).pipe(
      tap(el => this._election.next(el.data))
    );
  }

  /** Get elections */
  getElections(): Observable<ElectionsPayload> {
    return this.http.get<ElectionsPayload>(`/api/v1/elections/`).pipe(
      tap(e => this._elections.next(e.data))
    );
  }

  /** Create new election */
  createElection(elec: Election): Observable<Election | boolean> {
    return this.http.post<Election>('/api/v1/elections/', elec)
    .pipe(tap(_ => this.getElections().subscribe()));
  }

  /** Update election */
  updateElection(
    elec: string | Election,
    update: any | Election
  ): Observable<Election | boolean> {
    const id = typeof elec === 'string' ? elec : elec._id;
    return this.http.put<Election>(`/api/v1/elections/${id}`, update)
    .pipe(tap(_ => this.getElections().subscribe()));
  }

  /** Delete election */
  deleteElection(elec: string | Election): Observable<Election | boolean> {
    const id = typeof elec === 'string' ? elec : elec._id;
    return this.http.delete<Election>(`/api/v1/elections/${id}`)
    .pipe(tap(_ => this.getElections().subscribe()));
  }

  /////////////////////// ELECTION ENDS HERE /////////////////////////
}
