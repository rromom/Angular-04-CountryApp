import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';


  constructor( private countriesService: CountriesService){

  }

  ngOnInit(): void {
    const { term, countries } = this.countriesService.cacheStore.byCountry;
    this.countries = countries;
    this.initialValue = term;

  }

  searchByCountry( country: string ): void {
    this.isLoading = true;
    this.countriesService.searchCountry( country ).subscribe(
      countries => [this.countries = countries, this.isLoading = false] );
  }

}
