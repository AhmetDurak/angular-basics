import { Directive, ElementRef, inject, input } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeave($event)'
    },
    hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
    queryParam = input<string>('myapp', {alias: 'appSafeLink'});
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor(){
        console.log('SafeLinkDirective is active');
    }

    onConfirmLeave(event: MouseEvent){
        const wantsToLeave = window.confirm('Do you want to leave the site?');

        if(wantsToLeave){
            // const address = (event.target as HTMLAnchorElement).href;
            // (event.target as HTMLAnchorElement).href = address + this.queryParam();
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + this.queryParam();

            return;
        }
        
        event.preventDefault();
    }
}