import { AiFillCode } from 'react-icons/ai';
import { MdHomeWork, MdSportsHockey, MdFoodBank, MdPets } from 'react-icons/md';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { BiCameraMovie, BiBookOpen } from 'react-icons/bi';
import { FaPlane } from 'react-icons/fa';

export const ROOMS = [
  {
    name: `programming`,
    icon: <AiFillCode />,
  },
  {
    name: `job`,
    icon: <MdHomeWork />,
  },
  {
    name: `music`,
    icon: <BsMusicNoteBeamed />,
  },
  {
    name: `movies`,
    icon: <BiCameraMovie />,
  },
  {
    name: `books`,
    icon: <BiBookOpen />,
  },
  {
    name: `travel`,
    icon: <FaPlane />,
  },
  {
    name: `sports`,
    icon: <MdSportsHockey />,
  },
  {
    name: `food`,
    icon: <MdFoodBank />,
  },
  {
    name: `pets`,
    icon: <MdPets />,
  },
];
