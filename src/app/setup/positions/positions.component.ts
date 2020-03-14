import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  Election,
  Position,
  PositionPayload,
  ElectionPayload
} from "src/app/interfaces";
import { SetupService } from "src/app/setup.service";

@Component({
  selector: "app-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.scss"]
})
export class PositionsComponent implements OnInit {
  positions: Position[];
  elections: Election[];

  positionForm: FormGroup;

  constructor(private fb: FormBuilder, public setup: SetupService) {
    this.positionForm = this.fb.group({
      title: ["", Validators.required],
      election: ["", Validators.required],
      cast_type: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.setup.getPositions().subscribe(pos => (this.positions = pos.data));
    this.setup
      .getElections()
      .subscribe(elections => (this.elections = elections.data));
  }

  submitForm() {
    if (this.positionForm.invalid) {
      return;
    }

    const pos: Position = {
      title: this.title.value,
      election: this.election.value,
      cast_type: this.cast_type.value
    };

    this.setup.createPosition(pos).subscribe(p => console.log(p));
  }

  get title() {
    return this.positionForm.get("title");
  }

  get cast_type() {
    return this.positionForm.get("cast_type");
  }

  get election() {
    return this.positionForm.get("election");
  }
}
