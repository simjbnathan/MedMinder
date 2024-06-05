import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientListComponent } from "./components/patient-list/patient-list.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, PatientListComponent]
})
export class AppComponent {
  title = 'medminder-app';
}
