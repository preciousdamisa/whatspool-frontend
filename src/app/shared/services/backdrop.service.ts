import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackdropService {
  showBackdrop = new Subject<boolean>()
}
