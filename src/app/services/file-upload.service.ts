import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  baseApiUrl="https://api.cloudinary.com/v1_1/dtwtp2vwv/image/upload?upload_preset=tvjytipj";

  constructor(private http:HttpClient) { }

  upload(file:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseApiUrl, formData)
}
}
