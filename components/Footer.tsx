import React from 'react'

const Footer = ({ user, type="desktop" }: FooterProps) => {
  return (
    <footer className="footer">Footer
    
        <div className={type === "mobile" ? "footer_name_mobile" : "footer_name"}>
            <p className="text-xl font-bold text-gray-700">
                {user.firstName[0]}
            </p>

        </div>
    
    </footer>
  )
}

export default Footer