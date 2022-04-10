import CardListPage from "../pages/Card List Page/Card-List-Page";
import CardPage from "../pages/Card Page/Card-Page";
import DeckBuilder from "../pages/Deck Builder/Deck-Builder";
import DeckListPage from "../pages/Deck List Page/Deck-List-Page";
import DeckPage from "../pages/Deck Page/Deck-Page";
import NotFound from "../pages/Error Pages/404/Not-Found";
import Homepage from "../pages/Homepage";


export const PageList = {
    "home":<Homepage/>,
    "cardlists":<CardListPage/>,
    "decklists":<DeckListPage />,
    "card":<CardPage/>,
    "deck":<DeckPage />,
    "deckBuilder":<DeckBuilder />,
    "notFound": <NotFound/>
    
}
export default PageList;