"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export function TrendingSlider() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian")
        const data = await response.json()
        setMeals(data.meals?.slice(0, 12) || [])
      } catch (error) {
        console.error("Error fetching meals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-300 rounded-lg mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Trending Now</h2>

        <div className="overflow-hidden">
          <div
            className="flex animate-scroll gap-4"
            style={{
              animation: "scroll 30s linear infinite",
              width: "calc(200px * 24)", // Duplicate the items for seamless loop
            }}
          >
            {[...meals, ...meals].map((meal, index) => (
              <Link key={`${meal.idMeal}-${index}`} href={`/recipe/${meal.idMeal}`} className="flex-shrink-0">
                <Card className="w-48 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={meal.strMealThumb || "/placeholder.svg"}
                        alt={meal.strMeal}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {meal.strMeal}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200px * 12));
          }
        }
      `}</style>
    </section>
  )
}
