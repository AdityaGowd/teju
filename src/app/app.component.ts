import { Component, OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { SweetAlertService } from 'angular-sweetalert-service';
import swal from 'sweetalert2';
import Swal from 'sweetalert';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  data1;
  data;
  result: Object;
  result1: Object;
  d;SweetAlertService
constructor(private s:CrudService,private g:FormBuilder,private ht:HttpClient){}
employeeForm=this.g.group({
  id:[''],
  name:[''],
  age:['']
})
 ngOnInit(){
   this.s.get().subscribe(resp=>this.data1=resp)

 } 
 submit(){
   this.s.post(this.employeeForm.value).subscribe(res=>{
     this.data=res;
     console.log(res);
     if(res){
       this.s.get().subscribe(resp=>this.data1=resp);
       // swal({
//title: "Are you sure?",
        //: "Once deleted, you will not be able to recover this imaginary file!",
//type: 'warning',
        // showConfirmButton: true,
        // showCancelButton: true     
      //})
     }
    //  Swal("Here's a message!", "It's pretty, isn't it?")
   });
   this.employeeForm.reset();
 }
 edit(d){
   this.employeeForm.setValue({
     id:d.id,
     name:d.name,
     age:d.age
   })
 }
//  update(d){
//    this.s.edit(d).subscribe(reps=>
//     {
//      this.result=reps;
//      this.employeeForm.setValue({
//        id:this.result.id,
//        name:this.result.name,
//        age:this.result.age,
//      })
//     })
//  }
 delete(d){
  
  

swal.fire({
title: 'Are you sure?',
text: "You won't be able to revert this!",
type: 'warning',
showCancelButton: true,
allowOutsideClick: false,
confirmButtonText: 'Yes, delete it!',
cancelButtonText: 'No, cancel!',
reverseButtons: true
}).then((result) => {
if (result.value) {
  //console.log(d);
this.s.delete(d.id).subscribe(resp=>{console.log(resp)
if(resp)
{
  swal.fire(
    'Deleted!',
    'Your file has been deleted.',
    'success'
    )
  this.s.get().subscribe(resp=>this.data1=resp)
}})

}

else{
swal.fire(
'Cancelled',
'Your file is safe :)',
'error'
)
}
})
}





Upate(){
   this.s.Update(this.employeeForm.value).subscribe(data=>{console.log(data)
  if(data) {
    Swal('Any fool can use a computer')
    this.s.get().subscribe(resp=>this.data1=resp)

  }
  })
   window.location.reload();
 }
 
 
}
