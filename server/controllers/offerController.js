import { Offer } from "../models/offer.js";

export const getAllOffers = (req, res) => {
    console.log("Запрос на /offers получен!");
    res.status(200).json([{ test: "success" }]); // Простой ответ
  };


// export const getAllOffers = async (req, res) => {
//     try {
//         const offers = await Offer.findAll();
//         res.status(200).json(offers);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// import {Offer} from '../models/offer.js'
// async function getAlloffers (req, res, next) {
//     try {
//         const offers = await Offer.findAll();
//         res.send (offers) ;
//       } catch (error) {
//         console.error ('Не удалось получить список предложений:', error);
//       } 
//     }
    
// export {getAllOffers};