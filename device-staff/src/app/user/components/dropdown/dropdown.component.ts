import { Component } from '@angular/core';
import { DeviceService } from '../../../services/device.service';


@Component({
  selector: 'app-dropdown',
  styleUrls: ['./dropdown.component.scss'],
  templateUrl: './dropdown.component.html'
})

export class DropdownComponent {

  dataDropdown: any;

  constructor(private deviceService: DeviceService) {
    this.deviceService.getData().subscribe(device => {
      this.dataDropdown = device
    })
  }

  getValueSelected(e) {
    console.warn(e)
  }

}
