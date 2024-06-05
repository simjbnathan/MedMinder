import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../models/patient.model';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../../services/patient.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  @Input() patient: Patient | undefined;
  @Output() patientSubmitted = new EventEmitter<Patient>();

  patientForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    console.log('Initializing Patient Form');
    console.log('Received Patient Data:', this.patient);

    if (this.patient) {
      this.patientForm.patchValue(this.patient);
      console.log('Form patched with patient data:', this.patientForm.value);
    }
  }

  submitForm(): void {
    if (this.patientForm.valid) {
      const formData = this.patientForm.value;
      const editedPatient: Patient = {
        id: this.patient?.id ?? null,
        firstName: formData.firstName,
        lastName: formData.lastName,
        city: formData.city,
        isActive: formData.isActive
      };

      console.log('Edited Patient Data:', editedPatient);

      const operation = this.patient && this.patient.id !== null ?
        this.patientService.editPatient(editedPatient) :
        this.patientService.addPatient(editedPatient);

      operation.subscribe(
        (response) => {
          const action = this.patient && this.patient.id !== null ? 'updated' : 'added';
          console.log(`Patient ${action} successfully:`, response);
          this.patientSubmitted.emit(response);
          this.patientForm.reset();
          this.activeModal.close();
        },
        (error) => {
          const action = this.patient && this.patient.id !== null ? 'updating' : 'adding';
          console.error(`Error ${action} patient:`, error);
          // Display user-friendly error message
        }
      );
    }
  }



}