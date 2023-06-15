import {
  Moon,
  SunMedium,
  Twitter,
  type Icon as LucideIcon,
} from "lucide-react";

import { Logo } from "./logo";
import { GitHub } from "@/components/icons/github";

export type Icon = LucideIcon;

const icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  logo: Logo,
  gitHub: GitHub,
};

export default icons;
