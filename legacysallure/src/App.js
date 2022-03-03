import logo from './logo.svg';
import './App.css';
import NavigationPane from './share/navigation-pane/Navigation-Pane';
import RouterSetup from './Routing';


function App() {
  const naviList = [
    {
      "path":"/",
      "name":"Home",
      "component":"home"
    },
    {
      "path":"/next",
      "name":"Next",
      "component":"next"
    }
  ]
  return (
    <div>
      <NavigationPane navigationList={naviList}></NavigationPane>
      <RouterSetup navigationList={naviList}></RouterSetup>
    </div>
  );
}

export default App;
