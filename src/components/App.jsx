import React, { Component } from 'react';
import { pixabayApi } from 'services/pixabayApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { Idle } from './Idle/Idle';
import { GalleryErrorView } from './GalleryErrorView/GalleryErrorView';
import { toast } from 'react-toastify';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    searchQuery: '',
    dataPixabay: [],
    page: 1,
    error: null,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;

    const previousStateQ = prevState.searchQuery;
    const nextStateQ = searchQuery;

    const previousStatePage = prevState.page;
    const nextStatePage = page;

    try {
      if (
        previousStateQ !== nextStateQ ||
        previousStatePage !== nextStatePage
      ) {
        this.setState({ status: Status.PENDING });

        const result = await pixabayApi(nextStateQ, page);

        if (result > 0) {
          toast.success('Wow so easy!');
        }
        if (result === 0) {
          toast.warning('Write valid parameter');
        }

        if (previousStateQ !== nextStateQ) {
          this.setState({ dataPixabay: result });
        }

        if (previousStateQ === nextStateQ) {
          this.setState(prevState => ({
            dataPixabay: [...prevState.dataPixabay, ...result],
          }));
        }

        this.setState({ status: Status.RESOLVED });
      }
    } catch (error) {
      console.error(error);
      this.setState({ error, status: Status.REJECTED });
    }
  }

  handlePagination = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSubmit = param => {
    this.setState({ searchQuery: param });
  };

  render() {
    const { dataPixabay, status, error } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ToastContainer autoClose={3000} />
        {status === 'idle' && <Idle></Idle>}

        {status === 'pending' && <Loader></Loader>}

        {status === 'resolved' && (
          <>
            <ImageGallery data={dataPixabay}></ImageGallery>
            {dataPixabay.length > 0 && (
              <Button onClick={this.handlePagination}></Button>
            )}
          </>
        )}

        {status === 'rejected' && <GalleryErrorView error={error.message} />}
      </div>
    );
  }
}
