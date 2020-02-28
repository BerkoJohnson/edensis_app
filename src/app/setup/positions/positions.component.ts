import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.scss"]
})
export class PositionsComponent implements OnInit {
  positions: {
    title: string;
    cast_type: "Thumbs Up" | "Yes or No";
  }[] = [];
  positionForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.positionForm = this.fb.group({
      title: ["", Validators.required],
      cast_type: ["", Validators.required]
    });
  }

  ngOnInit(): void {}

  submitForm() {
    // Check if not added yet
    const positionIndex = this.positions.findIndex(
      p => p.title === this.title.value
    );
    // console.log(positionIndex);
    if (positionIndex === -1) {
      this.positions.push({
        title: this.title.value,
        cast_type: this.cast_type.value
      });
    }
  }

  get title() {
    return this.positionForm.get("title");
  }

  get cast_type() {
    return this.positionForm.get("cast_type");
  }
}
