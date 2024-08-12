import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    //   updatedAt: 0
    // },
    
];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLowerCase(),
      createdAt: new Date().getTime(),
      updatedAt: 0
    };
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find( brand => brand.id === id);
    if( !brand )
      throw new NotFoundException(`Brand with ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    // if( updateBrandDto.id && updateBrandDto.id !== id )
    //     throw new BadRequestException('brand id is not valid');

    this.brands = this.brands.map( brand => {
        if ( brand.id === id ){
          brandDB.updatedAt = new Date().getTime();
            brandDB = {
                ...brandDB,
                ...updateBrandDto,
                id
            };
            return brandDB;
        }
        return brand;
    });
    return updateBrandDto;
  }

  remove(id: string) {
    const carDB = this.findOne(id);
        this.brands = this.brands.filter( brand => brand.id !== id);
        return this.brands;
  }
  fillBrandsWithSeedData( brands: Brand[]){
    this.brands = brands;
}
}
