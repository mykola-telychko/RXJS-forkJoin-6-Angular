@Injectable()

// last exmpl: https://www.learnrxjs.io/learn-rxjs/operators/combination/forkjoin
export class MyService {
  makeRequest(value: string, delayDuration: number) {
    // simulate http request
    return of(`Complete: ${value}`).pipe(delay(delayDuration));
  }
}

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>forkJoin Example</h2>
      <ul>
        <li> {{propOne}} </li>
        <li> {{propTwo}} </li>
        <li> {{propThree}} </li>
      </ul>
    </div>
  `,
})
export class App {
  public propOne: string;
  public propTwo: string;
  public propThree: string;
  constructor(private _myService: MyService) {}

  ngOnInit() {
    // simulate 3 requests with different delays
    forkJoin({
      requestOne: this._myService.makeRequest('Request One', 2000),
      requestTwo: this._myService.makeRequest('Request Two', 1000),
      requestThree: this._myService.makeRequest('Request Three', 3000),
    }).subscribe(({ requestOne, requestTwo, requestThree }) => {
      this.propOne = requestOne;
      this.propTwo = requestTwo;
      this.propThree = requestThree;
    });
  }
}
