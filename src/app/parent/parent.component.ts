import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  message: string;
  subscription: Subscription;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  lat: string;lng: string;
  constructor(private formBuilder: FormBuilder, private data: SharedService,private cdr:ChangeDetectorRef,private router: Router) {}
// convenience getter for easy access to form fields
  get f() {
  return this.registerForm.controls;
  }
  ngOnInit(): void {
    this.subscription = this.data.editData.subscribe((message:any) =>{      
      console.log('m',message);      
      if(message){
        this.registerForm.patchValue(message)
        this.cdr.detectChanges();
      }
    });
    console.log('this.registerForm',this.registerForm);
    this.resetForm();
    let formValue = JSON.parse(localStorage.getItem('data'))
    this.registerForm.patchValue(formValue)
    console.log(formValue);
  }
  resetForm(){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(250)]],
      isEdit:[false],
      index:[null],
      lat: [this.lat],
      lng:[this.lng]
    });
  }
  
  options={
    componentRestrictions:{
      country:["IN"]
    }
  }
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.data.changeMessage(this.registerForm.value);
    this.registerForm.reset()
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].setErrors(null)
    });
    alert('User Added');
    this.router.navigateByUrl('/child')
    
  }


  public AddressChange(address: any) {
    //setting address from API to local variable
     this.registerForm.patchValue({address:address.formatted_address})
     this.lat = address.geometry.location.lat();
     this.lng = address.geometry.location.lng();
    this.registerForm.patchValue({lat:this.lat})
    this.registerForm.patchValue({lng:this.lng})
    // console.log(address);
   
    console.log(this.lat,this.lng);
     
  }
}
