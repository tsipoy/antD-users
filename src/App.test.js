import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  act,
  within
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { StrictMode } from "react";
import App from "./App";
import { store } from "./redux/store";
const renderItem = async () => {
  return await act(async () => {
    render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    );
  });
};

const checkCardData = (name, email, city) => {
  const element = screen.getByTestId("first-row-card");
  expect(element).toBeInTheDocument();
  const nameElement = screen.getByTestId("first-row-name");
  expect(nameElement).toBeInTheDocument();
  expect(nameElement.textContent).toBe(name);
  const emailElement = screen.getByTestId("first-row-email");
  expect(emailElement).toBeInTheDocument();
  expect(emailElement.textContent).toBe(email);
  const cityElement = screen.getByTestId("first-row-city");
  expect(cityElement).toBeInTheDocument();
  expect(cityElement.textContent).toBe(city);
};

const checkFirstRowData = (name, email, city) => {
  const firstRow = screen.getAllByRole("row")[1];
  const firstRowCells = within(firstRow).getAllByRole("cell");
  expect(firstRowCells[0].textContent).toBe(name);
  expect(firstRowCells[1].textContent).toBe(email);
  expect(firstRowCells[2].textContent).toBe(city);
};

test("initial render order", async () => {
  // Expected
  const { name, email, city } = {
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    city: "Gwenborough",
  };
  await renderItem();
  expect(screen.getByText("First Row")).toBeInTheDocument();
  checkCardData(name, email, city);
  checkFirstRowData(name, email, city);
  const firstRow = screen.getAllByRole("row")[1];
  const firstRowCells = within(firstRow).getAllByRole("cell");
  expect(firstRowCells[0].textContent).toBe("Leanne Graham");
});

test("name sorting ascending", async () => {
  // Expected
  const { name, email, city } = {
    name: "Chelsey Dietrich",
    email: "Lucio_Hettinger@annie.ca",
    city: "Roscoeview",
  };
  await renderItem();
  const tableHeader = screen.getAllByRole("row")[0];
  const nameHeader = within(tableHeader).getByText("Name");
  // user actions
  fireEvent.click(nameHeader);
  checkCardData(name, email, city);
  checkFirstRowData(name, email, city);
});

test("name sorting descending", async () => {
  // Expected
  const { name, email, city } = {
    name: "Patricia Lebsack",
    email: "Julianne.OConner@kory.org",
    city: "South Elvis",
  };
  await renderItem();
  const tableHeader = screen.getAllByRole("row")[0];
  const nameHeader = within(tableHeader).getByText("Name");
  // user actions
  fireEvent.click(nameHeader);
  fireEvent.click(nameHeader);
  checkCardData(name, email, city);
  checkFirstRowData(name, email, city);
});

test("email sorting ascending", async () => {
  // Expected
  const { name, email, city } = {
    name: "Glenna Reichert",
    email: "Chaim_McDermott@dana.io",
    city: "Bartholomebury",
  };
  await renderItem();
  const tableHeader = screen.getAllByRole("row")[0];
  const emailHeader = within(tableHeader).getByText("Email");
  // user actions
  fireEvent.click(emailHeader);
  checkCardData(name, email, city);
  checkFirstRowData(name, email, city);
});

test("email sorting descending", async () => {
  // Expected
  const { name, email, city } = {
    name: "Kurtis Weissnat",
    email: "Telly.Hoeger@billy.biz",
    city: "Howemouth",
  };
  await renderItem();
  const tableHeader = screen.getAllByRole("row")[0];
  const emailHeader = within(tableHeader).getByText("Email");
  // user actions
  fireEvent.click(emailHeader);
  fireEvent.click(emailHeader);
  checkCardData(name, email, city);
  checkFirstRowData(name, email, city);
});

test("city filtering", async () => {
  // Expected
  const { name, email, city } = {
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    city: "Wisokyburgh",
  };
  await renderItem();
  const tableHeader = screen.getAllByRole("row")[0];
  const filterButton = within(tableHeader).getByLabelText("filter");
  fireEvent.click(filterButton);
  const option2 = screen.getByTitle(city);
  fireEvent.click(option2);
  const buttonOk = screen.getByText("OK");
  fireEvent.click(buttonOk);
  checkCardData(name, email, city);
  checkFirstRowData(name, email, city);
});
const mockedUserData = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "id": 10,
    "name": "Clementina DuBuque",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  }
]

beforeAll(() => {
  global.matchMedia = global.matchMedia || function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
});

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockedUserData)
  })
});

afterEach(() => {
  jest.restoreAllMocks();
});