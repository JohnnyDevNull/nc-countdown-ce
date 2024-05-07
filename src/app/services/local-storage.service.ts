import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

const STORAGE_KEY = 'countdownData';

export interface IAppData {
  title?: string,
  date?: string
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private get window() {
    return this.document.defaultView;
  }

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  set(data: IAppData) {
   this.window?.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  get(): IAppData {
    const dataString = this.window?.localStorage.getItem(STORAGE_KEY)
    return dataString ? JSON.parse(dataString) : null;
  }

  save(data: IAppData) {
    const previousData = this.get();
    const newData = {...previousData || {}, ...data};
    this.set(newData);
  }
}
