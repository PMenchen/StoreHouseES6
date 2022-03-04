"use strict";

(function(){
    let c1 = new Category("Orquestral", "Selección instrumentos orquestrales");
    let c2 = new Category("Educativos", "Selección instrumentos para enseñanza");

    let p1 = new Product("1150689", "Conga", "Conga 11.3/4 Giovanni Palladium Series LP861Z", 833, 21, "img1");
    let p2 = new Mallets("3185443", "PSM1001", "Marimba Padouk", 2450, 21, "img2", "Marimba", "Vancore", 3);
    let p3 = new Mallets("4731128", "AMP1.1", "Alto Metallophone", 398, 21, "img3", "Metallophone", "Sonor", 1);
    let p4 = new Product("3398114", "Microphone", "Saxophone microphone", 359, 21, "img4");
    let p5 = new WindInstrument("5370955", "Tenor Saxophone", "Cuerpo, tudel arqueado y mecánica de latón", 429, 21, "img5", "Viento Madera", "Tenor Saxophone", "Thomann");

    let coords1 = new Coords("49.808341319719624", "10.73153036257451");
    let coords2 = new Coords("50.802951314489624", "12.73153036551831");

    let s1 = new Store("N2760245G", "Thomann", "CALLE SANTA ENGRACIA, 6 - 4 IZQ, 28010, Madrid, Madrid", 911224398, coords1);
    let s2 = new Store("J4822373M", "TempoMusica", "C. Bailén, 7, 13600 Alcázar de San Juan, Cdad. Real", 926550604, coords2);

    let sh = StoreHouse.getInstance("sh", p1, c1, s1, 7);

    console.log("Añadir categoría: longitud array ->", sh.addCategory(c2));
    console.log("Añadir categoría: longitud array ->", sh.addCategory(c1));
    try{
        console.log("Añadir categoría: longitud array ->", sh.addCategory(c1));
  
    } catch (error){
        console.log(error.toString());
    }

    console.log("\n");
    for (let cat of sh.category){
        console.log(cat.toString());
    }

    console.log("\n");
    console.log("Añadir p2 a c1: longitud array ->", sh.addProduct(p2, c1));
    console.log("Añadir p5 a c1: longitud array ->", sh.addProduct(p5, c1));
    console.log("Añadir p3 a c1: longitud array ->", sh.addProduct(p3, c1));

    console.log("\n");
    console.log("Listado Productos del tipo Product en categoría 1");
    for (let prod of sh.getCategoryProduct(c1)){
        console.log(prod.toString());
    }

    console.log("\n");
    console.log("Listado Productos del tipo Mallets en categoría 1");
    for (let prod of sh.getCategoryProduct(c1, Mallets)){
        console.log(prod.toString());
    }

    console.log("\n");
    console.log("Añadir p3 a c2: longitud array ->", sh.addProduct(p3, c2));
    console.log("Añadir p4 a c2: longitud array ->", sh.addProduct(p4, c2));

    console.log("\n");
    console.log("Listado Productos del tipo Product en categoría 2");
    for (let prod of sh.getCategoryProduct(c2)){
        console.log(prod.toString());
    }

    console.log("\n");
    console.log("Borrar producto5: longitud array ->", sh.removeProduct(p5));

    console.log("\n");
    console.log("Borrar categoría2: longitud array ->", sh.removeCategory(c2));
    
    console.log("\n");
    console.log("Añadir tienda: ", sh.addShop(s1));
    console.log("Añadir tienda: ", sh.addShop(s2));

    console.log("\n");
    try{
        console.log("Añadir producto1 en la tienda 1: ", sh.addProductInShop(p1, s1, 3));
  
    } catch (error){
        console.log(error.toString());
    }
    try{
        console.log("Añadir producto2 en la tienda 1: ", sh.addProductInShop(p2, s1, 3));
  
    } catch (error){
        console.log(error.toString());
    }

    console.log("Añadir producto3 en tienda1: ", sh.addProductInShop(p3, s1, 6));
    console.log("Añadir producto4 en tienda1: ", sh.addProductInShop(p4, s1, 2));
    console.log("Añadir producto4 en tienda2: ", sh.addProductInShop(p4, s2, 3));
    console.log("Añadir producto2 en tienda2: ", sh.addProductInShop(p2, s2, 1));

    console.log("\n");
    console.log("Añadir cantidad: ", sh.addQuantityProductInShop(p2, s2, 4));

    console.log("\n");
    console.log("Listado Productos del tipo Product en tienda1");
    for (let prod of sh.getShopProducts(s1)){
        console.log(prod.toString());
    }

    console.log("\n");
    console.log("Listado Productos del tipo Mallets en tienda1");
    for (let prod of sh.getShopProducts(s1, Mallets)){
        console.log(prod.toString());
    }

    console.log("\n");
    try{
        console.log("Borrar tienda3: ", sh.removeShop(s3));

    } catch (error){
        console.log(error.toString());
    }
    
    console.log("Borrar tienda2: ", sh.removeShop(s2));

    console.log("\n");
    console.log("Listado tiendas");
    for (let store of sh.shop){
        console.log(store.toString());
    }

})();