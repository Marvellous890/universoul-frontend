import Input from "../components/Input";
import { useState, useCallback, useEffect } from "react";
import { Transition } from '@headlessui/react';
import formImg from "../assets/img/Placeholder.gif";
import formImg2 from "../assets/img/Sign up.gif";
import Notification from "../components/Notification";
import { ImSpinner8 } from "react-icons/im";
import { buildApiEndpoint, setCookie } from "../utils"
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import {UserGroupIcon, UserIcon} from "@heroicons/react/24/outline";
 
export default function Auth({ signup = false }) {
  const [type, setType] = useState("true");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // conditionals for sign in
  const [variant, setVariant] = useState( signup ? "Register" : "Login");

  const [loading, setLoading] = useState(false);
   const [isChecked, setIsChecked] = useState(false);
     const [showFullPolicy, setShowFullPolicy] = useState(false);


// checkbox functionality
   const handleCheckboxChange = () => {
     setIsChecked(!isChecked);
   };


  const [errorMessage, setErrorMessage] = useState({
    type: "danger",
    title: "Error!",
    desc: "",
  }); // {type: "success", title: "Success!", desc: "You have successfully logged in. Redirecting..."}

  const mockErrorMsg = { ...errorMessage, desc: "" };

  const userRole = type === true ? 'USER' : 'Entity'
  const navigate = useNavigate();


  useEffect(() => {
    if (errorMessage.desc) {
      setTimeout(() => {
        setErrorMessage(mockErrorMsg);
      }, 5000);
    }
  }, [errorMessage.desc]);

  // Handle click for the options
  const handleOptionChange = (value) => {
    setType((prevState) => {
      if (prevState === value) {
        return null; // Deselect option if clicked again
      } else {
        return value;
      }
    });
  };





  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (variant === "Login") {
      // handle login
      if (!email || !password) {
        setErrorMessage({ ...errorMessage, desc: "Please fill in all fields" });
      } else if (password.length < 6) {
        setErrorMessage({
          ...errorMessage,
          desc: "Password should not be less than 6 characters",
        });
      } else {
        setErrorMessage(mockErrorMsg);
        setLoading(true);

        axios
          .post(
            buildApiEndpoint("/users/login"),
            { email, password },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((response) => {
            // check if response status is 2xx
            if (response.status >= 200 && response.status < 300) {
              // successful login

              const responseData = response.data;
              //console.log(responseData, response.status)
              setCookie("user", JSON.stringify(responseData));

              const auth = response.headers.getAuthorization();

              //console.log("this is auth",auth)
              // Extract the token from the header
              const token = auth.split(" ")[1];
              setCookie("token", token);

              navigate("/dashboard");
            } else {
              const responseData = response.data;
              setErrorMessage({ ...errorMessage, desc: responseData });
            }
          })
          .catch((error) => {
            console.error("Login error:", error);
            setErrorMessage({
              ...errorMessage,
              desc: "Unable to login. Try again later",
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      // handle register
      if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !userName ||
        !phoneNumber ||
        !type
      ) {
        setErrorMessage({ ...errorMessage, desc: "Please fill in all fields" });
      } else if (password.length < 6) {
        setErrorMessage({
          ...errorMessage,
          desc: "Password should not be less than 6 characters",
        });
      } else {
        setErrorMessage(mockErrorMsg);
        setLoading(true);

        try {
          const response = await fetch(buildApiEndpoint("/users/register"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email: email,
              password: password,
              firstName: firstName,
              lastName:  lastName,
              userName: userName,
              phoneNumber: phoneNumber,
              role: userRole
            }),
            credentials: "include",
          });

          

          setLoading(false);

          if (response.ok) {
            // successful login
            const responseData = await response.text();
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            setPhoneNumber('')
            setType('')

           
            setCookie("user", responseData);
            navigate("/success-submit");
          } else {
            const responseData = await response.text();
            setErrorMessage({ ...errorMessage, desc: responseData });
          }
        } catch (error) {
          setLoading(false);
          setErrorMessage({
            ...errorMessage,
            desc: "Unable to create account. Try again later",
          });
          console.error("Login error:", error);
        }
      }
    }
  };

  const btnText = () => {
    if (loading) {
      return <ImSpinner8 className='mx-auto animate-spin' />;
    }

    return variant === "Login" ? "Login" : "Register";
  };

  return (
    <section className='container grid items-center justify-center h-full grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-2 '>
      {errorMessage.desc && (
        <Notification
          type={errorMessage.type}
          title={errorMessage.title}
          desc={errorMessage.desc}
          superHandler={() => setErrorMessage(mockErrorMsg)}
        />
      )}
      <div className='h-full col-span-1 '>
        <img
          src={variant === "Login" ? formImg : formImg2}
          alt=''
          className='h-[550px] hidden lg:block md:block'
        />
      </div>
      <form method='POST' onSubmit={handleSubmitForm}>
        <div className='col-span-1 w-[100%] px-2 h-full flex flex-col gap-5 items-center justify-start'>
          <h1
            data-aos='fade-down'
            data-aos-duration='1200'
            className='text-[28px] text-center leading-[18px] text-headingColor font-[500] md:text-[32px] md:leading-[24px] md:text-center lg:text-left mt-5  '>
            UniverSoul Babers
          </h1>
          <p
            className='my-3 text-sm leading-3 text-textColor'
            data-aos='fade-up'
            data-aos-duration='1300'>
            {variant === "Login"
              ? "Login To UniverSoul"
              : "Get Started With UniverSoul"}
          </p>
          {variant === "Register" && (
            <div
              className='flex flex-col w-full gap-5'
              data-aos='fade-right'
              data-aos-duration='1200'>
              <div className='flex flex-col gap-5 lg:gap-1 lg:flex-row items-center flex-col gap-4 lg:gap-0 md:gap-0 lg:flex-row md:flex-row justify-between w-full'>
                <div className='flex w-[100%] md:w-full lg:w-1/2'>
                  <Input
                    label='First name'
                    onChange={(e) => setFirstName(e.target.value)}
                    id='firstName'
                    type='text'
                    value={firstName}
                  />
                </div>
                <div className='flex w-[100%] md:w-full lg:w-1/2 md:ml-4'>
                  <Input
                    label='Last name'
                    onChange={(e) => setLastName(e.target.value)}
                    id='lastName'
                    type='text'
                    value={lastName}
                  />
                </div>
              </div>
              <div className='flex w-full'>
                <Input
                  label='Phone number'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  id='phone'
                  type='tel'
                  value={phoneNumber}
                />
              </div>
              <div className='flex w-full'>
                <Input
                  label='Username'
                  onChange={(e) => setUserName(e.target.value)}
                  id='userName'
                  type='text'
                  value={userName}
                />
              </div>
            </div>
          )}

          <div
            className='flex w-full'
            data-aos='fade-right'
            data-aos-duration='1200'>
            <Input
              label='Email'
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              type='email'
              required={true}
              value={email}
            />
          </div>
          <div
            className='flex w-full'
            data-aos='fade-right'
            data-aos-duration='1200'>
            <Input
              label='Password'
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              type='password'
              required={true}
              value={password}
            />
          </div>
          {variant === "Register" && (
            <>
              <div className='flex my-4 w-full  flex-col items-center justify-center'>
                <p className='mb-4 text-bold text-lg leading-8'>
                  What do you identify as?
                </p>
                <div className='flex  w-full  items-center justify-center'>
                  <div
                    className={`option w-[50%] mr-4 bg-slate-50 rounded-lg shadow-lg p-4 cursor-pointer ${
                      type === true && "border border-black"
                    }`}
                    onClick={() => handleOptionChange(true)}>
                    <UserIcon className='w-8 h-8 mb-4 text-black' />
                    <p className='text-grey text-sm'>Individual</p>
                  </div>
                  <div
                    className={`option w-[50%] mr-4 bg-slate-50 rounded-lg shadow-lg p-4 cursor-pointer ${
                      type === false && "border border-black"
                    }`}
                    onClick={() => handleOptionChange(false)}>
                    <UserGroupIcon className='w-8 h-8 mb-4 text-black' />
                    <p className='text-grey text-sm'>Entity (2+) </p>
                  </div>
                </div>
              </div>

              {/* Privacy and policy section  */}

              <div
                className='flex w-full'
                data-aos='fade-up'
                data-aos-duration='1200'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='privacyCheckbox'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className='h-4 w-4 text-black focus:outline-none border-gray-300 rounded cursor-pointer'
                  />
                  <label
                    htmlFor='privacyCheckbox'
                    className='ml-2 text-sm text-gray-700'>
                    Agree to
                    <span
                      className='underline cursor-pointer ml-1 font-bold'
                      onClick={() => setShowFullPolicy(true)}>
                      Privacy and Policy terms
                    </span>
                  </label>
                </div>
              </div>
            </>
          )}

          <button
            type='submit'
            data-aos='fade-up'
            data-aos-duration='1500'
            className='w-full py-3 mt-1 text-white duration-150 rounded-md bg-primaryDark hover:bg-warm-gray-500'>
            {btnText()}
          </button>

          <p
            className='text-neutral-500 mt'
            data-aos='fade-up'
            data-aos-duration='1500'>
            {variant == "Login"
              ? "First time here?"
              : "Already have an account"}
            <span
              onClick={() =>
                navigate(variant === "Login" ? "/signup" : "/login")
              }
              className='ml-2 text-black cursor-pointer hover:underline'>
              {variant === "Login" ? "Create an account" : "Login"}
            </span>
          </p>
        </div>
      </form>

      {/* Modal for Privacy Policy */}
      <Transition
        show={showFullPolicy}
        as='div'
        className={`fixed inset-0 z-50 overflow-y-auto ${
          showFullPolicy ? "transition-opacity duration-300" : "hidden"
        } `}>
        <div className='flex items-center justify-center min-h-screen'>
          <Transition.Child
            as='div'
            className='fixed inset-0 transition-opacity'
            onClick={() => setShowFullPolicy(false)}>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </Transition.Child>

          <Transition.Child
            as='div'
            className={`bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-11/12 ${
              showFullPolicy ? "scale-100" : "scale-70"
            } `}>
            <div className='p-4'>
              <h2 className='text-xl font-bold mb-4 text-center'>
                UVS Privacy and Policy
              </h2>
              <div className='h-[350px] rounded-lg border border-gray-300 p-4 overflow-y-auto'>
                <div className='p-4'>
                  <h2 className='text-xl font-bold mb-4'>
                    Terms & Conditions Universoul Barbers
                  </h2>
                  <p className='mb-4'>Effective Date: [Insert Date]</p>

                  <ol className='list-decimal pl-5'>
                    <li className='mb-4'>
                      <span className='font-semibold'> Introduction:</span>{" "}
                      Welcome to Universoul Barbers (hereinafter referred to as
                      “Universoul,” “we,” “our,” or “us”). These Terms &
                      Conditions govern your access to and use of our services.
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'>Service Providers:</span>
                      <ul className='list-disc pl-5'>
                        <li>
                          Universoul Barbers provides a platform for connecting
                          clients with independent service providers (barbers).
                        </li>
                        <li>
                          Service providers are responsible for their own
                          equipment, tools, and supplies needed to perform their
                          services.
                        </li>
                      </ul>
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'>
                        Client Appointments:
                      </span>
                      <ul className='list-disc pl-5'>
                        <li>
                          Clients may book appointments with service providers
                          through the Universoul Barbers platform.
                        </li>
                        <li>
                          Universoul Barbers does not guarantee the availability
                          of specific service providers or appointment times.
                        </li>
                      </ul>
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'>Payment and Fees:</span>
                      <ul className='list-disc pl-5'>
                        <li>
                          Clients are responsible for paying service fees
                          directly to the service providers for services
                          rendered.
                        </li>
                        <li>
                          Universoul Barbers may charge a service fee for the
                          use of its platform, which will be clearly disclosed
                          to clients.
                        </li>
                      </ul>
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'> Code of Conduct:</span>
                      <ul className='list-disc pl-5'>
                        <li>
                          Service providers are expected to conduct themselves
                          professionally and provide high-quality services to
                          clients.
                        </li>
                        <li>
                          Clients are expected to treat service providers with
                          respect and adhere to appointment schedules.
                        </li>
                      </ul>
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'> Liability:</span>
                      <ul className='list-disc pl-5'>
                        <li>
                          Universoul Barbers shall not be liable for any
                          damages, losses, or injuries resulting from the use of
                          its platform or services.
                        </li>
                        <li>
                          Service providers are solely responsible for the
                          quality and safety of their services.
                        </li>
                      </ul>
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'>
                        Intellectual Property:
                      </span>
                      <ul className='list-disc pl-5'>
                        <li>
                          All content and materials on the Universoul Barbers
                          platform are the property of Universoul or its
                          licensors and may not be reproduced without
                          permission.
                        </li>
                      </ul>
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'> Termination:</span>
                      <ul className='list-disc pl-5'>
                        <li>
                          Universoul Barbers reserves the right to terminate
                          access to its platform for any user who violates these
                          Terms & Conditions or engages in misconduct.
                        </li>
                      </ul>
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'> Governing Law:</span>
                      <ul className='list-disc pl-5'>
                        <li>
                          These Terms & Conditions shall be governed by and
                          construed in accordance with the laws of
                          [Jurisdiction], without regard to its conflict of law
                          provisions.
                        </li>
                      </ul>
                    </li>
                    <li className='mb-4'>
                      <span className='font-semibold'>
                        Changes to the Terms & Conditions:
                      </span>
                      <ul className='list-disc pl-5'>
                        <li>
                          Universoul Barbers reserves the right to update or
                          revise these Terms & Conditions at any time without
                          prior notice. Any changes will be effective
                          immediately upon posting on the Universoul Barbers
                          platform.
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <p className='mt-4'>
                    By accessing or using our services, you acknowledge that you
                    have read, understood, and agree to be bound by these Terms
                    & Conditions.
                  </p>
                </div>
              </div>
            </div>

            <div className='p-4 bg-gray-100 flex justify-end'>
              <button
                onClick={() => setShowFullPolicy(false)}
                className='bg-gray-400 text-white py-2 px-4 rounded-md mr-2'>
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowFullPolicy(false);
                  setIsChecked(true); // Update checkbox state on Agree
                }}
                className='bg-primaryDark text-white py-2 px-4 rounded-md'>
                Agree
              </button>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </section>
  );
}
