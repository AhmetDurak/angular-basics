import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform {
    transform(
        value: string | number, 
        inputType: 'C' | 'F', 
        ouptputType: 'C' | 'F' = 'C'
    ) {
        let val: number;
        
        if(typeof value === 'string') {
            val = parseFloat(value);
        }else{
            val = value;
        }

        if(inputType === 'C' && ouptputType === 'F') {
            const fahrenheit = val * (9/5) + 32;
            return fahrenheit.toFixed(2) + ' °F';
        }
        else if(inputType === 'F' && ouptputType === 'C') {
            const celsius = (val - 32) * (5/9);
            return celsius.toFixed(2) + ' °C';
        } else {
            return val.toFixed(2) + ` °${ouptputType}`;
        }
    }

}