import { useEffect, useState } from "react";

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
    }, [])

    const populateVerses = (rawVerses) => {
        let container = document.getElementById('verse_container');
        if (!rawVerses) {
            return;
        }
        for (let i = 0; i < rawVerses.length; i++) {
            if ('title' in rawVerses[i]) {
                let verseTitleDiv = document.createElement('div');
                verseTitleDiv.innerHTML = `<b>${rawVerses[i]['title']}</b>`;
                verseTitleDiv.id = `verse${rawVerses[i]['number']}`;
                container.appendChild(verseTitleDiv);
            }
            let verseDiv = document.createElement('div');
            verseDiv.innerHTML = rawVerses[i]['text'];
            verseDiv.id = `verse${rawVerses[i]['number']}`;
            container.appendChild(verseDiv);
        }
    }

    return (
        <div className="card">
            <div className="card-header theme">
                { data &&  `${capitalize(data['bookname'])} ${data['chapter']}` }
            </div>
            <div id="verse_container" class="card-body p-3 shadow rounded">
                { data && populateVerses(data['verses']) }
            </div>
        </div>
    );
}
