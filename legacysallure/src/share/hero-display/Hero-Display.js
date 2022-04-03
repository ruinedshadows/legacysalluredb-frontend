import React from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import { cardColumnHeaders } from '../../constants/column-names/cardColumnHeaders.ts'
import { cardColumnNames } from '../../constants/general-strings/cardColumnNames'
import ImgList from '../../constants/imgList'
import { ConvertColumnArray } from '../../shared-functions/ConvertColumnArray'
import './Hero-Display.css'
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    function isToggled(e) {
        onClick(e)
    }
    return (
        <div onClick={(e) => isToggled(e)}>{children}</div>
    )  
});

const HeroUnit = ({heroInfo}) => (
    <Card >
        <div className={"hero-card-content"}>
            <Card.Img src={ImgList.placeholder} style={{ width: "350px", height: "350px"}} />
            <div className={"hero-card-info"}>
                <Card.Title as="h4">{heroInfo[cardColumnNames.name]}</Card.Title>
                <Card.Body>{heroInfo[cardColumnNames.id]}</Card.Body>
            </div>
        </div>
    </Card>
)
const HeroMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children)}
          </ul>
        </div>
      );
    },
);

const HeroItem = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy, onClick, heroInfo, changeHero }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
          onClick={(e) => {changeHero(heroInfo[cardColumnNames.id]); onClick(e) }}
        >
          {children}
        </div>
      );
    },
);

const HeroDisplay = ({heroInfo, onClick}) => {
    let rows = []
    for(var x = 1; x<=4; x++) {
        rows.push([x, "Test Name", x, 100, 2, 2, 10, 4, "Test Faction", "Item"])
    }
    heroInfo = ConvertColumnArray(heroInfo, cardColumnHeaders)
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
                <HeroUnit heroInfo={heroInfo}/>
            </Dropdown.Toggle>
            <Dropdown.Menu as={HeroMenu} className={"hero-menu"}>
                {
                    rows.map(entry => {
                        heroInfo = ConvertColumnArray(entry, cardColumnHeaders)
                        return (
                            <Dropdown.Item as={HeroItem} changeHero={onClick} heroInfo={heroInfo}>{heroInfo[cardColumnNames.name]} {heroInfo[cardColumnNames.id]}</Dropdown.Item> )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default HeroDisplay