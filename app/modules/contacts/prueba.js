const  mongoose  = require("mongoose");

let db = ["hola", "manu", "igual"] ;
let cliente = ["manu", "igual", "buenas"];

for (let i = 0; i < db.length; i++) {
    const eDb = db[i];
    for (let d = 0; d < cliente.length; d++) {
        const eCliente = cliente[d];
        if (eDb === eCliente) {
            cliente.splice(d, 1)
        }
    }
}
let body= db.concat(cliente);

// const validationContact = (db, client) =>{
//     let comparationArray = [...db, ...client];
//     for (let i = 0; i < comparationArray.length; i++) {
//         const dbElement = comparationArray[i];
//         for (let d = 0; d < client.length; d++) {
//             const clientElement = client[d];
//             if (dbElement == clientElement) {
//                 comparationArray.splice(i, 1);
//             }
//         }
//     }   
//     console.log('esto es la comparación', comparationArray);     
// };