import React, { useCallback, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CreateOrder } from "../orders/components/CreateOrder";
import OrderList from "../orders/components/OrderList";
import { TravelPlan } from "../travel/components/TravelPlan";
import { Footer } from "../../shared/components/Footer";
import { Header } from "../../shared/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/reducers/loginReducer";
import { signIn } from "../../shared/utils/utility";
import Intro from "../Intro";
import { TravelList } from "../travel/components/TravelList";
import { DeliveryList } from "../delivery/components/DeliveryList";
import NotFound from "../404/NotFound";
import VolunteerList from "../volunteer/components/VolunteerList";
import GuardedRoute from "../route-guard/GuardedRoute";
import TrackOrders from "../track/TrackOrders";
import { createApi } from "../../shared/api/crud";

const Home = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {}, []);

  const handleSignIn = useCallback(async () => {
    const user = await signIn();
    if (user) {
      dispatch(login(user));
      history.push("/order-list");
    } else history.push("/");
  }, [dispatch, history]);

  const handleGuestLogin = async () => {
    const user = {
      id: "guest140994",
      name: "Charlotte Andrea",
      email: "john.doe@gmail.com",
    };
    const response = await createApi(user, "login");
    console.log("User", response);
    if (response) {
      dispatch(login(user));
      history.push("/order-list");
    } else history.push("/");
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleOnClick={handleSignIn}
        handleGuestLogin={handleGuestLogin}
        userName={user.name}
      />
      <Switch>
        <GuardedRoute path="/order" component={CreateOrder} auth={isLoggedIn} />
        <GuardedRoute
          path="/order-list"
          component={OrderList}
          auth={isLoggedIn}
        />
        <GuardedRoute path="/travel" component={TravelPlan} auth={isLoggedIn} />
        <GuardedRoute
          path="/travel-list"
          component={TravelList}
          auth={isLoggedIn}
        />
        <GuardedRoute
          path="/delivery-list"
          component={DeliveryList}
          auth={isLoggedIn}
        />
        <GuardedRoute
          path="/volunteer-list"
          component={VolunteerList}
          auth={isLoggedIn}
        />
        <GuardedRoute
          path="/track-orders/:orderId"
          component={TrackOrders}
          auth={isLoggedIn}
        />
        <Route path="/" component={() => <Intro />} />
        <Route default component={NotFound} />
      </Switch>
      <Footer position="relative" bottom="0" mt={40} />
    </>
  );
};

export default Home;
