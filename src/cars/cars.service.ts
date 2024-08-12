import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
    //     {
    //         id: uuidv4(),
    //         brand:'Toyota',
    //         model:'Corolla'
    //     },
        
    ];

    findAll(){
        return this.cars;
    }
    create(createCarDto: CreateCarDto){
        const car: Car = {
            id: uuidv4(),
            ...createCarDto
        };
        this.cars.push(car);
        return car;
    }

    findOneById(id:string){
        const car = this.cars.find( car => car.id === id);
        if(!car){
            throw new NotFoundException(`Car with ${id} not found`);
        }
        return car;
    }
    update(id:string, updateCarDto:UpdateCarDto){
        let carDB = this.findOneById(id);
        if( updateCarDto.id && updateCarDto.id !== id )
            throw new BadRequestException('car id is not valid');

        this.cars = this.cars.map( car => {
            if ( car.id === id ){
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                };
                return carDB;
            }
            return car;
        });
        return updateCarDto;
    }
    delete(id:string ){
        const carDB = this.findOneById(id);
        this.cars = this.cars.filter( car => car.id !== id);
        return this.cars;
    }
    fillCarsWithSeedData( cars: Car[]){
        this.cars = cars;
    }

}
