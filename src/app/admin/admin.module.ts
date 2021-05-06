import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin.component';
import { CompetitorsComponent } from './competitors/competitors.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { EditWinnersComponent } from './edit-winners/edit-winners.component';
import { FundAccountComponent } from './fund-account/fund-account.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuizTimeComponent } from './quiz-time/quiz-time.component';

import { AdminGuardService } from './admin-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      { path: 'fund-account', component: FundAccountComponent },
      { path: 'add-question', component: EditQuestionComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'edit-winners', component: EditWinnersComponent },
      { path: 'competitors', component: CompetitorsComponent },
      { path: 'quiz-time', component: QuizTimeComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    FundAccountComponent,
    EditQuestionComponent,
    QuestionsComponent,
    CompetitorsComponent,
    QuizTimeComponent,
    EditWinnersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminModule {}