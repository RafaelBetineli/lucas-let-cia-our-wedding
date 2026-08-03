import foto01 from "@/assets/groomsmen/padrinhos-01.jpg";
import foto02 from "@/assets/groomsmen/padrinhos-02.jpg";
import foto03 from "@/assets/groomsmen/padrinhos-03.jpg";
import foto04 from "@/assets/groomsmen/padrinhos-04.jpg";
import foto05 from "@/assets/groomsmen/padrinhos-05.jpg";
import foto06 from "@/assets/groomsmen/padrinhos-06.jpg";
import foto07 from "@/assets/groomsmen/padrinhos-07.jpg";
import foto08 from "@/assets/groomsmen/padrinhos-08.jpg";
import foto09 from "@/assets/groomsmen/padrinhos-09.jpg";
import foto10 from "@/assets/groomsmen/padrinhos-10.jpg";
import foto11 from "@/assets/groomsmen/padrinhos-11.jpg";
import foto12 from "@/assets/groomsmen/padrinhos-12.jpg";
import foto13 from "@/assets/groomsmen/padrinhos-13.jpg";

type Groomsman = {
  name: string;
  image: string;
  position?: string;
  fit?: "cover" | "contain";
};

export const groomsmen: Groomsman[] = [
  {
    name: "Felipe e Bianca",
    image: foto01,
    position: "50% 50%"
  },
  {
    name: "Rafael e Bárbara",
    image: foto02,
    position: "50% 50%"
  },
  {
    name: "Erik e Júlia",
    image: foto03,
    fit: "contain",
  },
  {
    name: "Daniel e Débora",
    image: foto04,
    fit: "contain",
  },
  {
    name: "Alessandro e Sabrina",
    image: foto05,
    position: "50% 50%"
  },
   {
    name: "Priscila",
    image: foto06,
    position: "50% 50%"
  },
  {
    name: "Bruna",
    image: foto07,
    position: "50% 50%"
  },
  {
    name: "Érika",
    image: foto08,
    position: "50% 50%"
  },
  {
    name: "Thiago",
    image: foto09,
    position: "50% 20%"
  },
  {
    name: "Felipe",
    image: foto10,
    position: "50% 10%"
  },
   {
    name: "Guilherme",
    image: foto11,
    position: "50% 50%"
  },
  {
    name: "Joana",
    image: foto12,
    position: "50% 20%"
  },
  {
    name: "Matheus e Larissa",
    image: foto13,
    position: "50% 50%"
  }
];
