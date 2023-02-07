import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Card from "./Components/Card";
import { StarWarData } from "./Interface/starWarData";

const App: React.FC = () => {
  const [data, setData] = useState<Array<StarWarData>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://swapi.py4e.com/api/people`);

        if (!response.ok)
          throw new Error(`Oops... something went wrong, try again 🤕`);
        const { results } = await response.json();
        console.log(results);
        const starWarResults = results.map((result: any) => {
          return {
            name: result.name,
          };
        });
        setData(starWarResults);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <Header />
      <div role="list" className="card__container">
        {data.map((obj) => {
          return <Card key={Math.random() * 10 + obj.name} title={obj.name} />;
        })}
      </div>
    </div>
  );
};

export default App;
