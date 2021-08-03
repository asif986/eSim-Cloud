import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideworkspaceService {

  isSimulationStart =new BehaviorSubject<boolean>(true);
  constructor() { }

 public simulationStarted(val:boolean){
      this.isSimulationStart.next(val); 
  }
}
