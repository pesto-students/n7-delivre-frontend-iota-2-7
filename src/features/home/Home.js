import React, { useCallback } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CreateOrder } from "../orders/components/CreateOrder";
import OrderList from "../orders/components/OrderList";
import { TravelPlan } from "../travel/components/TravelPlan";
import { Footer } from "../../shared/components/Footer";
import { Header } from "../../shared/components/Header";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccessful } from "../../redux/reducers/loginReducer";
import { googleSignIn } from "../../shared/api/login";
import Intro from "../Intro";
import { TravelList } from "../travel/components/TravelList";
import { DeliveryList } from "../delivery/components/DeliveryList";
import NotFound from "../404/NotFound";
import VolunteerList from "../volunteer/components/VolunteerList";
import GuardedRoute from "../route-guard/GuardedRoute";
import TrackOrders from "../track/TrackOrders";
import { createApi } from "../../shared/api/crud";
import { logger } from "@sentry/utils";



/**
 * Render Landing Page with all the initial routes
 * @returns {JSX} Component with all the routes 
 */
const Home = () => {


  /** Initialize History object for routing */
  let history = useHistory();


  /** Initialize Dispatch object for firing events */
  const dispatch = useDispatch();


  /** Initilaize local state from Redux Store */
  const isLoggedIn = useSelector(({login}) => login?.isLoggedIn);
  const user = useSelector(({login}) => login?.user);


  /** Handler for User Sign In*/
  const handleSignIn = useCallback(async () => {

    /** API request from Google Auth*/
    const user = await googleSignIn().catch(err => logger.error("Sign In Failed", err));

    if (user) {

      dispatch(loginSuccessful(user));

      history.push("/order-list");

    } else history.push("/");
    
  }, [dispatch, history]);



  /** Handler for Guest Sign In */
  const handleGuestLogin = async () => {

    /** initialize guest user object  */
    const guestUser = {
      id: "guest140994",
      name: "John Doe",
      email: "john.doe@gmail.com",
    };


    /** API request*/
    const response = await createApi(guestUser, "login").catch(err => logger.error("Create User Failed", err));

    if (response) {

      dispatch(loginSuccessful(response));

      history.push("/order-list");
      
    } else history.push("/");

  };



  return (
    <React.Fragment>
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
        <Route path="/" component={() => <Intro handleOnClick={handleGuestLogin}/>} />
        <Route default component={NotFound} />
      </Switch>
      <Footer position="relative" bottom="0" mt={40} />
    </React.Fragment>
  );
};

export default Home;
