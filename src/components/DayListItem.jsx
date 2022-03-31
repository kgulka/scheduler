import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let listItemClass = classNames("day-list__item", {"day-list__item--selected": props.selected}, {"day-list__item--full": props.spots === 0} );

  const formatSpots = function(spotsIn) {
    return spotsIn === 0 ? "no spots remaining" : spotsIn === 1 ? "1 spot remaining" : spotsIn + " spots remaining";
  }

  return (
    <li className={listItemClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}