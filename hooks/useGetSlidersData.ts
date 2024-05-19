import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query } from "firebase/firestore"

import { FIRESTORE_DB } from "@/services/firebase.config"
import { useAppSelector } from "@/store"
import { MainSliderData } from "@/types/mainSlider"
import { SexondarySliderData } from "@/types/secondarySlider"

interface ReturnedSlidersData {
  loading: boolean
  sliderData: MainSliderData[] | null
  trendingSliderData: SexondarySliderData[] | null
  topRomanceData: SexondarySliderData[] | null
}

const randomSorting = Math.floor(Math.random() * 2) === 0 ? "asc" : "desc"

const mainSliderQuery = query(
  collection(FIRESTORE_DB, "main-slider"),
  orderBy("url", randomSorting)
)
const secondarySliderTrendingQuery = query(
  collection(FIRESTORE_DB, "trending"),
  orderBy("isCommingSoon", "asc")
)

const secondarySliderTopRomanceQuery = query(
  collection(FIRESTORE_DB, "top-romance"),
  orderBy("isCommingSoon", "asc")
)

const secondarySliderRandomeElement = (sliders: SexondarySliderData[]) => {
  const comingSoonElements = sliders.filter((slider) => slider.isCommingSoon)
  const nonComingSoonElements = sliders.filter((slider) => !slider.isCommingSoon)
  const shuffledNonComingSoon = nonComingSoonElements.sort(() => 0.5 - Math.random())

  return [...shuffledNonComingSoon, ...comingSoonElements].slice(0, 5)
}

export const useGetSliderData = (): ReturnedSlidersData => {
  const [sliderData, setSliderData] = useState<MainSliderData[] | null>(null)
  const [trendingSliderData, setTrendingSliderData] = useState<
    SexondarySliderData[] | null
  >(null)
  const [topRomanceData, setTopRomanceData] = useState<SexondarySliderData[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const { searchValue } = useAppSelector((state) => state.video_data)
  const getMainSliderData = async () => {
    setLoading(true)

    const querySnapshot = await getDocs(mainSliderQuery)
    const sliders: MainSliderData[] = []
    querySnapshot.forEach((doc) => {
      sliders.push({ ...doc.data(), id: doc.id } as MainSliderData)
    })

    setSliderData(sliders)
  }

  const getSecondarySliderTrendingData = async () => {
    setLoading(true)
    const querySnapshot = await getDocs(secondarySliderTrendingQuery)
    const sliders: SexondarySliderData[] = []

    querySnapshot.forEach((doc) => {
      sliders.push({ ...doc.data(), id: doc.id } as SexondarySliderData)
    })

    setTrendingSliderData(secondarySliderRandomeElement(sliders))
  }

  const getSecondarySliderRomanceData = async () => {
    setLoading(true)
    const querySnapshot = await getDocs(secondarySliderTopRomanceQuery)
    const sliders: SexondarySliderData[] = []

    querySnapshot.forEach((doc) => {
      sliders.push({ ...doc.data(), id: doc.id } as SexondarySliderData)
    })

    setTopRomanceData(secondarySliderRandomeElement(sliders))
  }

  const searchMainSliderByGenre = (genre: string) => {
    if (!sliderData || !genre) return getMainSliderData()

    const filteredSliders = sliderData?.filter((slider) =>
      slider.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
    )

    if (!filteredSliders.length) return

    setSliderData(filteredSliders)
  }

  useEffect(() => {
    searchMainSliderByGenre(searchValue)
  }, [searchValue])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (sliderData && trendingSliderData) {
      timeout = setTimeout(() => {
        setLoading(false)
      }, 2000)
    }

    return () => clearTimeout(timeout)
  }, [sliderData, trendingSliderData])

  useEffect(() => {
    getMainSliderData()
    getSecondarySliderTrendingData()
    getSecondarySliderRomanceData()
  }, [])

  return {
    loading,
    sliderData,
    topRomanceData,
    trendingSliderData
  }
}
