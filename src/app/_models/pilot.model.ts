import {FilmModel} from './film.model';

export class PilotModel {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<FilmModel>;
  species: string;
  vehicles: string;
  starships: string;
  created: string;
  edited: string;
  url: string;
}
