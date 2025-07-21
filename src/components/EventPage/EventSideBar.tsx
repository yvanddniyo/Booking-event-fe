import Button from "../ReusableComponent/Button"

const EventSideBar = () => {
  return (
    <div className="lg:w-1/5 w-full border-[0.5px] rounded-xl border-gray-200 p-4  h-full">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Events</h1>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold">Category</h1>
                    <Button className="text-base font-bold hover:text-red-500 px-4 py-2">Clear</Button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <input type="date" name="date" id="date" className="w-full border border-gray-300 rounded-md p-2" />
                    <input type="date" name="date" id="date" className="w-full border border-gray-300 rounded-md p-2" />
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
  )
}

export default EventSideBar