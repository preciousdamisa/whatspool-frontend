import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CompetitionComponent } from './competition/competition.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AccountComponent } from './account/account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TransactionsComponent } from './account/transactions/transactions.component';
import { UserDataComponent } from './account/user-data/user-data.component';
import { TransfersComponent } from './account/transfers/transfers.component';
import { StatisticsComponent } from './account/statistics/statistics.component';
import { AdminComponent } from './admin/admin.component';
import { FundAccountComponent } from './admin/fund-account/fund-account.component';
import { RegisterComponent } from './competition/register/register.component';
import { EditQuestionComponent } from './admin/edit-question/edit-question.component';
import { QuizComponent } from './competition/quiz/quiz.component';
import { CheckQuizStatusComponent } from './competition/check-quiz-status/check-quiz-status.component';
import { NotYetTimeComponent } from './competition/not-yet-time/not-yet-time.component';
import { HasEndedComponent } from './competition/has-ended/has-ended.component';
import { CompletionComponent } from './competition/completion/completion.component';
import { WinnersComponent } from './competition/winners/winners.component';
import { QuestionsComponent } from './admin/questions/questions.component';
import { CompetitorsComponent } from './admin/competitors/competitors.component';
import { QuestionsAndAnswersComponent } from './competition/questions-and-answers/questions-and-answers.component';
import { QuizTimeComponent } from './admin/quiz-time/quiz-time.component';
import { EditWinnersComponent } from './admin/edit-winners/edit-winners.component';
import { InPageSpinnerComponent } from './shared/components/in-page-spinner/in-page-spinner.component';
import { AlertComponent } from './shared/components/alert/alert.component';

import { AuthInterceptorService } from './user/auth-interceptor.service';
import { Alert2Component } from './shared/components/alert2/alert2.component';
import { ErrorAlertComponent } from './shared/components/error-alert/error-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    ContactUsComponent,
    AccountComponent,
    CompetitionComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    TransactionsComponent,
    UserDataComponent,
    TransfersComponent,
    StatisticsComponent,
    AdminComponent,
    FundAccountComponent,
    RegisterComponent,
    EditQuestionComponent,
    QuizComponent,
    CheckQuizStatusComponent,
    NotYetTimeComponent,
    HasEndedComponent,
    CompletionComponent,
    WinnersComponent,
    QuestionsComponent,
    CompetitorsComponent,
    QuestionsAndAnswersComponent,
    InPageSpinnerComponent,
    QuizTimeComponent,
    EditWinnersComponent,
    AlertComponent,
    Alert2Component,
    ErrorAlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
