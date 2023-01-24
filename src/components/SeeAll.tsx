import  Link  from "next/link"

export const SeeAll = ({ name, path }: { name: string; path: string }) => (
  <Link
    href={path}
    className="text-gray-900 text-md md:text-lg font-medium font-mulish underline"
  >
    See all {name} {">"}
  </Link>
)
