import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Template } from '../models/template.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private serviceUri = 'http://localhost:4040/api/temp';

  constructor(private httpClient: HttpClient) { }

  public getTemplates() {

    return this.httpClient.get(this.serviceUri).pipe(
      map( (data: Object[]) => data.map( el => {
        return new Template(el);
      })
    ));
  }

  public addTemplate(template: Template) {
    return this.httpClient.post(this.serviceUri, template).pipe(shareReplay());
  }

  public patchTemplate(id: string, changes: any) {
    return this.httpClient.patch(this.serviceUri + `/${id}`, changes)
      .pipe(shareReplay(),
        map(data => {
          return new Template(data);
        }));
  }
}
