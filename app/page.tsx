import { Navbar } from "@/components/navbar"
import { PopularSlider } from "@/components/popular-slider"
import { TrendingSlider } from "@/components/trending-slider"
import { Hero } from "@/components/hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <Hero />
      <PopularSlider />
      <TrendingSlider />
    </div>
  )
}
