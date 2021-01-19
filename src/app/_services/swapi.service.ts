import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {VehicleModel} from '../_models/vehicle.model';
import {PilotModel} from '../_models/pilot.model';
import {from, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private baseUrl = environment.baseUrl;
  public vehicles: Array<VehicleModel>;
  public pilots: Array<PilotModel> = [];

  public vehiclesRefreshed: Subject<boolean> = new Subject<boolean>();
  public pilotsRefreshed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) {}

  getVehicles(): Observable<Array<VehicleModel>> {
    const vehicles = new Promise<Array<VehicleModel>>((resolve, reject) => {
      if (this.vehicles && (Object.keys(this.vehicles).length > 0)) {
        resolve(this.vehicles as Array<VehicleModel>);
        this.vehiclesRefreshed.next(true);
      } else {
        this.http.get(`${this.baseUrl}/vehicles/?ver=${new Date().getTime()}`).subscribe((response: any) => {
          if (response) {
            this.vehicles = response.results;
            this.vehiclesRefreshed.next(true);
            resolve(this.vehicles as Array<VehicleModel>);
          } else {
            reject(null);
          }

        });
      }
    });

    return from(vehicles);
  }

  getPilot(pilotURL): Observable<PilotModel> {
    const pilot = new Promise<PilotModel>((resolve, reject) => {
      if (this.pilots && this.pilots[pilotURL]) {
        resolve(this.pilots[pilotURL] as PilotModel);
        this.vehiclesRefreshed.next(true);
      } else {
        this.http.get(`${pilotURL}?ver=${new Date().getTime()}`).subscribe((response: any) => {
          if (response) {
            this.pilots[pilotURL] = response;
            this.pilotsRefreshed.next(true);
            resolve(this.pilots[pilotURL] as PilotModel);
          } else {
            reject(null);
          }

        });
      }
    });

    return from(pilot);
  }
}
