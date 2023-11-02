import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Header from "./component/Header";
import MainContainer from "./component/MainContainer";
import CreateContainer from "./component/CreateContainer";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunction";
import { useEffect } from "react";
import { actionType } from "./context/reducer";

function App() {
  const [{ }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      // console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div>
        <div className="w-full h-auto flex flex-col">
          <Header/>
          <main className="mt-16 md:mt-24 p-8 w-full">
            <Routes>
              <Route path="/*" element={<MainContainer/>} />
              <Route path="/createItem" element={<CreateContainer/>} />
            </Routes>
          </main>
        </div>
      </div>
    </AnimatePresence>
  );
}
export default App;
