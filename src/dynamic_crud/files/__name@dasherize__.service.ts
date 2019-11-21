import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ApiPageRequest } from 'src/app/model/api-page-request.model';
import { ApiPageResponse } from 'src/app/model/api-page-response.model';
import { ApiRequest } from 'src/app/model/api-request.model';
import { ApiResponse } from 'src/app/model/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service {

  constructor(
    private api: ApiService
  ) { }

  get<%= classify(name) %>List(param: ApiPageRequest<any>): Promise<ApiPageResponse<any>> {
    return this.api.call('/api/<%= name.toLowerCase() %>/get<%= classify(name) %>List', param);
  }

  create<%= classify(name) %>(param: ApiRequest<any>): Promise<ApiResponse<any>> {
    return this.api.call('/api/<%= name.toLowerCase() %>/create<%= classify(name) %>', param);
  }

  update<%= classify(name) %>(param: ApiRequest<any>): Promise<ApiResponse<any>> {
    return this.api.call('/api/<%= name.toLowerCase() %>/update<%= classify(name) %>', param);
  }

  delete<%= classify(name) %>(param: ApiRequest<any>): Promise<ApiResponse<any>> {
    return this.api.call('/api/<%= name.toLowerCase() %>/delete<%= classify(name) %>', param);
  }

}
