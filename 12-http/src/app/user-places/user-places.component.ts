import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places/places.component';
import { Place } from '../places/place.model';
import { PlacesService } from '../places.service';


@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{
  // places = signal<Place[] | undefined>(undefined)
  isFetching = signal(false)  
  error = signal('')
  private placesService = inject(PlacesService)
  private destroyRef = inject(DestroyRef)
  places = this.placesService.loadedUserPlaces
    
  ngOnInit() {
    this.isFetching.set(true)
    const placesSubs = this.placesService.loadUserPlaces()
      .subscribe({
        // next: (places) => this.places.set(places),
        error: (error:Error) => console.info(error.message)
      })

      this.destroyRef.onDestroy(() => placesSubs.unsubscribe())
  }

  onRemovePlace(place: Place){
    const removeUserPlaceSubs = this.placesService.removeUserPlace(place).subscribe()

    this.destroyRef.onDestroy(() => removeUserPlaceSubs.unsubscribe())
  }
}
