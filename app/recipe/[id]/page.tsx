"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { TrendingSlider } from "@/components/trending-slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat } from "lucide-react"
import Image from "next/image"

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  strIngredient1?: string
  strMeasure1?: string
  strIngredient2?: string
  strMeasure2?: string
  strIngredient3?: string
  strMeasure3?: string
  strIngredient4?: string
  strMeasure4?: string
  strIngredient5?: string
  strMeasure5?: string
  strIngredient6?: string
  strMeasure6?: string
  strIngredient7?: string
  strMeasure7?: string
  strIngredient8?: string
  strMeasure8?: string
  strCategory?: string
  strArea?: string
}

export default function RecipePage() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [activeTab, setActiveTab] = useState<"ingredients" | "instructions">("ingredients")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json()
        setRecipe(data.meals?.[0] || null)
      } catch (error) {
        console.error("Error fetching recipe:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRecipe()
    }
  }, [id])

  const getIngredients = () => {
    if (!recipe) return []
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe]
      const measure = recipe[`strMeasure${i}` as keyof Recipe]
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure })
      }
    }
    return ingredients
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Recipe not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{recipe.strMeal}</h1>
              <div className="flex flex-wrap gap-2">
                {recipe.strCategory && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    <ChefHat className="w-3 h-3 mr-1" />
                    {recipe.strCategory}
                  </Badge>
                )}
                {recipe.strArea && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {recipe.strArea}
                  </Badge>
                )}
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={recipe.strMealThumb || "/placeholder.svg"}
                  alt={recipe.strMeal}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "ingredients" ? "default" : "outline"}
                  onClick={() => setActiveTab("ingredients")}
                  className="flex-1"
                >
                  Ingredients
                </Button>
                <Button
                  variant={activeTab === "instructions" ? "default" : "outline"}
                  onClick={() => setActiveTab("instructions")}
                  className="flex-1"
                >
                  Instructions
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  {activeTab === "ingredients" ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                      {getIngredients().map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="font-medium">{item.ingredient}</span>
                          <span className="text-gray-600">{item.measure}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{recipe.strInstructions}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <TrendingSlider />
    </div>
  )
}
