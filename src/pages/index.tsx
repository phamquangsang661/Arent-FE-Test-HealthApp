import {
  AchievementRate,
  BodyWeighGraph,
  Layout,
  MealHistory,
  MyPageFilters
}
  from "@components";
import { useAuth } from "@hooks";
import { useState } from "react";

export default function MyPage() {
  const { isAuth } = useAuth({
    redirect: true
  })
  const [selectedFilter, setSelectedFilter] = useState<"all" | "Morning" | "Lunch" | "Dinner" | "Snack">("all")
  const onClickFilter = (filterName: "Morning" | "Lunch" | "Dinner" | "Snack") => () => {
    if (filterName == selectedFilter) {
      setSelectedFilter("all")
    } else {
      setSelectedFilter(filterName)
    }
  }
  if (!isAuth)
    return null

  return (
    <Layout title="My page" content="My page" className="flex flex-col gap-6 pb-16">
      <div className="w-screen flex flex-col md:flex-row">
        <AchievementRate />
        <BodyWeighGraph />
      </div>
      <MyPageFilters onFilter={onClickFilter} />
      <MealHistory filter={selectedFilter} />
    </Layout>
  );
}
