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

  /***** this is just mockup service *****/
  get<%= classify(name) %>List(param: ApiPageRequest<any>): Promise<ApiPageResponse<any>> {

  }
  save<%= classify(name) %>(param: ApiRequest<any>): Promise<ApiResponse<any>> {
    
  }
  delete<%= classify(name) %>(param: ApiRequest<any>): Promise<ApiResponse<any>> {
      
  }
  /***** this is just mockup service *****/


  /*
    Example for api call
  
  getPositionList(param: ApiPageRequest<any>): Promise<ApiPageResponse<any>> {
    return this.api.call('/api/position/getPositionList', param);
  }
  
  */
}
