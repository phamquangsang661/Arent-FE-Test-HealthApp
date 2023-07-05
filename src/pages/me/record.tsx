import {
    BodyGraphRecord,
    ButtonPrimary,
    Layout,
    MyDiary,
    MyExerciseRecord,
    RecordNavigationItem,
}
    from "@components";

export default function MyRecord() {
    return (
        <Layout title="My record" content="My record" className="flex flex-col gap-[56px] pt-[56px] pb-16  md:px-[160px]">
            <div className="flex flex-col sm:flex-row  sm:justify-between">
                <RecordNavigationItem
                    href="#body-record"
                    url="/images/my-record-navigation-1.png"
                    title="BODY RECORD" content="自分のカラダの記録" />
                <RecordNavigationItem
                    href="#my-exercise-record"
                    url="/images/my-record-navigation-2.png"
                    title="MY EXERCISE"
                    content="自分の運動の記録" />
                <RecordNavigationItem
                    url="/images/my-record-navigation-3.png"
                    href="#my-diary"
                    title="MY DIARY"
                    content="自分の日記" />
            </div>
            <BodyGraphRecord />
            <MyExerciseRecord />
            <MyDiary />
            <ButtonPrimary className="md:!w-[296px] mx-auto mt-[-26px]">自分の日記をもっと見る</ButtonPrimary>
        </Layout>
    );
}
