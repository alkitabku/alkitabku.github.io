import { useEffect, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function BookChapterSelector(props) {
    const [data, setData] = useState(null);

    useEffect( () => {
        const fetchBooksAndChapters = async () => {
            var data = await fetch("https://raw.githubusercontent.com/fbunaren/Alkitab-Static-API/main/v1/books.json");
            var data = await data.json();
            var bookChapterMapping = data.filter(row => row.id !== undefined)
                                        .reduce((newRow, row) => {
                                            newRow[row['name']] = {'abbreviation': row['abbreviation'],
                                                                    'chapter_count': row['chapter_count']}
                                            return newRow;
                                        }, {});
            setData(bookChapterMapping);
        }

        fetchBooksAndChapters();
    }, []);

    const populateChapterOptions = (bookName) => {
        try {
            for (let i = 1; i <= data[bookName]['chapter_count']; i++) {
                var thisOption = document.createElement('option');
                thisOption.value = i;
                thisOption.textContent = i;
                document.getElementById('chapter_input').appendChild(thisOption);
            }
        } catch (error) {
            clearChapterSelect();
        }
    }

    const getBooksList = () => {
        if (data === null) {
            return [];
        }
        return Object.keys(data);
    }

    const handleBookInput = (bookName) => {
        clearChapterSelect();
        populateChapterOptions(bookName);
    }
    
    const clearChapterSelect = () => {
        document.getElementById('chapter_input').innerHTML = '';
    }

    return (
        <details className="shadow gray-background" open>
            <summary className='card-header theme p-2 rounded'>
                Pilih Kitab dan Pasal
            </summary>
            <div className="card-body p-2 bg-light">
                Kitab:
                <Typeahead id="book_input" type="text" onChange={handleBookInput} options={getBooksList()}/>
                Pasal:
                <select id="chapter_input" className="form-control">
                </select>
                <br/>
                <div style={{"text-align": "center"}}>
                    <button className="btn theme">
                        <i className="bi bi-search"></i>
                        &nbsp;
                        Baca
                    </button>
                </div>
            </div>
        </details>
    );
}
