import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./assets/images/deliveroo-logo.png";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://delivero-backend-clone.herokuapp.com/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const getMeals = (index) => {
    return data.categories[index].meals.map((item) => {
      return (
        <div key={item.id} className="component">
          <div className="left-side">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span>{item.price} €</span>
          </div>
          {item.picture && <img alt={item.title} src={item.picture} />}{" "}
        </div>
      );
    });
  };

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="App">
      <header>
        <div className="logo-header">
          <img src={logo} alt="logo deliveroo" />
        </div>
        <div className="topbar">
          <div className="topbar-text">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img
            className="topbar-picture"
            src={data.restaurant.picture}
            alt="présentation du restaurant"
          />
        </div>
      </header>
      <main>
        <div>
          <div className="left-column">
            {data.categories.map((category, index) => {
              return (
                data.categories[index].meals.length > 0 && (
                  <section key={index}>
                    <h2>{category.name}</h2>
                    <div className="componentsOfMeal">{getMeals(index)}</div>
                  </section>
                )
              );
            })}
          </div>
          <div className="right-column">Panier</div>
        </div>
      </main>
    </div>
  );
}

export default App;
