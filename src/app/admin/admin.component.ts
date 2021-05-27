import { Component, OnInit } from '@angular/core';

import { UserService } from '../user/user.service';
import { setWhatsPoolType } from '../competition/quiz/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  types = ['Select Type', 'Gen', 'Music', 'Sports'];
  showAlert = false;
  isAdmin: boolean | undefined;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.userService.getUser()?.isAdmin;
  }

  onViewQuestions(type: string) {
    setWhatsPoolType(type);
    this.router.navigateByUrl('/competition/questions-and-answers');
  }
}
