//////////////////////////////////////////////////////////////////////////////////

import React from "react";

interface CardProp {
  title: string;
}

//////////////////////////////////////////////////////////////////////////////////

const Card: React.FC<CardProp> = ({ title }) => {
  return (
    <div role="listitem" className="card">
      <h3 className="card__title">{title}</h3>
    </div>
  );
};

export default Card;
