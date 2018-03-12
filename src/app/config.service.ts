import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  apiDomain: string;
  constructor() {
    this.apiDomain = 'http://localhost:35016/api';
  }

}
