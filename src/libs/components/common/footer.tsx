import Link from 'next/link'
export interface Footer {
    className?: string
}
export const Footer = ({ className = "" }: Footer) => {
    return <div className={`px-10 md:px-40 py-[56px] flex flex-row gap-[45px] bg-dark-500 w-full
    text-light leading-4 tracking-[0.033px] text-[11px] font-hiragino  font-light
    ${className}`}>
        
        <Link href="/">会員登録</Link>
        
        <Link href="/">運営会社</Link>
        
        <Link href="/">利用規約</Link>
        
        <Link href="/">個人情報の取扱について</Link>
        
        <Link href="/">特定商取引法に基づく表記</Link>
        
        <Link href="/">お問い合わせ</Link>
    </div>
}