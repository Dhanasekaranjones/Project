import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private messageSource = new BehaviorSubject(null);
   currentMessage = this.messageSource.asObservable();


  private editSource = new BehaviorSubject(null);
   editData = this.editSource.asObservable();



  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  editForm(message: any){
    this.editSource.next(message)
  }
  
}
