// data goes into this file 
import catImg01 from './assets/img/cart.png';
import catImg02 from './assets/img/clipper.png';
import catImg03 from './assets/img/forum.png';
import catImg04 from './assets/img/headphone.png';
import baberImg from './assets/img/about-1.jpg'
import product1 from './assets/img/product-1.JPG'
import product2 from './assets/img/product-2.jpg'
import product3 from './assets/img/product-3.jpg'
import customerImg from './assets/img/patient-avatar.png'
import firstTesti from './assets/img/testimonial-1.JPG'
import { isLoggedIn } from "./utils";





export const products = [
  {
    product: product1,
  },
  {
    product: product2,
  },
  {
    product: product3,
  },
];


export const quickLinks = [
  {
    path: '/',
    display: 'Home'
  },
  {
    path: '/blog',
    display: 'Blog'
  },
  {
    path: '/barbers',
    display: 'Find A Barber'
  },
]

export const quickLinks02 = [
 
  {
    path: isLoggedIn() ? "/forum" : "/login",
    display: "Forum",
  },
  {
    path:  "https://uvsbarbercharity.com" ,
    display: "Our Partner Charity",
  },
  {
    path:  "/help-us-empower" ,
    display: "Help Us Empower",
  }

];

export const testimonials = [
  {
    id: 1,
    name: "Sarah M",
    img: firstTesti,
    review:
      "Stylez is the best barber in the Midwest, I've never had a bad haircut with him in 3 years.The VIP haircut is the only option for me going forward, very clean, precise, and quick overall. The vip experience is the best I've ever had, definitely recommend it for anyone who wants to look and feel their best. High quality cuts every time I get a VIP haircut at a good price also. I'm always satisfied and happy with my VIP cut it's an incredible upgrade. Amazing experience overall, I've never looked this good until I started getting the VIP haircut",
  },
  {
    id: 2,
    name: "David L",
    img: customerImg,
    review:
      "I stumbled upon this salon a few months ago, and it's been a game-changer for me. The quality of service is exceptional, and the attention to detail is impressive. I always leave feeling rejuvenated and confident. This salon has become my go-to place for self-care and beauty treatments!",
  },
  {
    id: 3,
    name: "Emily S",
    img: customerImg,
    review:
      "I can't say enough good things about this salon. From the moment you walk in, you're greeted with warmth and professionalism. The stylists here are truly artists, and they always take the time to understand exactly what I want. The results are consistently outstanding. I'm grateful to have found such a gem in the world of salons!",
  },
  {
    id: 4,
    name: "Michael C",
    img: customerImg,
    review:
      "This salon has completely transformed my perception of what a salon experience should be. The team here goes above and beyond to make you feel special and valued. The attention to detail in their work is unparalleled, and I always leave feeling like a million bucks. I wouldn't trust my hair and beauty needs to anyone else!",
  },
];

export const barbers = [
  {
    id: 1,
    img: baberImg,
    name: "Ryan Jack",
    badge: "Top Rated",
    customers: "+1200 customers",
    location: "San Frascico",
    reviews: 5,
    total: 454
  },
  {
    id: 2,
    img: baberImg,
    name: "Scott Mcall",
    badge: "Top Rated",
    customers: "+1200 customers",
    location: "San Frascico",
    reviews: 5,
    total: 454
  },
  {
    id: 3,
    img: baberImg,
    name: "Austin Dave",
    badge: "Top Rated",
    customers: "+1200 customers",
    location: "San Frascico",
    reviews: 5,
    total: 454
  },
];


export const navLinks = [
  { path: "/", label: "Home" },
  { path: "/marketplace", label: "Marketplace" },
  { path: "/blog", label: "Blog" },
  { path: "/barbers", label: "Find a Barber" },
  { path: isLoggedIn() ? '/funding' : '/login', label: "Crowdfunding" },
];

export const statistics = [
  { value: 60, label: "Brands", suffix: '+' },
  { value: 70, label: "Shops", suffix: '+' },
  { value: 100, label: "Satisfaction", suffix: '%' },
];

export const categories = [
  {
    img: catImg01,
    title: "Visit Marketplace",
    content:
      "We have a marketplace for all members to showcase barbing equipment with a link to their social media accounts. This service is absolutely free!",
    btnText: "Go to Marketplace",
    link: "/marketplace",
  },
  {
    img: catImg02,
    title: "View All Baber Shops",
    content:
      "Comprehensive list of all barbers can be accessed from here.If you a need a barber to book solo or get a barber for your organization",
    btnText: "View All Babers",
    link: "/barbers",
  },
  {
    img: catImg03,
    title: "Go To Forum",
    content:
      "Meet your fellow Barbers and Service providers who are gathering around the world, to discuss issues, tactics and how we can make the foundation of this platform better for everyone! ",
    btnText: "Go to Forum",
    link: "/forum",
  },
  // {
  //   img: catImg04,
  //   title: "Request For Assistance",
  //   content:
  //     "Anyone in need of urgent assistance can apply here. The funding is provided by various Government agencies and Private contractors",
  //   btnText: "Request for Assistance",
  // },
];

export const pricing = [
  {
    title: "Apprentice",
    price: "0",
    currency: "USD",
    frequency: "/month",
    description: "The essential package for your best work for client",
    features: [
      "Access to store",
      "10 Clients only",
      "3 products listing",
      "Additional barber (crew)",
      "Contracts available",
    ],
    cta: "Get Started",
    recommended: false,
  },
  {
    title: "Journeyman",
    price: "0",
    currency: "USD",
    frequency: "/month",
    description: "The essential package for your best work for client",
    features: [
      "Access to store",
      "3 products listing",
      '20 Clients only',
      "Additional barber (crew)",
      "Contracts available",
    ],
    cta: "Get Started",
    recommended: false,
  },
  {
    title: "Gold",
    price: 25,
    currency: "USD",
    frequency: "/month",
    description: "The essential package for your best work for client",
    features: [
      "Access to store",
      "20 products listing",
      '60 clients only',
      "10 Additional barber (crew)",
      "Contracts available",
    ],
    cta: "Get Started",
    recommended: true,
  },
  {
    title: "Grandmaster",
    price: 289.99,
    currency: "USD",
    frequency: "/month",
    description: "The essential package for your best work for client",
    features: [
      "Access to store",
      "3 products listing",
      'Unlimited clients',
      "Additional barber (crew)",
      "Contracts available",
    ],
    cta: "Get Started",
    recommended: false,
  },
];


export const services =  [
    'Mobile Haircuts / Transportation ',

'Custom Product Creation',

'Instant Clients', 

'Crowdfunding creation',

'Marketplace ',

'Community Form',

'Backend Analytics', 

'Booking Management', 

'Priority Customer Support ',

'Weekly Improvement Updates From our Communities & Teams',

'Live community and Team Chats'
  ]


export const fundRaisingProgress = [
        {
          donation_title: "Kids Donation",
          donation_progress: 40
        },
        {
          donation_title: "Orphans Donation",
          donation_progress: 100
        },
        {
          donation_title: "Refugees Donation",
          donation_progress: 30
        },
        {
          donation_title: "Homeless Kids Donation",
          donation_progress: 50
        }
]

export const fundRaisingResult = [
  {
    donation_result: 200,
    donation_period: 4,
  },
  {
    donation_result: 1000,
    donation_period: 24,
  },
  {
    donation_result: 100,
    donation_period: 8,
  },
  {
    donation_result: 200,
    donation_period: 6,
  },
]


export const UserA = [
  {
    forumUser: "A",
    forumMessage: "Hey How are you today?",
  },

  {
    forumUser: "A",
    forumMessage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis.    ",
  },
]

export const UserB = [
  {
    forumUser: "B",
    forumMessage: "I'm ok what about you?",
  },

  {
    forumUser: "B",
    forumMessage: "Lorem ipsum dolor sit, amet consectetur adipisicing. ?",
  },
]

export const UserC = [
  {
    forumUser: "C",
    forumMessage: "Lorem ipsum dolor sit amet !",
  },

]