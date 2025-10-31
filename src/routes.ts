import { Router } from "express";
import { getDb } from "./mongo";
import { ObjectId } from "mongodb";
import { error } from "console";

const router = Router();
const coleccion = () => getDb().collection("Libros");

router.post("/", async (req, res) => {
    try{
        const newTitle = req.body?.title;
        const newAuthor = req.body?.author;
        const newPages = req.body?.pages;

        if(newTitle && newAuthor && newPages && typeof newTitle === "string" && typeof newAuthor === "string" && typeof newPages === "number"){
            const result = await coleccion().insertOne(req.body);
            res.json(result);
        }else{
            res.status(400).json({error: "Invalid JSON body."})
        }

    }catch(err){
        res.status(404).json({error: "Error al añadir un libro."});
    }
})

router.get("/", async (req, res) => {
    try{
        const books = await coleccion().find().toArray();
        res.json(books);
    }catch(err){
        res.status(404).json({error: "Error al obtener los libros."});
    }
})

router.put("/:id", async (req, res) => {
    try{
        const result = await coleccion().updateOne(
            {_id: new ObjectId(req.params.id)},
            { $set: req.body}
        );
        res.json(result);
    }catch(err){
        res.status(404).json({error: "Error al actualizar el libro."})
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const result = await coleccion().deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.json(result);
    }catch(err){
        res.status(404).json({error: "Error al eliminar el libro."})
    }
})

export default router;