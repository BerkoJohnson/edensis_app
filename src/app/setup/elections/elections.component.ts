import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SetupService } from "src/app/setup.service";
import { Election, ElectionPayload } from "src/app/interfaces";

@Component({
  selector: "app-elections",
  templateUrl: "./elections.component.html",
  styleUrls: ["./elections.component.scss"]
})
export class ElectionsComponent implements OnInit {
  elections: ElectionPayload;

  electionForm: FormGroup;

  constructor(private fb: FormBuilder, private setup: SetupService) {
    this.electionForm = this.fb.group({
      title: ["", Validators.required],
      school: ["", Validators.required],
      academicYear: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.setup.getElections().subscribe(elecs => (this.elections = elecs));
  }

  useElection(election: Election) {
    this.setup.storeElection(election);
  }

  submitForm() {
    if (this.electionForm.invalid) {
      return;
    }

    const elec: Election = {
      title: this.title.value,
      school: this.school.value,
      academicYear: this.academicYear.value
    };

    this.setup.createElection(elec).subscribe(e => console.log(e));
  }

  get title() {
    return this.electionForm.get("title");
  }

  get school() {
    return this.electionForm.get("school");
  }
  get academicYear() {
    return this.electionForm.get("academicYear");
  }
}
