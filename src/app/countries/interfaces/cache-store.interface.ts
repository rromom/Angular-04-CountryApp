import { Country } from "./country";
import { Regions } from "./region.interface";

export interface CacheStore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion: RegionCountries;

}

interface TermCountries {
  term: string;
  countries: Country[];
}

interface RegionCountries {
  region: Regions;
  countries: Country[];
}


