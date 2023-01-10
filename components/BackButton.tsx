import { useNavigate } from "react-router"
import { Title } from "./Typography"

export const BackButton = ({
  location,
  title = "Back",
}: {
  location: string
  title?: string
}) => {
  const navigation = useNavigate()
  const goBack = () => {
    navigation(`/${location}`)
  }

  return <Title onClick={goBack}>← {title}</Title>
}
