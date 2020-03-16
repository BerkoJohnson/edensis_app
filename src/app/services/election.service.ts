import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Election,
  Position,
  ElectionPayload,
  PositionPayload
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
  }

  _election = new BehaviorSubject<Election>(null);


  setElection(elec: Election) {
    this._election.next(elec);
  }

  get election() {
    return this._election.asObservable();
  }

  /////////////////////// ELECTION START HERE /////////////////////////

  /** Get single election */
  getElection(elec: string | Election): Observable<Election> {
    const id = typeof elec === 'string' ? elec : elec._id;
    return this.http.get<Election>(`/api/v1/elections/${id}`);
  }

  /** Get elections */
  getElections(): Observable<ElectionPayload> {
    return this.http.get<ElectionPayload>(`/api/v1/elections/`);
  }

  /** Create new election */
  createElection(elec: Election): Observable<Election | boolean> {
    return this.http.post<Election>('/api/v1/elections/', elec);
  }

  /** Update election */
  updateElection(
    elec: string | Election,
    update: any | Election
  ): Observable<Election | boolean> {
    const id = typeof elec === 'string' ? elec : elec._id;
    return this.http.put<Election>(`/api/v1/elections/${id}`, update);
  }

  /** Delete election */
  deleteElection(elec: string | Election): Observable<Election | boolean> {
    const id = typeof elec === 'string' ? elec : elec._id;
    return this.http.delete<Election>(`/api/v1/elections/${id}`);
  }

  /////////////////////// ELECTION ENDS HERE /////////////////////////
}
