export default function Verse(props) {
    const classes = `${props.highlighted ? 'bg-dark' : ''} ${props.bold ? 'fw-bold' : ''} mb-3`;
  
    return (
        <div className={classes}>
            { (props.number) ? <span>[{props.number}]&nbsp;</span> : "" }
            <span>{props.text}</span>
        </div>
    );
}
  