import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

/**
 * Class For handlind API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * The API URL
   */
  url = environment.API_URL;
  /**
   * Constructor for api
   * @param http For http request & response
   */
  constructor(private http: HttpClient) {
  }
  /**
   * Save Project to Cloud
   * @param data The Project data
   * @param token Auth Token
   */
  saveProject(data: any, token: string) {
    if (data.description === '') {
      data.description = null;
    }
    return this.http.post(`${this.url}api/save`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        'Access-Control-Allow-Origin': '*',
      })
    });
  }
  /**
   * List all the project created by an user
   * @param token Auth Token
   */
  listProject(token) {
    return this.http.get(`${this.url}api/save/arduino/list`, {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        // 'Access-Control-Allow-Origin': '*',
      })
    });
  }
  /**
   * Read Project using id
   * @param id Read Project ID
   * @param token Auth Token
   */
  readProject(id: string, token: string) {
    return this.http.get(`${this.url}api/save/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        'Access-Control-Allow-Origin': '*',
      })
    });
  }
  /**
   * Find Project using Project name
   * @param title Project name that needs to be searched
   * @param token Auth Token
   */
  searchProject(title: string, token: string) {
    const url = encodeURI(`${this.url}api/save/search?name__icontains=${title}&is_arduino=true`);
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        'Access-Control-Allow-Origin': '*',
      })
    });
  }
  /**
   * Update Project from the project id
   * @param id Project id
   * @param data Updated Project Data
   * @param token Auth Token
   */
  updateProject(id: string, data: any, token: string) {
    return this.http.post(`${this.url}api/save/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        'Access-Control-Allow-Origin': '*',
      })
    });
  }
  /**
   * Delete Project From  Database
   * @param id Project id
   * @param token Auth Token
   */
  deleteProject(id, token): Observable<any> {
    return this.http.delete(`${this.url}api/save/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        'Access-Control-Allow-Origin': '*',
      })
    });
  }
  /**
   * Compiles code and returns the status and task id
   * @param data The Code and id of arduino
   */
  compileCode(data: any): Observable<any> {
    return this.http.post(`${this.url}api/arduino/compile`, data);
  }
  /**
   * Returns the hex of the compiled code
   * @param taskId Compilation Task ID
   */
  getHex(taskId: string): Observable<any> {
    return this.http.get(`${this.url}api/arduino/compile/status?task_id=${taskId}`);
  }
  /**
   * returns the user name and email
   * @param token Auth Token
   */
  userInfo(token: string): Observable<any> {
    return this.http.get(`${this.url}api/auth/users/me`, {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        // 'Access-Control-Allow-Origin': '*',
      })
    });
  }
  /**
   * Enable/Disable Sharing a Project
   * @param id Project id
   * @param on Sharing State
   * @param token Auth token
   */
  Sharing(id: string, on: boolean, token: string) {
    const state = on ? 'on' : 'off';
    return this.http.post(`${this.url}api/save/${id}/sharing/${state}`, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        'Access-Control-Allow-Origin': '*',
      })
    });
  }
  /**
   * Fetch Samples
   */
  fetchSamples(): Observable<any> {
    return this.http.get('./assets/samples/Samples.json');
  }
}
