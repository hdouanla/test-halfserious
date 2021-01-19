import {PilotModel} from './pilot.model';
import {FilmModel} from './film.model';

export class VehicleModel {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: number;
  max_atmosphering_speed: number;
  crew: number;
  passengers: number;
  cargo_capacity: number;
  consumables: string;
  vehicle_class: string;
  pilots: Array<PilotModel>;
  films: Array<FilmModel>;
  created: string;
  edited: string;
  url: string;
}
