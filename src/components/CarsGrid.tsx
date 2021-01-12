import React from 'react';
import { useQuery } from 'react-query';
import { Card, Dimmer, Loader } from 'semantic-ui-react';
import CarCard from './CarCard';

const fetchCars = async () => {
    const res = await fetch('https://private-2217f-carsapi1.apiary-mock.com/cars');
    return res.json();
}

const CarsGrid = () => {
    const { data, status } = useQuery('cars', fetchCars);
    console.log("data: " + data);
    return (
        <div>
            <h4>List of cars:</h4>
            {status === 'error' &&
                <div>Error loading data..</div>}

            {status === 'loading' &&
                <div>
                    <Dimmer active inverted>
                        <Loader inverted content="Loading" />
                    </Dimmer>
                </div>}

            {status === 'success' &&
                <div>
                    <Card.Group itemsPerRow={4}>
                        {data.map((car: Car) => <div><CarCard car={car} /></div>)}
                    </Card.Group>
                </div>}
        </div>
    )
}

export default CarsGrid;