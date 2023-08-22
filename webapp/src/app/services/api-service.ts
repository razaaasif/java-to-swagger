import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl =
    'http://swagger-convertor.ap-south-1.elasticbeanstalk.com'; // Update with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  generateSwaggerYaml(
    javaClassCode: string,
    endpoint: string
  ): Observable<any> {
    const options = {
      responseType: 'text' as const,
    };

    return this.http.post(
      `${this.baseUrl}/${endpoint}`,
      javaClassCode,
      { ...options, responseType: 'arraybuffer' as 'text' } // Set responseType for this specific request
    );
  }
}
