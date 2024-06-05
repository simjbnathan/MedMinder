import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Patient } from '../models/patient.model';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientsById(id: number): Observable<Patient> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Patient>(url);
  }

  addPatient(patient: Patient): Observable<Patient> {
    // Ensure 'id' is set to 0 for new patient
    const newPatient = { ...patient, id: 0 };
    return this.http.post<Patient>(this.apiUrl, newPatient).pipe(
      catchError(this.handleError)
    );
  }

  editPatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${patient.id}`, patient).pipe(
      catchError(this.handleError)
    );
  }
  deletePatient(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
