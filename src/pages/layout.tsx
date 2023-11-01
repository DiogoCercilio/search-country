import { Open_Sans, Bangers } from 'next/font/google'

const open_sans = Open_Sans({
    weight : ['400'],
    subsets: ['latin'],
    variable: '--opensans',
})

const bangers = Bangers({
    weight : ['400'],
    subsets: ['latin'],
    variable: '--bangers',
})

export default function GoogleFontLayout({ children }: any) {
    return (
        <div className={`${bangers.variable} ${open_sans.variable}`}>
            {children}
        </div>
    )
}