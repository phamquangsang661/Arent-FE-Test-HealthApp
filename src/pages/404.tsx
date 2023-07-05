import { Layout } from "@components";

export default function page404() {
    return <Layout title="404" content="No exist page" className="flex justify-center items-center flex-col w-full h-full">
        <p className="text-[200px] font-hiragino font-bold text-primary-500">404</p>
        <p className="font-hiragino text-[50px] text-primary-500">このページは存在しません!</p>
    </Layout>
}