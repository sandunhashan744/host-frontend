import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-emerald-700 text-white py-4">
            <div className="container mx-auto">
            <p className="text-center">Copyright © {new Date().getFullYear()} Telegram Trade Copier</p>
            </div>
        </footer>
    </div>
  )
}

export default Footer