import { useEffect, useState } from "react";

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function VerseOfTheDay(props) {
    const [data, setData] = useState(null);
    useEffect(() => {

        const getYearMonthDay = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
        
            return `${year}${month}${day}`;
        }
        
        const getVerseOfTheDay = async () => {
            var data = await fetch("https://raw.githubusercontent.com/fbunaren/Alkitab-Static-API/main/v1/books.json");
            var data = await data.json();
            const date = getYearMonthDay();
            const bookId = (date % data.length) + 1;
            const bookAbbreviation = data[bookId]['abbreviation'].toLowerCase();
            const chapterNumber = (date % data[bookId]['chapter_count']) + 1;

            var data = await fetch(`https://raw.githubusercontent.com/fbunaren/Alkitab-Static-API/main/v1/${bookAbbreviation}/${chapterNumber}.json`);
            data = await data.json();
            const verseNumber = (date % data['verses'].length) + 1;
            const verseText = data['verses'][verseNumber]['text'];

            setData({"book_code": bookAbbreviation, 
                    "chapter": chapterNumber, 
                    "verse_number": verseNumber,
                    "text": verseText});
        }

        getVerseOfTheDay();
    }, []);

    return (
        <div className='card'>
            <div className='card-header theme'>
                Ayat Hari ini
            </div>
            <div className="card-body">
                <b>{ data && `${capitalize(data['book_code'])} ${data['chapter']}:${data['verse_number']}` }</b>
                <br/>
                { data && data['text']}
            </div>
        </div>
    );
}
