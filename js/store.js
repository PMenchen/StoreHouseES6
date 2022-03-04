"use strict";

class Store {
    #cif;
    #name;
    #address;
    #phone;
    #coords;
    constructor (cif, name, address, phone, cords){
        this.#cif = cif;
        this.#name = name;
        this.#address = address;
        this.#phone = phone;
        this.#coords = cords;
    }

    get cif(){
        return this.#name;
    }

    set cif(value){
        this.#cif = value;
    }

    get name(){
        return this.#name;
    }

    set name(value){
        if(!value) throw new EmptyValueException("name");
        this.#name = value;
    }

    get address(){
        return this.#name;
    }

    set address(value){
        this.#address = value;
    }

    get phone(){
        return this.#name;
    }

    set phone(value){
        value = Number.parseFloat(value);
		if (Number.isNaN(value) && !(value.length === 9)) throw new InvalidValueException("price", value);
		this.#phone = value;
    }

    get coords(){
        return this.#name;
    }

    set coords(value){
        if(!(value instanceof Coords)) throw new InvalidCoordsException();
        this.#coords = value;
    }

    toString(){
		return "CIF: " + this.#cif + " Name: " + this.#name + 
            " Address: " + this.#address + " Phone: " + this.#phone;
	}
}