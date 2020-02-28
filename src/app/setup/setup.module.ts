import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PositionsComponent } from "./positions/positions.component";
import { CandidatesComponent } from "./candidates/candidates.component";
import { SetupComponent } from "./setup.component";
import { VotersComponent } from "./voters/voters.component";

const routes: Routes = [
  { path: "positions", component: PositionsComponent },
  { path: "candidates", component: CandidatesComponent },
  { path: "voters", component: VotersComponent },
  { path: "", component: SetupComponent }
];

@NgModule({
  declarations: [
    PositionsComponent,
    CandidatesComponent,
    SetupComponent,
    VotersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SetupModule {}
