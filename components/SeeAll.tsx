import { Link } from "react-router-dom"

export const SeeAll = ({ name, path }: { name: string; path: string }) => (
  <Link
    to={path}
    className="text-gray-900 text-md md:text-lg font-medium font-mulish underline"
  >
    See all {name} {">"}
  </Link>
)
