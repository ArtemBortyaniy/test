import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { data } = this.props;
    return (
      <ul className="gallery">
        {data.map(data => (
          <ImageGalleryItem key={data.id} data={data} />
        ))}
      </ul>
    );
  }
}
