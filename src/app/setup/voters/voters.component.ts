import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-voters",
  templateUrl: "./voters.component.html",
  styleUrls: ["./voters.component.scss"]
})
export class VotersComponent implements OnInit {
  imageUrl: any;
  imageError: string;
  constructor() {}

  ngOnInit(): void {}

  previewImage(event: Event) {
    const file = event.target["files"][0] as File;
    if (!file) return;

    // Validate file input
    const mimetype = file.type;
    if (mimetype.match(/image\/*/) === null) {
      this.imageError = "Only images are supported!";
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.imageUrl = reader.result;
    };
  }
}
