import React from 'react';
import { connect } from 'react-redux';
import { CRUDCardActions } from '../../redux/actions/card-info';

const mapStateToProps = (state, props) => {
    return {
        data: state.cardInfoReducer.data,
    }
  }
const mapDispatchToProps = dispatch => {
    return {
        getDeckInfo: () => dispatch(CRUDCardActions.SaveCardInfo())
    }
}

export const DeckPage = ({data, getDeckInfo}) => {
    return (
        <div>
            
        </div>
    )
}

export default connect(null, mapDispatchToProps)(DeckPage);