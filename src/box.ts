const initialData: number[] = [1, 2, 3];

class Box {
  constructor(data: number[]) {
    this.data = data;
  }

  private data: number[];
  private listeners: Set<CallableFunction> = new Set();

  public listen(listenerCallback: CallableFunction): void {
    this.listeners.add(listenerCallback);
  }

  private callListeners(): void {
    this.listeners.forEach((listener) => listener(this.data));
  }

  public update(someFunc: CallableFunction): void {
    this.data = someFunc(this.data);
    this.callListeners();
  }
}

function makeBox(data: number[]): Box {
  return new Box(data);
}

const box1 = makeBox(initialData);

box1.listen((data: number[]) => console.log("listener 1, data: " + data));

box1.listen((data: number[]) => {
  const filteredData = data.filter((item) => item % 2);
  console.log("listener 2, filteredData: ", filteredData);
});

box1.update((old: number[]) => {
  old = old.concat([100, 101, 201])
  return old;
});

box1.update((data: number[]) => data.copyWithin(1, 3));
