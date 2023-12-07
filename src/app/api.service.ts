import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { RestoData } from './restodata';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  
  getAll():Observable<any>{
    return this.http.get<any>("http://localhost:3000/posts").pipe(map(res=>{
      return res;
    }));
  }

  addCustomer(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data);
  }

  updateCustomer(id:any,data:any){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data);
  }

  deleteCustomer(id:number){
    return this.http.delete("http://localhost:3000/posts/"+id);
  }

 
  getAlll(){
    return [
      
      { "id":1,
        "Name":"vishal",
        "Email":"dd@gmail.com",
        "Address":"nagar",
        "Mobile":98778,
        "Gender":"male",
        "Role":"angular"}
    ]
  }
}
