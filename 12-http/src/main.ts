import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';


//NOTE: Interceptors are to help to manipulate the requests outgoing
//NOTE: We can add/edit header, transform data before it is sent

function loggingIterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn){
    const req = request.clone({
        headers: request.headers.set('X-DEBUG', 'TESTING')
    })
    console.log('[Outgoing Request' + request)

    return next(req)
    //NOTE: Also we can intercept the incoming data
    .pipe(
        tap({
            next: event => {
                if(event.type === HttpEventType.Response){
                    console.log('[Incomoing Response')
                    console.log(event.status + '\n' + event.body)
                }
            }
        })
    )
}

bootstrapApplication(AppComponent,{
    //NOTE: Without this, HttpClient won't work in standalone components
    providers: [
        provideHttpClient(
            // withInterceptors([loggingIterceptor])
        )
    ]
}).catch((err) => console.error(err));
