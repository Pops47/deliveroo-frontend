import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "./assets/images/deliveroo-logo.png";

function App() {
  //creation of states to catch data
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // request for data with useEffect, just once at the first opening of the page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-backend-5uek.onrender.com/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  // creation of basket's state
  const [basket, setBasket] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const frais = 2.5;

  //waiting for request to arrive before coninuing
  return isLoading ? (
    <span>Loading...</span>
  ) : (
    // front end of deliveroo using data
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
          <div className="meals-column">
            {/* map on data array to get all titles */}
            {data.categories.map((category, index) => {
              return (
                // we dont keep categories with zero meals
                data.categories[index].meals.length > 0 && (
                  <section key={index}>
                    <h2>{category.name}</h2>
                    <div className="all-meals">
                      {/* each meal can be clicked to put it in the basket */}
                      {category.meals.map((meal) => {
                        return (
                          <div
                            key={meal.id}
                            className="meal"
                            // when clicking :
                            onClick={() => {
                              if (
                                // if this meal is still in basket :
                                basket.find((item) => item.id === meal.id) ===
                                undefined
                              ) {
                                // we add a new object in basket state with meal title, id, price and quantity
                                meal.quantity = 1;
                                const newBasket = [...basket];
                                newBasket.push(meal);
                                setBasket(newBasket);
                                // setSubtotal(subtotal + Number(meal.price));
                              } else {
                                // else we add a quantity in basket state object with this id
                                const newBasket = [...basket];
                                console.log(newBasket);
                                newBasket.find(
                                  (item) => item.id === meal.id
                                ).quantity += 1;
                                setBasket(newBasket);
                                // setSubtotal(subtotal + Number(meal.price));
                              }
                            }}
                          >
                            {/* another part of front end */}
                            <div className="left-side">
                              <h3>{meal.title}</h3>
                              <p>{meal.description}</p>
                              <span>{meal.price} €</span>
                            </div>
                            {meal.picture && (
                              <img alt={meal.title} src={meal.picture} />
                            )}{" "}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )
              );
            })}
          </div>
          {/* what is shown in basket : */}
          <div className="basket">
            <div className="submit">Valider votre panier</div>
            <div className="order">
              {/* map on basket state to show all ordered meals */}
              {basket.map((item) => {
                return (
                  <div className="basket-orders" key={item.id}>
                    {" "}
                    {/* function handlePlus and handleMinus to increment/decreent counters  */}
                    <button
                      onClick={() => {
                        const newBasket = [...basket];
                        const thisMeal = newBasket.find(
                          (meal) => meal.id === item.id
                        );
                        if (thisMeal.quantity > 1) {
                          thisMeal.quantity -= 1;
                          setBasket(newBasket);
                          // setSubtotal(subtotal - thisMeal.price);
                        } else {
                          newBasket.splice(thisMeal, 1);
                          setBasket(newBasket);
                          // setSubtotal(subtotal - thisMeal.price);
                        }
                      }}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => {
                        const newBasket = [...basket];
                        const thisMeal = newBasket.find(
                          (meal) => meal.id === item.id
                        );
                        thisMeal.quantity += 1;
                        setBasket(newBasket);

                        // setSubtotal(subtotal + Number(thisMeal.price));
                      }}
                    >
                      +
                    </button>
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                  </div>
                );
              })}
            </div>
            <div className="sub-total">
              <p>Sous-total : </p>
              <p>Frais de livraison : {frais}</p>
            </div>
            <div className="total">Total : </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
