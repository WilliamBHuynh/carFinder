import React from "react";
import { Card, Image } from "semantic-ui-react";

interface CarProps {
    car: Car;
}

// Function to capitalize a string
const capitalizeStr = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const CarCard: React.FC<CarProps> = ({ car }) => {
    // Initialize car attributes
    const make: string = car.make;
    const model: string = car.model;
    const carImg: string = car.img_url;
    const year: number = car.year;
    const price: number = car.price;
    const horsepower: number = car.horsepower;

    //Create Card displaying car attributes
    return (
        <div className="card">
            <Card>
                <Image src={carImg} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{capitalizeStr(make) + " " + (model.length <= 3 ? model.toUpperCase() : capitalizeStr(model))}</Card.Header>
                    <Card.Meta>
                        {year}
                    </Card.Meta>
                    <Card.Description>
                        Price: ${price.toFixed(2)}
                    </Card.Description>
                    <Card.Description>
                        Horsepower: {horsepower}
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
}

export default CarCard;