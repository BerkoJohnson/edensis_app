import { Resolve } from '@angular/router';
import { Election } from '../interfaces';
import { ElectionService } from '../services/election.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ElectionResolver implements Resolve<Election> {

  constructor(private electionService: ElectionService) { }

  resolve() {
    return this.electionService.election;
  }
}
