import { Provider } from "react-redux";
import { Home } from "./Home";
import { store } from "./store/store"

function App() {


  //const dispatch = useDispatch()

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
