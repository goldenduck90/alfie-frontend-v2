export const s3Key = ({
  fileName,
  fileType,
  folder,
  timestamp = false,
}: {
  fileName: string
  fileType: string
  folder: string
  timestamp?: boolean
}) => {
  let key = `${folder.replace(" ", "_")}/${fileName}`
  if (timestamp) {
    key = `${key}-${Date.now()}`
  }

  return `${key}.${fileType}`
}
