import { ButtonPrimary, ColumnItems, Layout, RecommendedColumnItem } from "@components"

export default function ColumnPage() {
    return <Layout title="Column page" content="Column page" className="flex flex-col gap-[56px] pt-[56px] pb-16 md:px-40">
        <div className="w-full flex flex-coll gap-8 md:flex-row justify-between">
            <RecommendedColumnItem title="RECOMMENDED COLUMN" content="オススメ" />
            <RecommendedColumnItem title="RECOMMENDED DIET" content="ダイエット" />
            <RecommendedColumnItem title="RECOMMENDED DIET" content="美容" />
            <RecommendedColumnItem title="RECOMMENDED HEALTH" content="健康" />
        </div>
        <ColumnItems />
        <ButtonPrimary className="md:!w-[296px] mx-auto mt-[-30px]">コラムをもっと見る</ButtonPrimary>
    </Layout>
}