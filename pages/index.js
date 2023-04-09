import BookChapterSelector from '@/components/BookChapterSelector'
import Header from '@/components/Header'
import VerseOfTheDay from '@/components/VerseOfTheDay'
import ChapterContainer from '@/components/ChapterContainer'

export default function Home() {
  return (
    <div>
      <Header title="Alkitab Online"></Header>
      
      <div className='row' style={{maxWidth : "100%"}}>
        <div className='m-3 col-sm-3'>
          <VerseOfTheDay/>
        </div>
        <div className='m-3 col-md'>
          <BookChapterSelector/>
          <br/>
          <ChapterContainer book="kej" chapter="1"/>
        </div>
      </div>
    </div>
  )
}
