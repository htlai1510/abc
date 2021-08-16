import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services';
import { environment } from 'src/environments/environment';
import { PositionService } from '../../../services/position.service';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent {
  staff: any;
  gender: any;
  position: any;
  BackEnd = environment.BackEnd;

  constructor(private authService: AuthService,
    private positionService: PositionService,
    private staffService: StaffService) {
    this.authService.getUser().then(data => {
      this.staff = data
    })

    this.gender = this.staffService.getGender()

    this.positionService.getData().subscribe(position => {
      this.position = position
    })
  }
}
