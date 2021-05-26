import { Component } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  whatsPoolGenStartTime = environment.whatsPoolGenStartTime;
  whatsPoolGenEndTime = environment.whatsPoolGenEndTime;
  whatsPoolMusicStartTime = environment.whatsPoolMusicStartTime;
  whatsPoolMusicEndTime = environment.whatsPoolMusicEndTime;
  whatsPoolSportsStartTime = environment.whatsPoolSportsStartTime;
  whatsPoolSportsEndTime = environment.whatsPoolSportsEndTime;
  noOfWinners = environment.numberOfWinners;
  noOfWinnersSpeltOut = environment.numberOfWinnersSpeltOut;
}
