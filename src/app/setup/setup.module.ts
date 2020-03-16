import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PositionsComponent } from "./positions/positions.component";
import { CandidatesComponent } from "./candidates/candidates.component";
import { SetupComponent } from "./setup.component";
import { VotersComponent } from "./voters/voters.component";
import { ElectionsComponent } from './elections/elections.component';

const routes: Routes = [
  {
    path: "",
    component: SetupComponent,
    children: [
      { path: "elections", component: ElectionsComponent },
      { path: "positions", component: PositionsComponent },
      { path: "candidates", component: CandidatesComponent },
      { path: "voters", component: VotersComponent }
    ]
  }
];

@NgModule({
  declarations: [
    PositionsComponent,
    CandidatesComponent,
    SetupComponent,
    VotersComponent,
    ElectionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SetupModule { }
