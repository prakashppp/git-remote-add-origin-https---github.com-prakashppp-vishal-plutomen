import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestoData } from '../restodata';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private as:ApiService,private fb:FormBuilder,private arouter:ActivatedRoute){
    this.getAll();
    }

  
    mform!:FormGroup
  
    restoData:RestoData[]=[];
     restoObject = new RestoData
  
    showAdd:boolean=false
    showupdate:boolean=false
  
    ngOnInit(){
    this.mform=this.fb.group({
      Name:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      Email:['',Validators.pattern("^[a-z0-9]+@[a-z]+\.[a-z]{2,}$")],
      Address:[''],
      Mobile:['',[Validators.required,Validators.pattern("^[7-9][0-9]{9}$")]],
      Gender:[''],
      Role:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]]
    })

    this.arouter.params.subscribe(params=>{
      if(params['searchItem']){
        this.as.getAll().subscribe((data)=>{
            this.restoData=data.filter(data.name.toLowerCase().includes(params['searchItem'].toLowerCase()));
        })
      }
      if(!params['searchItem']){
        this.as.getAll().subscribe((data)=>{
          this.restoData=data;
          console.log('data fetched');
        })
      }
    })

        
    }
    clickAddCusto()
    {
     // this.formValue.reset();
      this.showAdd = true;
      this.showupdate = false;
    }
  
    getAll(){
    this.as.getAll().subscribe(data =>{
      this.restoData=data;
    })
    }
  
    addCustomer(data:any){
       this.as.addCustomer(data).subscribe(() =>{
      window.alert("Customer added successfully");
      this.mform.reset();
      this.getAll();
     })
    
    }
  
    edit(data:any){
  
    this.showAdd = false;
      this.showupdate = true;
  
    this.restoObject.id=data.id;
    this.mform.controls['Name'].setValue(data.Name)
    this.mform.controls['Email'].setValue(data.Email)
    this.mform.controls['Address'].setValue(data.Address)
    this.mform.controls['Mobile'].setValue(data.Mobile)
    this.mform.controls['Gender'].setValue(data.Gender)
    this.mform.controls['Role'].setValue(data.Role)
    }
  
    updateCustomer(){
  
    this.restoObject.Name=this.mform.value.Name;
    this.restoObject.Email=this.mform.value.Email;
    this.restoObject.Address=this.mform.value.Address;
    this.restoObject.Mobile=this.mform.value.Mobile;
    this.restoObject.Gender=this.mform.value.Gender;
    this.restoObject.Role=this.mform.value.Role;
  
       this.as.updateCustomer(this.restoObject.id,this.restoObject).subscribe(()=>{
      window.alert("Customer Updated");
      this.getAll();
      this.mform.reset();
     })
    }
  
   
    deleteCustomer(id:number){
    if(confirm('Do you want to delete')){
    this.as.deleteCustomer(id).subscribe(()=>{
      this.getAll();
      window.alert("Customer Deleted");
    })
   }
  
    }
    //modal
    private modalService = inject(NgbModal);
    closeResult = '';
  
    open(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    }
  
    private getDismissReason(reason: any): string {
      switch (reason) {
        case ModalDismissReasons.ESC:
          return 'by pressing ESC';
        case ModalDismissReasons.BACKDROP_CLICK:
          return 'by clicking on a backdrop';
        default:
          return `with: ${reason}`;
      }
    }
  

}
