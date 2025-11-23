import React from "react"

const Footer = () => {
  return (
    <div className="w-full text-[#737373] px-4 mb-10 md:px-10 flex flex-col items-center">
      <div className="py-10 text-center">
        <p>Developed by Marat Zinger</p>
      </div>

      <div
        className="
          grid grid-cols-2
          sm:grid-cols-4
          gap-6 sm:gap-10
          text-sm
          text-center
          max-w-screen-lg
        "
      >
        <ul className="flex flex-col gap-2">
          <li>FAQ</li>
          <li>Investor Relations</li>
          <li>Privacy</li>
          <li>Speed Test</li>
        </ul>

        <ul className="flex flex-col gap-2">
          <li>Help Center</li>
          <li>Jobs</li>
          <li>Cookie Preferences</li>
          <li>Legal Notices</li>
        </ul>

        <ul className="flex flex-col gap-2">
          <li>Account</li>
          <li>Ways to Watch</li>
          <li>Corporate Information</li>
          <li>Only on ZingerFlix</li>
        </ul>

        <ul className="flex flex-col gap-2">
          <li>Media Center</li>
          <li>Terms of Use</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
