import {Auth} from './auth';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient, Auth)
export class HttpConfig {
  private http : HttpClient;
  private auth : Auth;
  constructor(http, auth) {
    this.http = http;
    this.auth = auth;
  }

  configure() {
    let a = this.auth;
    this
      .http
      .configure(httpConfig => {
        httpConfig
          .withDefaults({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .withInterceptor({
            request(request) {
              if (a.authenticated) {
                let token = a.getToken();
                token = `Bearer ${token}`;
                request
                  .headers
                  .append('Authorization', token);
              }

              return request;
            },
            response(response) {
              if (response.status === 401) {
                a.login();
              }
              return response;
            }
          });
      });
  }
}
