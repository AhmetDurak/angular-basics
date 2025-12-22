import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../places/place.model';
import { PlacesComponent } from '../places/places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('')
  private placesService = inject(PlacesService);
  private desroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true)
    const placesSubs = this.placesService.loadAvailablePlaces()
    .subscribe({
      next: (places) => {
        // console.log(event)
        // confirm.log(response.body?.places)
        // console.log(resData.places)
        this.places.set(places)
      },
      error: (error: Error) => {this.error.set(error.message)},
      complete: () => this.isFetching.set(false)
    })

    this.desroyRef.onDestroy(() => {
      placesSubs.unsubscribe();
    })
  }

  onSelectPlace(selectedPlace: Place){
      const addPlaceSubs = this.placesService.addPlaceToUserPlaces(selectedPlace)
        //NOTE: Without subscribe, request is not sent!
        .subscribe();
      
      this.desroyRef.onDestroy(() => addPlaceSubs.unsubscribe())
  }
}
