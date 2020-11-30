import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-team-logo',
  templateUrl: './team-logo.component.html',
  styleUrls: ['./team-logo.component.scss']
})
export class TeamLogoComponent implements OnInit {
  @Input() url: string;
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {}
}
