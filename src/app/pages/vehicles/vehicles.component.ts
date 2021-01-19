import { Component, OnInit } from '@angular/core';
import {SwapiService} from '../../_services/swapi.service';
import {VehicleModel} from '../../_models/vehicle.model';
import {ViewModes} from './view.modes';
import {PilotModel} from '../../_models/pilot.model';
import {UnsplashService} from '../../_services/unsplash.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  ViewModes: typeof ViewModes = ViewModes;
  viewMode: number = ViewModes.Vehicles;

  vehicles: Array<VehicleModel>;
  pilots: Array<PilotModel>;
  photos: Array<any>;

  selectedVehicle: VehicleModel = null;
  selectedPilot: PilotModel = null;

  constructor(
    private swapiService: SwapiService,
    private unsplashService: UnsplashService
  ) {
    this.swapiService.vehiclesRefreshed.subscribe( (response: any) => {
      this.vehicles = this.swapiService.vehicles;
    });

    this.swapiService.pilotsRefreshed.subscribe( (response) => {
      this.pilots = this.swapiService.pilots;
    });

    this.unsplashService.photosRefreshed.subscribe( (response) => {
      this.photos = this.unsplashService.photos;
    });
  }

  ngOnInit(): void {
    const vehicles = this.swapiService.vehicles;
    if (vehicles && (Object.keys(vehicles).length > 0)) {
      this.vehicles = vehicles;
    }

    const pilots = this.swapiService.pilots;
    if (pilots && (Object.keys(pilots).length > 0)) {
      this.pilots = pilots;
    }

    const photos = this.unsplashService.photos;
    if (photos && (Object.keys(photos).length > 0)) {
      this.photos = photos;
    }
  }

  selectVehicle(vehicle: VehicleModel): void {
    this.selectedVehicle = vehicle;
    this.viewMode = this.ViewModes.Details;
  }

  backToVehicles(): void {
    this.selectedVehicle = null;
    this.viewMode = this.ViewModes.Vehicles;
  }

  selectPilot(pilot: PilotModel): void {
    this.selectedPilot = pilot;
    this.viewMode = this.ViewModes.Pilot;
  }

  backToPilots(): void {
    this.selectedPilot = null;
    this.viewMode = this.ViewModes.Details;
  }

  getVehicleRandomImage(): string {
    const randImage = this.photos[Math.floor(Math.random() * this.photos.length)];
    return randImage.urls.regular;
  }

}
