type InitialData = number[];
type UpdateFunction = (data: InitialData) => InitialData;
type ListenerFunction = (data: InitialData) => void;

const initialData: InitialData = [1, 2, 3];

class Box {
  constructor(data: InitialData) {
    this.data = data;
  }

  private data: InitialData;
  private listeners: Set<ListenerFunction> = new Set();

  public listen(listenerCallback: ListenerFunction): void {
    this.listeners.add(listenerCallback);
  }

  private callListeners(): void {
    this.listeners.forEach((listener) => listener(this.data));
  }

  public update(someFunc: UpdateFunction): void {
    this.data = someFunc(this.data);
    this.callListeners();
  }
}

function makeBox(data: number[]): Box {
  return new Box(data);
}

const box1 = makeBox(initialData);

box1.listen((data) => console.log("listener 1, data: " + data));

box1.listen((data) => {
  const filteredData = data.filter((item) => item % 2);
  console.log("listener 2, filteredData: " + filteredData);
});

box1.update((old) => old.concat([100, 101, 201]));

box1.update((data) => data.copyWithin(1, 3));
