import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private dummyPatients: Patient[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', city: 'New York', isActive: true },
    { id: 2, firstName: 'Jane', lastName: 'Smith', city: 'Los Angeles', isActive: false }
  ];

  constructor() { }

  getPatients(): Observable<Patient[]> {
    return of(this.dummyPatients);
  }

  addPatient(patient: Patient): Observable<Patient> {
    const newId = this.dummyPatients.length + 1;
    const newPatient: Patient = { ...patient, id: newId };
    this.dummyPatients.push(newPatient);
    return of(newPatient);
  }

  updatePatient(updatedPatient: Patient): Observable<Patient | null> {
    const index = this.dummyPatients.findIndex(p => p.id === updatedPatient.id);
    if (index !== -1) {
      this.dummyPatients[index] = { ...updatedPatient };
      return of(updatedPatient);
    } else {
      return of(null);
    }
  }

  deletePatient(id: number): Observable<boolean> {
    const index = this.dummyPatients.findIndex(p => p.id === id);
    if (index !== -1) {
      this.dummyPatients.splice(index, 1);
      return of(true);
    } else {
      return of(false);
    }
  }
}
