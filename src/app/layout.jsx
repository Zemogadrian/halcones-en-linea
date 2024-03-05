import { Roboto } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export const metadata = {
  title: 'Itesus - Halcón en línea',
  description: 'Halcón en línea es una plataforma de educación en línea para el Instituto Tecnológico Superior de Sinaloa.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body className={roboto.className}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
