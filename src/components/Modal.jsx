import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {isLoggedIn, setCookie} from "../utils.jsx";

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(!isLoggedIn())

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function loginAsGuest() {
    setCookie('user', JSON.stringify({
      "agreement": false,
      "active": false,
      "_id": "000000000000000000000",
      "firstName": "Guest",
      "lastName": "User",
      "userName": "Guest-84736",
      "email": "example@guest.com",
      "role": "guest",
      "blog_owner": true,
      "banned_from_forum": false,
      "type": "basic",
      "__v": 0,
      "referCode": "REF-0000000-00000",
      "phoneNumber": "000000000000",
      "pictureUrl": "https://res.cloudinary.com/di36rc30e/image/upload/v1703862760/user_images/r5xfo2gevurk4aweizng.png",
      "bio": "bbb",
      "referralCount": 0,
      "appointmentCount": 0,
      "blogCount": 0,
      "referredUsers": []
    }))

    window.location.reload();
  }

  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25"/>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Login as a guest
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Access the website feature without creating an account
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                      onClick={closeModal}
                    >
                      No, thanks!
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium  bg-primaryDark text-white ml-4"
                      onClick={loginAsGuest}
                    >
                      Yeah sure
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
