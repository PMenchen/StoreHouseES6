"use strict";

class StoreHouseException extends BaseException {
    constructor (fileName, lineNumber){
        super("Error: StoreHouse Exception.", fileName, lineNumber);
        this.name = "StoreHouseException";
    }
}

class CategoryAlreadyExistException extends StoreHouseException {
    constructor (category, fileName, lineNumber){
      super("Error: The category already exist in the storehouse. " + category.name, fileName, lineNumber);
      this.name = "CategoryAlreadyExistException";
      this.category = category;
    }
}

class NullValueException extends StoreHouseException {
    constructor (param, fileName, lineNumber){
      super("Error: The parameter " + param + " cannot be null ", fileName, lineNumber);
      this.name = "NullValueException";
      this.param = param;
    }
}

class NotExistException extends StoreHouseException {
    constructor (param, fileName, lineNumber){
      super("Error: The parameter " + param + " not exist ", fileName, lineNumber);
      this.name = "NotExistException";
      this.param = param;
    }
}

let StoreHouse = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
    let instantiated; //Objeto con la instancia única ShoppingCart

    function init(name, product, category, shop, stock) { //Inicialización del Singleton

        class StoreHouse {
            #name;
            #product;
            #category;
            #shop;
            #stock;
            #defaultCategory;
            #defaultShop;
        
            _categories = [];
            _products = [];
            _stores = [];
        
            constructor (name, product, category, shop, stock){
                //La función se invoca con el operador new
                if (!new.target) throw new InvalidAccessConstructorException();
        
                this.#name = name;
                this.#product = product;
                this.#category = category;
                this.#shop = shop;
                this.#stock = stock;
                this.#defaultCategory = "Default Category";
                this.#defaultShop = "Default Shop";
            }
        
            get name(){
                return this.#name;
            }
        
            set name(value){
                if (!value) throw new EmptyValueException("name");
                this.#name = value;
            }
        
            get category(){
                // referencia para habilitar el closure en el objeto
                let array = this._categories;
                return {
                    * [Symbol.iterator](){
                        for (let cat of array){
                            yield cat.category;
                        }
                    }
                }
            }
        
            get shop(){
                // referencia para habilitar el closure en el objeto
                let array = this._stores;
                return {
                    * [Symbol.iterator](){
                        for (let shop of array){
                            yield shop.shop;
                        }
                    }
                } 
            }
        
            addCategory(category){
                if (category == null) throw new NullValueException("Category");
                if (this._categories.findIndex(x => x.category.title === category.title) !== -1) throw new CategoryAlreadyExistException(category);
        
                this._categories.push({
                    category: category,
                    products: []
                });
        
                return this._categories.length;
            }
        
            removeCategory(category){
                if (this._categories.findIndex(x => x.category.title === category.title) === -1) throw new NotExistException("Category");

                let cat = this._categories.findIndex(x => x.category.title === category.title);
                let defaultCat = this._categories.findIndex(x => x.category === this.#defaultCategory);

                if (defaultCat === -1){
                    this._categories.push({
                        category: this.#defaultCategory,
                        products: this._categories[cat].products
                    });
                    this._categories.splice(cat,1);

                } else {
                    let array = this._categories[cat].products;
                    let defArray = this._categories[defaultCat].products;
                    let newArray = array.concat(defArray);
                    this._categories[defaultCat].products = newArray;
                    this._categories.splice(cat,1);
                }

                return this._categories.length;
            }
        
            addProduct(product, category){
                if (!product == null) throw new NullValueException("Product");
        
                this._products.push(product);
                let prod = this._products.find(x => x.serialNumber === product.serialNumber);
                let cat = this._categories.findIndex(x => x.category.title === category.title);
                this._categories[cat].products.push(prod);
        
                return this._products.length;
            }
        
            removeProduct(product){
                if (!this._products.includes(product)) throw new NotExistException("Product");
                
                let index = this._products.indexOf(product);
                this._products.splice(index,1);
        
                return this._products.length;
            }
        
            addProductInShop(product, shop, quantity){
                if (!this._products.includes(product)) throw new NotExistException("Product");
                if (this._stores.findIndex(x => x.shop.name === shop.name) === -1) throw new NotExistException("Shop");

                let prod = this._products.find(x => x.serialNumber === product.serialNumber);
                let sh = this._stores.findIndex(x => x.shop.name === shop.name);
        
                this._stores[sh].products.push(prod);
                this._stores[sh].quantity = quantity;
        
                return this._stores[sh].products.length;
            }
        
            addQuantityProductInShop(product, shop, stock = 1){
                if (!this._products.includes(product)) throw new NotExistException("Product");
                if (this._stores.findIndex(x => x.shop.name === shop.name) === -1) throw new NotExistException("Shop");
                stock = Number.parseInt(stock);
                if (stock < 0) throw new NegativeStockException();

                let prod = this._products.find(x => x.serialNumber === product.serialNumber);
                let sh = this._stores.findIndex(x => x.shop.name === shop.name);

                if (prod === product){
                    this._stores[sh].quantity += stock;
                }
        
                return this._stores[sh].quantity;
            }
        
            * getCategoryProduct(category, type = Product){
                if (category == null) throw new NullValueException("Category");
        
                let array = [];

                let cat = this._categories.findIndex(x => x.category.title === category.title || x.category === this.#defaultCategory);
                array = this._categories[cat].products;

                for (let catProd of array) {
                    if(catProd instanceof type){
                        yield catProd;
                    }       
                }
            }
        
            addShop(shop){
                if (shop == null) throw new NullValueException("Shop");
                if (this._stores.findIndex(x => x.shop.name === shop.name) !== -1) throw new AlreadyExistException("Shop");
        
                this._stores.push({
                    shop: shop,
                    products: [],
                    quantity: 1
                });
        
                return this._stores.length;
            }
        
            removeShop(shop){
                if (this._stores.findIndex(x => x.shop.name === shop.name) === -1) throw new NotExistException("Shop");

                let sh = this._stores.findIndex(x => x.shop.name === shop.name);
                let defaultSh = this._stores.findIndex(x => x.shop === this.#defaultShop);

                if (defaultSh === -1){
                    this._stores.push({
                        shop: this.#defaultShop,
                        products: this._stores[sh].products,
                        quantity: this._stores[sh].quantity
                    });
                    this._stores.splice(sh,1);

                } else {
                    let array = this._stores[sh].products;
                    let defArray = this._stores[defaultSh].products;
                    let newArray = array.concat(defArray);
                    this._stores[defaultSh].products = newArray;
                    this._stores.splice(sh,1);
                }
        
                return this._stores.length;
            }
        
            * getShopProducts(shop, type = Product){
                if (shop == null) throw new NullValueException("Shop");
        
                let array = [];

                let sh = this._stores.findIndex(x => shop.name === shop.name);
                array = this._stores[sh].products;
        
                for (let shopProd of array) {
                    if(shopProd instanceof type){
                        yield shopProd;
                    }       
                }
            }
        
        }
        Object.defineProperty(StoreHouse.prototype, 'category', {enumerable: true});
        Object.defineProperty(StoreHouse.prototype, 'shop', {enumerable: true});
        Object.defineProperty(StoreHouse.prototype, 'getCategoryProduct', {enumerable: true});
        Object.defineProperty(StoreHouse.prototype, 'getShopProducts', {enumerable: true});

        let sh = new StoreHouse(name, product, category, shop, stock);//Devolvemos el objeto ShoppingCart para que sea una instancia única.
        Object.freeze(sh);
        return sh;
    } //Fin inicialización del Singleton

    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function (name, product, category, shop, stock) {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(name, product, category, shop, stock); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();
  