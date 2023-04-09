export default function Verse(props) {
    const classes = `${props.highlighted ? 'bg-dark' : ''} ${props.bold ? 'fw-bold' : ''} mb-3`;
  
    return <div className={classes}>{props.text}</div>;
}
  