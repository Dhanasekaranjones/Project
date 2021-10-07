import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  message:any;
  registerForm: FormGroup;
  subscription: Subscription;
  uData:Array<any>=[];lat: string;lng: string;
  constructor(private data: SharedService,private router:Router) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe((message:any) =>{      
    if(message){
      if(message.isEdit === true){
        console.log('m1',message);        
        this.uData[message.index]=message;
      }        
      else{
        console.log('m2',message);
        this.uData.push(message)
      }
    }  
    });
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  Delete(d){
    localStorage.clear();
    alert('User Deleted');
    const index = this.uData.indexOf(d);
    this.uData.splice(index, 1);
  }
  edit(item,index){   
    item.isEdit=true;
    item.index=index;
    this.data.editForm(item); 
    console.log(localStorage.setItem('data',JSON.stringify(item)));
    
    this.router.navigateByUrl('/parent',item);   
  }
}
