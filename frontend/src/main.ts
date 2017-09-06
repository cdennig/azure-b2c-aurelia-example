import {Auth} from './auth';
import {Aurelia} from 'aurelia-framework'
import environment from './environment';

export function configure(aurelia : Aurelia) {
  aurelia
    .use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia
      .use
      .developmentLogging();
  }

  if (environment.testing) {
    aurelia
      .use
      .plugin('aurelia-testing');
  }

  aurelia
    .start()
    .then((a) => {

      let auth : Auth = a
        .container
        .get(Auth);

      setTimeout(() => {
        auth
          .isAuthenticated()
          .then(() => {
            a.setRoot();
            return;
          })
          .catch(() => {
            auth.login();
          });
      }, 200);
    });
}
