export default function Verse(props) {
    const classes = `${props.highlighted ? 'bg-warning p-2' : ''} ${props.bold ? 'fw-bold' : ''} mb-3`;
  
    return (
        <div className={classes}>
            { (props.number) ? <span>[{props.number}]&nbsp;</span> : "" }
            <span>{props.text}</span>
        </div>
    );
}
  