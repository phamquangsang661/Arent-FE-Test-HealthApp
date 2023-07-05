import {
  AchievementRate,
  BodyWeighGraph,
  ButtonPrimary,
  Layout,
  MealHistory,
  MyPageFilters
}
  from "@components";
import { useState } from "react";

export default function MyPage() {

  const [selectedFilter, setSelectedFilter] = useState<"all" | "Morning" | "Lunch" | "Dinner" | "Snack">("all")
  const onClickFilter = (filterName: "Morning" | "Lunch" | "Dinner" | "Snack") => () => {
    if (filterName == selectedFilter) {
      setSelectedFilter("all")
    } else {
      setSelectedFilter(filterName)
    }
  }

  return (
    <Layout title="My page" content="My page" className="flex flex-col gap-6 pb-16">
      <div className="w-screen flex flex-col md:flex-row">
        <AchievementRate />
        <BodyWeighGraph />
      </div>
      <MyPageFilters onFilter={onClickFilter} />
      <MealHistory filter={selectedFilter} />
      <ButtonPrimary className="md:!w-[296px] mx-auto mt-1">記録をもっと見る</ButtonPrimary>
    </Layout>
  );
}
