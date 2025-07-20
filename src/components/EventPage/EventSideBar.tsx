import { categories, locations } from "../../constant"
import Button from "../ReusableComponent/Button"

const EventSideBar = () => {
  return (
    <div className="md:w-1/5 w-full border-[0.5px] rounded-xl border-gray-200 p-4  h-full">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Events</h1>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
               
                  <select name="" id="" className="w-full border border-gray-300 rounded-md p-2">
                  {
                  locations.map((location) => (
                    <option value={location.value}>{location.label}</option>
                  ))
                }
                </select>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold">Category</h1>
                    <Button className="text-base font-bold hover:text-red-500 px-4 py-2">Clear</Button>
                  </div>
                  <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-3">
                      {
                      categories.map((category) => (
                        <div key={category.value} className="flex items-center gap-2">
                          <input type="checkbox" name="category" id={category.value} className="size-5 checked:text-xs" />
                          <span>{category.label}</span>
                        </div>
                      ))
                    }
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold">Price</h2>
                    <div className="flex flex-col gap-2">
                      <input type="range" name="price" id="price" className="w-full border border-gray-300 rounded-md py-0.5px]" min={0} max={100} />
                      <div className="flex items-center justify-between">
                        <span>0</span>
                        <span>1000000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </div>
  )
}

export default EventSideBar