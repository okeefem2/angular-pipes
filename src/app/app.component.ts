import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // set appStatus to stable after 2 seconds.
  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000)
  });

  appStatusObs: Observable<number>;
  answerToLifeUniverseEverything: number;
  filteredStatus = '';
  ngUnsubscribe: Subject<void> = new Subject<void>();

  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017)
    },
    {
      instanceType: 'small',
      name: 'Testing Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    }
  ];

  ngOnInit () {
    this.appStatusObs = new Observable((observer) => {
       setTimeout(() => {
        observer.next(42);
        observer.complete();
       }, 3000);
    });

    let subscription = this.appStatusObs
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
          value => this.answerToLifeUniverseEverything = value,
          error => console.log(error),
          () => {
            this.ngUnsubscribe.next();
            this.ngUnsubscribe.complete();
          }
      );
  }
  ngOnDestroy () {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }
  // add new server
  // angular will not re run the pipe when data changes, so adding a new server
  // while filtering will not show up (unless pure: false on pipe)
  onAddServer() {
    this.servers.push({
      instanceType: 'small',
      name: 'New Server',
      status: 'stable',
      started: new Date(15, 1, 2017)
    });
  }
}
