import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Styles from '../styles/modules/kaart.module.scss';

const styles = ({
  paper: {
    padding: '20px',
    width: '14vw',
  },
  popover: {
    pointerEvents: 'none',
  },
});

class MultiplePopover extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      anchorEl: null,
    };
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
  }
  handlePopoverOpen(event, popoverId) {
    this.setState({
      openedPopoverId: popoverId,
      anchorEl: event.target,
    });
  }
  handlePopoverClose() {
    this.setState({
      openedPopoverId: null,
      anchorEl: null,
    });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, openedPopoverId } = this.state;

  console.log(openedPopoverId)

    return (
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">

      {this.props.info.map((marker, i) => (

        <g key={i}>

          <svg
            x={marker.icon_x} 
            y={marker.icon_y} 
            className={Styles.marker} 
            onClick={(e) => this.handlePopoverOpen(e, i)}
            onMouseLeave={this.handlePopoverClose} 
            >
            <circle cx="50.0952" cy="50.2652" r="29.2984" fill="white"/>
            <path d="M50.0595 41.03C48.9434 41.03 48.0008 40.7786 47.232 40.2758C46.4879 39.7479 46.1158 39.0064 46.1158 38.0511C46.1158 37.0205 46.4879 36.2663 47.232 35.7887C48.0008 35.3111 48.9434 35.0723 50.0595 35.0723C51.126 35.0723 52.0561 35.3111 52.8498 35.7887C53.6435 36.2663 54.0403 37.0205 54.0403 38.0511C54.0403 39.0064 53.6435 39.7479 52.8498 40.2758C52.0561 40.7786 51.126 41.03 50.0595 41.03ZM43.8464 64.3706V62.0705H44.2928C45.0121 62.0705 45.5826 61.8694 46.0042 61.4672C46.4259 61.065 46.6367 60.336 46.6367 59.2802V48.9485C46.6367 48.0183 46.4135 47.3773 45.967 47.0254C45.5206 46.6483 44.9625 46.4598 44.2928 46.4598H43.5859V44.1597H53.8543V59.431C53.8543 60.4365 54.0651 61.1278 54.4868 61.5049C54.9332 61.882 55.5037 62.0705 56.1982 62.0705H56.6074V64.3706H43.8464Z" fill="#1F5C9D"/>
          </svg>

          <Popover
              className={[classes.popover, Styles.popover].join(' ')}
              classes={{
                paper: classes.paper,
              }}
              open={openedPopoverId === i}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >

              

                <h2 className={Styles.header}>
                {marker.header}
                </h2>
                <div className={Styles.description} dangerouslySetInnerHTML={{
                  __html: marker.description,
                  }}
                />

            </Popover>

        </g>

      ))}
        
      </svg>
    );
  }
}

MultiplePopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiplePopover);