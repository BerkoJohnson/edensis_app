import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Position,
  PositionPayload,
  PositionsPayload,
  Election
} from '../interfaces';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ElectionService } from './election.service';
// import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private http: HttpClient, private election: ElectionService) {
    // this.loadPositions();
  }

  _positions = new BehaviorSubject<PositionsPayload>(null);
  $positions = this._positions.asObservable();

  // loadPositions() {
  //   const election = JSON.parse(
  //     localStorage.getItem('default-election')
  //   ) as Election;
  //   if (election) {
  //     this.getPositions(election._id).subscribe();
  //   }
  // }

  /////////////////////// POSITION STARTS HERE /////////////////////////

  /** Get single position */
  getPosition(position: string | Position): Observable<PositionPayload> {
    const id = typeof position === 'string' ? position : position._id;
    return this.http.get<PositionPayload>(`/api/v1/positions/${id}`);
  }

  /** Get positions */
  getPositions(election?: string): Observable<PositionsPayload> {
    return this.http
      .get<PositionsPayload>(`/api/v1/positions?election=${election}`);
  }

  /** Create new position */
  createPosition(position: Position): Observable<PositionPayload> {
    return this.http.post<PositionPayload>('/api/v1/positions', position);
  }

  /** Update position */
  updatePosition(
    position: string | Position,
    update: any | Position
  ): Observable<PositionPayload> {
    const id = typeof position === 'string' ? position : position._id;
    return this.http
      .put<PositionPayload>(`/api/v1/positions/${id}`, update);
  }

  /** Delete position */
  deletePosition(position: string | Position): Observable<PositionPayload> {
    const id = typeof position === 'string' ? position : position._id;
    return this.http.delete<PositionPayload>(`/api/v1/positions/${id}`);
  }

  /////////////////////// POSITION ENDS HERE /////////////////////////
}
