import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Ce service prend en charge les requêtes vers l'API REST côté client. Il faut déterminer l'URL avant tout chose.
 */
@Injectable()
export class Api {
  url: string = 'https://example.com/api/v1';

  constructor(public http: Http) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  //HTTP.POST can be used when the client is sending data to the server and the server will decide the URI for the newly created resource. The POST method is used to request that the origin server accept the entity enclosed in the request as a new subordinate of the resource identified by the Request-URI in the Request-Line.
  post(endpoint: string, data: any, options?: RequestOptions) {
    var body: any;
    body = JSON.stringify(data);
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  //HTTP.PUT can be used when the client is sending data to the the server and the client is determining the URI for the newly created resource. The PUT method requests that the enclosed entity be stored under the supplied Request-URI. If the Request-URI refers to an already existing resource, the enclosed entity SHOULD be considered as a modified version of the one residing on the origin server. If the Request-URI does not point to an existing resource, and that URI is capable of being defined as a new resource by the requesting user agent, the origin server can create the resource with that URI.
  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  //HTTP.PATCH can be used when the client is sending one or more changes to be applied by the the server. The PATCH method requests that a set of changes described in the request entity be applied to the resource identified by the Request-URI. The set of changes is represented in a format called a patch document.
  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
