import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElectionService } from 'src/app/services/election.service';
import { Election, ElectionPayload } from 'src/app/interfaces';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {
  elections: ElectionPayload;

  electionForm: FormGroup;

  constructor(private fb: FormBuilder, private election: ElectionService) {
    this.electionForm = this.fb.group({
      title: ['', Validators.required],
      school: ['', Validators.required],
      academicYear: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.election.getElections().subscribe(elecs => (this.elections = elecs));
  }

  useElection(election: Election) {
    this.election.setElection(election);
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

    this.election.createElection(elec).subscribe(e => console.log(e));
  }

  get title() {
    return this.electionForm.get('title');
  }

  get school() {
    return this.electionForm.get('school');
  }
  get academicYear() {
    return this.electionForm.get('academicYear');
  }
}
