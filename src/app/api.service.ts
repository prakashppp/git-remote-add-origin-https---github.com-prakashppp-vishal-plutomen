import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  valid= new Subject()

  addToJson(data:any):Observable<any>{
    return this.http.post<any>("http://localhost:3000/signup",data);
  }

  getAll():Observable<any>{
    return this.http.get<any>("http://localhost:3000/posts");
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

  setValid(value:any){
    this.valid.next(value)
  }
}
