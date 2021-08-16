import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services';
import { environment } from 'src/environments/environment';
import { PositionService } from '../../../services/position.service';
import { StaffService } from '../../../services/staff.service';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-information',
  templateUrl: 'information.component.html',
  styleUrls: ['information.component.scss']
})

export class InformationComponent implements OnInit {
  staff: any;
  gender: any;
  position: any;
  location: any;
  BackEnd = environment.BackEnd;

  constructor(private authService: AuthService,
    private positionService: PositionService,
    private staffService: StaffService,
    private locationService: LocationService) {
    this.authService.getUser().then(data => {
      this.staff = data
    })

    this.gender = this.staffService.getGender()

    this.positionService.getData().subscribe(position => {
      this.position = position
    })

    this.locationService.getLocation().subscribe(location => {
      this.location = location
    })
  }

  display(data) {
    return data['id'] + ' / ' + data['name'];
  }

    ngOnInit(): void {
    }
}
