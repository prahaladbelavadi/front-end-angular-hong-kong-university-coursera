import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import {Leader} from '../shared/leader'
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient, private processhtppMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    return of(LEADERS)
    .pipe(delay(2000))
  }

  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter((leader) => (leader.id === id))[0])
    .pipe(delay(2000))    
  }
  
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processhtppMsgService.handleError))
  }

  putLeader(leader: Leader): Observable<Leader> {
    const HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Leader>(baseURL + 'leaders/' + leader.id, leader, HttpOptions)
      .pipe(catchError(this.processhtppMsgService.handleError))
  }
}