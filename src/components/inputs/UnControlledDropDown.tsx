/* eslint-disable @typescript-eslint/no-explicit-any */
const UnControlledDropDown = ({
  selectedItem,
  setSelected,
}: {
  selectedItem: any
  setSelected: any
}) => {
  return (
    <select
      id="location"
      name="location"
      className="font-mulish w-full px-3 py-2 focus:outline-none appearance-none rounded-sm border"
      defaultValue={"monday"}
      onChange={(e) => setSelected(e.target.value)}
      value={selectedItem}
    >
      <option>monday</option>
      <option>tuesday</option>
      <option>wednesday</option>
      <option>thursday</option>
      <option>friday</option>
      <option>saturday</option>
      <option>sunday</option>
    </select>
  )
}
export default UnControlledDropDown
