import { Component, OnInit, Input } from '@angular/core';

// Constants
import { CoreConstant } from '@core/constants/core.constant';

// Interfaces
import { TeamForm } from '@core/interfaces/league.interface';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  @Input() form: string;

  public formInfo: TeamForm;

  constructor() { }

  ngOnInit(): void {
    this.formInfo = CoreConstant.TEAM_FORMS_LIST.find((item) => item.form.toUpperCase() === this.form.toUpperCase());
  }
}
