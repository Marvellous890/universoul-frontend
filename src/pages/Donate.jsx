export  default function () {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800">Help Us Empower</h2>
      <p className="text-lg text-gray-600 mt-4">We are looking for volunteers to help us empower the community. If you
        are interested in helping us, please fill out the form below and we will get back to you as soon as
        possible.</p>
      <form className="mt-8">
        <div className="flex flex-wrap -mx-4">
          <div className="md:w-1/2 w-full px-4">
            <input type="text" placeholder="First Name" className="border border-gray-300 p-3 w-full mt-4"/>
          </div>
          <div className="md:w-1/2 w-full px-4">
            <input type="text" placeholder="Last Name" className="border border-gray-300 p-3 w-full mt-4"/>
          </div>
          <div className="md:w-1/2 w-full px-4">
            <input type="email" placeholder="Email" className="border border-gray-300 p-3 w-full mt-4"/>
          </div>
          <div className="md:w-1/2 w-full px-4">
            <input type="tel" placeholder="Phone" className="border border-gray-300 p-3 w-full mt-4"/>
          </div>
          <div className="w-full px-4">
            {/*amount*/}
            <input type="number" placeholder="Amount" className="border border-gray-300 p-3 w-full mt-4"/>
          </div>
          <div className="w-full px-4 mt-4">
            <button className="bg-primaryDark text-white p-3 w-full">Donate</button>
          </div>
        </div>
      </form>
    </section>

  )
}