import styled from "styled-components";
import { dimens, blueColor } from "@constants";
import { FunctionComponent } from "react";

type CardProps = {
  image: string;
  name: string;
};

const ownersData: Array<CardProps> = [
  {
    image: "/assets/images/Ivan.svg",
    name: "Иван Фролов, создатель",
  },
  {
    image: "/assets/images/Mark.svg",
    name: "Марк Винча, создатель",
  },
];


export default function ContactsPage() {
  return (
    <$Container>
      {ownersData.map((owner) => (
        <Card {...owner} />
      ))}
    </$Container>
  );
}

const Card: FunctionComponent<CardProps> = ({ image, name }) => (
  <$Card>
    <$Image image={image} />
    <$Title>{name}</$Title>
  </$Card>
);

const $Container = styled.section`
  display: flex;
  align-content: flex-start;
  justify-content: center;
  margin-top: ${dimens.navbarHeight};
`;

const $Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 75px 57px 0 57px;
`;

const $Image = styled.div`
  width: 300px;
  height: 350px;
  background-image: url("${({ image }) => image}");
  background-size: contain;
  background-position: 50% 100%;
  background-repeat: no-repeat;
  border: 4px dashed ${blueColor["500"]};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const $Title = styled.h3`
  font-size: 24px;
  color: ${blueColor["1100"]};
  margin-top: 20px;
  font-size: 24px;
  font-weight: 400;
`;
