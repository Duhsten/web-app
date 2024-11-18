/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {


  private accessToken = "";
  public endpoint = "https://pokeapi.co/api/v2/";
  getOpportunitiesByCategory: any;
  getSalesByCategory: any;

  constructor(
    private http: HttpClient,
  ) {}

  /**
   * General method to send HTTP requests to the backend API.
   * Supports sending GET and POST requests.
   *
   * @param endpointUrl - Endpoint URL relative to the base API URL.
   * @param method - HTTP method ('GET', 'POST', etc.)
   * @param body - Optional body for POST requests.
   * @returns Promise<APIResponse>
   */
  public async requestFromApi(endpointUrl: string, method: string = 'GET', body?: any): Promise<any> {
    const headers = new HttpHeaders();

    try {
      const options = { headers: headers, body: JSON.stringify(body) };
      const response = method === 'POST'
        ? await firstValueFrom(this.http.post<any>(this.endpoint + "/" + endpointUrl, body, { headers }))
        : await firstValueFrom(this.http.get<any>(this.endpoint + "/" + endpointUrl, { headers }));
      return response;
    } catch (error) {
      console.error('Error calling backend:', error);
      return { success: false, error: "Internal application error", errorCode: 100 };
    }
  }

}