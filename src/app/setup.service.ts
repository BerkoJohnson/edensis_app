import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  Election,
  Position,
  ElectionPayload,
  PositionPayload
} from "./interfaces";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SetupService {
  constructor(private http: HttpClient) {
    this.retrieveDefault();
  }

  _election = new BehaviorSubject<Election>(null);
  $election = this._election.asObservable();

  storeElection(election: Election) {
    const data = JSON.stringify(election);
    localStorage.setItem("default-election", data);
  }

  retrieveDefault() {
    const data = localStorage.getItem("default-election");
    const election = JSON.parse(data) as Election;
    this._election.next(election);
  }

  /////////////////////// ELECTION START HERE /////////////////////////

  /** Get single election */
  getElection(elec: string | Election): Observable<Election> {
    const id = typeof elec === "string" ? elec : elec._id;
    return this.http.get<Election>(`/api/v1/elections/${id}`);
  }

  /** Get elections */
  getElections(): Observable<ElectionPayload> {
    return this.http.get<ElectionPayload>(`/api/v1/elections/`);
  }

  /** Create new election */
  createElection(elec: Election): Observable<Election | boolean> {
    return this.http.post<Election>("/api/v1/elections/", elec);
  }

  /** Update election */
  updateElection(
    elec: string | Election,
    update: any | Election
  ): Observable<Election | boolean> {
    const id = typeof elec === "string" ? elec : elec._id;
    return this.http.put<Election>(`/api/v1/elections/${id}`, update);
  }

  /** Delete election */
  deleteElection(elec: string | Election): Observable<Election | boolean> {
    const id = typeof elec === "string" ? elec : elec._id;
    return this.http.delete<Election>(`/api/v1/elections/${id}`);
  }

  /////////////////////// ELECTION ENDS HERE /////////////////////////

  /////////////////////// POSITION STARTS HERE /////////////////////////

  /** Get single position */
  getPosition(position: string | Position): Observable<Position> {
    const id = typeof position === "string" ? position : position._id;
    return this.http.get<Position>(`/api/v1/positions/${id}`);
  }

  /** Get positions */
  getPositions(election?: string): Observable<PositionPayload> {
    return this.http.get<PositionPayload>(
      `/api/v1/positions?election=${election}`
    );
  }

  /** Create new position */
  createPosition(position: Position): Observable<Position | boolean> {
    return this.http.post<Position | boolean>("/api/v1/positions", position);
  }

  /** Update position */
  updatePosition(
    position: string | Position,
    update: any | Position
  ): Observable<Position | boolean> {
    const id = typeof position === "string" ? position : position._id;
    return this.http.put<Position | boolean>(`/api/v1/positions/${id}`, update);
  }

  /** Delete position */
  deletePosition(position: string | Position): Observable<Position | boolean> {
    const id = typeof position === "string" ? position : position._id;
    return this.http.delete<Position | boolean>(`/api/v1/positions/${id}`);
  }

  /////////////////////// POSITION ENDS HERE /////////////////////////
}
