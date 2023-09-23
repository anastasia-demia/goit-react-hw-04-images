import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Notify } from "notiflix";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { getImages } from "api/pixabayApi";


export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setModal] = useState(false);
  const [showButton, setButton] = useState(false);
  const [largePic, setLargePic] = useState(null);
  const [pics, setPics] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPage = async () => {
      setStatus('pending')

      try {
        const pic = await getImages(searchQuery, page)

        setPics(prevState => [...prevState, ...pic.hits]);
        setButton(page < Math.ceil(pic.totalHits / 12))
      } catch (error) {
        setStatus('rejected')
        setError(error)
        Notify.warning(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      } finally {
        setStatus('resolved')
      }
    }

    if(searchQuery) {
      getPage()
    }
  },[searchQuery, page])


  const changePage = () => {
    setPage(prevState => prevState + 1);
  };

  const switchModal = pic => {
    setLargePic(pic);
    setModal( !showModal );
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPics([]);
    setPage(1);
  };



    return(
      <div>
        <Searchbar onSubmit={handleFormSubmit}/>
        {status === 'pending' && <Loader/>}
        {status === 'rejected' && (<h1>Whoops, something went wrong: {error.message}</h1>)}
        <ImageGallery pics={pics} onImgClick={switchModal}/>
        {showButton && <Button text="Load More" onBtnClick={changePage}/>}
        {showModal && (<Modal switchModal={switchModal} largePic={largePic}/>)}
      </div>
      )
  };

