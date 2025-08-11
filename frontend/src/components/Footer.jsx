import React from "react"

const Footer = () => {
  return (
    <div className="justify-center text-[#737373] md:px-10 mx-auto">
      <div className="py-20 text-center">
        <p className="">Developed by Marat Zinger</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 text-sm pb-10 max-w-5xl mx-auto">
        <ul className="footer-list">
          <li>FAQ</li>
          <li>Investor Relations</li>
          <li>Privacy</li>
          <li>Speed Test</li>
        </ul>

        <ul className="footer-list">
          <li>Help Center</li>
          <li>Jobs</li>
          <li>Cookie Preferences</li>
          <li>Legal Notices</li>
        </ul>

        <ul className="footer-list">
          <li>Account</li>
          <li>Ways to Watch</li>
          <li>Corporate Information</li>
          <li>Only on Netflix</li>
        </ul>

        <ul className="footer-list">
          <li>Media Center</li>
          <li>Terms of Use</li>
          <li>Contact Us</li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
