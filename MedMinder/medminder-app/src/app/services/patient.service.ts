import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addPatient(item: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, item);
  }

  editPatient(item: Patient): Observable<Patient> {
    const url = `${this.apiUrl}/${item.id}`;
    return this.http.put<Patient>(url, item);
  }

  deletePatient(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
