import { Injectable } from '@angular/core';
import { LEADERS, Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(){
    return  LEADERS
  }
}
