import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

//NOTE: Obervables are used to handle asynchronous data streams, allowing you to work with data that arrives over time, such as user inputs, HTTP requests, or real-time data feeds.
//NOTE: Signals are great for managing application state in a reactive way, allowing components to automatically update when the underlying data changes.

//NOTE: Topic1: Using pipe to transform data streams with RxJS operators.
//NOTE: Topic2: Using effect to create reactive side effects with Angular signals.
//NOTE: Topic3: Using toObservable to convert Angular signals to RxJS observables for interoperability.
//NOTE: Topic4: Using toSignal to convert RxJS observables to Angular signals for seamless integration.
//NOTE: Topic5: Custom observables to emit data at specific intervals.

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  //NOTE: Using DestroyRef is helpful to manage subscriptions and clean up resources when a component is destroyed.
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 }); // Topic4: Convert observable to signal for seamless integration.

  // clickCount$ = toObservable(this.clickCount); // Topic3: Convert signal to observable for RxJS compatibility.

  //NOTE: Custom observable that emits a random number every 2 seconds.
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if(timesExecuted > 3){
        clearInterval(interval)
        subscriber.complete();
        return;
      }
      timesExecuted++;
      subscriber.next(timesExecuted);
    }, 2000);
  })

  constructor(){
    //NOTE: Topic2: effect is used to create reactive side effects that automatically re-run when the signals(inside effect method) are updated.
    // effect(() => {
    //   console.log(`Button clicked: ${this.clickCount()} times`);
    // })
  }

  ngOnInit(): void {
/*    //NOTE: Topic1: pipe is used to be able to chain multiple operators together (map, filter, etc) to transform or manipulate the data emitted by an observable.
    const subs = interval(1000).pipe(
      map((val) => val * 2)
    ).subscribe({
      next: (val) => console.log(`Interval tick: ${val}`)
      // error: (err) => console.error('Error in interval observable:', err),
      // complete: () => console.log('Interval observable completed')
    })
    this.destroyRef.onDestroy(() => {subs.unsubscribe()}); // Clean up subscription on component destroy. Use this to avoid memory leaks.
    */
    // // Topic3: 
    // const countSubs = this.clickCount$.subscribe({
    //   next: (count) => console.log(`Button clicked: ${count} times`)
    // })
    // this.destroyRef.onDestroy(() => {countSubs.unsubscribe()}); // Always clean up subscriptions on component destroy to avoid memory leaks.

    this.customInterval$.subscribe({
      next: (val) => console.log(`Custom Interval emitted value: ${val}`),
      complete: () => console.log('Custom Interval observable completed'),
      error: (err) => console.error('Error in custom interval observable:', err)
    })
  }

  onClick() {
    this.clickCount.update(count => count + 1);
  }
}
