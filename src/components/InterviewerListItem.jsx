import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  //expecting props
  //id, name, avatar, selected and setInterviewer function
  const intListItemClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected} );
  
  // const formatSpots = function(spotsIn) {
  //   return spotsIn === 0 ? "no spots remaining" : spotsIn === 1 ? "1 spot remaining" : spotsIn + " spots remaining";
  // }
  console.log("props.selected:",props.selected);
  let itemText = ""
  if (props.selected) {
    itemText = props.name;
  }
  return (
    <li className={intListItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {itemText}
    </li>
  );
}