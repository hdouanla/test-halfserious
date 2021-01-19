import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {VehicleModel} from '../_models/vehicle.model';
import {PilotModel} from '../_models/pilot.model';
import {from, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  private unsplashUrl = environment.unsplashUrl;
  private unsplashAccessKey = environment.unsplashAccessKey;
  public photos: Array<any>;

  public photosRefreshed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient
  ) {}

  getPhotos(): Observable<Array<VehicleModel>> {
    const photos = new Promise<Array<any>>((resolve, reject) => {
      if (this.photos && (Object.keys(this.photos).length > 0)) {
        resolve(this.photos as Array<any>);
        this.photosRefreshed.next(true);
      } else {
        this.http.get(`${this.unsplashUrl}/photos/?client_id=${this.unsplashAccessKey}&ver=${new Date().getTime()}`).subscribe((response: any) => {
          if (response) {
            this.photos = response;
            this.photosRefreshed.next(true);
            resolve(this.photos as Array<any>);
          } else {
            reject(null);
          }

        });
      }
    });

    return from(photos);
  }
}
