"use strict";

class Category {
    #title;
    #description;

    constructor (title, description){
        this.#title = title;
        this.#description = description;
    }

    get title(){
        return this.#title;
    }

    set title(value){
        if(!value) throw new EmptyValueException("title");
        this.#title = value;
    }

    get description(){
        return this.#description;
    }

    set description(value){
        this.#description = value;
    }

    toString(){
        return "Title: " + this.#title + " || Description: " + this.#description;
    }
}

class Product {
    #serialNumber;
    #name;
    #description;
    #price;
    #taxPercentage;
    #images;

    constructor (serialNumber, name, description, price, taxPercentage = Product.IVA, images){
        if(!serialNumber) throw new EmptyValueException("serialNumber");
        if(!name) throw new EmptyValueException("name");
        if(!price) throw new EmptyValueException("price");
        price = Number.parseFloat(price);
        if (!price || price <= 0) throw new InvalidValueException("price", price);
        if (!taxPercentage || taxPercentage < 0) throw new InvalidValueException("taxPercentage", taxPercentage);

        this.#serialNumber = serialNumber;
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#taxPercentage = taxPercentage;
        this.#images = [images];
    }

    get serialNumber(){
        return this.#name;
    }

    set serialNumber(value){
        if(!value) throw new EmptyValueException("serialNumber");
        this.#name = value;
    }

    get name(){
        return this.#name;
    }

    set name(value){
        if(!value) throw new EmptyValueException("serialNumber");
        this.#name = value;
    }

    get description(){
        return this.#description;
    }

    set description(value){
        this.#description = value;
    }

    get price(){
        return this.#price;
    }

    set price(value){
        value = Number.parseFloat(value);
		if (Number.isNaN(value) && value > 0) throw new InvalidValueException("price", value);
		this.#price = value;
    }

    get taxPercentage(){
        return this.#taxPercentage;
    }

    set taxPercentage(value = Product.IVA){
        if (!value || value < 0) throw new InvalidValueException("taxPercentage", value);
		this.#taxPercentage = value;
    }

    get images(){
        return this.#images;
    }

    set images(value){
        this.#images = value;
    }

    static get IVA(){
        return 21;
    }

    toString(separator = '\n'){
		return "SerialNumber: " + this.#serialNumber + " Name: " + this.#name + 
            " Description: " + this.#description + " Price: " + this.#price + "€ TaxPercentage(%): " + this.#taxPercentage + separator;
	}
}

class StringedInstrument extends Product {
    #type;
    #brand;
    constructor(serialNumber, name, description, price, taxPercentage, images, type, brand){
        super (serialNumber, name, description, price, taxPercentage, images);
       
        this.#type = type;
        this.#brand = brand;
    }
}

class Mallets extends Product {
    #type;
    #brand;
    #numOctaves;
    constructor(serialNumber, name, description, price, taxPercentage, images, type, brand, numOctaves){
        super (serialNumber, name, description, price, taxPercentage, images);
        
        numOctaves = Number.parseFloat(numOctaves);
        if (!numOctaves || numOctaves <= 0) throw new InvalidValueException("strings", numOctaves);

        this.#type = type;
        this.#brand = brand;
        this.#numOctaves = numOctaves;
    }
}

class WindInstrument extends Product {
    #subfamily;
    #type;
    #brand;
    constructor(serialNumber, name, description, price, taxPercentage, images, subfamily, type, brand){
        super (serialNumber, name, description, price, taxPercentage, images);
        

        this.#subfamily = subfamily;
        this.#type = type;
        this.#brand = brand;
    }
}