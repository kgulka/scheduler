import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayListArr = props.days.map(item => { 

    return (

      <DayListItem 
        key={item.id} 
        name={item.name} 
        spots={item.spots} 
        selected={props.value === props.selected} 
        setDay={props.onChange} 
      />
    )
  });

  return (
    <ul>
      {dayListArr}
    </ul>
  );
}