import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { Card, Dimmer, Dropdown, Loader } from "semantic-ui-react";
import CarCard from "./components/CarCard";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  const allMakes = "All makes";
  const makes = [{ key: allMakes, text: allMakes, value: allMakes }];

  const [currentMake, setCurrentMake] = useState(makes[0]);

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
              {data.map((car: Car) => <div><CarCard car={car} /></div>)}
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
        <div className="dropdown">
          <Dropdown
            fluid
            selection
            options={makes}
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
