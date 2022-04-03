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
      "path":"/deck-list",
      "name":"Deck Lists",
      "component":"decklists"
    },
    {
      "path":"/card-list",
      "name":"Card List",
      "component":"cardlists"
    },
    {
      "path":"/deck-builder",
      "name":"Deck Builder",
      "component":"deckBuilder"
    }
  ]
  
  const detailedNaviList = [
    {
      "path":"/deck",
      "name":"Deck",
      "component":"deck"
    },
    {
      "path":"/card",
      "name":"Card",
      "component":"card"
    }
  ]
  return (
    <div>
      <NavigationPane navigationList={naviList}></NavigationPane>
      <RouterSetup navigationList={naviList} detailedNaviList={detailedNaviList}></RouterSetup>
    </div>
  );
}

export default App;
