/**
 * Created by nwu on 10/3/17.
 */
import {connect} from 'react-redux';
import {removeType} from '../../../redux/midnight/actions';
import RemoveDialog from '../RemoveDialog';

function mapDispatchToProps(dispatch) {
  return {
    remove: removeType(dispatch),
  }
}

function mapStateToProps(state) {
  return ({
    token: state.session.token,
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDialog);