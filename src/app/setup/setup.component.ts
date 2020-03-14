import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SetupService } from "../setup.service";
import { Election } from "../interfaces";
import { debounceTime, switchMap } from "rxjs/operators";

@Component({
  selector: "app-setup",
  templateUrl: "./setup.component.html",
  styleUrls: ["./setup.component.scss"]
})
export class SetupComponent implements OnInit {
  setElectionForm: FormGroup;
  elections: Election[];

  constructor(private fb: FormBuilder, private setup: SetupService) {
    this.setElectionForm = this.fb.group({
      election: ["", Validators.required]
    });
  }

  ngOnInit(): void {}
}
