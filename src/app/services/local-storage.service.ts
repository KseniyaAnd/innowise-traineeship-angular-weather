import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {
    }

    public saveData(key: string, value: string) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getData(key: string) {
        let data = localStorage.getItem(key) ?? '';
        return JSON.parse(data.toString())
    }

    public removeData(key: string) {
        localStorage.removeItem(key);
    }

    public clearData() {
        localStorage.clear();
    }
}
