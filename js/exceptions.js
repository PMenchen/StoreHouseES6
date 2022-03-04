"use strict";

class BaseException extends Error {
	constructor (message = "", fileName, lineNumber){
		super(message, fileName, lineNumber);
		this.name = "BaseException";
		if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException)
    }
	}
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
	constructor (fileName, lineNumber){
		super("Constructor can’t be called as a function.", fileName, lineNumber);
		this.name = "InvalidAccessConstructorException";
	}
}

//Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
	constructor (param, fileName, lineNumber){
		super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
		this.param = param;
		this.name = "EmptyValueException";
	}
}

//Excepción de valor inválido
class InvalidValueException extends BaseException {
	constructor (param, value, fileName, lineNumber){
		super(`Error: The paramenter ${param} has an invalid value. (${param}: ${value})`, fileName, lineNumber);
		this.param = param;
		this.name = "EmptyValueException";
	}
}

//Excepción personalizada para clases abstractas.
class AbstractClassException extends BaseException {
	constructor (className, fileName, lineNumber){
		super(`Error: The class  ${className} is abstract.`, fileName, lineNumber);
		this.className = className;
		this.name = "AbstractClassException";
	}
}

//Excepción personalizada para parametros existentes.
class AlreadyExistException extends BaseException {
	constructor (param, fileName, lineNumber){
		super(`Error: The parameter  ${param} already exist.`);
		this.param = param;
		this.name = "AlreadyExistException";
	}
}

//Excepción personalizada para indicar valores que estan en la lista.
class NegativeStockException extends BaseException {
    constructor (fileName, lineNumber){
        super("Error: The stock value is negative");
        this.param = param;
        this.name = "NegativeStockException";
    }
}

class InvalidCoordsException extends BaseException {
	constructor (fileName, lineNumber){
		super("The method needs a Coords parameter", fileName, lineNumber);
		this.name = "InvalidCoordsException";
	}
}