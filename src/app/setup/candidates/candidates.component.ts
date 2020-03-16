import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  imageUrl: any;
  imageError: string;
  constructor() {}

  ngOnInit(): void {}

  previewImage(event: Event) {
    // tslint:disable-next-line:no-string-literal
    const file = event.target['files'][0] as File;
    if (!file) { return; }

    // Validate file input
    const mimetype = file.type;
    if (mimetype.match(/image\/*/) === null) {
      this.imageError = 'Only images are supported!';
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.imageUrl = reader.result;
    };
  }
}
