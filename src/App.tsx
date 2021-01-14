import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { Button, Card, Dimmer, Dropdown, Input, Loader } from "semantic-ui-react";
import CarCard from "./components/CarCard";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  const makes = [
    { key: "acura", text: "Acura", value: "acura" },
    { key: "alfa-romeo", text: "Alfa-romeo", value: "alfa-romeo" },
    { key: "aston-martin", text: "Aston-martin", value: "aston-martin" },
    { key: "audi", text: "Audi", value: "audi" },
    { key: "bmw", text: "Bmw", value: "bmw" },
    { key: "bentley", text: "Bentley", value: "bentley" },
    { key: "cadillac", text: "Cadillac", value: "cadillac" },
    { key: "chevrolet", text: "Chevrolet", value: "chevrolet" },
    { key: "chrysler", text: "Chrysler", value: "chrysler" },
    { key: "dodge", text: "Dodge", value: "dodge" },
    { key: "fiat", text: "Fiat", value: "fiat" },
    { key: "ferrari", text: "Ferrari", value: "ferrari" },
    { key: "ford", text: "Ford", value: "ford" },
    { key: "gmc", text: "Gmc", value: "gmc" },
    { key: "honda", text: "Honda", value: "honda" },
    { key: "hyundai", text: "Hyundai", value: "hyundai" },
    { key: "infiniti", text: "Infiniti", value: "infiniti" },
    { key: "jaguar", text: "Jaguar", value: "jaguar" },
    { key: "jeep", text: "Jeep", value: "jeep" },
    { key: "kia", text: "Kia", value: "kia" },
    { key: "lamborghini", text: "Lamborghini", value: "lamborghini" },
    { key: "land-rover", text: "Land-rover", value: "land-rover" },
    { key: "lexus", text: "Lexus", value: "lexus" },
  ];

  const [currentMake, setCurrentMake] = useState(makes[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setSearch] = useState(false);

  const carContainsStr = (car: Car, str: string): boolean => {
    if ((car.make.indexOf(str) !== -1) || (car.model.indexOf(str) !== -1)) {
      return true;
    }
    return false;
  }

  const onSearch = () => {
    setSearch(true);
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const handleMakeChange = (event: SyntheticEvent<HTMLElement>, data: any) => {
    setSearch(false);
    setCurrentMake({
      key: data.value,
      text: data.value,
      value: data.value
    });
  }

  const fetchCars = async () => {
    const res = await fetch("https://private-2217f-carsapi1.apiary-mock.com/cars");
    return res.json();
  }


  const CarsGrid = () => {
    const { data, status } = useQuery("cars", fetchCars);

    return (
      <div>
        {status === "error" &&
          <div>Error loading data..</div>}

        {status === "loading" &&
          <div>
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          </div>}

        {status === "success" &&
          <div>
            <Card.Group itemsPerRow={4} centered>
              {data.map((car: Car) => (isSearch ? (carContainsStr(car, searchTerm) ? <div><CarCard car={car} /></div> : <div></div>)
                : (car.make === currentMake.value ? <div><CarCard car={car} /></div> : <div></div>)))}
            </Card.Group>
          </div>}
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div>
          <header className="title">Car Finder</header>
        </div>

        <div>
          <Input
            placeholder="Search car by make and/or model"
            value={searchTerm}
            onChange={onSearchChange}
          />
          <Button onClick={onSearch} secondary>
            Search
          </Button>
          <Dropdown
            className="dropdown"
            fluid
            selection
            placeholder="Filter by make"
            value={currentMake.text}
            options={makes}
            onChange={handleMakeChange}
          />
        </div>
        <div>
          <CarsGrid />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
