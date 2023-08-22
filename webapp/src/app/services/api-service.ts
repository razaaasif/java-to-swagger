import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private baseUrl = 'http://localhost:8080'; // Update with your Spring Boot backend URL
// ${this.baseUrl}
  constructor(private http: HttpClient) {}

  generateSwaggerYaml(
    javaClassCode: string,
    endpoint: string
  ): Observable<any> {
    const options = {
      responseType: 'text' as const,
    };

    return this.http.post(
      `/${endpoint}`,
      javaClassCode,
      { ...options, responseType: 'arraybuffer' as 'text' } // Set responseType for this specific request
    );
  }
}
