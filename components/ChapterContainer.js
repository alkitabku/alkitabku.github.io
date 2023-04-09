import { useEffect, useState } from "react";
import Verse from "../components/Verse";
import ReactDOM from 'react-dom';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function ChapterContainer(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchChapter = async (bookName, chapter) => {
            let verse = await fetch(`https://raw.githubusercontent.com/fbunaren/Alkitab-Static-API/main/v1/${bookName}/${chapter}.json`)
            verse = await verse.json();

            setData(verse);
        }

        fetchChapter(props.book, props.chapter);
    }, [props.book, props.chapter])

    const populateVerses = (rawVerses) => {
        let container = document.getElementById('verse_container');
        if (!rawVerses) {
            return;
        }
        let elements = [];
        for (let i = 0; i < rawVerses.length; i++) {
            if ('title' in rawVerses[i]) {
                let verseTitle = (
                    <Verse id={`verse${rawVerses[i]['number']}`} text={rawVerses[i]['title']} bold={ true }/>
                );
                elements.push(verseTitle);
            }
            let verseText = (
                <Verse id={`verse${rawVerses[i]['number']}`} text={rawVerses[i]['text']} />
            );
            elements.push(verseText);
        }
        const root = ReactDOM.createRoot(container);
        root.render(<>{elements}</>);
    };

    return (
        <div className="card">
            <div className="card-header theme">
                { data &&  `${capitalize(data['bookname'])} ${data['chapter']}` }
            </div>
            <div id="verse_container" className="card-body p-3 shadow rounded">
                { data && populateVerses(data['verses']) }
            </div>
        </div>
    );
}
