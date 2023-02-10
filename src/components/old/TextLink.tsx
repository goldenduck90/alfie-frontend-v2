import React from "react"
import { Link } from "react-router-dom"

export const TextLink = ({ to, text }: { to: string; text: string }) => (
  <Link to={to} className="text-indigo-800 hover:text-indigo-600">
    {text}
  </Link>
)
