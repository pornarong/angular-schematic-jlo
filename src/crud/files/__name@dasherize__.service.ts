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
    return new Promise((resolve, reject) => {
      const response: ApiPageResponse<any> = {
        total: 10,
        status: true,
        data: [
          { col1: 'Item 1 Col 1', col2: 'Item 1 Col 2', col3: 'Item 1 Col 3', col4: 'Item 1 Col 4'},
          { col1: 'Item 2 Col 1', col2: 'Item 2 Col 2', col3: 'Item 2 Col 3', col4: 'Item 2 Col 4'},
          { col1: 'Item 3 Col 1', col2: 'Item 3 Col 2', col3: 'Item 3 Col 3', col4: 'Item 3 Col 4'},
          { col1: 'Item 4 Col 1', col2: 'Item 4 Col 2', col3: 'Item 4 Col 3', col4: 'Item 4 Col 4'},
          { col1: 'Item 5 Col 1', col2: 'Item 5 Col 2', col3: 'Item 5 Col 3', col4: 'Item 5 Col 4'},
        ]
      };
      resolve(response);
    });
  }
  save<%= classify(name) %>(param: ApiRequest<any>): Promise<ApiResponse<any>> {
    return new Promise((resolve, reject) => {
      const response: ApResponse<any> = {
        status: true,
        data: { col1: 'Item 1 Col 1', col2: 'Item 1 Col 2', col3: 'Item 1 Col 3', col4: 'Item 1 Col 4'}
      };
      resolve(response);
    });
  }
  delete<%= classify(name) %>(param: ApiRequest<any>): Promise<ApiResponse<any>> {
    return new Promise((resolve, reject) => {
      const response: ApResponse<any> = {
        status: true
      };
      resolve(response);
    });
  }
  /***** this is just mockup service *****/


  /*
    Example for api call
  
  getPositionList(param: ApiPageRequest<any>): Promise<ApiPageResponse<any>> {
    return this.api.call('/api/position/getPositionList', param);
  }
  
  */
}
