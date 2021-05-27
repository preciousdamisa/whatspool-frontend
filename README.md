# WhatspoolFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## TODO

- Add the selection of type to deleting questions, competitors and winners.
- Fix the error of NaN showing when the user navigates backwards, after not finishing
the quiz, and a user who finishes or didn't finish shouldn't see the WhatsPool has begun
page, when they navigate backwards. Also the possible -1 that shows when the time is up, try
to replicate it by setting the quiz duration to 600000
- Let the Time not move in the quiz page.
- Show "No Questions" in the questions and answers page, when there
are no questions.
- Code clean up, reuse CSS code by creating shared classes in
styles.css
- Change to managing state with ngRx
- Remove the check for nullness throughout the project. The user object should be adjusted
to reflect this.
- Implement separate methods in the date translator for return the time and date.