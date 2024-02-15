import { Router } from "express";
import { sample_furtitures,sample_tags } from "../data";
import asyncHandler from 'express-async-handler'
import { FurnitureModel } from "../models/furniture.model";
import verifyToken from '../middleware/authJwt';
const router = Router();

router.get("/seed", asyncHandler(
 async (req,res)  => { 
    const furnitureCount = await FurnitureModel.countDocuments();
      if (furnitureCount > 0) {
        res.send("Seed is already done!")
        return
      }
      await FurnitureModel.create(sample_furtitures)
      res.send("Seed Is Done")
    })
) 

router.get("/",asyncHandler (
    async (req,res ) =>{ 
        const furnitures = await FurnitureModel.find()
        res.send(furnitures);
    }
))

router.get("/search/:searchTerm" , asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const furnitures = await FurnitureModel.find({name: {$regex: searchRegex}})
        res.send(furnitures);
    }
))

router.get("/tags/", asyncHandler (
    async (req, res) => {
        const tags = await FurnitureModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    name:'$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1})
        const all = {
            name: 'All',
            count: await FurnitureModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))

router.get("/tag/:tagName", asyncHandler (
   async (req, res) => {
        const furnitures = await FurnitureModel.find({tags: req.params.tagName})
        res.send(furnitures);
    }
))

router.get("/:furnitureId", asyncHandler (
    async (req, res) => {
        const furnitures = await FurnitureModel.findById(req.params.furnitureId)
        res.send(furnitures);
    }
))

router.post('/create', asyncHandler( 
    async (req,res) => {
        try {
            const furniture = req.body
            const newFurniture = new FurnitureModel(furniture)
            await newFurniture.save()
            res.status(201).json({ message: 'Furniture created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
))

router.post('/update', asyncHandler(
    async (req, res) => {
        try {
           const furniture = req.body
           const result = await FurnitureModel.updateOne(
                { _id: furniture.id },
                { $set: { ...furniture } }
              );
              if (result.modifiedCount > 0) {
                res.status(201).json({ message: 'Furniture updated successfully' });
              } else {
                res.status(404).json({ message: 'Furniture not found or no changes made' });
              }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
))

router.delete('/delete/:id', asyncHandler(
    async (req,res) => {
        try {
            const id = req.params.id.replace(/'/g, ''); 
            const result = await FurnitureModel.deleteOne(
                {_id : id}
            )
            if (result.deletedCount > 0) {
                res.status(201).json({ message: 'Furniture deleted successfully' });
            } else {
                res.status(404).json({ message: 'Furniture not found or no changes made' });
            }
        } catch (error){
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
))

export default router