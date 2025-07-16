"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { TrendingSlider } from "@/components/trending-slider"
import { Card, CardContent } from "@/components/ui/card"

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export default function SearchPage() {
  const { term } = useParams()
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        const data = await response.json()
        setMeals(data.meals || [])
      } catch (error) {
        console.error("Error fetching meals:", error)
      } finally {
        setLoading(false)
      }
    }

    if (term) {
      fetchMeals()
    }
  }, [term])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Results</h1>
        <p className="text-gray-600 mb-8">
          {meals.length > 0
            ? `Found ${meals.length} recipe${meals.length === 1 ? "" : "s"} for "${term}"`
            : `No recipes found for "${term}"`}
        </p>

        {meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {meals.map((meal) => (
              <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={meal.strMealThumb || "/placeholder.svg"}
                        alt={meal.strMeal}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                        {meal.strMeal}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h2>
            <p className="text-gray-600">Try searching for something else</p>
          </div>
        )}
      </div>
      <TrendingSlider />
    </div>
  )
}
