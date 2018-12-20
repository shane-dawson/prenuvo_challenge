import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchImages } from '../actions';
import './scss/ImageGrid.scss';

const MIN_WIDTH = 760;

class ImageGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { windowWidth: null };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setState(
      () => ({ windowWidth: window.innerWidth }),
      () => this.props.fetchItems(),
    );
  }

  componentWillUnmount() {
    window.addEventListener('resize', null);
  }

  getStyle = (width, height) => {
    if (width > height) {
      if (this.state.windowWidth && this.state.windowWidth < MIN_WIDTH) {
        return {
          gridArea: 'span 1 / span 2',
        };
      }
      return {
        gridArea: `span 1 / span ${Math.floor(width / height)}`,
      };
    }
    if (height > width) {
      return {
        gridArea: `span ${Math.floor(height / width)} / span 1`,
      };
    }
    return {
      gridArea: `span 1 / span 1`,
    };
  };

  handleResize = e => {
    this.setState({ windowWidth: window.innerWidth });
  };

  render() {
    const { data } = this.props;
    const sortedData = data.sort(
      (a, b) => a.width / a.height > b.width / b.height,
    );

    return (
      <div className="imageGrid">
        {sortedData.map(({ uri, width, height }, i) => (
          <div
            className="gridItem"
            key={i.toString()}
            style={this.getStyle(width, height)}
          >
            <img src={`/${uri}`} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.reducer.images,
});

const mapDispatchToProps = dispatch => ({
  fetchItems: args => dispatch(fetchImages(args)),
});

ImageGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  fetchItems: PropTypes.func,
};

ImageGrid.defaultProps = {
  data: {},
  fetchItems: null,
};

export default (ImageGrid = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageGrid));
