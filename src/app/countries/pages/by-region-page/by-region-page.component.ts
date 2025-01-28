import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Regions } from '../../interfaces/region.interface';


@Component({
  selector: 'app-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];

  public regions: Regions[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  public selectedRegion?: Regions;

  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ){

  }

  ngOnInit(): void {
    const { region, countries } = this.countriesService.cacheStore.byRegion;
    this.countries = countries;
    this.selectedRegion = region;
  }

  searchByRegion( region: Regions ){

    this.isLoading = true;

    this.selectedRegion = region;

    this.countriesService.searchRegion( region ).subscribe(
      countries => [this.countries = countries, this.isLoading = false ]
    );


  }




}
