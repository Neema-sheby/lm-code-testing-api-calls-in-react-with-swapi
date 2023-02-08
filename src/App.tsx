import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Card from "./Components/Card";
import { StarWarData } from "./Interface/starWarData";
import { ErrorMessages } from "./Error/ErrorMessages";

const App: React.FC = () => {
  const [data, setData] = useState<Array<StarWarData>>([]);
  const [error, setError] = useState<string>("");
  const { error500, error418, errorFetch } = ErrorMessages;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://swapi.py4e.com/api/people`);

        if (!response.ok) {
          if (response.status === 500) throw new Error(error500);
          else if (response.status === 418) throw new Error(error418);
          else {
            throw new Error(errorFetch);
          }
        }

        const { results } = await response.json();
        console.log(results);
        const starWarResults = results.map((result: any) => {
          return {
            name: result.name,
          };
        });
        setData(starWarResults);
      } catch (err) {
        let message: string = "unknown message";
        if (err instanceof Error) message = err.message;
        setError(message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <Header />
      <div role="list" className="card__container">
        {data &&
          data.map((obj) => {
            return (
              <Card key={Math.random() * 10 + obj.name} title={obj.name} />
            );
          })}
        {error && <div role="alert">{error}</div>}
      </div>
    </div>
  );
};

export default App;
