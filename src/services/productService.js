import {collection, getDocs} from 'firebase/firestore'
import database from '../../config/firebase'
const getProducts = async () =>{
    try {
        const products_collection_reference = collection(database, 'products')
        
        const result = await getDocs(products_collection_reference)
        console.log( "resultado de getDocs", result)
        const product_list_formatted = result.docs.map(
            (document) =>{
                return {
                    id: document.id,
                    ...document.data()
                }
            }
        )
        return product_list_formatted
    } catch (error) {
        console.log(error)
        return null
    }
}

// const getProducts = async () =>{
//     try {
//         const response = await fetch(
//             'http://localhost:5173/api/productos.json',
//             {
//                 method:'GET'
//             }        
//         )
//         const data = await response.json()
//         return data
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }
export default getProducts

export const getProductById = async({product_id})=>{
    const products =  await getProducts()
    return products.find(product => product.id == product_id)
}