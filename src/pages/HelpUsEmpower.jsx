import haircut from '../assets/img/haircut.jpg'
import equipment from '../assets/img/equipment.jpg'
import transportation from '../assets/img/transportation.jpg'
import education from '../assets/img/education.webp'
import kit from '../assets/img/kit.webp'

import {clsx} from "clsx";

const services = [
  {
    heading: 'Haircuts',
    text: 'Your contributions help provide haircuts to those in need, fostering confidence and self-esteem.',
    img: haircut
  },
  {
    heading: 'Equipment',
    text: "By funding equipment purchases, you’re enabling our barbers to perform their best work and deliver exceptional service.",
    img: equipment
  },
  {
    heading: 'Transportation',
    text: 'We use funds to facilitate transportation for both barbers and clients, ensuring accessibility to our services.',
    img: transportation
  },
  {
    heading: 'Education',
    text: "Education: Your support aids in funding educational programs and opportunities for aspiring barbers, empowering them to pursue their dreams.",
    img: education
  },
  {
    heading: 'Merchandise',
    text: "Proceeds from merchandise sales go back into our community initiatives, furthering our impact and reach.",
    img: education
  },
  {
    heading: 'Barbers',
    text: "We invest in our barbers, providing them with fair compensation, training, and support to excel in their profession.",
    img: kit
  },
]

const ourGoals = [
  "To empower individuals through transformative hair experiences.",
  "To foster a sense of community and belonging through our services.",
  "To provide opportunities for personal and professional growth within the barbering industry.",
  "To make a positive impact on the lives of those we serve and the communities we operate in.",
]

export default function HelpUsEmpower() {

  return (
    <div className="md:py-12 py-8">
      <section className="">
        <div className="container mx-auto px-4">
          <h1
            className='text-4xl sm:text-5xl md:text-6xl mt-4 text-center text-headingColor font-[800] md:text-center lg:text-left mb-10'
          >Help Us Empower</h1>
          <p className="mb-10">At UVS Barbers, we believe in the power of community and empowerment. When you support us
            through our
            contract purchases, you’re not just investing in haircuts, equipment, or services. You’re investing in
            something bigger – you’re investing in empowerment.</p>
        </div>
      </section>

      <section className="container mx-auto py-10">
        <p className="text-3xl text-center">What Your Support Does</p>
      </section>

      <section id="what-it-does" className="flex flex-col gap-20">
        {services.map((service, index) => (
          <ServicesGrid
            key={index}
            text={service.text}
            img={service.img}
            heading={service.heading}
            reverse={index % 2 === 0}
          />
        ))}
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800">Our Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {ourGoals.map((goal, index) => (
            <div key={index} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primaryDark mr-4" fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5 13l4 4L19 7"/>
              </svg>
              <p className="text-gray-600">{goal}</p>
            </div>
          ))}
        </div>
      </section>

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
              <textarea placeholder="Message" className="border border-gray-300 p-3 w-full mt-4"></textarea>
            </div>
            <div className="w-full px-4 mt-4">
              <button className="bg-blue-500 text-white p-3 w-full">Send Message</button>
            </div>
          </div>
        </form>
      </section>

    </div>
  )
}

function ServicesGrid({text, img, reverse = false, heading}) {
  return (
    <div className="flex flex-wrap">
      <div className={clsx(" md:w-1/2 w-full px-4", {"order-1": reverse === true})}>
        <h2 className="text-2xl font-bold text-gray-800">{heading}</h2>
        <p className="text-lg text-gray-600 mt-4">{text}</p>
        <div>
          {/*  invest link as a button */}
          <button
            className="bg-primaryDark px-2 py-1 text-white rounded mt-4">
            Invest now
          </button>
        </div>
      </div>
      <div className="md:w-1/2 w-full px-4">
        <img
          className="rounded-lg w-full h-96 object-cover"
          src={img}
          alt={text}
        />
      </div>
    </div>
  )
}