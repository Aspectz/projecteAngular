import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  
  

  constructor(private http:HttpClient) { }

  upload(file:any,fileType:string):Observable<any> {
    
    // Create form data
    let baseApiUrl=`https://api.cloudinary.com/v1_1/dtwtp2vwv/${fileType}/upload?upload_preset=tvjytipj`;
    
    
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    return this.http.post(baseApiUrl, formData)
}
}
