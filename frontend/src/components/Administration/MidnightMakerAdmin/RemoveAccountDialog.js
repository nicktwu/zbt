/**
 * Created by nwu on 10/12/17.
 */
import {connect} from 'react-redux';
import {removeAccount} from '../../../redux/midnight/actions';
import RemoveDialog from '../RemoveDialog';

function mapDispatchToProps(dispatch) {
  return {
    remove: removeAccount(dispatch),
  }
}

function mapStateToProps(state) {
  return ({
    token: state.session.token,
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveDialog);