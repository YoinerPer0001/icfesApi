import express from "express"
import categoriesController from "../controller/categoryController.js"

const CategoriesRoutes = express.Router()

CategoriesRoutes.get("/courses/all", categoriesController.getAllCategories)

export default CategoriesRoutes;