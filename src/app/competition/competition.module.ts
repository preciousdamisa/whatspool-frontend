import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckQuizStatusComponent } from './check-quiz-status/check-quiz-status.component';
import { CompetitionComponent } from './competition.component';
import { CompletionComponent } from './completion/completion.component';
import { HasEndedComponent } from './has-ended/has-ended.component';
import { NotYetTimeComponent } from './not-yet-time/not-yet-time.component';
import { QuestionsAndAnswersComponent } from './questions-and-answers/questions-and-answers.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterComponent } from './register/register.component';
import { WinnersComponent } from './winners/winners.component';

import { AuthGuardService } from '../user/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'competition',
    component: CompetitionComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'check-status', component: CheckQuizStatusComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'not-yet-time',
        component: NotYetTimeComponent,
      },
      { path: 'quiz', component: QuizComponent },
      { path: 'completion/:score', component: CompletionComponent },
      { path: 'has-ended', component: HasEndedComponent },
      { path: 'winners', component: WinnersComponent },
      {
        path: 'questions-and-answers',
        component: QuestionsAndAnswersComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    CompetitionComponent,
    RegisterComponent,
    QuizComponent,
    CheckQuizStatusComponent,
    NotYetTimeComponent,
    HasEndedComponent,
    CompletionComponent,
    WinnersComponent,
    QuestionsAndAnswersComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class CompetitionModule {}
