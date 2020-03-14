import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  user$: Observable<any>;
  image: any;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.get().subscribe(u => {
      // this.image = u["data"].photo.data.toString("base64");
        this.image = 'data:image/jpg;base64,' + u['data']['image'];
      // console.log(this.image);
    });
    // this.appService.getimage().subscribe(u => {
    //   this.image = 'data:image/jpg;base64,' + u['image'];
    //   console.log(u);
    // });
  }
}
