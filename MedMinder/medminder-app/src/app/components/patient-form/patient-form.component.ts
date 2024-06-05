import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../models/patient.model';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    if (this.patient) {
      this.patientForm.patchValue(this.patient);
    }
  }

  submitForm(): void {
    if (this.patientForm.valid) {
      const formData = this.patientForm.value;
      const newPatient: Patient = {
        id: this.patient ? this.patient.id : 0,
        firstName: formData.firstName,
        lastName: formData.lastName,
        city: formData.city,
        isActive: formData.isActive
      };
      this.patientSubmitted.emit(newPatient);
      this.activeModal.close(newPatient);
    }
  }
}
