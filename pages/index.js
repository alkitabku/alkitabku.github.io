import BookChapterSelector from '@/components/BookChapterSelector'
import Header from '@/components/Header'
import VerseOfTheDay from '@/components/VerseOfTheDay'
import ChapterContainer from '@/components/ChapterContainer'
import { Component } from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: "Kejadian",
            chapterNumber: "1",
        };
    }

    handleButtonClick(bookName, chapterNumber) {
        this.setState({ bookName: bookName, chapterNumber: chapterNumber})
    }

    render() {
        return (
            <div>
                <Header title="Alkitab Online"></Header>
                
                <div className='row' style={{maxWidth : "100%"}}>
                    <div className='m-3 col-sm-3'>
                    <VerseOfTheDay/>
                    </div>
                    <div className='m-3 col-md'>
                    <BookChapterSelector onSelect={ (bookName, chapterNumber) => this.handleButtonClick(bookName, chapterNumber) }/>
                    <br/>
                    <ChapterContainer book={ this.state.bookName } chapter={ this.state.chapterNumber }/>
                    </div>
                </div>
            </div>
        )
    }
}
