import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient, private processhtppMsgService: ProcessHTTPMsgService) {  }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS)
    .pipe(delay(2000))
  }

getPromotion(id: number): Observable <Promotion> {
  return of(PROMOTIONS.filter((promo) => (promo.id === id))[0])
  .pipe(delay(2000))
  }

  getFeaturedPromotion(): Observable<Promotion> {
  return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processhtppMsgService.handleError))
  }

  putPromotion(promotion: Promotion): Observable<Promotion>{
    const HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Promotion>(baseURL + 'promotions/' + promotion.id, promotion, HttpOptions)
    .pipe(catchError(this.processhtppMsgService.handleError))
  }
}
