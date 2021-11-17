---
title: How to mock nanoid
layout: post
category: webdev
desc: Use jest to mock nanoid
excerpt_separator: <!--more-->
---

This short blog post describes how to use [Jest](https://jestjs.io/) to mock [nanoid](https://github.com/ai/nanoid). The nanoid function generates a unique string id. I used it to generate an id for an object. However, I wanted a stable id when unit testing the code. To accomplish this, I mocked the nanoid module and function by doing the following:

```javascript
jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});
```

<!--more-->

The above code does the following:

* <code>jest.mock("nanoid"...)</code> - This part mocks the nanoid module.
* <code>return { nanoid: () => "1234" };</code> - This part mocks the nanoid function. "1234" is returned when the nanoid function is called.

Below, is a simple example of a React app using the nanoid function and a unit test mocking it.


#### **`App.js`** 
```javascript
import { nanoid } from "nanoid";

class Item {
  constructor(name, price) {
    this.id = nanoid();  //use nanoid to generate a unique id
    this.name = name;
    this.price = price;
  }
}

function Display({ item }) {
  return (
    <div>
      <h2>Item</h2>
      <p>id: {item.id}</p>
      <p>name: {item.name}</p>
      <p>price: {item.price}</p>
    </div>
  );
}

function App() {
  const item = new Item("apple", 2);
  return (
    <div className="App">
      <h1>Nanoid Unit Test Example</h1>
      <Display item={item} />
    </div>
  );
}

export default App;
export { Display, Item };
```

#### **`App.test.js`** 
```javascript
import { render, screen } from "@testing-library/react";
import { Display, Item } from "./App";

jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

describe("test the Display", () => {
  it("should display the item info", () => {
    let item = new Item("Orange", 5);
    render(<Display item={item} />);
    expect(screen.getByText(/id: 1234/i)).toBeInTheDocument();
    expect(screen.getByText(/name: Orange/i)).toBeInTheDocument();
    expect(screen.getByText(/price: 5/i)).toBeInTheDocument();
  });
});
```

Note: As of this writing CodeSandbox [does not support Jest mocks](https://github.com/codesandbox/codesandbox-client/issues/513).

## References:
* [Jest Mock Functions](https://jestjs.io/docs/mock-functions#mocking-partials)