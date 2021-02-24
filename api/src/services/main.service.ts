import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';

import { Pokemon } from '../models/pokemon.model';

export class MainService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send('Welcome to the sample API 👋');
  }

  public async getAllPokemon(req: Request, res: Response) {
    try {
      const pokemon = await Pokemon.find();
      res
        .status(200)
        .json(pokemon);
      console.log('✅ FETCHED POKEMONS');
    } catch(err) {
      console.log('❌ FAILED TO FETCH POKEMONS');
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to fetch pokemons' });
    }
  }

  public async addNewPokemon(req: Request, res :Response) {
    const newPokemon = new Pokemon(req.body);

    try {
      const pokemon = await newPokemon.save();
      if (pokemon) {
        res
          .status(201)
          .json({ message: 'Pokemon saved', pokemon });
        console.log('✅ STORED NEW POKEMON');
      }
    } catch(err) {
      console.log('❌ ERROR SAVING POKEMON');
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to save pokemon' })
    }
  }

  public async deletePokemon(req: Request, res: Response) {
    const pokemonId = req.params.id;

    try {
      const pokemon = await Pokemon.findByIdAndDelete(pokemonId);
      if (pokemon) {
        res
          .status(200)
          .json({ message: `Deleted ${pokemon.id}` });
        console.log('✅ DELETED POKEMON')
      }
    } catch(err) {
      console.log('❌ ERROR DELETING POKEMON')
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to delete pokemon' })
    }
  }
}