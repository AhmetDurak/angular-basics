import { Component } from '@angular/core';
import { DashboardItemComponent } from "./dashboard-item/dashboard-item.component";
import { ServerStatusComponent } from "./server-status/server-status.component";
import { TrafficComponent } from "./traffic/traffic.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DashboardItemComponent, ServerStatusComponent, TrafficComponent, TicketsComponent, HeaderComponent],
})
export class AppComponent {
}
