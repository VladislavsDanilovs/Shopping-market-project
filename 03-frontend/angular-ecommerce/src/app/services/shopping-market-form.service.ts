import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';


@Injectable({
  providedIn: 'root'
})
export class ShoppingMarketFormService {

  private countriesUrl = environment.shoppingMarketApiUrl + '/countries';
  private statesUrl = environment.shoppingMarketApiUrl + '/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    // build an array for Month dropdown list
    // start at current month and loop until Month nr. 12

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    // The "of" operator from rxjs, will wrap an object as an Observable
    return of(data)
  }

  getCreditCardYears(): Observable<number[]>{
    
    let data: number[] = [];

    // build an array for Year dropdown list
    // start at current year and loop for next 10 years
    
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let theYear = startYear; theYear<=endYear; theYear++){
      data.push(theYear);
    }
    //Angular component will subscribe to this method to recieve this async data
    return of(data);
  }
}

// unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
