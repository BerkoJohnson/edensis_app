import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Election,
  Position,
} from 'src/app/interfaces';
import { PositionService } from 'src/app/services/position.service';
import { ElectionService } from 'src/app/services/election.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {
  currentElection: Election;
  positionForm: FormGroup;
  isEdit = false;
  positionToUpdate: Position;

  constructor(
    private fb: FormBuilder,
    public positionService: PositionService,
    public electionService: ElectionService,
    private route: ActivatedRoute
  ) {
    this.positionForm = this.fb.group({
      title: ['', [Validators.required]],
      election: ['', Validators.required],
      cast_type: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  useElection(election: Election) {
    this.currentElection = election;
    this.electionService.setElection(election);
  }

  editPositon(position: Position, electionID: string) {
    // Set isEdit to true
    this.isEdit = true;

    this.election.disable({
      emitEvent: true,
      // Cannot change the election
      onlySelf: true
    });

    this.election.setValue(electionID);
    if (position) {
      this.positionToUpdate = position;
      this.title.setValue(position.title);
      this.cast_type.setValue(position.cast_type);
    }
  }

  addPosition() {
    this.isEdit = false;
    this.election.setValue(this.currentElection._id || '');
    this.title.setValue(null);
    this.cast_type.setValue('Thumbs');
  }

  submitForm() {
    if (this.positionForm.invalid) {
      return;
    }

    const pos: Position = {
      title: this.title.value,
      cast_type: this.cast_type.value,
      election: this.election.value
    };

    if (!this.isEdit) {
      this.electionService.createPosition(pos, this.currentElection._id).subscribe(
        () => this.electionService.getElection(this.election.value).subscribe()
      );
    } else {
      this.electionService
        .updatePosition(this.positionToUpdate._id, this.currentElection._id, pos)
        .subscribe(() => {
          this.electionService.getElection(this.election.value).subscribe();
        });
    }
  }

  get title() {
    return this.positionForm.get('title');
  }

  get cast_type() {
    return this.positionForm.get('cast_type');
  }

  get election() {
    return this.positionForm.get('election');
  }
}
