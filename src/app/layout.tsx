import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-mono/400.css';
import './globals.css';
import './story.css';
import './mobile.css';
import './contact.css';
export const metadata: Metadata = { metadataBase: new URL('https://opsilura.com'), title: 'Opsilura — One approved phase at a time.', description: 'Software, AI automation, customer support and dedicated teams in India. Visible delivery, clear phases, and full ownership.', openGraph: {title:'Opsilura — One approved phase at a time.',description:'Your team in India. Your work, your accounts, your decision to continue.',type:'website'}, robots:{index:true,follow:true} };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
