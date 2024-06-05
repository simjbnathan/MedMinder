import { Component, ViewEncapsulation } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  imports: [CommonModule, HttpClientModule, PatientFormComponent, NgbModalModule],
  encapsulation: ViewEncapsulation.None // Needed to apply styles to the modal
})
export class PatientListComponent {
  patients: Patient[] = [];
  errorMessage?: string;
  selectedPatient?: Patient;
  showAddForm: boolean = false;
  newPatient: Patient | undefined;

  constructor(private patientService: PatientService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPatients();


  }

  getPatients(): void {
    this.patientService.getPatients()
      .subscribe(
        patients => {
          this.patients = patients;
          console.log('Patients fetched successfully.', patients);
        },
        error => {
          this.errorMessage = error.message || 'An error occurred while fetching patients.';
          console.error('Error:', error);
        }
      );
  }

  showAddPatientForm(): void {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.openModal();
    }
  }

  openModal(): void {
    const modalRef = this.modalService.open(PatientFormComponent, { size: 'lg', centered: true });
    this.newPatient = { id: 0, firstName: '', lastName: '', city: '', isActive: false };
    modalRef.componentInstance.patient = this.newPatient;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.addPatient(result);
          this.refreshTable();
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
        this.refreshTable(); // Refresh table on dismissal
      }
    );
  }

  addPatient(patient: Patient): void {
    this.patients.push(patient);
    this.showAddForm = false;
  }

  editPatient(patient: Patient): void {
    this.selectedPatient = { ...patient };
    const modalRef = this.modalService.open(PatientFormComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.patient = { ...patient }; // Pass the selected patient to the form component
    modalRef.result.then(
      (result) => {
        if (result) {
          // Update patient details
          Object.assign(patient, result);
          this.refreshTable();
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
        this.refreshTable(); // Refresh table on dismissal
      }
    );
  }

  deletePatient(patient: Patient): void {
    // Assuming you have a delete method in your PatientService
    this.patientService.deletePatient(patient.id)
      .subscribe(
        () => {
          this.patients = this.patients.filter(p => p !== patient); // Remove the deleted patient from the list
          this.refreshTable();
        },
        error => {
          console.error('Error deleting patient:', error);
        }
      );
  }




  refreshTable(): void {
    this.getPatients();
  }
}
