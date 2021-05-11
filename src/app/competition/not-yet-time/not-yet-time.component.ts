import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-not-yet-time',
  templateUrl: './not-yet-time.component.html',
  styleUrls: ['./not-yet-time.component.css'],
})
export class NotYetTimeComponent {
  quizStartTime = environment.whatspoolGenStartTime;
  quizEndTime = environment.whatspoolGenEndTime;
}
