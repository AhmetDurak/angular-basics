import { inject, Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Place } from './places/place.model';
import { catchError, tap, map, throwError, Observable, of } from 'rxjs';
import { ErrorService } from './shared/error.service';

//NOTE: Use signals to store data and transform to the approproite data object
//NOTE: subscriptions should be called by components and unsubscribed there if they're not needed.

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService)
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient)

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places', 
      'Something went wrong! Please try again later.')
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places', 
      'Something went wrong! Please try again later.'
    )
    .pipe(
        // map((resData) => resData.places),
        catchError((error) => {
          console.log(error)
          this.errorService.showError('Something went wrong! Please try again later!')
          return throwError(() => new Error('Something went wrong! Please try again later!'))
        }),
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces)
    }))
  }

  addPlaceToUserPlaces(place: Place) {
    if(this.userPlaces().some(userplace => userplace.id === place.id)){
      return of(this.userPlaces)
    }

    return this.httpClient.put('http://localhost:3000/user-places', { placeId: place.id })
      .pipe(
        tap({
          next: () => this.userPlaces.update(userPlaces => [...userPlaces, place])
        }),
        catchError(error => throwError(() => {
          this.errorService.showError('Failed to store selected place!')          
          return new Error('Failed to store selected place!')
        })),
    )
  }

  removeUserPlace(place: Place) {
    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        tap({
          next: () => this.userPlaces.set(this.userPlaces().filter(userPlace => userPlace.id !== place.id))
        }),
        catchError(error => throwError(() => {
          this.errorService.showError('Failed to delete from favorite places')
          return new Error('Failed to delete from favorite places')
        }))
      )
  }

  private fetchPlaces(url: string, errorMessage: string){
    //NOTE: get method returns an Observable and mostly emits once for HTTP calls, so we don't need actually destroying it, but it's a good practice to clean up subscriptions to avoid memory leaks in case of future changes.
    return this.httpClient.get<{places: Place[]}>(url,{
      //NOTE: we can observe more data other than data itself, like response, body, events
      // observe: 'events'
    })
    //NOTE: Useful to transform data (map, filter)
    .pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error)
        return throwError(() => new Error(errorMessage))
      })
    )
  }
}