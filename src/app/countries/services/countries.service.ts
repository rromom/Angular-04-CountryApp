import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) {}

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
    return this.getCountriesHttpRequest('capital', capital);
  }

  searchCountry( country: string ): Observable<Country[]>{
    return this.getCountriesHttpRequest( 'name', country );
  }

  searchRegion( region: string ): Observable<Country[]>{
    return this.getCountriesHttpRequest('region', region);
  }

}
