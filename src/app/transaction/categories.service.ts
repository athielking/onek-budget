import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private serviceUri = 'https://api.myjson.com/bins/za91w';
  constructor(private http: HttpClient) {}

  public getMinorCategories(): Observable<Map<string, string[]>> {
    return this.http.get(this.serviceUri).pipe(
      map((data: Object[]) => {
        const subCategories = new Map<string, string[]>();
        data.forEach( t => {
          if (!subCategories.has(t['majorcategory'])) {
            subCategories.set(t['majorcategory'], []);
          }

          const arry = subCategories.get(t['majorcategory']);
          if ( arry.indexOf( t['subcategory'] ) < 0) {
            arry.push(t['subcategory']);
            subCategories.set(t['majorcategory'], arry);
          }
        });

        return subCategories;
      })
    );
  }

  public getMajorCategories(): Observable<string[]> {
    return this.http.get(this.serviceUri).pipe(
      map((data: Object[]) => data.map(t => t['majorcategory']).filter((v, i, a) => a.indexOf(v) === i))
    );
  }


}
