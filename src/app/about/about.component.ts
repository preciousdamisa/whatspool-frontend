import { Component } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  quizStartTime = environment.whatspoolGenStartTime;
  quizEndTime = environment.whatspoolGenEndTime;
}
