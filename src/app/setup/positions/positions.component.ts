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
  elections: Election[];

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
      title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      election: ['', Validators.required],
      cast_type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get all elections to populate the elections field in the position form
    this.electionService
      .getElections()
      .subscribe(elections => (this.elections = elections.data));
  }

  editPositon(id: string) {
    // Set isEdit to true
    this.isEdit = true;

    // Cannot change the election
    this.election.disable({
      emitEvent: true,
      onlySelf: true
    });

    // Fetch Position from DB
    if (id) {
      this.positionService.getPosition(id).subscribe(p => {
        this.positionToUpdate = p.data;
        this.title.setValue(p.data.title);
        this.cast_type.setValue(p.data.cast_type);
      });
    }
  }

  submitForm() {
    if (this.positionForm.invalid) {
      return;
    }

    const pos: Position = {
      title: this.title.value,
      cast_type: this.cast_type.value
    };

    if (!this.isEdit) {
      this.positionService.createPosition(pos).subscribe();
    } else {
      this.positionService
        .updatePosition(this.positionToUpdate._id, pos)
        .subscribe();
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
