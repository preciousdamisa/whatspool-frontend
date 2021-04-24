import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { CompetitionComponent } from './competition/competition.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReferralInfoComponent } from './referral-info/referral-info.component';
import { SignupComponent } from './user/signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { FundAccountComponent } from './admin/fund-account/fund-account.component';
import { EditQuestionComponent } from './admin/edit-question/edit-question.component';
import { CheckQuizStatusComponent } from './competition/check-quiz-status/check-quiz-status.component';
import { RegisterComponent } from './competition/register/register.component';
import { QuizComponent } from './competition/quiz/quiz.component';
import { HasEndedComponent } from './competition/has-ended/has-ended.component';
import { NotYetTimeComponent } from './competition/not-yet-time/not-yet-time.component';
import { CompletionComponent } from './competition/completion/completion.component';
import { WinnersComponent } from './competition/winners/winners.component';
import { QuestionsComponent } from './admin/questions/questions.component';
import { QuestionsAndAnswersComponent } from './competition/questions-and-answers/questions-and-answers.component';
import { CompetitorsComponent } from './admin/competitors/competitors.component';
import { QuizTimeComponent } from './admin/quiz-time/quiz-time.component';
import { EditWinnersComponent } from './admin/edit-winners/edit-winners.component';

import { AuthGuardService } from './user/auth-guard.service';
import { AdminGuardService } from './admin/admin-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardService],
  },
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
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'referral-info', component: ReferralInfoComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
