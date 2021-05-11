import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-has-ended',
  templateUrl: './has-ended.component.html',
  styleUrls: ['./has-ended.component.css'],
})
export class HasEndedComponent {
  quizStartTime = environment.whatspoolGenStartTime;
  quizEndTime = environment.whatspoolGenEndTime;
}
