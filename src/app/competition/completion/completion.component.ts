import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.css'],
})
export class CompletionComponent implements OnInit {
  score!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.score = this.route.snapshot.params['score'];
  }
}
