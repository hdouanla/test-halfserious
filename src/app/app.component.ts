import {Component, OnInit} from '@angular/core';
import {SwapiService} from './_services/swapi.service';
import {VehicleModel} from './_models/vehicle.model';
import {PilotModel} from './_models/pilot.model';
import {forkJoin} from 'rxjs';
import {UnsplashService} from './_services/unsplash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'testProject';
  preloadingData = false;

  constructor(
    private swapiService: SwapiService,
    private unsplashService: UnsplashService
  ) {
  }
  ngOnInit(): void {
    const vehicles = this.swapiService.vehicles;
    if (!(vehicles && (Object.keys(vehicles).length > 0))) {
      this.preloadData();
    }
  }

  preloadData(): void{
    this.swapiService.getVehicles().subscribe( (response: VehicleModel[]) => {
      for (const i in response) {
        const vehiclPilots = response[i].pilots;
        if (vehiclPilots && vehiclPilots.length) {
          for (const j in vehiclPilots) {
            this.swapiService.getPilot(vehiclPilots[j]).subscribe( (pilotResponse: PilotModel) => {
              // Do something here
            });
          }
        }
      }
    });

    this.unsplashService.getPhotos().subscribe( (response: any) => {
      // Do something here with photos
    });
  }
}
