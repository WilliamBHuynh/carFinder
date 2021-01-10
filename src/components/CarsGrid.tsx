import React from 'react';
import { useQuery } from 'react-query';
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
            <h2>CarsGrid</h2>

            {status === 'error' &&
                <div>Error loading data..</div>}

            {status === 'success' &&
                <div>
                    {data.map((car: Car) => <div><CarCard car={car} /></div>)}
                </div>}

        </div>
    )
}

export default CarsGrid;