import './globals.css'

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white text-slate-900 font-sans antialiased"
      >
        {children}
      </body>
    </html>
  )
}
