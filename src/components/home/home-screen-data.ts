import { Droplet, Fan, Paintbrush, Plug, Scissors, Sparkles, SprayCan, Wrench } from "lucide-react-native";

export const categories = [
  { name: 'Carpenter', icon: Wrench },
  { name: 'Cleaner', icon:SprayCan },
  { name: 'Painter', icon: Paintbrush },
  { name: 'Electrician', icon: Plug },
  { name: 'Beauty', icon: Sparkles },
  { name: 'AC Repair', icon: Fan },
  { name: 'Plumber', icon: Droplet },
  { name: "Men's Salon", icon: Scissors },
];

export const services = [
  {
    id: 1,
    title: 'Complete Kitchen Cleaning',
    price: 150,
    originalPrice: 180,
    rating: 5,
    reviews: 130,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    provider: { name: 'Mark Willions', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50' },
  },
  {
    id: 2,
    title: 'Window Cleaning',
    price: 80,
    originalPrice: 100,
    rating: 4,
    reviews: 98,
    image: 'https://images.pexels.com/photos/634005/pexels-photo-634005.jpeg?auto=compress&cs=tinysrgb&w=100',
    provider: { name: 'John Doe', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50' },
  },
  {
    id: 3,
    title: 'Living Room Cleaning',
    price: 200,
    originalPrice: 230,
    rating: 5,
    reviews: 240,
    image: 'https://images.pexels.com/photos/2761253/pexels-photo-2761253.jpeg?auto=compress&cs=tinysrgb&w=100',
    provider: { name: 'Ronald Mark', image: 'https://images.pexels.com/photos/428342/pexels-photo-428342.jpeg?auto=compress&cs=tinysrgb&w=50' },
  },
  {
    id: 4,
    title: 'AC Service',
    price: 50,
    originalPrice: 120,
    rating: 4,
    reviews: 180,
    image: 'https://images.pexels.com/photos/634005/pexels-photo-634005.jpeg?auto=compress&cs=tinysrgb&w=100',
    provider: { name: 'Jane Smith', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50' },
  },
];
