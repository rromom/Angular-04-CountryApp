import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Regions } from '../interfaces/region.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocal();
  }

  private saveToLocalStorage(): void{
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocal(): void{
    if( !localStorage.getItem('cacheStore') ) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getCountriesHttpRequest( urlTerm: string, term: string ): Observable<Country[]>{

    const url = `${ this.apiUrl }/${ urlTerm }/${ term }`;

    return this.http.get<Country[]>( url ).pipe(
      catchError( error => of ([]) ),
      delay( 2000 )
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null >{
    const url = `${this.apiUrl}/alpha/${ code }`;
    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null  ),
      catchError( () =>  of(null)
    ) );
  }

  searchCapital( capital: string ): Observable<Country[]> {
    return this.getCountriesHttpRequest('capital', capital)
    .pipe(
      tap( countries => this.cacheStore.byCapital = { term: capital, countries } ),
      tap( () => this.saveToLocalStorage() )
    );;
  }

  searchCountry( country: string ): Observable<Country[]>{
    return this.getCountriesHttpRequest( 'name', country )
      .pipe(
        tap( countries => this.cacheStore.byCountry = { term: country, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchRegion( region: Regions ): Observable<Country[]>{
    return this.getCountriesHttpRequest('region', region)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries }  ),
        tap( () => this.saveToLocalStorage() )
      );
  }

}
