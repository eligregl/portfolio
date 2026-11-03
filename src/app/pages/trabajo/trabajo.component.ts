import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-trabajo',
    imports: [RouterLink],
    templateUrl: './trabajo.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './trabajo.component.css'
})
export class TrabajoComponent {}
